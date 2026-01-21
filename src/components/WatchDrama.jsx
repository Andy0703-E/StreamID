import React, { useState, useEffect } from 'react';
import VideoPlayer from './VideoPlayer.jsx';
import { Play, List, ChevronRight, Star } from 'lucide-react';

const WatchDrama = ({ drama, episodes: initialEpisodes }) => {
    const [currentEpisode, setCurrentEpisode] = useState(initialEpisodes?.[0] || null);
    const [episodes, setEpisodes] = useState(initialEpisodes || []);
    const [loadingEpisodes, setLoadingEpisodes] = useState(false);

    // Fallback: Fetch episodes client-side if missing
    useEffect(() => {
        if (drama?.id && episodes.length === 0) {
            setLoadingEpisodes(true);
            import('../services/drama').then(({ dramaService }) => {
                dramaService.getEpisodes(drama.id).then(fetched => {
                    if (fetched?.length > 0) {
                        setEpisodes(fetched);
                        setCurrentEpisode(fetched[0]);
                    }
                }).finally(() => setLoadingEpisodes(false));
            });
        }
    }, [drama?.id]);

    const handleEpisodeSelect = (episode) => {
        setCurrentEpisode(episode);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!drama) return <div className="error">Drama not found</div>;

    return (
        <div className="watch-drama-layout">
            <div className="player-main">
                <div className="player-section">
                    <VideoPlayer url={currentEpisode?.url || ''} />

                    <div className="drama-meta">
                        <div className="title-row">
                            <h1 className="drama-title">{drama.title || drama.name}</h1>
                            {currentEpisode && (
                                <span className="episode-label">Sedang Menonton: {currentEpisode.title || currentEpisode.name || `Episode ${currentEpisode.index || ''}`}</span>
                            )}
                        </div>

                        <div className="drama-info-pills">
                            {drama.rating && (
                                <div className="pill">
                                    <Star size={14} fill="#fbbf24" color="#fbbf24" />
                                    <span>{drama.rating}</span>
                                </div>
                            )}
                            {drama.year && <div className="pill">{drama.year}</div>}
                            {drama.genres && drama.genres.map(g => <div key={g} className="pill genre">{g}</div>)}
                        </div>

                        <p className="drama-synopsis">
                            {drama.description || drama.synopsis || "Saksikan keseruan drama ini hanya di StreamID. Nikmati kualitas streaming lancar dengan subtitle Indonesia."}
                        </p>
                    </div>
                </div>
            </div>

            <aside className="episode-sidebar">
                <div className="sidebar-header">
                    <List size={20} />
                    <h2>Daftar Episode</h2>
                    <span className="ep-count text-sm text-slate-400">({episodes.length})</span>
                </div>

                <div className="episode-list">
                    {episodes.length > 0 ? (
                        episodes.map((ep, idx) => (
                            <button
                                key={ep.id || idx}
                                className={`episode-item ${currentEpisode?.id === ep.id ? 'active' : ''}`}
                                onClick={() => handleEpisodeSelect(ep)}
                            >
                                <div className="ep-index">{(idx + 1).toString().padStart(2, '0')}</div>
                                <div className="ep-info">
                                    <span className="ep-name">{ep.title || ep.name || `Episode ${idx + 1}`}</span>
                                    <span className="ep-status">Tersedia dalam HD</span>
                                </div>
                                <Play size={14} className="play-icon" />
                            </button>
                        ))
                    ) : (
                        <div className="no-episodes">Tidak ada episode ditemukan.</div>
                    )}
                </div>
            </aside>

            <style jsx>{`
                .watch-drama-layout {
                    display: grid;
                    grid-template-columns: 1fr 380px;
                    gap: 2.5rem;
                    padding-top: 1rem;
                    max-width: 1600px;
                    margin: 0 auto;
                }

                .player-section {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }

                .drama-meta {
                    background: rgba(255, 255, 255, 0.03);
                    padding: 2.5rem;
                    border-radius: 24px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }

                .title-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 1.5rem;
                    gap: 2rem;
                }

                .drama-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: 2.25rem;
                    font-weight: 800;
                    color: white;
                }

                .episode-label {
                    color: #fb7185;
                    font-weight: 600;
                    font-size: 0.9375rem;
                    padding-bottom: 0.5rem;
                }

                .drama-info-pills {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.75rem;
                    margin-bottom: 2rem;
                }

                .pill {
                    background: rgba(255, 255, 255, 0.05);
                    color: #94a3b8;
                    padding: 0.4rem 1rem;
                    border-radius: 100px;
                    font-size: 0.8125rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .pill.genre {
                    background: rgba(225, 29, 72, 0.1);
                    color: #fb7185;
                }

                .drama-synopsis {
                    color: #94a3b8;
                    line-height: 1.8;
                    font-size: 1rem;
                }

                /* Sidebar Styles */
                .episode-sidebar {
                    background: #1a1d23;
                    border-radius: 24px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    display: flex;
                    flex-direction: column;
                    height: calc(100vh - 120px);
                    position: sticky;
                    top: 100px;
                    overflow: hidden;
                }

                .sidebar-header {
                    padding: 1.75rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    color: white;
                }

                .sidebar-header h2 {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.125rem;
                    font-weight: 700;
                }

                .episode-list {
                    flex: 1;
                    overflow-y: auto;
                    padding: 1rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }

                .episode-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    border-radius: 16px;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid transparent;
                    color: #64748b;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    text-align: left;
                }

                .episode-item:hover {
                    background: rgba(255, 255, 255, 0.05);
                    color: white;
                }

                .episode-item.active {
                    background: rgba(225, 29, 72, 0.1);
                    border-color: rgba(225, 29, 72, 0.3);
                    color: white;
                }

                .ep-index {
                    font-family: 'Outfit', sans-serif;
                    font-size: 0.8125rem;
                    font-weight: 800;
                    color: #334155;
                }

                .active .ep-index {
                    color: #fb7185;
                }

                .ep-info {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }

                .ep-name {
                    font-weight: 600;
                    font-size: 0.9375rem;
                }

                .ep-status {
                    font-size: 0.75rem;
                    color: #475569;
                }

                .play-icon {
                    opacity: 0;
                    transition: all 0.2s ease;
                }

                .episode-item:hover .play-icon, .episode-item.active .play-icon {
                    opacity: 1;
                    transform: scale(1.1);
                }

                @media (max-width: 1200px) {
                    .watch-drama-layout { grid-template-columns: 1fr 320px; }
                }

                @media (max-width: 1024px) {
                    .watch-drama-layout { grid-template-columns: 1fr; }
                    .episode-sidebar { position: static; height: 500px; }
                    .drama-title { font-size: 1.75rem; }
                }
            `}</style>
        </div>
    );
};

export default WatchDrama;
