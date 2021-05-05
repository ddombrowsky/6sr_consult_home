#!/bin/bash

# run `npm install` first

cd `dirname $0`

set -ex

./build.sh

if [ "$NODE_ENV" = "production" ] ; then
    sudo -u www-data NODE_ENV=production node src/api/index.js
else
    node src/api/index.js
fi
