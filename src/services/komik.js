// Komik Service
const API_BASE = 'https://api.sansekai.my.id/api';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

const fetchWithCache = async (endpoint) => {
    const cacheKey = `komik_v1_${endpoint}`;
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

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

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
            console.error(`[SSR ERROR] API returned ${response.status} for ${endpoint}`);
            return null;
        }

        const data = await response.json();
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
        clearTimeout(timeoutId);
        console.error(`[SSR FETCH ERROR] for ${endpoint}:`, error.message);
        return null;
    }
};

export const komikService = {
    getRecommended: async (type = 'manga') => {
        const result = await fetchWithCache(`/komik/recommended?type=${type}`);
        return result?.data || [];
    },

    getLatest: async (type = 'project') => {
        const result = await fetchWithCache(`/komik/latest?type=${type}`);
        return result?.data || [];
    },

    getPopular: async (page = 1) => {
        const result = await fetchWithCache(`/komik/popular?page=${page}`);
        return result?.data || [];
    },

    search: async (query) => {
        const result = await fetchWithCache(`/komik/search?query=${encodeURIComponent(query)}`);
        return result?.data || [];
    },

    getDetail: async (mangaId) => {
        const result = await fetchWithCache(`/komik/detail?manga_id=${mangaId}`);
        return result?.data || null;
    },

    getChapterList: async (mangaId) => {
        const result = await fetchWithCache(`/komik/chapterlist?manga_id=${mangaId}`);
        return result?.data || [];
    },

    getChapterImages: async (chapterId) => {
        const result = await fetchWithCache(`/komik/getimage?chapter_id=${chapterId}`);
        return result?.data?.chapter?.data || [];
    }
};
