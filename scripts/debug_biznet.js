
import fetch from 'node-fetch';

const CHANNELS_URL = 'https://iptv-org.github.io/api/channels.json';
const STREAMS_URL = 'https://iptv-org.github.io/api/streams.json';

async function checkBiznet() {
    try {
        console.log('Fetching source data...');
        const [channelsRes, streamsRes] = await Promise.all([
            fetch(CHANNELS_URL),
            fetch(STREAMS_URL)
        ]);

        const channels = await channelsRes.json();
        const streams = await streamsRes.json();

        // Find Biznet channels
        const biznetChannels = channels.filter(c => c.name.toLowerCase().includes('biznet'));
        console.log(`Found ${biznetChannels.length} Biznet channels in source.`);

        biznetChannels.forEach(c => console.log(JSON.stringify(c, null, 2)));

        const streamsByChannel = {};
        streams.forEach(s => {
            if (streamsByChannel[s.channel]) streamsByChannel[s.channel].push(s);
            else streamsByChannel[s.channel] = [s];
        });

        for (const channel of biznetChannels) {
            const channelStreams = streamsByChannel[channel.id];
            if (!channelStreams || channelStreams.length === 0) {
                console.log(`[Missing] ${channel.name}: No stream URLs found.`);
                continue;
            }

            console.log(`\nChecking ${channel.name}...`);
            for (const stream of channelStreams) {
                try {
                    const controller = new AbortController();
                    const timeout = setTimeout(() => controller.abort(), 8000);

                    console.log(`  > GET ${stream.url}`);
                    const res = await fetch(stream.url, {
                        method: 'GET',
                        signal: controller.signal,
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                        }
                    });
                    clearTimeout(timeout);
                    console.log(`  > Status: ${res.status} ${res.statusText}`);

                    // Fetch content to check if segments are relative or absolute
                    const text = await res.text();
                    console.log('--- PLAYLIST PREVIEW ---');
                    console.log(text.substring(0, 500));
                    console.log('------------------------');
                } catch (e) {
                    console.log(`  > Error: ${e.message}`);
                }
            }
        }

    } catch (e) {
        console.error(e);
    }
}

checkBiznet();
