import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate } from '../../chunks/astro/server_B4R6OevK.mjs';
import 'piccolore';
import { g as getChannels } from '../../chunks/channels_CSGX-ibN.mjs';
import { $ as $$MainLayout } from '../../chunks/MainLayout_CDQ_6HnC.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { V as VideoPlayer } from '../../chunks/VideoPlayer_PxROHwvy.mjs';
import { Search, ChevronRight } from 'lucide-react';
export { renderers } from '../../renderers.mjs';

const WatchContainer = ({ initialChannel, allChannels }) => {
  const [currentChannel, setCurrentChannel] = useState(initialChannel);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredChannels = allChannels.filter(
    (c) => c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleChannelSelect = (channel) => {
    setCurrentChannel(channel);
    if (window.innerWidth < 1024) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "watch-layout", children: [
    /* @__PURE__ */ jsxs("div", { className: "player-main", children: [
      /* @__PURE__ */ jsx("div", { className: "player-wrapper shadow-2xl", children: /* @__PURE__ */ jsx(VideoPlayer, { url: currentChannel.url }) }),
      /* @__PURE__ */ jsx("div", { className: "channel-detail", children: /* @__PURE__ */ jsxs("div", { className: "channel-header", children: [
        /* @__PURE__ */ jsx("div", { className: "channel-logo-box", children: /* @__PURE__ */ jsx("img", { src: currentChannel.logo, alt: currentChannel.name, className: "logo-img" }) }),
        /* @__PURE__ */ jsxs("div", { className: "channel-info-text", children: [
          /* @__PURE__ */ jsx("h1", { className: "channel-name", children: currentChannel.name }),
          /* @__PURE__ */ jsxs("div", { className: "channel-status", children: [
            /* @__PURE__ */ jsx("span", { className: "live-dot" }),
            /* @__PURE__ */ jsx("span", { children: "Live Streaming" }),
            /* @__PURE__ */ jsx("span", { className: "separator", children: "•" }),
            /* @__PURE__ */ jsx("span", { className: "group-badge", children: currentChannel.group })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("aside", { className: "channel-sidebar shadow-xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "sidebar-header", children: [
        /* @__PURE__ */ jsx("h2", { className: "sidebar-title", children: "Saluran Lainnya" }),
        /* @__PURE__ */ jsxs("div", { className: "sidebar-search", children: [
          /* @__PURE__ */ jsx(Search, { size: 16 }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Cari saluran...",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value)
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "sidebar-list", children: filteredChannels.map((channel) => /* @__PURE__ */ jsxs(
        "button",
        {
          className: `sidebar-item ${currentChannel.id === channel.id ? "active" : ""}`,
          onClick: () => handleChannelSelect(channel),
          children: [
            /* @__PURE__ */ jsx("div", { className: "item-logo", children: /* @__PURE__ */ jsx("img", { src: channel.logo, alt: "" }) }),
            /* @__PURE__ */ jsxs("div", { className: "item-info", children: [
              /* @__PURE__ */ jsx("span", { className: "item-name", children: channel.name }),
              /* @__PURE__ */ jsx("span", { className: "item-group", children: channel.group })
            ] }),
            /* @__PURE__ */ jsx(ChevronRight, { size: 16, className: "chevron" })
          ]
        },
        channel.id
      )) })
    ] }),
    /* @__PURE__ */ jsx("style", { jsx: true, children: `
        .watch-layout {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 2rem;
          padding-top: 1rem;
        }

        .player-main {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .player-wrapper {
          aspect-ratio: 16/9;
          background: #000;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .channel-detail {
          background: #1a1d23;
          padding: 2rem;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .channel-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .channel-logo-box {
          width: 80px;
          height: 80px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 16px;
          padding: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .channel-name {
          font-family: 'Outfit', sans-serif;
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .channel-status {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #94a3b8;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .live-dot {
          width: 8px;
          height: 8px;
          background: #22c55e;
          border-radius: 50%;
          box-shadow: 0 0 10px #22c55e;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        .separator {
          color: rgba(255, 255, 255, 0.1);
        }

        .group-badge {
          background: rgba(255, 255, 255, 0.05);
          padding: 0.25rem 0.75rem;
          border-radius: 6px;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.5px;
        }

        .channel-sidebar {
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
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .sidebar-title {
          font-family: 'Outfit', sans-serif;
          font-size: 1.125rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .sidebar-search {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 12px;
          padding: 0.5rem 1rem;
          color: #64748b;
        }

        .sidebar-search input {
          background: none;
          border: none;
          color: white;
          width: 100%;
          font-size: 0.875rem;
        }

        .sidebar-search input:focus {
          outline: none;
        }

        .sidebar-list {
          flex: 1;
          overflow-y: auto;
          padding: 0.75rem;
        }

        .sidebar-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem;
          border-radius: 12px;
          background: none;
          border: 1px solid transparent;
          color: #94a3b8;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .sidebar-item:hover {
          background: rgba(255, 255, 255, 0.03);
          color: white;
        }

        .sidebar-item.active {
          background: rgba(225, 29, 72, 0.1);
          border-color: rgba(225, 29, 72, 0.2);
          color: white;
        }

        .item-logo {
          width: 44px;
          height: 44px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          padding: 0.4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .item-logo img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .item-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .item-name {
          font-weight: 600;
          font-size: 0.9375rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .item-group {
          font-size: 0.75rem;
          color: #64748b;
        }

        .chevron {
          color: #334155;
          transition: transform 0.2s ease;
        }

        .sidebar-item:hover .chevron {
          transform: translateX(2px);
          color: #94a3b8;
        }

        @media (max-width: 1280px) {
          .watch-layout { grid-template-columns: 1fr 300px; }
        }

        @media (max-width: 1024px) {
          .watch-layout { grid-template-columns: 1fr; }
          .channel-sidebar { position: static; height: 500px; }
        }
      ` })
  ] });
};

const $$Astro = createAstro();
async function getStaticPaths() {
  const channels = await getChannels();
  return channels.map((channel) => ({
    params: { id: channel.id },
    props: { channel, allChannels: channels }
  }));
}
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { channel, allChannels } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": channel.name }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "WatchContainer", WatchContainer, { "initialChannel": channel, "allChannels": allChannels, "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/ngulik/Streaming tv/src/components/WatchContainer.jsx", "client:component-export": "default" })} ` })}`;
}, "D:/ngulik/Streaming tv/src/pages/channel/[id].astro", void 0);

const $$file = "D:/ngulik/Streaming tv/src/pages/channel/[id].astro";
const $$url = "/channel/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    getStaticPaths,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
