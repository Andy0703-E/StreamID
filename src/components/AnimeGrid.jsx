import React, { useState } from 'react';
import AnimeCard from './AnimeCard.jsx';
import { animeService } from '../services/anime.js';
import { Loader2 } from 'lucide-react';
import './AnimeGrid.css';

const AnimeGrid = ({ initialData, title, type }) => {
    const [items, setItems] = useState(initialData || []);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadMore = async () => {
        if (loading) return;
        setLoading(true);
        const nextPage = page + 1;

        try {
            let newData;
            if (type === 'ongoing') {
                newData = await animeService.getOngoing(nextPage);
            } else if (type === 'completed') {
                newData = await animeService.getCompleted(nextPage);
            } else if (type === 'movie') {
                newData = await animeService.getMovies(nextPage);
            }

            const newArray = Array.isArray(newData) ? newData : (newData?.data || []);

            if (newArray.length === 0) {
                setHasMore(false);
            } else {
                setItems(prev => [...prev, ...newArray]);
                setPage(nextPage);
            }
        } catch (error) {
            console.error('Error loading more anime:', error);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="anime-grid-section">
            <div className="anime-grid-section__header">
                <h2 className="anime-grid-section__title">{title}</h2>
            </div>

            <div className="anime-grid-section__grid">
                {items.map((anime, idx) => (
                    <AnimeCard key={`${anime.id || anime.slug || idx}-${page}`} anime={anime} />
                ))}
            </div>

            {hasMore && (
                <div className="anime-grid-section__load-more">
                    <button
                        className="anime-grid-section__btn"
                        onClick={loadMore}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 size={18} className="anime-grid-section__spinner" />
                                <span>Memuat...</span>
                            </>
                        ) : (
                            'Lihat Lebih Banyak'
                        )}
                    </button>
                </div>
            )}
        </section>
    );
};

export default AnimeGrid;

