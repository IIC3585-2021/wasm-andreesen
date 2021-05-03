# T3: Solving the Traveler Salesman Problem by wasm-andreesen

## Correr codigo C

Compilar: `gcc -o t3web t3_per.c`

Correr: `./t3web`

## Compilar WASM 

`emcc t3_per.c -s WASM=1 -s EXPORTED_FUNCTIONS="['_calloc', '_permutation']" -s EXPORTED_RUNTIME_METHODS='["getValue","setValue"]' -o main.js`

## Librerias Necesarias

Para la visualizacion se requiere instalar VisJs: `npm install vis-network`

## Se puede correr el codigo utilizando live Server (o similar) o desde la [github pages](https://iic3585-2021.github.io/wasm-andreesen/) de este repositorio.
