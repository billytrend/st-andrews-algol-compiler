#!/bin/sh

rm -rf ./dist/test
tsc ./src/test/*/**.ts --outDir ./dist/test/  --target ES5 --module commonjs
mocha --debug-brk ./dist/test/**/*