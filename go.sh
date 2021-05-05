#!/bin/bash

# run `npm install` first

cd `dirname $0`

set -x

$(npm bin)/tsc -p src/api &&
$(npm bin)/ng build --prod && cp ./static/* ./dist/ussr/ &&

if [ "$NODE_ENV" = "production" ] ; then
    sudo -u www-data NODE_ENV=production node src/api/index.js
else
    node src/api/index.js
fi
