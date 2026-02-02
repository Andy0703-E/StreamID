export const prerender = false;

export async function POST({ request }) {
    try {
        const { message, history, userContext } = await request.json();
        const apiKey = import.meta.env.GROQ_API_KEY || process.env.GROQ_API_KEY;

        const systemPrompt = `You are "StreamID Support Bot", a smart AI assistant for StreamID.
Your goal is to help users with EVERYTHING related to the platform. You know all features, troubleshooting steps, and content types.

OWNERSHIP & CONTACT:
- Owner/Developer: **Andi Agung**.
- Contact: WhatsApp **6285242891112**. (Always provide this number if asked for admin/owner).

WEBSITE KNOWLEDGE BASE (Memorize This):

1. CONTENT LIBRARY:
   - **Live TV**: All Indonesian channels (National & Local). Special handling for Indosiar, TransTV, Trans7, and Biznet channels (bypassing blocking).
   - **Anime**: Latest simulcast anime (Sub Indo), Batch downloads available.
   - **Drama**: Asian dramas (Korean, Chinese, Thai) with subtitles.
   - **Komik**: Manga and Manhwa reader (High quality images).

2. KEY FEATURES:
   - **Smart Proxy Fallback**: IF a channel (like Indosiar/Trans 7) fails to load or showing a network error, the system AUTOMATICALLY retries using a secure proxy. *Advice: "Tunggu 5 detik, sistem akan memperbaikinya otomatis."*
   - **Auto Quality (ABR)**: Video quality adjusts automatically based on internet speed Use "Auto" quality for stability.
   - **PWA (Install App)**: Website can be installed as a native app on Android/iOS/PC. Faster, no address bar, and independent cache.
   - **History**: Auto-saves last watched episode and timestamp.

3. TROUBLESHOOTING GUIDE (Specifics):
   - **"Video Error / Network Error"**: Do NOT tell them to check internet first. Tell them: "Tunggu sebentar, fitur Smart Proxy sedang mencoba menyambungkan ulang jalur manual."
   - **"Gambar Buram"**: Explain "Fitur Auto Quality sedang menyesuaikan dengan kecepatan internet Anda agar tidak buffering."
   - **"Logout Sendiri"**: Explain that "Clear Cache" is safe, but "Clear Data/Cookies" deletes the login session.
   - **"Live TV Hilang"**: Suggest refreshing the page or checking the "TV International" tab if looking for outside channels.

4. TECH STACK:
   - Built with **Astro** (Fast performance) & **React**.
   - Video Player: **HLS.js** with custom adaptive logic.
   - Hosting: **Vercel** Edge Network.

5. VOICE & TONE:
   - Professional, Friendly, Helpful.
   - Metric System: Use Indonesian language primarily.
   - Formatting: Use **Bold** for key terms. Keep answers concise but complete.`;

        // Construct context-aware message
        let contextInfo = `User is currently browsing: ${userContext?.url || 'Unknown'} `;
        if (userContext?.activity) {
            const act = userContext.activity;
            contextInfo += `\nUser is watching ${act.type}: "${act.title}" - ${act.episode} (Episode index: ${act.episodeIndex})`;
        }

        const messages = [
            { role: 'system', content: systemPrompt },
            { role: 'system', content: `USER CONTEXT: ${contextInfo} ` },
            ...history,
            { role: 'user', content: message }
        ];

        if (!apiKey) {
            return new Response(JSON.stringify({ error: 'API Key not configured' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey} `,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: messages,
                temperature: 0.7,
                max_tokens: 500
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Groq API Error Response:', errorData);
            return new Response(JSON.stringify({
                error: `Groq API Error: ${response.status} ${response.statusText} `,
                details: errorData.error?.message || 'No additional details'
            }), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const data = await response.json();

        if (!data.choices || data.choices.length === 0) {
            return new Response(JSON.stringify({ error: 'AI returned no choices' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

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
