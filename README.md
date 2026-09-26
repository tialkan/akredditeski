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

## Kullanıcı kurulumu

Kullanıcılar için adım adım rehber: https://tezatlas.com/akreddit/kurulum

```
/plugin marketplace add https://tezatlas.com/akreddit/marketplace.json
/plugin install akreddit@akreddit
```

## Yeni sürüm yayımlama

1. `eklenti/.claude-plugin/plugin.json` içindeki `version` değerini artır.
2. `node betikler/paketle.mjs` çalıştır. Zip ve `marketplace.json` tezatatlascom deposunun `public/akreddit/` klasörüne yazılır.
3. tezatatlascom deposunda commit ve push. Kullanıcılar `/plugin marketplace update akreddit` ile alır.

Kaynak kod bu özel depoda kalır. Sitede yalnız paketlenmiş eklenti yayımlanır.

## Yerelde deneme

`claude --plugin-dir ./eklenti` ile tek oturumluk yüklenir. Yerel sunucuya karşı denemek için `AKREDDIT_SUNUCU=http://localhost:3000`.

## Test

```bash
node --test eklenti/test/akreddit.test.mjs
claude plugin validate ./ && claude plugin validate ./eklenti
```

Gereken: Node 22.13 ya da üstü (`node:sqlite`).
