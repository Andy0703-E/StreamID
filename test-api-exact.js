// test-api-exact.js
const API_BASE = 'https://api.sansekai.my.id/api';

async function testEndpoint(endpoint) {
    console.log(`\n--- Testing ${endpoint} ---`);
    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json',
            }
        });

        console.log('Status:', response.status);
        const text = await response.text();
        console.log('Raw text sample:', text.substring(0, 500));

        try {
            const data = JSON.parse(text);
            console.log('JSON.parse(text) type:', typeof data);

            let list = data.data || data.result || data;
            console.log('Extracted list type:', typeof list);

            if (typeof list === 'string') {
                const secondParse = JSON.parse(list);
                console.log('Second parse type:', typeof secondParse);
                console.log('Second parse is array:', Array.isArray(secondParse));
                if (Array.isArray(secondParse)) console.log('Count:', secondParse.length);
            } else if (Array.isArray(list)) {
                console.log('List is array, count:', list.length);
            }
        } catch (e) {
            console.log('Failed to parse text as JSON:', e.message);
        }
    } catch (e) {
        console.error('Fetch error:', e.message);
    }
}

async function run() {
    await testEndpoint('/anime/latest?page=1');
    await testEndpoint('/anime/movie?page=1');
}

run();
