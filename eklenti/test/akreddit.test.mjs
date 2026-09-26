// Çalıştır: node --test test/
import { test } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { execFile } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, statSync, readdirSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";

const ARAC = new URL("../bin/akreddit", import.meta.url).pathname;

// Sahte lisans sunucusu: ilk yoklamada bekletir, sonra jeton verir.
let lisansAktif = true;
let yoklama = 0;
const sunucu = createServer((req, res) => {
  const gonder = (kod, veri) => { res.writeHead(kod, { "Content-Type": "application/json" }); res.end(JSON.stringify(veri)); };
  if (req.url === "/api/akreddit/cihaz") return gonder(200, { cihazKodu: "gizli", kullaniciKodu: "BCDF-GHJK", adres: "http://x/akreddit/cihaz?kod=BCDF-GHJK", sureSaniye: 30, aralikSaniye: 0.05 });
  if (req.url === "/api/akreddit/cihaz/jeton") return ++yoklama < 2 ? gonder(202, { durum: "bekliyor" }) : gonder(200, { durum: "tamam", jeton: "jeton-123" });
  if (req.url === "/api/akreddit/lisans") {
    if (req.headers.authorization !== "Bearer jeton-123") return gonder(401, { error: "geçersiz" });
    return gonder(200, { eposta: "hoca@ornek.edu.tr", aktif: lisansAktif, kalanGun: lisansAktif ? 30 : 0 });
  }
  gonder(404, {});
});
await new Promise((r) => sunucu.listen(0, r));
const SUNUCU = `http://127.0.0.1:${sunucu.address().port}`;
const EV = mkdtempSync(join(tmpdir(), "akreddit-ev-"));

function calistir(args, cwd = EV) {
  return new Promise((r) => execFile(process.execPath, [ARAC, ...args], { cwd, env: { ...process.env, AKREDDIT_SUNUCU: SUNUCU, XDG_CONFIG_HOME: EV } },
    (hata, stdout, stderr) => r({ kod: hata ? hata.code : 0, cikti: stdout + stderr })));
}

test("bağlı değilken durum 2 döner, kanca modunda 0", async () => {
  assert.equal((await calistir(["durum"])).kod, 2);
  const k = await calistir(["durum", "--kanca"]);
  assert.equal(k.kod, 0);
  assert.match(k.cikti, /bağlı değil/);
});

test("baglan onayı bekler, jetonu yalnız sahibinin okuyabileceği dosyaya yazar", async () => {
  const s = await calistir(["baglan", "--cihaz-adi", "Deneme"]);
  assert.equal(s.kod, 0, s.cikti);
  assert.match(s.cikti, /BCDF-GHJK/);
  assert.match(s.cikti, /30 gün kaldı/);
  const izin = statSync(join(EV, "akreddit", "kimlik.json")).mode & 0o777;
  assert.equal(izin, 0o600);
});

test("süre dolunca durum 3 döner ve klasör kurulamaz", async () => {
  lisansAktif = false;
  assert.equal((await calistir(["durum"])).kod, 3);
  const kur = await calistir(["kur", join(EV, "yasak")]);
  assert.equal(kur.kod, 3);
  assert.equal(existsSync(join(EV, "yasak", "AKREDDIT.md")), false);
  lisansAktif = true;
});

test("klasör kurulur, kanıt tekrar eklenmez, adım günlüğü değiştirilemez", async () => {
  const klasor = join(EV, "program");
  assert.equal((await calistir(["kur", klasor])).kod, 0);
  for (const alt of ["kanitlar", "kayit", "gunluk", "raporlar", "tarayici"]) assert.ok(existsSync(join(klasor, alt)));

  const dosya = join(EV, "tutanak.pdf");
  writeFileSync(dosya, "%PDF-1.4 deneme");
  assert.match((await calistir(["kanit-ekle", dosya], klasor)).cikti, /Eklendi/);
  assert.match((await calistir(["kanit-ekle", dosya], klasor)).cikti, /Zaten var/);
  assert.equal(readdirSync(join(klasor, "kanitlar")).length, 1);
  assert.equal(statSync(join(klasor, "kanitlar", readdirSync(join(klasor, "kanitlar"))[0])).mode & 0o222, 0, "kanıt salt okunur olmalı");

  await calistir(["adim", "oneri", "--ayrinti", "{\"x\":1}", "--onaylayan", "hoca"], klasor);
  const ozet = await calistir(["ozet"], klasor);
  assert.match(ozet.cikti, /Kanıt: 1 dosya/);
  assert.match(ozet.cikti, /oneri/);

  const vt = new DatabaseSync(join(klasor, "kayit", "akreddit.sqlite"));
  assert.throws(() => vt.exec("DELETE FROM adimlar"), /silinemez/);
  vt.close();
  assert.ok(readdirSync(join(klasor, "gunluk")).some((d) => d.endsWith(".jsonl")));
});

test("Faz 4: çıktı, öneri, karar, matris ve rapor denetimi", async () => {
  const k = join(EV, "program");
  const c = (...a) => calistir(a, k);
  const kanitKod = (await c("kanitlar")).cikti.match(/K:([0-9a-f]{8})/)[1];

  assert.equal((await c("cikti-ekle", "--tur", "program", "--kod", "PÇ1", "--metin", "Algoritma tasarlar ve uygular.")).kod, 0);
  assert.equal((await c("cikti-ekle", "--tur", "program", "--kod", "PÇ2", "--metin", "Etik ilkelere uygun davranır.")).kod, 0);
  assert.equal((await c("cikti-ekle", "--tur", "ders", "--ders", "TBP201", "--kod", "DÇ1", "--metin", "Web sayfası tasarlar.")).kod, 0);
  assert.match((await c("cikti-ekle", "--tur", "program", "--kod", "PÇ1", "--metin", "Başka bir metin burada.")).cikti, /yeni kodla/);

  // 0 puan ve kayıtsız çıktı reddedilir.
  assert.match((await c("oner-matris", "--ders-cikti", "TBP201.DÇ1", "--program-cikti", "PÇ1", "--puan", "0", "--gerekce", "Deneme gerekçesi burada.")).cikti, /0 yazma/);
  assert.match((await c("oner-matris", "--ders-cikti", "TBP201.DÇ9", "--program-cikti", "PÇ1", "--puan", "2", "--gerekce", "Deneme gerekçesi burada.")).cikti, /kayıtlı değil/);

  // Kanıtsız 4 puan inceleme notu alır.
  const o1 = await c("oner-matris", "--ders-cikti", "TBP201.DÇ1", "--program-cikti", "PÇ1", "--puan", "4", "--gerekce", "Proje ödevi doğrudan ölçüyor.");
  assert.match(o1.cikti, /ölçme planından/);
  const id1 = o1.cikti.match(/#(\d+)/)[1];
  const o2 = await c("oner-matris", "--ders-cikti", "TBP201.DÇ1", "--program-cikti", "PÇ2", "--iliskisiz", "--gerekce", "İzlencede etik konusu geçmiyor.", "--kanit", kanitKod);
  assert.match(o2.cikti, /#\d+/, o2.cikti);
  const id2 = o2.cikti.match(/#(\d+)/)[1];

  // Karar insan adı olmadan verilmez, bir kez verilir.
  assert.match((await c("karar", id1, "onayla")).cikti, /yapay zekâ veremez/);
  assert.equal((await c("karar", id1, "duzelt", "--puan", "3", "--onaylayan", "Deneme Hoca")).kod, 0);
  assert.match((await c("karar", id1, "onayla", "--onaylayan", "Deneme Hoca")).cikti, /zaten karar/);
  assert.equal((await c("karar", id2, "onayla", "--onaylayan", "Deneme Hoca")).kod, 0);

  const m = await c("matris", "--csv");
  assert.match(m.cikti, /\| TBP201\.DÇ1 \| 3 \| · \|/);
  assert.match(readFileSync(join(k, "raporlar", "matris.csv"), "utf8"), /TBP201\.DÇ1,3,iliskisiz/);

  // Rapor denetimi: geçerli kaynak geçer, uydurma kaynak hata verir, kaynaksız sayı uyarı alır.
  writeFileSync(join(k, "raporlar", "iyi.md"), `# Bölüm\n\nKurul toplantı yaptı [K:${kanitKod} s. 1].\n\nAnket yapılmadı [EKSİK: mezun anketi].\n`);
  const iyi = await c("rapor-denetle", join(k, "raporlar", "iyi.md"));
  assert.equal(iyi.kod, 0, iyi.cikti);
  assert.match(iyi.cikti, /mezun anketi/);
  writeFileSync(join(k, "raporlar", "kotu.md"), "Öğrencilerin yüzde 87'si başarılı oldu.\n\nToplantı yapıldı [K:deadbeef].\n");
  const kotu = await c("rapor-denetle", join(k, "raporlar", "kotu.md"));
  assert.equal(kotu.kod, 1);
  assert.match(kotu.cikti, /hiçbir kanıta karşılık gelmiyor/);
  assert.match(kotu.cikti, /sayı içeriyor/);

  const vt = new DatabaseSync(join(k, "kayit", "akreddit.sqlite"));
  assert.throws(() => vt.exec("UPDATE oneriler SET son_puan = 5"), /değiştirilemez/);
  assert.throws(() => vt.exec("DELETE FROM kanitlar"), /silinemez/);
  vt.close();
});

test("Faz 3 klasörü yeni şemaya geçer", async () => {
  const eski = join(EV, "eski");
  for (const alt of ["kanitlar", "kayit", "gunluk", "raporlar"]) mkdirSync(join(eski, alt), { recursive: true });
  writeFileSync(join(eski, "AKREDDIT.md"), "eski");
  const vt = new DatabaseSync(join(eski, "kayit", "akreddit.sqlite"));
  vt.exec("CREATE TABLE kanitlar (id INTEGER PRIMARY KEY, ozet TEXT NOT NULL UNIQUE, ozgun_ad TEXT NOT NULL, yol TEXT NOT NULL UNIQUE, boyut INTEGER NOT NULL, eklenme TEXT NOT NULL) STRICT; CREATE TABLE adimlar (id INTEGER PRIMARY KEY, zaman TEXT NOT NULL, eylem TEXT NOT NULL, adres TEXT, ayrinti TEXT, ekran TEXT, onaylayan TEXT) STRICT;");
  vt.close();
  const r = await calistir(["cikti-ekle", "--tur", "program", "--kod", "PÇ1", "--metin", "Eski klasörde çıktı."], eski);
  assert.equal(r.kod, 0, r.cikti);
});

test("tarayıcı koruması yalnız okuma araçlarına izin verir", async () => {
  const kanca = new URL("../scripts/salt-okuma.mjs", import.meta.url).pathname;
  const dene = (arac) => new Promise((r) => {
    const p = execFile(process.execPath, [kanca], (h) => r(h ? h.code : 0));
    p.stdin.end(JSON.stringify({ tool_name: `mcp__plugin_akreddit_tarayici__${arac}` }));
  });
  for (const arac of ["browser_navigate", "browser_snapshot", "browser_click", "browser_take_screenshot"]) assert.equal(await dene(arac), 0, arac);
  for (const arac of ["browser_type", "browser_fill_form", "browser_cookie_get", "browser_run_code_unsafe", "browser_press_key", "browser_gelecekte_eklenen"]) assert.equal(await dene(arac), 2, arac);
});

test("cik bağlantıyı siler", async () => {
  await calistir(["cik"]);
  assert.equal((await calistir(["durum"])).kod, 2);
  sunucu.close();
});
