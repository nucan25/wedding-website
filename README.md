# Düğün Davetiyesi Web Sitesi

Bu proje, tek sayfalık, mobil öncelikli ve statik bir düğün davetiyesi web sitesidir. React + Vite + Tailwind CSS ile oluşturulmuştur.

## Özellikler

- Mobil uyumlu tek sayfa tasarım
- Düğün, kına gecesi ve gelin çıkarma için ayrı etkinlik kartları
- Özel sayaç (countdown) ve etkinlik bazlı saat gösterimi
- Google Maps ve takvim ekleme bağlantıları
- Google Drive fotoğraf paylaşımı için QR ve yönlendirme alanı
- Event bazlı arka plan müziği desteği
- SEO ve sosyal medya paylaşım meta etiketleri

## Gerekli ortam

- Node.js 20+ önerilir
- npm veya pnpm kullanılabilir; bu proje npm ile hazırlandı

## Kurulum

Proje klasörüne girin:

```bash
cd dugun-sitesi
```

Bağımlılıkları kurun:

```bash
npm install
```

## Çalıştırma

Geliştirme sunucusunu başlatın:

```bash
npm run dev -- --host 0.0.0.0
```

Sonrasında aşağıdaki adresleri kullanabilirsiniz:

- Yerel: http://localhost:5173/
- Telefon / aynı ağdaki cihaz: http://192.168.0.x:5173/

> `--host 0.0.0.0` eklenmesinin sebebi, telefonunuzdan aynı ağ üzerinden erişebilmenizdir.

## Production build

```bash
npm run build
```

Üretilen dosyalar `dist/` klasörüne gelir.

Yerel önizleme için:

```bash
npm run preview -- --host 0.0.0.0
```

## İçeriği nasıl değiştirirsiniz?

Tüm özel içerik tek yerde, [src/config.js](src/config.js) dosyasında bulunur.

Aşağıdaki alanları buradan düzenleyebilirsiniz:

- Çiftin isimleri
- Düğün tarihi ve saati
- Mekan adı ve adresi
- Google Maps bağlantısı
- Google Drive paylaşımlı klasör linki
- Etkinlik bazlı açıklamalar
- Hikâye / zaman çizgisi metinleri
- Program akışı
- Sık sorulan sorular
- Etkinlik bazlı müzik dosya yolları

Örnek düzenleme bölümleri:

```js
export const weddingConfig = {
  couple: ['Sümeyye', 'Nurullah'],
  eventName: 'Düğün Davetiyesi',
  date: '2027-01-31T17:00:00+03:00',
  venueName: 'Mekân Adı',
  venueAddress: 'Mekân Adresi',
  directionsUrl: 'https://maps.google.com/....',
  driveFolderUrl: 'https://drive.google.com/drive/folders/....',
};
```

## Görseller ve dosyalar

Aşağıdaki klasörleri kullanabilirsiniz:

- Ana görseller: `src/assets/images/`
- Hikâye görselleri: `src/assets/images/`
- QR kod görseli: `public/qr/drive.png`
- MP3 müzik dosyaları: `public/audio/`
- Sosyal paylaşım görseli: `public/og-kapak.jpg`
- Takvim dosyası: `public/takvim.ics`

Örnek dosya adları:

- `public/audio/dugun.mp3`
- `public/audio/kina.mp3`
- `public/audio/gelin-cikarma.mp3`

Müzik dosyasını değiştirmek için `src/config.js` içindeki `musicByEvent` alanını güncellemeniz yeterlidir.

## QR ve fotoğraf paylaşımı

Bu site statik bir projedir. Bu nedenle doğrudan sunucu üzerinden dosya yükleme yapılmaz. Bunun yerine Google Drive paylaşımlı klasör kullanılır.

İşleyiş:

1. Google Drive'da bir klasör oluşturun.
2. Klasörü herkese açın ve paylaşım linkini alın.
3. Linki `src/config.js` içindeki `driveFolderUrl` alanına ekleyin.
4. `public/qr/drive.png` dosyasını güncelleyerek QR kodu değiştirin.

## SEO ve paylaşım

Sayfa başlığı, açıklama ve sosyal medya önizleme bilgileri [index.html](index.html) içinde yer alır.

Aşağıdaki alanları burada düzenleyebilirsiniz:

- Sayfa başlığı (`<title>`)
- Açıklama meta etiketi
- Open Graph başlığı ve açıklaması
- Görsel önizleme
- URL

## Yayınlama

### Netlify / Vercel

1. Projeyi GitHub'a pushleyin.
2. Netlify veya Vercel üzerinden yeni proje ekleyin.
3. Build komutu olarak:

```bash
npm run build
```

4. Publish directory olarak:

```text
dist
```

5. Yayınlama işlemini tamamlayın.

### GitHub Pages

1. `dist/` klasörünün içeriğini yayınlayacak şekilde konfigürasyon oluşturun.
2. Veya başka bir statik hosting sağlayıcısı kullanın.

## Notlar

- Bu yapı, veritabanı veya backend gerektirmez.
- Sayfa içeriği tamamen statiktir ve kolayca güncellenebilir.
- Telefon testi için `npm run dev -- --host 0.0.0.0` komutunu kullanın.
- `public/takvim.ics` dosyası etkinlik takvimine eklenecek formattadır.
