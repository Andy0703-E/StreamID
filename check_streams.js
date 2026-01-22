
import fetch from 'node-fetch';

async function checkStreams() {
    try {
        console.log('Fetching streams...');
        const response = await fetch('https://iptv-org.github.io/api/streams.json');
        const streams = await response.json();
        console.log('Total streams:', streams.length);
        console.log('Sample stream:', JSON.stringify(streams[0], null, 2));

        // Check if we can link to channels
        // Sample channel ID from previous run: 'AcehTV.id'
        const acehStreams = streams.filter(s => s.channel === 'AcehTV.id');
        console.log('Streams for AcehTV.id:', JSON.stringify(acehStreams, null, 2));

    } catch (error) {
        console.error('Error:', error);
    }
}

checkStreams();
