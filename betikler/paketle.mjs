// Eklentiyi zip'ler ve tezatlas sitesinde yayımlanacak pazar yeri dosyasını üretir.
// Kullanım: node betikler/paketle.mjs [tezatlas-deposu]
// Sonra tezatlas deposunda commit ve push. Kullanıcılar:
//   /plugin marketplace add https://tezatlas.com/akreddit/marketplace.json
//   /plugin install akreddit@akreddit
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const kok = resolve(new URL("..", import.meta.url).pathname);
const site = resolve(process.argv[2] || join(kok, "..", "tezatatlascom"));
const surum = JSON.parse(readFileSync(join(kok, "eklenti/.claude-plugin/plugin.json"), "utf8")).version;
const hedefKlasor = join(site, "public", "akreddit");
const zipAdi = `akreddit-${surum}.zip`;
const zipYolu = join(hedefKlasor, zipAdi);

mkdirSync(hedefKlasor, { recursive: true });
rmSync(zipYolu, { force: true });
// Testler dağıtıma girmez. -X ek öznitelikleri atar, zip her seferinde aynı içerikle üretilir.
execFileSync("zip", ["-qrX", zipYolu, ".", "-x", "test/*", "*.DS_Store"], { cwd: join(kok, "eklenti") });
const sha256 = createHash("sha256").update(readFileSync(zipYolu)).digest("hex");

const pazar = {
  name: "akreddit",
  description: "Akreddit: akreditasyon hazırlığı için Claude Code eklentisi",
  owner: { name: "Tarık İsmet ALKAN", url: "https://tezatlas.com/akreddit" },
  plugins: [
    {
      name: "akreddit",
      description: "Akreditasyon hazırlığı için adım adım, kaynaklı ve kayıtlı iş akışı.",
      source: { source: "archive", url: `https://tezatlas.com/akreddit/${zipAdi}`, sha256 },
    },
  ],
};
writeFileSync(join(hedefKlasor, "marketplace.json"), `${JSON.stringify(pazar, null, 2)}\n`);
console.log(`${zipAdi}  sha256 ${sha256}`);
