
import fetch from 'node-fetch';

const BASE_URL = 'http://202.80.222.20/cdn/iptv/Tvod/001/';
const SUFFIX = '/1024.m3u8';
const START_ID = 2000010;
const END_ID = 2000030;

async function identify() {
    console.log(`Scanning content for ID ${START_ID} to ${END_ID}...`);

    for (let i = START_ID; i <= END_ID; i++) {
        const id = `channel${i}`;
        const url = `${BASE_URL}${id}${SUFFIX}`;
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 3000);

            const res = await fetch(url, { signal: controller.signal });
            clearTimeout(timeout);

            if (res.ok) {
                const text = await res.text();
                // Extract EXTINF
                const match = text.match(/#EXTINF:.*?,(.*)/);
                const title = match ? match[1].trim() : 'No Title';
                console.log(`[${i}] ${title} (${url})`);
            }
        } catch (e) {
            // console.log(`[${i}] Error`);
        }
    }
}

identify();
