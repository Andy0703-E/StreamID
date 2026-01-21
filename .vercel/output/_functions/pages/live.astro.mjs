import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_B4R6OevK.mjs';
import 'piccolore';
import { g as getChannels } from '../chunks/channels_CSGX-ibN.mjs';
import { $ as $$MainLayout } from '../chunks/MainLayout_CDQ_6HnC.mjs';
import { C as ChannelCard } from '../chunks/ChannelCard_BOrdGGeb.mjs';
/* empty css                                */
export { renderers } from '../renderers.mjs';

const $$Live = createComponent(async ($$result, $$props, $$slots) => {
  const channels = await getChannels();
  const sportsChannels = channels.filter(
    (c) => /bola|sport|football|soccer|beIN|stadium|fox|espn|premier|liga|champions|olympic|live|streaming/i.test(c.name) || /bola|sport|football|soccer|beIN|stadium|fox|espn|premier|liga|champions|olympic|live|streaming/i.test(c.group || "")
  );
  const featuredSport = sportsChannels.length > 0 ? sportsChannels[0] : null;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Live Sports", "data-astro-cid-4an7u5kh": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="sports-container" data-astro-cid-4an7u5kh> ${featuredSport && renderTemplate`<div class="hero-section" data-astro-cid-4an7u5kh> <div class="hero-content" data-astro-cid-4an7u5kh> <h1 class="hero-title" data-astro-cid-4an7u5kh>Olahraga Langsung</h1> <p class="hero-subtitle" data-astro-cid-4an7u5kh>Tonton pertandingan olahraga langsung dari seluruh dunia</p> <div class="hero-stats" data-astro-cid-4an7u5kh> <span data-astro-cid-4an7u5kh>${sportsChannels.length} Channel Olahraga</span> </div> </div> <div class="hero-image" data-astro-cid-4an7u5kh> <img${addAttribute(featuredSport.logo, "src")}${addAttribute(featuredSport.name, "alt")} data-astro-cid-4an7u5kh> </div> </div>`} <section class="channels-section" data-astro-cid-4an7u5kh> <div class="section-header" data-astro-cid-4an7u5kh> <h2 class="section-title" data-astro-cid-4an7u5kh>Live Streaming</h2> <p class="section-desc" data-astro-cid-4an7u5kh>Pilih channel olahraga favorit Anda</p> </div> ${sportsChannels.length > 0 ? renderTemplate`<div class="channel-grid" data-astro-cid-4an7u5kh> ${sportsChannels.map((channel) => renderTemplate`${renderComponent($$result2, "ChannelCard", ChannelCard, { "channel": channel, "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/ngulik/Streaming tv/src/components/ChannelCard.jsx", "client:component-export": "default", "data-astro-cid-4an7u5kh": true })}`)} </div>` : renderTemplate`<div class="empty-state" data-astro-cid-4an7u5kh> <div class="empty-icon" data-astro-cid-4an7u5kh> <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-4an7u5kh> <circle cx="12" cy="12" r="10" data-astro-cid-4an7u5kh></circle> <path d="m9 12 2 2 4-4" data-astro-cid-4an7u5kh></path> </svg> </div> <h3 data-astro-cid-4an7u5kh>Tidak ada channel olahraga tersedia</h3> <p data-astro-cid-4an7u5kh>Channel olahraga sedang dimuat atau tidak tersedia saat ini.</p> </div>`} </section> </div> ` })} `;
}, "D:/ngulik/Streaming tv/src/pages/live.astro", void 0);

const $$file = "D:/ngulik/Streaming tv/src/pages/live.astro";
const $$url = "/live";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Live,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
