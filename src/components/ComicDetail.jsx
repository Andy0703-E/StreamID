import React from 'react';
import { Book, ChevronRight, Star, Clock, Globe } from 'lucide-react';
import './ComicDetail.css';

const ComicDetail = ({ comic, chapters = [] }) => {
    if (!comic) return null;

    // Use chapters from props and sort ascendingly (1, 2, 3...)
    const sortedChapters = [...(chapters && chapters.length > 0 ? chapters : (comic.chapters || []))];
    sortedChapters.sort((a, b) => parseFloat(a.chapter_number) - parseFloat(b.chapter_number));

    const chapterList = sortedChapters;

    return (
        <div className="comic-detail">
            <div className="comic-detail__header">
                <div className="comic-detail__poster">
                    <img src={comic.cover_image_url || '/logo.png'} alt={comic.title} />
                    <div className="comic-detail__type">
                        {comic.taxonomy?.Format?.[0]?.name || 'Manga'}
                    </div>
                </div>

                <div className="comic-detail__main">
                    <h1 className="comic-detail__title">{comic.title}</h1>
                    <p className="comic-detail__alt">{comic.alternative_title}</p>

                    <div className="comic-detail__meta">
                        <div className="meta-pill rating">
                            <Star size={16} fill="#fbbf24" color="#fbbf24" />
                            <span>{comic.user_rate || '0.0'}</span>
                        </div>
                        <div className="meta-pill">
                            <Clock size={16} />
                            <span>{new Date(comic.updated_at).toLocaleDateString('id-ID')}</span>
                        </div>
                        <div className="meta-pill">
                            <Globe size={16} />
                            <span>{comic.country_id || 'Unknown'}</span>
                        </div>
                    </div>

                    <div className="comic-detail__genres">
                        {comic.taxonomy?.Genre?.map((genre, idx) => (
                            <span key={idx} className="genre-tag">{genre.name}</span>
                        ))}
                    </div>

                    <div className="comic-detail__description">
                        <h3>Sinopsis</h3>
                        <p>{comic.description || 'Tidak ada deskripsi tersedia.'}</p>
                    </div>
                </div>
            </div>

            <div className="comic-detail__chapters">
                <div className="chapters-header">
                    <h3>Daftar Chapter</h3>
                    <span className="chapter-count">{chapters.length} Chapter</span>
                </div>

                <div className="chapters-list">
                    {chapters.length > 0 ? (
                        chapters.map((chapter) => (
                            <a
                                key={chapter.chapter_id}
                                href={`/komik/read/${chapter.chapter_id}`}
                                className="chapter-item"
                            >
                                <div className="chapter-info">
                                    <span className="chapter-name">Chapter {chapter.chapter_number}</span>
                                    <span className="chapter-date">
                                        {new Date(chapter.created_at).toLocaleDateString('id-ID')}
                                    </span>
                                </div>
                                <ChevronRight size={18} />
                            </a>
                        ))
                    ) : (
                        <div className="no-chapters">Tidak ada chapter tersedia.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ComicDetail;
