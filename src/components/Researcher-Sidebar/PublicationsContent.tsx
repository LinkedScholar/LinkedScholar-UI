import React, { useEffect, useState } from "react";
import { NodeDatum } from "../../types/graphTypes";
import {getArticlesFromAuthor} from "../../services/ApiGatewayService";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import "../../styles/components/publicationsContent.scss";

interface Publication {
    author: string;
    booktitle: string;
    cdrom: string;
    cite: string;
    crossref: string;
    editor: string;
    ee: string[];
    id: string;
    journal: string;
    month: string;
    number: string;
    pages: string;
    publnr: string;
    stream: string;
    title: string;
    url: string;
    volume: string;
    year: string;
}

const PublicationCard: React.FC<{ publication: Publication }> = ({ publication }) => {

    return (
        <div className="publication-card">
            <h3 className="pub-title">{publication.title}</h3>
            <p className="pub-author">
                <strong>Author:</strong> {publication.author}
            </p>
            <p className="pub-journal">
                <strong>Journal:</strong> {publication.journal}
            </p>
            <p className="pub-year">
                <strong>Year:</strong> {publication.year}
            </p>
            {publication.volume && (
                <p className="pub-volume">
                    <strong>Volume:</strong> {publication.volume}
                </p>
            )}
            {publication.number && (
                <p className="pub-number">
                    <strong>Number:</strong> {publication.number}
                </p>
            )}
            {publication.pages && (
                <p className="pub-pages">
                    <strong>Pages:</strong> {publication.pages}
                </p>
            )}
            {publication.url && (
                <a
                    href={publication.url.startsWith("http") ? publication.url : `https://${publication.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pub-link"
                >
                    View Publication
                </a>
            )}
        </div>
    );
};

interface PublicationsContentProps {
    selectedNode: NodeDatum;
}

const PublicationsContent: React.FC<PublicationsContentProps> = ({ selectedNode }) => {
    const [publications, setPublications] = useState<Publication[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { authenticated, status } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!selectedNode) return;
        const fetchPublications = async () => {
            setLoading(true);
            try {
             // TODO remove or add in network request
                const source = "dblp";
                const data = await getArticlesFromAuthor(authenticated, selectedNode.name.toString(), source);
                setPublications(Array.isArray(data) ? data : data.publications);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching publications:", err);
                setError("Failed to load publications.");
                setLoading(false);
            }
        };
        fetchPublications();
    }, [selectedNode]);

    if (loading) {
        return (
            <div className="sidebar-content">
                <p>Loading publications...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="sidebar-content">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="sidebar-content publications">
            {publications.map((pub) => (
                <PublicationCard key={pub.id} publication={pub} />
            ))}
        </div>
    );
};

export default PublicationsContent;
