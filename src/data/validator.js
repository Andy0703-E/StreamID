const fetch = require('node-fetch');

async function checkUrl(url) {
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout

        const response = await fetch(url, {
            method: 'HEAD',
            signal: controller.signal,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        clearTimeout(timeout);
        return response.ok;
    } catch (error) {
        return false;
    }
}

async function validateChannels(channels) {
    console.log(`[VALIDATOR] Checking ${channels.length} channels...`);
    const results = [];
    const CONCURRENCY = 10;

    for (let i = 0; i < channels.length; i += CONCURRENCY) {
        const chunk = channels.slice(i, i + CONCURRENCY);
        const chunkResults = await Promise.all(
            chunk.map(async (c) => ({
                ...c,
                ok: await checkUrl(c.url)
            }))
        );
        results.push(...chunkResults);
        console.log(`[VALIDATOR] Progress: ${results.length}/${channels.length}`);
    }

    return results.filter(r => r.ok).map(({ ok, ...c }) => c);
}

module.exports = { validateChannels };
