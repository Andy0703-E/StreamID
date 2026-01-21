import React from 'react';
import { Play, Star } from 'lucide-react';

const VideoDramaCard = ({ drama }) => {
    const handleClick = () => {
        if (drama.id) {
            window.location.href = `/drama/${drama.id}`;
        }
    };

    return (
        <div className="video-drama-card" onClick={handleClick}>
            <div className="card-poster">
                <img src={drama.poster} alt={drama.title} loading="lazy" />
                <div className="card-overlay">
                    <div className="play-button">
                        <Play size={24} fill="white" />
                    </div>
                    <div className="card-info">
                        <h3 className="card-title">{drama.title}</h3>
                        <div className="card-footer">
                            {drama.rating && (
                                <div className="rating">
                                    <Star size={12} fill="#fbbf24" color="#fbbf24" />
                                    <span>{drama.rating}</span>
                                </div>
                            )}
                            <span className="views">{drama.playCount} views</span>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .video-drama-card {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 9/16;
                    border-radius: 16px;
                    overflow: hidden;
                    cursor: pointer;
                    transition: transform 0.3s ease;
                    background: #1a1d23;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }

                .video-drama-card:hover {
                    transform: translateY(-8px);
                    border-color: #e11d48;
                }

                .card-poster {
                    position: relative;
                    width: 100%;
                    height: 100%;
                }

                .card-poster img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .card-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%);
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    padding: 1.5rem;
                    opacity: 1;
                    transition: background 0.3s ease;
                }

                .play-button {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) scale(0.8);
                    background: rgba(225, 29, 72, 0.9);
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: all 0.3s ease;
                    box-shadow: 0 0 20px rgba(225, 29, 72, 0.4);
                }

                .video-drama-card:hover .play-button {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }

                .card-info {
                    z-index: 2;
                }

                .card-title {
                    color: white;
                    font-size: 1rem;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
                }

                .card-footer {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 0.75rem;
                    font-weight: 600;
                }

                .rating {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    color: #fbbf24;
                }
            `}</style>
        </div>
    );
};

export default VideoDramaCard;
