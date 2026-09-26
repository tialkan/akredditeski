# Bilgi paketi doğrulama kaydı

Tarih: 26 Eylül 2026.

- 25 kaynak dosyanın SHA-256 özetleri başlangıç envanteriyle aynı; özgün belgeler değişmedi.
- 24 PDF için toplam 401 fiziksel sayfa kaydedildi. DOCX sayfa sayısı varsayılmadı.
- Bütün JSON dosyaları ayrıştırıldı; dört şema JSON Schema Draft 2020-12 metaşemasına göre doğrulandı.
- Beş örnek çıktı/paket dosyası kendi şemalarından geçti. İki geçerli sınır durumu da kontrol edildi.
- 11 geçersiz durum reddedildi: aralık dışı/kesirli/boş ilişki puanı, ilişkisiz hücreye puan, kaynaksız ilişkili öneri, modelin onay vermesi, beklenmeyen alan, açıklamasız boş aday listesi, kaynaksız rapor iddiası ve demoyu resmî gösterme.
- Beş kaynak referansı sentetik girdideki belge, parça ve konumlarla eşleşti. Çıktı ve ölçüt kimlikleri kontrol edildi.
- Örnek deterministik hesap 68 sonucunu verdi.
- Markdown yerel bağlantıları ve kod blokları kontrol edildi; kırık bağlantı bulunmadı.
- Ürün ve masterprompt metinlerinde kaynak kuruluş adı/kurul kısaltması/alan adı için tarama yapıldı; bulunmadı. Kaynak envanterindeki özgün dosya adları köken kaydı olarak korundu.
- Kökteki ve bilgi tabanındaki masterprompt dosyaları birebir aynı.

Bu kontroller belge paketine ve örnek sözleşmelere aittir. Henüz var olmayan SaaS uygulamasının güvenlik, OCR, akademik doğruluk veya performans testi olarak yorumlanmamalıdır. Şema doğrulaması, kaynak pasajının olgusal iddiayı gerçekten desteklediğini otomatik kanıtlamaz. Kaynak incelemesi kapsam ve sınırlılıkları inceleme_ve_arindirma.md dosyasındadır.

Kontrol aracı: Python jsonschema 4.26.0; geçici çalışma dizinine kuruldu. Ürün bağımlılığı veya uygulama kodu eklenmedi.
