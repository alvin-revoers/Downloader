const axios = require('axios');

exports.download = async (url) => {
  try {
    const response = await axios.get(`https://api.facebook.com/v19.0/oembed_video?url=${encodeURIComponent(url)}`);
    
    return {
      platform: 'facebook',
      title: response.data.title || 'Facebook Video',
      videoUrl: response.data.thumbnail_url || '',
      author: response.data.author_name || 'Unknown'
    };
  } catch (error) {
    throw new Error('Facebook download failed: ' + error.message);
  }
};
