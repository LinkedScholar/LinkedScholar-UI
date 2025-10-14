import React, { useEffect, useState, useRef } from 'react';
import '../styles/components/Landing/landingPage.scss';
import KeyFigures from "./Landing/KeyFigures";
import PlatformCapabilities from './Landing/PlatformCapabilities';
import SolutionOverview from './Landing/SolutionsOverview';

const LandingPage: React.FC = () => {
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const landingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const data = [
    { value: 85, label: 'Performance', color: 'bg-blue-500' },
    { value: 92, label: 'Quality', color: 'bg-green-500' },
    { value: 78, label: 'Efficiency', color: 'bg-purple-500' }
  ];

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

        <div id="landing-content" className="landing-content" ref={contentRef}>
          <section className="key-figures-section section-box">
            <KeyFigures />
          </section>

          <SolutionOverview></SolutionOverview>

          <div className="intro-content">
            <div className="features-list">
              <PlatformCapabilities />
            </div>
          </div>

          <section className="support-section section-box">
            <div className="support-content">
              <h2>
                <span className="highlight-primary">Support Linked</span>
                <span className="highlight-secondary">Scholar</span>
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

              <div className="sponsors-section">
                <h3>Trusted by Industry Leaders</h3>
                <p>We're proud to work with the following organizations</p>
                <div className='sponsor-logos-container'>
                  <div className="sponsor-logos">
                    <a href="https://eudita.es/" target="_blank" rel="noopener noreferrer">
                      <img src="/sponsors/eudita_logo.jpg" alt="Eudita" className="sponsor-logo" />
                    </a>
                  </div>
                  <div className="sponsor-logos">
                    <a href="https://i2c.tuwien.ac.at/" target="_blank" rel="noopener noreferrer">
                      <img src="/sponsors/tuw_i2c.png" alt="TU Wien I²C" className="sponsor-logo" />
                    </a>
                  </div>
                </div>
                
              </div>
            </div>
          </section>
        </div>

        {showScrollUp && (
            <button className="scroll-up-button" onClick={scrollToTop}>
              <i className="mdi mdi-chevron-up"></i>
            </button>
        )}
      </div>
  );
};

export default LandingPage;