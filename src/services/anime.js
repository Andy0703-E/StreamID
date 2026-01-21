// Anime Service - Using FlickReels API
const API_BASE = 'https://api.sansekai.my.id/api';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// SSR-safe caching with timeout
const fetchWithCache = async (endpoint) => {
    const cacheKey = `anime_v2_${endpoint}`;

    // Browser-side caching only
    if (typeof window !== 'undefined') {
        try {
            const cached = localStorage.getItem(cacheKey);
            if (cached) {
                const { data, timestamp } = JSON.parse(cached);
                if (Date.now() - timestamp < CACHE_DURATION) {
                    return data;
                }
            }
        } catch (e) {
            console.warn('Cache read error:', e);
        }
    }

    // Create abort controller for timeout (8 seconds for SSR)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json',
            },
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            console.warn(`API returned ${response.status} for ${endpoint}`);
            return null;
        }

        const text = await response.text();

        try {
            const data = JSON.parse(text);

            // Cache in browser
            if (typeof window !== 'undefined') {
                try {
                    localStorage.setItem(cacheKey, JSON.stringify({
                        data,
                        timestamp: Date.now()
                    }));
                } catch (e) {
                    console.warn('Cache write error:', e);
                }
            }

            return data;
        } catch (parseError) {
            console.warn(`Failed to parse JSON for ${endpoint}:`, parseError.message);
            return null;
        }
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            console.warn(`Request timeout for ${endpoint}`);
        } else {
            console.warn(`Fetch error for ${endpoint}:`, error.message);
        }
        return null;
    }
};

// Map anime data to consistent format (FlickReels API structure)
const mapAnime = (anime) => {
    if (!anime) return null;
    return {
        id: anime.url || anime.series_id || anime.animeId || anime.id || '',
        slug: anime.url || anime.series_id || '',
        title: anime.judul || anime.title || anime.name || 'Unknown',
        poster: anime.cover || anime.poster || anime.image || 'https://via.placeholder.com/300x450?text=No+Image',
        episode: anime.lastch || anime.episode || '',
        rating: anime.rating || anime.score || 0,
        status: anime.status || '',
        type: anime.type || 'TV',
        genres: anime.genre || anime.genres || [],
        synopsis: anime.synopsis || anime.description || '',
        episodeList: anime.chapter ? anime.chapter.map(ch => ({
            id: ch.url || ch.id,
            slug: ch.url,
            title: `Episode ${ch.ch}`,
            date: ch.date
        })) : [],
        ...anime
    };
};

export const animeService = {
    // Get latest anime
    getOngoing: async (page = 1) => {
        const result = await fetchWithCache(`/anime/latest?page=${page}`);
        if (!result) return [];
        const list = result.data || result.result || result || [];
        return Array.isArray(list) ? list.map(mapAnime) : [];
    },

    // Get recommended anime
    getRecommended: async () => {
        const result = await fetchWithCache('/anime/recommended');
        if (!result) return [];
        const list = result.data || result.result || result || [];
        return Array.isArray(list) ? list.map(mapAnime) : [];
    },

    // Search anime
    search: async (keyword) => {
        const result = await fetchWithCache(`/anime/search?q=${encodeURIComponent(keyword)}`);
        if (!result) return [];
        const list = result.data || result.result || result || [];
        return Array.isArray(list) ? list.map(mapAnime) : [];
    },

    // Get anime detail
    getDetail: async (slug) => {
        const result = await fetchWithCache(`/anime/detail?urlId=${slug}`);
        if (!result) return null;
        const data = result.data?.[0] || result.data || result;
        return mapAnime(data);
    },

    // Get episode detail with streaming links
    getEpisode: async (slug) => {
        const result = await fetchWithCache(`/anime/getvideo?chapterUrlId=${slug}`);
        if (!result) return null;

        const data = Array.isArray(result) ? result[0] : (result.data?.[0] || result.data || result);

        // Map to a structure that WatchAnime.jsx expects or handles
        // WatchAnime expects qualities or defaultStreamingUrl
        if (data && data.stream) {
            const firstStream = data.stream[0]?.link || '';
            return {
                ...data,
                defaultStreamingUrl: firstStream,
                // Map stream to qualities for the UI
                server: {
                    qualities: data.reso ? data.reso.map(r => ({
                        title: r,
                        serverList: data.stream.filter(s => s.reso === r).map(s => ({
                            serverId: s.id,
                            title: `Server ${s.provide || s.id}`,
                            url: s.link
                        }))
                    })) : [
                        {
                            title: 'Default',
                            serverList: data.stream.map(s => ({
                                serverId: s.id,
                                title: `Server ${s.provide || s.id}`,
                                url: s.link
                            }))
                        }
                    ]
                }
            };
        }
        return data;
    },

    // FlickReels getServer directly returns URL from the stream list, but we can wrap it
    getServer: async (serverId) => {
        // In FlickReels, the URL is already in the getvideo response.
        // But for compatibility with the existing WatchAnime.jsx:
        return null; // WatchAnime will use the URL from the serverList
    }
};

export const FALLBACK_ANIME = [];
