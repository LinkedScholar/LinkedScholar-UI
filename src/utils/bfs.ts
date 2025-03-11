import { LinkDatum, NodeDatum } from "../types/graphTypes";

/**
 * Perform BFS to find the shortest path between two nodes.
 * For targetType "researcher", the target is a researcher node id.
 * For targetType "Affiliation", the target is an affiliation string and BFS stops when any node with that affiliation is reached.
 * @param startNodeId - The ID of the starting node.
 * @param target - The target, either a researcher node id or an affiliation.
 * @param nodes - The list of all nodes.
 * @param links - The list of all links.
 * @param targetType - Specifies whether the target is a "researcher" or "Affiliation".
 * @returns An array of node IDs representing the shortest path, or null if no path is found.
 */
export const bfs = (
    startNodeId: string,
    target: string,
    nodes: NodeDatum[],
    links: LinkDatum[],
    targetType: "researcher" | "Affiliation"
): string[] | null => {
    // Build adjacency list
    const adjacencyList: Record<string, string[]> = {};

    // Initialize adjacency for all node IDs to ensure each node is represented
    nodes.forEach((node) => {
        adjacencyList[node.id] = [];
    });

    // Populate adjacency list based on links
    links.forEach((link) => {
        // If link.source or link.target is an object, use its id; otherwise use the value directly.
        const source = typeof link.source === "object" ? link.source.id : link.source;
        const targetLink = typeof link.target === "object" ? link.target.id : link.target;

        if (adjacencyList[source]) {
            adjacencyList[source].push(targetLink);
        }
        if (adjacencyList[targetLink]) {
            adjacencyList[targetLink].push(source);
        }
    });

    // Early exit for start node and, for researcher target, if the target node doesn't exist.
    if (!adjacencyList[startNodeId]) {
        return null;
    }
    if (targetType === "researcher") {
        if (!adjacencyList[target]) {
            return null;
        }
    }
    // For "Affiliation", we remove the early exit so that the BFS will search through all nodes.

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

        if (targetType === "researcher") {
            // For researcher, check if we've reached the target id.
            if (currentNode === target) {
                const path: string[] = [];
                let node: string | null = currentNode;
                while (node !== null) {
                    path.push(node);
                    node = parent[node];
                }
                return path.reverse();
            }
        } else if (targetType === "Affiliation") {
            // For affiliation, check if the current node's affiliation matches the target.
            const currentNodeData = nodes.find(node => node.id === currentNode);
            if (currentNodeData && currentNodeData.affiliation === target) {
                const path: string[] = [];
                let node: string | null = currentNode;
                while (node !== null) {
                    path.push(node);
                    node = parent[node];
                }
                return path.reverse();
            }
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
