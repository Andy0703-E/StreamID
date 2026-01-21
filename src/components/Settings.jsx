import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout.astro';
import {
  Settings as SettingsIcon,
  Monitor,
  Globe,
  Bell,
  Smartphone,
  RotateCcw,
  Info,
  Sun,
  Moon,
  Volume2,
  VolumeX
} from 'lucide-react';

const Settings = () => {
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('id');
  const [notifications, setNotifications] = useState(false);
  const [videoQuality, setVideoQuality] = useState('auto');
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    // Load settings from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedLanguage = localStorage.getItem('language') || 'id';
    const savedNotifications = localStorage.getItem('notifications') === 'true';
    const savedQuality = localStorage.getItem('videoQuality') || 'auto';
    const savedSound = localStorage.getItem('soundEnabled') !== 'false';

    setTheme(savedTheme);
    setLanguage(savedLanguage);
    setNotifications(savedNotifications);
    setVideoQuality(savedQuality);
    setSoundEnabled(savedSound);

    // Apply theme
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleThemeChange = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleLanguageChange = () => {
    const newLanguage = language === 'id' ? 'en' : 'id';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    // In a real app, this would trigger a language change
    alert(`Bahasa diubah ke ${newLanguage === 'id' ? 'Bahasa Indonesia' : 'English'}`);
  };

  const handleNotificationsToggle = () => {
    const newState = !notifications;
    setNotifications(newState);
    localStorage.setItem('notifications', newState.toString());
    if (newState) {
      alert('Notifikasi diaktifkan');
    } else {
      alert('Notifikasi dinonaktifkan');
    }
  };

  const handleQualityChange = () => {
    const qualities = ['auto', 'low', 'medium', 'high'];
    const currentIndex = qualities.indexOf(videoQuality);
    const nextIndex = (currentIndex + 1) % qualities.length;
    const newQuality = qualities[nextIndex];

    setVideoQuality(newQuality);
    localStorage.setItem('videoQuality', newQuality);
    alert(`Kualitas video diubah ke ${newQuality}`);
  };

  const handleSoundToggle = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    localStorage.setItem('soundEnabled', newState.toString());
    alert(newState ? 'Suara diaktifkan' : 'Suara dinonaktifkan');
  };

  const handleClearCache = () => {
    if (confirm('Apakah Anda yakin ingin menghapus cache aplikasi?')) {
      localStorage.clear();
      alert('Cache berhasil dihapus. Halaman akan dimuat ulang.');
      window.location.reload();
    }
  };

  const showInfo = () => {
    alert(`StreamID v0.0.1\n\nAplikasi streaming TV Indonesia\n\nDeveloper: Andi Agung\n\nDikembangkan dengan Astro & React`);
  };

  return (
    <>
      <div className="settings-container">
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Pengaturan</h1>
            <p className="hero-subtitle">Sesuaikan pengalaman streaming Anda</p>
          </div>
          <div className="hero-image">
            <SettingsIcon size={48} className="hero-icon" />
          </div>
        </div>

        <div className="settings-grid">
          <div className="setting-card clickable" onClick={handleQualityChange}>
            <Monitor className="setting-icon" size={32} />
            <h3>Kualitas Video</h3>
            <p>{videoQuality === 'auto' ? 'Otomatis' : videoQuality.charAt(0).toUpperCase() + videoQuality.slice(1)}</p>
            <small>Klik untuk mengubah kualitas streaming</small>
          </div>

          <div className="setting-card clickable" onClick={handleLanguageChange}>
            <Globe className="setting-icon" size={32} />
            <h3>Bahasa</h3>
            <p>{language === 'id' ? 'Bahasa Indonesia' : 'English'}</p>
            <small>Klik untuk mengubah bahasa</small>
          </div>

          <div className="setting-card clickable" onClick={handleNotificationsToggle}>
            <Bell className="setting-icon" size={32} />
            <h3>Notifikasi</h3>
            <p>{notifications ? 'Aktif' : 'Mati'}</p>
            <small>Klik untuk {notifications ? 'menonaktifkan' : 'mengaktifkan'} notifikasi</small>
          </div>

          <div className="setting-card clickable" onClick={handleThemeChange}>
            {theme === 'dark' ? <Moon className="setting-icon" size={32} /> : <Sun className="setting-icon" size={32} />}
            <h3>Mode Tampilan</h3>
            <p>{theme === 'dark' ? 'Mode Gelap' : 'Mode Terang'}</p>
            <small>Klik untuk mengubah tema</small>
          </div>

          <div className="setting-card clickable" onClick={handleSoundToggle}>
            {soundEnabled ? <Volume2 className="setting-icon" size={32} /> : <VolumeX className="setting-icon" size={32} />}
            <h3>Audio</h3>
            <p>{soundEnabled ? 'Aktif' : 'Mati'}</p>
            <small>Klik untuk {soundEnabled ? 'mematikan' : 'mengaktifkan'} suara</small>
          </div>

          <div className="setting-card clickable" onClick={handleClearCache}>
            <RotateCcw className="setting-icon" size={32} />
            <h3>Cache</h3>
            <p>Hapus Cache</p>
            <small>Klik untuk menghapus data cache</small>
          </div>

          <div className="setting-card clickable" onClick={showInfo}>
            <Info className="setting-icon" size={32} />
            <h3>Tentang</h3>
            <p>StreamID v0.0.1</p>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.25rem' }}>Developer: Andi Agung</p>
            <small>Klik untuk informasi aplikasi</small>
          </div>
        </div>

        <div className="disclaimer">
          <h3>Disclaimer</h3>
          <p>Aplikasi ini hanya untuk tujuan hiburan dan pendidikan. Kami tidak bertanggung jawab atas konten yang ditayangkan atau masalah teknis yang mungkin terjadi. Pastikan Anda mematuhi hukum dan regulasi yang berlaku di negara Anda.</p>
          <p>Semua channel streaming berasal dari sumber publik dan kami tidak memiliki kontrol atas kualitas atau ketersediaan konten.</p>
        </div>
      </div>

      <style jsx>{`
        .settings-container {
          padding-top: 1rem;
        }

        .hero-section {
          background: linear-gradient(135deg, #1a1d23 0%, #2a2d33 100%);
          border-radius: 24px;
          padding: 3rem;
          margin-bottom: 3rem;
          display: flex;
          align-items: center;
          gap: 3rem;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .hero-content {
          flex: 1;
        }

        .hero-title {
          font-family: 'Outfit', sans-serif;
          font-size: 3rem;
          font-weight: 800;
          color: white;
          margin-bottom: 1rem;
        }

        .hero-subtitle {
          font-size: 1.125rem;
          color: #94a3b8;
          margin-bottom: 1.5rem;
          max-width: 500px;
        }

        .hero-image {
          width: 200px;
          height: 200px;
          background: rgba(56, 189, 248, 0.1);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-icon {
          color: #38bdf8;
        }

        .settings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .setting-card {
          background: #1a1d23;
          border-radius: 18px;
          padding: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
        }

        .setting-card.clickable {
          cursor: pointer;
        }

        .setting-card.clickable:hover {
          transform: translateY(-4px);
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .setting-icon {
          color: #38bdf8;
          margin-bottom: 1rem;
        }

        .setting-card h3 {
          color: white;
          font-family: 'Outfit', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .setting-card p {
          color: #e11d48;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .setting-card small {
          color: #94a3b8;
          font-size: 0.875rem;
        }

        .disclaimer {
          background: #1a1d23;
          border-radius: 18px;
          padding: 2rem;
          border: 1px solid rgba(225, 29, 72, 0.2);
          margin-top: 2rem;
        }

        .disclaimer h3 {
          color: #e11d48;
          font-family: 'Outfit', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .disclaimer p {
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .disclaimer p:last-child {
          margin-bottom: 0;
        }

        @media (max-width: 768px) {
          .hero-section {
            flex-direction: column;
            text-align: center;
            padding: 2rem;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-image {
            width: 150px;
            height: 150px;
          }

          .settings-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
};

export default Settings;