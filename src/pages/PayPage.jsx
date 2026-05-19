import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, CreditCard, ShieldCheck } from 'lucide-react';

const PayPage = () => {
  const { invoiceId } = useParams();
  const [status, setStatus] = useState('idle'); // idle, processing, success

  const handlePayment = () => {
    setStatus('processing');
    setTimeout(() => {
      setStatus('success');
    }, 2000);
  };

  if (status === 'success') {
    return (
      <div className="container-fluid bg-light min-vh-100 d-flex justify-content-center align-items-center">
        <div className="card shadow-lg border-0 rounded-4 p-5 text-center" style={{ maxWidth: '500px', width: '100%' }}>
          <CheckCircle size={80} className="text-success mx-auto mb-4" />
          <h2 className="fw-bold mb-3">Payment Successful!</h2>
          <p className="text-muted mb-4">
            Thank you! Your mock payment for Invoice <strong>#{invoiceId?.substring(0, 8)}</strong> was processed successfully.
          </p>
          <Link to="/dashboard" className="btn btn-primary btn-lg rounded-pill w-100">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid bg-light min-vh-100 py-5">
      <div className="container d-flex justify-content-center">
        <div className="card shadow-lg border-0 rounded-4 overflow-hidden" style={{ maxWidth: '600px', width: '100%' }}>
          {/* Header */}
          <div className="bg-dark text-white p-4 text-center position-relative">
            <h3 className="fw-bold mb-1">SmartInvoice Checkout</h3>
            <p className="mb-0 text-white-50">Secure Mock Payment Gateway</p>
            <div className="position-absolute top-0 end-0 p-3">
              <ShieldCheck size={24} className="text-success" />
            </div>
          </div>

          <div className="card-body p-5">
            <div className="text-center mb-5">
              <p className="text-muted text-uppercase fw-bold mb-1" style={{ letterSpacing: '1px' }}>Amount Due</p>
              <h1 className="display-4 fw-bold">₹1,250.00</h1>
              <p className="text-muted small">Invoice #{invoiceId?.substring(0, 8)}</p>
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold">Card Information</label>
              <div className="input-group mb-3">
                <span className="input-group-text bg-white"><CreditCard size={20} className="text-muted"/></span>
                <input type="text" className="form-control py-3" placeholder="Card number" value="•••• •••• •••• 4242" readOnly />
              </div>
              <div className="row g-3">
                <div className="col-6">
                  <input type="text" className="form-control py-3" placeholder="MM / YY" value="12 / 28" readOnly />
                </div>
                <div className="col-6">
                  <input type="text" className="form-control py-3" placeholder="CVC" value="•••" readOnly />
                </div>
              </div>
            </div>

            <button 
              className="btn btn-primary btn-lg w-100 py-3 rounded-pill fw-bold mt-3 position-relative" 
              onClick={handlePayment}
              disabled={status === 'processing'}
            >
              {status === 'processing' ? (
                <span>Processing...</span>
              ) : (
                <span>Pay ₹1,250.00</span>
              )}
            </button>
            <p className="text-center text-muted small mt-3 mb-0 d-flex align-items-center justify-content-center gap-1">
              <ShieldCheck size={16} /> Payments are processed securely
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayPage;
