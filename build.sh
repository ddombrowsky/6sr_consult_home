#!/bin/bash

cd `dirname $0`

set -ex

rm -rf dist 6srticles/dist

pushd 6srticles
npm run build
popd

npx tsc -p src/api &&
npx ng build --prod &&
cp ./static/* ./dist/ussr/
cp -r ./6srticles/dist ./dist/ussr/a

tar cfJ dist.tar.xz ./dist/ ./src/api
