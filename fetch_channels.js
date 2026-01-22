
// Removed fs dependency for now, just checking structure via console
import fetch from 'node-fetch'; // assuming node-fetch might be needed or global fetch is available in node 18+

// In Node 18+, fetch is global. If not, this might fail if node-fetch isn't installed. 
// However, the user environment is Node 22, so global fetch is available.

async function fetchChannels() {
    try {
        const response = await fetch('https://iptv-org.github.io/api/channels.json');
        const channels = await response.json();

        console.log('Total channels:', channels.length);

        if (channels.length > 0) {
            console.log('Sample channel keys:', Object.keys(channels[0]));
            console.log('Sample channel:', JSON.stringify(channels[0], null, 2));
        }

        // Filter for Indonesia
        const idChannels = channels.filter(c => c.country === 'ID');
        console.log('Indonesian channels count:', idChannels.length);
        if (idChannels.length > 0) {
            console.log('Sample ID channel:', JSON.stringify(idChannels[0], null, 2));
        }

        // Check categories
        const categories = new Set();
        channels.forEach(c => {
            if (c.categories) {
                c.categories.forEach(cat => categories.add(cat));
            }
        });
        console.log('Categories found (first 50):', Array.from(categories).slice(0, 50));

    } catch (error) {
        console.error('Error fetching channels:', error);
    }
}

fetchChannels();
