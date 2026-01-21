// test-all-services.js
import { getChannels } from './src/data/channels.js';
import { dramaService } from './src/services/drama.js';
import { animeService } from './src/services/anime.js';

async function runTests() {
    console.log('--- Testing Channel Service ---');
    try {
        const channels = await getChannels();
        console.log(`Channels found: ${channels.length}`);
        if (channels.length > 0) {
            console.log(`First channel: ${channels[0].name}`);
        }
    } catch (e) {
        console.error('Channel Service Error:', e.message);
    }

    console.log('\n--- Testing Drama Service (Trending) ---');
    try {
        const drama = await dramaService.getTrending();
        console.log(`Drama count: ${drama ? drama.length : 'null'}`);
    } catch (e) {
        console.error('Drama Service Error:', e.message);
    }

    console.log('\n--- Testing Anime Service (Ongoing) ---');
    try {
        const anime = await animeService.getOngoing();
        console.log(`Anime count: ${anime ? anime.length : 'null'}`);
    } catch (e) {
        console.error('Anime Service Error:', e.message);
    }
}

runTests();
