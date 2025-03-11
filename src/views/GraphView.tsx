import React, { useState, useRef, useMemo } from "react";
import { useLocation } from "react-router-dom";
import ForceGraph from "../components/Graph/ForceGraph";
import Toolbar from "../components/Toolbar";
import MiniSearcher from "../components/MiniSearcher";
import ResearcherSidebar from "../components/Researcher-Sidebar/ResearcherSidebar";
import PathWindow from "../components/PathWindow";
import Filters from "../components/Filter-Sidebar/filters";
import { LinkDatum, NodeDatum } from "../types/graphTypes";
import { bfs } from "../utils/bfs";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/views/graphView.scss";

interface NetworkData {
  nodes: NodeDatum[];
  links: LinkDatum[];
}

const GraphView: React.FC = () => {
  const location = useLocation();
  const networkData: NetworkData | undefined = location.state?.networkData;

  // All hooks must be called regardless of networkData.
  const affiliations = useMemo(() => {
    if (!networkData) return [];
    const affSet = new Set<string>();
    networkData.nodes.forEach((node) => {
      if (node.affiliation) affSet.add(node.affiliation);
    });
    return Array.from(affSet);
  }, [networkData]);

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

  // Early return if no networkData is available AFTER all hooks are called.
  if (!networkData) {
    return <h2>No network data available</h2>;
  }

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
    setPathWindowOpen((prev) => !prev);
  };

  const handleBfsSearch = () => {
    if (!startNode || !targetNode) {
      alert("Please select both start and end nodes.");
      return;
    }

    const startId =
      networkData.nodes.find(
        (n) => n.name === startNode.value || n.id === startNode.value
      )?.id || startNode.value;

    let targetValue: string;
    if (targetType === "researcher") {
      const foundTarget = networkData.nodes.find(
        (n) => n.name === targetNode.value || n.id === targetNode.value
      );
      if (!foundTarget) {
        alert("Researcher target not found in the network.");
        return;
      }
      targetValue = foundTarget.id;
    } else {
      targetValue = targetNode.value;
    }

    const path = bfs(startId, targetValue, networkData.nodes, networkData.links, targetType);

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

  return (
    <div className="graph-view-container">
      <div className="container position-absolute start-50 translate-middle-x mt-5 pt-5">
        <div className="row justify-content-between align-items-center">
          <div className="col-auto">
            <MiniSearcher />
          </div>
          <div className="col-auto">
            <Toolbar
              gridActive={gridActive}
              filtersActive={filtersActive}
              pathWindowActive={pathWindowOpen}
              toggleGrid={() => setGridActive((prev) => !prev)}
              toggleFilters={() => setFiltersActive((prev) => !prev)}
              togglePathWindow={togglePathWindow}
              resetSimulation={() => forceGraphRef.current?.resetSimulation()}
            />
          </div>
        </div>
      </div>

      {filtersActive && (
        <div className="position-absolute" style={{ top: "160px", left: "80px", zIndex: 1000 }}>
          <Filters
            affiliations={affiliations}
            selectedAffiliations={selectedAffiliations}
            onFilterChange={setSelectedAffiliations}
            onClose={() => setFiltersActive(false)}
          />
        </div>
      )}

      {pathWindowOpen && (
        <div className="position-absolute" style={{ top: "160px", left: "80px", zIndex: 1000 }}>
          <PathWindow
            bfsPath={bfsPath}
            nodes={networkData.nodes}
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
          nodes={networkData.nodes}
          links={networkData.links}
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
