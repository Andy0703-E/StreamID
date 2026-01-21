import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_B4R6OevK.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../chunks/MainLayout_CDQ_6HnC.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { Play, Star, Loader2, Info, Flame } from 'lucide-react';
import { dramaService, FALLBACK_DRAMA } from '../chunks/drama_BysJM1TR.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const DramaCard = ({ drama }) => {
  const title = drama.title || drama.name || "Unknown Drama";
  const poster = drama.poster || drama.image || "https://via.placeholder.com/300x450?text=No+Image";
  const episode = drama.episode || drama.latest_episode || "";
  const rating = drama.rating || 0;
  const id = drama.id || drama.slug || "";
  const handleClick = () => {
    if (id) {
      window.location.href = `/drama/${id}`;
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "drama-card", onClick: handleClick, children: [
    /* @__PURE__ */ jsxs("div", { className: "poster-wrapper", children: [
      /* @__PURE__ */ jsx("img", { src: poster, alt: title, loading: "lazy" }),
      /* @__PURE__ */ jsx("div", { className: "overlay", children: /* @__PURE__ */ jsx("div", { className: "play-icon-wrapper", children: /* @__PURE__ */ jsx(Play, { fill: "white", size: 32 }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "card-badges", children: [
        episode && /* @__PURE__ */ jsx("div", { className: "badge episode", children: episode }),
        rating > 0 && /* @__PURE__ */ jsxs("div", { className: "badge rating", children: [
          /* @__PURE__ */ jsx(Star, { size: 10, fill: "#fbbf24", color: "#fbbf24" }),
          /* @__PURE__ */ jsx("span", { children: rating })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "drama-info", children: [
      /* @__PURE__ */ jsx("h3", { className: "drama-title", children: title }),
      /* @__PURE__ */ jsx("div", { className: "drama-extra-info", children: "Drama Box • HD" })
    ] }),
    /* @__PURE__ */ jsx("style", { jsx: true, children: `
                .drama-card {
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
                    background: #e11d48;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transform: scale(0.8);
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    box-shadow: 0 0 20px rgba(225, 29, 72, 0.6);
                }

                .drama-card:hover {
                    transform: translateY(-8px);
                }

                .drama-card:hover .poster-wrapper {
                    border-color: rgba(225, 29, 72, 0.5);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 15px rgba(225, 29, 72, 0.2);
                }

                .drama-card:hover .poster-wrapper img {
                    transform: scale(1.1);
                }

                .drama-card:hover .overlay {
                    opacity: 1;
                }

                .drama-card:hover .play-icon-wrapper {
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

                .badge.episode {
                    background: #e11d48;
                    border: none;
                }

                .drama-info {
                    padding: 0 0.5rem;
                }

                .drama-title {
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

                .drama-card:hover .drama-title {
                    color: #fb7185;
                }

                .drama-extra-info {
                    font-size: 0.75rem;
                    color: #64748b;
                    font-weight: 500;
                }
            ` })
  ] });
};

const VideoDramaCard = ({ drama }) => {
  const handleClick = () => {
    if (drama.id) {
      window.location.href = `/drama/${drama.id}`;
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "video-drama-card", onClick: handleClick, children: [
    /* @__PURE__ */ jsxs("div", { className: "card-poster", children: [
      /* @__PURE__ */ jsx("img", { src: drama.poster, alt: drama.title, loading: "lazy" }),
      /* @__PURE__ */ jsxs("div", { className: "card-overlay", children: [
        /* @__PURE__ */ jsx("div", { className: "play-button", children: /* @__PURE__ */ jsx(Play, { size: 24, fill: "white" }) }),
        /* @__PURE__ */ jsxs("div", { className: "card-info", children: [
          /* @__PURE__ */ jsx("h3", { className: "card-title", children: drama.title }),
          /* @__PURE__ */ jsxs("div", { className: "card-footer", children: [
            drama.rating && /* @__PURE__ */ jsxs("div", { className: "rating", children: [
              /* @__PURE__ */ jsx(Star, { size: 12, fill: "#fbbf24", color: "#fbbf24" }),
              /* @__PURE__ */ jsx("span", { children: drama.rating })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "views", children: [
              drama.playCount,
              " views"
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("style", { jsx: true, children: `
                .video-drama-card {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 9/16;
                    border-radius: 16px;
                    overflow: hidden;
                    cursor: pointer;
                    transition: transform 0.3s ease;
                    background: #1a1d23;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }

                .video-drama-card:hover {
                    transform: translateY(-8px);
                    border-color: #e11d48;
                }

                .card-poster {
                    position: relative;
                    width: 100%;
                    height: 100%;
                }

                .card-poster img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .card-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%);
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    padding: 1.5rem;
                    opacity: 1;
                    transition: background 0.3s ease;
                }

                .play-button {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) scale(0.8);
                    background: rgba(225, 29, 72, 0.9);
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: all 0.3s ease;
                    box-shadow: 0 0 20px rgba(225, 29, 72, 0.4);
                }

                .video-drama-card:hover .play-button {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }

                .card-info {
                    z-index: 2;
                }

                .card-title {
                    color: white;
                    font-size: 1rem;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
                }

                .card-footer {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 0.75rem;
                    font-weight: 600;
                }

                .rating {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    color: #fbbf24;
                }
            ` })
  ] });
};

const DramaGrid = ({ initialData, title, type }) => {
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
      if (type === "latest") {
        newData = await dramaService.getLatest(nextPage);
      } else if (type === "trending") {
        newData = await dramaService.getTrending(nextPage);
      }
      const newArray = Array.isArray(newData) ? newData : newData?.data || [];
      if (newArray.length === 0) {
        setHasMore(false);
      } else {
        setItems((prev) => [...prev, ...newArray]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Error loading more drama:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "drama-section", children: [
    /* @__PURE__ */ jsx("div", { className: "section-header", children: /* @__PURE__ */ jsx("h2", { className: "section-title", children: title }) }),
    /* @__PURE__ */ jsx("div", { className: "drama-grid", children: items.map((drama, idx) => /* @__PURE__ */ jsx(DramaCard, { drama }, `${drama.id || idx}-${page}`)) }),
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
                .drama-section {
                    margin-bottom: 3.5rem;
                }
                .section-header {
                    margin-bottom: 2rem;
                }
                .section-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: white;
                }
                .drama-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1.5rem;
                }
                
                @media (min-width: 768px) {
                    .drama-grid {
                        grid-template-columns: repeat(3, 1fr);
                        gap: 2rem;
                    }
                }

                @media (min-width: 1024px) {
                    .drama-grid {
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
                    background: rgba(255, 255, 255, 0.03);
                    color: white;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    padding: 1rem 3rem;
                    border-radius: 100px;
                    font-weight: 700;
                    font-family: 'Outfit', sans-serif;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .load-more-btn:hover:not(:disabled) {
                    background: #e11d48;
                    border-color: #e11d48;
                    transform: translateY(-4px);
                    box-shadow: 0 10px 20px rgba(225, 29, 72, 0.3);
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
                   .drama-grid {
                       gap: 1rem;
                   }
                }
            ` })
  ] });
};

const $$Drama = createComponent(async ($$result, $$props, $$slots) => {
  let trendingData = [];
  let latestData = [];
  let forYouData = [];
  let randomData = [];
  try {
    const results = await Promise.allSettled([
      dramaService.getTrending(1),
      dramaService.getLatest(1),
      dramaService.getForYou(),
      dramaService.getRandom()
    ]);
    trendingData = results[0].status === "fulfilled" && results[0].value ? results[0].value : FALLBACK_DRAMA;
    latestData = results[1].status === "fulfilled" && results[1].value ? results[1].value : FALLBACK_DRAMA;
    forYouData = results[2].status === "fulfilled" && results[2].value ? results[2].value : FALLBACK_DRAMA;
    randomData = results[3].status === "fulfilled" && results[3].value ? results[3].value : [];
  } catch (e) {
    console.error("Error fetching drama data:", e);
    trendingData = FALLBACK_DRAMA;
    latestData = FALLBACK_DRAMA;
    forYouData = FALLBACK_DRAMA;
  }
  const ensureArray = (data) => Array.isArray(data) ? data : data?.data || [];
  const trending = ensureArray(trendingData);
  const latest = ensureArray(latestData);
  const forYou = ensureArray(forYouData);
  const random = ensureArray(randomData);
  const heroDrama = trending[0];
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Drama Box", "data-astro-cid-sesiftkb": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="drama-container" data-astro-cid-sesiftkb>  ${heroDrama && renderTemplate`<section class="hero-section" data-astro-cid-sesiftkb> <div class="hero-backdrop" data-astro-cid-sesiftkb> <img${addAttribute(heroDrama.poster || heroDrama.image, "src")} alt="" data-astro-cid-sesiftkb> <div class="hero-overlay" data-astro-cid-sesiftkb></div> </div> <div class="hero-content" data-astro-cid-sesiftkb> <span class="hero-badge" data-astro-cid-sesiftkb>TRENDING SEKARANG</span> <h1 class="hero-title" data-astro-cid-sesiftkb>${heroDrama.title || heroDrama.name}</h1> <p class="hero-description" data-astro-cid-sesiftkb> ${heroDrama.description ? heroDrama.description.slice(0, 150) + "..." : "Saksikan drama terbaru dan terpopuler dengan kualitas terbaik."} </p> <div class="hero-actions" data-astro-cid-sesiftkb> <a${addAttribute(`/drama/${heroDrama.id || heroDrama.slug}`, "href")} class="btn-primary" data-astro-cid-sesiftkb> ${renderComponent($$result2, "Play", Play, { "size": 20, "fill": "currentColor", "data-astro-cid-sesiftkb": true })} <span data-astro-cid-sesiftkb>Tonton Sekarang</span> </a> <button class="btn-secondary" data-astro-cid-sesiftkb> ${renderComponent($$result2, "Info", Info, { "size": 20, "data-astro-cid-sesiftkb": true })} <span data-astro-cid-sesiftkb>Detail Drama</span> </button> </div> </div> </section>`} <div class="content-wrapper" data-astro-cid-sesiftkb>  <section class="horizontal-section" data-astro-cid-sesiftkb> <div class="section-header" data-astro-cid-sesiftkb> <h2 class="section-title" data-astro-cid-sesiftkb>Pilihan Untukmu</h2> </div> <div class="horizontal-scroll" data-astro-cid-sesiftkb> ${forYou.map((drama) => renderTemplate`<div class="horizontal-item" data-astro-cid-sesiftkb> ${renderComponent($$result2, "DramaCard", DramaCard, { "drama": drama, "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/ngulik/Streaming tv/src/components/DramaCard.jsx", "client:component-export": "default", "data-astro-cid-sesiftkb": true })} </div>`)} </div> </section>  ${random.length > 0 && renderTemplate`<section class="horizontal-section" data-astro-cid-sesiftkb> <div class="section-header featured-header" data-astro-cid-sesiftkb> <div class="title-with-icon" data-astro-cid-sesiftkb> ${renderComponent($$result2, "Flame", Flame, { "size": 24, "color": "#e11d48", "fill": "#e11d48", "data-astro-cid-sesiftkb": true })} <h2 class="section-title" data-astro-cid-sesiftkb>🔥 Trending Shorts</h2> </div> <p class="section-subtitle" data-astro-cid-sesiftkb>Cuplikan drama paling viral hari ini</p> </div> <div class="horizontal-scroll shorts-scroll" data-astro-cid-sesiftkb> ${random.map((drama) => renderTemplate`<div class="short-item" data-astro-cid-sesiftkb> ${renderComponent($$result2, "VideoDramaCard", VideoDramaCard, { "drama": drama, "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/ngulik/Streaming tv/src/components/VideoDramaCard.jsx", "client:component-export": "default", "data-astro-cid-sesiftkb": true })} </div>`)} </div> </section>`}  ${renderComponent($$result2, "DramaGrid", DramaGrid, { "initialData": trending, "title": "Trending Minggu Ini", "type": "trending", "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/ngulik/Streaming tv/src/components/DramaGrid.jsx", "client:component-export": "default", "data-astro-cid-sesiftkb": true })}  ${renderComponent($$result2, "DramaGrid", DramaGrid, { "initialData": latest, "title": "Update Terbaru", "type": "latest", "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/ngulik/Streaming tv/src/components/DramaGrid.jsx", "client:component-export": "default", "data-astro-cid-sesiftkb": true })} </div> </div> ` })} `;
}, "D:/ngulik/Streaming tv/src/pages/drama.astro", void 0);

const $$file = "D:/ngulik/Streaming tv/src/pages/drama.astro";
const $$url = "/drama";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Drama,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
