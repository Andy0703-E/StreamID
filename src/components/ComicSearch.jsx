import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { komikService } from '../services/komik';
import ComicCard from './ComicCard';
import './ComicSearch.css';

const ComicSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.length >= 3) {
                setLoading(true);
                setShowResults(true);
                const data = await komikService.search(query);
                setResults(data || []);
                setLoading(false);
            } else {
                setResults([]);
                if (query.length === 0) setShowResults(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    return (
        <div className="comic-search" ref={searchRef}>
            <div className={`comic-search__field ${query ? 'active' : ''}`}>
                <Search className="search-icon" size={20} />
                <input
                    type="text"
                    placeholder="Cari komik (manga, manhwa, manhua)..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.length >= 3 && setShowResults(true)}
                />
                {query && (
                    <button className="clear-btn" onClick={() => { setQuery(''); setShowResults(false); }}>
                        <X size={18} />
                    </button>
                )}
            </div>

            {showResults && (
                <div className="comic-search__results">
                    {loading ? (
                        <div className="loading-state">
                            <Loader2 className="animate-spin" size={24} />
                            <span>Mencari komik...</span>
                        </div>
                    ) : results.length > 0 ? (
                        <div className="results-grid">
                            {results.slice(0, 6).map((comic) => (
                                <ComicCard key={comic.manga_id} comic={comic} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <p>Tidak ada komik yang sesuai dengan "{query}"</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ComicSearch;
