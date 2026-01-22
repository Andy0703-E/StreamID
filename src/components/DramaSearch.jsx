import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { dramaService } from '../services/drama.js';
import DramaCard from './DramaCard.jsx';
import './DramaSearch.css';

const DramaSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const searchTimeout = useRef(null);

    const handleSearch = async (value) => {
        setQuery(value);
        if (value.length < 3) {
            setResults([]);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);
        setLoading(true);

        if (searchTimeout.current) clearTimeout(searchTimeout.current);

        searchTimeout.current = setTimeout(async () => {
            try {
                const data = await dramaService.search(value);
                const searchResults = Array.isArray(data) ? data : (data?.data || []);
                setResults(searchResults);
            } catch (err) {
                console.error('Search error:', err);
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 500);
    };

    const clearSearch = () => {
        setQuery('');
        setResults([]);
        setIsSearching(false);
    };

    return (
        <div className="drama-search">
            <div className="drama-search__bar-wrapper">
                <div className={`drama-search__input-group ${isSearching ? 'active' : ''}`}>
                    <Search className="drama-search__icon" size={20} />
                    <input
                        type="text"
                        placeholder="Cari drama favoritmu..."
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    {query && (
                        <button className="drama-search__clear" onClick={clearSearch}>
                            <X size={18} />
                        </button>
                    )}
                </div>
            </div>

            {isSearching && (
                <div className="drama-search__results">
                    <div className="drama-search__results-header">
                        <h3>{loading ? 'Mencari...' : `Hasil untuk "${query}"`}</h3>
                        {!loading && <span className="drama-search__count">{results.length} ditemukan</span>}
                    </div>

                    {loading ? (
                        <div className="drama-search__loading">
                            <Loader2 className="drama-search__spinner" size={32} />
                            <p>Sedang menelusuri...</p>
                        </div>
                    ) : results.length > 0 ? (
                        <div className="drama-search__grid">
                            {results.map((drama) => (
                                <DramaCard key={drama.id} drama={drama} />
                            ))}
                        </div>
                    ) : (
                        <div className="drama-search__empty">
                            <Search size={40} />
                            <p>Drama tidak ditemukan</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DramaSearch;

