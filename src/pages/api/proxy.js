
import fetch from 'node-fetch';

export const GET = async ({ request, url }) => {
    const targetUrl = url.searchParams.get('url');

    if (!targetUrl) {
        return new Response('Missing URL parameter', { status: 400 });
    }

    try {
        const fetchWithRetry = async (url, options, retries = 2) => {
            try {
                const res = await fetch(url, options);
                // Retry on server errors or 404s that might be transient flakes
                if (!res.ok && retries > 0 && res.status >= 500) {
                    // console.log(`[Proxy] Retrying ${url} (${res.status})...`);
                    return await fetchWithRetry(url, options, retries - 1);
                }
                return res;
            } catch (err) {
                if (retries > 0) {
                    // console.log(`[Proxy] Retry network error for ${url}: ${err.message}`);
                    return await fetchWithRetry(url, options, retries - 1);
                }
                throw err;
            }
        };

        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Connection': 'keep-alive'
        };
        // Safely access headers from the request object
        const range = request && request.headers ? request.headers.get('range') : null;
        if (range) {
            headers['Range'] = range;
        }

        const response = await fetchWithRetry(targetUrl, { headers });

        if (!response.ok) {
            return new Response(`Upstream Error: ${response.status}`, { status: response.status });
        }

        const contentType = response.headers.get('content-type');

        // Check if it's a playlist we need to modify (m3u8)
        // If content-type is missing, trust extension.
        const isPlaylist = targetUrl.includes('.m3u8') || (contentType && (contentType.includes('mpegurl') || contentType.includes('hls')));

        if (isPlaylist) {
            let text = await response.text();

            // Calculate Base URL correctly (remove file name, keep trailing slash)
            const urlObj = new URL(targetUrl);
            const baseUrl = urlObj.origin + urlObj.pathname.substring(0, urlObj.pathname.lastIndexOf('/') + 1);

            const proxyBase = `${url.origin}/api/proxy?url=`;

            // Helper to resolve and encode URLs
            const rewriteUrl = (uri) => {
                let absoluteUrl = uri;
                if (!uri.startsWith('http')) {
                    try {
                        // Handle absolute paths starting with /
                        if (uri.startsWith('/')) {
                            absoluteUrl = new URL(uri, urlObj.origin).toString();
                        } else {
                            absoluteUrl = new URL(uri, baseUrl).toString();
                        }
                    } catch (e) {
                        return uri;
                    }
                }
                return `${proxyBase}${encodeURIComponent(absoluteUrl)}`;
            };

            // 1. Rewrite Segment URLs (lines not starting with #)
            text = text.replace(/^(?!#)(.*)$/gm, (match) => {
                const line = match.trim();
                if (line === '') return match;
                return rewriteUrl(line);
            });

            // 2. Rewrite Encryption Keys (#EXT-X-KEY:...,URI="...")
            // Format: #EXT-X-KEY:METHOD=AES-128,URI="http://..."
            text = text.replace(/#EXT-X-KEY:.*?URI="(.*?)"/g, (match, uri) => {
                return match.replace(uri, rewriteUrl(uri));
            });

            return new Response(text, {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': contentType || 'application/vnd.apple.mpegurl'
                }
            });
        } else {
            // Stream binary data directly (TS segments, Keys, etc)
            // Using response.body (Stream) prevents buffering delays
            return new Response(response.body, {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': contentType || 'application/octet-stream'
                }
            });
        }

    } catch (error) {
        console.error(`[Proxy] Error: ${error.message}`);
        return new Response(`Proxy Error: ${error.message}`, { status: 500 });
    }
}
