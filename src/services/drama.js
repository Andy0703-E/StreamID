const BASE_URL = 'https://api.sansekai.my.id';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// Helper to handle caching
async function fetchWithCache(endpoint) {
    const cacheKey = `drama_cache_${endpoint}`;

    // Check cache
    try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_DURATION) {
                console.log(`[DRAMA_CACHE] Hit for ${endpoint}`);
                return data;
            }
        }
    } catch (e) {
        console.warn('Cache error:', e);
    }

    // Fetch fresh data
    try {
        console.log(`[DRAMA_API] Fetching ${endpoint}`);
        const response = await fetch(`${BASE_URL}${endpoint}`);
        if (!response.ok) throw new Error(`API Error: ${response.status}`);

        const data = await response.json();

        // Save to cache
        try {
            localStorage.setItem(cacheKey, JSON.stringify({
                data,
                timestamp: Date.now()
            }));
        } catch (e) {
            console.warn('Cache write error:', e);
        }

        return data;
    } catch (error) {
        console.error(`[DRAMA_API] Error fetching ${endpoint}:`, error);
        return null;
    }
}

export const dramaService = {
    getTrending: (page = 1) => fetchWithCache(`/dramabox/trending?page=${page}`),
    getLatest: (page = 1) => fetchWithCache(`/dramabox/latest?page=${page}`),
    getForYou: () => fetchWithCache('/dramabox/foryou'),
    getRandom: () => fetchWithCache('/dramabox/randomdrama'),
    getDetail: (id) => fetchWithCache(`/dramabox/detail?id=${id}`),
    getEpisodes: (id) => fetchWithCache(`/dramabox/allepisode?id=${id}`),
    search: (query) => fetchWithCache(`/dramabox/search?q=${query}`)
};

// Fallback data structure for development/error cases
export const FALLBACK_DRAMA = [
    {
        title: "Falling for the CEO",
        poster: "https://via.placeholder.com/300x450?text=Drama+1",
        episode: "Ep 10",
        rating: 4.8
    },
    {
        title: "My Secret Husband",
        poster: "https://via.placeholder.com/300x450?text=Drama+2",
        episode: "Ep 24",
        rating: 4.5
    },
    {
        title: "Revenge of the Queen",
        poster: "https://via.placeholder.com/300x450?text=Drama+3",
        episode: "Ep 5",
        rating: 4.9
    }
];
