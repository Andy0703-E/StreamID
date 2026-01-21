import { e as createComponent, f as createAstro, h as addAttribute, l as renderHead, k as renderComponent, n as renderSlot, r as renderTemplate } from './astro/server_B4R6OevK.mjs';
import 'piccolore';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Home, Tv, Film, PlayCircle, Heart, Radio, Bookmark, Settings, Bell, User, ChevronDown, LogOut, AlertTriangle } from 'lucide-react';
/* empty css                            */

const Sidebar = () => {
  const [currentPath, setCurrentPath] = useState("/");
  useEffect(() => {
    setCurrentPath(window.location.pathname);
    const handleNavigation2 = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handleNavigation2);
    return () => window.removeEventListener("popstate", handleNavigation2);
  }, []);
  const menuItems = [
    { icon: /* @__PURE__ */ jsx(Home, { size: 20 }), label: "Home", href: "/" },
    { icon: /* @__PURE__ */ jsx(Tv, { size: 20 }), label: "TV Indonesia", href: "/tv" },
    { icon: /* @__PURE__ */ jsx(Film, { size: 20 }), label: "Movies", href: "/movies" },
    { icon: /* @__PURE__ */ jsx(PlayCircle, { size: 20 }), label: "Anime", href: "/anime" },
    { icon: /* @__PURE__ */ jsx(Heart, { size: 20 }), label: "Drama Box", href: "/drama" },
    { icon: /* @__PURE__ */ jsx(Radio, { size: 20 }), label: "Live Sports", href: "/live" },
    { icon: /* @__PURE__ */ jsx(Bookmark, { size: 20 }), label: "Watchlist", href: "/watchlist" },
    { icon: /* @__PURE__ */ jsx(Settings, { size: 20 }), label: "Settings", href: "/settings" }
  ];
  const handleNavigation = (href, e) => {
    e.preventDefault();
    window.location.href = href;
  };
  return /* @__PURE__ */ jsxs("aside", { className: "sidebar", children: [
    /* @__PURE__ */ jsxs("div", { className: "logo-container", children: [
      /* @__PURE__ */ jsxs("div", { className: "logo-icon", children: [
        /* @__PURE__ */ jsx("span", { className: "logo-line logo-line-top" }),
        /* @__PURE__ */ jsx("span", { className: "logo-line logo-line-bottom" })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "logo-text", children: "StreamID" })
    ] }),
    /* @__PURE__ */ jsx("nav", { className: "nav-menu", children: menuItems.map((item, index) => /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: (e) => handleNavigation(item.href, e),
        className: `nav-item ${currentPath === item.href ? "active" : ""}`,
        children: [
          /* @__PURE__ */ jsx("span", { className: "nav-icon", children: item.icon }),
          /* @__PURE__ */ jsx("span", { className: "nav-label", children: item.label })
        ]
      },
      index
    )) }),
    /* @__PURE__ */ jsx("style", { jsx: true, children: `
        .sidebar {
          width: 240px;
          height: 100vh;
          background: #0f1115;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          padding: 2rem 1.5rem;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 100;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 3rem;
          padding-left: 0.5rem;
        }

        .logo-icon {
          width: 28px;
          height: 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .logo-line {
          height: 8px;
          border-radius: 2px;
        }

        .logo-line-top {
          background: #ffffff;
          width: 100%;
        }

        .logo-line-bottom {
          background: #e11d48;
          width: 80%;
        }

        .logo-text {
          font-family: 'Outfit', sans-serif;
          font-size: 1.25rem;
          font-weight: 800;
          color: white;
          letter-spacing: -0.5px;
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.875rem 1rem;
          border-radius: 12px;
          color: #94a3b8;
          text-decoration: none;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          font-weight: 500;
          font-size: 0.9375rem;
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
        }

        .nav-item:hover {
          color: white;
          background: rgba(255, 255, 255, 0.03);
        }

        .nav-item.active {
          background: linear-gradient(to right, #e11d48, #fb7185);
          color: white;
          box-shadow: 0 4px 15px rgba(225, 29, 72, 0.3);
        }

        .nav-icon {
          display: flex;
          align-items: center;
        }

        @media (max-width: 1024px) {
          .sidebar {
            width: 80px;
            padding: 2rem 0.75rem;
          }
          .logo-text, .nav-label {
            display: none;
          }
          .logo-container {
            justify-content: center;
            padding-left: 0;
          }
          .nav-item {
            justify-content: center;
            padding: 1rem;
          }
        }
      ` })
  ] });
};

const Header = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  return /* @__PURE__ */ jsxs("header", { className: "header", children: [
    /* @__PURE__ */ jsx("div", { className: "header-left" }),
    /* @__PURE__ */ jsxs("div", { className: "user-actions", children: [
      /* @__PURE__ */ jsxs("button", { className: "icon-btn", children: [
        /* @__PURE__ */ jsx(Bell, { size: 20 }),
        /* @__PURE__ */ jsx("span", { className: "notification-dot" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "profile-container", children: [
        /* @__PURE__ */ jsxs("div", { className: "profile-pill", onClick: () => setShowProfileMenu(!showProfileMenu), children: [
          /* @__PURE__ */ jsx(User, { size: 20, className: "profile-icon" }),
          /* @__PURE__ */ jsx(ChevronDown, { size: 14, className: `chevron ${showProfileMenu ? "rotate" : ""}` })
        ] }),
        showProfileMenu && /* @__PURE__ */ jsxs("div", { className: "profile-dropdown", children: [
          /* @__PURE__ */ jsxs("div", { className: "dropdown-item", onClick: () => window.location.href = "/settings", children: [
            /* @__PURE__ */ jsx(Settings, { size: 18 }),
            /* @__PURE__ */ jsx("span", { children: "Pengaturan" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "dropdown-divider" }),
          /* @__PURE__ */ jsxs("div", { className: "dropdown-item logout", onClick: () => alert("Logout feature coming soon!"), children: [
            /* @__PURE__ */ jsx(LogOut, { size: 18 }),
            /* @__PURE__ */ jsx("span", { children: "Keluar" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("style", { jsx: true, children: `
        .header {
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          background: #0f1115;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          position: sticky;
          top: 0;
          z-index: 90;
        }

        .header-left {
          display: flex;
          align-items: center;
        }

        .user-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .icon-btn {
          background: none;
          border: none;
          color: #ffffff;
          cursor: pointer;
          position: relative;
          padding: 0.5rem;
          border-radius: 10px;
          transition: all 0.2s ease;
        }

        .icon-btn:hover {
          color: #e11d48;
          background: rgba(255, 255, 255, 0.05);
        }

        .notification-dot {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 8px;
          height: 8px;
          background: #e11d48;
          border: 2px solid #0f1115;
          border-radius: 50%;
        }

        .profile-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.25rem;
          padding-right: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .profile-pill:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .profile-icon {
          color: #ffffff;
        }

        .chevron {
          color: #94a3b8;
          transition: transform 0.2s ease;
        }

        .chevron.rotate {
          transform: rotate(180deg);
        }

        .profile-container {
          position: relative;
        }

        .profile-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: 200px;
          background: #1a1d23;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 0.5rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          z-index: 100;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          color: #94a3b8;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.9375rem;
        }

        .dropdown-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }

        .dropdown-item.logout:hover {
          color: #e11d48;
          background: rgba(225, 29, 72, 0.05);
        }

        .dropdown-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.05);
          margin: 0.5rem 0;
        }


      ` })
  ] });
};

const Disclaimer = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const hasAccepted = localStorage.getItem("disclaimerAccepted");
    if (!hasAccepted) {
      setIsVisible(true);
    }
  }, []);
  const handleAccept = () => {
    localStorage.setItem("disclaimerAccepted", "true");
    setIsVisible(false);
  };
  if (!isVisible) return null;
  return /* @__PURE__ */ jsxs("div", { className: "disclaimer-overlay", children: [
    /* @__PURE__ */ jsxs("div", { className: "disclaimer-modal", children: [
      /* @__PURE__ */ jsxs("div", { className: "disclaimer-header", children: [
        /* @__PURE__ */ jsx(AlertTriangle, { className: "warning-icon", size: 32 }),
        /* @__PURE__ */ jsx("h2", { children: "Pernyataan Penyangkalan (Disclaimer)" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "disclaimer-body", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "Selamat datang di ",
          /* @__PURE__ */ jsx("strong", { children: "StreamID" }),
          ". Sebelum melanjutkan, harap baca dan pahami pernyataan berikut:"
        ] }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "Aplikasi ini hanya untuk tujuan hiburan dan pendidikan saja." }),
          /* @__PURE__ */ jsx("li", { children: "Kami tidak menyimpan file video di server kami. Semua konten berasal dari sumber pihak ketiga yang tersedia secara publik di internet." }),
          /* @__PURE__ */ jsx("li", { children: "Pengguna bertanggung jawab penuh atas penggunaan layanan ini dan kepatuhan terhadap hukum hak cipta di wilayah masing-masing." }),
          /* @__PURE__ */ jsx("li", { children: "Kami tidak memiliki kontrol atas ketersediaan atau kualitas konten dari pihak ketiga." })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "note", children: "Dengan menutup pesan ini, Anda menyatakan telah membaca dan menyetujui persyaratan di atas." })
      ] }),
      /* @__PURE__ */ jsx("button", { className: "accept-btn", onClick: handleAccept, children: "Saya Mengerti & Lanjutkan" })
    ] }),
    /* @__PURE__ */ jsx("style", { jsx: true, children: `
                .disclaimer-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.85);
                    backdrop-filter: blur(10px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                    padding: 1.5rem;
                }

                .disclaimer-modal {
                    background: #1a1d23;
                    border: 1px solid rgba(225, 29, 72, 0.3);
                    border-radius: 24px;
                    padding: 2.5rem;
                    max-width: 600px;
                    width: 100%;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                    animation: modalIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                }

                @keyframes modalIn {
                    from { opacity: 0; transform: translateY(20px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }

                .disclaimer-header {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }

                .warning-icon {
                    color: #e11d48;
                }

                .disclaimer-header h2 {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: white;
                }

                .disclaimer-body {
                    color: #94a3b8;
                    line-height: 1.6;
                    margin-bottom: 2.5rem;
                }

                .disclaimer-body p {
                    margin-bottom: 1rem;
                }

                .disclaimer-body ul {
                    padding-left: 1.5rem;
                    margin-bottom: 1.5rem;
                }

                .disclaimer-body li {
                    margin-bottom: 0.75rem;
                }

                .note {
                    font-size: 0.875rem;
                    font-style: italic;
                    color: #64748b;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    padding-top: 1rem;
                }

                .accept-btn {
                    width: 100%;
                    background: linear-gradient(to right, #e11d48, #fb7185);
                    color: white;
                    border: none;
                    padding: 1rem;
                    border-radius: 12px;
                    font-weight: 700;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .accept-btn:hover {
                    transform: translateY(-2px);
                    filter: brightness(1.1);
                    box-shadow: 0 10px 20px rgba(225, 29, 72, 0.3);
                }
            ` })
  ] });
};

const $$Astro = createAstro();
const $$MainLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="id"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title} | StreamID</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet">${renderHead()}</head> <body> <div class="app-layout"> ${renderComponent($$result, "Disclaimer", Disclaimer, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/ngulik/Streaming tv/src/components/Disclaimer.jsx", "client:component-export": "default" })} ${renderComponent($$result, "Sidebar", Sidebar, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/ngulik/Streaming tv/src/components/layout/Sidebar.jsx", "client:component-export": "default" })} <div class="main-content"> ${renderComponent($$result, "Header", Header, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/ngulik/Streaming tv/src/components/layout/Header.jsx", "client:component-export": "default" })} <main class="content-body"> ${renderSlot($$result, $$slots["default"])} </main> </div> </div> </body></html>`;
}, "D:/ngulik/Streaming tv/src/layouts/MainLayout.astro", void 0);

export { $$MainLayout as $ };
