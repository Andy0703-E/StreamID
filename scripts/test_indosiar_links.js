
import fetch from 'node-fetch';

const links = [
    'http://op-group1-swiftservesd-1.dens.tv/s/s04/01.m3u8', // The broken one (404 segments)
    'http://op-group1-swiftservehd-1.dens.tv/h/h235/02.m3u8', // Potential HD candidate
    'http://op-group1-swiftservehd-1.dens.tv/h/h235/index.m3u8',
    'http://202.80.222.20/cdn/iptv/Tvod/001/channel2000022/1024.m3u8' // ANTV (Control)
];

async function testLinks() {
    console.log('Testing Indosiar links...');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    for (const url of links) {
        try {
            console.log(`Testing: ${url}`);
            const res = await fetch(url, {
                method: 'HEAD',
                timeout: 5000,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                }
            });
            console.log(`[${res.status}] ${url}`);

            if (res.ok) {
                // Try to fetch a segment if playlist OK
                const resText = await fetch(url);
                const text = await resText.text();
                const lines = text.split('\n');
                const segment = lines.find(l => l.includes('.ts'));
                if (segment) {
                    // Construct segment URL
                    const urlObj = new URL(url);
                    const basePath = urlObj.pathname.substring(0, urlObj.pathname.lastIndexOf('/') + 1);
                    const segUrl = `${urlObj.origin}${basePath}${segment.trim()}`;
                    console.log(`   Trying segment: ${segUrl}`);
                    const segRes = await fetch(segUrl, { method: 'HEAD' });
                    console.log(`   Segment: ${segRes.status}`);
                } else {
                    console.log('   No segments found in playlist');
                }
            }

        } catch (e) {
            console.log(`[Error] ${url} - ${e.message}`);
        }
    }
    clearTimeout(timeout);
}

testLinks();
