export function logKeypress(str) {
  // Handle Ctrl-c.
  if (str.toString() === '\u0003') {
    process.exit();
  }

  console.log(`keypress: ${str} <<<<<<<<<<<<<<<<<<<<`);
}

export function startListeningForKeypress() {
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on('data', logKeypress);
}

export function stopListeningForKeypress() {
  process.stdin.off('data', logKeypress);
  process.stdin.destroy();
}
