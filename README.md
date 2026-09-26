# Akreddit

Kalite komisyonları için akreditasyon hazırlığını Claude Code üzerinde adım adım, kaynaklı ve kayıtlı yürüten iş akışı.
Tanıtım ve hesaplar: https://tezatlas.com/akreddit (kodu tezatatlascom deposunda).

| Klasör | İçerik |
|---|---|
| `eklenti/` | Claude Code eklentisi: `bin/akreddit` aracı, `/akreddit:baslat` skill'i, kurallar, oturum kancası |
| `.claude-plugin/marketplace.json` | Eklentiyi kurulabilir kılan pazar yeri tanımı |
| `plan.md` | Ürün planı, kararlar ve durum |
| `hukuk/` | Hukuki metin taslakları ve değerlendirme notu |
| `öğrenilmiş/` | Alan bilgisi tabanı (önceki çalışma) |

## Yerelde deneme

```bash
claude plugin marketplace add ./
claude plugin install akreddit@akreddit
```

Sonra bir klasörde Claude Code'u aç ve `/akreddit:baslat` yaz. Aracı elle de kullanabilirsin: `akreddit durum`, `akreddit baglan`.
Yerel sunucuya karşı denemek için `AKREDDIT_SUNUCU=http://localhost:3000`.

## Test

```bash
node --test eklenti/test/akreddit.test.mjs
claude plugin validate ./ && claude plugin validate ./eklenti
```

Gereken: Node 22.13 ya da üstü (`node:sqlite`).
