
const anime = {
    title: 'Test Anime',
    chapter: [
        { ch: '24', date: '2023-01-01' },
        { ch: '23', date: '2023-01-01' },
        { ch: '1', date: '2023-01-01' }
    ]
};

// Copy of the modified function logic
const mapAnime = (anime) => {
    if (!anime) return null;
    return {
        // ... other fields omitted
        episodeList: anime.chapter ? anime.chapter.map(ch => ({
            title: `Episode ${ch.ch}`,
            date: ch.date
        })).reverse() : [], // The fix is here
    };
};

const result = mapAnime(anime);
console.log('Original first:', anime.chapter[0].ch);
console.log('Result first title:', result.episodeList[0].title);

if (result.episodeList[0].title === 'Episode 1') {
    console.log('SUCCESS: List is reversed');
} else {
    console.log('FAIL: List order incorrect');
}
