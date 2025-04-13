import React, { useEffect, useState } from 'react';
import '../styles/views/landingPage.scss';

// Timeline data for releases
const timelineData = [
  {
    date: { month: 'April', year: '2025' },
    version: 'α Alpha Release',
    description: 'Initial alpha release',
    features: 'Database consisting of 3M Authors & 7M Papers.',
    position: 'right',
    isFuture: false
  },
  {
    date: { month: 'July', year: '2025' },
    version: 'β Beta Release',
    description: 'Beta release',
    features: 'Expanding the Database to 10M Authors & 200M Papers.',
    position: 'right',
    isFuture: true
  },
];

const LandingPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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
        <div className="scroll-text">Scroll to Learn More</div>
        <div className="scroll-arrow">
          <i className="mdi mdi-chevron-down"></i>
        </div>
      </div>

      {/* Main landing content */}
      <div id="landing-content" className="landing-content">
        {/* New Simplified Introduction Section */}
        <section className="intro-section">
          <div className="intro-content">
            <h2>What is LinkedScholar?</h2>
            <p className="intro-description">
              LinkedScholar is a powerful research tool designed to help academics, students, and research institutions 
              visualize and explore academic collaboration networks. Our platform makes it easy to discover connections 
              between researchers and their work, providing valuable insights into the scholarly landscape.
            </p>
            
            <div className="features-list">
              <h3>Key Features:</h3>
              <ul>
                <li>
                  <i className="mdi mdi-account-network"></i>
                  <span><strong>Research Network Visualization</strong> - Discover connections between researchers and their collaborations through interactive network visualizations.</span>
                </li>
                <li>
                  <i className="mdi mdi-book-open-page-variant"></i>
                  <span><strong>Publication Explorer</strong> - Access detailed information about researchers' publications, citations, and academic influence.</span>
                </li>
                <li>
                  <i className="mdi mdi-source-branch"></i>
                  <span><strong>Connection Finder</strong> - Identify paths and connections between researchers, institutions, and academic disciplines.</span>
                </li>
                <li>
                  <i className="mdi mdi-filter-variant"></i>
                  <span><strong>Advanced Filtering Tools</strong> - Focus on specific institutions, research areas, or time periods with powerful filtering capabilities.</span>
                </li>
              </ul>
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
          
          <div className="timeline-feedback">
            <div className="feedback-content">
              <h3>Have ideas or suggestions?</h3>
              <p>We're continuously improving LinkedScholar and would love to hear your thoughts on features you'd like to see in future releases.</p>
              <a href="/contact" className="feedback-button">
                <i className="mdi mdi-email-outline"></i> Contact Us
              </a>
            </div>
          </div>
        </section>

        <section className="support-section">
          <div className="support-content">
          <h2>
            <span className="highlight-primary">Support Linked</span>
            <span className="highlight-secondary">Scholar</span>
          </h2>
            <p>
              LinkedScholar is more than just a research tool — it's a mission to make academic collaboration more visible,
              accessible, and insightful for everyone. We're building a transparent and open map of the scholarly world, and 
              we need partners who believe in that vision.
            </p>
            <p>
              By sponsoring LinkedScholar, you directly support the development of open academic infrastructure. 
              Your contributions help us grow our dataset and expand our functionalities.
            </p>
            <div className="cta-buttons">
              <a href="/sponsor" className="cta-button primary">Become a Sponsor</a>
              <a href="/contribute" className="cta-button secondary">Other Ways to Contribute</a>
            </div>
          </div>
          <div className="sponsors-section">
            <h3>Current Sponsors</h3>
            <p>We&apos;re proud to be supported by organizations that believe in the future we are building.</p>
            <div className="sponsor-logos">
             <img src="/sponsors/eudita_logo.jpg" alt="Eudita" className="sponsor-logo" />
            </div>
           </div>
        </section>

      </div>
    </div>
  );
};

export default LandingPage;