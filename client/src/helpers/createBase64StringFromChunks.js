/**
 * Get a base64 encoded string out of chunks.
 * @param {String} type
 * @param {Object[]} chunks
 */
function createBase64StringFromChunks(type, chunks) {
  const string = `data:${type};base64,${window.btoa(chunks)}`;
  return string;
}

export default createBase64StringFromChunks;
