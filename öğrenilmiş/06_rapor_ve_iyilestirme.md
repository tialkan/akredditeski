# Kaynaklı rapor ve sürekli iyileştirme

Statü: Bağımsız ürün tasarımı. Dayanak: L01, L19, L22–L25.

## Raporun veri modeli

Rapor; program bağlamı, dönem, standart paketi sürümü, veri snapshot'ı, şablon sürümü ve onay kayıtlarını taşır. Kurum profili ortak bir kaynaktır; ilgili programa ait uygulama ve sonuçlar ayrıca açıklanır. Aynı program adının farklı yürütümleri birleştirilmez.

Her bölüm şu sırayla oluşturulur: amaç ve kapsam → tanımlı süreç → gerçekleşen uygulama → ölçülen sonuç → değerlendirme → iyileştirme ve açık işler. Bu sıra bağımsız iç rapor düzenidir; resmî şablon yerine geçtiği iddia edilmez.

## Olgusal cümle sözleşmesi

Bir gerçekleşme iddiası kaynak konumuna; bir sayısal iddia sürümlü veri ve hesaplama sonucuna bağlanmalıdır. Kaynak mevcut fakat iddiayı desteklemiyorsa referansın varlığı yeterli değildir. Model, tüm öğrenciler gibi kapsam genişleten sözcükler kullanmadan önce örneklemi kontrol eder.

Örnek sentetik cümle: “2025 güz döneminde incelenen 18 proje çalışmasının 12'si, onaylı rubrikte belirlenen eşiği karşılamıştır.” Kaynak: değerlendirme tablosu sürümü, ilgili hücreler, hesaplama kaydı. Bu cümle “program çıktısı tüm öğrencilerde sağlanmıştır” biçiminde genişletilmez.

Kanıt yoksa bölüm boş başarı öyküsü üretmez: “Bu uygulamanın gerçekleştiğini gösteren onaylı kayıt bulunamadı.” Gerekli belge ve görev sahibi önerilir. Üretilen öneri geçmişte yapılmış işlem gibi yazılmaz. Karşıt kaynaklar ayrıca görünür tutulur.

## Üretim ve onay

`draft → in_review → changes_requested → draft → approved → frozen`

Her bölüm ayrı revizyondur. Kaynak değişikliği onay bekleyen bölümde güncellik uyarısı oluşturur. Onay sırasında kaynak sürümleri tekrar kontrol edilir; eski ekranla onay denemesi sürüm çakışması verir. Dondurma işlemi rapor, tablolar, referanslar ve erişime açılacak kanıt sürümlerini tek manifestte sabitler.

Rapor onayı ve kanıt dışa aktarım izni ayrı yetkilerdir. Dışa aktarma öncesi kişisel veri filtreleri, dosya erişimleri ve kırık referanslar kontrol edilir. Paket `report`, `evidence-index`, seçilmiş/maskelenmiş kanıtlar ve `manifest` içerir. Manifest dosya hash'leri, paket sürümü ve oluşturulma zamanını taşır. Dış kuruluşlara otomatik teslim yapılmaz.

## İyileştirme kaydı

| Alan | Gereken bilgi |
|---|---|
| Problem | Ölçülen eksiklik, dönem ve kaynak |
| Başlangıç değeri | Tanımı, paydası ve ölçme yöntemi |
| Karar | Yapılacak değişiklik, gerekçe ve onay |
| Sorumlu ve termin | Tek sahip, destekçiler, hedef tarih |
| Uygulama | Gerçekleşme tarihi ve uygulama kanıtı |
| Kontrol | Aynı veya karşılaştırılabilir yöntemle yeni ölçüm |
| Sonuç | Etkili, kısmen etkili, etkisiz veya henüz bilinmiyor |
| Sonraki adım | Kalıcılaştırma, değiştirme veya yeniden planlama |

Bir eylem tamamlanmış olabilir, fakat etkisi henüz bilinmeyebilir. `implemented` ile `effect_verified` ayrılır. Yeni ölçüm yoksa PUKÖ çevrimi kapanmış gösterilmez. Sorumlu yalnız görevi işaretleyerek etki onayı veremez; kontrol kanıtı gerekir.

## Tutarlılık denetimi

Sayısal tablolarda öğrenci sayıları, dönemler ve paydalar; metinde amaç–çıktı ayrımı; matrislerde sürümler; raporda kaynak yeterliliği kontrol edilir. Aynı terim ve ölçüt için farklı bölümlerdeki çelişkiler gösterilir. Dil düzeltmesi bulguyu, puanı veya akademik kararı değiştiremez. İçerik değişirse yeniden onay gerekir. Programlar/yıllar arası karşılaştırma yalnız eşdeğer kapsam ve rubriklerle yapılır.
