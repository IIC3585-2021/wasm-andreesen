const distancesDict = {};
const citiesList = [];

const submit = () => {
  const arista1 = input_A.value + input_B.value;
  const arista2 = input_B.value + input_A.value;

  if (
    Object.keys(distancesDict).includes(arista1) ||
    Object.keys(distancesDict).includes(arista2)
  ) {
    alert("La arista ingresada ya existe");
  } else {
    distancesDict[arista1] = input_distance.value;
    if (!citiesList.includes(input_A.value)) {
      citiesList.push(input_A.value);
    }
    if (!citiesList.includes(input_B.value)) {
      citiesList.push(input_B.value);
    }
    var entry = document.createElement("li");
    entry.appendChild(
      document.createTextNode(
        `${input_A.value}, ${input_B.value}, ${input_distance.value}`
      )
    );
    matrix.appendChild(entry);
    input_A.value = "";
    input_B.value = "";
    input_distance.value = "";
    console.log(distancesDict);
    console.log(citiesList);
  }
};

const calculate = () => {
  const inputMatrix = [];
  for (i = 0; i < citiesList.length; i++) {
    const city = [];
    for (j = 0; j < citiesList.length; j++) {
      if (Object.keys(distancesDict).includes(citiesList[i] + citiesList[j])) {
        city.push(distancesDict[citiesList[i] + citiesList[j]]);
      } else {
        if (
          Object.keys(distancesDict).includes(citiesList[j] + citiesList[i])
        ) {
          city.push(distancesDict[citiesList[j] + citiesList[i]]);
        } else {
          if (i == j) {
            city.push(0);
          } else {
            city.push(0);
          }
        }
      }
    }
    inputMatrix.push(city);
  }
  console.log(inputMatrix);
  let graphPtr = makePtrOfMatrix(inputMatrix);
  let citiesOrder = makePtrOfArray(citiesList);
  let min_distance = 10000000000000;
  for (let i = 0; i < citiesList.length; i++) {
    let result = Module._travelingSalesmanProblem(
      graphPtr,
      inputMatrix.length,
      i,
      citiesOrder
    );
    console.log("Starting from" + i + ": " + result);
    console.log(getArrayFromPtr(citiesOrder, citiesList.length));
    if (result < min_distance) {
      min_distance = result;
    }
  }
};

const makePtrOfMatrix = (graph) => {
  const arrayPtr = Module._calloc(graph.length, 4);
  for (let i = 0; i < graph.length; i++) {
    let rowsPtr = Module._calloc(graph.length, 4);
    Module.setValue(arrayPtr + i * 4, rowsPtr, "i32");
    for (let j = 0; j < graph.length; j++) {
      Module.setValue(rowsPtr + j * 4, graph[i][j], "i32");
    }
  }
  return arrayPtr;
};

const makePtrOfArray = (list) => {
  const arrayPtr = Module._calloc(list.length, 4);
  for (let i = 0; i < list.length; i++) {
    Module.setValue(arrayPtr + i * 4, i, "i32");
  }
  return arrayPtr;
};

const getArrayFromPtr = (ptr, size) => {
  let resultArray = [];
  for (let i = 0; i < size; i++) {
    resultArray.push(Module.getValue(ptr + i * 4, "i32"));
  }
  return resultArray;
};

input_A = document.getElementById("inputA");
input_B = document.getElementById("inputB");
input_distance = document.getElementById("input_distance");
button = document.getElementById("button");
title = document.getElementById("saludo__h1");
matrix = document.getElementById("matrix");
calculateButton = document.getElementById("calculate");

// button.addEventListener("click", function () { main() });
