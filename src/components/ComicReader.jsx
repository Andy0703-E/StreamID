import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Settings, Maximize2, Minimize2 } from 'lucide-react';
import { komikService } from '../services/komik';
import './ComicReader.css';

const ComicReader = ({ chapterId }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fullWidth, setFullWidth] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            try {
                const data = await komikService.getChapterImages(chapterId);
                setImages(data || []);
            } catch (err) {
                console.error("Failed to fetch chapter images:", err);
            } finally {
                setLoading(false);
            }
        };

        if (chapterId) {
            fetchImages();
        }
    }, [chapterId]);

    return (
        <div className="comic-reader">
            <div className="comic-reader__toolbar">
                <div className="toolbar-left">
                    <button onClick={() => window.history.back()} className="toolbar-btn">
                        <ChevronLeft size={20} />
                        <span>Kembali</span>
                    </button>
                </div>

                <div className="toolbar-center">
                    <span className="chapter-label">Chapter Reading Mode</span>
                </div>

                <div className="toolbar-right">
                    <button onClick={() => setFullWidth(!fullWidth)} className="toolbar-btn icon-only" title="Toggle Reading Mode">
                        {fullWidth ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                    </button>
                </div>
            </div>

            <div className={`comic-reader__content ${fullWidth ? 'full-width' : ''}`}>
                {loading ? (
                    <div className="reader-loading">
                        <div className="spinner"></div>
                        <p>Memuat lembaran komik...</p>
                    </div>
                ) : images.length > 0 ? (
                    <div className="image-stack">
                        {images.map((img, index) => (
                            <div key={index} className="image-wrapper">
                                <img
                                    src={img}
                                    alt={`Page ${index + 1}`}
                                    loading={index < 5 ? "eager" : "lazy"}
                                />
                                <div className="page-number">{index + 1} / {images.length}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="reader-error">
                        <p>Lembaran komik tidak dapat dimuat atau sedang dalam perbaikan.</p>
                        <button onClick={() => window.location.reload()}>Coba Lagi</button>
                    </div>
                )}
            </div>

            <div className="comic-reader__footer">
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="scroll-top">
                    Kembali ke Atas
                </button>
            </div>
        </div>
    );
};

export default ComicReader;
