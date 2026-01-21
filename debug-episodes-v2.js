
import fetch from 'node-fetch';

const BASE_URL = 'https://api.sansekai.my.id/api';
// Use a known ID if possible, or fetch trending to get one. 
// Using the ID from previous logs: 42000003970 (Ultimatum Sang Raja Mafia)
const TEST_ID = '42000003970';

async function debugEpisodes() {
    console.log(`Fetching episodes for ID: ${TEST_ID}`);
    try {
        const response = await fetch(`${BASE_URL}/dramabox/allepisode?bookId=${TEST_ID}`);
        console.log(`Response Status: ${response.status}`);

        if (!response.ok) {
            console.error('API Error');
            return;
        }

        const rawData = await response.json();
        console.log('--- Raw Data Type ---', typeof rawData);
        console.log('Is Array?', Array.isArray(rawData));

        if (Array.isArray(rawData)) {
            console.log(`Total items found: ${rawData.length}`);
            if (rawData.length > 0) {
                console.log('--- First Episode Sample ---');
                console.log(JSON.stringify(rawData[0], null, 2));
            } else {
                console.log('Returned array is empty.');
            }
        } else {
            console.log('Data is not an array:', JSON.stringify(rawData, null, 2));
            // Check if it's wrapped in { data: [...] }
            if (rawData.data && Array.isArray(rawData.data)) {
                console.log(`Found data array inside object. Length: ${rawData.data.length}`);
            }
        }

    } catch (e) {
        console.error('Fetch error:', e);
    }
}

debugEpisodes();
