async function findIndonesianChannels() {
  const response = await fetch('https://iptv-org.github.io/iptv/index.m3u');
  const text = await response.text();
  const lines = text.split('\n');
  
  // Cari semua tvg-id yang berkaitan dengan Indonesia
  const allTvgIds = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('EXTINF')) {
      const tvgIdMatch = lines[i].match(/tvg-id="([^"]*)"/);
      if (tvgIdMatch) {
        const tvgId = tvgIdMatch[1];
        if (tvgId.toLowerCase().includes('indo') || tvgId.includes('.id') || tvgId.includes('@ID')) {
          allTvgIds.push({ line: i, tvgId, full: lines[i].substring(0, 150) });
        }
      }
    }
  }
  
  console.log(`Found ${allTvgIds.length} potential Indonesian channels:`);
  allTvgIds.slice(0, 20).forEach(item => {
    console.log(`\nLine ${item.line}:`);
    console.log(`tvg-id: ${item.tvgId}`);
    console.log(`full: ${item.full}`);
  });
}

findIndonesianChannels().catch(console.error);