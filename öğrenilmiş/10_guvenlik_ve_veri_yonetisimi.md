# Güvenlik ve veri yönetişimi

Statü: Ürün kontrol tasarımı ve doğrulanacak kurum kararları. Hukuki uygunluk belgesi değildir. Dış dayanaklar W05–W08; yerel öğrenme L06, L11, L14, L17.

## İşlenecek veriler

Sınav kâğıtları ad, öğrenci numarası, not, el yazısı ve imza içerebilir. Staj ve destek belgeleri sağlık veya özel gereksinim bilgisi de içerebilir. Kanıt toplamak için her veriyi toplamak gerekmez. Mümkün olduğunda kimliksiz toplulaştırılmış analiz ve gerekli sayfa/parça kullanılır.

Önerilen sınıflar: `public`, `internal`, `restricted`, `special_handling`. Bunlar ürün erişim kategorileridir; kanundaki veri sınıflandırmasının yerine geçmez. İsim yerine kod kullanılması tek başına anonimleştirme sayılmaz.

## Kurum izolasyonu

Kimlik doğrulama → aktif kurum üyeliği → program/ders yetkisi → belge hassasiyeti → işlem yetkisi sırasıyla kontrol edilir. Bu zincir yükleme, indirme, arama, embedding, worker, export ve rapor kaynak seçimi için aynıdır.

PostgreSQL RLS ikinci savunma katmanı olarak önerilir. Uygulama rolü tablo sahibi, superuser veya `BYPASSRLS` olmamalıdır; uygun tablolarda `FORCE ROW LEVEL SECURITY` düşünülür. Tenant bağlamı doğrulanmış oturumdan transaction başında kurulur ve bağlantı havuzunda sızmaz. GUC ayarlamak kimlik doğrulaması değildir; doğrudan DB erişimi istemciye verilmez. [PostgreSQL RLS belgesi](https://www.postgresql.org/docs/current/ddl-rowsecurity.html).

## Dosya ve model sınırı

Dosyalar özel depoda tutulur. Kısa süreli imzalı bağlantı verilmeden önce erişim yeniden kontrol edilir. Nesne anahtarı veya tahmin edilemez UUID yetkilendirme yerine geçmez. Dosya uzantısına güvenilmez; karantina, içerik doğrulama, boyut sınırı ve ayrıştırıcı izolasyonu uygulanır. [OWASP dosya yükleme rehberi](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html).

LLM/OCR sağlayıcısına yalnız görev için gerekli ve yetkili içerik gönderilir. Bölge, alt işleyenler, saklama, model eğitimi kullanımı, destek erişimi ve silme şartları seçim öncesi değerlendirilir. İmzaları doğrulamak veya kişileri biyometrik olarak tanımak bu ürünün görevi değildir.

## Kişisel veri kararları

Veri sorumlusu/veri işleyen rolleri sözleşme ve fiilî işleme amaçlarına göre belirlenir. Kurum çoğu akademik işleme amacını belirleyebilir; Akreddit'in hesap/faturalama gibi kendi amaçları ayrı değerlendirilmelidir. Tek cümlelik rol kabulü bütün işlemleri kapsamaz.

Yurt dışı OCR, model, loglama, destek ve yedek hizmetleri bir aktarım değerlendirmesi gerektirebilir. Yalnız sunucunun Türkiye'de olması bütün veri akışlarını açıklamaz. Uygulanabilir aktarım mekanizması, tarafların rolleri ve sözleşmeler kurumun yetkili hukuk/veri koruma ekibiyle belirlenir. Standart sözleşmeler taraf rollerine göre farklılaşır. [KVKK yurt dışına aktarım rehberi](https://www.kvkk.gov.tr/Icerik/8142/Kisisel-Verilerin-Yurt-Disina-Aktarilmasi-Rehberi).

## Saklama ve imha

Tek bir genel saklama süresi belirlenmez. Belge kategorisi, işleme amacı, başlangıç olayı, kurum yükümlülüğü, sözleşme ve devam eden uyuşmazlık birlikte değerlendirilir. `legal_hold` varsa otomatik silme durur. İmha işlemi yetkili kişi ve kayıtlı gerekçeyle yapılır; OCR, embedding ve türevler kapsam dışında bırakılamaz. Yedeklerin yaşlanarak temizlenme planı ve geri yükleme sonrası silme taleplerinin tekrar uygulanması tasarlanır.

## Denetim ve destek

Kim belgeyi görüntüledi, hangi kaynakla hangi öneri üretildi, kim neyi değiştirdi ve onayladı soruları yanıtlanır. Audit verisi uygulama kullanıcılarınca değiştirilemez; değişiklik tespiti ve ayrı depoya aktarım planlanır. “Değiştirilemez” iddiası salt tabloya isim vermekle sağlanmaz.

Teknik destek erişimi süreli ve amaçla sınırlıdır. Olay yönetimi sorumlusu, tespit/inceleme/kontrol altına alma adımları ve ilgili bildirim süreçleri canlı pilot öncesi belirlenir. Yasal bildirim süreleri burada sabitlenmez; güncel düzenleme ve olayın niteliğiyle doğrulanır.

## Canlı veri öncesi tamamlanacaklar

Veri envanteri, kurum politikası, erişim matrisi, sağlayıcı sözleşmeleri, saklama/imha planı, tenant izolasyon testleri ve yedekten dönüş kontrolü. Bu gereklilikler sentetik veriyle prototip geliştirmeyi engellemez; gerçek veri kullanımına geçiş ölçütüdür. Herhangi bir sertifikanın bütün müşteriler için zorunlu olduğu, kaynak kuruluşun iç yönergesinden hareketle varsayılmaz.
