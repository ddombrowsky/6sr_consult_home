#!/bin/bash

cd `dirname $0`

set -ex

$(npm bin)/tsc -p src/api &&
$(npm bin)/ng build --prod &&
cp ./static/* ./dist/ussr/
