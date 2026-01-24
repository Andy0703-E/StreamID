export const prerender = false;

export async function POST({ request }) {
    try {
        const { message, history } = await request.json();
        const apiKey = import.meta.env.GROQ_API_KEY;

        if (!apiKey) {
            return new Response(JSON.stringify({ error: 'API Key not configured' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const systemPrompt = `You are "StreamID Support Bot", a premium AI assistant for StreamID, the best platform for watching Anime, Drama, and Indonesian TV. 
Your goal is to help users report bugs, find content, and explain features.

CONTEXT ABOUT STREAMID:
1. Features: Auto-next episode, Autoplay (configurable in Settings), High-quality streaming, Live TV, Anime, Drama, and Komik (Comics).
2. Tech Stack: Astro, React, Lucide Icons, HLS.js for streaming.
3. Troubleshooting: 
   - If a video doesn't play, suggest trying another server or check if it's an iframe embed (which has limitations).
   - If the app icon is missing, suggest clearing browser cache or re-installing from the browser menu.
4. Voice: Professional, helpful, friendly, and concise. Use Indonesian primarily.

RULES:
- When asked to report a bug, ask for specific details and tell them "Tim kami akan segera meninjau laporan ini."
- Do NOT answer questions unrelated to StreamID or general entertainment. Politely redirect them.
- Keep answers short and formatted with markdown if necessary.`;

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...history,
                    { role: 'user', content: message }
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });

        const data = await response.json();

        return new Response(JSON.stringify({
            message: data.choices[0].message.content
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Support API Error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
