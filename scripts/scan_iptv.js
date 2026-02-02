
import fetch from 'node-fetch';

const BASE_URL = 'http://202.80.222.20/cdn/iptv/Tvod/001/';
const SUFFIX = '/1024.m3u8';
const CENTER_ID = 2000022; // ANTV
const RANGE = 20;

async function scan() {
    console.log(`Scanning around ID ${CENTER_ID}...`);

    for (let i = CENTER_ID - RANGE; i <= CENTER_ID + RANGE; i++) {
        const id = `channel${i}`;
        const url = `${BASE_URL}${id}${SUFFIX}`;
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 2000);

            const res = await fetch(url, {
                method: 'HEAD',
                signal: controller.signal
            });
            clearTimeout(timeout);

            if (res.ok) {
                console.log(`[FOUND] ${id} - ${url}`);
                // Fetch content to maybe guess name (EXTINF usually empty but worth a shot)
                const res2 = await fetch(url);
                const text = await res2.text();
                // console.log(text.substring(0, 100)); 
            } else {
                // console.log(`[${res.status}] ${id}`);
            }
        } catch (e) {
            // console.log(`[ERR] ${id}`);
        }
    }
}

scan();
