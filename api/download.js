const { validateUrl } = require('../utils/validator');
const tiktokService = require('../services/tiktok');
const instagramService = require('../services/instagram');
const youtubeService = require('../services/youtube');
const facebookService = require('../services/facebook');

const platformMap = {
  'tiktok.com': tiktokService,
  'instagram.com': instagramService,
  'youtube.com': youtubeService,
  'youtu.be': youtubeService,
  'facebook.com': facebookService,
  'fb.watch': facebookService
};

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL required' });
  }

  const platform = validateUrl(url);
  if (!platform) {
    return res.status(400).json({ error: 'Unsupported platform' });
  }

  const service = platformMap[platform];
  if (!service) {
    return res.status(400).json({ error: 'Platform not supported yet' });
  }

  try {
    const result = await service.download(url);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
