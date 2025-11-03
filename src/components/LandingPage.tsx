import React, { useEffect, useState, useRef } from 'react';
import '../styles/components/Landing/landingPage.scss';

const LandingPage: React.FC = () => {
  const [showScrollUp, setShowScrollUp] = useState(false);
  const landingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setShowScrollUp(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContent = () => {
    const element = document.getElementById('landing-content');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    if (landingRef.current) landingRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
      <div ref={landingRef} className="page-container">
        {/* ================= Hero Section ================= */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Transform Institutional Data into
              <span className="hero-gradient"> Living Knowledge Networks</span>
            </h1>
            <p className="hero-subtitle">
              From fragmented silos to interoperable knowledge. From static records to explainable research intelligence.
              <br />
              <strong>AI-Driven. Federated. European.</strong>
            </p>

            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-value">10+</div>
                <div className="stat-label">Integrated Components</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">5+</div>
                <div className="stat-label">AI Modules</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">100%</div>
                <div className="stat-label">Data Sovereign</div>
              </div>
            </div>

            <div className="hero-cta">
              <a href="/login" className="cta-button primary">
                <i className="mdi mdi-calendar-check"></i>
                Book a Demo
              </a>
              <a href="#solutions" className="cta-button secondary">
                <i className="mdi mdi-arrow-down"></i>
                Explore Platform
              </a>
            </div>
          </div>
        </section>

        {/* ================= Scroll Indicator ================= */}
        <div className="scroll-indicator" onClick={scrollToContent}>
          <div className="scroll-text">Discover Your Transformation</div>
          <div className="scroll-arrow">
            <i className="mdi mdi-chevron-down"></i>
          </div>
        </div>

        {/* ================= Landing Content ================= */}
        <div id="landing-content" className="landing-content">

          {/* ========= Trust & Transparency ========= */}
          <section className="trust-section section-box">
            <div className="section-header">
              <h2 className="h2-heading">
                <span className="heading-accent">Built on</span>
                <span className="heading-primary">Trust, Transparency & Sovereignty</span>
              </h2>
              <div className="section-underline"></div>
              <p className="section-description">
                A European research intelligence platform designed for privacy, explainability, and open collaboration.
              </p>
            </div>

            <div className="trust-grid">
              <div className="trust-card featured">
                <div className="trust-icon"><i className="mdi mdi-server-security"></i></div>
                <h3>Federated by Design</h3>
                <p className="trust-description">
                  LinkedScholar runs fully on-premises or in ethical EU clouds. Data never leaves your institutional space.
                </p>
                <div className="deployment-options">
                  <div className="deployment-option primary">
                    <div className="option-header">
                      <i className="mdi mdi-server"></i>
                      <strong>On-Premises Control</strong>
                    </div>
                    <ul className="trust-benefits compact">
                      <li><i className="mdi mdi-check-circle"></i> Full data sovereignty</li>
                      <li><i className="mdi mdi-check-circle"></i> Federated learning protocols</li>
                      <li><i className="mdi mdi-check-circle"></i> Role-based governance</li>
                    </ul>
                  </div>

                  <div className="deployment-option">
                    <div className="option-header">
                      <i className="mdi mdi-cloud-check"></i>
                      <strong>Ethical EU Cloud</strong>
                    </div>
                    <ul className="trust-benefits compact">
                      <li>
                        <i className="mdi mdi-check-circle"></i>
                        Hosted by{' '}
                        <a
                            href="https://www.infomaniak.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="infomaniak-link"
                        >
                          Infomaniak
                        </a>
                      </li>
                      <li><i className="mdi mdi-check-circle"></i> Swiss data centers</li>
                      <li><i className="mdi mdi-check-circle"></i> Carbon-neutral & GDPR-compliant</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="trust-card featured">
                <div className="trust-icon"><i className="mdi mdi-github"></i></div>
                <h3>Transparent & Open-Source</h3>
                <p className="trust-description">
                  Every component of LinkedScholar is open, auditable, and extendable — ensuring long-term trust and interoperability.
                </p>
                <ul className="trust-benefits">
                  <li><i className="mdi mdi-check-circle"></i> 100% open-source core (AGPL)</li>
                  <li><i className="mdi mdi-check-circle"></i> Modular, extensible architecture</li>
                  <li><i className="mdi mdi-check-circle"></i> Active European developer network</li>
                </ul>
                <a
                    href="https://github.com/linked-scholar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-link"
                >
                  <i className="mdi mdi-github"></i> View on GitHub
                </a>
              </div>
            </div>

            <div className="trust-grid">
              <div className="trust-card">
                <div className="trust-icon small"><i className="mdi mdi-shield-check"></i></div>
                <h4>GDPR & FAIR by Design</h4>
                <p>Compliance and traceability integrated at every layer.</p>
              </div>
              <div className="trust-card">
                <div className="trust-icon small"><i className="mdi mdi-lock"></i></div>
                <h4>Secure Federated Processing</h4>
                <p>Collaborate without sharing raw data.</p>
              </div>
              <div className="trust-card">
                <div className="trust-icon small"><i className="mdi mdi-scale-balance"></i></div>
                <h4>Academic Licensing</h4>
                <p>Open, transparent pricing for public institutions.</p>
              </div>
              <div className="trust-card">
                <div className="trust-icon small"><i className="mdi mdi-account-group"></i></div>
                <h4>Community Driven</h4>
                <p>Co-created with European research partners.</p>
              </div>
            </div>

            <div className="trust-cta">
              <p className="trust-cta-text">
                <strong>Explore the sovereign AI ecosystem.</strong>
                <br />
                Deploy LinkedScholar locally or join our federated pilot network.
              </p>
              <a href="/login" className="cta-button primary">
                <i className="mdi mdi-account-hard-hat"></i>
                Schedule Technical Demo
              </a>
            </div>
          </section>

          {/* ========= Testimonials & Carousels ========= */}
          <section className="proof-section section-box">
            <div className="section-header">
              <h2 className="h2-heading">
                <span className="heading-accent">Empowering</span>
                <span className="heading-primary">Research Intelligence in Europe</span>
              </h2>
              <div className="section-underline"></div>
            </div>

            <div className="testimonial-grid">
              <div className="testimonial-card">
                <div className="quote-icon"><i className="mdi mdi-format-quote-open"></i></div>
                <p className="testimonial-text">
                  “LinkedScholar turned our disconnected databases into a coherent, explainable research graph.
                  We now analyze impact and collaboration in minutes, not weeks.”
                </p>
                <div className="author-info">
                  <div className="author-name">Research Administrator</div>
                  <div className="author-org">TU Wien Pilot Institution</div>
                </div>
              </div>

              <div className="testimonial-card">
                <div className="quote-icon"><i className="mdi mdi-format-quote-open"></i></div>
                <p className="testimonial-text">
                  “For us, LinkedScholar means sovereignty. Our AI agents run locally, under full compliance,
                  while enabling deep, cross-institutional analytics.”
                </p>
                <div className="author-info">
                  <div className="author-name">Head of Research Data Office</div>
                  <div className="author-org">European University Alliance</div>
                </div>
              </div>

              <div className="testimonial-card">
                <div className="quote-icon"><i className="mdi mdi-format-quote-open"></i></div>
                <p className="testimonial-text">
                  “LinkedScholar bridges research and innovation data. It’s the missing link
                  between scientific excellence and early-stage investment insight.”
                </p>
                <div className="author-info">
                  <div className="author-name">Managing Partner</div>
                  <div className="author-org">Pre-Seed VC Fund</div>
                </div>
              </div>
            </div>

            {/* === Collaborating Partners Carousel === */}
            <div className="carousel-section">
              <h3 className="carousel-heading">Collaborating with European Partners</h3>
              <div className="carousel-container">
                <div className="carousel-track">
                  {[
                    '/sponsors/eudita_logo.png',
                    '/sponsors/tuw_i2c.png',
                    '/sponsors/kth_innovation.png',
                    '/sponsors/merlot.png',
                    '/sponsors/dfki.png',
                    '/sponsors/oead.png',
                  ].map((logo, i) => (
                      <div className="carousel-slide" key={i}>
                        <img src={logo} alt={`Partner ${i + 1}`} />
                      </div>
                  ))}
                </div>
              </div>
            </div>

            {/* === Public Funding Carousel === */}
            <div className="carousel-section funded">
              <h3 className="carousel-heading">Publicly Funded By</h3>
              <div className="carousel-container">
                <div className="carousel-track">
                  {[
                    '/funding/ffg.png',
                    '/funding/camara_coruna.png',
                  ].map((logo, i) => (
                      <div className="carousel-slide" key={`fund-${i}`}>
                        <img src={logo} alt={`Funding ${i + 1}`} />
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ========= Final CTA ========= */}
          <section className="cta-section section-box">
            <div className="cta-content">
              <h2>Ready to Build Your Living Knowledge Network?</h2>
              <p className="cta-description">
                Join pioneering institutions shaping Europe’s next generation of research intelligence.
                <br />
                <strong>Experience sovereign AI in action.</strong>
              </p>
              <div className="cta-buttons">
                <a href="/login" className="cta-button primary large">
                  <i className="mdi mdi-calendar-check"></i>
                  Schedule a Demo
                </a>
                <a href="/pricing" className="cta-button secondary large">
                  <i className="mdi mdi-currency-eur"></i>
                  View Pricing
                </a>
              </div>
              <p className="cta-note">
                <i className="mdi mdi-shield-check"></i>
                GDPR-Compliant • Open-Source • Federated by Design
              </p>
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
