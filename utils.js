const distancesDict = {};
const citiesList = [];

var nodes = []
var edges = []

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
      nodes.push({id: nodes.length, label: input_A.value })
    }
    if (!citiesList.includes(input_B.value)) {
      citiesList.push(input_B.value);
      nodes.push({id: nodes.length, label: input_B.value })

    }

    const from = nodes.filter(node => node.label === input_A.value )
    const to = nodes.filter(node => node.label === input_B.value )

    edges.push({from: from[0].id, to: to[0].id, label: input_distance.value})

    var nodes_g = new vis.DataSet(nodes)
    var edges_g = new vis.DataSet(edges)

    var container = document.getElementById("mynetwork");
    var data = {
      nodes: nodes_g,
      edges: edges_g,
    };
    var options = {};
    var network = new vis.Network(container, data, options);

    input_A.value = "";
    input_B.value = "";
    input_distance.value = "";
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
  let graphPtr = makePtrOfMatrix(inputMatrix);
  let citiesOrder = makePtrOfArray(citiesList);
  let arrPtr = makePtrOfArray(citiesList);
  let costPrt = Module._calloc(1, "i32");
  Module.setValue(costPrt, 10000000000000, "i32");
  let startDate = window.performance.now();
  Module._permutation(arrPtr, graphPtr, citiesOrder, costPrt, 0, citiesList.length - 1);
  let endDate = window.performance.now();
  let cost = Module.getValue(costPrt, "i32")
  if (cost == 10000000000000) {
    costp.innerHTML = `No Existe Solucion`;
    timep.innerHTML = `El tiempo de ejecucion fue: ${endDate - startDate}`;
    return;
  }
  let path = getArrayFromPtr(citiesOrder, citiesList.length);
  costp.innerHTML = `El Costo Minimo encontrado es: ${cost}`;
  let final_path = []
  for (let i = 0; i < path.length; i++) {
      final_path.push(citiesList[path[i]])
  }
  final_path.push(final_path[0])

  final_path.forEach((f_node, i) => {
    if (i < final_path.length -1) {
      const from = nodes.filter(node => node.label == f_node)
      const to = nodes.filter(node => node.label == final_path[i + 1])
      edgeIndex = edges.findIndex((edge => (edge.from == from[0].id && edge.to == to[0].id) || (edge.from == to[0].id && edge.to == from[0].id)))
      edges[edgeIndex] = {from: from[0].id, to: to[0].id, color: 'red', width: 2, arrows: 'to'}

    }
    
  });

  var nodes_g = new vis.DataSet(nodes)
  var edges_g = new vis.DataSet(edges)

  var container = document.getElementById("mynetwork");
  var data = {
    nodes: nodes_g,
    edges: edges_g,
  };
  var options = {};
  var network = new vis.Network(container, data, options);


  routep.innerHTML = `La mejor ruta encontrada fue: ${final_path.join(", ")}`;
  timep.innerHTML = `El tiempo de ejecucion fue: ${endDate - startDate}`;
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
costp = document.getElementById("cost");
routep = document.getElementById("route");
timep = document.getElementById("time");
