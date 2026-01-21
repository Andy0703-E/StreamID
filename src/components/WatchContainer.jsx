import React, { useState, useEffect } from 'react';
import VideoPlayer from './VideoPlayer.jsx';
import { ChevronRight, Radio, Search } from 'lucide-react';

const WatchContainer = ({ initialChannel, allChannels }) => {
    const [currentChannel, setCurrentChannel] = useState(initialChannel);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredChannels = allChannels.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleChannelSelect = (channel) => {
        setCurrentChannel(channel);
        // Smooth scroll to top of player on mobile
        if (window.innerWidth < 1024) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="watch-layout">
            <div className="player-main">
                <div className="player-wrapper shadow-2xl">
                    <VideoPlayer url={currentChannel.url} />
                </div>

                <div className="channel-detail">
                    <div className="channel-header">
                        <div className="channel-logo-box">
                            <img src={currentChannel.logo} alt={currentChannel.name} className="logo-img" />
                        </div>
                        <div className="channel-info-text">
                            <h1 className="channel-name">{currentChannel.name}</h1>
                            <div className="channel-status">
                                <span className="live-dot"></span>
                                <span>Live Streaming</span>
                                <span className="separator">•</span>
                                <span className="group-badge">{currentChannel.group}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <aside className="channel-sidebar shadow-xl">
                <div className="sidebar-header">
                    <h2 className="sidebar-title">Saluran Lainnya</h2>
                    <div className="sidebar-search">
                        <Search size={16} />
                        <input
                            type="text"
                            placeholder="Cari saluran..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="sidebar-list">
                    {filteredChannels.map((channel) => (
                        <button
                            key={channel.id}
                            className={`sidebar-item ${currentChannel.id === channel.id ? 'active' : ''}`}
                            onClick={() => handleChannelSelect(channel)}
                        >
                            <div className="item-logo">
                                <img src={channel.logo} alt="" />
                            </div>
                            <div className="item-info">
                                <span className="item-name">{channel.name}</span>
                                <span className="item-group">{channel.group}</span>
                            </div>
                            <ChevronRight size={16} className="chevron" />
                        </button>
                    ))}
                </div>
            </aside>

            <style jsx>{`
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
      `}</style>
        </div>
    );
};

export default WatchContainer;
