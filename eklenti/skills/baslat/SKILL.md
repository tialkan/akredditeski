---
name: baslat
description: Akreddit oturumunu başlatır. Lisansı doğrular, çalışma klasörünü kurar ya da kaldığı yerden devam eder.
disable-model-invocation: true
---

# Akreddit oturumu

Kullanıcıyla Türkçe, kısa ve samimi konuş. Kalite komisyonunda çalışan bir öğretim elemanına yardım ediyorsun.

Önce `akreddit-kurallari` skill'indeki kuralları oku. Bu oturum boyunca geçerlidir.

## 1. Lisans

`akreddit durum` çalıştır.

- Çıkış 0: devam et.
- Çıkış 2 (bağlı değil): `akreddit baglan` çalıştır. Çıktıdaki adresi ve kodu kullanıcıya göster, tarayıcıda açıp kodu onaylamasını iste. Komut onayı kendisi bekler.
- Çıkış 3 (süre dolmuş): kullanıcıya süresinin dolduğunu, yerel dosyalarının durduğunu ve uzatmak için https://tezatlas.com/akreddit adresini söyle. **Başka hiçbir işlem yapma, oturumu burada bitir.**
- Başka hata: mesajı göster, internet bağlantısını kontrol etmesini iste, dur.

## 2. Çalışma klasörü

`akreddit ozet` çalıştır.

- Klasör bulunamazsa kullanıcıya hangi program için çalışacağını ve klasörün nereye kurulacağını sor. Sonra `akreddit kur <klasor>` çalıştır ve Claude Code'u o klasörde yeniden açmasını söyle.
- Klasör varsa son adımları özetle ve nereden devam edeceğinizi sor.

## 3. İlk görüşme (yeni klasörde)

Şu soruları tek tek sor, cevapları `akreddit adim baslangic --ayrinti '<json>'` ile kaydet:

1. Program düzeyi: önlisans, lisans, lisansüstü ya da kurum düzeyi.
2. Hangi çerçeveye hazırlanıyor? Resmî ölçüt belgesini kendisinin ilgili kuruluşun sitesinden indirip klasöre koymasını iste. Ölçüt metnini hafızandan yazma.
3. Hangi kurum sistemlerini kullanıyor? (Bologna, AVESİS, OBS, EBYS, diğer)
4. Hedef çıktı: öz değerlendirme raporu, ders-program çıktısı matrisi, kanıt dosyası ya da hepsi.
5. Teslim tarihi ve komisyonda kimlerin olduğu.

## 4. Plan

Cevaplara göre kısa bir iş planı çıkar: hangi kanıtlar gerekli, hangi sırayla, hangileri eksik. Planı `raporlar/plan.md` dosyasına yaz, `akreddit adim plan_yazildi` ile kaydet.

Kullanıcının elindeki dosyaları `akreddit kanit-ekle <dosya…>` ile ekle. Dosyaların içeriğini okuyup özetle, hangi başlığa kanıt olabileceğini **öneri** olarak söyle, onayını al.

## 5. Oturum sonu

Oturum biterken yapılanları ve sıradaki adımı üç satırda yaz. `akreddit adim oturum_sonu --ayrinti '<json özet>'` çalıştır ve klasörde bir git commit oluştur.

Bu sürümde tarayıcıyla kurum sistemlerine bağlanılmaz. Kullanıcı isterse bunun bir sonraki sürümde geleceğini söyle.
