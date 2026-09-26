# Kanıt yönetimi ve belge işleme

Statü: Kaynak sentezi ve ürün tasarımı. Dayanak: L01, L06, L19, L22; güvenlik kaynakları W06–W08.

## Dosya ile kanıtı ayır

Dosya bir nesnedir; kanıt, o dosyanın belirli sürümündeki bölümün bir iddiaya bağlanmasıdır. Tek dosya birden çok ölçüte bağlanabilir. Kullanıcıya klasör benzeri görünüm sunulabilir fakat arka planda dosya taşımak veya çoğaltmak gerekmez.

Her kanıt kaydı: kurum, program kapsamları, belge türü, başlık, olay tarihi, kapsanan dönem, yükleyen, sahip, gizlilik düzeyi, dosya sürümü, hash, işlem durumu, onay durumu, saklama politikası ve kaynak konumlarını taşır. `uploaded_at` hiçbir zaman `event_date` yerine otomatik kullanılmaz.

## İşleme hattı

1. API, kimlik ve program yetkisini kontrol ederek kısa süreli yükleme oturumu verir.
2. Dosya karantina alanına alınır. Uzantı, gerçek içerik türü, boyut, sayfa sayısı ve kötü amaçlı içerik kontrolleri yapılır. DOCX içindeki bağlantılar/makrolar çalıştırılmaz.
3. Sunucu nesnenin varlığını ve hash'ini doğrular; istemcinin “tamamlandı” beyanı yeterli değildir.
4. Metin katmanı varsa ayrıştırılır. Görüntü içeren sayfalarda OCR uygulanır. Her parça sayfa, paragraf/tablo/hücre veya görüntü kutusuna bağlanır.
5. Okunabilirlik, eksik sayfa, dönüklük ve tablo yapısı kontrol edilir. İlgisiz belgeden tarih tahmini yapılmaz.
6. Kişisel veri içeren kısımlar tanımlı politika ile sınırlanır veya maskelenmiş türev oluşturulur. Asıl dosya erişimi ayrı kalır.
7. Yetkili program ve etkin standart paketi içinde aday ölçütler aranır; model gerekçeli etiket önerir.
8. Kullanıcı öneriyi onaylar, değiştirir veya reddeder. Yalnız onaylı bağlantılar raporun olgusal dayanağı olabilir.
9. Yükleme, işleme, erişim, düzeltme, onay ve dışa aktarma olayları kaydedilir.

Durumlar iki eksende tutulur: `processing_status = quarantined|queued|processing|ready|failed`; `review_status = unreviewed|in_review|approved|rejected|stale`. OCR bitmesi belgeyi onaylamaz.

## Kanıt türleri ve yorum sınırları

| Tür | Destekleyebileceği iddia | Tek başına göstermediği şey |
|---|---|---|
| Politika/prosedür | Sürecin tanımı ve onayı | Sahada düzenli uygulama |
| Tutanak ve karar | Görüşme, karar ve sorumluluk | Kararın uygulanması veya etkisi |
| İzlence | Planlanan kazanım, içerik ve yöntem | Öğrencinin gerçek başarımı |
| Sınav ve rubrik | Ölçme aracının içeriği | Tüm öğrencilere ilişkin sonuç |
| Puan dökümü ve analiz | Tanımlı örneklemde ölçülen sonuç | Veri dışında kalan grubun başarısı |
| Anket | Katılımcıların görüşleri | Tek başına doğrudan kazanım |
| Uygulama/staj formu | Mesleki uygulama kaydı | Gözetim ve değerlendirmenin niteliği |
| Fotoğraf | Belirli ortamın veya etkinliğin görünümü | Süreklilik, tarih doğruluğu, imza gerçekliği |
| Envanter | Kayıtlı altyapı | Kullanılabilirlik ve kullanım sıklığı |
| Web kaydı | Yakalanan tarihte kamuya açıklanan bilgi | Geçmişten beri kesintisiz erişim |
| İyileştirme analizi | Önce/sonra değişimi | Kontrol edilmeyen nedenlerin etkisi |

## Etiket önerisi

Aday sonuç; `criterion_id`, paket sürümü, ilgili pasaj referansları, ilişki gerekçesi, desteklenen iddia, eksik bağlam ve inceleme nedenlerini içerir. Modelin bildirdiği güven puanı, doğruluk olasılığı olarak sunulmaz. Güven eşikleri doğrulanmış örneklerle kalibre edilir; ilk sürümde tüm bağlantılar insan onayı gerektirir.

Yanlış program, eski dönem, karşıt kanıt, eksik imza veya okunamayan tablo bir inceleme işareti oluşturur. “Destekleyici” yanında `contradictory` ve `context_only` bağlantı rolleri bulunur. Sistem olumsuz kanıtı gizlemez.

## Sürüm ve silme

Yeni içerik yeni dosya sürümüdür. Eski sürümün üzeri yazılmaz. Yeni sürüm eklenince eskiye dayanan ilişkiler ve taslaklar incelemeye alınır; onaylı snapshot değişmez. Birebir kopyalar kurum içinde hash ile tespit edilir. Kurumlar arası hash araması yapılmaz; böyle bir sonuç başka müşterinin dosyası hakkında bilgi sızdırabilir.

Silme talebi; hukuki saklama engeli, rapor bağımlılıkları ve yetki bakımından değerlendirilir. Gerçek silme; nesne, OCR metni, küçük görüntü, embedding, önbellek ve zamanla yedekleri kapsar. Sadece arayüzden saklamak imha değildir. Asıl kâğıdın imhası Akreddit tarafından otomatik kararlaştırılmaz.

## Hata davranışı

Bozuk PDF için açıklayıcı hata ve yeniden yükleme; parolasız okunamayan belge için kullanıcıdan kilitsiz kopya; düşük kaliteli fotoğraf için yeniden çekim; model kesintisinde manuel etiketleme sunulur. Tekrar denemeler aynı kanıt sürümünü ve aynı işi çoğaltmaz. Başarısız iş rapora başarıyla tamamlanmış gibi yansımaz.
