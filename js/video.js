/**
 * Renderiza um único vídeo por desafio.
 *
 * Tipos suportados:
 *   - source: "local"  → url aponta para um arquivo .mp4 local
 *   - source: "youtube" → url pode ser o ID, a URL completa ou a URL de embed
 *   - source: "drive"   → url pode ser o ID do arquivo ou a URL de preview
 */
function renderVideo(containerSelector, video) {
  const container = document.querySelector(containerSelector);
  if (!container || !video) return;

  let html = "";

  if (video.source === "local") {
    html = `
      <video class="video-player" controls preload="metadata" id="video-local-${containerSelector.replace(/[^a-zA-Z0-9]/g, '-')}">
        <source src="${video.url}" type="video/mp4">
        Seu navegador não suporta vídeo HTML5.
      </video>`;
    container.innerHTML = html;

    const player = container.querySelector("video");
    const source = player.querySelector("source");
    source.addEventListener("error", () => {
      container.innerHTML = videoPlaceholder(`Arquivo <code>${video.url}</code> ainda não encontrado.`);
    });

    // Fallback para navegadores que não disparam error no source
    player.addEventListener("error", () => {
      if (player.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
        container.innerHTML = videoPlaceholder(`Arquivo <code>${video.url}</code> ainda não encontrado.`);
      }
    });
    return;
  } else if (video.source === "youtube") {
    const embedId = extractYouTubeId(video.url);
    if (!embedId) {
      html = videoPlaceholder("URL do YouTube inválida.");
    } else {
      html = `
        <div class="video-embed">
          <iframe src="https://www.youtube.com/embed/${embedId}" title="${video.title || "Vídeo do YouTube"}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>`;
    }
  } else if (video.source === "drive") {
    const fileId = extractDriveId(video.url);
    if (!fileId) {
      html = videoPlaceholder("Link do Google Drive inválido.");
    } else {
      html = `
        <div class="video-embed">
          <iframe src="https://drive.google.com/file/d/${fileId}/preview" title="${video.title || "Vídeo do Google Drive"}" frameborder="0" allow="autoplay" allowfullscreen></iframe>
        </div>`;
    }
  } else {
    html = videoPlaceholder("Tipo de vídeo não reconhecido.");
  }

  container.innerHTML = html;
}

function videoPlaceholder(message) {
  return `
    <div class="video-placeholder">
      <div class="video-placeholder-icon">🎬</div>
      <p>${message || "Vídeo ainda não disponível."}</p>
      <small>Adicione o arquivo em <code>videos/</code> ou altere o link em <code>js/challenges.js</code>.</small>
    </div>`;
}

function extractYouTubeId(url) {
  if (!url) return null;
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
  const m = url.match(/(?:v=|\/embed\/|\/youtu\.be\/|\/v\/|\/shorts\/|\/watch\?v=)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

function extractDriveId(url) {
  if (!url) return null;
  if (/^[a-zA-Z0-9_-]{25,}$/.test(url)) return url;
  const m = url.match(/\/d\/([a-zA-Z0-9_-]{25,})/);
  return m ? m[1] : null;
}

function setupCodeCopy() {
  const blocks = document.querySelectorAll(".copy-code");
  blocks.forEach(btn => {
    btn.addEventListener("click", () => {
      const code = btn.getAttribute("data-code");
      navigator.clipboard.writeText(code).then(() => {
        const original = btn.textContent;
        btn.textContent = "Copiado!";
        setTimeout(() => (btn.textContent = original), 1500);
      });
    });
  });
}

