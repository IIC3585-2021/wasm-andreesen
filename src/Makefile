EMCC=emcc

all: t3.c
	$(EMCC) -O3 -s WASM=1 -o main.js -s EXPORTED_RUNTIME_METHODS='["getValue", "setValue"]' -s EXPORTED_FUNCTIONS="['_calloc', '_travelingSalesmanProblem']" -s EXPORT_ES6=1 -s MODULARIZE=1 t3.c