// Çalıştır: node --test test/
import { test } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { execFile } from "node:child_process";
import { mkdtempSync, writeFileSync, statSync, readdirSync, existsSync } from "node:fs";
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

test("cik bağlantıyı siler", async () => {
  await calistir(["cik"]);
  assert.equal((await calistir(["durum"])).kod, 2);
  sunucu.close();
});
