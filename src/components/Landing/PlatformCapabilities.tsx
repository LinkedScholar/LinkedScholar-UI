import React from 'react';
import '../../styles/components/Landing/PlatformCapabilities.css';

import '../../styles/components/Landing/RndStrategy.css';

const PlatformCapabilities = () => {
  return (
    <div >
    <div className="capabilities-container">
        <div className="sidebar-capabilities">
        <div className="connection-finder-card">
          <h4>Ready for the next project?</h4>
          <p>Identify paths and connections between researchers and institutions to discover collaboration opportunities.</p>
          <button className="search-button">
            Start searching <span className="arrow">→</span>
          </button>
          <div className="sidebar-landscape">
             <div className="sky small-sky">
               <img src="/images/small_team_building.png" alt="Cloud" className="cloud-image small-cloud" />
             </div>
          </div>
        </div>
      </div>
      <div className="main-capabilities-content">
        
        <div className="card-layout-section">
          {/* Background Card */}
          <div className="feature-card background-card">
            <div className="card-landscape">
              <div className="sky">
                <img src="/images/team_generator_background.png" alt="Cloud" className="cloud-image" />
              </div>
            </div>
          </div>

          {/* Foreground Card */}
          <div className="feature-card foreground-card">
             <div className="card-landscape">
              <div className="sky">
                <img src="/images/team_generator.png" alt="Cloud" className="cloud-image" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="description-text">
          <h3>Match Maker</h3>
          <p>Design the perfect match for your research project. Find researchers and institutions that align with your goals and objectives. </p>
        </div>
      </div>
    </div>
    <div style={{height: '5vw'}}></div>
    <div className="platform-capabilities-container">
      <div className="main-content">
        <div className="visualization-section">
          <div className="visualization-card">
          <div className="card-image-wrapper">
                <div className="sky">
                <img src="/images/topic_page.png" alt="Cloud" className="cloud-image" />
              </div>
            </div>
          </div>
          <div className="visualization-card">
            <div className="card-image-wrapper">
                <div className="sky">
                <img src="/images/publications.png" alt="Cloud" className="cloud-image" />
              </div>
            </div>
          </div>
        </div>
        <div className="visualization-text">
          <h3>Research Network Visualization</h3>
          <p>
            Discover connections between researchers and their collaborations
            through interactive network visualizations.
          </p>
        </div>
      </div>
      <div className="sidebar-content">
        <div className="sidebar-card">
          <h4>Ready to Transform Your R&D Strategy?</h4>
          <p style={{textAlign: 'left'}}>
            Join forward-thinking organizations that are already using
            LinkedScholar to turn research knowledge into competitive
            advantage. Let's discuss how we can accelerate your innovation
            journey.
          </p>
          <button className="demo-button">Schedule a Demo</button>
        </div>
      </div>
    </div>
    <div style={{height: '5vw'}}></div>
    <div className="capabilities-container" >
        <div className="sidebar-capabilities" style={{height: '100%'}}>
        <div className="connection-finder-card">
          <h4>Easiest way to get informed?</h4>
          <p style={{textAlign: 'justify'}}>Use our report generation capabilities for showing off the strengths of your institution and level of impact.</p>

          <p style={{textAlign: 'justify'}}>Thanks to our global database, we can access the entire academic, funding and industrial landscape to give you a report of your institution's impact. With some extra information provided by you we can automatically generate the report and help you introduce yourself to potential clients, investors and collaborators.</p>
        </div>
      </div>
      <div className="main-capabilities-content">
        
        <div className="card-layout-section">
          {/* Background Card */}
          <div className="feature-card background-card">
            <div className="card-landscape">
                <iframe allowFullScreen width="100%" height="100%" src="https://embed.figma.com/slides/a0Yu6t5WRO5sdk8MOdGkGF/Report-q2-2025?node-id=1-107&embed-host=share"></iframe>
            </div>
          </div>

        </div>
        
        <div className="description-text">
          <h3>Report generator</h3>
          <p>Automatic reports that showcase your strength</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default PlatformCapabilities;