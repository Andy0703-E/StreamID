
const urls = [
    'https://api.sansekai.my.id/api/dramabox/trending',
    'https://api.sansekai.my.id/api/dramabox/trending?page=1',
    'https://api.sansekai.my.id/api/dramabox/latest',
    'https://api.sansekai.my.id/api/dramabox/foryou'
];

async function testUrls() {
    for (const url of urls) {
        console.log(`Testing: ${url}`);
        try {
            const res = await fetch(url);
            console.log(`Status: ${res.status}`);
            if (res.ok) {
                const data = await res.json();
                const isArray = Array.isArray(data);
                console.log(`Is Array: ${isArray}`);
                console.log(`Length: ${isArray ? data.length : 'N/A'}`);
                if (isArray && data.length > 0) {
                    console.log('First Item keys:', Object.keys(data[0]));
                }
            } else {
                console.log('Response not OK');
            }
        } catch (e) {
            console.error('Error:', e.message);
        }
        console.log('---');
    }
}

testUrls();
