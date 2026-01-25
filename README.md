# StreamID - Platform Streaming Hiburan Indonesia

Website streaming statis yang menyediakan akses ke saluran TV Indonesia, Anime, Drama Asia, dan Komik Digital. Dibuat menggunakan Astro, React, dan data dari berbagai sumber publik.

## 🎯 Fitur Utama

-   **Multi-Konten**:
    -   📺 **TV Indonesia**: Streaming saluran TV lokal secara langsung.
    -   🎬 **Anime**: Update terbaru anime *ongoing* dengan subtitle Indonesia (sumber: Otakudesu).
    -   🎭 **Drama**: Drama Asia (Korea, China, dll) yang sedang trending (sumber: DramaBox/Sansekai).
    -   📚 **Komik**: Baca manga/manhwa/manhua chapter terbaru (sumber: Komikcast).
-   **Tanpa Login**: Akses instan ke semua konten tanpa perlu mendaftar akun.
-   **Desain Responsif**: Tampilan modern dan ramah seluler menggunakan CSS dan React.
-   **Pemutar Handal**: Menggunakan `hls.js` untuk streaming lancar dan mendukung berbagai format video.
-   **Mode Hemat Kuota**: Pilihan kualitas video otomatis menyesuaikan kecepatan internet.

## 🚀 Struktur Proyek

```text
/
├── src/
│   ├── pages/
│   │   ├── index.astro          # Halaman Beranda (Daftar semua konten)
│   │   ├── tv/                  # Halaman TV
│   │   ├── anime/               # Halaman Anime & Pemutar
│   │   ├── drama/               # Halaman Drama & Pemutar
│   │   └── komik/               # Halaman Baca Komik
│   ├── components/
│   │   ├── VideoPlayer.jsx      # Pemutar video universal
│   │   ├── WatchAnime.jsx       # Logika khusus nonton Anime
│   │   ├── WatchDrama.jsx       # Logika khusus nonton Drama
│   │   └── ComicReader.jsx      # Pembaca Komik
│   ├── services/                # Logika fetch API (Anime, Drama, Komik)
│   └── layouts/
├── public/                      # Aset statis
├── astro.config.mjs
└── package.json
```

## 🧞 Perintah Dasar

Semua perintah dijalankan dari root folder proyek:

| Perintah | Aksi |
| :--- | :--- |
| `npm install` | Menginstall semua dependensi (wajib di awal) |
| `npm run dev` | Menjalankan server lokal di `localhost:4321` |
| `npm run build` | Membangun situs statis ke folder `./dist/` |
| `npm run preview` | Melihat hasil build produksi secara lokal |

## 📡 Sumber Data

-   **TV**: Mengambil playlist M3U dari [iptv-org](https://iptv-org.github.io/iptv/).
-   **Anime & Komik**: Menggunakan API publik pihak ketiga.
-   **Drama**: Menggunakan API publik dengan sistem *fallback* handal.

## 🎮 Cara Kerja

1.  **Fetching Data**: Aplikasi mengambil data terbaru (TV/Anime/Drama) saat halaman dimuat atau saat *build time* (untuk TV).
2.  **Streaming**: URL video (HLS/M3U8/MP4) diproses oleh `VideoPlayer` atau iframe jika sumber eksternal.
3.  **Fallback**: Jika API Drama gagal, sistem otomatis beralih ke data cadangan agar tampilan tidak rusak.

## 🔧 Teknologi

-   **Astro 4.x**: Generator situs statis super cepat.
-   **React**: Komponen UI interaktif (Player, Tab, Search).
-   **hls.js**: Pemutar streaming HLS.
-   **Node.js**: Runtime environment.

## 📄 Lisensi

Copyright © 2024 **Andy0703**.

Dilisensikan di bawah **MIT License**.

Anda diizinkan untuk menggunakan, menyalin, memodifikasi, menggabungkan, menerbitkan, mendistribusikan, mensublisensikan, dan/atau menjual salinan perangkat lunak ini, dengan syarat menyertakan pemberitahuan hak cipta di atas.

---

Proyek ini dibuat untuk tujuan pembelajaran dan hiburan.
