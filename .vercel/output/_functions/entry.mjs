import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_bgPCrkeA.mjs';
import { manifest } from './manifest_DItnWD1S.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/anime/_id_.astro.mjs');
const _page2 = () => import('./pages/anime.astro.mjs');
const _page3 = () => import('./pages/channel/_id_.astro.mjs');
const _page4 = () => import('./pages/drama/_id_.astro.mjs');
const _page5 = () => import('./pages/drama.astro.mjs');
const _page6 = () => import('./pages/live.astro.mjs');
const _page7 = () => import('./pages/movies.astro.mjs');
const _page8 = () => import('./pages/settings.astro.mjs');
const _page9 = () => import('./pages/tv.astro.mjs');
const _page10 = () => import('./pages/watchlist.astro.mjs');
const _page11 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/anime/[id].astro", _page1],
    ["src/pages/anime.astro", _page2],
    ["src/pages/channel/[id].astro", _page3],
    ["src/pages/drama/[id].astro", _page4],
    ["src/pages/drama.astro", _page5],
    ["src/pages/live.astro", _page6],
    ["src/pages/movies.astro", _page7],
    ["src/pages/settings.astro", _page8],
    ["src/pages/tv.astro", _page9],
    ["src/pages/watchlist.astro", _page10],
    ["src/pages/index.astro", _page11]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "61b692e5-b8f8-4e20-8c57-eaab8a2c4b1d",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
