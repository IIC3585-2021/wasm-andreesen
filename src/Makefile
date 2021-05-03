EMCC=emcc

all: t3_per.c
	$(EMCC) t3_per.c -s WASM=1 -s EXPORTED_FUNCTIONS="['_calloc', '_permutation']" -s EXPORTED_RUNTIME_METHODS='["getValue","setValue"]' -o main.js