import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate } from '../../chunks/astro/server_B4R6OevK.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../../chunks/MainLayout_CDQ_6HnC.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { V as VideoPlayer } from '../../chunks/VideoPlayer_PxROHwvy.mjs';
import { Star, List, Play } from 'lucide-react';
import { dramaService } from '../../chunks/drama_BysJM1TR.mjs';
export { renderers } from '../../renderers.mjs';

const WatchDrama = ({ drama, episodes: initialEpisodes }) => {
  const [currentEpisode, setCurrentEpisode] = useState(initialEpisodes?.[0] || null);
  const [episodes, setEpisodes] = useState(initialEpisodes || []);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);
  useEffect(() => {
    if (drama?.id && episodes.length === 0) {
      setLoadingEpisodes(true);
      import('../../chunks/drama_BysJM1TR.mjs').then(({ dramaService }) => {
        dramaService.getEpisodes(drama.id).then((fetched) => {
          if (fetched?.length > 0) {
            setEpisodes(fetched);
            setCurrentEpisode(fetched[0]);
          }
        }).finally(() => setLoadingEpisodes(false));
      });
    }
  }, [drama?.id]);
  const handleEpisodeSelect = (episode) => {
    setCurrentEpisode(episode);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  if (!drama) return /* @__PURE__ */ jsx("div", { className: "error", children: "Drama not found" });
  return /* @__PURE__ */ jsxs("div", { className: "watch-drama-layout", children: [
    /* @__PURE__ */ jsx("div", { className: "player-main", children: /* @__PURE__ */ jsxs("div", { className: "player-section", children: [
      /* @__PURE__ */ jsx(VideoPlayer, { url: currentEpisode?.url || "" }),
      /* @__PURE__ */ jsxs("div", { className: "drama-meta", children: [
        /* @__PURE__ */ jsxs("div", { className: "title-row", children: [
          /* @__PURE__ */ jsx("h1", { className: "drama-title", children: drama.title || drama.name }),
          currentEpisode && /* @__PURE__ */ jsxs("span", { className: "episode-label", children: [
            "Sedang Menonton: ",
            currentEpisode.title || currentEpisode.name || `Episode ${currentEpisode.index || ""}`
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "drama-info-pills", children: [
          drama.rating && /* @__PURE__ */ jsxs("div", { className: "pill", children: [
            /* @__PURE__ */ jsx(Star, { size: 14, fill: "#fbbf24", color: "#fbbf24" }),
            /* @__PURE__ */ jsx("span", { children: drama.rating })
          ] }),
          drama.year && /* @__PURE__ */ jsx("div", { className: "pill", children: drama.year }),
          drama.genres && drama.genres.map((g) => /* @__PURE__ */ jsx("div", { className: "pill genre", children: g }, g))
        ] }),
        /* @__PURE__ */ jsx("p", { className: "drama-synopsis", children: drama.description || drama.synopsis || "Saksikan keseruan drama ini hanya di StreamID. Nikmati kualitas streaming lancar dengan subtitle Indonesia." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("aside", { className: "episode-sidebar", children: [
      /* @__PURE__ */ jsxs("div", { className: "sidebar-header", children: [
        /* @__PURE__ */ jsx(List, { size: 20 }),
        /* @__PURE__ */ jsx("h2", { children: "Daftar Episode" }),
        /* @__PURE__ */ jsxs("span", { className: "ep-count text-sm text-slate-400", children: [
          "(",
          episodes.length,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "episode-list", children: episodes.length > 0 ? episodes.map((ep, idx) => /* @__PURE__ */ jsxs(
        "button",
        {
          className: `episode-item ${currentEpisode?.id === ep.id ? "active" : ""}`,
          onClick: () => handleEpisodeSelect(ep),
          children: [
            /* @__PURE__ */ jsx("div", { className: "ep-index", children: (idx + 1).toString().padStart(2, "0") }),
            /* @__PURE__ */ jsxs("div", { className: "ep-info", children: [
              /* @__PURE__ */ jsx("span", { className: "ep-name", children: ep.title || ep.name || `Episode ${idx + 1}` }),
              /* @__PURE__ */ jsx("span", { className: "ep-status", children: "Tersedia dalam HD" })
            ] }),
            /* @__PURE__ */ jsx(Play, { size: 14, className: "play-icon" })
          ]
        },
        ep.id || idx
      )) : /* @__PURE__ */ jsx("div", { className: "no-episodes", children: "Tidak ada episode ditemukan." }) })
    ] }),
    /* @__PURE__ */ jsx("style", { jsx: true, children: `
                .watch-drama-layout {
                    display: grid;
                    grid-template-columns: 1fr 380px;
                    gap: 2.5rem;
                    padding-top: 1rem;
                    max-width: 1600px;
                    margin: 0 auto;
                }

                .player-section {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }

                .drama-meta {
                    background: rgba(255, 255, 255, 0.03);
                    padding: 2.5rem;
                    border-radius: 24px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }

                .title-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 1.5rem;
                    gap: 2rem;
                }

                .drama-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: 2.25rem;
                    font-weight: 800;
                    color: white;
                }

                .episode-label {
                    color: #fb7185;
                    font-weight: 600;
                    font-size: 0.9375rem;
                    padding-bottom: 0.5rem;
                }

                .drama-info-pills {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.75rem;
                    margin-bottom: 2rem;
                }

                .pill {
                    background: rgba(255, 255, 255, 0.05);
                    color: #94a3b8;
                    padding: 0.4rem 1rem;
                    border-radius: 100px;
                    font-size: 0.8125rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .pill.genre {
                    background: rgba(225, 29, 72, 0.1);
                    color: #fb7185;
                }

                .drama-synopsis {
                    color: #94a3b8;
                    line-height: 1.8;
                    font-size: 1rem;
                }

                /* Sidebar Styles */
                .episode-sidebar {
                    background: #1a1d23;
                    border-radius: 24px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    display: flex;
                    flex-direction: column;
                    height: calc(100vh - 120px);
                    position: sticky;
                    top: 100px;
                    overflow: hidden;
                }

                .sidebar-header {
                    padding: 1.75rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    color: white;
                }

                .sidebar-header h2 {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.125rem;
                    font-weight: 700;
                }

                .episode-list {
                    flex: 1;
                    overflow-y: auto;
                    padding: 1rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }

                .episode-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    border-radius: 16px;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid transparent;
                    color: #64748b;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    text-align: left;
                }

                .episode-item:hover {
                    background: rgba(255, 255, 255, 0.05);
                    color: white;
                }

                .episode-item.active {
                    background: rgba(225, 29, 72, 0.1);
                    border-color: rgba(225, 29, 72, 0.3);
                    color: white;
                }

                .ep-index {
                    font-family: 'Outfit', sans-serif;
                    font-size: 0.8125rem;
                    font-weight: 800;
                    color: #334155;
                }

                .active .ep-index {
                    color: #fb7185;
                }

                .ep-info {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }

                .ep-name {
                    font-weight: 600;
                    font-size: 0.9375rem;
                }

                .ep-status {
                    font-size: 0.75rem;
                    color: #475569;
                }

                .play-icon {
                    opacity: 0;
                    transition: all 0.2s ease;
                }

                .episode-item:hover .play-icon, .episode-item.active .play-icon {
                    opacity: 1;
                    transform: scale(1.1);
                }

                @media (max-width: 1200px) {
                    .watch-drama-layout { grid-template-columns: 1fr 320px; }
                }

                @media (max-width: 1024px) {
                    .watch-drama-layout { grid-template-columns: 1fr; }
                    .episode-sidebar { position: static; height: 500px; }
                    .drama-title { font-size: 1.75rem; }
                }
            ` })
  ] });
};

const $$Astro = createAstro();
const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  let drama = null;
  let episodes = [];
  try {
    const [dramaData, episodesData] = await Promise.all([
      dramaService.getDetail(id),
      dramaService.getEpisodes(id)
    ]);
    drama = dramaData;
    episodes = Array.isArray(episodesData) ? episodesData : episodesData?.data || [];
  } catch (e) {
    console.error(`Error fetching drama ${id}:`, e);
  }
  if (!drama && !id.startsWith("mock-")) {
    return Astro2.redirect("/drama");
  }
  if (!drama) {
    drama = {
      title: "Drama Mock " + id,
      description: "Ini adalah drama contoh karena data real tidak ditemukan.",
      rating: 4.5,
      year: 2024,
      genres: ["Drama", "Romance"]
    };
    episodes = [
      { id: "1", title: "Episode 01", url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" },
      { id: "2", title: "Episode 02", url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" }
    ];
  }
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": drama.title || drama.name || "Menonton Drama" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "WatchDrama", WatchDrama, { "drama": drama, "episodes": episodes, "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/ngulik/Streaming tv/src/components/WatchDrama.jsx", "client:component-export": "default" })} ` })}`;
}, "D:/ngulik/Streaming tv/src/pages/drama/[id].astro", void 0);

const $$file = "D:/ngulik/Streaming tv/src/pages/drama/[id].astro";
const $$url = "/drama/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
