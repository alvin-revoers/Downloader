const axios = require('axios');

exports.download = async (url) => {
  try {
    const response = await axios.post('https://api.instagram.com/oembed', {
      url: url
    });

    return {
      platform: 'instagram',
      title: response.data.title || 'Instagram Post',
      mediaUrl: response.data.thumbnail_url || '',
      author: response.data.author_name || 'Unknown'
    };
  } catch (error) {
    throw new Error('Instagram download failed: ' + error.message);
  }
};
