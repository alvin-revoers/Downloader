const ytdl = require('ytdl-core');

exports.download = async (url) => {
  try {
    const info = await ytdl.getInfo(url);
    const formats = ytdl.filterFormats(info.formats, 'videoandaudio');
    const bestFormat = formats[formats.length - 1];

    return {
      platform: 'youtube',
      title: info.videoDetails.title,
      videoUrl: bestFormat.url,
      thumbnail: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1]?.url || '',
      author: info.videoDetails.author.name,
      duration: info.videoDetails.lengthSeconds
    };
  } catch (error) {
    throw new Error('YouTube download failed: ' + error.message);
  }
};
