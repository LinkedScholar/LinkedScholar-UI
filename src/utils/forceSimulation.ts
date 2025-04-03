import * as d3 from "d3";
import { NodeDatum, LinkDatum } from "../types/graphTypes";

// --- CONFIGURABLE LAYOUT CONSTANTS ---
const AUTHOR_AUTHOR_DISTANCE = 100;
const AUTHOR_ARTICLE_DISTANCE = 200;

const AUTHOR_REPULSION = -400;
const ARTICLE_REPULSION = -150;

const AUTHOR_COLLISION_RADIUS = 40;
const ARTICLE_COLLISION_RADIUS = 20;

const CENTER_FORCE_STRENGTH = 0.15;

// -------------------------------------

export const createForceSimulation = (
    nodes: NodeDatum[],
    links: LinkDatum[],
    width: number,
    height: number
): d3.Simulation<NodeDatum, undefined> => {
    return d3
        .forceSimulation<NodeDatum>(nodes)

        .force(
            "link",
            d3
                .forceLink<NodeDatum, LinkDatum>(links)
                .id((d) => d.id)
                .distance((link) => {
                    const source = link.source as NodeDatum;
                    const target = link.target as NodeDatum;

                    const isAuthorArticleLink =
                        (source.type === "article" && target.type === "author") ||
                        (target.type === "article" && source.type === "author");

                    return isAuthorArticleLink ? AUTHOR_ARTICLE_DISTANCE : AUTHOR_AUTHOR_DISTANCE;
                })
        )

        .force(
            "charge",
            d3.forceManyBody<NodeDatum>().strength((node: NodeDatum) => {
                return node.type === "author" ? AUTHOR_REPULSION : ARTICLE_REPULSION;
            })
        )

        .force(
            "collision",
            d3.forceCollide<NodeDatum>().radius((node: NodeDatum) => {
                return node.type === "author" ? AUTHOR_COLLISION_RADIUS : ARTICLE_COLLISION_RADIUS;
            })
        )

        .force("x", d3.forceX<NodeDatum>(width / 2).strength(CENTER_FORCE_STRENGTH))
        .force("y", d3.forceY<NodeDatum>(height / 2).strength(CENTER_FORCE_STRENGTH))

        .force("center", d3.forceCenter(width / 2, height / 2));
};
