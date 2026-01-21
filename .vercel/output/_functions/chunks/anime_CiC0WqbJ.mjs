// Anime Service - Using Sankavollerei Otakudesu API
const API_BASE = 'https://www.sankavollerei.com';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// SSR-safe caching
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

    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

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
    } catch (error) {
        console.error(`Fetch error for ${endpoint}:`, error);
        return null;
    }
};

// Map anime data to consistent format
const mapAnime = (anime) => {
    if (!anime) return null;
    return {
        id: anime.slug || anime.id || '',
        title: anime.title || anime.name || 'Unknown',
        poster: anime.poster || anime.image || anime.thumbnail || 'https://via.placeholder.com/300x450?text=No+Image',
        episode: anime.episode || anime.episodes || anime.latest_episode || '',
        rating: anime.rating || anime.score || 0,
        status: anime.status || '',
        type: anime.type || 'TV',
        genres: anime.genres || [],
        synopsis: anime.synopsis || anime.description || '',
        // Keep original data for detail page
        ...anime
    };
};

const animeService = {
    // Get homepage data (ongoing, schedule, etc.)
    getHome: async () => {
        const data = await fetchWithCache('/anime/home');
        return data;
    },

    // Get ongoing anime list
    getOngoing: async (page = 1) => {
        const data = await fetchWithCache(`/anime/ongoing-anime?page=${page}`);
        if (!data) return [];
        const list = data.data || data.ongoing || data || [];
        return Array.isArray(list) ? list.map(mapAnime) : [];
    },

    // Get completed anime list
    getCompleted: async (page = 1) => {
        const data = await fetchWithCache(`/anime/complete-anime?page=${page}`);
        if (!data) return [];
        const list = data.data || data.completed || data || [];
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
        const data = await fetchWithCache(`/anime/episode/${slug}`);
        return data?.data || data;
    },

    // Get streaming server URL
    getServer: async (serverId) => {
        const data = await fetchWithCache(`/anime/server/${serverId}`);
        return data?.data || data;
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

const FALLBACK_ANIME = [];

export { FALLBACK_ANIME as F, animeService as a };
