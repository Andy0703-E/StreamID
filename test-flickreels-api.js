// test-flickreels-api.js
const API_BASE = 'https://api.sansekai.my.id/api';

async function testApi() {
    console.log('Testing FlickReels API...');

    try {
        console.log(`\n--- FETCHING LATEST ---`);
        const latestResponse = await fetch(`${API_BASE}/anime/latest`, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const latestData = await latestResponse.json();

        const list = latestData.data || latestData.result || latestData || [];
        if (Array.isArray(list) && list.length > 0) {
            const first = list[0];
            const urlId = first.url || first.slug || first.animeId;
            console.log(`\n--- FETCHING DETAIL for urlId: ${urlId} ---`);

            const detailResponse = await fetch(`${API_BASE}/anime/detail?urlId=${urlId}`, {
                headers: { 'User-Agent': 'Mozilla/5.0' }
            });
            const detailData = await detailResponse.json();

            const item = detailData.data?.[0] || detailData.data || detailData;
            const chapters = item.chapter || [];

            if (chapters.length > 0) {
                console.log(`Found ${chapters.length} chapters!`);
                const ep = chapters[0];
                const epUrlId = ep.url;
                console.log(`\n--- FETCHING VIDEO for chapterUrlId: ${epUrlId} ---`);
                const videoResp = await fetch(`${API_BASE}/anime/getvideo?chapterUrlId=${epUrlId}`, {
                    headers: { 'User-Agent': 'Mozilla/5.0' }
                });
                const videoData = await videoResp.json();
                console.log('Video Data Result:', JSON.stringify(videoData.data || videoData, null, 2).substring(0, 1000));
            }
        }
    } catch (e) {
        console.error('API Test Error:', e.message);
    }
}

testApi();
