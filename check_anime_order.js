
import fetch from 'node-fetch';

async function checkAnime() {
    try {
        // Fetch One Piece as sample
        const res = await fetch('https://api.sansekai.my.id/api/anime/detail?urlId=one-piece-sub-indo');
        const json = await res.json();

        let data = json;
        if (json.data) data = json.data;
        if (Array.isArray(data)) data = data[0];

        console.log('Title:', data.title);
        if (data.chapter) {
            console.log('Chapter Count:', data.chapter.length);
            console.log('First 3 chapters:', data.chapter.slice(0, 3).map(c => c.ch));
            console.log('Last 3 chapters:', data.chapter.slice(-3).map(c => c.ch));
        } else {
            console.log('No chapters found');
        }

    } catch (e) {
        console.error(e);
    }
}

checkAnime();
