import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_B4R6OevK.mjs';
import 'piccolore';
import { g as getChannels } from '../chunks/channels_CSGX-ibN.mjs';
import { $ as $$MainLayout } from '../chunks/MainLayout_CDQ_6HnC.mjs';
import { C as ChannelCard } from '../chunks/ChannelCard_BOrdGGeb.mjs';
/* empty css                                  */
export { renderers } from '../renderers.mjs';

const $$Movies = createComponent(async ($$result, $$props, $$slots) => {
  const channels = await getChannels();
  const movieChannels = channels.filter(
    (c) => /movie|cinema|film|hbo|netflix|disney|warner|hulu|imax|theater/i.test(c.name) || /movie|cinema|film|hbo|netflix|disney|warner|hulu|imax|theater/i.test(c.group || "")
  );
  const featuredMovie = movieChannels.length > 0 ? movieChannels[0] : null;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Movies", "data-astro-cid-q73zfvfs": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="movies-container" data-astro-cid-q73zfvfs> ${featuredMovie && renderTemplate`<div class="hero-section" data-astro-cid-q73zfvfs> <div class="hero-content" data-astro-cid-q73zfvfs> <h1 class="hero-title" data-astro-cid-q73zfvfs>Film & Cinema</h1> <p class="hero-subtitle" data-astro-cid-q73zfvfs>Koleksi lengkap film dan acara cinema dari berbagai platform streaming</p> <div class="hero-stats" data-astro-cid-q73zfvfs> <span data-astro-cid-q73zfvfs>${movieChannels.length} Film Tersedia</span> </div> </div> <div class="hero-image" data-astro-cid-q73zfvfs> <img${addAttribute(featuredMovie.logo, "src")}${addAttribute(featuredMovie.name, "alt")} data-astro-cid-q73zfvfs> </div> </div>`} <section class="channels-section" data-astro-cid-q73zfvfs> <div class="section-header" data-astro-cid-q73zfvfs> <h2 class="section-title" data-astro-cid-q73zfvfs>Semua Film</h2> <p class="section-desc" data-astro-cid-q73zfvfs>Pilih film favorit Anda untuk ditonton</p> </div> ${movieChannels.length > 0 ? renderTemplate`<div class="channel-grid" data-astro-cid-q73zfvfs> ${movieChannels.map((channel) => renderTemplate`${renderComponent($$result2, "ChannelCard", ChannelCard, { "channel": channel, "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/ngulik/Streaming tv/src/components/ChannelCard.jsx", "client:component-export": "default", "data-astro-cid-q73zfvfs": true })}`)} </div>` : renderTemplate`<div class="empty-state" data-astro-cid-q73zfvfs> <div class="empty-icon" data-astro-cid-q73zfvfs> <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-q73zfvfs> <rect x="2" y="3" width="20" height="14" rx="2" ry="2" data-astro-cid-q73zfvfs></rect> <line x1="8" y1="21" x2="16" y2="21" data-astro-cid-q73zfvfs></line> <line x1="12" y1="17" x2="12" y2="21" data-astro-cid-q73zfvfs></line> </svg> </div> <h3 data-astro-cid-q73zfvfs>Tidak ada film tersedia</h3> <p data-astro-cid-q73zfvfs>Film sedang dimuat atau tidak tersedia saat ini.</p> </div>`} </section> </div> ` })} `;
}, "D:/ngulik/Streaming tv/src/pages/movies.astro", void 0);

const $$file = "D:/ngulik/Streaming tv/src/pages/movies.astro";
const $$url = "/movies";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Movies,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
