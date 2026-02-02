
import fetch from 'node-fetch';

const PLAYLIST_URL = 'http://op-group1-swiftservesd-1.dens.tv/s/s04/01.m3u8';
const HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Origin': 'http://dens.tv',
    'Referer': 'http://dens.tv/'
};

async function debugSegments() {
    console.log(`1. Fetching Playlist: ${PLAYLIST_URL}`);
    try {
        const res = await fetch(PLAYLIST_URL, { headers: HEADERS });
        if (!res.ok) throw new Error(`Playlist failed: ${res.status}`);

        const text = await res.text();
        console.log('Playlist fetched. Extracting segments...');

        // Find first .ts segment
        const lines = text.split('\n');
        const segmentLine = lines.find(l => l.trim().endsWith('.ts'));

        if (!segmentLine) {
            console.log('No .ts segments found in playlist!');
            console.log(text.substring(0, 500));
            return;
        }

        const segmentName = segmentLine.trim();
        console.log(`Found segment: ${segmentName}`);

        // Construct Full URL
        const urlObj = new URL(PLAYLIST_URL);
        const basePath = urlObj.pathname.substring(0, urlObj.pathname.lastIndexOf('/') + 1);
        const fullSegmentUrl = `${urlObj.origin}${basePath}${segmentName}`;

        console.log(`2. Constructed Segment URL: ${fullSegmentUrl}`);

        // Fetch Segment
        console.log('3. Fetching Segment...');
        const segRes = await fetch(fullSegmentUrl, { method: 'HEAD', headers: HEADERS });
        console.log(`Segment Status: ${segRes.status} ${segRes.statusText}`);

        if (!segRes.ok) {
            console.log('Trying GET request...');
            const segResGet = await fetch(fullSegmentUrl, {
                method: 'GET',
                headers: { ...HEADERS, 'Range': 'bytes=0-100' }
            });
            console.log(`Segment GET Status: ${segResGet.status}`);
        }

    } catch (e) {
        console.error('Error:', e.message);
    }
}

debugSegments();
