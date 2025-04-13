import React, { useEffect, useState } from 'react';
import '../styles/views/landingPage.scss';

// Timeline data for releases
const timelineData = [
  {
    date: { month: 'May', year: '2023' },
    version: 'v0.1 Perl-Based CGI Version',
    description: 'Initial prototype release',
    features: 'Profile extraction, person/paper/conference search capabilities',
    position: 'left',
    isFuture: false
  },
  {
    date: { month: 'August', year: '2023' },
    version: 'v1.0 Java (Demo @ ASWC)',
    description: 'First major framework shift',
    features: 'Rewrite of core functions with improved architecture',
    position: 'right',
    isFuture: false
  },
  {
    date: { month: 'July', year: '2024' },
    version: 'v2.0 (Demo @ KDD, ISWC)',
    description: 'Enhanced research capabilities',
    features: 'Survey search, research interest analysis, association mapping',
    position: 'left',
    isFuture: false
  },
  {
    date: { month: 'April', year: '2025' },
    version: 'v3.0 (Demo @ WWW)',
    description: 'Intelligent platform upgrade',
    features: 'Query understanding, improved search GUI, comprehensive log analysis',
    position: 'right',
    isFuture: false
  },
  {
    date: { month: 'November', year: '2025' },
    version: 'v4.0 (Demo @ KDD, ICDM)',
    description: 'Advanced analytics platform',
    features: 'Machine learning algorithms, predictive citation analysis, research trend forecasting',
    position: 'left',
    isFuture: true
  },
  {
    date: { month: 'Q2', year: '2026' },
    version: 'v5.0 Research Ecosystem',
    description: 'Complete research platform',
    features: 'Global collaboration tools, institutional metrics, and comprehensive API access',
    position: 'right',
    isFuture: true
  }
];

const LandingPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a slight delay before showing the component for a better entry animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const scrollToContent = () => {
    const element = document.getElementById('landing-content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`landing-container ${isVisible ? 'visible' : ''}`}>
      {/* Scroll down arrow indicator */}
      <div className="scroll-indicator" onClick={scrollToContent}>
        <div className="scroll-text">Learn More</div>
        <div className="scroll-arrow">
          <i className="mdi mdi-chevron-down"></i>
        </div>
      </div>

      {/* Main landing content */}
      <div id="landing-content" className="landing-content">
        <section className="feature-section">
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="mdi mdi-account-network"></i>
              </div>
              <h3>Visualize Research Networks</h3>
              <p>Discover connections between researchers and their collaborations through interactive network visualizations.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="mdi mdi-book-open-page-variant"></i>
              </div>
              <h3>Explore Publications</h3>
              <p>Access detailed information about researchers' publications, citations, and academic influence.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="mdi mdi-source-branch"></i>
              </div>
              <h3>Find Connections</h3>
              <p>Identify paths and connections between researchers, institutions, and academic disciplines.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="mdi mdi-filter-variant"></i>
              </div>
              <h3>Filter & Analyze</h3>
              <p>Use powerful filtering tools to focus on specific institutions, research areas, or time periods.</p>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="timeline-section">
          <h2>Development Journey</h2>
          <div className="timeline-container">
            <div className="timeline-line"></div>
            
            {timelineData.map((item, index) => (
              <div 
                key={index} 
                className={`timeline-entry ${item.position}`}
              >
                <div className="timeline-date">
                  <div className="month">{item.date.month}</div>
                  <div className="year">{item.date.year}</div>
                </div>
                <div className="timeline-dot"></div>
                <div className={`timeline-content ${item.isFuture ? 'future' : ''}`}>
                  <div className="version">{item.version}</div>
                  <div className="description">{item.description}</div>
                  <div className="features">{item.features}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="about-section">
          <div className="about-content">
            <h2>About LinkedScholar</h2>
            <p>
              LinkedScholar is a research tool designed to help academics, students, and research institutions 
              visualize and explore academic collaboration networks. Our goal is to make research 
              connections more transparent and accessible.
            </p>
            <p>
              This alpha version includes data for authors with significant publications (10+ citations) 
              up to 2018. The final release will include comprehensive research data up to the present day.
            </p>
            <div className="cta-buttons">
              <a href="/contribute" className="cta-button primary">Contribute</a>
              <a href="/sponsor" className="cta-button secondary">Become a Sponsor</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;