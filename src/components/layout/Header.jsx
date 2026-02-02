import React, { useState, useEffect } from 'react';
import { Bell, ChevronDown, User, LogOut, Settings as SettingsIcon, X, Check, LogIn } from 'lucide-react';
import './Header.css';
// import { supabase } from '../../lib/supabase';

const Header = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [user, setUser] = useState(null);

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Selamat Datang!', message: 'Nikmati streaming TV Indonesia gratis.', time: 'Baru saja', read: false },
    { id: 2, title: 'Channel Baru', message: 'Channel olahraga baru telah ditambahkan.', time: '2 jam lalu', read: false },
    { id: 3, title: 'Update Sistem', message: 'Perbaikan performa streaming.', time: '1 hari lalu', read: true }
  ]);
  const [unreadCount, setUnreadCount] = useState(2);

  // const [user, setUser] = useState(null); // Removed for no-login mode


  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setShowProfileMenu(false);
    if (!showNotifications) {
      // Mark all as read when opening
      const updated = notifications.map(n => ({ ...n, read: true }));
      setNotifications(updated);
      setUnreadCount(0);
    }
  };

  const handleProfileClick = () => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    setShowProfileMenu(!showProfileMenu);
    setShowNotifications(false);
  };



  const clearNotification = (id, e) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <header className="header">
      <div className="header-left">
        <a href="/" className="app-logo">
          <img src="/logo.png" alt="StreamID" />
        </a>
      </div>

      <div className="user-actions">
        {/* Notifications */}
        <div className="notification-container">
          <button className={`icon-btn ${showNotifications ? 'active' : ''}`} onClick={handleNotificationClick}>
            <Bell size={20} />
            {unreadCount > 0 && <span className="notification-dot"></span>}
          </button>

          {showNotifications && (
            <div className="dropdown-menu notifications-dropdown">
              <div className="dropdown-header">
                <h3>Notifikasi</h3>
                <span className="badge">{notifications.length}</span>
              </div>
              <div className="notification-list">
                {notifications.length > 0 ? (
                  notifications.map(item => (
                    <div key={item.id} className={`notification-item ${!item.read ? 'unread' : ''}`}>
                      <div className="notif-icon">
                        <Bell size={14} />
                      </div>
                      <div className="notif-content">
                        <h4>{item.title}</h4>
                        <p>{item.message}</p>
                        <span className="time">{item.time}</span>
                      </div>
                      <button className="delete-notif" onClick={(e) => clearNotification(item.id, e)}>
                        <X size={12} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <p>Tidak ada notifikasi baru</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile or Login - REMOVED for no-login mode */}
        {/* <div className="profile-container"> ... </div> */}
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

        .app-logo {
            display: none;
            align-items: center;
            margin-right: 1rem;
        }

        .app-logo img {
            height: 48px; /* Desktop Base size */
            width: auto;
            object-fit: contain;
        }

        .user-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .notification-container, .profile-container {
            position: relative;
        }

        .icon-btn {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          position: relative;
          padding: 0.6rem;
          border-radius: 12px;
          transition: all 0.2s ease;
        }

        .icon-btn:hover, .icon-btn.active {
          color: #white;
          background: rgba(255, 255, 255, 0.05);
        }

        .notification-dot {
          position: absolute;
          top: 8px;
          right: 8px;
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
          padding: 4px;
          padding-right: 0.5rem;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .login-trigger-btn {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            background: #e11d48;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 100px;
            font-weight: 600;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s;
        }

        .login-trigger-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(225, 29, 72, 0.4);
        }

        .profile-pill:hover, .profile-pill.active {
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.05);
        }

        .avatar-circle {
            width: 36px;
            height: 36px;
            background: linear-gradient(135deg, #334155 0%, #1e293b 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #e2e8f0;
            border: 2px solid rgba(255,255,255,0.05);
        }

        .chevron {
          color: #64748b;
          transition: transform 0.2s ease;
        }

        .chevron.rotate {
          transform: rotate(180deg);
        }

        /* Dropdown Styles */
        .dropdown-menu {
          position: absolute;
          top: calc(100% + 15px);
          right: 0;
          background: #1a1d23;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.5);
          z-index: 100;
          overflow: hidden;
          animation: slideDown 0.2s ease;
        }

        .profile-dropdown {
            width: 240px;
            padding: 0.5rem;
        }

        .notifications-dropdown {
            width: 320px;
        }

        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .user-info {
            padding: 1rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            background: rgba(255,255,255,0.02);
            border-radius: 12px;
            margin-bottom: 0.5rem;
        }

        .user-avatar-large {
            width: 40px;
            height: 40px;
            background: #e11d48;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }

        .user-details {
            display: flex;
            flex-direction: column;
        }

        .user-name {
            font-weight: 700;
            color: white;
            font-size: 0.9375rem;
        }

        .user-plan {
            font-size: 0.75rem;
            color: #94a3b8;
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
          font-size: 0.9rem;
          font-weight: 500;
        }

        .dropdown-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }

        .dropdown-item.logout:hover {
          color: #ef4444;
          background: rgba(239, 68, 68, 0.05);
        }

        .dropdown-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.05);
          margin: 0.25rem 0.5rem;
        }

        /* Notifications Specific */
        .dropdown-header {
            padding: 1rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .dropdown-header h3 {
            font-size: 0.9375rem;
            font-weight: 700;
            color: white;
        }

        .badge {
            background: #e11d48;
            color: white;
            font-size: 0.7rem;
            padding: 2px 6px;
            border-radius: 10px;
            font-weight: 700;
        }

        .notification-list {
            max-height: 350px;
            overflow-y: auto;
        }

        .notification-item {
            padding: 1rem;
            display: flex;
            gap: 1rem;
            border-bottom: 1px solid rgba(255,255,255,0.03);
            position: relative;
            transition: background 0.2s;
        }

        .notification-item:hover {
            background: rgba(255,255,255,0.02);
        }

        .notification-item.unread {
            background: rgba(225, 29, 72, 0.05);
        }

        .notif-icon {
            width: 32px;
            height: 32px;
            background: rgba(255,255,255,0.05);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #94a3b8;
            flex-shrink: 0;
        }

        .notification-item.unread .notif-icon {
            background: rgba(225, 29, 72, 0.1);
            color: #e11d48;
        }

        .notif-content {
            flex: 1;
        }

        .notif-content h4 {
            font-size: 0.875rem;
            font-weight: 600;
            color: white;
            margin-bottom: 0.25rem;
        }

        .notif-content p {
            font-size: 0.8rem;
            color: #94a3b8;
            line-height: 1.4;
            margin-bottom: 0.5rem;
        }

        .time {
            font-size: 0.7rem;
            color: #64748b;
        }

        .delete-notif {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: none;
            border: none;
            color: #64748b;
            opacity: 0;
            cursor: pointer;
            padding: 4px;
            transition: all 0.2s;
        }

        .notification-item:hover .delete-notif {
            opacity: 1;
        }

        .delete-notif:hover {
            color: #ef4444;
        }

        .empty-state {
            padding: 2rem;
            text-align: center;
            color: #64748b;
            font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .header {
            height: 80px;
            padding: 0 1rem;
          }
          .app-logo {
              display: flex;
          }
          .app-logo img {
              height: 60px; 
              max-width: 250px;
          }
          .chevron {
            display: none;
          }
          .notifications-dropdown {
            width: 280px;
            right: -60px;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
