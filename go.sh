#!/bin/sh

# The normal way, as explained in the Angular2 quickstart, is to run
# `npm start`, which executes `lite-server -c=bs-config.json`.  However,
# you can use node express to serve the same files, and then you can
# write a simple API also in node.  I'm not sure if the lite-server can do that.

# run `npm install` first

cd `dirname $0`

npm run build && NODE_ENV=production node src/api/index.js
