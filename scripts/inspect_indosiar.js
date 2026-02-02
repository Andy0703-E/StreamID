
import fetch from 'node-fetch';

const url = 'http://op-group1-swiftservesd-1.dens.tv/s/s04/01.m3u8';

async function inspect() {
    console.log(`Fetching ${url}...`);
    const res = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
    });

    const text = await res.text();
    console.log('--- CONTENT START ---');
    console.log(text.substring(0, 1000));
    console.log('--- CONTENT END ---');
}

inspect();
