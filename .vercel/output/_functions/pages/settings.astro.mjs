import { e as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_B4R6OevK.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../chunks/MainLayout_CDQ_6HnC.mjs';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Settings as Settings$1, Monitor, Globe, Bell, Moon, Sun, Volume2, VolumeX, RotateCcw, Info } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const Settings = () => {
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("id");
  const [notifications, setNotifications] = useState(false);
  const [videoQuality, setVideoQuality] = useState("auto");
  const [soundEnabled, setSoundEnabled] = useState(true);
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    const savedLanguage = localStorage.getItem("language") || "id";
    const savedNotifications = localStorage.getItem("notifications") === "true";
    const savedQuality = localStorage.getItem("videoQuality") || "auto";
    const savedSound = localStorage.getItem("soundEnabled") !== "false";
    setTheme(savedTheme);
    setLanguage(savedLanguage);
    setNotifications(savedNotifications);
    setVideoQuality(savedQuality);
    setSoundEnabled(savedSound);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);
  const handleThemeChange = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };
  const handleLanguageChange = () => {
    const newLanguage = language === "id" ? "en" : "id";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    alert(`Bahasa diubah ke ${newLanguage === "id" ? "Bahasa Indonesia" : "English"}`);
  };
  const handleNotificationsToggle = () => {
    const newState = !notifications;
    setNotifications(newState);
    localStorage.setItem("notifications", newState.toString());
    if (newState) {
      alert("Notifikasi diaktifkan");
    } else {
      alert("Notifikasi dinonaktifkan");
    }
  };
  const handleQualityChange = () => {
    const qualities = ["auto", "low", "medium", "high"];
    const currentIndex = qualities.indexOf(videoQuality);
    const nextIndex = (currentIndex + 1) % qualities.length;
    const newQuality = qualities[nextIndex];
    setVideoQuality(newQuality);
    localStorage.setItem("videoQuality", newQuality);
    alert(`Kualitas video diubah ke ${newQuality}`);
  };
  const handleSoundToggle = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    localStorage.setItem("soundEnabled", newState.toString());
    alert(newState ? "Suara diaktifkan" : "Suara dinonaktifkan");
  };
  const handleClearCache = () => {
    if (confirm("Apakah Anda yakin ingin menghapus cache aplikasi?")) {
      localStorage.clear();
      alert("Cache berhasil dihapus. Halaman akan dimuat ulang.");
      window.location.reload();
    }
  };
  const showInfo = () => {
    alert(`StreamID v0.0.1

Aplikasi streaming TV Indonesia

Developer: Andi Agung

Dikembangkan dengan Astro & React`);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "settings-container", children: [
      /* @__PURE__ */ jsxs("div", { className: "hero-section", children: [
        /* @__PURE__ */ jsxs("div", { className: "hero-content", children: [
          /* @__PURE__ */ jsx("h1", { className: "hero-title", children: "Pengaturan" }),
          /* @__PURE__ */ jsx("p", { className: "hero-subtitle", children: "Sesuaikan pengalaman streaming Anda" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "hero-image", children: /* @__PURE__ */ jsx(Settings$1, { size: 48, className: "hero-icon" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "settings-grid", children: [
        /* @__PURE__ */ jsxs("div", { className: "setting-card clickable", onClick: handleQualityChange, children: [
          /* @__PURE__ */ jsx(Monitor, { className: "setting-icon", size: 32 }),
          /* @__PURE__ */ jsx("h3", { children: "Kualitas Video" }),
          /* @__PURE__ */ jsx("p", { children: videoQuality === "auto" ? "Otomatis" : videoQuality.charAt(0).toUpperCase() + videoQuality.slice(1) }),
          /* @__PURE__ */ jsx("small", { children: "Klik untuk mengubah kualitas streaming" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "setting-card clickable", onClick: handleLanguageChange, children: [
          /* @__PURE__ */ jsx(Globe, { className: "setting-icon", size: 32 }),
          /* @__PURE__ */ jsx("h3", { children: "Bahasa" }),
          /* @__PURE__ */ jsx("p", { children: language === "id" ? "Bahasa Indonesia" : "English" }),
          /* @__PURE__ */ jsx("small", { children: "Klik untuk mengubah bahasa" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "setting-card clickable", onClick: handleNotificationsToggle, children: [
          /* @__PURE__ */ jsx(Bell, { className: "setting-icon", size: 32 }),
          /* @__PURE__ */ jsx("h3", { children: "Notifikasi" }),
          /* @__PURE__ */ jsx("p", { children: notifications ? "Aktif" : "Mati" }),
          /* @__PURE__ */ jsxs("small", { children: [
            "Klik untuk ",
            notifications ? "menonaktifkan" : "mengaktifkan",
            " notifikasi"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "setting-card clickable", onClick: handleThemeChange, children: [
          theme === "dark" ? /* @__PURE__ */ jsx(Moon, { className: "setting-icon", size: 32 }) : /* @__PURE__ */ jsx(Sun, { className: "setting-icon", size: 32 }),
          /* @__PURE__ */ jsx("h3", { children: "Mode Tampilan" }),
          /* @__PURE__ */ jsx("p", { children: theme === "dark" ? "Mode Gelap" : "Mode Terang" }),
          /* @__PURE__ */ jsx("small", { children: "Klik untuk mengubah tema" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "setting-card clickable", onClick: handleSoundToggle, children: [
          soundEnabled ? /* @__PURE__ */ jsx(Volume2, { className: "setting-icon", size: 32 }) : /* @__PURE__ */ jsx(VolumeX, { className: "setting-icon", size: 32 }),
          /* @__PURE__ */ jsx("h3", { children: "Audio" }),
          /* @__PURE__ */ jsx("p", { children: soundEnabled ? "Aktif" : "Mati" }),
          /* @__PURE__ */ jsxs("small", { children: [
            "Klik untuk ",
            soundEnabled ? "mematikan" : "mengaktifkan",
            " suara"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "setting-card clickable", onClick: handleClearCache, children: [
          /* @__PURE__ */ jsx(RotateCcw, { className: "setting-icon", size: 32 }),
          /* @__PURE__ */ jsx("h3", { children: "Cache" }),
          /* @__PURE__ */ jsx("p", { children: "Hapus Cache" }),
          /* @__PURE__ */ jsx("small", { children: "Klik untuk menghapus data cache" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "setting-card clickable", onClick: showInfo, children: [
          /* @__PURE__ */ jsx(Info, { className: "setting-icon", size: 32 }),
          /* @__PURE__ */ jsx("h3", { children: "Tentang" }),
          /* @__PURE__ */ jsx("p", { children: "StreamID v0.0.1" }),
          /* @__PURE__ */ jsx("p", { style: { fontSize: "0.875rem", color: "#94a3b8", marginTop: "0.25rem" }, children: "Developer: Andi Agung" }),
          /* @__PURE__ */ jsx("small", { children: "Klik untuk informasi aplikasi" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "disclaimer", children: [
        /* @__PURE__ */ jsx("h3", { children: "Disclaimer" }),
        /* @__PURE__ */ jsx("p", { children: "Aplikasi ini hanya untuk tujuan hiburan dan pendidikan. Kami tidak bertanggung jawab atas konten yang ditayangkan atau masalah teknis yang mungkin terjadi. Pastikan Anda mematuhi hukum dan regulasi yang berlaku di negara Anda." }),
        /* @__PURE__ */ jsx("p", { children: "Semua channel streaming berasal dari sumber publik dan kami tidak memiliki kontrol atas kualitas atau ketersediaan konten." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("style", { jsx: true, children: `
        .settings-container {
          padding-top: 1rem;
        }

        .hero-section {
          background: linear-gradient(135deg, #1a1d23 0%, #2a2d33 100%);
          border-radius: 24px;
          padding: 3rem;
          margin-bottom: 3rem;
          display: flex;
          align-items: center;
          gap: 3rem;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .hero-content {
          flex: 1;
        }

        .hero-title {
          font-family: 'Outfit', sans-serif;
          font-size: 3rem;
          font-weight: 800;
          color: white;
          margin-bottom: 1rem;
        }

        .hero-subtitle {
          font-size: 1.125rem;
          color: #94a3b8;
          margin-bottom: 1.5rem;
          max-width: 500px;
        }

        .hero-image {
          width: 200px;
          height: 200px;
          background: rgba(56, 189, 248, 0.1);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-icon {
          color: #38bdf8;
        }

        .settings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .setting-card {
          background: #1a1d23;
          border-radius: 18px;
          padding: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
        }

        .setting-card.clickable {
          cursor: pointer;
        }

        .setting-card.clickable:hover {
          transform: translateY(-4px);
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .setting-icon {
          color: #38bdf8;
          margin-bottom: 1rem;
        }

        .setting-card h3 {
          color: white;
          font-family: 'Outfit', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .setting-card p {
          color: #e11d48;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .setting-card small {
          color: #94a3b8;
          font-size: 0.875rem;
        }

        .disclaimer {
          background: #1a1d23;
          border-radius: 18px;
          padding: 2rem;
          border: 1px solid rgba(225, 29, 72, 0.2);
          margin-top: 2rem;
        }

        .disclaimer h3 {
          color: #e11d48;
          font-family: 'Outfit', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .disclaimer p {
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .disclaimer p:last-child {
          margin-bottom: 0;
        }

        @media (max-width: 768px) {
          .hero-section {
            flex-direction: column;
            text-align: center;
            padding: 2rem;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-image {
            width: 150px;
            height: 150px;
          }

          .settings-grid {
            grid-template-columns: 1fr;
          }
        }
      ` })
  ] });
};

const $$Settings = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Settings" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Settings", Settings, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/ngulik/Streaming tv/src/components/Settings.jsx", "client:component-export": "default" })} ` })}`;
}, "D:/ngulik/Streaming tv/src/pages/settings.astro", void 0);

const $$file = "D:/ngulik/Streaming tv/src/pages/settings.astro";
const $$url = "/settings";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Settings,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
