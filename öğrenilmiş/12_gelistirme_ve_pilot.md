# Geliştirme sırası ve pilot doğrulama

Statü: Önerilen uygulama planı. Tarih ve süre taahhüdü içermez.

## Öncelik sırası

| Dilim | Teslim | Kabul koşulu |
|---|---|---|
| 0 | Repo incelemesi, karar kayıtları, API sözleşmesi, sentetik veri | Mevcut işe zarar vermeyen tekrar üretilebilir geliştirme ortamı |
| 1 | Tenant/program/rol, demo paket, kanıt yükleme, mock worker, onay ve audit | İki kurum arasında API, dosya ve iş izolasyonu testleri geçer |
| 2 | Gerçek ayrıştırma/OCR, kaynak parçaları ve etiket önerisi | Hatalı dosya güvenli reddedilir; kaynaklı öneri onay bekler |
| 3 | Ders/çıktı sürümleri ve matris | İlişkisiz/belirsiz/1–5 ayrımı ve revizyon geçersizleşmesi çalışır |
| 4 | Kaynaklı bölüm taslağı, rapor onayı, snapshot ve export | Onaysız veya erişimsiz kanıtla kesin rapor oluşmaz |
| 5 | İyileştirme ve ölçme politikasıyla başarım hesabı | Eksik veri, sıfır payda, tekrar ölçüm ve kohort testleri geçer |
| 6 | Gerçek kurum pilotu ve maliyet ölçümü | Veri kullanım koşulları tamam; kalite ve zaman kazanımı ölçülür |

Kurumsal SSO, resmî paket adaptörleri, SIS/LMS entegrasyonu ve yerel mobil istemciler kullanım bulgularına göre ilerler. İlk geliştirme geniş bir dashboard çizmekle başlamaz; kanıtın güvenli yüklenip kaynaklı öneriye ve insan kararına dönüşmesini tamamlar.

## Kritik kabul senaryoları

- A kurumunun kullanıcısı B kurumuna ait belge, job, export veya vektör sonucuna erişemez.
- Aynı kurumda yetkisiz programın kaydı görülemez; ortak kanıt yalnız açıkça verilen kapsamlarla paylaşılır.
- Aynı yükleme veya job tekrarı tek mantıksal kayıt üretir.
- Yeni dosya sürümü, eski kaynakla üretilen öneriyi güncellik kontrolüne sokar.
- Standart sürümü değiştiğinde eski rapor aynı içerikle yeniden üretilebilir.
- Matris hiçbir ilişki kuramadığında tüm hücreleri 1 yapmaz.
- Raporda bulunmayan kanıt kimliği ve desteklenmeyen sayısal iddia reddedilir.
- Kötü niyetli belge talimatı veri erişimi veya onay işlemi yaptıramaz.
- OCR sağlayıcısı kesildiğinde veri kaybı olmaz; kullanıcı manuel devam edebilir.
- İki kullanıcı aynı revizyonu farklı onaylarsa ikincisi çakışma alır.
- Sayısal formüllerde sıfır payda, eksik puan, muafiyet ve gerçek sıfır farklı davranır.
- Silme kapsamı türevleri içerir; hukuki saklama engeli korunur.

Bunlar uygulama için test gereksinimleridir; bu bilgi paketi hazırlanırken çalıştırılmış uygulama testleri değildir.

## Pilot tasarımı

Öneri: Farklı alan ve belge kalitesini temsil eden az sayıda program; karşılaştırılabilir eski yöntem işleri; ayrı eğitim ve değerlendirme örnekleri. Başlangıç örneği olarak 3 program düşünülebilir, müşteri taahhüdü değildir.

Ölçülecekler: iş başına insan süresi, düzeltme oranı, hatalı kabul, kaynak kapsaması, eksik veri, belge türüne göre OCR başarımı, LLM/OCR/depolama maliyeti ve ilk faydaya kadar geçen süre. İşler arası karmaşıklık farkı kaydedilir. Sonuçlar sayısal örneklem ve sınırlılıklarıyla açıklanır.

`birim maliyet = OCR + model + depolama/transfer payı + işçi işlem maliyeti + insan destek payı`

Fiyatlandırma hipotezi: kurum tabanı + etkin program sayısı + dahil kullanım. Yalnız token üzerinden fiyatlandırma akademik kullanıcıya anlaşılır bir değer sunmayabilir. Fiyatlar, ödeme isteği ve satın alma süreçleri müşteri görüşmesiyle doğrulanır. Faaliyet raporundaki akredite program sayısı toplam pazar büyüklüğü olarak kullanılmaz.

## Karar kayıtları

- ADR-001: Modüler monolit ve ayrı işçilerle başla.
- ADR-002: Standartları sürümlü veri paketi olarak tut.
- ADR-003: Kanıtları dosya sürümü ve kaynak konumuna bağla.
- ADR-004: Model çıktılarını insan onayından ayır.
- ADR-005: İlişki, başarım, olgunluk ve model güvenini ayır.
- ADR-006: Kurum + program yetkisini bütün veri yollarında uygula.
- ADR-007: Raporu dondurulmuş veri ve manifest ile dışa aktar.

## Açık kararlar

İlk müşteri ve pilot programlar; resmî çerçeve ve uygulanacak sürüm; veri merkezi/sağlayıcı; gerçek veri işleme izinleri; kurumun saklama ve ölçme politikası; ilk export biçimi; SSO/OBS ihtiyacı; bütçe; destek ve hizmet seviyesi. Bunlar geliştirme sırasında karar sahibi ve tarihle izlenmelidir. Sentetik veriyle ilk dilimi başlatmak için tümünün kesinleşmesi gerekmez.
