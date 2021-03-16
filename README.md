# event loop demo

## Setup

Generate a large file filled with random characters.

    head -c 300000000 < /dev/urandom | base64 > large-file

## Run

    $ node log-ticks.mjs

    $ node compress-async.mjs

    $ node compress-sync.mjs
