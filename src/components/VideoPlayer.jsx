import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';


export default function VideoPlayer({ url, onEnded }) {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [autoplaySetting, setAutoplaySetting] = useState(true);
  const [mutedSetting, setMutedSetting] = useState(false);
  const [useProxy, setUseProxy] = useState(false);
  const hlsRef = useRef(null);

  // Reset proxy state when URL changes
  useEffect(() => {
    setUseProxy(false);
  }, [url]);

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

        // AUTO-PROXY logic for specific blocked domains
        const PROXY_DOMAINS = [
          'biznetvideo.net',
          'biznet',
          '202.80.222.20',
          'dens.tv',
          'detik.com' // Trans TV/7
        ];

        let finalUrl = url;
        // Logic: Use proxy if forced (fallback) OR if domain matches list
        if (useProxy || PROXY_DOMAINS.some(domain => url.includes(domain))) {
          // Avoid double proxying
          if (!url.includes('/api/proxy')) {
            finalUrl = `/api/proxy?url=${encodeURIComponent(url)}`;
            if (useProxy) console.log('Retrying with Proxy fallback...');
          }
        }

        // Get settings
        const shouldAutoplay = localStorage.getItem('autoplay') !== 'false'; // Default to true
        const isSoundEnabled = localStorage.getItem('soundEnabled') !== 'false';

        setAutoplaySetting(shouldAutoplay);
        setMutedSetting(!isSoundEnabled);

        if (videoRef.current) {
          videoRef.current.muted = !isSoundEnabled;
        }

        // Clean up previous instance
        if (hlsRef.current) {
          hlsRef.current.destroy();
          hlsRef.current = null;
        }

        const isMp4 = url.toLowerCase().includes('.mp4');

        if (isMp4) {
          video.src = finalUrl;
          video.addEventListener('loadedmetadata', () => {
            setIsLoading(false);
            if (shouldAutoplay) {
              video.play().catch(err => {
                console.log('Autoplay blocked, trying muted...');
                video.muted = true;
                video.play().catch(() => { });
              });
            }
          });
          video.addEventListener('error', () => {
            if (!useProxy) {
              console.log('MP4 Error, trying proxy...');
              setUseProxy(true);
              return;
            }
            setError('Gagal memutar video MP4.');
            setIsLoading(false);
          });
          return;
        }

        if (Hls.isSupported()) {
          const hls = new Hls({
            debug: false,
            enableWorker: true,
            lowLatencyMode: false, // Start up slightly slower but much more stable
            backBufferLength: 90,
            // ABR Settings (Auto Quality)
            startLevel: -1, // Start with auto-detected quality
            maxBufferLength: 60, // Allow buffering up to 60s (vs default 30s)
            maxMaxBufferLength: 600,
            abrBandwidthFactor: 0.9, // Be conservative with bandwidth (0.9 default is 0.95)
            // Timeouts for poor network
            manifestLoadingTimeOut: 20000,
            fragLoadingTimeOut: 20000,
            levelLoadingTimeOut: 20000,
          });

          hlsRef.current = hls;

          hls.on(Hls.Events.MEDIA_ATTACHED, () => {
            hls.loadSource(finalUrl);
          });

          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            setIsLoading(false);
            if (shouldAutoplay) {
              video.play().catch(err => {
                console.log('Autoplay blocked, trying muted:', err);
                video.muted = true;
                video.play().catch(() => { });
              });
            }
          });

          hls.on(Hls.Events.ERROR, (event, data) => {
            if (data.fatal) {
              if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
                console.log('Network error:', data);
                // Smart Fallback: If not using proxy yet, try enabling it
                if (!useProxy) {
                  console.warn('Network error detected. Attempting Auto-Proxy fallback...');
                  hls.destroy();
                  setUseProxy(true);
                  return;
                }

                setIsLoading(false);
                setError('Masalah jaringan/CORS. Gagal memuat bahkan dengan proxy.');
              } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
                hls.recoverMediaError();
              } else {
                hls.destroy();
                setIsLoading(false);
                setError('Gagal memuat siaran (Fatal Error).');
              }
            }
          });

          hls.attachMedia(video);
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          // Native HLS support (Safari)
          video.src = finalUrl;
          video.addEventListener('loadedmetadata', () => {
            setIsLoading(false);
            if (shouldAutoplay) {
              video.play().catch(() => {
                video.muted = true;
                video.play().catch(() => { });
              });
            }
          });
          video.addEventListener('error', () => {
            if (!useProxy) {
              setUseProxy(true);
              return;
            }
            setError('Gagal memutar (Safari Native).');
            setIsLoading(false);
          });
        }
      } catch (err) {
        setError('Terjadi kesalahan sistem.');
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
  }, [url, useProxy]);

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
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
        autoPlay={autoplaySetting}
        muted={mutedSetting}
        onEnded={onEnded}
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

    </div>
  );
}
