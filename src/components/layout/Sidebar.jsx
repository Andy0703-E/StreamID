import React, { useState, useEffect } from 'react';
import { Home, Tv, Film, Radio, Bookmark, Settings, PlayCircle, Heart, Book } from 'lucide-react';

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
    { icon: <Home size={22} />, label: 'Home', mobileLabel: 'Home', href: '/' },
    { icon: <Tv size={22} />, label: 'TV Indonesia', mobileLabel: 'TV', href: '/tv' },
    { icon: <PlayCircle size={22} />, label: 'Anime', mobileLabel: 'Anime', href: '/anime' },
    { icon: <Book size={22} />, label: 'Komik', mobileLabel: 'Komik', href: '/komik' },
    { icon: <Heart size={22} />, label: 'Drama Box', mobileLabel: 'Drama', href: '/drama' },
    { icon: <Radio size={22} />, label: 'Live Sport', mobileLabel: 'Sport', href: '/live' },
    { icon: <Settings size={22} />, label: 'Settings', mobileLabel: 'Pengaturan', href: '/settings' },
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
            <span className="nav-mobile-label">{item.mobileLabel}</span>
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

        .nav-mobile-label {
           display: none;
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

        @media (max-width: 768px) {
          .sidebar {
            width: 100%;
            height: auto;
            bottom: 0;
            top: auto;
            left: 0;
            border-right: none;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding: 0.75rem 0.5rem calc(0.75rem + env(safe-area-inset-bottom));
            flex-direction: row;
            justify-content: space-around;
            backdrop-filter: blur(30px);
            background: rgba(15, 17, 21, 0.95);
          }
          .logo-container {
            display: none;
          }
          .nav-menu {
            flex-direction: row;
            width: 100%;
            justify-content: space-around;
            gap: 0;
          }
          .nav-item {
            flex-direction: column;
            gap: 0.4rem;
            padding: 0.875rem 0.25rem;
            font-size: 0.95rem;
            width: auto;
            flex: 1;
            align-items: center;
          }
          .nav-label {
            display: none;
          }
          .nav-mobile-label {
            display: block;
            font-size: 0.85rem;
            font-weight: 600;
            text-align: center;
          }
          .nav-icon :global(svg) {
            width: 28px;
            height: 28px;
          }
          .nav-item.active {
            background: none;
            box-shadow: none;
            color: #e11d48;
          }
          .nav-item.active .nav-icon {
            transform: translateY(-2px);
            transition: transform 0.3s ease;
          }
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
