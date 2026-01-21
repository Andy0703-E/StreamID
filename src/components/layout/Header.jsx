import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

const Header = () => {
    return (
        <header className="header">
            <div className="search-container">
                <Search className="search-icon" size={18} />
                <input type="text" placeholder="Search..." className="search-input" />
            </div>

            <div className="user-actions">
                <button className="icon-btn">
                    <Bell size={20} />
                    <span className="notification-dot"></span>
                </button>

                <div className="profile-pill">
                    <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                        alt="Profile"
                        className="profile-img"
                    />
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
          background: transparent;
          position: sticky;
          top: 0;
          z-index: 90;
        }

        .search-container {
          position: relative;
          flex: 1;
          max-width: 440px;
        }

        .search-icon {
          position: absolute;
          left: 1.25rem;
          top: 50%;
          transform: translateY(-50%);
          color: #64748b;
        }

        .search-input {
          width: 100%;
          background: #1a1d23;
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          padding: 0.75rem 1rem 0.75rem 3rem;
          color: white;
          font-size: 0.9375rem;
          transition: all 0.2s ease;
        }

        .search-input:focus {
          outline: none;
          background: #21252b;
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 0 3px rgba(148, 163, 184, 0.05);
        }

        .user-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .icon-btn {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          position: relative;
          padding: 0.5rem;
          border-radius: 10px;
          transition: all 0.2s ease;
        }

        .icon-btn:hover {
          color: white;
          background: rgba(255, 255, 255, 0.03);
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
          background: #1a1d23;
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .profile-pill:hover {
          background: #21252b;
        }

        .profile-img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #334155;
        }

        .chevron {
          color: #64748b;
        }

        @media (max-width: 640px) {
          .search-container {
            max-width: 180px;
          }
        }
      `}</style>
        </header>
    );
};

export default Header;
