import React, { useState } from "react";
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/components/modals/pricingModal.scss";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
  const [isAnnual, setIsAnnual] = useState(true);
  
  const monthlyPrice = 5;
  const annualPrice = 48;
  const displayPrice = isAnnual ? 4 : monthlyPrice;
  const billedText = isAnnual ? `*billed ${annualPrice}€ annually` : "";

  if (!isOpen) return null;

  return ReactDOM.createPortal(
      <div className="pricing-modal-overlay" onClick={onClose}>
        <div className="pricing-modal" onClick={(e) => e.stopPropagation()}>

          {/* Close Button */}
          <button className="close-button" onClick={onClose}>×</button>

          <h2 className="title-container">
            <span className="title-linked">Support </span>
            <span className="title-scholar">LinkedScholar</span>
          </h2>
          <p className="text-muted">You've reached the free usage limit. Become a supporter to continue exploring!</p>

          {/* Billing Toggle */}
          <div className="billing-toggle">
            <span className={!isAnnual ? "active" : ""}>Monthly</span>
            <div className="form-check form-switch">
              <input
                  className="form-check-input"
                  type="checkbox"
                  checked={isAnnual}
                  onChange={() => setIsAnnual(!isAnnual)}
              />
            </div>
            <span className={isAnnual ? "active" : ""}>Annual</span>
          </div>

          <div className="pricing-plans">
            {/* Free Plan */}
            <div className="pricing-plan free">
              <h3>Community</h3>
              <p className="price">€0</p>
              <ul>
                <li>5 graphs per month</li>
                <li>Basic features</li>
                <li>Community support</li>
              </ul>
              <button className="plan-button disabled" disabled>Current Plan</button>
            </div>

            {/* Pro Plan */}
            <div className="pricing-plan premium">
              <h3>Supporter</h3>
              <p className="price">€{displayPrice}<span className="fs-6">/month</span></p>
              <ul>
                <li>Unlimited graphs</li>
                <li>All features included</li>
                <li>Help sustain the platform</li>
                <li>Support ongoing development</li>
              </ul>
              <button className="plan-button" onClick={() => window.open("/", "_blank")}>
                Become a Supporter
              </button>
              <p className="small text-muted">{isAnnual ? billedText : "\u00A0"}</p>
            </div>
          </div>

          <div className="pricing-footer">
            <p>
              Your support helps us maintain and improve this open research tool. 
              <br />
              Questions? <a href="/help">Check our FAQs</a> or{" "}
              <a href="/contact">Contact Us</a>
            </p>
          </div>
        </div>
      </div>,
      document.body 
  );
};

export default PricingModal;