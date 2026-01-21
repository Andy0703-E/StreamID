
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

async function testLatest() {
    const baseUrl = 'https://api.sansekai.my.id/api';
    console.log('Testing /anime/latest?page=1...');
    try {
        const response = await fetch(`${baseUrl}/anime/latest?page=1`);
        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Data Type:', typeof data);
        console.log('Is Array:', Array.isArray(data));

        if (Array.isArray(data)) {
            console.log('Length:', data.length);
            if (data.length > 0) {
                console.log('First Item Raw:', JSON.stringify(data[0], null, 2));
            }
        } else if (data && typeof data === 'object') {
            console.log('Object Keys:', Object.keys(data));
            console.log('Data Snippet:', JSON.stringify(data).slice(0, 200));
        } else {
            console.log('Raw Data:', data);
        }
    } catch (e) {
        console.error('Fetch Error:', e.message);
    }
}

testLatest();
