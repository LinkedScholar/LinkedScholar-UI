import { LinkDatum, NodeDatum } from "../types/graphTypes";

export const bfs = (
    startNodeId: string,
    target: string,
    nodes: NodeDatum[],
    links: LinkDatum[],
    targetType: "author" | "affiliation"
): string[] | null => {
    // Build adjacency list
    const adjacencyList: Record<string, string[]> = {};

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
    if (targetType === "author") {
        if (!adjacencyList[target]) {
            return null;
        }
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

        if (targetType === "author") {
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
        } else if (targetType === "affiliation") {
            // For affiliation, check if the current node's affiliation matches the target.
            const currentNodeData = nodes.find(node => node.id === currentNode);
            if (
                currentNodeData &&
                (
                    (Array.isArray(currentNodeData.affiliation) && currentNodeData.affiliation.includes(target)) ||
                    currentNodeData.affiliation === target
                )
            ) {
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
