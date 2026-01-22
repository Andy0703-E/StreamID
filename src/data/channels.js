
// Fallback data
export const FALLBACK_CHANNELS = [
  // MNC Group (Embeds from RctiPlus - Best effort for Embed)
  {
    id: 'ID.RCTI',
    name: 'RCTI',
    logo: 'https://iptv-org.github.io/iptv/logos/rcti.png',
    group: 'National',
    embedUrl: 'https://sindikasi.inews.id/embed/video/YWdlbnQ9ZGVza3RvcCZ1cmw9aHR0cHMlM0ElMkYlMkZlbWJlZC5yY3RpcGx1cy5jb20lMkZsaXZlJTJGcmN0aSUyRmluZXdzaWQmaGVpZ2h0PTEwMCUyNSZ3aWR0aD0xMDAlMjU=',
    country: 'ID'
  },
  {
    id: 'ID.MNCTV',
    name: 'MNCTV',
    logo: 'https://iptv-org.github.io/iptv/logos/mnctv.png',
    group: 'National',
    embedUrl: 'https://sindikasi.inews.id/embed/video/YWdlbnQ9ZGVza3RvcCZ1cmw9aHR0cHMlM0ElMkYlMkZlbWJlZC5yY3RpcGx1cy5jb20lMkZsaXZlJTJGbW5jdHYlMkZpbmV3c2lkJmhlaWdodD0xMDAlMjUmd2lkdGg9MTAwJTI1',
    country: 'ID'
  },
  {
    id: 'ID.GTV',
    name: 'GTV',
    logo: 'https://iptv-org.github.io/iptv/logos/gtv.png',
    group: 'National',
    embedUrl: 'https://sindikasi.inews.id/embed/video/YWdlbnQ9ZGVza3RvcCZ1cmw9aHR0cHMlM0ElMkYlMkZlbWJlZC5yY3RpcGx1cy5jb20lMkZsaXZlJTJGZ3R2JTJGaW5ld3NpZCZoZWlnaHQ9MTAwJTI1JndpZHRoPTEwMCUyNQ==',
    country: 'ID'
  },
  {
    id: 'ID.iNews',
    name: 'iNews',
    logo: 'https://iptv-org.github.io/iptv/logos/inews.png',
    group: 'National',
    embedUrl: 'https://sindikasi.inews.id/embed/video/YWdlbnQ9ZGVza3RvcCZ1cmw9aHR0cHMlM0ElMkYlMkZlbWJlZC5yY3RpcGx1cy5jb20lMkZsaXZlJTJGaW5ld3MlMkZpbmV3c2lkJmhlaWdodD0xMDAlMjUmd2lkdGg9MTAwJTI1',
    country: 'ID'
  },

  // Trans Media (Embeds - verified accessible)
  {
    id: 'ID.Trans7',
    name: 'Trans7',
    logo: 'https://iptv-org.github.io/iptv/logos/trans7.png',
    group: 'National',
    embedUrl: 'https://20.detik.com/embed/livestreaming/trans7',
    country: 'ID'
  },
  {
    id: 'ID.TransTV',
    name: 'Trans TV',
    logo: 'https://iptv-org.github.io/iptv/logos/transtv.png',
    group: 'National',
    embedUrl: 'https://20.detik.com/embed/livestreaming/transtv',
    country: 'ID'
  },
  {
    id: 'ID.CNNIndonesia',
    name: 'CNN Indonesia',
    logo: 'https://cdn.detik.net.id/cnn/images/logo.png',
    group: 'News',
    embedUrl: 'https://www.cnnindonesia.com/tv/embed',
    country: 'ID'
  },
  {
    id: 'ID.CNBCIndonesia',
    name: 'CNBC Indonesia',
    logo: 'https://cdn.detik.net.id/cnbc/images/logo.png',
    group: 'News',
    embedUrl: 'https://www.cnbcindonesia.com/tv/embed',
    country: 'ID'
  },

  // Other Nationals (HLS/Mix)
  {
    id: 'ID.TVRI',
    name: 'TVRI Nasional',
    logo: 'https://iptv-org.github.io/iptv/logos/tvri.png',
    group: 'National',
    url: 'https://ott-balancer.tvri.go.id/live/eds/Nasional/hls/Nasional.m3u8',
    country: 'ID'
  },
  {
    id: 'ID.KompasTV',
    name: 'Kompas TV',
    logo: 'https://iptv-org.github.io/iptv/logos/kompastv.png',
    group: 'National',
    url: 'https://ythls-v2.onrender.com/channel/UC5BMIWZe9isJXLZZWPWvBlg.m3u8', // YouTube HLS Proxy usually reliable
    country: 'ID'
  },
  {
    id: 'ID.ANTV',
    name: 'ANTV',
    logo: 'https://iptv-org.github.io/iptv/logos/antv.png',
    group: 'National',
    embedUrl: 'https://www.vidio.com/live/782-antv/embed', // Robust fallback for ANTV
    country: 'ID'
  },
  {
    id: 'ID.Indosiar',
    name: 'Indosiar',
    logo: 'https://iptv-org.github.io/iptv/logos/indosiar.png',
    group: 'National',
    embedUrl: 'https://www.vidio.com/live/205-indosiar/embed',
    country: 'ID'
  },
  {
    id: 'ID.SCTV',
    name: 'SCTV',
    logo: 'https://iptv-org.github.io/iptv/logos/sctv.png',
    group: 'National',
    embedUrl: 'https://www.vidio.com/live/204-sctv/embed',
    country: 'ID'
  },

  // Sports (Fallback/Mix)
  {
    id: 'SPORT.RedBull',
    name: 'Red Bull TV',
    logo: 'https://iptv-org.github.io/iptv/logos/redbulltv.png',
    group: 'Sports',
    url: 'https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8',
    country: 'Intl'
  },
  {
    id: 'SPORT.MotorTrend',
    name: 'MotorTrend',
    logo: 'https://iptv-org.github.io/iptv/logos/motortrend.png',
    group: 'Sports',
    url: 'https://cdn-freedive-live.tubi.video/1000572/playlist.m3u8',
    country: 'US'
  }
];

const SOURCES = []; // Disable automatic fetching for now, rely on curated list

export async function getChannels() {
  return FALLBACK_CHANNELS;
}
