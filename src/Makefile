EMCC=emcc

all: t3_per.c
	$(EMCC) -O3 -s WASM=1 -o main.js -s EXPORTED_RUNTIME_METHODS='["getValue", "setValue"]' -s EXPORTED_FUNCTIONS="['_calloc', '_permutation']" -s EXPORT_ES6=1 -s USE_ES6_IMPORT_META=0 -s MODULARIZE=1 t3_per.c