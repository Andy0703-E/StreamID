
import fetch from 'node-fetch';

const BASE = 'http://202.80.222.20/cdn/iptv/Tvod/001/';
const IDS = ['channel2000022', 'channel2000023']; // ANTV, Candidate

async function test() {
    for (const id of IDS) {
        const url = `${BASE}${id}/1024.m3u8`;
        console.log(`Testing ${id}...`);
        try {
            const res = await fetch(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Connection': 'keep-alive'
                },
                timeout: 5000
            });
            console.log(`[${res.status}] ${url}`);
            if (res.ok) {
                const text = await res.text();
                // console.log(text.substring(0, 200));

                // Try to find a segment
                const lines = text.split('\n');
                const segment = lines.find(l => l.includes('.ts'));
                if (segment) {
                    const segUrl = `${BASE}${id}/${segment.trim()}`;
                    console.log(`   Fetching segment: ${segUrl}`);
                    const segRes = await fetch(segUrl, {
                        method: 'HEAD',
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                        },
                        timeout: 5000
                    });
                    console.log(`   Segment Status: ${segRes.status}`);
                }
            }
        } catch (e) {
            console.log(`Error: ${e.message}`);
        }
    }
}

test();
