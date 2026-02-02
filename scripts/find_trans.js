
import fs from 'fs';
import path from 'path';

const channelsPath = path.join(process.cwd(), 'src/data/channels.js');

try {
    const data = fs.readFileSync(channelsPath, 'utf8');
    // Extract the array part roughly to avoid parse errors if it's an export
    // Assuming structure is export const CHANNELS = [...]

    // Simple regex search
    const lines = data.split('\n');
    lines.forEach((line, index) => {
        if (line.toLowerCase().includes('trans')) {
            console.log(`Line ${index + 1}: ${line.trim()}`);
        }
    });

} catch (e) {
    console.error(e);
}
