
import fetch from 'node-fetch';

const CHANNELS_URL = 'https://iptv-org.github.io/api/channels.json';
const STREAMS_URL = 'https://iptv-org.github.io/api/streams.json';

async function findIndosiar() {
    console.log('Fetching data...');
    const [channelsRes, streamsRes] = await Promise.all([
        fetch(CHANNELS_URL),
        fetch(STREAMS_URL)
    ]);

    const channels = await channelsRes.json();
    const streams = await streamsRes.json();

    const indosiar = channels.find(c => c.name.toLowerCase().includes('indosiar'));

    if (indosiar) {
        console.log('Found Channel:', indosiar);
        const channelStreams = streams.filter(s => s.channel === indosiar.id);
        console.log('Streams:', channelStreams);

        // Test them
        for (const s of channelStreams) {
            try {
                const res = await fetch(s.url, { method: 'HEAD', timeout: 5000 });
                console.log(`[${res.status}] ${s.url}`);
            } catch (e) {
                console.log(`[Error] ${s.url} - ${e.message}`);
            }
        }
    } else {
        console.log('Indosiar channel not found in DB');
    }
}

findIndosiar();
