import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import LiveCaptions from './LiveCaptions.jsx';

export default function VideoPlayer({ url }) {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const hlsRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const setupPlayer = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!url || url.trim() === '') {
          setError('Tautan siaran tidak tersedia.');
          setIsLoading(false);
          return;
        }

        // Clean up previous instance
        if (hlsRef.current) {
          hlsRef.current.destroy();
          hlsRef.current = null;
        }

        const isMp4 = url.toLowerCase().includes('.mp4');

        if (isMp4) {
          video.src = url;
          video.addEventListener('loadedmetadata', () => {
            setIsLoading(false);
            video.play().catch(() => { });
          });
          video.addEventListener('error', () => {
            setError('Gagal memutar video MP4. Pastikan tautan masih aktif.');
            setIsLoading(false);
          });
          return;
        }

        if (Hls.isSupported()) {
          const hls = new Hls({
            debug: false,
            enableWorker: true,
            lowLatencyMode: true,
            backBufferLength: 60,
          });

          hlsRef.current = hls;

          hls.on(Hls.Events.MEDIA_ATTACHED, () => {
            hls.loadSource(url);
          });

          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            setIsLoading(false);
            video.play().catch(err => {
              console.log('Autoplay blocked:', err);
            });
          });

          hls.on(Hls.Events.ERROR, (event, data) => {
            console.error('HLS Error:', data.type, data.details, data.url);
            if (data.fatal) {
              setIsLoading(false);

              if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
                console.log('Network error details:', data);
                setError('Masalah jaringan/CORS. Server streaming mungkin memblokir akses dari domain ini.');
                // Don't retry automatically for CORS issues
              } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
                setError('Kesalahan media. Mencoba memulihkan...');
                hls.recoverMediaError();
              } else {
                setError('Gagal memuat siaran. Server mungkin memerlukan izin khusus.');
                hls.destroy();
              }
            }
          });

          hls.attachMedia(video);
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          // Native HLS support (Safari)
          video.src = url;
          video.addEventListener('loadedmetadata', () => {
            setIsLoading(false);
            video.play().catch(() => { });
          });
          video.addEventListener('error', () => {
            setError('Browser tidak dapat memutar format ini secara native.');
            setIsLoading(false);
          });
        } else {
          setError('Browser Anda tidak mendukung teknologi streaming HLS.');
          setIsLoading(false);
        }
      } catch (err) {
        setError('Terjadi kesalahan sistem saat memutar video.');
        setIsLoading(false);
      }
    };

    setupPlayer();

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [url]);

  return (
    <div className="player-wrapper" style={{ width: '100%', height: '100%', position: 'relative', background: '#000', overflow: 'hidden' }}>
      {/* Custom UI Overlay */}
      <div className="overlay" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: '20px',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)',
        zIndex: 5,
        display: isLoading ? 'none' : 'block'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%', boxShadow: '0 0 10px #22c55e' }}></div>
          <span style={{ color: '#fff', fontSize: '12px', fontWeight: 800, letterSpacing: '1px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>LIVE STREAMING</span>
        </div>
      </div>

      {error && (
        <div className="error-display" style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(6, 9, 15, 0.95)',
          color: '#f8fafc',
          padding: '2rem',
          textAlign: 'center',
          zIndex: 10,
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
          <h3 style={{ marginBottom: '0.5rem', color: '#38bdf8' }}>Oops! Gangguan Siaran</h3>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', maxWidth: '350px', lineHeight: '1.6', marginBottom: '1rem' }}>{error}</p>
          <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1.5rem', textAlign: 'left', maxWidth: '320px' }}>
            <strong>Solusi:</strong>
            <ul style={{ marginTop: '0.5rem', paddingLeft: '1.2rem' }}>
              <li>Server streaming mungkin memblokir akses dari domain ini</li>
              <li>Coba gunakan VPN atau browser berbeda</li>
              <li>Pilih channel Indonesia lainnya</li>
            </ul>
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              background: '#38bdf8',
              border: 'none',
              borderRadius: '12px',
              color: '#06090f',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Coba Segarkan
          </button>
        </div>
      )}

      {isLoading && !error && (
        <div className="loading-state" style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#06090f',
          zIndex: 8
        }}>
          <div className="spinner" style={{
            width: '50px',
            height: '50px',
            border: '3px solid rgba(56, 189, 248, 0.1)',
            borderTop: '3px solid #38bdf8',
            borderRadius: '50%',
            animation: 'spin 0.8s cubic-bezier(0.5, 0, 0.5, 1) infinite'
          }}></div>
          <p style={{ marginTop: '1.5rem', color: '#94a3b8', fontSize: '0.9rem', letterSpacing: '1px' }}>MENYAMBUNGKAN...</p>
          <style>{`
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          `}</style>
        </div>
      )}

      <video
        ref={videoRef}
        controls
        playsInline
        muted={false}
        autoPlay={false}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          background: '#000',
          display: 'block'
        }}
        onLoadedData={() => console.log('Video loaded successfully')}
        onError={(e) => console.error('Video element error:', e)}
      />

      {/* AI Subtitles Overlay */}
      {!isLoading && !error && <LiveCaptions videoRef={videoRef} />}
    </div>
  );
}
