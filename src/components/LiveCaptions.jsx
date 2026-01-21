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
            "Selamat menyaksikan siaran langsung kami.",
            "Informasi terkini sedang kami sajikan untuk Anda.",
            "Stay tuned untuk update selanjutnya.",
            "StreamID menyediakan siaran TV terbaik di Indonesia.",
            "Kualitas gambar HD sedang dioptimalkan.",
            "Terima kasih telah menonton StreamID."
        ];

        const showMockCaptions = () => {
            let idx = 0;
            interval = setInterval(() => {
                const text = mockCaptions[idx % mockCaptions.length];
                setCaption(text);
                setIsVisible(true);
                idx++;

                // Hide after 3 seconds
                setTimeout(() => {
                    setIsVisible(false);
                }, 3000);
            }, 5000);
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
            width: '80%',
            display: 'flex',
            justifyContent: 'center',
            pointerEvents: 'none',
            transition: 'opacity 0.5s ease',
            opacity: isVisible ? 1 : 0
        }}>
            <div style={{
                background: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                padding: '10px 24px',
                borderRadius: '12px',
                fontSize: '1.25rem',
                fontWeight: 600,
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                maxWidth: '100%',
                lineHeight: 1.4,
                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}>
                {caption}
            </div>
        </div>
    );
};

export default LiveCaptions;
