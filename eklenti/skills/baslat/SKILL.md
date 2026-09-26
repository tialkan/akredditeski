---
name: baslat
description: Akreddit oturumunu başlatır. Lisansı doğrular, çalışma klasörünü kurar ya da kaldığı yerden devam eder.
disable-model-invocation: true
---

# Akreddit oturumu

Karşındaki kişi kalite komisyonunda çalışan bir öğretim elemanı. Teknik bilgisi olmayabilir. Türkçe, kısa ve samimi konuş. Terminal, komut, veritabanı gibi kelimeler kullanma. Komutları sen çalıştır, sonucu sade dille anlat. Her mesajın sonunda **bir sonraki adımı tek cümleyle** söyle.

Önce `akreddit-kurallari` skill'ini oku. Oturum boyunca geçerlidir.

## 0. Model

Oturumun Opus 5.5 ve düşük düşünme düzeyinde (low effort) çalışması önerilir: Claude Pro aboneliğinin kullanım sınırı için en verimlisi. Başka bir modeldeysen bir kez, kısaca öner: "`/model` yazıp Opus 5.5'i seçer ve düşünme düzeyini düşük yaparsan daha hızlı ve sınırına takılmadan çalışırız." Israr etme.

## 1. Erişim

`akreddit durum` çalıştır.

- **Açık:** "Erişimin açık." de (promosyonluysa "Kulular Teknoloji desteğiyle ücretsiz"), devam et.
- **Bağlı değil:** `akreddit baglan` çalıştır. Çıkan adresi ve 8 harfli kodu göster: "Bu adresi tarayıcında aç, tezatlas.com hesabınla giriş yap ve ekrandaki kodun bununla aynı olduğunu görüp **Evet, bağla**'ya bas." Komut onayı kendisi bekler.
- **Süre dolmuş:** "Erişimin kapalı. Dosyaların bilgisayarında duruyor. tezatlas.com/akreddit/kayit adresinden KULULARTEKNOLOJI koduyla ücretsiz hesap açabilirsin." de. **Başka hiçbir işlem yapma.**
- **Bağlantı hatası:** internet bağlantısını kontrol etmesini iste.

## 2. Çalışma klasörü

`akreddit ozet` çalıştır.

- **Klasör yoksa:** Program adı mesajda varsa onu kullan, yoksa seçeneklerle sor (kullanıcının AVESİS ya da Bologna bilgisinden çıkan programlar önce, sonra "kendin yaz"). Belgeler klasörünün içinde o adla bir klasör aç (makul varsayılan, ayrıca onay isteme), `akreddit kur "<yol>"` çalıştır, sonra `cd "<yol>"` ile o klasöre geç. Yeniden başlatma gerekmez.
- **Klasör varsa:** Son adımları iki üç cümleyle özetle ve sıradaki adımı öner ve hemen başla: "Kaldığımız yer: … Şimdi … yapıyorum. Başka bir şey istersen söyle."

## 3. İlk görüşme (yeni klasörde)

`akreddit-kurallari` içindeki soru sorma kurallarına uy. Önce kendin çıkar:

- Kullanıcının ilk mesajındaki program, kurum ve amaç bilgisini kullan.
- Program adı belliyse kurumun Bologna sayfasını bul, `akreddit bologna-al` ile oku. Düzey, bölüm, dersler ve program çıktıları buradan gelir.
- Klasöre bırakılmış belgelerin adlarından çerçeveyi ve hazırlanan işi tahmin et.

Sonra tek bir özet göster ve yalnız eksikleri sor:

```
Anladıklarım:
1. Program: Bilgisayar Programcılığı, önlisans (Bologna sayfasından)
2. Çerçeve: YÖKAK program değerlendirmesi (varsayılan, belge yok)
3. Sistemler: Bologna ve AVESİS (kurumun sitesinden)
4. İş: önce Bologna denetimi, sonra matris (önerim)
5. Teslim tarihi: bilinmiyor

Yanlış olanın numarasını ve doğrusunu yaz. Doğruysa "tamam" de.
```

Bilinmeyen her madde seçeneklerle sorulur. Örnek teslim tarihi sorusu:

```
Teslim tarihi ne zaman?
A) Belli değil, işi parça parça ilerletelim (Önerilen: plan buna göre esnek kurulur)
B) Bu ay içinde
C) Bu dönem sonunda
D) Tarihi yaz
```

Resmî ölçüt belgesi klasörde yoksa, ilgili kuruluşun sitesinden indirip klasöre bırakmasını iste. Ölçüt metnini hafızandan yazma. Belge gelene kadar ölçütten bağımsız işlerle (Bologna denetimi, kanıt envanteri) devam et, bekleme.

Her cevabı kaydet: `akreddit adim baslangic --ayrinti '<json>'`.

## 4. Plan ve iş

Cevaplara göre kısa bir plan yaz (`raporlar/plan.md`), kaydet, kullanıcıya üç maddeyle özetle. Sonra işe göre ilgili skill'i kullan:

- Belge eklemek ve incelemek: `kanit-inceleme`
- Bologna paketini almak ve denetlemek: `bologna` (çoğu zaman en iyi başlangıç)
- Kendi derslerinin Bologna sayfalarını OBS'de doldurmak: `bologna-doldur`
- Çıktılar ve matris: `matris`
- Rapor bölümü yazmak: `rapor`
- Bologna, AVESİS gibi sistemlerden bilgi almak: `sistemden-oku`
- Bu sistemlerde alanları güncellemek: `sisteme-yaz`

Kullanıcı ne yapacağını bilmiyorsa sen öner: "İstersen elindeki izlenceleri ve tutanakları bu pencereye sürükle, birlikte inceleyelim."

## 5. Oturum sonu

Yapılanları ve sıradaki adımı üç satırda yaz. `akreddit adim oturum_sonu --ayrinti '<json özet>'` çalıştır, klasörde git commit oluştur. "Bir dahaki sefere bu klasörde `/akreddit:baslat` yazman yeterli." de.
