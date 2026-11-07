# MedSearch

MedSearch adalah aplikasi mobile untuk mencari dan membaca informasi label obat. Data yang ditampilkan bersumber dari **U.S. Food and Drug Administration (FDA)** melalui [openFDA Drug Label API](https://open.fda.gov/apis/drug/label/).

> **Peringatan:** MedSearch hanya untuk referensi informasi dan bukan pengganti diagnosis, resep, atau saran dari tenaga kesehatan.

## Fitur

- Mencari obat berdasarkan nama dagang atau nama generik.
- Menampilkan hingga 25 hasil label obat dari openFDA.
- Membaca informasi obat, termasuk:
  - deskripsi dan kegunaan;
  - dosis dan cara penggunaan;
  - efek samping;
  - peringatan dan kontraindikasi;
  - interaksi obat.
- Menyimpan label obat ke daftar favorit selama sesi aplikasi.
- Mendukung mode terang dan mode gelap.
- Tersedia di Android, iOS, dan web melalui Expo.

## Teknologi

- [Expo](https://expo.dev/) SDK 58
- [React Native](https://reactnative.dev/) dan React 19
- [Expo Router](https://docs.expo.dev/router/introduction/) untuk navigasi berbasis file
- TypeScript
- openFDA Drug Label API

## Persyaratan

- Node.js LTS
- npm
- Android Studio dan emulator Android, atau
- Xcode dan iOS Simulator (macOS), atau
- aplikasi Expo Go untuk pengembangan di perangkat

## Menjalankan proyek

1. Clone repository dan masuk ke direktorinya:

   ```bash
   git clone https://github.com/tupii-7/med-search-app.git
   cd med-search-app
   ```

2. Pasang dependency:

   ```bash
   npm install
   ```

3. Jalankan development server:

   ```bash
   npx expo start
   ```

   Setelah server berjalan, pilih target dari terminal atau buka QR code dengan Expo Go.

## Perintah yang tersedia

| Perintah | Keterangan |
| --- | --- |
| `npm start` | Menjalankan Expo development server |
| `npm run android` | Menjalankan proyek pada Android |
| `npm run ios` | Menjalankan proyek pada iOS |
| `npm run web` | Menjalankan proyek pada web |
| `npm run lint` | Menjalankan ESLint |
| `npm run reset-project` | Memindahkan kode starter ke folder `example` dan mengosongkan `src/app` |

## Struktur utama

```text
src/
├── app/                 # Screen dan route Expo Router
│   ├── (tabs)/          # Beranda, favorit, pengaturan, dan tentang
│   ├── drug/[id].tsx    # Detail label obat
│   └── search.tsx       # Hasil pencarian
├── components/          # Komponen UI yang dapat digunakan ulang
├── constants/           # Tema dan nilai desain
├── hooks/               # Hook tema dan color scheme
├── services/
│   ├── favorites.ts     # State favorit selama sesi
│   └── openfda.ts       # Akses dan pemrosesan data openFDA
└── types/               # Definisi tipe data
```

## Sumber data

MedSearch mengakses endpoint berikut secara langsung dari aplikasi:

```text
https://api.fda.gov/drug/label.json
```

Tidak diperlukan API key. Ketersediaan dan kelengkapan informasi bergantung pada data label yang disediakan oleh openFDA. Gunakan tautan **Source: OpenFDA** pada halaman detail untuk membuka sumber data label.

## Catatan pengembangan

- Favorit dikelola di memori aplikasi dan belum disimpan secara permanen.
- Folder `ios/` dan `android/` tidak digunakan dalam repository ini; konfigurasi native dikelola oleh Expo.
- Route aplikasi berada di `src/app/`. Komponen, hook, service, dan tipe data diletakkan di luar folder tersebut.

## Lisensi

Lihat [LICENSE](./LICENSE).
