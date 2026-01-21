// Anime Service - Using Sankavollerei Otakudesu API
const API_BASE = 'https://www.sankavollerei.com';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// SSR-safe caching with timeout
const fetchWithCache = async (endpoint) => {
    const cacheKey = `anime_v1_${endpoint}`;

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

        // Try to parse JSON, return null if invalid
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

// Map anime data to consistent format (Otakudesu API structure)
const mapAnime = (anime) => {
    if (!anime) return null;
    return {
        id: anime.animeId || anime.slug || anime.id || '',
        slug: anime.animeId || anime.slug || '',
        title: anime.title || anime.name || 'Unknown',
        poster: anime.poster || anime.image || anime.thumbnail || 'https://via.placeholder.com/300x450?text=No+Image',
        episode: anime.episodes || anime.episode || anime.latest_episode || '',
        releaseDay: anime.releaseDay || '',
        latestReleaseDate: anime.latestReleaseDate || '',
        rating: anime.rating || anime.score || 0,
        status: anime.status || '',
        type: anime.type || 'TV',
        genres: anime.genres || [],
        synopsis: anime.synopsis || anime.description || '',
        // Keep original data for detail page
        ...anime
    };
};

export const animeService = {
    // Get homepage data (ongoing, schedule, etc.)
    getHome: async () => {
        const data = await fetchWithCache('/anime/home');
        return data;
    },

    // Get ongoing anime list
    getOngoing: async (page = 1) => {
        const result = await fetchWithCache(`/anime/ongoing-anime?page=${page}`);
        if (!result) return [];
        // API structure: { data: { animeList: [...] } }
        const list = result.data?.animeList || result.data || result || [];
        return Array.isArray(list) ? list.map(mapAnime) : [];
    },

    // Get completed anime list
    getCompleted: async (page = 1) => {
        const result = await fetchWithCache(`/anime/complete-anime?page=${page}`);
        if (!result) return [];
        // API structure: { data: { animeList: [...] } }
        const list = result.data?.animeList || result.data || result || [];
        return Array.isArray(list) ? list.map(mapAnime) : [];
    },

    // Get schedule
    getSchedule: async () => {
        const data = await fetchWithCache('/anime/schedule');
        return data;
    },

    // Get all genres
    getGenres: async () => {
        const data = await fetchWithCache('/anime/genre');
        return data?.data || data || [];
    },

    // Get anime by genre
    getByGenre: async (slug, page = 1) => {
        const data = await fetchWithCache(`/anime/genre/${slug}?page=${page}`);
        if (!data) return [];
        const list = data.data || data || [];
        return Array.isArray(list) ? list.map(mapAnime) : [];
    },

    // Search anime
    search: async (keyword) => {
        const data = await fetchWithCache(`/anime/search/${encodeURIComponent(keyword)}`);
        if (!data) return [];
        const list = data.data || data.results || data || [];
        return Array.isArray(list) ? list.map(mapAnime) : [];
    },

    // Get anime detail
    getDetail: async (slug) => {
        const data = await fetchWithCache(`/anime/anime/${slug}`);
        if (!data) return null;
        return mapAnime(data.data || data);
    },

    // Get episode detail with streaming links
    getEpisode: async (slug) => {
        const result = await fetchWithCache(`/anime/episode/${slug}`);
        if (!result) return null;
        return result.data || result;
    },

    // Get streaming server URL
    getServer: async (serverId) => {
        const result = await fetchWithCache(`/anime/server/${serverId}`);
        if (!result) return null;
        return result.data?.url || (typeof result.data === 'string' ? result.data : null);
    },

    // Get batch download links
    getBatch: async (slug) => {
        const data = await fetchWithCache(`/anime/batch/${slug}`);
        return data?.data || data;
    },

    // Get all anime (unlimited)
    getAll: async () => {
        const data = await fetchWithCache('/anime/unlimited');
        if (!data) return [];
        const list = data.data || data || [];
        return Array.isArray(list) ? list.map(mapAnime) : [];
    }
};

export const FALLBACK_ANIME = [];
