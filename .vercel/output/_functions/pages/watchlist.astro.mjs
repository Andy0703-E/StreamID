import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_B4R6OevK.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../chunks/MainLayout_CDQ_6HnC.mjs';
/* empty css                                     */
export { renderers } from '../renderers.mjs';

const $$Watchlist = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Watchlist", "data-astro-cid-ylz2jmup": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="watchlist-container" data-astro-cid-ylz2jmup> <div class="hero-section" data-astro-cid-ylz2jmup> <div class="hero-content" data-astro-cid-ylz2jmup> <h1 class="hero-title" data-astro-cid-ylz2jmup>Watchlist</h1> <p class="hero-subtitle" data-astro-cid-ylz2jmup>Simpan channel favorit Anda untuk ditonton nanti</p> </div> <div class="hero-image" data-astro-cid-ylz2jmup> <svg class="hero-icon-svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ylz2jmup> <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" data-astro-cid-ylz2jmup></path> </svg> </div> </div> <div class="empty-state" data-astro-cid-ylz2jmup> <div class="empty-icon" data-astro-cid-ylz2jmup> <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ylz2jmup> <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" data-astro-cid-ylz2jmup></path> </svg> </div> <h3 data-astro-cid-ylz2jmup>Watchlist Kosong</h3> <p data-astro-cid-ylz2jmup>Tambahkan channel favorit Anda ke watchlist untuk akses cepat.</p> <a href="/" class="cta-button" data-astro-cid-ylz2jmup>Jelajahi Channel</a> </div> </div> ` })} `;
}, "D:/ngulik/Streaming tv/src/pages/watchlist.astro", void 0);

const $$file = "D:/ngulik/Streaming tv/src/pages/watchlist.astro";
const $$url = "/watchlist";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Watchlist,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
