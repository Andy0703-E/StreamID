import React, { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

const Disclaimer = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hasAccepted = sessionStorage.getItem('disclaimerAccepted');
        if (!hasAccepted) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        sessionStorage.setItem('disclaimerAccepted', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="disclaimer-overlay">
            <div className="disclaimer-modal">
                <button className="close-btn" onClick={handleAccept}>
                    <X size={24} />
                </button>
                <div className="disclaimer-header">
                    <AlertTriangle className="warning-icon" size={32} />
                    <h2>Pernyataan Penyangkalan (Disclaimer)</h2>
                </div>

                <div className="disclaimer-body">
                    <p>
                        Selamat datang di <strong>StreamID</strong>. Sebelum melanjutkan, harap baca dan pahami pernyataan berikut:
                    </p>
                    <ul>
                        <li>Aplikasi ini hanya untuk tujuan hiburan dan pendidikan saja.</li>
                        <li>Kami tidak menyimpan file video di server kami. Semua konten berasal dari sumber pihak ketiga yang tersedia secara publik di internet.</li>
                        <li>Pengguna bertanggung jawab penuh atas penggunaan layanan ini dan kepatuhan terhadap hukum hak cipta di wilayah masing-masing.</li>
                        <li>Kami tidak memiliki kontrol atas ketersediaan atau kualitas konten dari pihak ketiga.</li>
                    </ul>
                    <p className="note">Dengan menutup pesan ini, Anda menyatakan telah membaca dan menyetujui persyaratan di atas.</p>
                </div>

                <button className="accept-btn" onClick={handleAccept}>
                    Saya Mengerti & Lanjutkan
                </button>
            </div>

            <style jsx>{`
                .disclaimer-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.85);
                    backdrop-filter: blur(10px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                    padding: 1.5rem;
                }

                .disclaimer-modal {
                    background: #1a1d23;
                    border: 1px solid rgba(225, 29, 72, 0.3);
                    border-radius: 24px;
                    padding: 2.5rem;
                    max-width: 600px;
                    width: 100%;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                    animation: modalIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                }

                @keyframes modalIn {
                    from { opacity: 0; transform: translateY(20px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }

                .disclaimer-header {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }

                .warning-icon {
                    color: #e11d48;
                }

                .disclaimer-header h2 {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: white;
                }

                .disclaimer-body {
                    color: #94a3b8;
                    line-height: 1.6;
                    margin-bottom: 2.5rem;
                }

                .disclaimer-body p {
                    margin-bottom: 1rem;
                }

                .disclaimer-body ul {
                    padding-left: 1.5rem;
                    margin-bottom: 1.5rem;
                }

                .disclaimer-body li {
                    margin-bottom: 0.75rem;
                }

                .note {
                    font-size: 0.875rem;
                    font-style: italic;
                    color: #64748b;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    padding-top: 1rem;
                }

                .accept-btn {
                    width: 100%;
                    background: linear-gradient(to right, #e11d48, #fb7185);
                    color: white;
                    border: none;
                    padding: 1rem;
                    border-radius: 12px;
                    font-weight: 700;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .accept-btn:hover {
                    transform: translateY(-2px);
                    filter: brightness(1.1);
                    box-shadow: 0 10px 20px rgba(225, 29, 72, 0.3);
                }
                .close-btn {
                    position: absolute;
                    top: 1.5rem;
                    right: 1.5rem;
                    background: none;
                    border: none;
                    color: #94a3b8;
                    cursor: pointer;
                    padding: 0.5rem;
                    border-radius: 50%;
                    transition: all 0.2s ease;
                }

                .close-btn:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: white;
                }

                    .disclaimer-modal {
                        padding: 1.25rem;
                        width: 85%;
                        margin: auto;
                        max-height: 80vh;
                        overflow-y: auto;
                    }

                    .disclaimer-header {
                        margin-bottom: 0.75rem;
                        gap: 0.75rem;
                    }

                    .disclaimer-header h2 {
                        font-size: 1.1rem;
                        line-height: 1.3;
                    }

                    .disclaimer-body {
                        font-size: 0.85rem;
                        margin-bottom: 1.25rem;
                        line-height: 1.5;
                    }

                    .disclaimer-body ul {
                        margin-bottom: 1rem;
                        padding-left: 1.2rem;
                    }

                    .disclaimer-body li {
                        margin-bottom: 0.5rem;
                    }

                    .warning-icon {
                        width: 24px;
                        height: 24px;
                    }
                    
                    .close-btn {
                        top: 0.75rem;
                        right: 0.75rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default Disclaimer;
