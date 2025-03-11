import {LinkDatum, NodeDatum} from "../types/graphTypes";


/**
 * Perform BFS to find the shortest path between two nodes.
 * @param startNodeId - The ID of the starting node.
 * @param targetNodeId - The ID of the target node.
 * @param nodes - The list of all nodes.
 * @param links - The list of all links.
 * @returns An array of node IDs representing the shortest path, or null if no path is found.
 */
export const bfs = (
    startNodeId: string,
    targetNodeId: string,
    nodes: NodeDatum[],
    links: LinkDatum[]
): string[] | null => {
    // Build adjacency list
    const adjacencyList: Record<string, string[]> = {};

    // Initialize adjacency for all node IDs to ensure each node is represented
    nodes.forEach((node) => {
        adjacencyList[node.id] = [];
    });

    // Populate adjacency list based on links
    links.forEach((link) => {
        const source = link.source.toString();
        const target = link.target.toString();

        adjacencyList[source].push(target);
        adjacencyList[target].push(source);
    });

    // Early exit: if the start or target node doesn't exist
    if (!adjacencyList[startNodeId] || !adjacencyList[targetNodeId]) {
        return null;
    }

    // Set for visited nodes
    const visited = new Set<string>();
    visited.add(startNodeId);

    // Parent map to rebuild path after BFS succeeds
    const parent: Record<string, string | null> = {};
    parent[startNodeId] = null;

    // Pointer-based queue
    const queue: string[] = [startNodeId];
    let head = 0; // Points to the current item in the queue

    // BFS
    while (head < queue.length) {
        const currentNode = queue[head++];

        if (currentNode === targetNodeId) {
            // Reconstruct path if we've reached the target
            const path = [];
            let node: string | null = currentNode;
            while (node !== null) {
                path.push(node);
                node = parent[node];
            }
            return path.reverse();
        }

        // Enqueue neighbors
        for (const neighbor of adjacencyList[currentNode]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                parent[neighbor] = currentNode;
                queue.push(neighbor);
            }
        }
    }

    // No path found
    return null;
};
