import React, { useEffect, useState, useRef } from 'react';
import '../styles/components/Landing/landingPage.scss';
import KeyFigures from "./Landing/KeyFigures";

const timelineData = [
  {
    date: { month: 'April', year: '2025' },
    version: 'α Alpha Release',
    description: 'Initial alpha release',
    features: 'Database consisting of 3M Authors & 7M Papers. Shortest Path between researchers and affiliations',
    position: 'right',
    isFuture: false,
  },
  {
    date: { month: 'July', year: '2025' },
    version: 'β Beta Release',
    description: 'Beta release',
    features: 'Expanding the Database to 10M Authors & 200M Papers. Knowledge graph data ingestion. Research synergy and recommendation. ',
    position: 'right',
    isFuture: true,
  },
  {
    date: { month: 'Q2-3', year: '2026' },
    version: 'Stable Release',
    description: 'Complete implementation of base use cases',
    features: 'TBD',
    position: 'right',
    isFuture: true,
  },
];

const LandingPage: React.FC = () => {
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const landingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollUp(true);
      } else {
        setShowScrollUp(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToContent = () => {
    const element = document.getElementById('landing-content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    if (landingRef.current) {
      landingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={landingRef} className="page-container">
      <div className="scroll-indicator" onClick={scrollToContent}>
        <div className="scroll-text">Scroll to Learn More</div>
        <div className="scroll-arrow">
          <i className="mdi mdi-chevron-down"></i>
        </div>
      </div>

      {showScrollUp && (
        <div className="scroll-up-indicator" onClick={scrollToTop}>
          <div className="scroll-arrow">
            <i className="mdi mdi-chevron-up"></i>
          </div>
          <div className="scroll-text">Back to Top</div>
        </div>
      )}

      <div id="landing-content" className="landing-content" ref={contentRef}>
        <section className="key-figures-section section-box">
          <KeyFigures />
        </section>

        <section className="section-box">
          <div className="intro-content">
            <h2 className="h2-heading">What is Linked<span className="highlight-secondary">Scholar</span>?</h2>
            <p className="intro-description">
              LinkedScholar is a powerful research tool designed <span className="highlight-secondary">to help academics, students, and research institutions </span>
              visualize and explore academic networks. <br></br> Our platform makes it easy  <span className="highlight-secondary">to discover connections
              between researchers and their work</span>, providing valuable insights into the scholarly landscape.
            </p>

            <div className="features-list">
              <h3>Key Features</h3>
              <div className="feature-grid">
                {[
                  {
                    icon: 'mdi-account-network',
                    title: 'Research Network Visualization',
                    description: 'Discover connections between researchers and their collaborations through interactive <span class="highlight-secondary">network visualizations</span>.'
                  },
                  {
                    icon: 'mdi-book-open-page-variant',
                    title: 'Publication Explorer',
                    description: 'Access detailed information about researcher\'s <span class="highlight-secondary">publications</span>, <span class="highlight-secondary">journals</span>, and <span class="highlight-secondary">affiliations</span>.'
                  },
                  {
                    icon: 'mdi-source-branch',
                    title: 'Connection Finder',
                    description: 'Identify paths and connections between researchers and <span class="highlight-secondary">institutions</span>.'
                  },
                  {
                    icon: 'mdi-filter-variant',
                    title: 'Filtering Tools',
                    description: 'Focus on specific institutions with the help of our <span class="highlight-secondary">filtering capabilities</span>.'
                  }
                ].map((feature, index) => (
                  <div
                    key={index}
                    onMouseEnter={() => setActiveFeature(index)}
                    onMouseLeave={() => setActiveFeature(null)}
                    className={`feature-item ${activeFeature === index ? 'active-feature' : ''}`}
                  >
                    <i className={`mdi ${feature.icon}`}></i>
                    <div className="feature-text">
                      <strong>{feature.title}</strong>
                      <p dangerouslySetInnerHTML={{ __html: feature.description }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="timeline-section section-box">
          <h2 className="h2-heading">Development Journey</h2>
          <div className="timeline-container">
            <div className="timeline-line"></div>
            {timelineData.map((item, index) => (
              <div key={index} className={`timeline-entry ${item.position}`}>
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
              <p>
                We're continuously improving LinkedScholar and would love to hear your thoughts on features you'd like to
                see in future releases.
              </p>
              <a href="/contact" className="feedback-button">
                <i className="mdi mdi-email-outline"></i> Contact Us
              </a>
            </div>
          </div>
        </section>

        <section className="support-section section-box">
          <div className="support-content">
            <h2>
              <span className="highlight-primary">Support Linked</span><span className="highlight-secondary">Scholar</span>
            </h2>
            <p>
              LinkedScholar is more than just a research tool — it's a mission to make academic collaboration more
              visible, accessible, and insightful for everyone. We're building a transparent and open map of the
              scholarly world, and we need partners who believe in that vision.
            </p>
            <p>
              By sponsoring LinkedScholar, you directly support the development of open academic infrastructure. Your
              contributions help us grow our dataset, enhance our visualizations, and keep the platform freely available
              to researchers, students, and institutions worldwide.
            </p>
            
            <div className="cta-buttons">
              <a href="/sponsor" className="cta-button primary">
                Become a Sponsor
              </a>
              <a href="/contribute" className="cta-button secondary">
                Other Ways to Contribute
              </a>
            </div>
          </div>
          
          <div className="sponsors-section">
            <h3>Current Sponsors</h3>
            <p>We're proud to be supported by organizations that believe in the future we are building.</p>
            <div className="sponsor-logos">
              <a href="https://eudita.es/" target="_blank" rel="noopener noreferrer">
                <img src="/sponsors/eudita_logo.jpg" alt="Eudita" className="sponsor-logo" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;