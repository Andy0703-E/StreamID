import React, { useState } from 'react';
import { Bell, ChevronDown, User, LogOut, Settings as SettingsIcon } from 'lucide-react';

const Header = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="header">
      <div className="header-left">
        {/* Logo removed as requested */}
      </div>

      <div className="user-actions">
        <button className="icon-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        <div className="profile-container">
          <div className="profile-pill" onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <User size={20} className="profile-icon" />
            <ChevronDown size={14} className={`chevron ${showProfileMenu ? 'rotate' : ''}`} />
          </div>

          {showProfileMenu && (
            <div className="profile-dropdown">
              <div className="dropdown-item" onClick={() => window.location.href = '/settings'}>
                <SettingsIcon size={18} />
                <span>Pengaturan</span>
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-item logout" onClick={() => alert('Logout feature coming soon!')}>
                <LogOut size={18} />
                <span>Keluar</span>
              </div>
            </div>
          )}
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

        .header-left {
          display: flex;
          align-items: center;
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
          transition: transform 0.2s ease;
        }

        .chevron.rotate {
          transform: rotate(180deg);
        }

        .profile-container {
          position: relative;
        }

        .profile-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: 200px;
          background: #1a1d23;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 0.5rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          z-index: 100;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          color: #94a3b8;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.9375rem;
        }

        .dropdown-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }

        .dropdown-item.logout:hover {
          color: #e11d48;
          background: rgba(225, 29, 72, 0.05);
        }

        .dropdown-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.05);
          margin: 0.5rem 0;
        }


      `}</style>
    </header>
  );
};

export default Header;
