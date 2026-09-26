# Akreddit geliştirme bilgi tabanı

Hazırlanma tarihi: 26 Eylül 2026. Sürüm: 0.1. Dil: Türkçe.

Akreddit, meslek yüksekokullarında kanıt toplama, öğrenme çıktılarıyla ilişkilendirme ve öz değerlendirme hazırlığını kolaylaştıran çok kurumlu bir SaaS ürünüdür. Bu paket, kaynak belgelerdeki iş bilgisini bağımsız bir ürün tasarımına dönüştürür. Herhangi bir kuruluşun resmî ölçüt seti, onaylı rapor şablonu veya akreditasyon kararı değildir.

## Başlangıç

Diğer LLM'e önce [masterprompt.md](masterprompt.md) dosyasını ver. Dosyalara erişimi varsa bu klasörü birlikte aç; yoksa aşağıdaki sırayla belgeleri ekle. Masterprompt tek başına da ürünün sınırlarını ve ilk geliştirme görevini anlatır.

| Belge | Kullanım |
|---|---|
| [01 Alan bilgisi](01_alan_bilgisi.md) | Kavramları ve yanlış çıkarımları anla |
| [02 Bağımsız standart modeli](02_bagimsiz_standart_modeli.md) | Kuruluş bağımlılığını önle |
| [03 Ürün ve MVP](03_urun_ve_mvp.md) | Kapsamı ve kabul ölçütlerini belirle |
| [04 Kanıt yönetimi](04_kanit_yonetimi.md) | Yükleme, OCR, sınıflandırma ve yaşam döngüsü |
| [05 Matris ve ölçme](05_matris_ve_olcme.md) | İlişki puanı ile gerçek başarımı ayır |
| [06 Rapor ve iyileştirme](06_rapor_ve_iyilestirme.md) | Kaynaklı taslak ve kapanan iyileştirme döngüsü |
| [07 Veri modeli](07_veri_modeli.md) | Tablolar, ilişkiler, sürümler ve kısıtlar |
| [08 Mimari ve API](08_mimari_ve_api.md) | Uygulama sınırları ve mobil uyum |
| [09 Yapay zekâ sözleşmeleri](09_yapay_zeka_sozlesmeleri.md) | Promptlar, değerlendirme ve hata davranışı |
| [10 Güvenlik ve veri yönetişimi](10_guvenlik_ve_veri_yonetisimi.md) | Kurum izolasyonu ve kişisel veri yönetimi |
| [11 UX](11_ux.md) | Sade, erişilebilir onay ve yükleme akışları |
| [12 Geliştirme ve pilot](12_gelistirme_ve_pilot.md) | İş sırası, testler, başarı ölçümü ve açık kararlar |
| [13 Ek araştırma](13_ek_arastirma.md) | Resmî dış kaynaklardan çıkarılan ek bilgi |
| [Şablonlar](sablonlar/README.md) | Kullanılabilir bağımsız kayıt ve rapor taslakları |
| [Sözleşmeler](sozlesmeler/README.md) | JSON Schema ve sentetik örnekler |
| [Kaynak denetimi](kaynaklar/inceleme_ve_arindirma.md) | Dosya bazında öğrenilenler, çelişkiler ve sınırlar |
| [Kaynak envanteri](kaynaklar/yerel_kaynaklar.json) | 25 kaynak dosyanın kimliği ve SHA-256 özeti |
| [Doğrulama kaydı](kaynaklar/dogrulama.md) | Şema, örnek, bağlantı ve kaynak bütünlüğü kontrolleri |

## Bilgilerin statüsü

- **Gözlem:** Yerel belgelerde görülen süreç veya veri ihtiyacı. Kaynak kimlikleri `L01–L25`.
- **Dış kaynak:** Resmî web sayfasında araştırılan bilgi. Kimlikler `W01–W09`; bağlantılar 13 numaralı belgede.
- **Tasarım kararı:** Akreddit için önerilen yaklaşım; resmî zorunluluk değildir.
- **Doğrulanacak:** Pilot, kurum politikası veya güncel resmî yayın ile kesinleşmesi gereken konu.

Yerel dosyalar değiştirilmedi. Tam metin kopyaları, logolar, kişiler, adresler, kuruluşun görev dağılımı ve resmî karar yetkileri ürün belgelerine taşınmadı. Kaynak dosya adları yalnızca izlenebilirlik için envanterde korunur. Kaynakta geçen sayısal eşikler, saklama süreleri ve başvuru takvimleri ürün varsayılanı yapılmadı.

Bu çalışma bir yazılım teslimi değildir. Mimari ve veri modeli uygulanacak tasarımdır; JSON örnekleri sentetiktir. Çalışan OCR, LLM, veritabanı veya web uygulaması henüz oluşturulmamıştır. Yüzde 70 otomasyon kullanıcı hedefidir; ölçülmüş sonuç değildir.
