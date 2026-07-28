exports.validateUrl = (url) => {
  const platforms = [
    { domain: 'tiktok.com', key: 'tiktok.com' },
    { domain: 'instagram.com', key: 'instagram.com' },
    { domain: 'youtube.com', key: 'youtube.com' },
    { domain: 'youtu.be', key: 'youtube.com' },
    { domain: 'facebook.com', key: 'facebook.com' },
    { domain: 'fb.watch', key: 'facebook.com' }
  ];

  for (const p of platforms) {
    if (url.includes(p.domain)) {
      return p.key;
    }
  }
  return null;
};
