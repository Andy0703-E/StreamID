
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const CHANNELS_FILE = path.resolve('src/data/channels.js');
const CHANNELS_URL = 'https://iptv-org.github.io/api/channels.json';
const STREAMS_URL = 'https://iptv-org.github.io/api/streams.json';

async function filterChannels() {
    try {
        console.log('Fetching fresh data from API...');
        const [channelsRes, streamsRes] = await Promise.all([
            fetch(CHANNELS_URL),
            fetch(STREAMS_URL)
        ]);

        const channels = await channelsRes.json();
        const streams = await streamsRes.json();

        console.log(`Loaded ${channels.length} channels and ${streams.length} streams.`);

        // Filter for ID + Sports
        const targetChannels = channels.filter(c => {
            const isIndo = c.country === 'ID';
            const isSport = c.categories && c.categories.includes('sports');

            // Explicitly exclude broken channels requested by user
            if (c.id === 'AlImanTV.id') return false;

            return isIndo || isSport;
        });

        console.log(`Potential candidates: ${targetChannels.length}`);

        // Map streams
        const streamsByChannel = {};
        streams.forEach(s => {
            if (!s.channel) return;
            if (!streamsByChannel[s.channel]) {
                streamsByChannel[s.channel] = [];
            }
            streamsByChannel[s.channel].push(s);
        });

        // Build list with streams
        let candidates = [];
        for (const channel of targetChannels) {
            const channelStreams = streamsByChannel[channel.id];
            if (!channelStreams || channelStreams.length === 0) continue;

            const bestStream = channelStreams.find(s => s.url.startsWith('https')) || channelStreams[0];

            candidates.push({
                id: channel.id,
                name: channel.name,
                logo: channel.logo || '/logo.png', // Ensure fallback if missing
                group: channel.categories && channel.categories.length > 0
                    ? (channel.categories.includes('sports') ? 'Sports' : 'National')
                    : 'Other',
                country: channel.country,
                url: bestStream.url,
                website: channel.website
            });
        }

        console.log(`Candidates with streams: ${candidates.length}. Checking availability...`);

        const validChannels = [];
        const BATCH_SIZE = 20;

        for (let i = 0; i < candidates.length; i += BATCH_SIZE) {
            const batch = candidates.slice(i, i + BATCH_SIZE);
            const promises = batch.map(async (channel) => {
                try {
                    const controller = new AbortController();
                    const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout

                    const res = await fetch(channel.url, {
                        method: 'HEAD',
                        signal: controller.signal,
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                        }
                    });

                    clearTimeout(timeout);

                    if (res.ok) return channel;

                    // Fallback to GET on ANY failure (4xx, 5xx, or just strict server)
                    if (!res.ok) {
                        const controller2 = new AbortController();
                        const timeout2 = setTimeout(() => controller2.abort(), 8000);
                        const res2 = await fetch(channel.url, {
                            method: 'GET',
                            signal: controller2.signal,
                            headers: {
                                'Range': 'bytes=0-100', // Just get header
                                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                            }
                        });
                        clearTimeout(timeout2);
                        if (res2.ok) return channel;
                    }

                    console.log(`[Broken] ${channel.name} (${res.status})`);
                    return null;
                } catch (e) {
                    // Try GET if HEAD threw an error (client side or network)
                    try {
                        const controller3 = new AbortController();
                        const timeout3 = setTimeout(() => controller3.abort(), 8000);
                        const res3 = await fetch(channel.url, {
                            method: 'GET',
                            signal: controller3.signal,
                            headers: {
                                'Range': 'bytes=0-100',
                                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                            }
                        });
                        clearTimeout(timeout3);
                        if (res3.ok) return channel;
                    } catch (e2) {
                        return null;
                    }
                    return null;
                }
            });

            const results = await Promise.all(promises);
            validChannels.push(...results.filter(c => c !== null));
            console.log(`Processed ${Math.min(i + BATCH_SIZE, candidates.length)}/${candidates.length}. Valid: ${validChannels.length}`);
        }

        const newContent = `
// Auto-generated by scripts/filter_channels.js
// Do not edit manually if you plan to re-run the script.

export const FALLBACK_CHANNELS = ${JSON.stringify(validChannels, null, 2)};

export async function getChannels() {
  return FALLBACK_CHANNELS;
}
`;

        fs.writeFileSync(CHANNELS_FILE, newContent, 'utf8');
        console.log('Updated src/data/channels.js');

    } catch (error) {
        console.error('Fatal error:', error);
    }
}

filterChannels();
