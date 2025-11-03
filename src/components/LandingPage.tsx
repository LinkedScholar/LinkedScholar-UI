import React, { useEffect, useState, useRef } from 'react';
import '../styles/components/Landing/landingPage.scss';

const LandingPage: React.FC = () => {
  const [showScrollUp, setShowScrollUp] = useState(false);
  const landingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollUp(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Turn Research Data Into
              <span className="hero-gradient"> Strategic Intelligence</span>
            </h1>
            <p className="hero-subtitle">
              From fragmented data silos to unified knowledge graphs. From missed opportunities to early-stage insights.
              <br />
              <strong>One platform. Three transformations.</strong>
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-value">10+</div>
                <div className="stat-label">Integrated Products</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">3</div>
                <div className="stat-label">Market Solutions</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">100%</div>
                <div className="stat-label">EU Compliant</div>
              </div>
            </div>
            <div className="hero-cta">
              <a href="/login" className="cta-button primary">
                <i className="mdi mdi-calendar-check"></i>
                Book a Demo
              </a>
              <a href="#solutions" className="cta-button secondary">
                <i className="mdi mdi-arrow-down"></i>
                Explore Solutions
              </a>
            </div>
          </div>
        </section>

        <div className="scroll-indicator" onClick={scrollToContent}>
          <div className="scroll-text">Discover Your Solution</div>
          <div className="scroll-arrow">
            <i className="mdi mdi-chevron-down"></i>
          </div>
        </div>

        <div id="landing-content" className="landing-content">
          {/* Solutions Overview */}
          <section id="solutions" className="solutions-section section-box">
            <div className="section-header">
              <h2 className="h2-heading">
                <span className="heading-accent">Choose Your</span>
                <span className="heading-primary">Transformation</span>
              </h2>
              <div className="section-underline"></div>
              <p className="section-description">
                Purpose-built intelligence for universities, industry leaders, and pre-seed investors
              </p>
            </div>

            <div className="solutions-grid">
              {/* Research Institutions */}
              <div className="solution-card research-card">
                <div className="solution-icon">
                  <i className="mdi mdi-school"></i>
                </div>
                <h3 className="solution-title">Research Institutions</h3>
                <p className="solution-tagline">From Administrative Chaos to Research Excellence</p>

                <div className="value-prop">
                  <div className="problem">
                    <h4><i className="mdi mdi-close-circle"></i> The Challenge</h4>
                    <ul>
                      <li>Data scattered across 20+ systems</li>
                      <li>Weeks spent on compliance reports</li>
                      <li>Missed funding opportunities</li>
                      <li>Innovation buried in silos</li>
                      <li>Data sovereignty concerns with cloud solutions</li>
                    </ul>
                  </div>

                  <div className="solution">
                    <h4><i className="mdi mdi-check-circle"></i> Your Outcome</h4>
                    <ul>
                      <li><strong>80% faster</strong> report generation</li>
                      <li><strong>Automated</strong> EU compliance</li>
                      <li><strong>3x more</strong> grant discoveries</li>
                      <li><strong>Real-time</strong> research insights</li>
                      <li><strong>Complete control</strong> — your data, your infrastructure</li>
                    </ul>
                  </div>
                </div>

                <div className="key-differentiators">
                  <div className="differentiator highlight">
                    <i className="mdi mdi-shield-lock"></i>
                    <div className="diff-content">
                      <strong>Data Sovereignty Guaranteed</strong>
                      <p>On-premises deployment — your sensitive research data never leaves your infrastructure</p>
                    </div>
                  </div>
                  <div className="differentiator highlight">
                    <i className="mdi mdi-open-source-initiative"></i>
                    <div className="diff-content">
                      <strong>Open-Source Dashboard</strong>
                      <p>Fully transparent, customizable, and community-driven visualization platform</p>
                    </div>
                  </div>
                </div>

                <div className="solution-pillars">
                  <div className="pillar">
                    <i className="mdi mdi-pipe"></i>
                    <span>Integrate Data</span>
                  </div>
                  <div className="pillar">
                    <i className="mdi mdi-chart-box"></i>
                    <span>Explore Insights</span>
                  </div>
                  <div className="pillar">
                    <i className="mdi mdi-lightbulb-on"></i>
                    <span>Exploit Opportunities</span>
                  </div>
                </div>

                <a href="/solutions/research-institutions" className="solution-link">
                  Explore University Solutions
                  <i className="mdi mdi-arrow-right"></i>
                </a>
              </div>

              {/* Industry */}
              <div className="solution-card industry-card">
                <div className="solution-icon">
                  <i className="mdi mdi-factory"></i>
                </div>
                <h3 className="solution-title">Industry Leaders</h3>
                <p className="solution-tagline">From Reactive to Predictive Innovation</p>

                <div className="value-prop">
                  <div className="problem">
                    <h4><i className="mdi mdi-close-circle"></i> The Challenge</h4>
                    <ul>
                      <li>Competitors spot trends first</li>
                      <li>Manual literature monitoring</li>
                      <li>Late to emerging technologies</li>
                      <li>Missed collaboration opportunities</li>
                    </ul>
                  </div>

                  <div className="solution">
                    <h4><i className="mdi mdi-check-circle"></i> Your Outcome</h4>
                    <ul>
                      <li><strong>6 months earlier</strong> technology detection</li>
                      <li><strong>Real-time</strong> breakthrough alerts</li>
                      <li><strong>Competitive</strong> R&D intelligence</li>
                      <li><strong>Validated</strong> partnership targets</li>
                    </ul>
                  </div>
                </div>

                <div className="solution-pillars">
                  <div className="pillar">
                    <i className="mdi mdi-book-search"></i>
                    <span>Monitor Literature</span>
                  </div>
                  <div className="pillar">
                    <i className="mdi mdi-radar"></i>
                    <span>Scout Technology</span>
                  </div>
                  <div className="pillar">
                    <i className="mdi mdi-eye"></i>
                    <span>Track Competitors</span>
                  </div>
                </div>
                <div className="dashboard-os highlight">
                  <i className="mdi mdi-monitor-dashboard"></i>
                  <div className="diff-content">
                    <strong>Research Intelligence OS</strong>
                    <p>
                      A unified analytics dashboard for every research KPI —
                      from funding pipelines to collaboration networks.
                      Real-time insights tailored for universities and research centers.
                    </p>
                  </div>
                </div>

                <a href="/solutions/industry" className="solution-link">
                  Explore Industry Solutions
                  <i className="mdi mdi-arrow-right"></i>
                </a>
              </div>

              {/* Pre-Seed Investors */}
              <div className="solution-card investor-card">
                <div className="solution-icon">
                  <i className="mdi mdi-chart-line-variant"></i>
                </div>
                <h3 className="solution-title">Pre-Seed Investors</h3>
                <p className="solution-tagline">From Deal Flow to Project Flow</p>

                <div className="value-prop">
                  <div className="problem">
                    <h4><i className="mdi mdi-close-circle"></i> The Challenge</h4>
                    <ul>
                      <li>See startups too late</li>
                      <li>No pre-seed visibility</li>
                      <li>Miss best research lines</li>
                      <li>Reactive investment timing</li>
                    </ul>
                  </div>

                  <div className="solution">
                    <h4><i className="mdi mdi-check-circle"></i> Your Outcome</h4>
                    <ul>
                      <li><strong>12-24 months earlier</strong> visibility</li>
                      <li><strong>Track research</strong> before startups form</li>
                      <li><strong>Better deal</strong> selection & timing</li>
                      <li><strong>Thematic</strong> research intelligence</li>
                    </ul>
                  </div>
                </div>

                <div className="solution-pillars">
                  <div className="pillar">
                    <i className="mdi mdi-timeline-text"></i>
                    <span>Project Flow</span>
                  </div>
                  <div className="pillar">
                    <i className="mdi mdi-radar"></i>
                    <span>Early Detection</span>
                  </div>
                  <div className="pillar">
                    <i className="mdi mdi-chart-line"></i>
                    <span>Impact Assessment</span>
                  </div>
                </div>
                <div className="dashboard-os highlight">
                  <i className="mdi mdi-finance"></i>
                  <div className="diff-content">
                    <strong>Venture Intelligence OS</strong>
                    <p>
                      A panoramic investor dashboard showing emerging research lines,
                      predictive startup signals, and deal flow forecasts — all in one place.
                    </p>
                  </div>
                </div>

                <a href="/solutions/investors" className="solution-link">
                  Explore Investor Solutions
                  <i className="mdi mdi-arrow-right"></i>
                </a>
              </div>
            </div>
          </section>

          {/* Trust & Transparency Section */}
          <section className="trust-section section-box">
            <div className="section-header">
              <h2 className="h2-heading">
                <span className="heading-accent">Built on</span>
                <span className="heading-primary">Trust & Transparency</span>
              </h2>
              <div className="section-underline"></div>
              <p className="section-description">
                For research institutions that demand data sovereignty and open standards
              </p>
            </div>

            <div className="trust-grid">
              <div className="trust-card featured">
                <div className="trust-icon">
                  <i className="mdi mdi-server-security"></i>
                </div>
                <h3>Your Data, Your Choice</h3>
                <p className="trust-description">
                  Deploy on your infrastructure for complete data sovereignty, or choose our ethical EU cloud partner.
                  Either way, your sensitive research data stays under your control.
                </p>
                <div className="deployment-options">
                  <div className="deployment-option primary">
                    <div className="option-header">
                      <i className="mdi mdi-server"></i>
                      <strong>On-Premises Deployment</strong>
                    </div>
                    <ul className="trust-benefits compact">
                      <li><i className="mdi mdi-check-circle"></i> Deploy on your own servers</li>
                      <li><i className="mdi mdi-check-circle"></i> 100% data sovereignty</li>
                      <li><i className="mdi mdi-check-circle"></i> Complete control over access</li>
                      <li><i className="mdi mdi-check-circle"></i> Zero vendor lock-in</li>
                    </ul>
                  </div>

                  <div className="deployment-option">
                    <div className="option-header">
                      <i className="mdi mdi-cloud-check"></i>
                      <strong>Ethical EU Cloud</strong>
                    </div>
                    <ul className="trust-benefits compact">
                      <li><i className="mdi mdi-check-circle"></i> Hosted by <a href="https://www.infomaniak.com/es" target="_blank" rel="noopener noreferrer" className="infomaniak-link">Infomaniak</a></li>
                      <li><i className="mdi mdi-check-circle"></i> 100% Swiss data centers</li>
                      <li><i className="mdi mdi-check-circle"></i> Carbon-neutral hosting</li>
                      <li><i className="mdi mdi-check-circle"></i> EU GDPR compliant</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="trust-card featured">
                <div className="trust-icon">
                  <i className="mdi mdi-github"></i>
                </div>
                <h3>Open-Source Dashboard</h3>
                <p className="trust-description">
                  For universities, industry, and investors — our fully transparent, community-driven visualization platform.
                  Audit the code, customize freely, and contribute to the future of research intelligence.
                </p>
                <ul className="trust-benefits">
                  <li><i className="mdi mdi-check-circle"></i> 100% open-source codebase</li>
                  <li><i className="mdi mdi-check-circle"></i> Full transparency — inspect everything</li>
                  <li><i className="mdi mdi-check-circle"></i> Extensible and customizable</li>
                  <li><i className="mdi mdi-check-circle"></i> Active community support</li>
                </ul>
                <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer" className="github-link">
                  <i className="mdi mdi-github"></i>
                  View on GitHub
                </a>
              </div>

              <div className="trust-card">
                <div className="trust-icon small">
                  <i className="mdi mdi-shield-check"></i>
                </div>
                <h4>EU GDPR Compliant</h4>
                <p>Built from the ground up to meet European data protection standards</p>
              </div>

              <div className="trust-card">
                <div className="trust-icon small">
                  <i className="mdi mdi-lock"></i>
                </div>
                <h4>Enterprise Security</h4>
                <p>Bank-grade encryption, role-based access control, and audit logs</p>
              </div>

              <div className="trust-card">
                <div className="trust-icon small">
                  <i className="mdi mdi-scale-balance"></i>
                </div>
                <h4>Academic Licensing</h4>
                <p>Special pricing and terms for educational institutions</p>
              </div>

              <div className="trust-card">
                <div className="trust-icon small">
                  <i className="mdi mdi-account-group"></i>
                </div>
                <h4>Community Driven</h4>
                <p>Join researchers worldwide shaping the platform's future</p>
              </div>
            </div>

            <div className="trust-cta">
              <p className="trust-cta-text">
                <strong>Want to see the code or deploy on-premises?</strong>
                <br />
                Book a technical demo with our engineering team
              </p>
              <a href="/login" className="cta-button primary">
                <i className="mdi mdi-account-hard-hat"></i>
                Schedule Technical Demo
              </a>
            </div>
          </section>

          {/* Social Proof */}
          <section className="proof-section section-box">
            <div className="section-header">
              <h2 className="h2-heading">
                <span className="heading-accent">Trusted by</span>
                <span className="heading-primary">Innovation Leaders</span>
              </h2>
              <div className="section-underline"></div>
            </div>

            <div className="testimonial-grid">
              <div className="testimonial-card">
                <div className="quote-icon">
                  <i className="mdi mdi-format-quote-open"></i>
                </div>
                <p className="testimonial-text">
                  "LinkedScholar reduced our grant reporting time from 3 weeks to 2 days. The automated EU compliance
                  alone paid for itself in the first quarter."
                </p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <div className="author-name">Research Administrator</div>
                    <div className="author-org">Major European University</div>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div className="quote-icon">
                  <i className="mdi mdi-format-quote-open"></i>
                </div>
                <p className="testimonial-text">
                  "We spotted an emerging battery technology 8 months before our competitors. That early insight
                  led to a strategic partnership worth millions."
                </p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <div className="author-name">Head of R&D</div>
                    <div className="author-org">Fortune 500 Manufacturing</div>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div className="quote-icon">
                  <i className="mdi mdi-format-quote-open"></i>
                </div>
                <p className="testimonial-text">
                  "Project Flow Tracker changed how we invest. We now track 200+ research lines and invest
                  at the perfect moment—before they need our money."
                </p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <div className="author-name">Managing Partner</div>
                    <div className="author-org">Pre-Seed VC Fund</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sponsor-logos-wrapper">
              <p className="sponsors-lead">Working with leading institutions</p>
              <div className="sponsor-logos-container">
                <a href="https://eudita.es/" target="_blank" rel="noopener noreferrer" className="sponsor-card">
                  <img src="/sponsors/eudita_logo.jpg" alt="Eudita" className="sponsor-logo" />
                </a>
                <a href="https://i2c.tuwien.ac.at/" target="_blank" rel="noopener noreferrer" className="sponsor-card">
                  <img src="/sponsors/tuw_i2c.png" alt="TU Wien I²C" className="sponsor-logo" />
                </a>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="cta-section section-box">
            <div className="cta-content">
              <h2>Ready to Transform Your Research Intelligence?</h2>
              <p className="cta-description">
                Join leading institutions already using LinkedScholar to turn research data into strategic advantage.
                <br />
                <strong>Book a personalized demo</strong> and see your solution in action.
              </p>
              <div className="cta-buttons">
                <a href="/login" className="cta-button primary large">
                  <i className="mdi mdi-calendar-check"></i>
                  Schedule Your Demo
                </a>
                <a href="/pricing" className="cta-button secondary large">
                  <i className="mdi mdi-currency-usd"></i>
                  View Pricing
                </a>
              </div>
              <p className="cta-note">
                <i className="mdi mdi-shield-check"></i>
                No credit card required • Free pilot available • EU GDPR compliant
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