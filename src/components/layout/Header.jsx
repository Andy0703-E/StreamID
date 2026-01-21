import React from 'react';
import { Bell, ChevronDown, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-section">
        <div className="logo">
          <div className="logo-icon">
            <span className="logo-line logo-line-top"></span>
            <span className="logo-line logo-line-bottom"></span>
          </div>
          <span className="logo-text">StreamID</span>
        </div>
      </div>

      <div className="user-actions">
        <button className="icon-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        <div className="profile-pill">
          <User size={20} className="profile-icon" />
          <ChevronDown size={14} className="chevron" />
        </div>
      </div>

      <style jsx>{`
        .header {
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          background: #0f1115;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          position: sticky;
          top: 0;
          z-index: 90;
        }

        .logo-section {
          display: flex;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo-icon {
          width: 28px;
          height: 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .logo-line {
          height: 8px;
          border-radius: 2px;
        }

        .logo-line-top {
          background: #ffffff;
          width: 100%;
        }

        .logo-line-bottom {
          background: #e11d48;
          width: 80%;
        }

        .logo-text {
          font-family: 'Outfit', sans-serif;
          font-size: 1.25rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.5px;
        }

        .user-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .icon-btn {
          background: none;
          border: none;
          color: #ffffff;
          cursor: pointer;
          position: relative;
          padding: 0.5rem;
          border-radius: 10px;
          transition: all 0.2s ease;
        }

        .icon-btn:hover {
          color: #e11d48;
          background: rgba(255, 255, 255, 0.05);
        }

        .notification-dot {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 8px;
          height: 8px;
          background: #e11d48;
          border: 2px solid #0f1115;
          border-radius: 50%;
        }

        .profile-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.25rem;
          padding-right: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .profile-pill:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .profile-icon {
          color: #ffffff;
        }

        .chevron {
          color: #94a3b8;
        }

        @media (max-width: 640px) {
          .logo-text {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
