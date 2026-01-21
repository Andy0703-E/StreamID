
// using global fetch in Node 18+
// Actually, previous debug-api.js used fetch and it seemingly worked (Step 591 output status 200).

const bookId = '42000000651'; // Example bookId from previous logs
const url = `https://api.sansekai.my.id/api/dramabox/allepisode?bookId=${bookId}`;

async function testEpisodes() {
    console.log(`Fetching episodes for Book ID: ${bookId}`);
    try {
        const res = await fetch(url);
        console.log(`Status: ${res.status}`);
        if (!res.ok) {
            console.error('Failed to fetch');
            return;
        }
        const data = await res.json();
        const episodes = Array.isArray(data) ? data : [];
        console.log(`Total Episodes: ${episodes.length}`);

        if (episodes.length > 0) {
            const firstEp = episodes[0];
            console.log('--- First Episode Raw Data (snippet) ---');
            console.log(JSON.stringify(firstEp, null, 2).slice(0, 500) + '...');

            console.log('\n--- CDN List Inspection ---');
            if (firstEp.cdnList) {
                firstEp.cdnList.forEach((cdn, idx) => {
                    console.log(`CDN #${idx} (Default: ${cdn.isDefault}) Domain: ${cdn.cdnDomain}`);
                    if (cdn.videoPathList) {
                        cdn.videoPathList.forEach(v => {
                            console.log(`  Quality: ${v.quality}, Default: ${v.isDefault}, URL: ${v.videoPath.slice(0, 100)}...`);
                        });
                    }
                });
            }

            // Test my mapping logic
            let videoUrl = '';
            const defaultCdn = firstEp.cdnList?.find(c => c.isDefault === 1) || firstEp.cdnList?.[0];
            if (defaultCdn) {
                const defaultQuality = defaultCdn.videoPathList?.find(q => q.isDefault === 1) ||
                    defaultCdn.videoPathList?.find(q => q.quality === 720) ||
                    defaultCdn.videoPathList?.[0];
                videoUrl = defaultQuality?.videoPath || '';
            }
            console.log('\n--- Extracted URL by current logic ---');
            console.log(videoUrl);
        }

    } catch (e) {
        console.error('Error:', e);
    }
}

testEpisodes();
