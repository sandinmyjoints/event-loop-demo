/* eslint-disable quotes */

import fs from 'fs/promises';
import zlib from 'zlib';
import { promisify } from 'util';
import {
  startListeningForKeypress,
  stopListeningForKeypress,
} from './common.mjs';

let isDone = false;
let count = 0;

function logTicks(howOften) {
  count += 1;

  if (count % howOften === 0) console.log(`tick ${count}`);

  if (isDone) {
    stopListeningForKeypress();
  } else {
    setImmediate(logTicks.bind(null, howOften));
  }
}

startListeningForKeypress();

const buffer = await fs.readFile('./large-file');

// Start logging every 100,000th tick.
logTicks(100_000);

// Asynchronously compress file.
console.log(`tick number before gzip (async): ${count}`);
await promisify(zlib.gzip)(buffer);
console.log(`tick number after gzip (async): ${count}`);

isDone = true;
