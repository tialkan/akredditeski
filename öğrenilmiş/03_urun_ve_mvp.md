# Ürün kapsamı ve ilk sürüm

Statü: Kullanıcı vizyonu ve önerilen ürün kararları. Tasarım dayanağı: L01, L19, L22–L24.

## Kullanıcı ve değer

İlk kullanıcı, bir MYO programının kalite çalışmalarını yürüten öğretim elemanı ve komisyondur. Kurum yöneticisi programların eksiklerini görür; öğretim elemanı kendisine ait kanıt ve önerileri hızla tamamlar. İlk satış birimi için öneri, bir kurum altında sınırlı programlı ücretli pilottur. Fiyat, satın alma yöntemi ve satış süresi doğrulanmış değildir.

Ana akış: **Belgeyi ekle → öneriyi incele → onayla → kaynaklı rapor taslağını oluştur.** Aynı veri yeniden yazdırılmaz.

## MVP yetenekleri

| Yetenek | Girdi ve sonuç | Tamamlanma ölçütü |
|---|---|---|
| Kurum ve program çalışma alanı | Üyeler, roller, dönem ve paket seçimi | Yetkisiz kurum/program verisi erişilemez |
| Kanıt yükleme | PDF, DOCX, JPEG, PNG; sürümlü belge | Güvenli kabul, iş durumu, sayfa referansı ve hata açıklaması |
| OCR ve alan çıkarımı | Belge ve görüntü | Kaynak konumlu metin; okunamayan alanlar boş ve işaretli |
| Akıllı etiket önerisi | Kanıt ve etkin ölçütler | Birden fazla gerekçeli aday; kullanıcı onayı; özgün dosya korunur |
| Matris motoru | Onaylı ders ve program çıktıları | 1–5 katkı önerisi, ilişkisiz/belirsiz ayrımı, kaynaklı gerekçe |
| Öz değerlendirme taslağı | Onaylı kanıt bağlantıları ve tablolar | İddia–kaynak ilişkisi, eksik bilgi işaretleri ve bölüm onayı |
| İyileştirme kaydı | Bulgu ve karar | Sorumlu, termin, uygulama ve yeniden ölçme bağlantısı |
| Dışa aktarma | Dondurulmuş rapor ve kanıt dizini | PDF/DOCX hedefi, kontrollü kanıt paketi ve manifest |
| Kullanım ve maliyet kaydı | OCR/LLM işleri ve depolama | Kurum bazlı kota, süre ve maliyet görünürlüğü |

İlk çalışan dilim: iki sentetik kurum, bir program, bir demo standart paketi, kanıt yükleme, sahte işlem sağlayıcısı, insan onayı ve olay kaydı. Gerçek OCR ve LLM bunun üstüne eklenir. Mock sonuçları gerçek analiz gibi gösterilmez.

## Roller

- **Kurum yöneticisi:** Üyelik, program erişimi, politika ve paket kurulumu.
- **Program sorumlusu:** Program verisi, çıktılar, görev dağılımı ve rapor onayı.
- **Öğretim elemanı:** Yetkili derslere belge ve matris önerisi ekleme/düzeltme.
- **Kalite gözden geçireni:** Kendisine açılan programlarda kaynak ve tutarlılık incelemesi.
- **Misafir inceleyici:** İleriki aşamada belirli bir snapshot'a süreli salt okunur erişim.

SaaS işletmecisi müşteri belgelerini varsayılan olarak göremez. Teknik destek erişimi amaç, süre ve denetim kaydıyla açılır.

## MVP dışı

Resmî başvuru portallarına otomatik gönderim, akreditasyon kararı üretme, değerlendirici atama pazaryeri, seyahat/harcırah muhasebesi, tam öğrenci bilgi sistemi, tüm kurumların verileriyle model eğitimi ve yerel mobil uygulamalar ilk kapsamın dışındadır. SwiftUI/Kotlin istemcilerine uygun API sınırları ilk günden kurulur.

Gerçek öğrenci notlarından ayrıntılı başarım hesabı, gerekli veri izinleri ve ölçme yöntemi doğrulanınca ikinci dilimde açılır. MVP, matrisi başarı ölçümü diye sunmaz; mevcut doğrulanmış analiz tablolarını rapora kaynak olarak alabilir.

## Başarıyı ölç

Yüzde 70 yük azaltımı hedefi için aynı tür ve kapsamda işlerin insan tarafından harcanan süresi ölçülür:

`azalma = 1 - (yükleme + düzeltme + inceleme + onay süresi) / eski yöntem süresi`

Modelin bekleme süresi ayrıca raporlanır. Hız kazanımı hatalı sınıflandırma, eksik kanıt veya inceleme yükü pahasına sağlanmışsa başarı sayılmaz. Satış metninde pilot sonucu olmadan yüzde 70 gerçekleşmiş gibi yazılmaz.
