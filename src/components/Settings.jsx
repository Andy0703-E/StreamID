import React, { useState, useEffect } from 'react';
import {
  Monitor,
  Globe,
  Bell,
  Check,
  ChevronRight,
  Volume2,
  Trash2,
  PlayCircle,
  Smartphone,
  Info
} from 'lucide-react';

const Switch = ({ checked, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={onChange}
    className={`switch ${checked ? 'checked' : ''}`}
  >
    <span className="switch-thumb" />
    <style jsx>{`
            .switch {
                position: relative;
                display: inline-flex;
                height: 28px;
                width: 52px;
                flex-shrink: 0;
                cursor: pointer;
                border: 2px solid transparent;
                border-radius: 9999px;
                background-color: #334155;
                transition: background-color 0.2s ease-in-out;
            }
            .switch.checked {
                background-color: #e11d48;
            }
            .switch-thumb {
                pointer-events: none;
                display: inline-block;
                height: 24px;
                width: 24px;
                border-radius: 50%;
                background-color: white;
                box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                transition: transform 0.2s ease-in-out;
                transform: translateX(0);
            }
            .switch.checked .switch-thumb {
                transform: translateX(24px);
            }
        `}</style>
  </button>
);

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: 'dark',
    language: 'id',
    notifications: false,
    videoQuality: 'auto',
    soundEnabled: true,
    autoplay: false
  });

  useEffect(() => {
    setSettings({
      theme: localStorage.getItem('theme') || 'dark',
      language: localStorage.getItem('language') || 'id',
      notifications: localStorage.getItem('notifications') === 'true',
      videoQuality: localStorage.getItem('videoQuality') || 'auto',
      soundEnabled: localStorage.getItem('soundEnabled') !== 'false',
      autoplay: localStorage.getItem('autoplay') === 'true'
    });
  }, []);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    localStorage.setItem(key, value);

    if (key === 'theme') {
      document.documentElement.setAttribute('data-theme', value);
    }
  };

  const handleClearCache = () => {
    if (confirm('Bersihkan cache dan reset semua pengaturan?')) {
      // Preserve Supabase auth tokens (keys generally start with sb-)
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (!key.startsWith('sb-')) {
          localStorage.removeItem(key);
        }
      });
      window.location.reload();
    }
  };

  const SettingsSection = ({ title, children }) => (
    <div className="settings-section">
      <h3 className="section-title">{title}</h3>
      <div className="section-content">
        {children}
      </div>
      <style jsx>{`
                .settings-section {
                    margin-bottom: 2rem;
                }
                .section-title {
                    color: #94a3b8;
                    font-size: 0.875rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 1rem;
                    padding-left: 1rem;
                }
                .section-content {
                    background: #1a1d23;
                    border-radius: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    overflow: hidden;
                }
            `}</style>
    </div>
  );

  const SettingsItem = ({ icon: Icon, label, sublabel, action, isLast }) => (
    <div className={`settings-item ${isLast ? 'last' : ''}`}>
      <div className="item-icon-wrapper">
        <Icon size={20} className="item-icon" />
      </div>
      <div className="item-info">
        <span className="item-label">{label}</span>
        {sublabel && <span className="item-sublabel">{sublabel}</span>}
      </div>
      <div className="item-action">
        {action}
      </div>
      <style jsx>{`
                .settings-item {
                    display: flex;
                    align-items: center;
                    padding: 1.25rem 1.5rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    background: transparent;
                    transition: background 0.2s;
                }
                .settings-item:hover {
                    background: rgba(255, 255, 255, 0.02);
                }
                .settings-item.last {
                    border-bottom: none;
                }
                .item-icon-wrapper {
                    width: 40px;
                    height: 40px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 1rem;
                }
                .item-icon {
                    color: #fff;
                }
                .item-info {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }
                .item-label {
                    color: #fff;
                    font-weight: 500;
                    font-size: 1rem;
                }
                .item-sublabel {
                    color: #94a3b8;
                    font-size: 0.825rem;
                    margin-top: 2px;
                }
                .item-action {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #94a3b8;
                }
            `}</style>
    </div>
  );

  return (
    <div className="settings-container">
      <h1 className="page-title">Settings</h1>

      <SettingsSection title="Preferensi Pemutar">
        <SettingsItem
          icon={PlayCircle}
          label="Putar Otomatis"
          sublabel="Putar video otomatis saat dibuka"
          action={
            <Switch
              checked={settings.autoplay}
              onChange={() => updateSetting('autoplay', (!settings.autoplay).toString())}
            />
          }
        />
        <SettingsItem
          icon={Volume2}
          label="Suara Otomatis"
          sublabel="Mulai video dengan suara"
          action={
            <Switch
              checked={settings.soundEnabled}
              onChange={() => updateSetting('soundEnabled', (!settings.soundEnabled).toString())}
            />
          }
        />
        <SettingsItem
          icon={Monitor}
          label="Kualitas Video Default"
          sublabel={settings.videoQuality === 'auto' ? 'Otomatis' : settings.videoQuality === 'high' ? 'Tinggi' : settings.videoQuality === 'medium' ? 'Sedang' : 'Rendah'}
          isLast={true}
          action={
            <select
              value={settings.videoQuality}
              onChange={(e) => updateSetting('videoQuality', e.target.value)}
              className="select-input"
            >
              <option value="auto">Otomatis</option>
              <option value="high">Tinggi</option>
              <option value="medium">Sedang</option>
              <option value="low">Rendah</option>
            </select>
          }
        />
      </SettingsSection>

      <SettingsSection title="Umum">
        <SettingsItem
          icon={Globe}
          label="Bahasa"
          sublabel={settings.language === 'id' ? 'Bahasa Indonesia' : 'English'}
          action={<div className="badge">ID</div>}
        />
        <SettingsItem
          icon={Bell}
          label="Notifikasi"
          sublabel="Terima info update channel"
          isLast={true}
          action={
            <Switch
              checked={settings.notifications}
              onChange={() => updateSetting('notifications', (!settings.notifications).toString())}
            />
          }
        />
      </SettingsSection>

      <SettingsSection title="Sistem">
        <SettingsItem
          icon={Trash2}
          label="Bersihkan Cache"
          sublabel="Hapus data sementara aplikasi"
          isLast={true}
          action={
            <button className="text-btn danger" onClick={handleClearCache}>
              Bersihkan
            </button>
          }
        />
      </SettingsSection>

      <div className="app-info">
        <div className="info-content">
          <p>StreamID v1.2.0</p>
          <p className="developer">Developed by Andi Agung</p>
        </div>
      </div>

      <style jsx>{`
                .settings-container {
                    padding: 2rem 0;
                    max-width: 600px;
                    margin: 0 auto;
                }
                .page-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: 2rem;
                    font-weight: 800;
                    margin-bottom: 2rem;
                    padding-left: 1rem;
                    color: #fff;
                }
                .select-input {
                    background: transparent;
                    border: none;
                    color: #e11d48;
                    font-weight: 600;
                    cursor: pointer;
                    text-align: right;
                    outline: none;
                }
                .badge {
                    background: rgba(225, 29, 72, 0.1);
                    color: #e11d48;
                    padding: 0.25rem 0.5rem;
                    border-radius: 6px;
                    font-weight: 700;
                    font-size: 0.8rem;
                }
                .text-btn {
                    background: none;
                    border: none;
                    font-weight: 600;
                    cursor: pointer;
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    transition: all 0.2s;
                }
                .text-btn.danger {
                    color: #ef4444;
                    background: rgba(239, 68, 68, 0.1);
                }
                .text-btn.danger:hover {
                    background: rgba(239, 68, 68, 0.2);
                }
                .app-info {
                    text-align: center;
                    padding: 2rem;
                    color: #64748b;
                }
                .info-content {
                    display: inline-flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                }
                .developer {
                    font-size: 0.875rem;
                    opacity: 0.7;
                }
                
                @media (max-width: 640px) {
                    .settings-container {
                        padding: 1rem;
                    }
                    .page-title {
                        font-size: 1.75rem;
                    }
                }
            `}</style>
    </div>
  );
};

export default Settings;