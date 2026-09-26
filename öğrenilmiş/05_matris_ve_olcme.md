# Matris motoru ve ölçme yöntemi

Statü: Akreddit için önerilen yöntem. Bu belgedeki puan rubriği ve formüller resmî akreditasyon kuralı değildir. Dayanak: L19, L20, L21, L22; W04.

## Birbirinden bağımsız dört değer

1. `relationship_strength`: Beklenen katkı için 1–5 puan.
2. `attainment`: Gerçek ölçme verisinden hesaplanan 0–100 sonuç.
3. `maturity_level`: Seçili standart paketinin süreç olgunluğu rubriği.
4. `model_confidence`: Kalibre edilmemişse yalnız öneri niteliğindeki model güveni.

Bunların birbirine çevrilmesi yasaktır. İlişki matrisi tasarım uyumunu anlatır. Başarım hesabı için ölçme aracı, puanlar, çıktı eşlemesi, dönem ve nüfus gerekir.

## Girdi sözleşmesi

Ders kimliği ve sürümü; ders öğrenme çıktıları; program çıktıları ve sürümleri; ders içeriği; öğretim etkinlikleri; ölçme planı; kaynak konumları. Yalnız ders adıyla matris tamamlanmaz. Eksik ölçme planı yüksek katkı iddiasını sınırlar.

Önce ders çıktısı × program çıktısı matrisi hazırlanır. Ders düzeyinde özet istenirse kuruma ait sürümlü toplulaştırma yöntemi kullanılır. Örneğin maksimum ilişki kullanımı genel kapsama işaret edebilir, ağırlıklı ortalama başka anlam taşır; yöntem gizlenmez.

## Önerilen katkı rubriği

| Durum/puan | Bağımsız anlam |
|---|---|
| `unrelated`, `score=null` | Belgelerde ilişkiyi destekleyen temel yok |
| `insufficient_evidence`, `score=null` | Karar için girdi eksik veya okunamıyor |
| 1 | Konuya sınırlı temas, yardımcı katkı |
| 2 | Temel bir bileşeni açıklama veya yönlendirilmiş alıştırma |
| 3 | Çıktının anlamlı bir bileşenini uygulama ve değerlendirme |
| 4 | Çıktıyı büyük ölçüde kapsayan, ölçme planıyla desteklenen uygulama |
| 5 | Çıktının temel kazanım sorumluluğunu taşıyan kapsamlı ve doğrudan değerlendirme |

`0` depolanmaz; ilişkisizlik ayrı durumdur. Bir dışa aktarma şablonu sıfır istiyorsa yalnız gösterim katmanında dönüşüm yapılır. Bilinmeyen değer sıfıra dönüştürülmez. 4 ve 5 önerileri ölçme planındaki belirteçle desteklenir; aksi durumda insan inceleme bayrağı oluşur.

## İş akışı

Çıktıların gözlenebilirliği ve sürümü kontrol edilir. Aday çiftler anlamsal aramayla daraltılabilir; bu eleme, ilgili çiftlerin atlanmadığı test edilerek yapılır. Model her çift için ilişki durumu, puan, kısa gerekçe, kaynak referansları, eksik bilgi ve inceleme nedenlerini üretir. Şema, kimlikler ve kaynakların gerçekten mevcut olduğu sunucuda doğrulanır. Kullanıcı hücreyi kaynak pasajı yanında görür ve onaylar. Onaylayan, önerilen ve son değer birlikte saklanır.

Bir ders çıktısı değiştiğinde ona bağlı onaylar `stale` olur. Aynı girdiye tekrar analiz eski kararı sessizce değiştirmez. Kullanıcı düzeltmeleri ayrı denetim kaydıdır; otomatik olarak eğitim verisine dönüşmez.

## Başarım için örnek deterministik hesap

Aşağıdaki yöntem örnektir; pilot kurumun ölçme yaklaşımı onaylanmadan gerçek sonuç üretiminde kullanılmaz. Sonuç, resmî öğrenci notu veya otomatik mezuniyet kararı değildir.

`x(s,q)`: öğrencinin q maddesindeki puanı / o maddenin azami puanı.
`w(q)`: ölçme planında önceden tanımlı ağırlık.
`a(q,l)`: ölçme maddesinin l ders çıktısına önceden onaylı katkı katsayısı.

`A(s,l) = 100 × Σ[w(q) × a(q,l) × x(s,q)] / Σ[w(q) × a(q,l)]`

Toplam yalnız geçerli ve kapsama alınmış gözlemler üzerindendir. Eksik veri sessizce atılıp başarı yükseltilmez: beklenen ölçmelerden hangisinin eksik olduğu ve gözlenen ağırlık/toplam beklenen ağırlık oranı ayrıca döner. Kurumun minimum kapsam şartı sağlanmıyorsa `A=null, status=insufficient_data`. Sınava girmeme, muafiyet, ölçülmeme ve gerçek sıfır ayrı kodlardır. Sıfır payda `null` üretir.

Örnek: İki geçerli maddenin azami puanları 20 ve 30; alınan puanlar 16 ve 18; çıktı katsayıları 1; ağırlıklar 0,4 ve 0,6. Sonuç `100 × (0,4×0,8 + 0,6×0,6) = 68`. İki madde de bekleniyorsa ve ikincisi eksikse sonuç otomatik 80 olarak kesinleştirilmez; kapsam 0,4'tür, politika kararı gerekir.

Program çıktısı için kurumca onaylı ağırlıklarla ders çıktısı sonuçları birleştirilebilir:

`P(s,p) = Σ[b(l,p) × A(s,l)] / Σ[b(l,p)]`

`b` ayrı bir ölçme politikası parametresidir. LLM'nin ürettiği 1–5 matris değeri otomatik olarak `b` olmaz. Farklı öğrencilerin veya farklı dönemlerin sonuçları tek öğrenci sonucu gibi birleştirilmez. Aynı performansın birkaç ders üzerinden tekrar sayılması engellenir.

Öğrenci düzeyi sonuçlar kohortta ortalama, dağılım, örneklem büyüklüğü, eksik veri oranı ve kurumun tanımladığı eşik üstündeki öğrenci oranıyla birlikte sunulur. Sonuç kümesi ve hesaplama politikası sürümlüdür; yeniden hesaplama izlenebilir.

## AKTS ve kategori kontrolü

AKTS, haftalık ders saatine eşit değildir; toplam öğrenci iş yükünü temsil eder. Kurumun iş yükü politikası, etkinliklerin adet×süre hesabı ve öğrenci geribildirimi saklanır. Aynı ders birkaç kategoriye girebilir; her kategorinin toplamı ayrı hesaplanır, kategoriler toplanarak toplam müfredat kredisi şişirilmez. Eşikler doğrulanmış standart paketinden gelir. LLM aritmetik yapmaz; kaynak tablolarından gelen değerler deterministik kodla hesaplanır.
