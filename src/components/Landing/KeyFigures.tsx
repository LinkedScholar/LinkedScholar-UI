import React, { useEffect, useState } from 'react';
import '../../styles/components/Landing/KeyFigures.scss';
import '@mdi/font/css/materialdesignicons.min.css';
import CountUp from 'react-countup';
import { getStatistics } from "../../services/ApiGatewayService";

const KeyFigures: React.FC = () => {
    const [statistics, setStatistics] = useState<{
        affiliation_count: number;
        article_count: number;
        author_count: number;
    } | null>(null);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const data = await getStatistics();
                setStatistics(data);
            } catch (err) {
                console.error('Failed to fetch statistics.');
            }
        };

        fetchStatistics();
    }, []);

    return (
        <div className="key-figures-wrapper">
            <h2 className="key-figures-heading">
                <span className="glow-text">Search Across a Growing Network of</span>
            </h2>

            {statistics && (
                <div className="key-figures-container">
                    <div className="key-figure">
                        <i className="mdi mdi-account-group" />
                        <span className="figure-value">
                            <CountUp end={statistics.author_count} duration={2.5} separator="," />
                        </span>
                        <span className="figure-label">Authors</span>
                    </div>
                    <div className="key-figure">
                        <i className="mdi mdi-file-document" />
                        <span className="figure-value">
                            <CountUp end={statistics.article_count} duration={2.5} separator="," />
                        </span>
                        <span className="figure-label">Articles</span>
                    </div>
                    <div className="key-figure">
                        <i className="mdi mdi-office-building" />
                        <span className="figure-value">
                            <CountUp end={statistics.affiliation_count} duration={2.5} separator="," />
                        </span>
                        <span className="figure-label">Research Institutions & Companies</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KeyFigures;
