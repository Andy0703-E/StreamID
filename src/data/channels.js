// Fallback data
const FALLBACK_CHANNELS = [
  { id: 'ID.RCTI', name: 'RCTI', logo: 'https://iptv-org.github.io/iptv/logos/rcti.png', group: 'General', url: 'https://okey.tv/rcti/index.m3u8', country: 'ID' },
  { id: 'ID.SCTV', name: 'SCTV', logo: 'https://iptv-org.github.io/iptv/logos/sctv.png', group: 'General', url: 'https://okey.tv/sctv/index.m3u8', country: 'ID' },
  { id: 'ID.Indosiar', name: 'Indosiar', logo: 'https://iptv-org.github.io/iptv/logos/indosiar.png', group: 'General', url: 'https://okey.tv/indosiar/index.m3u8', country: 'ID' },
  { id: 'ID.TransTV', name: 'Trans TV', logo: 'https://iptv-org.github.io/iptv/logos/transtv.png', group: 'General', url: 'https://okey.tv/transtv/index.m3u8', country: 'ID' },
  { id: 'CAT.HBO', name: 'HBO HD', logo: 'https://iptv-org.github.io/iptv/logos/hbo.png', group: 'Movies', url: 'https://iptv-org.github.io/iptv/channels/us/HBO.m3u8', country: 'US' },
  { id: 'CAT.Cinemax', name: 'Cinemax', logo: 'https://iptv-org.github.io/iptv/logos/cinemax.png', group: 'Movies', url: 'https://iptv-org.github.io/iptv/channels/us/Cinemax.m3u8', country: 'US' },
  // Fallback Sports
  { id: 'SPORT.RedBull', name: 'Red Bull TV', logo: 'https://iptv-org.github.io/iptv/logos/redbulltv.png', group: 'Sports', url: 'https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8', country: 'Intl' },
  { id: 'SPORT.MotorTrend', name: 'MotorTrend', logo: 'https://iptv-org.github.io/iptv/logos/motortrend.png', group: 'Sports', url: 'https://cdn-freedive-live.tubi.video/1000572/playlist.m3u8', country: 'US' }
];

const SOURCES = [
  { url: 'https://iptv-org.github.io/iptv/countries/id.m3u', type: 'country', name: 'Indonesia' },
  { url: 'https://iptv-org.github.io/iptv/countries/sg.m3u', type: 'country', name: 'Singapore' },
  { url: 'https://iptv-org.github.io/iptv/countries/my.m3u', type: 'country', name: 'Malaysia' },
  { url: 'https://iptv-org.github.io/iptv/categories/movies.m3u', type: 'category', name: 'Movies' },
  { url: 'https://iptv-org.github.io/iptv/categories/sports.m3u', type: 'category', name: 'Sports' }
];

/**
 * Validates a single URL using a HEAD request with a timeout
 */
async function checkUrl(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);

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
  const results = [];
  const CONCURRENCY = 20;

  for (let i = 0; i < channels.length; i += CONCURRENCY) {
    const chunk = channels.slice(i, i + CONCURRENCY);
    const chunkResults = await Promise.all(
      chunk.map(async (c) => {
        const isOk = await checkUrl(c.url);
        return isOk ? c : null;
      })
    );
    results.push(...chunkResults.filter(Boolean));
  }
  return results;
}

async function fetchAndParse(source) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s per source

  try {
    const response = await fetch(source.url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      signal: controller.signal
    });
    clearTimeout(timeoutId);
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

        let isTarget = false;
        if (source.type === 'country') {
          isTarget = source.name === 'Indonesia' ||
            !tvgId || tvgId.startsWith('ID.') ||
            /indonesia|jakarta|bandung|surabaya/i.test(name) ||
            /indonesia/i.test(group || '');
        } else {
          const categoryKeywords = {
            'Movies': /movie|cinema|film|hbo|netflix|disney|warner|hulu|imax|theater/i,
            'Sports': /bola|sport|football|soccer|beIN|stadium|fox|espn|premier|liga|champions|olympic/i
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
            country: source.name === 'Indonesia' ? 'ID' : 'XX'
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
    clearTimeout(timeoutId);
    return [];
  }
}

let cachedChannels = null;

export async function getChannels() {
  if (cachedChannels) return cachedChannels;

  const isSSR = typeof window === 'undefined';

  try {
    // Create a timeout promise for SSR (4 seconds max)
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), isSSR ? 4000 : 30000)
    );

    const allSourceData = await Promise.race([
      Promise.all(SOURCES.map(fetchAndParse)),
      timeoutPromise
    ]);

    const mergedChannels = allSourceData.flat();
    const uniqueChannels = Array.from(new Map(mergedChannels.map(c => [c.url, c])).values());

    if (isSSR) {
      cachedChannels = uniqueChannels.length > 0 ? uniqueChannels.slice(0, 40) : FALLBACK_CHANNELS;
    } else {
      const validChannels = await validateChannels(uniqueChannels);
      cachedChannels = validChannels.length > 0 ? validChannels : FALLBACK_CHANNELS;
    }

    return cachedChannels;
  } catch (error) {
    return FALLBACK_CHANNELS;
  }
}
