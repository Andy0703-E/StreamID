import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate } from '../../chunks/astro/server_B4R6OevK.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../../chunks/MainLayout_CDQ_6HnC.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { V as VideoPlayer } from '../../chunks/VideoPlayer_PxROHwvy.mjs';
import { Play, Tv, Clock, Star, ChevronRight } from 'lucide-react';
import { a as animeService } from '../../chunks/anime_CiC0WqbJ.mjs';
/* empty css                                   */
export { renderers } from '../../renderers.mjs';

const WatchAnime = ({ anime, initialEpisodes = [] }) => {
  const [episodes, setEpisodes] = useState(initialEpisodes);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [streamUrl, setStreamUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStream, setLoadingStream] = useState(false);
  useEffect(() => {
    if (anime?.episode_list && anime.episode_list.length > 0) {
      setEpisodes(anime.episode_list);
    }
  }, [anime]);
  useEffect(() => {
    if (episodes.length > 0 && !currentEpisode) {
      handleEpisodeSelect(episodes[0]);
    }
  }, [episodes]);
  const handleEpisodeSelect = async (episode) => {
    setCurrentEpisode(episode);
    setLoadingStream(true);
    try {
      const slug = episode.slug || episode.id;
      const response = await fetch(`https://www.sankavollerei.com/anime/episode/${slug}`);
      const data = await response.json();
      const episodeData = data?.data || data;
      let url = "";
      if (episodeData?.streaming) {
        const servers = episodeData.streaming;
        if (Array.isArray(servers) && servers.length > 0) {
          url = servers[0]?.url || servers[0]?.src || "";
        }
      }
      if (!url && episodeData?.download) {
        const downloads = episodeData.download;
        if (Array.isArray(downloads) && downloads.length > 0) {
          const mp4Link = downloads.find((d) => d.url?.includes(".mp4"));
          url = mp4Link?.url || downloads[0]?.url || "";
        }
      }
      if (!url && episodeData?.embed) {
        url = episodeData.embed;
      }
      setStreamUrl(url);
    } catch (error) {
      console.error("Error fetching episode stream:", error);
      setStreamUrl("");
    } finally {
      setLoadingStream(false);
    }
  };
  if (!anime) {
    return /* @__PURE__ */ jsx("div", { className: "watch-container", children: /* @__PURE__ */ jsxs("div", { className: "error-state", children: [
      /* @__PURE__ */ jsx("h2", { children: "Anime tidak ditemukan" }),
      /* @__PURE__ */ jsx("a", { href: "/anime", className: "back-link", children: "Kembali ke Anime" })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "watch-container", children: [
    /* @__PURE__ */ jsxs("div", { className: "watch-layout", children: [
      /* @__PURE__ */ jsxs("div", { className: "video-section", children: [
        /* @__PURE__ */ jsx("div", { className: "video-wrapper", children: loadingStream ? /* @__PURE__ */ jsxs("div", { className: "loading-state", children: [
          /* @__PURE__ */ jsx("div", { className: "spinner" }),
          /* @__PURE__ */ jsx("p", { children: "Memuat video..." })
        ] }) : streamUrl ? streamUrl.includes("iframe") || streamUrl.includes("embed") ? /* @__PURE__ */ jsx(
          "iframe",
          {
            src: streamUrl,
            allowFullScreen: true,
            className: "video-iframe"
          }
        ) : /* @__PURE__ */ jsx(VideoPlayer, { url: streamUrl }) : /* @__PURE__ */ jsxs("div", { className: "placeholder-state", children: [
          /* @__PURE__ */ jsx(Play, { size: 64, color: "#6366f1" }),
          /* @__PURE__ */ jsx("p", { children: "Pilih episode untuk mulai menonton" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "anime-info-section", children: [
          /* @__PURE__ */ jsx("h1", { className: "anime-title", children: anime.title || anime.name }),
          currentEpisode && /* @__PURE__ */ jsxs("p", { className: "current-episode", children: [
            "Sedang memutar: ",
            /* @__PURE__ */ jsx("strong", { children: currentEpisode.title || currentEpisode.episode })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "anime-meta", children: [
            anime.type && /* @__PURE__ */ jsxs("span", { className: "meta-item", children: [
              /* @__PURE__ */ jsx(Tv, { size: 14 }),
              anime.type
            ] }),
            anime.status && /* @__PURE__ */ jsxs("span", { className: "meta-item status", children: [
              /* @__PURE__ */ jsx(Clock, { size: 14 }),
              anime.status
            ] }),
            (anime.rating || anime.score) && /* @__PURE__ */ jsxs("span", { className: "meta-item rating", children: [
              /* @__PURE__ */ jsx(Star, { size: 14, fill: "#fbbf24", color: "#fbbf24" }),
              anime.rating || anime.score
            ] })
          ] }),
          anime.synopsis && /* @__PURE__ */ jsx("p", { className: "anime-synopsis", children: anime.synopsis }),
          anime.genres && anime.genres.length > 0 && /* @__PURE__ */ jsx("div", { className: "genres-list", children: anime.genres.map((genre, idx) => /* @__PURE__ */ jsx("span", { className: "genre-tag", children: genre.name || genre }, idx)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "episode-sidebar", children: [
        /* @__PURE__ */ jsxs("div", { className: "sidebar-header", children: [
          /* @__PURE__ */ jsx("h3", { children: "Daftar Episode" }),
          /* @__PURE__ */ jsxs("span", { className: "episode-count", children: [
            episodes.length,
            " Episode"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "episode-list", children: episodes.length === 0 ? /* @__PURE__ */ jsx("div", { className: "no-episodes", children: /* @__PURE__ */ jsx("p", { children: "Tidak ada episode ditemukan" }) }) : episodes.map((episode, idx) => /* @__PURE__ */ jsxs(
          "button",
          {
            className: `episode-item ${currentEpisode?.slug === episode.slug ? "active" : ""}`,
            onClick: () => handleEpisodeSelect(episode),
            children: [
              /* @__PURE__ */ jsx("div", { className: "episode-number", children: idx + 1 }),
              /* @__PURE__ */ jsxs("div", { className: "episode-info", children: [
                /* @__PURE__ */ jsx("span", { className: "episode-title", children: episode.title || episode.episode || `Episode ${idx + 1}` }),
                episode.date && /* @__PURE__ */ jsx("span", { className: "episode-date", children: episode.date })
              ] }),
              /* @__PURE__ */ jsx(ChevronRight, { size: 16, className: "episode-arrow" })
            ]
          },
          episode.slug || episode.id || idx
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("style", { jsx: true, children: `
                .watch-container {
                    min-height: 100vh;
                    background: #0f1115;
                    padding: 2rem;
                }

                .watch-layout {
                    display: grid;
                    grid-template-columns: 1fr 350px;
                    gap: 2rem;
                    max-width: 1600px;
                    margin: 0 auto;
                }

                .video-section {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }

                .video-wrapper {
                    aspect-ratio: 16/9;
                    background: #000;
                    border-radius: 20px;
                    overflow: hidden;
                    position: relative;
                }

                .video-iframe {
                    width: 100%;
                    height: 100%;
                    border: none;
                }

                .loading-state,
                .placeholder-state {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    color: #64748b;
                }

                .spinner {
                    width: 48px;
                    height: 48px;
                    border: 3px solid rgba(99, 102, 241, 0.2);
                    border-top-color: #6366f1;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                .anime-info-section {
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 20px;
                    padding: 2rem;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }

                .anime-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: 2rem;
                    font-weight: 800;
                    color: white;
                    margin-bottom: 0.5rem;
                }

                .current-episode {
                    color: #a5b4fc;
                    font-size: 1rem;
                    margin-bottom: 1.5rem;
                }

                .anime-meta {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }

                .meta-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: rgba(255, 255, 255, 0.05);
                    padding: 0.5rem 1rem;
                    border-radius: 100px;
                    font-size: 0.875rem;
                    color: #94a3b8;
                }

                .meta-item.status {
                    background: rgba(99, 102, 241, 0.15);
                    color: #a5b4fc;
                }

                .meta-item.rating {
                    background: rgba(251, 191, 36, 0.15);
                    color: #fbbf24;
                }

                .anime-synopsis {
                    color: #94a3b8;
                    line-height: 1.7;
                    margin-bottom: 1.5rem;
                }

                .genres-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }

                .genre-tag {
                    background: rgba(99, 102, 241, 0.1);
                    color: #a5b4fc;
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    border: 1px solid rgba(99, 102, 241, 0.2);
                }

                /* Episode Sidebar */
                .episode-sidebar {
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    max-height: calc(100vh - 4rem);
                }

                .sidebar-header {
                    padding: 1.5rem;
                    background: rgba(99, 102, 241, 0.1);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .sidebar-header h3 {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: white;
                }

                .episode-count {
                    background: #6366f1;
                    color: white;
                    padding: 0.25rem 0.75rem;
                    border-radius: 100px;
                    font-size: 0.75rem;
                    font-weight: 700;
                }

                .episode-list {
                    flex: 1;
                    overflow-y: auto;
                    padding: 1rem;
                }

                .episode-item {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    background: transparent;
                    border: none;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    text-align: left;
                    margin-bottom: 0.5rem;
                }

                .episode-item:hover {
                    background: rgba(99, 102, 241, 0.1);
                }

                .episode-item.active {
                    background: #6366f1;
                }

                .episode-number {
                    width: 36px;
                    height: 36px;
                    background: rgba(99, 102, 241, 0.2);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    color: #a5b4fc;
                    font-size: 0.875rem;
                }

                .episode-item.active .episode-number {
                    background: rgba(255, 255, 255, 0.2);
                    color: white;
                }

                .episode-info {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }

                .episode-title {
                    color: white;
                    font-size: 0.875rem;
                    font-weight: 600;
                }

                .episode-date {
                    color: #64748b;
                    font-size: 0.75rem;
                }

                .episode-arrow {
                    color: #64748b;
                }

                .episode-item.active .episode-arrow {
                    color: white;
                }

                .no-episodes {
                    padding: 3rem 1rem;
                    text-align: center;
                    color: #64748b;
                }

                .error-state {
                    text-align: center;
                    padding: 4rem 2rem;
                    color: white;
                }

                .back-link {
                    color: #6366f1;
                    text-decoration: none;
                    margin-top: 1rem;
                    display: inline-block;
                }

                @media (max-width: 1024px) {
                    .watch-layout {
                        grid-template-columns: 1fr;
                    }

                    .episode-sidebar {
                        max-height: none;
                    }
                }

                @media (max-width: 768px) {
                    .watch-container {
                        padding: 1rem;
                    }

                    .anime-title {
                        font-size: 1.5rem;
                    }
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
  let anime = null;
  let episodes = [];
  try {
    const animeData = await animeService.getDetail(id);
    anime = animeData;
    if (anime?.episode_list) {
      episodes = anime.episode_list;
    } else if (anime?.episodes) {
      episodes = anime.episodes;
    }
  } catch (e) {
    console.error(`Error fetching anime ${id}:`, e);
  }
  if (!anime) {
    return Astro2.redirect("/anime");
  }
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": anime?.title || "Watch Anime", "data-astro-cid-giasaeej": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "WatchAnime", WatchAnime, { "anime": anime, "initialEpisodes": episodes, "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/ngulik/Streaming tv/src/components/WatchAnime.jsx", "client:component-export": "default", "data-astro-cid-giasaeej": true })} ` })} `;
}, "D:/ngulik/Streaming tv/src/pages/anime/[id].astro", void 0);

const $$file = "D:/ngulik/Streaming tv/src/pages/anime/[id].astro";
const $$url = "/anime/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
