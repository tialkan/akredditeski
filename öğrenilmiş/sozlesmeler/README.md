# Makinece okunabilir başlangıç sözleşmeleri

JSON Schema Draft 2020-12 biçiminde dört şema ve sentetik örnekler bulunur. Bunlar üretim API'sinin tamamı değildir. Demo paket şeması bilinçli olarak yalnız taslak, sentetik, resmî olmayan paketleri kabul eder; yayımlanmış resmî paket için 02 numaralı belgedeki tam yaşam döngüsü ayrıca uygulanmalıdır.

| Şema | Örnek |
|---|---|
| [Matris önerisi](matris-onerisi.schema.json) | [Üç durumlu örnek](matris-onerisi.ornek.json) |
| [Kanıt önerisi](kanit-onerisi.schema.json) | [Kaynaklı etiket](kanit-onerisi.ornek.json) |
| [Rapor taslağı](rapor-taslagi.schema.json) | [Olgusal iddia ve eksikler](rapor-taslagi.ornek.json) |
| [Demo paket](demo-paket.schema.json) | [Program paketi](demo-paket.ornek.json), [ikinci bağımsız paket](ikinci-paket.ornek.json) |

[Sentetik girdi](sentetik-girdi.json) örneklerin referans verdiği kaynak pasajını içerir. Bu kimlikler gerçek kurum, öğrenci veya üretim verisi değildir. Rapor örneği sözleşmeyi göstermek içindir; gerçek kullanımda ancak onaylanmış bağlantılardan üretilebilir. Ham LLM çıktısının JSON Schema'yı geçmesi onay veya doğruluk anlamına gelmez.

Sunucu ek kontrolleri: kimliklerin girdide varlığı, tenant/program kapsamı, pasajın belirtilen belgeye aitliği, ölçütün çevrim paketiyle eşleşmesi, çıktı çifti tekrarları, kaynak güncelliği ve iddia desteği. Şemaların kapsamadığı bu kontrolleri uygulama katmanında tamamla.

Matris örneğinde yalnız `related` durumu puan taşır. Boş kaynakla ilişkili puan reddedilir. Kanıt adayı bulunamıyorsa boş `candidates` ile anlamlı `no_match_reason` gerekir. Raporun her olgusal iddiasında en az bir kaynak veya hesaplama referansı bulunur. Tüm model çıktıları `unreviewed` olarak kalır.
