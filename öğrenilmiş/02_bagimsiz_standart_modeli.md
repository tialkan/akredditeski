# Kuruluştan bağımsız standart modeli

Statü: Akreddit tasarım kararı. Öğrenme dayanağı: L09, L20, L21, L24, L25.

## Çekirdek ve standart paketi

Çekirdek; kurum, program, dönem, çıktı, kanıt, bulgu, değerlendirme, görev ve raporu bilir. Ölçüt numaraları, bir kuruluşun adı, resmî puan açıklamaları ve karar süreleri çekirdek kodda bulunmaz.

Bir standart paketi şu alanları taşır:

| Alan | Kullanım |
|---|---|
| `id`, `version`, `status` | Kararlı kimlik, sürüm, taslak/yayımlanmış/kullanımdan kaldırılmış |
| `publisher`, `source_uri`, `source_hash`, `license_note` | Köken ve kullanım hakkı |
| `scope_type` | Kurum, program veya başka tanımlı kapsam |
| `published_on`, `effective_from`, `effective_until` | Yayım ile uygulanma tarihlerini ayırır |
| `applicability` | Dönem, program alanı, öğretim biçimi gibi koşullar |
| `criteria` | Kimlik, hiyerarşi, görünen kod, başlık, açıklama |
| `rubrics` | Ayrı kimlik ve semantik taşıyan puanlama tanımları |
| `evidence_expectations` | İddia türü, dönem, kapsam ve uygun kanıt önerileri |
| `rules` | Birimi, sınırı, istisnası ve kaynağı belli deterministik kurallar |
| `report_template_version` | Paketle uyumlu dışa aktarma düzeni |

Dış kaynak paketleri ürünle aynı sürümde yayımlanmak zorunda değildir. Paket ekleme işlemi kaynak ve kullanım hakkı incelemesi, alan uzmanı kontrolü, test ve yayım aşamalarından geçer. Bu çalışma resmî bir paket oluşturmaz.

## Akreddit'in özgün iç çalışma başlıkları

Aşağıdaki kodlar yalnız ürün içi bilgi düzenidir; resmî ölçütler veya sertifikasyon şeması değildir. Müşteri kendi başlıklarını kullanabilir.

| Kod | Alan | Yanıtlanacak soru |
|---|---|---|
| `AK-HEDEF` | Programın yönü | Mezuna hangi gelecek hedefleniyor ve nasıl izleniyor? |
| `AK-TASARIM` | Öğrenmenin tasarımı | Çıktılar, içerik, iş yükü ve öğretim etkinliği uyumlu mu? |
| `AK-OLCME` | Öğrenmenin değerlendirilmesi | Hangi doğrudan veriler kazanımı gösteriyor? |
| `AK-DENEYIM` | Öğrenci deneyimi | Kabulden mezuniyete öğrencinin gelişimi nasıl destekleniyor? |
| `AK-UYGULAMA` | Mesleki uygulama | Saha öğrenmesi nasıl planlanıyor ve değerlendiriliyor? |
| `AK-KAYNAK` | İnsan ve ortam | Eğitim için gerekli uzmanlık ve imkânlar mevcut mu? |
| `AK-KATILIM` | Paydaş katılımı | Görüşler hangi kararlara dönüşüyor? |
| `AK-IYILESTIRME` | İzleme ve değişim | Değişikliğin etkisi yeniden ölçülüyor mu? |
| `AK-YONETISIM` | Sorumluluk ve kayıt | Kararlar, erişimler ve belgeler izlenebilir mi? |

## Sürüm değişikliği

Her değerlendirme çevrimi belirli bir paket sürümüne sabitlenir. En büyük sürüm numarası otomatik olarak uygulanacak sürüm değildir. Kapsam ve yürürlük kararı doğrulanmalıdır.

Güncelleme geldiğinde eski ve yeni ölçütler arasında `same`, `modified`, `split`, `merged`, `added`, `retired` ilişkileri önerilir. İlişki çoktan çoğa olabilir. Onaylayan kişi, gerekçe ve kaynak kaydedilir. Bir ölçütün aynı numarayı koruması aynı anlama geldiğini kanıtlamaz.

Yeni sürüm eski çevrime uygulanacaksa yeni bir çevrim/snapshot oluşturulur. Kanıt bağlantıları aday olarak taşınır; onay ve uygunluk puanları otomatik miras alınmaz. Etkilenen matrisler ve rapor bölümleri `stale` işaretlenir. Tarihsel rapor kendi paketi ve verisiyle yeniden üretilebilir.

## Bağımsızlık kabul ölçütleri

- İkinci bir hayalî standart paketi kod değişmeden yüklenebilir.
- Ölçütlerin numarası ve sırası değişse de kanıtların kimliği değişmez.
- Aynı kanıt iki çerçeveye iki ayrı gerekçeyle bağlanabilir.
- Resmî başvuru, sertifika veya dış kurul kararı uygulama tarafından verilmez.
- Saklama süresi, kredi sınırı ve yanıt tarihi paket/kurum politikası üzerinden gelir; kaynaksız varsayılan yoktur.
- Resmî rapor biçimi istenirse ayrıca doğrulanmış bir export adaptörü gerekir.
