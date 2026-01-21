import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_B4R6OevK.mjs';
import 'piccolore';
import { g as getChannels } from '../chunks/channels_CSGX-ibN.mjs';
import { $ as $$MainLayout } from '../chunks/MainLayout_CDQ_6HnC.mjs';
import { C as ChannelCard } from '../chunks/ChannelCard_BOrdGGeb.mjs';
/* empty css                              */
export { renderers } from '../renderers.mjs';

const $$Tv = createComponent(async ($$result, $$props, $$slots) => {
  const channels = await getChannels();
  const indonesianChannels = channels.filter(
    (c) => c.country === "ID" || /indonesia|jakarta|bandung|surabaya|rcti|sctv|indosiar|antv|tvri|metro|kompas|tvone|net/i.test(c.name) || /indonesia|jakarta|bandung|surabaya/i.test(c.group || "")
  );
  const featuredChannel = indonesianChannels.length > 0 ? indonesianChannels[0] : null;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "TV Indonesia", "data-astro-cid-evvcql4w": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="tv-container" data-astro-cid-evvcql4w> ${featuredChannel && renderTemplate`<div class="hero-section" data-astro-cid-evvcql4w> <div class="hero-content" data-astro-cid-evvcql4w> <h1 class="hero-title" data-astro-cid-evvcql4w>TV Indonesia</h1> <p class="hero-subtitle" data-astro-cid-evvcql4w>Koleksi lengkap channel TV Indonesia dari berbagai jaringan</p> <div class="hero-stats" data-astro-cid-evvcql4w> <span data-astro-cid-evvcql4w>${indonesianChannels.length} Channel TV</span> </div> </div> <div class="hero-image" data-astro-cid-evvcql4w> <img${addAttribute(featuredChannel.logo, "src")}${addAttribute(featuredChannel.name, "alt")} data-astro-cid-evvcql4w> </div> </div>`} <section class="channels-section" data-astro-cid-evvcql4w> <div class="section-header" data-astro-cid-evvcql4w> <h2 class="section-title" data-astro-cid-evvcql4w>Semua Channel</h2> <p class="section-desc" data-astro-cid-evvcql4w>Pilih channel TV favorit Anda</p> </div> ${indonesianChannels.length > 0 ? renderTemplate`<div class="channel-grid" data-astro-cid-evvcql4w> ${indonesianChannels.map((channel) => renderTemplate`${renderComponent($$result2, "ChannelCard", ChannelCard, { "channel": channel, "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/ngulik/Streaming tv/src/components/ChannelCard.jsx", "client:component-export": "default", "data-astro-cid-evvcql4w": true })}`)} </div>` : renderTemplate`<div class="empty-state" data-astro-cid-evvcql4w> <div class="empty-icon" data-astro-cid-evvcql4w> <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-evvcql4w> <rect x="2" y="3" width="20" height="14" rx="2" ry="2" data-astro-cid-evvcql4w></rect> <line x1="8" y1="21" x2="16" y2="21" data-astro-cid-evvcql4w></line> <line x1="12" y1="17" x2="12" y2="21" data-astro-cid-evvcql4w></line> </svg> </div> <h3 data-astro-cid-evvcql4w>Tidak ada channel TV tersedia</h3> <p data-astro-cid-evvcql4w>Channel TV sedang dimuat atau tidak tersedia saat ini.</p> </div>`} </section> </div> ` })} `;
}, "D:/ngulik/Streaming tv/src/pages/tv.astro", void 0);

const $$file = "D:/ngulik/Streaming tv/src/pages/tv.astro";
const $$url = "/tv";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Tv,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
