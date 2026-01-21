import React, { useState } from 'react';
import AnimeCard from './AnimeCard.jsx';
import { animeService } from '../services/anime.js';
import { Loader2 } from 'lucide-react';

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
        <section className="anime-section">
            <div className="section-header">
                <h2 className="section-title">{title}</h2>
            </div>

            <div className="anime-grid">
                {items.map((anime, idx) => (
                    <AnimeCard key={`${anime.id || anime.slug || idx}-${page}`} anime={anime} />
                ))}
            </div>

            {hasMore && (
                <div className="load-more-container">
                    <button
                        className="load-more-btn"
                        onClick={loadMore}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                <span>Memuat...</span>
                            </>
                        ) : (
                            'Lihat Lebih Banyak'
                        )}
                    </button>
                </div>
            )}

            <style jsx>{`
                .anime-section {
                    margin-bottom: 3.5rem;
                }
                .section-header {
                    margin-bottom: 2rem;
                }
                .section-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: white;
                }
                .anime-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1.5rem;
                }
                
                @media (min-width: 768px) {
                    .anime-grid {
                        grid-template-columns: repeat(3, 1fr);
                        gap: 2rem;
                    }
                }

                @media (min-width: 1024px) {
                    .anime-grid {
                        grid-template-columns: repeat(4, 1fr);
                        gap: 2.5rem;
                    }
                }

                .load-more-container {
                    display: flex;
                    justify-content: center;
                    margin-top: 4rem;
                }
                .load-more-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    background: rgba(99, 102, 241, 0.1);
                    color: #a5b4fc;
                    border: 1px solid rgba(99, 102, 241, 0.3);
                    padding: 1rem 3rem;
                    border-radius: 100px;
                    font-weight: 700;
                    font-family: 'Outfit', sans-serif;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .load-more-btn:hover:not(:disabled) {
                    background: #6366f1;
                    color: white;
                    border-color: #6366f1;
                    transform: translateY(-4px);
                    box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);
                }
                .load-more-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @media (max-width: 640px) {
                   .section-title {
                        font-size: 1.5rem;
                    }
                   .anime-grid {
                       gap: 1rem;
                   }
                }
            `}</style>
        </section>
    );
};

export default AnimeGrid;
