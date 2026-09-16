#!/bin/bash
echo "Starting Server"
PGUSER=biotrackeradmin \
PGPASSWORD=bio@20262026 \
PGHOST=localhost \
PGPORT=5432 \
PGDATABASE=biotracker \
node ./server/index.js
