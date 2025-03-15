import React, { useState, useRef, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ForceGraph from "../components/Graph/ForceGraph";
import Toolbar from "../components/Toolbar";
import ResearcherSidebar from "../components/Researcher-Sidebar/ResearcherSidebar";
import PathWindow from "../components/PathWindow";
import Filters from "../components/Filter-Sidebar/filters";
import { LinkDatum, NodeDatum } from "../types/graphTypes";
import { bfs } from "../utils/bfs";
import { getPath } from "../services/ApiGatewayService";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/views/graphView.scss";
import {RootState} from "../redux/store";

interface NetworkData {
    nodes: NodeDatum[];
    links: LinkDatum[];
}

const GraphView: React.FC = () => {
    const location = useLocation();
    const rawNetworkData: any = location.state?.networkData;


    const computedNetworkData: NetworkData = useMemo(() => {
        if (!rawNetworkData) {
            return { nodes: [], links: [] };
        }
        if (rawNetworkData.authors && rawNetworkData.articles) {
            const authors: NodeDatum[] = rawNetworkData.authors.map((author: any) => ({
                ...author,
                type: "researcher",
            }));
            const articles: NodeDatum[] = rawNetworkData.articles.map((article: any) => ({
                id: article.id,
                type: "article",
                title: article.title,
                name: article.title, // Use title as name for uniform labeling
            }));
            return {
                nodes: [...authors, ...articles],
                links: rawNetworkData.links,
            };
        }
        return rawNetworkData;
    }, [rawNetworkData]);

    // Create a state variable to hold and update your graph data.
    // (Always initialized even if empty.)
    const [graphData, setGraphData] = useState<NetworkData>(computedNetworkData);

    // Update graphData state when computedNetworkData changes.
    useEffect(() => {
        setGraphData(computedNetworkData);
    }, [computedNetworkData]);

    // Collect affiliations from researcher nodes.
    const affiliations = useMemo(() => {
        const affSet = new Set<string>();
        graphData.nodes.forEach((node) => {
            if (node.affiliation) affSet.add(node.affiliation);
        });
        return Array.from(affSet);
    }, [graphData]);

    const forceGraphRef = useRef<{ resetSimulation: () => void } | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodeDatum | null>(null);
  const [gridActive, setGridActive] = useState(false);
  const [filtersActive, setFiltersActive] = useState(false);
  const [pathWindowOpen, setPathWindowOpen] = useState(false);
  const [startNode, setStartNode] = useState<{ value: string; label: string } | null>(null);
  const [targetNode, setTargetNode] = useState<{ value: string; label: string } | null>(null);
  const [bfsPath, setBfsPath] = useState<string[] | null>(null);
  const [targetType, setTargetType] = useState<"Affiliation" | "researcher">("Affiliation");
  const [selectedAffiliations, setSelectedAffiliations] = useState<string[]>([]);

  const { authenticated, status } = useSelector((state: RootState) => state.auth);

  const handleNodeClick = (node: NodeDatum | null) => {
    setSelectedNode(node);
    if (node) {
      setStartNode({ value: node.id.toString(), label: node.name || node.id.toString() });
    }
  };

  const handleCloseSidebar = () => {
    setSelectedNode(null);
  };

  const togglePathWindow = () => {
    setPathWindowOpen(prev => !prev);
    if (!pathWindowOpen && filtersActive) {
      setFiltersActive(false);
    }
  };


  const handleBfsSearch = async () => {
    if (!startNode || !targetNode) {
      alert("Please select both start and end nodes.");
      return;
    }

    let updatedNodes = [...graphData.nodes];
    let updatedLinks = [...graphData.links];

    const startData = graphData.nodes.find(
        (n) => n.name === startNode.value || n.id.toString() === startNode.value
    );

    let targetData = null;
    if (targetType === "researcher") {
      targetData = graphData.nodes.find(
          (n) => n.name === targetNode.value || n.id.toString() === targetNode.value
      );
    }

    if (!startData || (targetType === "researcher" && !targetData)) {
      try {
        const source = "dblp"
        const newPathData = await getPath(authenticated, startNode.label, targetNode.value, source);
        let parsedPathData = newPathData;
        if (typeof newPathData === "string") {
          try {
            parsedPathData = JSON.parse(newPathData);
          } catch (e) {
            console.error("Failed to parse getPath response:", e);
            throw e;
          }
        }
        let newNodes: any[] = [];
        if (parsedPathData.articles || parsedPathData.authors) {
          if (parsedPathData.articles) {
            newNodes = newNodes.concat(
                parsedPathData.articles.map((article: any) => ({
                  id: article.id,
                  type: "article",
                  title: article.title,
                  name: article.title,
                }))
            );
          }
          if (parsedPathData.authors) {
            newNodes = newNodes.concat(
                parsedPathData.authors.map((author: any) => ({
                  ...author,
                  type: "researcher",
                }))
            );
          }
        } else if (parsedPathData.nodes) {
          newNodes = parsedPathData.nodes;
        }
        const newLinks = parsedPathData.links || [];

        // Append new nodes (avoiding duplicates) and links.
        newNodes.forEach((node: any) => {
          if (!updatedNodes.find((n) => n.id === node.id)) {
            updatedNodes.push(node);
          }
        });
        newLinks.forEach((link: any) => {
          updatedLinks.push(link);
        });
        setGraphData({ nodes: updatedNodes, links: updatedLinks });
      } catch (error) {
        console.error("Error fetching path:", error);
        return;
      }
    }

    const finalStartData = updatedNodes.find(
        (n) => n.name === startNode.value || n.id.toString() === startNode.value
    );
    const startId = finalStartData ? finalStartData.id : startNode.value;

    let targetValue: string;
    if (targetType === "researcher") {
      const finalTargetData = updatedNodes.find(
          (n) => n.name === targetNode.value || n.id.toString() === targetNode.value
      );
      if (!finalTargetData) {
        alert("Researcher target not found in the network.");
        return;
      }
      targetValue = finalTargetData.id;
    } else {
      targetValue = targetNode.value;
    }

    const path = bfs(startId, targetValue, updatedNodes, updatedLinks, targetType);
    if (path) {
      setBfsPath(path);
    } else {
      alert("No path found between the selected nodes.");
      setBfsPath(null);
    }
  };

  const handleClearBfsSearch = () => {
    setStartNode(null);
    setTargetNode(null);
    setBfsPath(null);
  };

  const toggleFilters = () => {
    setFiltersActive(prev => !prev);
    if (!filtersActive && pathWindowOpen) {
      setPathWindowOpen(false); // Close path window when opening filters
    }
  };

  if (graphData.nodes.length === 0 && graphData.links.length === 0) {
    return <h2>No network data available</h2>;
  }

    return (
      <div className="graph-view-container">
        <div className="position-absolute" style={{ top: "100px", left: "80px", zIndex: 1000 }}>
          <Toolbar
            gridActive={gridActive}
            filtersActive={filtersActive}
            pathWindowActive={pathWindowOpen}
            toggleGrid={() => setGridActive((prev) => !prev)}
            toggleFilters={toggleFilters}
            togglePathWindow={togglePathWindow}
            resetSimulation={() => forceGraphRef.current?.resetSimulation()}
          />
        </div>

        {filtersActive && (
          <div className="position-absolute" style={{ top: "180px", left: "80px", zIndex: 1000 }}>
            <Filters
                affiliations={affiliations}
                selectedAffiliations={selectedAffiliations}
                onFilterChange={setSelectedAffiliations}
                onClose={() => setFiltersActive(false)}
            />
          </div>
      )}

        {pathWindowOpen && (
            <div className="position-absolute" style={{ top: "180px", left: "80px", zIndex: 1000 }}>
              <PathWindow
                  bfsPath={bfsPath}
                  nodes={graphData.nodes}
                  expanded={true}
                  setExpanded={(expanded) => {
                    if (!expanded) setPathWindowOpen(false);
                  }}
                  startNode={startNode}
                  setStartNode={setStartNode}
                  targetType={targetType}
                  setTargetType={setTargetType}
                  targetNode={targetNode}
                  setTargetNode={setTargetNode}
                  handleSearch={handleBfsSearch}
                  handleClearSearch={handleClearBfsSearch}
              />
            </div>
        )}

        <div className="graph-container">
          <ForceGraph
              nodes={graphData.nodes}
              links={graphData.links}
              onNodeClick={handleNodeClick}
              gridActive={gridActive}
              bfsPath={bfsPath}
              selectedAffiliations={selectedAffiliations}
          />
        </div>

        <ResearcherSidebar selectedNode={selectedNode} onClose={handleCloseSidebar} />
      </div>
  );
};

export default GraphView;
