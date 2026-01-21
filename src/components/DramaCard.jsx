import React from 'react';
import { Play, Star } from 'lucide-react';

const DramaCard = ({ drama }) => {
    // Handle different API response structures if necessary
    const title = drama.title || drama.name || 'Unknown Drama';
    const poster = drama.poster || drama.image || 'https://via.placeholder.com/300x450?text=No+Image';
    const episode = drama.episode || drama.latest_episode || '';
    const rating = drama.rating || 0;
    const id = drama.id || drama.slug || '';

    const handleClick = () => {
        if (id) {
            window.location.href = `/drama/${id}`;
        }
    };

    return (
        <div className="drama-card" onClick={handleClick}>
            <div className="poster-wrapper">
                <img src={poster} alt={title} loading="lazy" />
                <div className="overlay">
                    <div className="play-icon-wrapper">
                        <Play fill="white" size={32} />
                    </div>
                </div>
                <div className="card-badges">
                    {episode && <div className="badge episode">{episode}</div>}
                    {rating > 0 && (
                        <div className="badge rating">
                            <Star size={10} fill="#fbbf24" color="#fbbf24" />
                            <span>{rating}</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="drama-info">
                <h3 className="drama-title">{title}</h3>
                <div className="drama-extra-info">Drama Box • HD</div>
            </div>

            <style jsx>{`
                .drama-card {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    cursor: pointer;
                    position: relative;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .poster-wrapper {
                    position: relative;
                    aspect-ratio: 2/3;
                    border-radius: 16px;
                    overflow: hidden;
                    background: #111;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    transition: all 0.4s ease;
                }

                .poster-wrapper img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(15, 17, 21, 0.8) 0%, transparent 60%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: all 0.3s ease;
                }

                .play-icon-wrapper {
                    width: 56px;
                    height: 56px;
                    background: #e11d48;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transform: scale(0.8);
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    box-shadow: 0 0 20px rgba(225, 29, 72, 0.6);
                }

                .drama-card:hover {
                    transform: translateY(-8px);
                }

                .drama-card:hover .poster-wrapper {
                    border-color: rgba(225, 29, 72, 0.5);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 15px rgba(225, 29, 72, 0.2);
                }

                .drama-card:hover .poster-wrapper img {
                    transform: scale(1.1);
                }

                .drama-card:hover .overlay {
                    opacity: 1;
                }

                .drama-card:hover .play-icon-wrapper {
                    transform: scale(1);
                }

                .card-badges {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    left: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    pointer-events: none;
                }

                .badge {
                    background: rgba(15, 17, 21, 0.85);
                    backdrop-filter: blur(8px);
                    color: white;
                    padding: 4px 10px;
                    border-radius: 8px;
                    font-size: 0.7rem;
                    font-weight: 800;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .badge.episode {
                    background: #e11d48;
                    border: none;
                }

                .drama-info {
                    padding: 0 0.5rem;
                }

                .drama-title {
                    color: white;
                    font-family: 'Outfit', sans-serif;
                    font-size: 1rem;
                    font-weight: 700;
                    line-height: 1.4;
                    margin-bottom: 0.25rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    transition: color 0.3s ease;
                }

                .drama-card:hover .drama-title {
                    color: #fb7185;
                }

                .drama-extra-info {
                    font-size: 0.75rem;
                    color: #64748b;
                    font-weight: 500;
                }
            `}</style>
        </div>
    );
};

export default DramaCard;
