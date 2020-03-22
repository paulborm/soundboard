/**
 * Play audio file.
 * @param {string} path
 */
async function playAudio(path) {
  try {
    const audio = new Audio();
    audio.src = path;
    await audio.play();
  } catch (error) {
    console.error("[AUTOPLAY-ERROR]", error);
  }
}

export default playAudio;
