// Fallback data
const FALLBACK_CHANNELS = [
  { id: 'ID.RCTI', name: 'RCTI', logo: 'https://iptv-org.github.io/iptv/logos/rcti.png', group: 'General', url: 'https://okey.tv/rcti/index.m3u8', country: 'ID' },
  { id: 'ID.SCTV', name: 'SCTV', logo: 'https://iptv-org.github.io/iptv/logos/sctv.png', group: 'General', url: 'https://okey.tv/sctv/index.m3u8', country: 'ID' }
];

const SOURCES = [
  { url: 'https://iptv-org.github.io/iptv/countries/id.m3u', type: 'country', name: 'Indonesia' },
  { url: 'https://iptv-org.github.io/iptv/countries/sg.m3u', type: 'country', name: 'Singapore' },
  { url: 'https://iptv-org.github.io/iptv/countries/my.m3u', type: 'country', name: 'Malaysia' },
  { url: 'https://iptv-org.github.io/iptv/countries/us.m3u', type: 'country', name: 'USA' },
  { url: 'https://iptv-org.github.io/iptv/countries/uk.m3u', type: 'country', name: 'UK' },
  { url: 'https://iptv-org.github.io/iptv/categories/news.m3u', type: 'category', name: 'News' },
  { url: 'https://iptv-org.github.io/iptv/categories/sports.m3u', type: 'category', name: 'Sports' },
  { url: 'https://iptv-org.github.io/iptv/categories/movies.m3u', type: 'category', name: 'Movies' },
  { url: 'https://iptv-org.github.io/iptv/categories/kids.m3u', type: 'category', name: 'Kids' }
];

/**
 * Validates a single URL using a HEAD request with a timeout
 */
async function checkUrl(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000); // 2s timeout for faster validation

    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    clearTimeout(timeout);
    return response.ok;
  } catch (error) {
    return false;
  }
}

/**
 * Validates multiple channels with concurrency control
 */
async function validateChannels(channels) {
  console.log(`[VALIDATOR] Memvalidasi ${channels.length} saluran...`);
  const results = [];
  const CONCURRENCY = 30; // Increased concurrency for faster validation

  for (let i = 0; i < channels.length; i += CONCURRENCY) {
    const chunk = channels.slice(i, i + CONCURRENCY);
    const chunkResults = await Promise.all(
      chunk.map(async (c) => {
        const isOk = await checkUrl(c.url);
        return isOk ? c : null;
      })
    );
    results.push(...chunkResults.filter(Boolean));
    if (i % 60 === 0) console.log(`[VALIDATOR] Progress: ${results.length} aktif...`);
  }

  console.log(`[VALIDATOR] Selesai. Total aktif: ${results.length}`);
  return results;
}

async function fetchAndParse(source) {
  try {
    const response = await fetch(source.url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    if (!response.ok) return [];

    const text = await response.text();
    const lines = text.split('\n');
    const channels = [];
    let currentChannel = null;

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('#EXTINF:')) {
        const name = trimmed.match(/,(.*)$/)?.[1]?.trim() || 'Unknown';
        const tvgId = trimmed.match(/tvg-id="([^"]*)"/)?.[1];
        const tvgLogo = trimmed.match(/tvg-logo="([^"]*)"/)?.[1];
        const group = trimmed.match(/group-title="([^"]*)"/)?.[1];

        // Filter based on source type - allow more channels for categories
        let isTarget = false;
        if (source.type === 'country') {
          // For country sources, take Indonesian channels or all if no specific country
          isTarget = source.name === 'Indonesia' ||
            !tvgId || tvgId.startsWith('ID.') ||
            /indonesia|jakarta|bandung|surabaya/i.test(name) ||
            /indonesia/i.test(group || '');
        } else {
          // For categories, take channels that match the category or have relevant keywords
          const categoryKeywords = {
            'Sports': /bola|sport|football|soccer|beIN|stadium|fox|espn|premier|liga|champions|olympic/i,
            'Movies': /movie|cinema|film|hbo|netflix|disney|warner|hulu/i,
            'Anime': /anime|manga|animation|kartun|kids|nickelodeon|disney|cartoon/i,
            'Drama': /drama|kdrama|dorama|tele|soap|novela|romance/i
          };
          const keywords = categoryKeywords[source.name];
          isTarget = keywords ? keywords.test(name) || keywords.test(group || '') : true;
        }

        if (isTarget) {
          currentChannel = {
            id: tvgId || `id-${Math.random().toString(36).substr(2, 9)}`,
            name,
            logo: tvgLogo || '',
            group: group || source.name,
            url: '',
            sourceType: source.type,
            country: source.type === 'country' ? (source.name === 'Indonesia' ? 'ID' : 'XX') : undefined
          };
        }
      } else if (trimmed && !trimmed.startsWith('#') && currentChannel) {
        currentChannel.url = trimmed;
        channels.push(currentChannel);
        currentChannel = null;
      }
    }
    return channels;
  } catch (e) {
    return [];
  }
}

let cachedChannels = null;

export async function getChannels() {
  if (cachedChannels) {
    console.log('[DATA] Menggunakan data saluran dari cache.');
    return cachedChannels;
  }

  // Check if running on server (SSR) - skip heavy validation
  const isSSR = typeof window === 'undefined';

  try {
    console.log('[DATA] Memulai pengambilan data dari multi-sumber...');

    // Create a timeout promise for SSR (5 seconds max)
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), isSSR ? 5000 : 30000)
    );

    // Race between fetch and timeout
    const allSourceData = await Promise.race([
      Promise.all(SOURCES.slice(0, isSSR ? 3 : SOURCES.length).map(fetchAndParse)),
      timeoutPromise
    ]);

    const mergedChannels = allSourceData.flat();

    // Remove duplicates by URL
    const uniqueChannels = Array.from(new Map(mergedChannels.map(c => [c.url, c])).values());
    console.log(`[DATA] Ditemukan ${uniqueChannels.length} total calon saluran.`);

    // Skip validation during SSR to prevent timeout
    if (isSSR) {
      console.log('[DATA] SSR mode - skipping validation for speed');
      cachedChannels = uniqueChannels.length > 0 ? uniqueChannels.slice(0, 50) : FALLBACK_CHANNELS;
    } else {
      const validChannels = await validateChannels(uniqueChannels);
      cachedChannels = validChannels.length > 0 ? validChannels : FALLBACK_CHANNELS;
    }

    return cachedChannels;
  } catch (error) {
    console.error('[ERROR] getChannels:', error.message);
    return FALLBACK_CHANNELS;
  }
}
