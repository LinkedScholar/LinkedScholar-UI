import React, { useState } from "react";
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

  return (
      <div className="pricing-modal-overlay" onClick={onClose}>
        <div className="pricing-modal" onClick={(e) => e.stopPropagation()}>

          {/* Close Button */}
          <button className="close-button" onClick={onClose}>×</button>

          <h2 className="text-primary">Upgrade to Premium</h2>
          <p className="text-muted">You have reached the monthly graph limit in the Free plan.</p>

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
              <h3>Free Plan</h3>
              <p className="price">€0</p>
              <ul>
                <li>5 graphs per month</li>
                <li>All features included</li>
              </ul>
              <button className="plan-button disabled" disabled>Current Plan</button>
            </div>

            {/* Pro Plan */}
            <div className="pricing-plan premium">
              <h3>Pro Plan</h3>
              <p className="price">€{displayPrice}<span className="fs-6">/month</span></p>
              <ul>
                <li>Unlimited graphs</li>
                <li>All features included</li>
              </ul>
              <button className="plan-button" onClick={() => window.open("/", "_blank")}>
                Upgrade Now
              </button>
              <p className="small text-muted">{isAnnual ? billedText : "\u00A0"}</p>
            </div>
          </div>

          <div className="pricing-footer">
            <p>
              Questions? <a href="/help">Check our FAQs</a> or{" "}
              <a href="/contact">Contact Support</a>
            </p>
          </div>
        </div>
      </div>
  );
};

export default PricingModal;
