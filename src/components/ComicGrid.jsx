import React, { useState, useEffect } from 'react';
import ComicCard from './ComicCard';
import './ComicGrid.css';
import { Loader2 } from 'lucide-react';

const ComicGrid = ({ initialData = [], title = "Katalog Komik", type = "latest" }) => {
    const [comics, setComics] = useState(initialData);
    const [loading, setLoading] = useState(false);

    return (
        <section className="comic-grid-section">
            <div className="comic-grid-header">
                <h2 className="comic-grid-title">{title}</h2>
            </div>

            <div className="comic-grid">
                {comics.map((comic, index) => (
                    <ComicCard key={comic.manga_id || index} comic={comic} />
                ))}
            </div>

            {loading && (
                <div className="comic-grid-loading">
                    <Loader2 className="animate-spin" size={32} />
                </div>
            )}

            {comics.length === 0 && !loading && (
                <div className="comic-grid-empty">
                    <p>Tidak ada komik yang ditemukan.</p>
                </div>
            )}
        </section>
    );
};

export default ComicGrid;
