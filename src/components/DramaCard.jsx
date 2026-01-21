import React from 'react';
import { Play, Star } from 'lucide-react';

const DramaCard = ({ drama }) => {
    // Handle different API response structures if necessary
    const title = drama.title || drama.name || 'Unknown Drama';
    const poster = drama.poster || drama.image || 'https://via.placeholder.com/300x450?text=No+Image';
    const episode = drama.episode || drama.latest_episode || '';
    const rating = drama.rating || 0;

    return (
        <div className="drama-card">
            <div className="poster-wrapper">
                <img src={poster} alt={title} loading="lazy" />
                <div className="overlay">
                    <button className="play-btn">
                        <Play fill="currentColor" size={24} />
                    </button>
                </div>
                {episode && <div className="episode-badge">{episode}</div>}
                {rating > 0 && (
                    <div className="rating-badge">
                        <Star size={12} fill="#fbbf24" color="#fbbf24" />
                        <span>{rating}</span>
                    </div>
                )}
            </div>
            <div className="drama-info">
                <h3 className="drama-title">{title}</h3>
            </div>

            <style jsx>{`
                .drama-card {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    cursor: pointer;
                    transition: transform 0.2s ease;
                }

                .drama-card:hover {
                    transform: translateY(-4px);
                }

                .poster-wrapper {
                    position: relative;
                    aspect-ratio: 2/3;
                    border-radius: 12px;
                    overflow: hidden;
                    background: #1a1d23;
                }

                .poster-wrapper img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.3s ease;
                }

                .drama-card:hover .poster-wrapper img {
                    transform: scale(1.05);
                }

                .overlay {
                    position: absolute;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.2s ease;
                }

                .drama-card:hover .overlay {
                    opacity: 1;
                }

                .play-btn {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    background: #e11d48;
                    border: none;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 12px rgba(225, 29, 72, 0.4);
                }

                .episode-badge {
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    background: rgba(0, 0, 0, 0.75);
                    color: white;
                    padding: 4px 8px;
                    border-radius: 6px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    backdrop-filter: blur(4px);
                }

                .rating-badge {
                    position: absolute;
                    bottom: 8px;
                    left: 8px;
                    background: rgba(0, 0, 0, 0.75);
                    color: white;
                    padding: 4px 8px;
                    border-radius: 6px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    backdrop-filter: blur(4px);
                }

                .drama-info {
                    padding: 0 0.25rem;
                }

                .drama-title {
                    color: white;
                    font-size: 0.9375rem;
                    font-weight: 600;
                    line-height: 1.4;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
};

export default DramaCard;
