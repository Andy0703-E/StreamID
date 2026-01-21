import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_B4R6OevK.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../chunks/MainLayout_CDQ_6HnC.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { Play, Tv, Star, Loader2, Sparkles, Info } from 'lucide-react';
import { a as animeService, F as FALLBACK_ANIME } from '../chunks/anime_CiC0WqbJ.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const AnimeCard = ({ anime }) => {
  const title = anime.title || anime.name || "Unknown Anime";
  const poster = anime.poster || anime.image || anime.thumbnail || "https://via.placeholder.com/300x450?text=No+Image";
  const episode = anime.episode || anime.episodes || anime.latest_episode || "";
  const rating = anime.rating || anime.score || 0;
  const type = anime.type || "TV";
  const id = anime.slug || anime.id || "";
  const handleClick = () => {
    if (id) {
      window.location.href = `/anime/${id}`;
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "anime-card", onClick: handleClick, children: [
    /* @__PURE__ */ jsxs("div", { className: "poster-wrapper", children: [
      /* @__PURE__ */ jsx("img", { src: poster, alt: title, loading: "lazy" }),
      /* @__PURE__ */ jsx("div", { className: "overlay", children: /* @__PURE__ */ jsx("div", { className: "play-icon-wrapper", children: /* @__PURE__ */ jsx(Play, { fill: "white", size: 32 }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "card-badges", children: [
        /* @__PURE__ */ jsxs("div", { className: "badge type", children: [
          /* @__PURE__ */ jsx(Tv, { size: 10 }),
          /* @__PURE__ */ jsx("span", { children: type })
        ] }),
        rating > 0 && /* @__PURE__ */ jsxs("div", { className: "badge rating", children: [
          /* @__PURE__ */ jsx(Star, { size: 10, fill: "#fbbf24", color: "#fbbf24" }),
          /* @__PURE__ */ jsx("span", { children: rating })
        ] })
      ] }),
      episode && /* @__PURE__ */ jsx("div", { className: "episode-tag", children: episode })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "anime-info", children: [
      /* @__PURE__ */ jsx("h3", { className: "anime-title", children: title }),
      /* @__PURE__ */ jsx("div", { className: "anime-extra-info", children: "Otakudesu • Sub Indo" })
    ] }),
    /* @__PURE__ */ jsx("style", { jsx: true, children: `
                .anime-card {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    cursor: pointer;
                    position: relative;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .poster-wrapper {
                    position: relative;
                    aspect-ratio: 2/3;
                    border-radius: 16px;
                    overflow: hidden;
                    background: #111;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    transition: all 0.4s ease;
                }

                .poster-wrapper img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(15, 17, 21, 0.8) 0%, transparent 60%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: all 0.3s ease;
                }

                .play-icon-wrapper {
                    width: 56px;
                    height: 56px;
                    background: #6366f1;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transform: scale(0.8);
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    box-shadow: 0 0 20px rgba(99, 102, 241, 0.6);
                }

                .anime-card:hover {
                    transform: translateY(-8px);
                }

                .anime-card:hover .poster-wrapper {
                    border-color: rgba(99, 102, 241, 0.5);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 15px rgba(99, 102, 241, 0.2);
                }

                .anime-card:hover .poster-wrapper img {
                    transform: scale(1.1);
                }

                .anime-card:hover .overlay {
                    opacity: 1;
                }

                .anime-card:hover .play-icon-wrapper {
                    transform: scale(1);
                }

                .card-badges {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    left: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    pointer-events: none;
                }

                .badge {
                    background: rgba(15, 17, 21, 0.85);
                    backdrop-filter: blur(8px);
                    color: white;
                    padding: 4px 10px;
                    border-radius: 8px;
                    font-size: 0.7rem;
                    font-weight: 800;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .badge.type {
                    background: #6366f1;
                    border: none;
                }

                .episode-tag {
                    position: absolute;
                    bottom: 10px;
                    left: 10px;
                    background: rgba(0, 0, 0, 0.85);
                    backdrop-filter: blur(8px);
                    color: #a5b4fc;
                    padding: 6px 12px;
                    border-radius: 8px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    border: 1px solid rgba(99, 102, 241, 0.3);
                }

                .anime-info {
                    padding: 0 0.5rem;
                }

                .anime-title {
                    color: white;
                    font-family: 'Outfit', sans-serif;
                    font-size: 1rem;
                    font-weight: 700;
                    line-height: 1.4;
                    margin-bottom: 0.25rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    transition: color 0.3s ease;
                }

                .anime-card:hover .anime-title {
                    color: #a5b4fc;
                }

                .anime-extra-info {
                    font-size: 0.75rem;
                    color: #64748b;
                    font-weight: 500;
                }
            ` })
  ] });
};

const AnimeGrid = ({ initialData, title, type }) => {
  const [items, setItems] = useState(initialData || []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    const nextPage = page + 1;
    try {
      let newData;
      if (type === "ongoing") {
        newData = await animeService.getOngoing(nextPage);
      } else if (type === "completed") {
        newData = await animeService.getCompleted(nextPage);
      }
      const newArray = Array.isArray(newData) ? newData : newData?.data || [];
      if (newArray.length === 0) {
        setHasMore(false);
      } else {
        setItems((prev) => [...prev, ...newArray]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Error loading more anime:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "anime-section", children: [
    /* @__PURE__ */ jsx("div", { className: "section-header", children: /* @__PURE__ */ jsx("h2", { className: "section-title", children: title }) }),
    /* @__PURE__ */ jsx("div", { className: "anime-grid", children: items.map((anime, idx) => /* @__PURE__ */ jsx(AnimeCard, { anime }, `${anime.id || anime.slug || idx}-${page}`)) }),
    hasMore && /* @__PURE__ */ jsx("div", { className: "load-more-container", children: /* @__PURE__ */ jsx(
      "button",
      {
        className: "load-more-btn",
        onClick: loadMore,
        disabled: loading,
        children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Loader2, { size: 18, className: "animate-spin" }),
          /* @__PURE__ */ jsx("span", { children: "Memuat..." })
        ] }) : "Lihat Lebih Banyak"
      }
    ) }),
    /* @__PURE__ */ jsx("style", { jsx: true, children: `
                .anime-section {
                    margin-bottom: 3.5rem;
                }
                .section-header {
                    margin-bottom: 2rem;
                }
                .section-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: white;
                }
                .anime-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1.5rem;
                }
                
                @media (min-width: 768px) {
                    .anime-grid {
                        grid-template-columns: repeat(3, 1fr);
                        gap: 2rem;
                    }
                }

                @media (min-width: 1024px) {
                    .anime-grid {
                        grid-template-columns: repeat(4, 1fr);
                        gap: 2.5rem;
                    }
                }

                .load-more-container {
                    display: flex;
                    justify-content: center;
                    margin-top: 4rem;
                }
                .load-more-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    background: rgba(99, 102, 241, 0.1);
                    color: #a5b4fc;
                    border: 1px solid rgba(99, 102, 241, 0.3);
                    padding: 1rem 3rem;
                    border-radius: 100px;
                    font-weight: 700;
                    font-family: 'Outfit', sans-serif;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .load-more-btn:hover:not(:disabled) {
                    background: #6366f1;
                    color: white;
                    border-color: #6366f1;
                    transform: translateY(-4px);
                    box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);
                }
                .load-more-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @media (max-width: 640px) {
                   .section-title {
                        font-size: 1.5rem;
                    }
                   .anime-grid {
                       gap: 1rem;
                   }
                }
            ` })
  ] });
};

const $$Anime = createComponent(async ($$result, $$props, $$slots) => {
  let ongoingData = [];
  let completedData = [];
  let scheduleData = null;
  try {
    const results = await Promise.allSettled([
      animeService.getOngoing(1),
      animeService.getCompleted(1),
      animeService.getSchedule()
    ]);
    ongoingData = results[0].status === "fulfilled" && results[0].value ? results[0].value : FALLBACK_ANIME;
    completedData = results[1].status === "fulfilled" && results[1].value ? results[1].value : FALLBACK_ANIME;
    scheduleData = results[2].status === "fulfilled" ? results[2].value : null;
  } catch (e) {
    console.error("Error fetching anime data:", e);
    ongoingData = FALLBACK_ANIME;
    completedData = FALLBACK_ANIME;
  }
  const ensureArray = (data) => Array.isArray(data) ? data : data?.data || [];
  const ongoing = ensureArray(ongoingData);
  const completed = ensureArray(completedData);
  const heroAnime = ongoing[0];
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Anime", "data-astro-cid-fepk5tcl": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="anime-container" data-astro-cid-fepk5tcl>  ${heroAnime && renderTemplate`<section class="hero-section" data-astro-cid-fepk5tcl> <div class="hero-backdrop" data-astro-cid-fepk5tcl> <img${addAttribute(heroAnime.poster || heroAnime.image, "src")} alt="" data-astro-cid-fepk5tcl> <div class="hero-overlay" data-astro-cid-fepk5tcl></div> </div> <div class="hero-content" data-astro-cid-fepk5tcl> <span class="hero-badge" data-astro-cid-fepk5tcl> ${renderComponent($$result2, "Sparkles", Sparkles, { "size": 14, "data-astro-cid-fepk5tcl": true })}
ONGOING ANIME
</span> <h1 class="hero-title" data-astro-cid-fepk5tcl>${heroAnime.title || heroAnime.name}</h1> <p class="hero-description" data-astro-cid-fepk5tcl> ${heroAnime.synopsis ? heroAnime.synopsis.slice(0, 180) + "..." : "Tonton anime subtitle Indonesia terbaru dengan kualitas HD. Update setiap minggu!"} </p> <div class="hero-actions" data-astro-cid-fepk5tcl> <a${addAttribute(`/anime/${heroAnime.slug || heroAnime.id}`, "href")} class="btn-primary" data-astro-cid-fepk5tcl> ${renderComponent($$result2, "Play", Play, { "size": 20, "fill": "currentColor", "data-astro-cid-fepk5tcl": true })} <span data-astro-cid-fepk5tcl>Tonton Sekarang</span> </a> <button class="btn-secondary" data-astro-cid-fepk5tcl> ${renderComponent($$result2, "Info", Info, { "size": 20, "data-astro-cid-fepk5tcl": true })} <span data-astro-cid-fepk5tcl>Detail Anime</span> </button> </div> </div> </section>`} <div class="content-wrapper" data-astro-cid-fepk5tcl>  <section class="horizontal-section" data-astro-cid-fepk5tcl> <div class="section-header" data-astro-cid-fepk5tcl> <div class="title-with-icon" data-astro-cid-fepk5tcl> ${renderComponent($$result2, "Sparkles", Sparkles, { "size": 24, "color": "#6366f1", "data-astro-cid-fepk5tcl": true })} <h2 class="section-title" data-astro-cid-fepk5tcl>Sedang Tayang</h2> </div> <p class="section-subtitle" data-astro-cid-fepk5tcl>Anime ongoing terbaru minggu ini</p> </div> <div class="horizontal-scroll" data-astro-cid-fepk5tcl> ${ongoing.slice(0, 10).map((anime) => renderTemplate`<div class="horizontal-item" data-astro-cid-fepk5tcl> ${renderComponent($$result2, "AnimeCard", AnimeCard, { "anime": anime, "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/ngulik/Streaming tv/src/components/AnimeCard.jsx", "client:component-export": "default", "data-astro-cid-fepk5tcl": true })} </div>`)} </div> </section>  ${renderComponent($$result2, "AnimeGrid", AnimeGrid, { "initialData": ongoing, "title": "Anime Ongoing", "type": "ongoing", "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/ngulik/Streaming tv/src/components/AnimeGrid.jsx", "client:component-export": "default", "data-astro-cid-fepk5tcl": true })}  ${renderComponent($$result2, "AnimeGrid", AnimeGrid, { "initialData": completed, "title": "Anime Tamat", "type": "completed", "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/ngulik/Streaming tv/src/components/AnimeGrid.jsx", "client:component-export": "default", "data-astro-cid-fepk5tcl": true })} </div> </div> ` })} `;
}, "D:/ngulik/Streaming tv/src/pages/anime.astro", void 0);

const $$file = "D:/ngulik/Streaming tv/src/pages/anime.astro";
const $$url = "/anime";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Anime,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
