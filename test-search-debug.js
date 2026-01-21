// test-search-debug.js
const API_BASE = 'https://api.sansekai.my.id/api';

async function testSearch(query) {
    console.log(`\n--- Searching for "${query}" ---`);
    try {
        const response = await fetch(`${API_BASE}/anime/search?query=${encodeURIComponent(query)}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json',
            }
        });

        console.log('Status:', response.status);
        const text = await response.text();
        console.log('Raw text length:', text.length);
        console.log('Raw text sample:', text.substring(0, 500));

        try {
            const data = JSON.parse(text);
            console.log('JSON.parse type:', typeof data);

            // Check for common keys
            if (data.data) console.log('data.data is present, type:', typeof data.data);
            if (data.result) console.log('data.result is present, type:', typeof data.result);
            if (data.results) console.log('data.results is present, type:', typeof data.results);

            let list = data.data || data.result || data.results || data;

            if (typeof list === 'string') {
                console.log('Detected list is a STRING, attempting second parse...');
                const parsedList = JSON.parse(list);
                console.log('Second parse type:', typeof parsedList);
                console.log('Second parse is array:', Array.isArray(parsedList));
                if (Array.isArray(parsedList)) {
                    console.log('Result count:', parsedList.length);
                    console.log('First result sample:', JSON.stringify(parsedList[0], null, 2));
                }
            } else if (Array.isArray(list)) {
                console.log('Detected list is an ARRAY.');
                console.log('Result count:', list.length);
            } else {
                console.log('Detected list is an OBJECT/OTHER type.');
            }
        } catch (e) {
            console.log('Failed to parse text as JSON:', e.message);
        }
    } catch (e) {
        console.error('Fetch error:', e.message);
    }
}

testSearch('naruto');
