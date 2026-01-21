const BASE_URL = 'https://api.sansekai.my.id/api';
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

        const rawData = await response.json();

        // Map data fields to consistent format
        const mapDrama = (item) => ({
            id: item.bookId || item.id || '',
            title: item.bookName || item.title || item.name || 'Unknown Drama',
            poster: item.bookCover || item.coverWap || item.poster || item.image || '',
            episode: item.chapterCount || item.episode || item.latest_episode || '',
            rating: item.rating || (item.rankVo?.hotCode) || 0,
            description: item.introduction || item.description || item.synopsis || '',
            tags: item.tags || [],
            playCount: item.playCount || '',
            videoPath: item.videoPath || ''
        });

        const data = Array.isArray(rawData) ? rawData.map(mapDrama) : (rawData.data ? rawData.data.map(mapDrama) : mapDrama(rawData));

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
    getDetail: (id) => fetchWithCache(`/dramabox/detail?bookId=${id}`),
    getEpisodes: async (id) => {
        const cacheKey = `drama_episodes_${id}`;
        // Custom fetch for episodes to extract video URLs
        try {
            const response = await fetch(`${BASE_URL}/dramabox/allepisode?bookId=${id}`);
            const rawEpisodes = await response.json();

            return (Array.isArray(rawEpisodes) ? rawEpisodes : []).map(ep => {
                // Find default video path from cdnList
                let videoUrl = '';
                const defaultCdn = ep.cdnList?.find(c => c.isDefault === 1) || ep.cdnList?.[0];
                if (defaultCdn) {
                    const defaultQuality = defaultCdn.videoPathList?.find(q => q.isDefault === 1) ||
                        defaultCdn.videoPathList?.find(q => q.quality === 720) ||
                        defaultCdn.videoPathList?.[0];
                    videoUrl = defaultQuality?.videoPath || '';
                }

                return {
                    id: ep.chapterId,
                    index: ep.chapterIndex,
                    title: ep.chapterName || `Episode ${ep.chapterIndex + 1}`,
                    url: videoUrl,
                    poster: ep.chapterImg
                };
            });
        } catch (e) {
            console.error('Error fetching episodes:', e);
            return [];
        }
    },
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
