const tiktokScraper = require('tiktok-scraper');

exports.download = async (url) => {
  try {
    const result = await tiktokScraper.getVideoMeta(url);
    return {
      platform: 'tiktok',
      title: result.collector[0]?.text || 'TikTok Video',
      videoUrl: result.collector[0]?.videoUrl || result.collector[0]?.videoUrlNoWaterMark,
      thumbnail: result.collector[0]?.covers?.default || '',
      author: result.collector[0]?.authorMeta?.name || 'Unknown'
    };
  } catch (error) {
    throw new Error('TikTok download failed: ' + error.message);
  }
};
