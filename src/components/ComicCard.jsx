import React from 'react';
import './ComicCard.css';

const ComicCard = ({ comic }) => {
    if (!comic) return null;

    return (
        <a href={`/komik/detail/${comic.manga_id || comic.id}`} className="comic-card">
            <div className="comic-card__badge">
                {comic.country_id || 'Comics'}
            </div>
            <div className="comic-card__poster">
                <img
                    src={comic.cover_image_url || comic.cover_portrait_url || '/logo.png'}
                    alt={comic.title}
                    loading="lazy"
                />
                <div className="comic-card__overlay">
                    <div className="comic-card__rating">
                        <span>★ {comic.user_rate || '0'}</span>
                    </div>
                </div>
            </div>
            <div className="comic-card__info">
                <h3 className="comic-card__title">{comic.title}</h3>
                <div className="comic-card__meta">
                    <span className="comic-card__chapter">
                        Ch. {comic.latest_chapter_number || '?'}
                    </span>
                    <span className="comic-card__type">
                        {comic.taxonomy?.Format?.[0]?.name || 'Manga'}
                    </span>
                </div>
            </div>
        </a>
    );
};

export default ComicCard;
