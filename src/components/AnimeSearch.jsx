import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { animeService } from '../services/anime.js';
import AnimeCard from './AnimeCard.jsx';
import './AnimeSearch.css';

const AnimeSearch = () => {
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
                const data = await animeService.search(value);
                setResults(data || []);
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
        <div className="anime-search">
            <div className="anime-search__bar-wrapper">
                <div className={`anime-search__input-group ${isSearching ? 'active' : ''}`}>
                    <Search className="anime-search__icon" size={20} />
                    <input
                        type="text"
                        placeholder="Cari anime favoritmu..."
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    {query && (
                        <button className="anime-search__clear" onClick={clearSearch}>
                            <X size={18} />
                        </button>
                    )}
                </div>
            </div>

            {isSearching && (
                <div className="anime-search__results">
                    <div className="anime-search__results-header">
                        <h3>{loading ? 'Mencari...' : `Hasil untuk "${query}"`}</h3>
                        {!loading && <span className="anime-search__count">{results.length} ditemukan</span>}
                    </div>

                    {loading ? (
                        <div className="anime-search__loading">
                            <Loader2 className="anime-search__spinner" size={32} />
                            <p>Sedang menelusuri...</p>
                        </div>
                    ) : results.length > 0 ? (
                        <div className="anime-search__grid">
                            {results.map((anime) => (
                                <AnimeCard key={anime.id || anime.slug} anime={anime} />
                            ))}
                        </div>
                    ) : (
                        <div className="anime-search__empty">
                            <Search size={40} />
                            <p>Anime tidak ditemukan</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AnimeSearch;

