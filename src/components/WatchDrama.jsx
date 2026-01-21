import React, { useState, useEffect } from 'react';
import VideoPlayer from './VideoPlayer.jsx';
import { Play, List, ChevronRight, Star } from 'lucide-react';

const WatchDrama = ({ drama, episodes: initialEpisodes }) => {
    const [currentEpisode, setCurrentEpisode] = useState(initialEpisodes?.[0] || null);
    const [episodes, setEpisodes] = useState(initialEpisodes || []);

    const handleEpisodeSelect = (episode) => {
        setCurrentEpisode(episode);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!drama) return <div className="error">Drama not found</div>;

    return (
        <div className="watch-drama-layout">
            <div className="main-content">
                <div className="player-container">
                    <VideoPlayer url={currentEpisode?.url || ''} />
                </div>

                <div className="episode-section">
                    <div className="section-header">
                        <h2>Daftar Episode</h2>
                        <span className="ep-count">{episodes.length} Episode</span>
                    </div>

                    <div className="episode-scroll-container">
                        {episodes.length > 0 ? (
                            episodes.map((ep, idx) => (
                                <button
                                    key={ep.id || idx}
                                    className={`episode-card ${currentEpisode?.id === ep.id ? 'active' : ''}`}
                                    onClick={() => handleEpisodeSelect(ep)}
                                >
                                    <div className="ep-thumbnail">
                                        {/* Use coverWap/poster if specific episode img is generic/missing */}
                                        <img src={ep.poster || drama.poster} alt={`Ep ${idx + 1}`} loading="lazy" />
                                        <div className="play-overlay">
                                            <Play size={24} fill="white" />
                                        </div>
                                    </div>
                                    <div className="ep-details">
                                        <span className="ep-number">Episode {idx + 1}</span>
                                        {ep.title && <span className="ep-title">{ep.title}</span>}
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className="no-episodes">Tidak ada episode ditemukan.</div>
                        )}
                    </div>
                </div>

                <div className="drama-info-section">
                    <h1 className="drama-title">{drama.title || drama.name}</h1>

                    <div className="drama-meta-badges">
                        {drama.rating && (
                            <div className="Badge rating">
                                <Star size={14} fill="currentColor" />
                                <span>{drama.rating}</span>
                            </div>
                        )}
                        <div className="Badge">{drama.year || '2024'}</div>
                        <div className="Badge">{episodes.length} Eps</div>
                    </div>

                    <p className="drama-desc">
                        {drama.description || drama.synopsis || "Saksikan keseruan drama ini hanya di StreamID."}
                    </p>

                    <div className="genres">
                        {drama.genres?.map(g => <span key={g} className="genre-tag">{g}</span>)}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .watch-drama-layout {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 1rem;
                    color: white;
                }

                .player-container {
                    aspect-ratio: 16/9;
                    background: #000;
                    border-radius: 16px;
                    overflow: hidden;
                    margin-bottom: 2rem;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                }

                .episode-section {
                    margin-bottom: 3rem;
                }

                .section-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 1rem;
                    padding: 0 0.5rem;
                }

                .section-header h2 {
                    font-size: 1.25rem;
                    font-weight: 700;
                    font-family: 'Outfit', sans-serif;
                }

                .ep-count {
                    color: #94a3b8;
                    font-size: 0.9rem;
                }

                /* Scrollable Episode List */
                .episode-scroll-container {
                    display: flex;
                    gap: 1rem;
                    overflow-x: auto;
                    padding: 0.5rem;
                    scroll-behavior: smooth;
                    -webkit-overflow-scrolling: touch;
                    scrollbar-width: none; /* Firefox */
                }

                .episode-scroll-container::-webkit-scrollbar {
                    display: none; /* Chrome/Safari */
                }

                .episode-card {
                    flex: 0 0 160px; /* Fixed width for swipeable cards */
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    text-align: left;
                    padding: 0;
                    transition: transform 0.2s;
                }

                .episode-card:hover {
                    transform: translateY(-4px);
                }

                .ep-thumbnail {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 16/9;
                    border-radius: 12px;
                    overflow: hidden;
                    margin-bottom: 0.75rem;
                    border: 2px solid transparent;
                }

                .episode-card.active .ep-thumbnail {
                    border-color: #e11d48;
                }

                .ep-thumbnail img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .play-overlay {
                    position: absolute;
                    inset: 0;
                    background: rgba(0,0,0,0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.2s;
                }

                .episode-card:hover .play-overlay, 
                .episode-card.active .play-overlay {
                    opacity: 1;
                }

                .ep-number {
                    display: block;
                    font-weight: 700;
                    font-size: 0.95rem;
                    color: white;
                    margin-bottom: 0.2rem;
                }

                .active .ep-number {
                    color: #fb7185;
                }

                .ep-title {
                    font-size: 0.8rem;
                    color: #94a3b8;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .drama-info-section {
                    padding: 0 0.5rem;
                }

                .drama-title {
                    font-size: 2rem;
                    font-weight: 800;
                    margin-bottom: 1rem;
                    font-family: 'Outfit', sans-serif;
                }

                .drama-meta-badges {
                    display: flex;
                    gap: 0.75rem;
                    margin-bottom: 1.5rem;
                }

                .Badge {
                    background: rgba(255,255,255,0.1);
                    padding: 0.3rem 0.8rem;
                    border-radius: 6px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                }

                .Badge.rating {
                    color: #fbbf24;
                    background: rgba(251, 191, 36, 0.1);
                }

                .drama-desc {
                    line-height: 1.7;
                    color: #cbd5e1;
                    margin-bottom: 1.5rem;
                    max-width: 800px;
                }

                .genres {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                }

                .genre-tag {
                    color: #fb7185;
                    font-size: 0.9rem;
                    font-weight: 500;
                }

                @media (min-width: 768px) {
                    .episode-card { flex-basis: 200px; }
                }
            `}</style>
        </div>
    );
};

export default WatchDrama;
