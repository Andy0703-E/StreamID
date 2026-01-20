import { getChannels } from './src/data/channels.js';

async function test() {
  console.log('Fetching channels...');
  const channels = await getChannels();
  console.log(`Found ${channels.length} channels`);
  console.log('First 5 channels:');
  channels.slice(0, 5).forEach(ch => {
    console.log(`- ${ch.name} (${ch.id}) | Group: ${ch.group}`);
  });
}

test();