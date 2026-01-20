// Debug script untuk lihat format M3U sebenarnya
async function analyzePlaylist() {
  const response = await fetch('https://iptv-org.github.io/iptv/index.m3u');
  const text = await response.text();
  const lines = text.split('\n');
  
  console.log('=== First 50 lines of M3U ===');
  for (let i = 0; i < Math.min(50, lines.length); i++) {
    if (lines[i].trim()) {
      console.log(`Line ${i}: ${lines[i]}`);
    }
  }

  console.log('\n=== Sample EXTINF lines ===');
  let count = 0;
  for (let i = 0; i < lines.length && count < 10; i++) {
    if (lines[i].includes('EXTINF')) {
      console.log(lines[i]);
      count++;
    }
  }

  console.log('\n=== Lines containing "ID" or "Indonesia" ===');
  count = 0;
  for (let i = 0; i < lines.length && count < 10; i++) {
    if (lines[i].includes('ID') && !lines[i].includes('tvg-id="US')) {
      console.log(`Line ${i}: ${lines[i]}`);
      count++;
    }
  }
}

analyzePlaylist().catch(console.error);