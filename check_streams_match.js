
import fetch from 'node-fetch';

async function checkStreams() {
    try {
        console.log('Fetching channels...');
        const cRes = await fetch('https://iptv-org.github.io/api/channels.json');
        const channels = await cRes.json();
        const idChannels = channels.filter(c => c.country === 'ID');
        const idSet = new Set(idChannels.map(c => c.id));
        console.log('ID Channels count:', idSet.size);

        console.log('Fetching streams...');
        const sRes = await fetch('https://iptv-org.github.io/api/streams.json');
        const streams = await sRes.json();

        let matchCount = 0;
        const matches = [];

        streams.forEach(s => {
            if (idSet.has(s.channel)) {
                matchCount++;
                if (matches.length < 5) matches.push(s);
            }
        });

        console.log('Found streams for ID channels:', matchCount);
        console.log('Samples:', JSON.stringify(matches, null, 2));

    } catch (error) {
        console.error('Error:', error);
    }
}

checkStreams();
