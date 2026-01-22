
import fetch from 'node-fetch';

async function checkM3U() {
    try {
        console.log('Fetching ID M3U...');
        const response = await fetch('https://iptv-org.github.io/iptv/countries/id.m3u');
        const text = await response.text();
        console.log('M3U Length:', text.length);

        // Parse lines
        const lines = text.split('\n');
        let matchCount = 0;

        // Look for tvg-id
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes('tvg-id="')) {
                console.log('Sample line:', lines[i]);
                matchCount++;
                if (matchCount > 3) break;
            }
        }
        console.log('Total lines:', lines.length);

    } catch (error) {
        console.error('Error:', error);
    }
}

checkM3U();
