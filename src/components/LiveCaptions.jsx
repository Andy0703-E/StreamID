import React, { useState, useEffect } from 'react';

const LiveCaptions = ({ videoRef }) => {
    const [caption, setCaption] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    // Mocking AI transcription for now
    // Real implementation would use MediaRecorder + API
    useEffect(() => {
        if (!videoRef.current) return;

        let interval;
        const mockCaptions = [
            "Selamat datang kembali di StreamID.",
            "Kami sedang menyiarkan konten terbaru untuk Anda.",
            "Nikmati pengalaman menonton dengan kualitas terbaik.",
            "Berita terkini akan segera hadir sejenak lagi.",
            "Saksikan terus program favorit Anda hanya di sini.",
            "AI Transcription sedang mengoptimalkan teks...",
            "Terima kasih telah setia menonton bersama kami.",
            "Koneksi stabil, kualitas HD diaktifkan.",
            "Jangan lupa untuk menyimpan channel ini di watchlist."
        ];

        const showMockCaptions = () => {
            let idx = 0;
            interval = setInterval(() => {
                const text = mockCaptions[Math.floor(Math.random() * mockCaptions.length)];
                setCaption(text);
                setIsVisible(true);

                // Hide after 3.5 seconds
                const hideTimeout = setTimeout(() => {
                    setIsVisible(false);
                }, 3500);

                return () => clearTimeout(hideTimeout);
            }, 6000);
        };

        showMockCaptions();

        return () => clearInterval(interval);
    }, []);

    if (!caption) return null;

    return (
        <div style={{
            position: 'absolute',
            bottom: '100px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            pointerEvents: 'none',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            opacity: isVisible ? 1 : 0,
            filter: isVisible ? 'blur(0)' : 'blur(4px)'
        }}>
            <div style={{
                background: 'rgba(225, 29, 72, 0.9)',
                color: 'white',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '0.65rem',
                fontWeight: 800,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                boxShadow: '0 4px 12px rgba(225, 29, 72, 0.3)'
            }}>
                AI LIVE
            </div>
            <div style={{
                background: 'rgba(15, 17, 21, 0.85)',
                backdropFilter: 'blur(12px)',
                color: '#fff',
                padding: '12px 28px',
                borderRadius: '16px',
                fontSize: '1.1rem',
                fontWeight: 600,
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                maxWidth: '100%',
                lineHeight: 1.5,
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                transform: isVisible ? 'translateY(0)' : 'translateY(10px)'
            }}>
                {caption}
            </div>
        </div>
    );
};

export default LiveCaptions;
