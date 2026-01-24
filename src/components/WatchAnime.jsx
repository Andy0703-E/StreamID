import React, { useState, useEffect } from 'react';
import VideoPlayer from './VideoPlayer.jsx';
import { Play, ChevronRight, Tv, Star, Calendar, Clock, Server } from 'lucide-react';
import { animeService } from '../services/anime.js';

const WatchAnime = ({ anime, initialEpisodes = [] }) => {
    const [episodes, setEpisodes] = useState(initialEpisodes);
    const [currentEpisode, setCurrentEpisode] = useState(null);
    const [streamUrl, setStreamUrl] = useState('');
    const [qualities, setQualities] = useState([]);
    const [selectedQuality, setSelectedQuality] = useState(null);
    const [loadingStream, setLoadingStream] = useState(false);

    // Client-side episode loading if needed
    useEffect(() => {
        if (anime?.episodeList && anime.episodeList.length > 0) {
            setEpisodes(anime.episodeList);
        } else if (anime?.episode_list && anime.episode_list.length > 0) {
            setEpisodes(anime.episode_list);
        }
    }, [anime]);

    // Auto-select first episode
    useEffect(() => {
        if (episodes.length > 0 && !currentEpisode) {
            handleEpisodeSelect(episodes[0]);
        }
    }, [episodes]);

    const handleEpisodeSelect = async (episode) => {
        setCurrentEpisode(episode);
        setLoadingStream(true);
        setStreamUrl('');
        setQualities([]);
        setSelectedQuality(null);
        setSelectedServer(null);

        try {
            const episodeId = episode.episodeId || episode.slug || episode.id;
            const episodeData = await animeService.getEpisode(episodeId);

            if (episodeData) {
                // Handle server.qualities structure
                if (episodeData.server?.qualities) {
                    const availableQualities = episodeData.server.qualities;
                    setQualities(availableQualities);

                    // Auto-select highest quality and first server
                    if (availableQualities.length > 0) {
                        const bestQuality = availableQualities[availableQualities.length - 1];
                        setSelectedQuality(bestQuality);
                        if (bestQuality.serverList?.length > 0) {
                            handleServerSelect(bestQuality.serverList[0], bestQuality);
                        }
                    }
                }

                // Fallback to defaultStreamingUrl if no server selected yet
                if (!streamUrl && episodeData.defaultStreamingUrl) {
                    setStreamUrl(episodeData.defaultStreamingUrl);
                }
            }
        } catch (error) {
            console.error('Error fetching episode stream:', error);
        } finally {
            setLoadingStream(false);
        }
    };

    const handleServerSelect = async (server, quality) => {
        setLoadingStream(true);
        setSelectedServer(server);
        setSelectedQuality(quality);

        try {
            // Check if server object already has the url (FlickReels style)
            if (server.url) {
                setStreamUrl(server.url);
            } else {
                const url = await animeService.getServer(server.serverId);
                if (url) {
                    setStreamUrl(url);
                }
            }
        } catch (error) {
            console.error('Error fetching server URL:', error);
        } finally {
            setLoadingStream(false);
        }
    };

    const handleNextEpisode = () => {
        if (!currentEpisode || episodes.length === 0) return;

        const currentIndex = episodes.findIndex(ep =>
            (ep.episodeId || ep.slug || ep.id) === (currentEpisode.episodeId || currentEpisode.slug || currentEpisode.id)
        );

        if (currentIndex !== -1 && currentIndex < episodes.length - 1) {
            const nextEpisode = episodes[currentIndex + 1];
            handleEpisodeSelect(nextEpisode);
        }
    };

    if (!anime) {
        return (
            <div className="watch-container">
                <div className="error-state">
                    <h2>Anime tidak ditemukan</h2>
                    <a href="/anime" className="back-link">Kembali ke Anime</a>
                </div>
            </div>
        );
    }

    return (
        <div className="watch-container">
            <div className="watch-layout">
                {/* Main Video Section */}
                <div className="video-section">
                    <div className="video-wrapper">
                        {loadingStream ? (
                            <div className="loading-state">
                                <div className="spinner"></div>
                                <p>Memuat video...</p>
                            </div>
                        ) : streamUrl ? (
                            (() => {
                                const isDirectLink = streamUrl.toLowerCase().includes('.m3u8') ||
                                    streamUrl.toLowerCase().includes('.mp4') ||
                                    streamUrl.includes('googleusercontent.com') ||
                                    streamUrl.includes('fvs.io');

                                return isDirectLink ? (
                                    <VideoPlayer url={streamUrl} onEnded={handleNextEpisode} />
                                ) : (
                                    <iframe
                                        src={streamUrl}
                                        allowFullScreen
                                        className="video-iframe"
                                        title="Video Player"
                                        allow="autoplay; encrypted-media"
                                    />
                                );
                            })()
                        ) : (
                            <div className="placeholder-state">
                                <Play size={64} color="#6366f1" />
                                <p>Menyiapkan video...</p>
                            </div>
                        )}
                    </div>

                    {/* Quality & Server Selector */}
                    {qualities.length > 0 && (
                        <div className="stream-options">
                            <div className="quality-selector">
                                {qualities.map((q) => (
                                    <button
                                        key={q.title}
                                        className={`quality-btn ${selectedQuality?.title === q.title ? 'active' : ''}`}
                                        onClick={() => setSelectedQuality(q)}
                                    >
                                        {q.title}
                                    </button>
                                ))}
                            </div>
                            {selectedQuality && (
                                <div className="server-selector">
                                    {selectedQuality.serverList.map((s) => (
                                        <button
                                            key={s.serverId}
                                            className={`server-btn ${selectedServer?.serverId === s.serverId ? 'active' : ''}`}
                                            onClick={() => handleServerSelect(s, selectedQuality)}
                                        >
                                            {s.title}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Anime Info */}
                    <div className="anime-info-section">
                        <h1 className="anime-title">{anime.title || anime.name}</h1>
                        {currentEpisode && (
                            <p className="current-episode">
                                Sedang memutar: <strong>{currentEpisode.title || currentEpisode.episode}</strong>
                            </p>
                        )}

                        <div className="anime-meta">
                            {anime.type && (
                                <span className="meta-item">
                                    <Tv size={14} />
                                    {anime.type}
                                </span>
                            )}
                            {anime.status && (
                                <span className="meta-item status">
                                    <Clock size={14} />
                                    {anime.status}
                                </span>
                            )}
                            {(anime.rating || anime.score) && (
                                <span className="meta-item rating">
                                    <Star size={14} fill="#fbbf24" color="#fbbf24" />
                                    {anime.rating || anime.score}
                                </span>
                            )}
                        </div>

                        {anime.synopsis && (
                            <p className="anime-synopsis">{anime.synopsis}</p>
                        )}

                        {anime.genres && anime.genres.length > 0 && (
                            <div className="genres-list">
                                {anime.genres.map((genre, idx) => (
                                    <span key={idx} className="genre-tag">
                                        {genre.name || genre}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Episode Sidebar */}
                <div className="episode-sidebar">
                    <div className="sidebar-header">
                        <h3>Daftar Episode</h3>
                        <span className="episode-count">{episodes.length} Episode</span>
                    </div>

                    <div className="episode-list">
                        {episodes.length === 0 ? (
                            <div className="no-episodes">
                                <p>Tidak ada episode ditemukan</p>
                            </div>
                        ) : (
                            episodes.map((episode, idx) => (
                                <button
                                    key={episode.slug || episode.id || idx}
                                    className={`episode-item ${currentEpisode?.slug === episode.slug ? 'active' : ''}`}
                                    onClick={() => handleEpisodeSelect(episode)}
                                >
                                    <div className="episode-number">{idx + 1}</div>
                                    <div className="episode-info">
                                        <span className="episode-title">
                                            {episode.title || episode.episode || `Episode ${idx + 1}`}
                                        </span>
                                        {episode.date && (
                                            <span className="episode-date">{episode.date}</span>
                                        )}
                                    </div>
                                    <ChevronRight size={16} className="episode-arrow" />
                                </button>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .watch-container {
                    min-height: 100vh;
                    background: #0f1115;
                    padding: 2rem;
                }

                .watch-layout {
                    display: grid;
                    grid-template-columns: 1fr 350px;
                    gap: 2rem;
                    max-width: 1600px;
                    margin: 0 auto;
                }

                .video-section {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }

                .video-wrapper {
                    aspect-ratio: 16/9;
                    background: #000;
                    border-radius: 20px;
                    overflow: hidden;
                    position: relative;
                }

                .video-iframe {
                    border: none;
                }

                .video-preview {
                    width: 100%;
                    height: 100%;
                    position: relative;
                }

                .preview-poster {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    filter: brightness(0.6);
                }

                .preview-overlay {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: radial-gradient(circle, transparent 0%, rgba(0,0,0,0.4) 100%);
                }

                .big-play-btn {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1.5rem;
                    background: #6366f1;
                    color: white;
                    border: none;
                    padding: 2.5rem 4rem;
                    border-radius: 30px;
                    font-weight: 800;
                    font-size: 1.5rem;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                    box-shadow: 0 20px 50px rgba(99, 102, 241, 0.4);
                    font-family: 'Outfit', sans-serif;
                }

                .big-play-btn:hover {
                    transform: scale(1.05);
                    background: #4f46e5;
                    box-shadow: 0 25px 60px rgba(99, 102, 241, 0.6);
                }

                .loading-state,
                .placeholder-state {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    color: #64748b;
                }

                .spinner {
                    width: 48px;
                    height: 48px;
                    border: 3px solid rgba(99, 102, 241, 0.2);
                    border-top-color: #6366f1;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                .anime-info-section {
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 20px;
                    padding: 2rem;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }

                .anime-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: 2rem;
                    font-weight: 800;
                    color: white;
                    margin-bottom: 0.5rem;
                }

                .current-episode {
                    color: #a5b4fc;
                    font-size: 1rem;
                    margin-bottom: 1.5rem;
                }

                .anime-meta {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }

                .meta-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: rgba(255, 255, 255, 0.05);
                    padding: 0.5rem 1rem;
                    border-radius: 100px;
                    font-size: 0.875rem;
                    color: #94a3b8;
                }

                .meta-item.status {
                    background: rgba(99, 102, 241, 0.15);
                    color: #a5b4fc;
                }

                .meta-item.rating {
                    background: rgba(251, 191, 36, 0.15);
                    color: #fbbf24;
                }

                .anime-synopsis {
                    color: #94a3b8;
                    line-height: 1.7;
                    margin-bottom: 1.5rem;
                }

                .genres-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }

                .genre-tag {
                    background: rgba(99, 102, 241, 0.1);
                    color: #a5b4fc;
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    border: 1px solid rgba(99, 102, 241, 0.2);
                }

                .stream-options {
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 20px;
                    padding: 1.5rem;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .quality-selector {
                    display: flex;
                    gap: 0.75rem;
                    flex-wrap: wrap;
                }

                .quality-btn {
                    background: rgba(255, 255, 255, 0.05);
                    color: #94a3b8;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 0.5rem 1rem;
                    border-radius: 10px;
                    font-size: 0.875rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .quality-btn:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: white;
                }

                .quality-btn.active {
                    background: #6366f1;
                    color: white;
                    border-color: #6366f1;
                    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
                }

                .server-selector {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                    padding-top: 1rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                }

                .server-btn {
                    background: rgba(99, 102, 241, 0.05);
                    color: #a5b4fc;
                    border: 1px solid rgba(99, 102, 241, 0.3);
                    padding: 0.4rem 0.8rem;
                    border-radius: 8px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .server-btn:hover {
                    background: rgba(99, 102, 241, 0.1);
                }

                .server-btn.active {
                    background: rgba(99, 102, 241, 0.2);
                    border-color: #6366f1;
                    color: white;
                }

                /* Episode Sidebar */
                .episode-sidebar {
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    max-height: calc(100vh - 4rem);
                }

                .sidebar-header {
                    padding: 1.5rem;
                    background: rgba(99, 102, 241, 0.1);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .sidebar-header h3 {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: white;
                }

                .episode-count {
                    background: #6366f1;
                    color: white;
                    padding: 0.25rem 0.75rem;
                    border-radius: 100px;
                    font-size: 0.75rem;
                    font-weight: 700;
                }

                .episode-list {
                    flex: 1;
                    overflow-y: auto;
                    padding: 1rem;
                }

                .episode-item {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    background: transparent;
                    border: none;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    text-align: left;
                    margin-bottom: 0.5rem;
                }

                .episode-item:hover {
                    background: rgba(99, 102, 241, 0.1);
                }

                .episode-item.active {
                    background: #6366f1;
                }

                .episode-number {
                    width: 36px;
                    height: 36px;
                    background: rgba(99, 102, 241, 0.2);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    color: #a5b4fc;
                    font-size: 0.875rem;
                }

                .episode-item.active .episode-number {
                    background: rgba(255, 255, 255, 0.2);
                    color: white;
                }

                .episode-info {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }

                .episode-title {
                    color: white;
                    font-size: 0.875rem;
                    font-weight: 600;
                }

                .episode-date {
                    color: #64748b;
                    font-size: 0.75rem;
                }

                .episode-arrow {
                    color: #64748b;
                }

                .episode-item.active .episode-arrow {
                    color: white;
                }

                .no-episodes {
                    padding: 3rem 1rem;
                    text-align: center;
                    color: #64748b;
                }

                .error-state {
                    text-align: center;
                    padding: 4rem 2rem;
                    color: white;
                }

                .back-link {
                    color: #6366f1;
                    text-decoration: none;
                    margin-top: 1rem;
                    display: inline-block;
                }

                @media (max-width: 1024px) {
                    .watch-layout {
                        grid-template-columns: 1fr;
                    }

                    .episode-sidebar {
                        max-height: none;
                    }
                }

                @media (max-width: 768px) {
                    .watch-container {
                        padding: 1rem;
                    }

                    .anime-title {
                        font-size: 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default WatchAnime;
