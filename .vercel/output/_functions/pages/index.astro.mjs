import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_B4R6OevK.mjs';
import 'piccolore';
import { g as getChannels } from '../chunks/channels_CSGX-ibN.mjs';
import { $ as $$MainLayout } from '../chunks/MainLayout_CDQ_6HnC.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { C as ChannelCard } from '../chunks/ChannelCard_BOrdGGeb.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5e3);
    return () => clearInterval(timer);
  }, [items.length]);
  const current = items[currentIndex];
  if (!items || items.length === 0) return null;
  return /* @__PURE__ */ jsxs("div", { className: "carousel", children: [
    /* @__PURE__ */ jsxs("div", { className: "carousel-inner shadow-2xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "carousel-content", children: [
        /* @__PURE__ */ jsx("span", { className: "featured-badge", children: "Featured" }),
        /* @__PURE__ */ jsx("h2", { className: "featured-title", children: current.name }),
        /* @__PURE__ */ jsxs("p", { className: "featured-desc", children: [
          current.group,
          " Channel - HD Streaming Available"
        ] }),
        /* @__PURE__ */ jsxs("a", { href: `/channel/${current.id}`, className: "play-btn", children: [
          /* @__PURE__ */ jsx(Play, { size: 20, fill: "currentColor" }),
          "Tonton Sekarang"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "carousel-image-container", children: [
        /* @__PURE__ */ jsx("img", { src: current.logo, alt: current.name, className: "carousel-img" }),
        /* @__PURE__ */ jsx("div", { className: "carousel-gradient" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "carousel-dots", children: items.map((_, idx) => /* @__PURE__ */ jsx(
        "button",
        {
          className: `dot ${idx === currentIndex ? "active" : ""}`,
          onClick: () => setCurrentIndex(idx)
        },
        idx
      )) })
    ] }),
    /* @__PURE__ */ jsx("style", { jsx: true, children: `
        .carousel {
          margin-bottom: 3rem;
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          background: #1a1d23;
          height: 380px;
        }

        .carousel-inner {
          height: 100%;
          display: flex;
          align-items: center;
          position: relative;
        }

        .carousel-content {
          flex: 1;
          padding: 3rem;
          z-index: 10;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-width: 50%;
        }

        .featured-badge {
          font-size: 0.875rem;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .featured-title {
          font-family: 'Outfit', sans-serif;
          font-size: 3rem;
          font-weight: 800;
          color: white;
          line-height: 1.1;
        }

        .featured-desc {
          font-size: 1.125rem;
          color: #94a3b8;
          max-width: 400px;
        }

        .play-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: linear-gradient(to right, #e11d48, #fb7185);
          color: white;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 700;
          text-decoration: none;
          width: fit-content;
          transition: all 0.2s ease;
          box-shadow: 0 4px 20px rgba(225, 29, 72, 0.4);
        }

        .play-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }

        .carousel-image-container {
          position: absolute;
          right: 0;
          top: 0;
          width: 60%;
          height: 100%;
        }

        .carousel-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          opacity: 0.6;
          filter: blur(5px);
          mask-image: linear-gradient(to left, black 60%, transparent);
        }

        /* Improved image look for logos */
        .carousel-img {
          object-fit: contain;
          padding: 4rem;
          filter: drop-shadow(0 0 50px rgba(255,255,255,0.1));
          opacity: 0.8;
          blur: 0;
        }

        .carousel-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, #1a1d23 0%, transparent 100%);
        }

        .carousel-dots {
          position: absolute;
          bottom: 2rem;
          left: 3rem;
          display: flex;
          gap: 0.75rem;
          z-index: 20;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          width: 24px;
          border-radius: 4px;
          background: #e11d48;
        }

        @media (max-width: 768px) {
          .carousel { height: auto; min-height: 400px; }
          .carousel-content { max-width: 100%; padding: 2rem; text-align: center; align-items: center; }
          .featured-title { font-size: 2rem; }
          .carousel-image-container { opacity: 0.3; width: 100%; }
          .carousel-dots { left: 50%; transform: translateX(-50%); }
        }
      ` })
  ] });
};

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const channels = await getChannels();
  const indonesianChannels = channels.filter((c) => c.country === "ID" || c.group?.toLowerCase().includes("indonesia"));
  const movieChannels = channels.filter((c) => /movie|cinema|film|hbo/i.test(c.name) || /movie/i.test(c.group));
  const sportsChannels = channels.filter((c) => /bola|sport|beIN|stadium|fox|espn/i.test(c.name) || /sport/i.test(c.group));
  const featuredChannels = indonesianChannels.slice(0, 5);
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Home", "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="home-container" data-astro-cid-j7pv25f6> ${featuredChannels.length > 0 && renderTemplate`${renderComponent($$result2, "Carousel", Carousel, { "items": featuredChannels, "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/ngulik/Streaming tv/src/components/Carousel.jsx", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })}`} <section class="channel-section" data-astro-cid-j7pv25f6> <div class="section-header" data-astro-cid-j7pv25f6> <h2 class="section-title" data-astro-cid-j7pv25f6>Populer di Indonesia</h2> <a href="#" class="see-all" data-astro-cid-j7pv25f6>See All</a> </div> <div class="channel-grid" data-astro-cid-j7pv25f6> ${indonesianChannels.slice(0, 12).map((channel) => renderTemplate`${renderComponent($$result2, "ChannelCard", ChannelCard, { "channel": channel, "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/ngulik/Streaming tv/src/components/ChannelCard.jsx", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })}`)} </div> </section> <section class="channel-section" data-astro-cid-j7pv25f6> <div class="section-header" data-astro-cid-j7pv25f6> <h2 class="section-title" data-astro-cid-j7pv25f6>Film & Cinema</h2> <a href="#" class="see-all" data-astro-cid-j7pv25f6>See All</a> </div> <div class="channel-grid" data-astro-cid-j7pv25f6> ${movieChannels.slice(0, 6).map((channel) => renderTemplate`${renderComponent($$result2, "ChannelCard", ChannelCard, { "channel": channel, "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/ngulik/Streaming tv/src/components/ChannelCard.jsx", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })}`)} </div> </section> <section class="channel-section" data-astro-cid-j7pv25f6> <div class="section-header" data-astro-cid-j7pv25f6> <h2 class="section-title" data-astro-cid-j7pv25f6>Olahraga Terkini</h2> <a href="#" class="see-all" data-astro-cid-j7pv25f6>See All</a> </div> <div class="channel-grid" data-astro-cid-j7pv25f6> ${sportsChannels.slice(0, 6).map((channel) => renderTemplate`${renderComponent($$result2, "ChannelCard", ChannelCard, { "channel": channel, "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/ngulik/Streaming tv/src/components/ChannelCard.jsx", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })}`)} </div> </section> </div> ` })} `;
}, "D:/ngulik/Streaming tv/src/pages/index.astro", void 0);

const $$file = "D:/ngulik/Streaming tv/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
