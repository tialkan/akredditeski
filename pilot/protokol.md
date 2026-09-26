# Akreddit pilot protokolü

Amaç: gerçek bir programda kurulumun, okumanın ve yazmanın hocanın elinde çalıştığını görmek ve süre kazancını ölçmek. Satış metnine sonuç ancak bu ölçümden sonra girer.

## Katılımcı

AYBÜ'den bir ya da iki program, %50 indirimli. Tercihen biri teknik, biri teknik olmayan bir hoca. Her programdan bir sorumlu.

## Oturum 0: kurulum (30 dakika, yanında ol)

1. Hoca tezatlas.com/akreddit/kurulum rehberini **kendisi** takip eder. Sen yalnız izlersin.
2. Takıldığı her yeri, süresiyle birlikte aşağıdaki tabloya yaz. Müdahale ettiysen onu da yaz.
3. Hedef: yardım almadan `/akreddit:baslat` ve cihaz bağlantısı.

| Adım | Süre | Takıldı mı, neden | Müdahale |
|---|---|---|---|
| Node.js kurulumu | | | |
| Eklenti ekleme | | | |
| Klasör ve başlatma | | | |
| Cihaz kodu onayı | | | |

## Oturum 1: kanıt ve matris (2 saat)

1. Hoca bir dersin izlencesini, bir kurul tutanağını ve bir sınav örneğini ekler.
2. Akreddit etiket önerir, hoca karar verir.
3. Program çıktıları ve o dersin çıktıları eklenir, matris önerileri kararlaştırılır.
4. Oturum sonunda: `akreddit pilot-raporu`.

## Oturum 2: kurum sistemi (1 saat)

1. **Okuma:** AVESİS'te "Verdiği Dersler" ve Bologna'da ders çıktıları okunur, doğruluğu hocaya sorulur.
2. **Yazma, zararsız alanda:** AVESİS'te bir dersin "Öğrenci Sayısı" ya da yeni bir "Program İyileştirme Faaliyeti" taslağı. Tablo, onay, Claude Code izni, kaydet. Gönderim yok.
3. Kayıt sonrası sayfa yeniden okunur, değer doğrulanır.

## Oturum 3: rapor bölümü (2 saat)

1. Bir öz değerlendirme bölümü yazılır, `rapor-denetle` temiz olana kadar düzeltilir.
2. Hoca bu bölümü eski yöntemle kaç saatte yazacağını tahmin eder.
3. `akreddit pilot-raporu --eski-saat <tahmin>`

## Değerlendirme

- Süre azalması, düzeltme ve ret oranı, rapor denetimi hataları (pilot raporundan).
- Hocanın üç cümlelik görüşü: en çok nerede işe yaradı, nerede zorladı, parasını öder miydi.
- Bulgular `pilot/sonuclar.md` dosyasına yazılır. Rehber ve skill metinleri buna göre düzeltilir.

Başarı sayılmaz: düzeltme oranı %40'ın üstündeyse, rapor denetiminde çözülmemiş hata kaldıysa ya da hoca yardımsız kuramadıysa.
