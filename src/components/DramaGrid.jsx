import React, { useState } from 'react';
import DramaCard from './DramaCard.jsx';
import { dramaService } from '../services/drama.js';
import { Loader2 } from 'lucide-react';
import './DramaGrid.css';

const DramaGrid = ({ initialData, title, type }) => {
    const [items, setItems] = useState(initialData || []);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadMore = async () => {
        if (loading) return;
        setLoading(true);
        const nextPage = page + 1;

        try {
            let newData;
            if (type === 'latest') {
                newData = await dramaService.getLatest(nextPage);
            } else if (type === 'trending') {
                newData = await dramaService.getTrending(nextPage);
            }

            const newArray = Array.isArray(newData) ? newData : (newData?.data || []);

            if (newArray.length === 0) {
                setHasMore(false);
            } else {
                setItems(prev => [...prev, ...newArray]);
                setPage(nextPage);
            }
        } catch (error) {
            console.error('Error loading more drama:', error);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="drama-grid-section">
            <div className="drama-grid-section__header">
                <h2 className="drama-grid-section__title">{title}</h2>
            </div>

            <div className="drama-grid-section__grid">
                {items.map((drama, idx) => (
                    <DramaCard key={`${drama.id || idx}-${page}`} drama={drama} />
                ))}
            </div>

            {hasMore && (
                <div className="drama-grid-section__load-more">
                    <button
                        className="drama-grid-section__btn"
                        onClick={loadMore}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 size={18} className="drama-grid-section__spinner" />
                                <span>Memuat...</span>
                            </>
                        ) : (
                            'Lihat Lebih Banyak'
                        )}
                    </button>
                </div>
            )}
        </section>
    );
};

export default DramaGrid;

