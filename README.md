# event loop demo

## Setup

Generate a large file filled with random characters.

    head -c 300000000 < /dev/urandom | base64 > large-file

## Sync vs async

    $ diff compress-async.mjs compress-sync.mjs

``` diff
--- compress-async.mjs  2021-03-16 11:39:21.000000000 -0400
+++ compress-sync.mjs   2021-03-16 11:38:46.000000000 -0400
@@ -27,12 +27,12 @@

 const buffer = await fs.readFile('./large-file');

-// Start logging every 100,000th tick.
-logTicks(100_000);
+// Start logging every tick.
+logTicks(1);

-// Asynchronously compress file.
-console.log(`tick number before gzip (async): ${count}`);
-await promisify(zlib.gzip)(buffer);
-console.log(`tick number after gzip (async): ${count}`);
+// Synchronously compress file.
+console.log(`tick number before gzipSync: ${count}`);
+zlib.gzipSync(buffer);
+console.log(`tick number after gzipSync: ${count}`);

 isDone = true;
```

## Run

    $ node log-ticks.mjs

    $ node compress-async.mjs

    $ node compress-sync.mjs

## Links

- https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/
- https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
- https://nodejs.org/en/docs/guides/dont-block-the-event-loop/
- https://github.com/sidorares/node-mysql2/issues/1202
