import React from 'react';
import { Play, Star, Tv } from 'lucide-react';
import './AnimeCard.css';

const AnimeCard = ({ anime }) => {
    const title = anime.title || anime.name || 'Unknown Anime';
    const poster = anime.poster || anime.image || anime.thumbnail || 'https://via.placeholder.com/300x450?text=No+Image';
    const episode = anime.episode || anime.episodes || anime.latest_episode || '';
    const rating = anime.rating || anime.score || 0;
    const type = anime.type || 'TV';
    const id = anime.slug || anime.id || '';

    const handleClick = () => {
        if (id) {
            window.location.href = `/anime/${id}`;
        }
    };

    return (
        <div className="anime-card" onClick={handleClick}>
            <div className="anime-card__poster">
                <img src={poster} alt={title} loading="lazy" />
                <div className="anime-card__overlay">
                    <div className="anime-card__play">
                        <Play fill="white" size={24} />
                    </div>
                </div>
                <div className="anime-card__badges">
                    <div className="anime-card__badge anime-card__badge--type">
                        <Tv size={10} />
                        <span>{type}</span>
                    </div>
                    {rating > 0 && (
                        <div className="anime-card__badge anime-card__badge--rating">
                            <Star size={10} fill="#fbbf24" color="#fbbf24" />
                            <span>{rating}</span>
                        </div>
                    )}
                </div>
                {episode && <div className="anime-card__episode">{episode}</div>}
            </div>
            <div className="anime-card__info">
                <h3 className="anime-card__title">{title}</h3>
                <div className="anime-card__extra">Otakudesu • Sub Indo</div>
            </div>
        </div>
    );
};

export default AnimeCard;

