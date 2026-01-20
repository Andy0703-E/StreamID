# IPTV Streaming Website

A static Astro website for streaming Indonesian IPTV channels using data from [iptv-org](https://iptv-org.github.io/iptv/).

## 🎯 Features

- **M3U Playlist Parsing**: Fetches and parses IPTV playlists during build time
- **Channel Filtering**: Automatically filters channels by country (Indonesia)
- **HLS Streaming**: Plays live streams using hls.js
- **Static Generation**: Pre-renders all channel pages for optimal performance
- **Dynamic Routing**: Individual player pages for each channel

## 🚀 Project Structure

```text
/
├── src/
│   ├── pages/
│   │   ├── index.astro          # Channel list page
│   │   └── channel/
│   │       └── [id].astro       # Individual channel player
│   ├── components/
│   │   └── VideoPlayer.jsx      # HLS video player component
│   ├── data/
│   │   └── channels.js          # M3U parser & data fetcher
│   └── layouts/
├── public/                       # Static assets
├── astro.config.mjs
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project:

| Command          | Action                              |
|:-----------------|:------------------------------------|
| `npm install`    | Install dependencies                |
| `npm run dev`    | Start dev server at `localhost:4321`|
| `npm run build`  | Build static site to `./dist/`      |
| `npm run preview`| Preview production build locally     |

## 📡 Data Source

- **Playlist**: https://iptv-org.github.io/iptv/index.m3u
- **Format**: M3U with EXTINF metadata (tvg-id, tvg-name, tvg-logo, group-title)
- **Filtering**: Only Indonesian channels (tvg-id starting with "ID.")

## 🎮 How It Works

### 1. Build Time (Channel Discovery)
- `src/data/channels.js` fetches the M3U playlist from iptv-org
- Parses the M3U format and extracts channel metadata
- Filters channels by country code (ID = Indonesia)
- Returns an array of channel objects

### 2. Static Generation
- `src/pages/index.astro` displays all Indonesian channels with logos
- `src/pages/channel/[id].astro` generates a player page for each channel
- Pages are pre-rendered to static HTML during build

### 3. Client-Side Playback
- `src/components/VideoPlayer.jsx` loads only in the browser
- Uses hls.js library to stream HLS/M3U8 URLs
- Provides native HTML5 video controls

## 🔧 Technologies

- **Astro 4.x** - Static site generator
- **React** - UI components (client-side only)
- **hls.js** - HLS/M3U8 video player
- **Vite** - Build tool

## 🐛 Troubleshooting

**Streaming tidak bisa diputar / CORS Error?**
- Ini adalah masalah umum karena beberapa server streaming membatasi akses (CORS policy)
- **Solusi:**
  1. Coba channel Indonesia lainnya - tidak semua stream memiliki masalah CORS
  2. Refresh halaman dan tunggu loading
  3. Pastikan koneksi internet stabil
  4. Gunakan browser terbaru (Chrome, Firefox, Safari, Edge)
  5. Beberapa stream mungkin dibatasi geografis atau sudah offline

**Port 4321 already in use?**
- Astro will automatically try port 4322, 4323, etc.
- Atau kill process: `Get-Process node | Stop-Process` (PowerShell)

## 📝 Optional Features

### EPG Data
To add electronic program guide (EPG) data:
1. Fetch EPG XML from iptv-org
2. Match tvg-id to channels
3. Display schedule on channel pages

### Auto-Update
Use GitHub Actions to:
1. Schedule weekly playlist fetches
2. Rebuild and redeploy on changes
3. Detect new/removed channels

## 📄 License

This project uses data from [iptv-org](https://github.com/iptv-org/iptv) under their license terms.

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
