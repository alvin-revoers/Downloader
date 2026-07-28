const urlInput = document.getElementById('urlInput');
const downloadBtn = document.getElementById('downloadBtn');
const resultDiv = document.getElementById('result');

downloadBtn.addEventListener('click', handleDownload);
urlInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleDownload();
});

async function handleDownload() {
  const url = urlInput.value.trim();

  if (!url) {
    resultDiv.innerHTML = `<div class="loading">Masukkan URL dulu, Bos.</div>`;
    resultDiv.classList.add('show');
    return;
  }

  resultDiv.innerHTML = `<div class="loading">Memproses...</div>`;
  resultDiv.classList.add('show');

  try {
    const res = await fetch('/api/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });

    const data = await res.json();

    if (data.error) {
      resultDiv.innerHTML = `<div class="error">${data.error}</div>`;
      return;
    }

    let mediaHtml = '';
    if (data.videoUrl) {
      mediaHtml = `
        <div class="media-wrapper">
          <video controls src="${data.videoUrl}"></video>
        </div>
        <a href="${data.videoUrl}" target="_blank" class="btn-download">⬇ Download Video</a>
      `;
    } else if (data.mediaUrl) {
      mediaHtml = `
        <div class="media-wrapper">
          <img src="${data.mediaUrl}" alt="Media" />
        </div>
        <a href="${data.mediaUrl}" target="_blank" class="btn-download">⬇ Download Gambar</a>
      `;
    }

    resultDiv.innerHTML = `
      <div class="meta">
        <strong>${data.title || 'Media'}</strong><br />
        📱 ${data.platform ? data.platform.toUpperCase() : 'UNKNOWN'}
        ${data.author ? `| 👤 ${data.author}` : ''}
      </div>
      ${mediaHtml}
    `;

  } catch (err) {
    resultDiv.innerHTML = `<div class="error">Error: ${err.message}</div>`;
  }
}
