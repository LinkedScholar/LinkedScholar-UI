import React, { useEffect, useState } from "react";
import { NodeDatum } from "../../types/graphTypes";
import { getArticlesFromAuthor } from "../../services/ApiGatewayService";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "../../styles/components/publicationsContent.scss";

interface Publication {
    authors: string[];
    ee?: string[];
    id: string;
    journal?: string;
    pages?: string;
    title: string;
    url?: string;
    volume?: string;
    year: string;
}

const PublicationCard: React.FC<{ publication: Publication }> = ({ publication }) => {
    return (
        <div className="publication-card">
            <h3 className="pub-title">{publication.title}</h3>
            <div>
                <p className="pub-year"><strong>Year:</strong> {publication.year}</p>
                <p className="pub-author"><strong>Authors: </strong>
                    {publication.authors.map((author, index) => (
                        <span key={index}>{author}, </span>
                    ))}</p>
                {publication.journal & publication.journal!="null" && <p className="pub-journal"><strong>Journal:</strong> {publication.journal}</p>}
                {publication.volume & publication.volume!="null" && <p className="pub-volume"><strong>Volume:</strong> {publication.volume}</p>}
                {publication.pages & publication.pages!="null" && <p className="pub-pages"><strong>Pages:</strong> {publication.pages}</p>}
            </div>
            {publication.url && (
                <a
                    href={publication.url}
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
    const { authenticated } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!selectedNode) return;

        const fetchPublications = async () => {
            setLoading(true);
            try {
                const data = await getArticlesFromAuthor(authenticated, selectedNode.name.toString());
                const sortedPublications = (Array.isArray(data) ? data : data.publications)
                    .sort((a: Publication, b: Publication) => Number(b.year) - Number(a.year)); // Sorting from recent to old

                setPublications(sortedPublications);
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
