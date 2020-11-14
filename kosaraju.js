const fs = require("fs");
const readline = require("readline");

// Read graph from file
async function readGraph(filename) {
  const graph = new Array();
  graph[0] = new Array();

  const readStream = fs.createReadStream(filename);
  const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    const res = line.split(" ");
    const vertex = res[0];
    const edge = res[1];

    if (!Array.isArray(graph[edge])) {
      graph[edge] = new Array();
    }

    if (!Array.isArray(graph[vertex])) {
      graph[vertex] = new Array();
    }
    graph[vertex].push(edge);
  }

  return graph;
}

// Function to generate the reverse graph
function reverse(graph) {
  const nVertices = graph.length;
  const reverseGraph = Array(nVertices);

  graph.forEach((edgeList, vertex) => {
    if (!Array.isArray(reverseGraph[vertex])) {
      reverseGraph[vertex] = new Array();
    }

    edgeList.forEach((edge) => {
      if (!Array.isArray(reverseGraph[edge])) {
        reverseGraph[edge] = new Array();
      }
      reverseGraph[edge].push(vertex);
    });
  });

  return reverseGraph;
}

// Main function to compute the SCCs in a given graph
function computeSCCs(graph) {
  const nVertices = graph.length;
  const reverseGraph = reverse(graph);

  const fValuesReverseGraph = topoSort(reverseGraph);

  const isExplored = Array(nVertices).fill(false);
  const sccValues = Array(nVertices);
  let numSCCs = 0;

  function dfsSCC(graph, s) {
    isExplored[s] = true;
    sccValues[s] = numSCCs;
    if (Array.isArray(graph[s])) {
      for (let v of graph[s]) {
        if (!isExplored[v]) {
          dfsSCC(graph, v);
        }
      }
    }
  }

  fValuesReverseGraph.forEach((v) => {
    if (!isExplored[v]) {
      numSCCs += 1;
      dfsSCC(graph, v);
    }
  });

  // count the SCCs and sort them
  const sccSizeList = new Array(numSCCs).fill(0);
  sccValues.shift();
  sccValues.forEach((scc) => {
    sccSizeList[scc] += 1;
  });

  const result = sccSizeList
    .sort((a, b) => {
      return a - b;
    })
    .reverse()
    .slice(0, 5);

  console.log("The sizes of the 5 bigger SCCs are:");
  console.log(result);
}

// TopoSort algorithm
function topoSort(graph) {
  const nVertices = graph.length;
  const isExplored = Array(nVertices).fill(false);

  const fValues = Array(nVertices);
  let curLabel = nVertices;

  function dfsTopo(graph, s) {
    isExplored[s] = true;

    if (Array.isArray(graph[s])) {
      for (let v of graph[s]) {
        if (!isExplored[v]) {
          dfsTopo(graph, v);
        }
      }
      curLabel -= 1;
      fValues[curLabel] = Number(s);
    }
  }

  for (let v = 0; v < nVertices; v++) {
    if (!isExplored[v]) {
      dfsTopo(graph, v);
    }
  }

  return fValues;
}

// Generate test graph
const testGraph = [
  [],
  [3],
  [4, 10],
  [5, 11],
  [7],
  [1, 7, 9],
  [10],
  [9],
  [6],
  [2, 4, 8],
  [8],
  [6, 8],
];

// Run algorithm
async function run() {
  const graph = await readGraph(__dirname + "/input-graph.txt");
  computeSCCs(graph);
}

run();
