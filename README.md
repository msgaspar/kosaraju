# Kosaraju's algorithm

Kosaraju's algorithm is a linear time algorithm to find the strongly connected components of a directed graph. It is based on two series of depth-first search, with the first applied in the input graph with reversed edges, and on the topological sort of the vertices.

Further information can be found on chapter 8.6 of the Algorithms Illuminated Part 2 book, written by Tim Roughgarden (or in [his website](http://www.algorithmsilluminated.org/)).

## The problem

The input file contains the edges of a directed graph. Vertices are labeled as positive integers from 1 to 875714. Every row indicates an edge, the vertex label in first column is the tail and the vertex label in second column is the head (recall the graph is directed, and the edges are directed from the first column vertex to the second column vertex). So for example, the 11th row looks like : "2 47646". This just means that the vertex with label 2 has an outgoing edge to the vertex with label 47646.

The task is to code the Kosaraju's algorithm for computing Strongly Connected Components (SCCs), and to run this algorithm on the given graph.

You should output the sizes of the 5 largest SCCs in the given graph, in decreasing order of sizes.

## Implementation

This implementation applied a recursive approach for the depth-first search algorithm. Therefore, if the size of the input file is too large, stack overflow may occur. The algorithm can still be run by increasing the maximum stack size. Another solution would be to implement an iterative approach for the depth-first search.
