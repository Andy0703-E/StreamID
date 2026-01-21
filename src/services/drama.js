const BASE_URL = 'https://api.sansekai.my.id/api';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// Helper to handle caching with timeout
async function fetchWithCache(endpoint) {
    const cacheKey = `drama_v2_${endpoint}`;

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

    // Fetch fresh data
    try {
        console.log(`[DRAMA_API] Fetching ${endpoint}`);
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            console.warn(`[DRAMA_API] returned ${response.status} for ${endpoint}`);
            return null;
        }

        const text = await response.text();

        try {
            const rawData = JSON.parse(text);

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

            const data = Array.isArray(rawData) ? rawData.map(mapDrama) : (rawData.data ? (Array.isArray(rawData.data) ? rawData.data.map(mapDrama) : mapDrama(rawData.data)) : mapDrama(rawData));

            // Save to cache (Browser only)
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
            console.warn(`[DRAMA_API] Failed to parse JSON for ${endpoint}:`, parseError.message);
            return null;
        }
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            console.warn(`[DRAMA_API] Request timeout for ${endpoint}`);
        } else {
            console.error(`[DRAMA_API] Error fetching ${endpoint}:`, error.message);
        }
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
        console.log(`[dramaService] Fetching episodes for ID: ${id}`);

        // Create abort controller for timeout (8 seconds for SSR)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        try {
            const response = await fetch(`${BASE_URL}/dramabox/allepisode?bookId=${id}`, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                },
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                console.error(`[dramaService] Episode fetch failed: ${response.status}`);
                return [];
            }

            const json = await response.json();
            // Handle both array and { data: [...] } formats
            let rawEpisodes = [];
            if (Array.isArray(json)) {
                rawEpisodes = json;
            } else if (json && Array.isArray(json.data)) {
                rawEpisodes = json.data;
            } else {
                console.warn('[dramaService] Unexpected episode data format:', typeof json);
            }

            console.log(`[dramaService] Found ${rawEpisodes.length} episodes for ID ${id}`);

            return rawEpisodes.map((ep, idx) => {
                // More robust video extraction
                let videoUrl = '';

                // Strategy 1: Look for hwztakavideo (preferred)
                let cdn = ep.cdnList?.find(c => c.cdnDomain?.includes('hwztakavideo'));

                // Strategy 2: Look for Default
                if (!cdn) cdn = ep.cdnList?.find(c => c.isDefault === 1);

                // Strategy 3: Any CDN
                if (!cdn) cdn = ep.cdnList?.[0];

                if (cdn) {
                    // Try to find default or 720p, or just take the first one
                    const pathObj = cdn.videoPathList?.find(v => v.isDefault === 1) ||
                        cdn.videoPathList?.find(v => v.quality === 720) ||
                        cdn.videoPathList?.[0];
                    videoUrl = pathObj?.videoPath || '';
                }

                // Strategy 4: Fallback to direct fields if cdnList process fails
                if (!videoUrl) videoUrl = ep.videoPath || ep.url || '';

                return {
                    id: ep.chapterId || `ep_${idx}`,
                    index: ep.chapterIndex || idx,
                    title: ep.chapterName || `Episode ${idx + 1}`,
                    url: videoUrl,
                    poster: ep.chapterImg || ep.cover || ''
                };
            });
        } catch (e) {
            clearTimeout(timeoutId);
            if (e.name === 'AbortError') {
                console.warn(`[dramaService] Episode fetch timeout for ID ${id}`);
            } else {
                console.error('[dramaService] Error fetching episodes:', e.message);
            }
            return [];
        }
    },
    search: (query) => fetchWithCache(`/dramabox/search?q=${query}`)
};

// Fallback data structure for development/error cases
export const FALLBACK_DRAMA = [];
