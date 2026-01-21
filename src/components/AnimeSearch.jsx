import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2, Play, Star } from 'lucide-react';
import { animeService } from '../services/anime.js';
import AnimeCard from './AnimeCard.jsx';

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
        <div className="anime-search-container">
            <div className="search-bar-wrapper">
                <div className={`search-input-group ${isSearching ? 'active' : ''}`}>
                    <Search className="search-icon" size={20} />
                    <input
                        type="text"
                        placeholder="Cari anime favoritmu... (Naruto, One Piece, dsb)"
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    {query && (
                        <button className="clear-btn" onClick={clearSearch}>
                            <X size={18} />
                        </button>
                    )}
                </div>
            </div>

            {isSearching && (
                <div className="search-results-overlay">
                    <div className="results-header">
                        <h3>{loading ? 'Mencari...' : `Hasil pencarian untuk "${query}"`}</h3>
                        {!loading && <span className="results-count">{results.length} ditemukan</span>}
                    </div>

                    {loading ? (
                        <div className="search-loading">
                            <Loader2 className="animate-spin" size={32} />
                            <p>Sedang menelusuri library Anime...</p>
                        </div>
                    ) : results.length > 0 ? (
                        <div className="search-grid">
                            {results.map((anime) => (
                                <AnimeCard key={anime.id || anime.slug} anime={anime} />
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">
                            <Search size={48} />
                            <p>Maaf, anime tidak ditemukan. Coba gunakan kata kunci lain.</p>
                        </div>
                    )}
                </div>
            )}

            <style jsx>{`
                .anime-search-container {
                    margin-bottom: 4rem;
                    position: relative;
                    z-index: 1000;
                    margin-top: 1rem;
                    padding: 0.5rem;
                }

                .search-bar-wrapper {
                    max-width: 900px;
                    margin: 0 auto;
                    background: rgba(15, 17, 21, 0.8);
                    border-radius: 24px;
                    padding: 0.5rem;
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                }

                .search-input-group {
                    position: relative;
                    display: flex;
                    align-items: center;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    padding: 0 1.5rem;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .search-input-group.active,
                .search-input-group:focus-within {
                    background: rgba(255, 255, 255, 0.06);
                    border-color: #6366f1;
                    box-shadow: 0 0 30px rgba(99, 102, 241, 0.3);
                    transform: translateY(-2px);
                }

                .search-icon {
                    color: #64748b;
                }

                input {
                    flex: 1;
                    background: transparent;
                    border: none;
                    color: white;
                    padding: 1.25rem 1rem;
                    font-size: 1.125rem;
                    font-family: 'Outfit', sans-serif;
                    outline: none;
                }

                input::placeholder {
                    color: #64748b;
                }

                .clear-btn {
                    background: none;
                    border: none;
                    color: #64748b;
                    cursor: pointer;
                    padding: 0.5rem;
                    display: flex;
                    align-items: center;
                    transition: color 0.2s ease;
                }

                .clear-btn:hover {
                    color: white;
                }

                .search-results-overlay {
                    background: #0f1115;
                    border-radius: 24px;
                    padding: 2.5rem;
                    margin-top: 1.5rem;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    animation: fadeIn 0.3s ease-out;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .results-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }

                .results-header h3 {
                    color: white;
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.25rem;
                    font-weight: 700;
                }

                .results-count {
                    color: #6366f1;
                    font-weight: 700;
                    font-size: 0.875rem;
                    background: rgba(99, 102, 241, 0.1);
                    padding: 0.4rem 1rem;
                    border-radius: 100px;
                }

                .search-loading {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 4rem;
                    gap: 1.5rem;
                    color: #64748b;
                }

                .animate-spin {
                    animation: spin 1s linear infinite;
                    color: #6366f1;
                }

                .search-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
                    gap: 2rem;
                }

                .no-results {
                    text-align: center;
                    padding: 4rem;
                    color: #475569;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @media (max-width: 768px) {
                    .search-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 1rem;
                    }
                    .search-results-overlay {
                        padding: 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default AnimeSearch;
