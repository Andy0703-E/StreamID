
import fetch from 'node-fetch';

async function checkAnime() {
    try {
        console.log('Searching for One Piece...');
        const searchRes = await fetch('https://api.sansekai.my.id/api/anime/search?query=one%20piece');
        const searchJson = await searchRes.json();

        let searchData = searchJson.data;
        if (searchData && searchData[0] && searchData[0].result) searchData = searchData[0].result;

        if (!searchData || searchData.length === 0) {
            console.log('Search failed');
            return;
        }

        const firstResult = searchData[0];
        console.log('Found:', firstResult.title, 'Slug:', firstResult.url || firstResult.id);

        const slug = firstResult.url || firstResult.id;

        console.log(`Fetching detail for ${slug}...`);
        const detailRes = await fetch(`https://api.sansekai.my.id/api/anime/detail?urlId=${slug}`);
        const detailJson = await detailRes.json();

        let detail = detailJson.data;
        if (Array.isArray(detail)) detail = detail[0];

        if (detail && detail.chapter) {
            console.log('Chapter count:', detail.chapter.length);
            const first3 = detail.chapter.slice(0, 3);
            const last3 = detail.chapter.slice(-3);

            console.log('First 3 in array:', first3.map(c => c.ch));
            console.log('Last 3 in array:', last3.map(c => c.ch));

            // Deduce order
            const firstCh = parseFloat(first3[0].ch);
            const secondCh = parseFloat(first3[1].ch);

            if (firstCh > secondCh) {
                console.log('Order appears to be DESCENDING (Latest First)');
            } else {
                console.log('Order appears to be ASCENDING (Oldest First)');
            }

        } else {
            console.log('No chapters in detail');
            console.log('Keys:', Object.keys(detail || {}));
        }

    } catch (e) {
        console.error(e);
    }
}

checkAnime();
