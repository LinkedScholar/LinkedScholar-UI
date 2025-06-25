import React, { useEffect, useState } from 'react';
import '../../styles/components/Landing/KeyFigures.scss';
import '../../styles/components/Landing/KeyFiguresCard.scss';
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
        
        {/*statistics && */(
            <div className="key-figures-container">
                
                <div className="triangleContainer">
                    {/* Connecting lines */}
                    <svg className="connecting-lines">
                        {/* Line from top to bottom left */}
                        <line x1="24%" y1="25%" x2="24%" y2="81%" stroke="#9CA3AF" strokeWidth="3" strokeDasharray="5,5" />
                        {/* Line from top to bottom right */}
                        <line x1="24%" y1="25%" x2="76%" y2="33%" stroke="#9CA3AF" strokeWidth="3" strokeDasharray="5,5" />
                        {/* Line from bottom left to bottom right */}
                        <line x1="24%" y1="81%" x2="76%" y2="33%"  stroke="#9CA3AF" strokeWidth="3" strokeDasharray="5,5" />
                    </svg>  
                    

                    <div className='circle circle-background'>
                    </div>
                    <div className='circle circle-top-left'>
                        <span className="circleText">
                            <CountUp end={statistics?.affiliation_count ?? 0} duration={2.5} separator="," />
                        </span>
                        <span className='label'>
                            Research Institutions<br></br> and Companies
                        </span>
                    </div>

                    <div className='circle circle-bottom-left'>
                        <span className="circleText">
                        <CountUp end={statistics?.author_count ?? 0} duration={2.5} separator="," />

                        </span>
                        <span className='label'>
                            Authors
                        </span>
                    </div>
                    <div className='circle circle-top-right'>
                        <span className="circleText">
                        <CountUp end={statistics?.article_count ?? 0} duration={2.5} separator="," />

                        </span>
                        <span className='label'>
                            Articles
                        </span>
                    </div>
                        
                </div>

                <div className="card-container">
                    <div className="cloud-image-section">
                        <img src="/images/researcher_page.png"
                            className="cloud-image"/>
                    </div>

                    <div className="content-section">
                    <h2 className="h2-heading">Transform Research Into <span className="highlight-secondary">Results</span></h2>
                    <p className="description">
                        LinkedScholar bridges the gap between research and real-world innovation, helping <span className="highlight-secondary">companies, startups and research institutions</span> to
                        navigate the global research ecosystem with clarity and purpose. <br></br> Our platform empowers you to <span className="highlight-secondary">discover relevant insights,
                    connect with top research institutions, and accelerate your R&D</span> for competitive advantage in an intelligence-driven economy.
                    </p>
                        <div className="button-wrapper">
                            <button className="learn-more-button">Learn more</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </div>
    );
};

export default KeyFigures;