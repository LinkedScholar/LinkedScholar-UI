import React, { useEffect, useState, useRef } from 'react';
import '../styles/components/Landing/landingPage.scss';
import KeyFigures from "./Landing/KeyFigures";

const timelineData = [
  {
    date: { month: 'April', year: '2025' },
    version: 'α Alpha Release',
    description: 'Research Intelligence Foundation',
    features: 'Database of 3M Authors & 7M Papers.\nResearch network mapping and institutional connections.\nBasic trend identification capabilities.',
    position: 'right',
    isFuture: false,
  },
  {
    date: { month: 'July', year: '2025' },
    version: 'β Beta Release',
    description: 'AI-Powered Business Intelligence',
    features: 'Expanded database to 10M Authors & 200M Papers.\nAI-driven trend detection and opportunity identification.\nAdvanced collaboration matching and risk assessment.\nCustomizable business intelligence dashboards.',
    position: 'right',
    isFuture: true,
  },
  {
    date: { month: 'Q2-3', year: '2026' },
    version: 'Enterprise Release',
    description: 'Complete R&D Transformation Platform',
    features: 'Predictive innovation forecasting.\nIntegrated project management and team building.\nReal-time competitive intelligence.\nCustom enterprise integrations and APIs.',
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
              <h2 className="h2-heading">Transform Research Into <span className="highlight-secondary">Results</span></h2>
              <p className="intro-description">
                LinkedScholar bridges the gap between research and real-world innovation, helping <span className="highlight-secondary">companies, startups, and institutions</span>
                navigate the global research ecosystem with clarity and purpose. <br></br> Our platform empowers you to <span className="highlight-secondary">discover relevant insights,
              connect with top research institutions, and accelerate your R&D</span> for competitive advantage in an intelligence-driven economy.
              </p>

              <div className="features-list">
                <h3>Platform Capabilities</h3>
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
                      description: 'Identify paths and connections between researchers and <span class="highlight-secondary">institutions</span> to discover collaboration opportunities.'
                    },
                    {
                      icon: 'mdi-trending-up',
                      title: 'AI-Powered Trend Detection',
                      description: 'Identify emerging <span class="highlight-secondary">technologies and scientific breakthroughs</span> with the highest potential to drive business innovation.'
                    },
                    {
                      icon: 'mdi-target',
                      title: 'Strategic R&D Alignment',
                      description: 'Align your <span class="highlight-secondary">R&D investments</span> with the latest state-of-the-art academic and industry advancements for maximum ROI.'
                    },
                    {
                      icon: 'mdi-shield-search',
                      title: 'Risk Assessment & Management',
                      description: 'Evaluate project risks, identify potential challenges, and develop <span class="highlight-secondary">mitigation strategies</span> based on comprehensive data analysis.'
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
            <h2 className="h2-heading">Product Roadmap</h2>
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
                      <p className="features">{item.features}</p>
                    </div>
                  </div>
              ))}
            </div>

            <div className="timeline-feedback">
              <div className="feedback-content">
                <h3>Ready to Transform Your R&D Strategy?</h3>
                <p>
                  Join forward-thinking organizations that are already using LinkedScholar to turn research knowledge into competitive advantage.
                  Let's discuss how we can accelerate your innovation journey.
                </p>
                <a href="/contact" className="feedback-button">
                  <i className="mdi mdi-calendar-outline"></i> Schedule a Demo
                </a>
              </div>
            </div>
          </section>

          <section className="support-section section-box">
            <div className="support-content">
              <h2>
                <span className="highlight-primary">Partner with Linked</span><span className="highlight-secondary">Scholar</span>
              </h2>
              <p>
                LinkedScholar is more than just a platform, it's your strategic partner in navigating the landscape of innovation.
                We're building an intelligent solution that transforms how organizations approach R&D, and we're looking for
                visionary partners who want to join us in our objective.
              </p>
              <p>
                By partnering with LinkedScholar, you gain access to our advanced intelligent solutions, industry insights,
                and priority access to emerging opportunities. Together, we can reshape how your industry approaches innovation and
                create sustainable competitive advantages that last.
              </p>

              <div className="cta-buttons">
                <a href="/sponsor" className="cta-button primary">
                  Become a Partner
                </a>
                <a href="/contact" className="cta-button secondary">
                  Enterprise Solutions
                </a>
              </div>
            </div>

            <div className="sponsors-section">
              <h3>Trusted by Industry Leaders</h3>
              <p>We're proud to work with the following organizations</p>
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