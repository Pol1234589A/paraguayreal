const { YoutubeTranscript } = require('youtube-transcript');
const fs = require('fs');
const path = require('path');

function extractVideoId(url) {
  const pattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(pattern);
  return match ? match[1] : null;
}

async function main() {
  const url = process.argv[2];
  if (!url) {
    console.error("Uso: node process_youtube.js <URL_DE_YOUTUBE>");
    process.exit(1);
  }

  const videoId = extractVideoId(url);
  if (!videoId) {
    console.error(`Error: No se pudo extraer el ID del video a partir de la URL: ${url}`);
    process.exit(1);
  }

  console.log(`ID del video extraído: ${videoId}`);
  
  const transcriptsDir = path.join(__dirname, 'transcripts');
  if (!fs.existsSync(transcriptsDir)) {
    fs.mkdirSync(transcriptsDir, { recursive: true });
  }

  const outputFile = path.join(transcriptsDir, `${videoId}.txt`);

  try {
    console.log("Descargando transcripción...");
    let transcript;
    try {
      // Try getting Spanish transcript
      transcript = await YoutubeTranscript.fetchTranscript(videoId, { lang: 'es' });
    } catch (e) {
      console.log("No se encontró transcripción específica en español, intentando obtener la predeterminada...");
      transcript = await YoutubeTranscript.fetchTranscript(videoId);
    }

    const fullText = transcript.map(t => t.text).join(' ');
    
    // Write text file
    fs.writeFileSync(outputFile, fullText, 'utf8');
    console.log(`¡Éxito! Transcripción guardada en: ${outputFile}`);
    console.log("--- CONTENIDO EXTRAÍDO (Primeras 200 palabras) ---");
    const preview = fullText.split(' ').slice(0, 200).join(' ');
    console.log(preview + "...");
  } catch (err) {
    console.error("Error al descargar la transcripción:", err);
    process.exit(1);
  }
}

main();
