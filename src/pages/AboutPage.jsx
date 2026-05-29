import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Shield, Zap, BarChart, Smartphone, Globe, ArrowRight } from 'lucide-react';
import Logo from '../components/Logo.jsx';
import '../App.css';

const AboutPage = () => {
  return (
    <div className="about-page-wrapper py-5 px-3 px-md-0">
      <div className="container about-glass-card p-4 p-md-5 my-4">
        {/* Header Section */}
        <div className="text-center mb-5">
          <div className="d-flex justify-content-center mb-4">
            <Logo 
              height={100} 
              width={100} 
              style={{
                filter: "drop-shadow(0 0 25px rgba(99, 102, 241, 0.45))",
                borderRadius: "22px",
                border: "1.5px solid rgba(255, 255, 255, 0.15)"
              }}
            />
          </div>
          <h1 className="display-4 fw-extrabold mb-3" style={{ 
            background: "linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #f472b6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "900",
            letterSpacing: "-1px"
          }}>
            About SmartInvoice
          </h1>
          <p className="lead fs-5" style={{ color: "#d1d5db", maxWidth: "600px", margin: "0 auto" }}>
            Your all-in-one platform for professional invoicing and financial tracking.
          </p>
        </div>

        {/* What is SmartInvoice Section */}
        <div className="row align-items-center mb-5 pb-4">
          <div className="col-lg-6 mb-5 mb-lg-0 pe-lg-5">
            <div className="badge px-3 py-2 rounded-pill mb-3" style={{ background: "rgba(99, 102, 241, 0.15)", color: "#818cf8", border: "1px solid rgba(99, 102, 241, 0.25)", fontSize: "14px", fontWeight: "600" }}>
              Next-Gen Invoicing
            </div>
            <h2 className="h2 fw-bold mb-4 text-white" style={{ letterSpacing: "-0.5px" }}>What is SmartInvoice?</h2>
            <p className="fs-6 text-secondary mb-4" style={{ color: "#d1d5db", lineHeight: "1.8", fontSize: "1.1rem" }}>
              SmartInvoice is a modern, cloud-based B2B SaaS platform designed specifically for freelancers, agencies, and small to medium-sized enterprises (SMEs). We eliminate the hassle of spreadsheets and manual calculations by providing an intuitive interface to generate, track, and manage your invoices.
            </p>
            <p className="fs-6 text-secondary" style={{ color: "#d1d5db", lineHeight: "1.8", fontSize: "1.1rem" }}>
              Our goal is to help you get paid faster, maintain a professional image with your clients, and keep your finances organized in one secure place.
            </p>
          </div>
          <div className="col-lg-6 d-flex align-items-center justify-content-center">
            <div className="about-mockup-container p-1 w-100">
              <img 
                src="/dashboard-mockup.png" 
                alt="SmartInvoice Platform Overview" 
                className="img-fluid rounded" 
                style={{ display: "block", width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>

        <div className="glass-divider"></div>

        {/* How to Use Section */}
        <div className="text-center mb-5">
          <div className="badge px-3 py-2 rounded-pill mb-3" style={{ background: "rgba(168, 85, 247, 0.15)", color: "#c084fc", border: "1px solid rgba(168, 85, 247, 0.25)", fontSize: "14px", fontWeight: "600" }}>
            Three Simple Steps
          </div>
          <h2 className="h2 fw-bold text-white mb-5" style={{ letterSpacing: "-0.5px" }}>How to Use SmartInvoice</h2>
          <div className="row g-4 justify-content-center">
            <div className="col-md-4">
              <div className="about-step-node p-5 h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="about-step-badge step-1">1</div>
                  <h4 className="fw-bold text-white mb-3">Create</h4>
                  <p className="mb-0" style={{ color: "#e5e7eb", lineHeight: "1.8", fontSize: "15.5px" }}>
                    Enter your client's details, itemize your services or products, and apply any necessary taxes or discounts instantly.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="about-step-node p-5 h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="about-step-badge step-2">2</div>
                  <h4 className="fw-bold text-white mb-3">Customize</h4>
                  <p className="mb-0" style={{ color: "#e5e7eb", lineHeight: "1.8", fontSize: "15.5px" }}>
                    Choose from our gallery of professional templates. Add your company logo and select your brand's theme color.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="about-step-node p-5 h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="about-step-badge step-3">3</div>
                  <h4 className="fw-bold text-white mb-3">Send & Get Paid</h4>
                  <p className="mb-0" style={{ color: "#e5e7eb", lineHeight: "1.8", fontSize: "15.5px" }}>
                    Generate a secure Stripe payment link, save the invoice to your dashboard, and email it directly to your client.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-divider"></div>

        {/* Features Section */}
        <div className="mb-5">
          <div className="text-center mb-5">
            <div className="badge px-3 py-2 rounded-pill mb-3" style={{ background: "rgba(236, 72, 153, 0.15)", color: "#f472b6", border: "1px solid rgba(236, 72, 153, 0.25)", fontSize: "14px", fontWeight: "600" }}>
              Enterprise Grade
            </div>
            <h2 className="h2 fw-bold text-white" style={{ letterSpacing: "-0.5px" }}>Powerful Enterprise Features</h2>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="about-feature-box">
                <div className="about-feature-icon icon-blue">
                  <Zap size={26} />
                </div>
                <h5 className="fw-bold text-white mb-3">Instant Payment Links</h5>
                <p className="mb-0" style={{ color: "#d1d5db", lineHeight: "1.7", fontSize: "15px" }}>
                  Generate secure Stripe checkout links so clients can pay you instantly with credit cards or Apple Pay.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="about-feature-box">
                <div className="about-feature-icon icon-green">
                  <BarChart size={26} />
                </div>
                <h5 className="fw-bold text-white mb-3">Analytics Dashboard</h5>
                <p className="mb-0" style={{ color: "#d1d5db", lineHeight: "1.7", fontSize: "15px" }}>
                  Track your total revenue, outstanding balances, and view interactive charts of your cash flow over time.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="about-feature-box">
                <div className="about-feature-icon icon-purple">
                  <CheckCircle size={26} />
                </div>
                <h5 className="fw-bold text-white mb-3">Status Tracking</h5>
                <p className="mb-0" style={{ color: "#d1d5db", lineHeight: "1.7", fontSize: "15px" }}>
                  Never lose track of an invoice. Mark invoices as Draft, Sent, Paid, or Overdue with color-coded badges.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="about-feature-box">
                <div className="about-feature-icon icon-cyan">
                  <Smartphone size={26} />
                </div>
                <h5 className="fw-bold text-white mb-3">PDF Generation</h5>
                <p className="mb-0" style={{ color: "#d1d5db", lineHeight: "1.7", fontSize: "15px" }}>
                  Download pixel-perfect, high-resolution PDF copies of your invoices for your own accounting records.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="about-feature-box">
                <div className="about-feature-icon icon-pink">
                  <Shield size={26} />
                </div>
                <h5 className="fw-bold text-white mb-3">Secure Cloud Storage</h5>
                <p className="mb-0" style={{ color: "#d1d5db", lineHeight: "1.7", fontSize: "15px" }}>
                  All your invoice data is securely encrypted and backed up in the cloud. Access it anywhere, anytime.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="about-feature-box">
                <div className="about-feature-icon icon-orange">
                  <Globe size={26} />
                </div>
                <h5 className="fw-bold text-white mb-3">Custom Branding</h5>
                <p className="mb-0" style={{ color: "#d1d5db", lineHeight: "1.7", fontSize: "15px" }}>
                  White-label your invoices by uploading your custom logo and selecting your company's exact brand color.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Footer Section */}
        <div className="text-center mt-5 pt-5" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <h3 className="fw-bold text-white mb-4" style={{ letterSpacing: "-0.5px" }}>Ready to transform your billing process?</h3>
          <Link to="/dashboard" className="btn-premium-cta d-inline-flex align-items-center gap-2">
            Get Started for Free <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
