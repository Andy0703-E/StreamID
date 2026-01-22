import React from 'react';
import { Play, Star } from 'lucide-react';
import './DramaCard.css';

const DramaCard = ({ drama }) => {
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
            <div className="drama-card__poster">
                <img src={poster} alt={title} loading="lazy" />
                <div className="drama-card__overlay">
                    <div className="drama-card__play">
                        <Play fill="white" size={24} />
                    </div>
                </div>
                <div className="drama-card__badges">
                    {episode && <div className="drama-card__badge drama-card__badge--episode">{episode}</div>}
                    {rating > 0 && (
                        <div className="drama-card__badge drama-card__badge--rating">
                            <Star size={10} fill="#fbbf24" color="#fbbf24" />
                            <span>{rating}</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="drama-card__info">
                <h3 className="drama-card__title">{title}</h3>
                <div className="drama-card__extra">Drama Box • HD</div>
            </div>
        </div>
    );
};

export default DramaCard;

