import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import ForceGraph from "../components/graph/ForceGraph";
import {RootState} from "../redux/store";
import {LinkDatum, NodeDatum} from "../types/graphTypes";

interface NetworkData {
    nodes: NodeDatum[];
    links: LinkDatum[];
}

const GraphView: React.FC = () => {
    const location = useLocation();
    const { username, authenticated } = useSelector((state: RootState) => state.auth);
    const networkData: NetworkData | undefined = location.state?.networkData;

    if (!networkData) {
        return <h2>No network data available</h2>;
    }

    return (
        <div>
            <header style={{ padding: "1rem", background: "#f0f0f0" }}>
                <h2>Network Graph</h2>
                {authenticated && username && <p>Logged in as: {username}</p>}
            </header>
            <ForceGraph nodes={networkData.nodes} links={networkData.links} />
        </div>
    );
};

export default GraphView;
