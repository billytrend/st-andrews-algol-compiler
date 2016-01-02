#!/bin/sh

tsc ./src/test/*/**.ts --outDir ./dist/test/  --target ES5 --module commonjs
mocha ./dist/test/**/*