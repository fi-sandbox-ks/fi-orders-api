/* Intentionally left without tests: a thin console wrapper with no
   branching logic worth covering -- see README "Development". */
function info(message, meta) {
  // eslint-disable-next-line no-console
  console.log(`[INFO] ${message}`, meta || '');
}

function error(message, meta) {
  // eslint-disable-next-line no-console
  console.error(`[ERROR] ${message}`, meta || '');
}

module.exports = { info, error };
