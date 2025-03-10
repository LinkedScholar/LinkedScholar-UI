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
      <div className="pricing-modal-overlay d-flex align-items-center justify-content-center">
        <div className="pricing-modal card shadow-lg p-4">
          <div className="pricing-modal-header d-flex justify-content-between align-items-center">
            <h2 className="text-primary">Upgrade to Premium</h2>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <p className="text-muted">You have reached the monthly graph limit in the Free plan</p>

          {/* Billing Toggle */}
          <div className="billing-toggle d-flex align-items-center justify-content-center my-3">
            <span className={`me-2 ${!isAnnual ? "fw-bold text-primary" : ""}`}>Monthly</span>
            <div className="form-check form-switch">
              <input
                  className="form-check-input"
                  type="checkbox"
                  checked={isAnnual}
                  onChange={() => setIsAnnual(!isAnnual)}
              />
            </div>
            <span className={`ms-2 ${isAnnual ? "fw-bold text-primary" : ""}`}>Annual</span>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <div className="card border-secondary">
                <div className="card-header text-center fw-bold">Free Plan</div>
                <div className="card-body text-center">
                  <h3 className="text-success">€0</h3>
                  <ul className="list-unstyled">
                    <li>5 graphs per month</li>
                    <li>All features included</li>
                  </ul>
                  <button className="btn btn-outline-secondary w-100" disabled>
                    Current Plan
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card border-primary">
                <div className="card-header text-center fw-bold bg-primary text-white">
                  Pro Plan
                </div>
                <div className="card-body text-center">
                  <h3 className="text-primary">€{displayPrice}<span className="fs-6">/month</span></h3>
                  <ul className="list-unstyled">
                    <li>Unlimited graphs</li>
                    <li>All features included</li>
                  </ul>
                  <button className="btn btn-primary w-100" onClick={() => window.open("/", "_blank")}>
                    Upgrade Now
                  </button>
                  <p className="small text-muted mt-2">{isAnnual ? billedText : "\u00A0"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-3">
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
