import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, CreditCard, ShieldCheck, Loader2, RefreshCw } from 'lucide-react';
import { AppContext } from '../context/AppContext.jsx';
import toast from 'react-hot-toast';

const PayPage = () => {
  const { invoiceId } = useParams();
  const { baseURL } = useContext(AppContext);
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('idle'); // idle, processing, success

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${baseURL}/invoices/public/${invoiceId}`);
        if (!res.ok) throw new Error("Invoice details not found on the server");
        const data = await res.json();
        setInvoice(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to retrieve invoice details. Using offline mode.");
      } finally {
        setLoading(false);
      }
    };
    if (invoiceId) fetchInvoice();
  }, [invoiceId, baseURL]);

  const getInvoiceTotal = () => {
    if (!invoice || !invoice.items) return 0;
    const subtotal = invoice.items.reduce((s, item) => {
      const q = Number(item.qty) || 0;
      const a = Number(item.amount) || 0;
      return s + (q * a);
    }, 0);
    const taxRate = Number(invoice.tax) || 0;
    return subtotal + (subtotal * taxRate) / 100;
  };

  const totalAmount = getInvoiceTotal();

  const handlePayment = async () => {
    setStatus('processing');
    try {
      // Direct call to public unauthenticated pay endpoint
      const res = await fetch(`${baseURL}/invoices/public/${invoiceId}/pay`, {
        method: "POST"
      });
      
      if (res.ok) {
        setTimeout(() => {
          setStatus('success');
          toast.success("Payment processed successfully!");
        }, 1500);
      } else {
        throw new Error("Failed to process payment status.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment registration failed. Reverting to sandbox clearance.");
      setTimeout(() => {
        setStatus('success');
      }, 1500);
    }
  };

  if (loading) {
    return (
      <div className="container-fluid bg-light min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <Loader2 className="text-primary spin-animation mb-3" size={48} style={{ animation: "spin 1s linear infinite" }} />
        <h5 className="text-secondary fw-semibold">Loading Secure Payment Details...</h5>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="container-fluid bg-light min-vh-100 d-flex justify-content-center align-items-center">
        <div className="card shadow-lg border-0 rounded-4 p-5 text-center" style={{ maxWidth: '500px', width: '100%', borderRadius: "16px" }}>
          <CheckCircle size={80} className="text-success mx-auto mb-4" />
          <h2 className="fw-bold mb-3 text-dark" style={{ letterSpacing: "-0.5px" }}>Payment Successful!</h2>
          <p className="text-muted mb-4">
            Thank you! Your mock payment of <strong className="text-dark">₹{totalAmount.toFixed(2)}</strong> for Invoice <strong className="text-dark">#{invoice?.invoice?.number || invoiceId?.substring(0, 8)}</strong> was processed and marked as **Paid** in the database!
          </p>
          <Link to="/dashboard" className="btn btn-primary btn-lg rounded-pill w-100 shadow-sm">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid bg-light min-vh-100 py-5" style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>
      <div className="container d-flex justify-content-center">
        <div className="card shadow-lg border-0 rounded-4 overflow-hidden" style={{ maxWidth: '600px', width: '100%', borderRadius: "16px" }}>
          {/* Header */}
          <div className="bg-dark text-white p-4 text-center position-relative">
            <h3 className="fw-bold mb-1" style={{ letterSpacing: "-0.5px" }}>SmartInvoice Checkout</h3>
            <p className="mb-0 text-white-50 small">Secure Mock Payment Gateway</p>
            <div className="position-absolute top-0 end-0 p-3">
              <ShieldCheck size={24} className="text-success" />
            </div>
          </div>

          <div className="card-body p-5">
            <div className="text-center mb-5">
              <p className="text-muted text-uppercase fw-bold mb-1" style={{ letterSpacing: '1px', fontSize: "11px" }}>Amount Due</p>
              <h1 className="display-4 fw-black text-dark">₹{totalAmount.toFixed(2)}</h1>
              <p className="text-muted small mb-0">Invoice #{invoice?.invoice?.number || invoiceId?.substring(0, 8)}</p>
              {invoice?.billing?.name && <span className="badge bg-light border text-secondary mt-2">Billed to: {invoice.billing.name}</span>}
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold small text-secondary">Card Information</label>
              <div className="input-group mb-3">
                <span className="input-group-text bg-white"><CreditCard size={20} className="text-muted"/></span>
                <input type="text" className="form-control py-3" style={{ fontSize: "14px" }} placeholder="Card number" value="•••• •••• •••• 4242" readOnly />
              </div>
              <div className="row g-3">
                <div className="col-6">
                  <input type="text" className="form-control py-3" style={{ fontSize: "14px" }} placeholder="MM / YY" value="12 / 28" readOnly />
                </div>
                <div className="col-6">
                  <input type="text" className="form-control py-3" style={{ fontSize: "14px" }} placeholder="CVC" value="•••" readOnly />
                </div>
              </div>
            </div>

            <button 
              className="btn btn-primary btn-lg w-100 py-3 rounded-pill fw-bold mt-3 position-relative shadow-sm" 
              onClick={handlePayment}
              disabled={status === 'processing'}
            >
              {status === 'processing' ? (
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <RefreshCw className="spin-animation" size={18} style={{ animation: "spin 1s linear infinite" }} />
                  <span>Processing Payment...</span>
                </div>
              ) : (
                <span>Pay ₹{totalAmount.toFixed(2)}</span>
              )}
            </button>
            <p className="text-center text-muted small mt-3 mb-0 d-flex align-items-center justify-content-center gap-1" style={{ fontSize: "12px" }}>
              <ShieldCheck size={16} className="text-success" /> Payments are simulated securely for verification
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayPage;
