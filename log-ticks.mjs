import {
  startListeningForKeypress,
  stopListeningForKeypress,
} from './common.mjs';

let isDone = false;
let count = 0;

function logTicks(howOften) {
  count += 1;

  if (count % howOften === 0) console.log(`tick ${count}`);

  // Exit after 2M ticks.
  if (count > 2_000_000) isDone = true;

  if (isDone) {
    stopListeningForKeypress();
  } else {
    setImmediate(logTicks.bind(null, howOften));
  }
}

startListeningForKeypress();

// Log every 100,000th tick.
logTicks(100_000);
