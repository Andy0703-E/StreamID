
import fetch from 'node-fetch';

const urls = [
    'https://video.detik.com/trans7/smil:trans7.smil/index.m3u8',
    'https://video.detik.com/transtv/smil:transtv.smil/index.m3u8'
];

async function test() {
    for (const url of urls) {
        console.log(`Testing: ${url}`);
        try {
            const res = await fetch(url, {
                method: 'HEAD',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                }
            });
            console.log(`[${res.status}] ${url}`);
            if (res.ok) {
                // Try fetching content
                const res2 = await fetch(url);
                const text = await res2.text();
                console.log(`Content length: ${text.length}`);

                // Check if it redirects or has chunks
                if (text.includes('trans7') || text.includes('transtv') || text.includes('.ts') || text.includes('.m3u8')) {
                    console.log('   Content looks valid (playlist)');
                }
            } else {
                console.log('   Failed to fetch');
            }
        } catch (e) {
            console.log(`[Error] ${e.message}`);
        }
    }
}

test();
