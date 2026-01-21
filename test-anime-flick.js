// test-anime-flick.js
const API_BASE = 'https://api.sansekai.my.id/api';

async function run() {
    try {
        const resp = await fetch(`${API_BASE}/anime/movie`, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const data = await resp.json();
        console.log('Movie Data Type:', typeof data);
        console.log('Is Array:', Array.isArray(data));
        if (data.data) console.log('data.data keys:', Object.keys(data.data));
        console.log('Sample data:', JSON.stringify(data, null, 2).substring(0, 500));
    } catch (e) {
        console.error('Test error:', e.message);
    }
}

run();
