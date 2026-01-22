import React from 'react';
import { Tv } from 'lucide-react';

const ChannelCard = ({ channel }) => {
  return (
    <a href={`/channel/${channel.id}`} className="channel-card shadow-lg">
      <div className="logo-wrapper">
        <img
          src={channel.logo || '/logo.png'}
          alt={channel.name}
          className="channel-logo"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/logo.png';
          }}
        />
      </div>
      <div className="channel-info">
        <h3 className="channel-name">{channel.name}</h3>
        <p className="channel-group">{channel.group}</p>
      </div>

      <style jsx>{`
        .channel-card {
          background: #1a1d23;
          border-radius: 18px;
          padding: 1.25rem;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.03);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          position: relative;
          overflow: hidden;
        }

        .channel-card:hover {
          transform: translateY(-8px);
          background: #21252b;
          border-color: rgba(225, 29, 72, 0.2);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
        }

        .logo-wrapper {
          aspect-ratio: 16/10;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          overflow: hidden;
        }

        .channel-logo {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        .channel-card:hover .channel-logo {
          transform: scale(1.1);
        }

        .fallback-logo {
          font-size: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .channel-name {
          font-family: 'Outfit', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: white;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .channel-group {
          font-size: 0.8125rem;
          color: #94a3b8;
          margin: 0;
          margin-top: 0.25rem;
        }
      `}</style>
    </a>
  );
};

export default ChannelCard;
