import React, { useState, useEffect } from 'react';
import { Home, Tv, Film, Radio, Bookmark, Settings, PlayCircle, Heart } from 'lucide-react';

const Sidebar = () => {
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    // Listen for navigation changes
    const handleNavigation = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleNavigation);
    return () => window.removeEventListener('popstate', handleNavigation);
  }, []);

  const menuItems = [
    { icon: <Home size={20} />, label: 'Home', href: '/' },
    { icon: <Tv size={20} />, label: 'TV Indonesia', href: '/tv' },
    { icon: <Film size={20} />, label: 'Movies', href: '/movies' },
    { icon: <PlayCircle size={20} />, label: 'Anime', href: '/anime' },
    { icon: <Heart size={20} />, label: 'Drama Box', href: '/drama' },
    { icon: <Radio size={20} />, label: 'Live Sports', href: '/live' },
    { icon: <Bookmark size={20} />, label: 'Watchlist', href: '/watchlist' },
    { icon: <Settings size={20} />, label: 'Settings', href: '/settings' },
  ];

  const handleNavigation = (href, e) => {
    e.preventDefault();
    window.location.href = href;
  };

  return (
    <aside className="sidebar">
      <div className="logo-container">
        <div className="logo-icon">
          <span className="logo-line logo-line-top"></span>
          <span className="logo-line logo-line-bottom"></span>
        </div>
        <span className="logo-text">StreamID</span>
      </div>

      <nav className="nav-menu">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={(e) => handleNavigation(item.href, e)}
            className={`nav-item ${currentPath === item.href ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <style jsx>{`
        .sidebar {
          width: 240px;
          height: 100vh;
          background: #0f1115;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          padding: 2rem 1.5rem;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 100;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 3rem;
          padding-left: 0.5rem;
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
          color: white;
          letter-spacing: -0.5px;
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.875rem 1rem;
          border-radius: 12px;
          color: #94a3b8;
          text-decoration: none;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          font-weight: 500;
          font-size: 0.9375rem;
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
        }

        .nav-item:hover {
          color: white;
          background: rgba(255, 255, 255, 0.03);
        }

        .nav-item.active {
          background: linear-gradient(to right, #e11d48, #fb7185);
          color: white;
          box-shadow: 0 4px 15px rgba(225, 29, 72, 0.3);
        }

        .nav-icon {
          display: flex;
          align-items: center;
        }

        @media (max-width: 1024px) {
          .sidebar {
            width: 80px;
            padding: 2rem 0.75rem;
          }
          .logo-text, .nav-label {
            display: none;
          }
          .logo-container {
            justify-content: center;
            padding-left: 0;
          }
          .nav-item {
            justify-content: center;
            padding: 1rem;
          }
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
