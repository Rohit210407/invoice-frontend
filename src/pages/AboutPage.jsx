import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Shield, Zap, BarChart, Smartphone, Globe } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="container-fluid bg-light min-vh-100 py-5">
      <div className="container bg-white shadow-sm rounded p-5">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-primary mb-3">About SmartInvoice</h1>
          <p className="lead text-muted">Your all-in-one platform for professional invoicing and financial tracking.</p>
        </div>

        <div className="row mb-5">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h2 className="h3 fw-bold mb-3">What is SmartInvoice?</h2>
            <p className="fs-5 text-secondary">
              SmartInvoice is a modern, cloud-based B2B SaaS platform designed specifically for freelancers, agencies, and small to medium-sized enterprises (SMEs). We eliminate the hassle of spreadsheets and manual calculations by providing an intuitive interface to generate, track, and manage your invoices.
            </p>
            <p className="fs-5 text-secondary">
              Our goal is to help you get paid faster, maintain a professional image with your clients, and keep your finances organized in one secure place.
            </p>
          </div>
          <div className="col-lg-6 bg-light rounded p-4 d-flex align-items-center justify-content-center">
            <img src="https://placehold.co/500x300/0d6efd/ffffff?text=SmartInvoice+Platform" alt="Platform Overview" className="img-fluid rounded shadow-sm" />
          </div>
        </div>

        <hr className="my-5" />

        <div className="text-center mb-5">
          <h2 className="h3 fw-bold mb-4">How to Use SmartInvoice</h2>
          <div className="row g-4 justify-content-center">
            <div className="col-md-4">
              <div className="p-4 border rounded h-100 bg-white shadow-sm hover-shadow transition">
                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '60px', height: '60px', fontSize: '24px', fontWeight: 'bold' }}>1</div>
                <h4 className="fw-bold">Create</h4>
                <p className="text-muted">Enter your client's details, itemize your services or products, and apply any necessary taxes or discounts instantly.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded h-100 bg-white shadow-sm hover-shadow transition">
                <div className="bg-warning text-dark rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '60px', height: '60px', fontSize: '24px', fontWeight: 'bold' }}>2</div>
                <h4 className="fw-bold">Customize</h4>
                <p className="text-muted">Choose from our gallery of professional templates. Add your company logo and select your brand's theme color.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded h-100 bg-white shadow-sm hover-shadow transition">
                <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '60px', height: '60px', fontSize: '24px', fontWeight: 'bold' }}>3</div>
                <h4 className="fw-bold">Send & Get Paid</h4>
                <p className="text-muted">Generate a secure Stripe payment link, save the invoice to your dashboard, and email it directly to your client.</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-5" />

        <div className="mb-5">
          <h2 className="h3 fw-bold text-center mb-5">Powerful Enterprise Features</h2>
          <div className="row g-4">
            <div className="col-md-6 col-lg-4 d-flex">
              <div className="d-flex p-3 bg-light rounded w-100">
                <div className="me-3 text-primary"><Zap size={32} /></div>
                <div>
                  <h5 className="fw-bold">Instant Payment Links</h5>
                  <p className="text-muted small mb-0">Generate secure Stripe checkout links so clients can pay you instantly with credit cards or Apple Pay.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 d-flex">
              <div className="d-flex p-3 bg-light rounded w-100">
                <div className="me-3 text-success"><BarChart size={32} /></div>
                <div>
                  <h5 className="fw-bold">Analytics Dashboard</h5>
                  <p className="text-muted small mb-0">Track your total revenue, outstanding balances, and view interactive charts of your cash flow over time.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 d-flex">
              <div className="d-flex p-3 bg-light rounded w-100">
                <div className="me-3 text-warning"><CheckCircle size={32} /></div>
                <div>
                  <h5 className="fw-bold">Status Tracking</h5>
                  <p className="text-muted small mb-0">Never lose track of an invoice. Mark invoices as Draft, Sent, Paid, or Overdue with color-coded badges.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 d-flex">
              <div className="d-flex p-3 bg-light rounded w-100">
                <div className="me-3 text-info"><Smartphone size={32} /></div>
                <div>
                  <h5 className="fw-bold">PDF Generation</h5>
                  <p className="text-muted small mb-0">Download pixel-perfect, high-resolution PDF copies of your invoices for your own accounting records.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 d-flex">
              <div className="d-flex p-3 bg-light rounded w-100">
                <div className="me-3 text-danger"><Shield size={32} /></div>
                <div>
                  <h5 className="fw-bold">Secure Cloud Storage</h5>
                  <p className="text-muted small mb-0">All your invoice data is securely encrypted and backed up in the cloud. Access it anywhere, anytime.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 d-flex">
              <div className="d-flex p-3 bg-light rounded w-100">
                <div className="me-3 text-secondary"><Globe size={32} /></div>
                <div>
                  <h5 className="fw-bold">Custom Branding</h5>
                  <p className="text-muted small mb-0">White-label your invoices by uploading your custom logo and selecting your company's exact brand color.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-5 pt-4 border-top">
          <h3 className="fw-bold mb-3">Ready to transform your billing process?</h3>
          <Link to="/" className="btn btn-lg btn-primary rounded-pill px-5">Get Started for Free</Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
