import "./Template1.css";

const Template1 = ({ data }) => {
  const subtotal = data.items.reduce(
    (acc, item) => acc + item.qty * item.amount,
    0
  );
  const taxAmount = (subtotal * parseFloat(data.tax || 0)) / 100;
  const total = subtotal + taxAmount;

  // Generate dynamic QR Code pointing to payment link or fallbacks
  const qrData = data.paymentLink || (data.id ? `${window.location.origin}/preview` : "https://github.com/Rohit210407");
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}&color=111827&bgcolor=ffffff`;

  return (
    <div className="template1 mx-auto my-4 p-5 w-800 bg-white shadow-sm border border-light">
      {/* Top Header Row: Logo on Left, QR Code on Right */}
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          {data.companyLogo ? (
            <img 
              src={data.companyLogo} 
              alt="Company Logo" 
              className="mb-2" 
              style={{ maxHeight: "75px", maxWidth: "220px", objectFit: "contain" }} 
            />
          ) : (
            <h1 className="fw-black m-0 text-uppercase tracking-tight" style={{ fontSize: "32px", color: "#111827" }}>
              SmartInvoice
            </h1>
          )}
          <p className="small text-uppercase tracking-widest text-muted fw-bold mt-1 mb-0" style={{ fontSize: "10px" }}>
            Printable Invoice
          </p>
        </div>
        <div>
          <img 
            src={qrCodeUrl} 
            alt="Scan to pay / view" 
            style={{ width: "90px", height: "90px", border: "1px solid #e5e7eb", padding: "4px", borderRadius: "8px", backgroundColor: "#fff" }} 
          />
        </div>
      </div>

      {/* Sender Company Info Block (Matches layout) */}
      <div className="row text-secondary mb-4" style={{ fontSize: "12px", lineHeight: "1.6" }}>
        <div className="col-6">
          <p className="mb-1"><strong>Company:</strong> <span className="text-dark">{data.companyName || "N/A"}</span></p>
          <p className="mb-1"><strong>Address:</strong> <span className="text-dark">{data.companyAddress || "N/A"}</span></p>
          <p className="mb-1"><strong>Sender Name:</strong> <span className="text-dark">{data.companyName || "N/A"}</span></p>
        </div>
        <div className="col-6 text-md-end text-start">
          <p className="mb-1"><strong>Telephone/E-mail:</strong> <span className="text-dark">{data.companyPhone || "N/A"}</span></p>
          <p className="mb-1"><strong>Invoice Date:</strong> <span className="text-dark">{data.invoiceDate || "N/A"}</span></p>
          <p className="mb-0"><strong>Due Date:</strong> <span className="text-dark fw-bold">{data.paymentDate || "N/A"}</span></p>
        </div>
      </div>

      <hr className="divider-line my-4" />

      {/* Bill To & Invoice Meta Section */}
      <div className="row mb-5" style={{ fontSize: "13px", lineHeight: "1.7" }}>
        <div className="col-6">
          <h6 className="fw-bold text-dark text-uppercase tracking-wider mb-2" style={{ fontSize: "11px" }}>Send To</h6>
          <p className="mb-1"><strong>Receiver Name:</strong> <span className="text-dark fw-bold">{data.billingName || "N/A"}</span></p>
          <p className="mb-1"><strong>Address:</strong> <span className="text-dark">{data.billingAddress || "N/A"}</span></p>
          <p className="mb-0"><strong>Telephone/E-mail:</strong> <span className="text-dark">{data.billingPhone || "N/A"}</span></p>
        </div>
        <div className="col-6 text-md-end text-start">
          <h6 className="fw-bold text-dark text-uppercase tracking-wider mb-2" style={{ fontSize: "11px" }}>Invoice Details</h6>
          <p className="mb-1"><strong>Invoice Number:</strong> <span className="text-dark fw-bold">{data.invoiceNumber || "N/A"}</span></p>
          <p className="mb-1"><strong>Terms of Payment:</strong> <span className="text-dark">Due on Receipt</span></p>
          <p className="mb-0"><strong>Status:</strong> <span className="badge bg-light text-dark border px-2 py-1 rounded">{data.status || "Draft"}</span></p>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-4">
        <table className="table table-bordered printable-table align-middle" style={{ fontSize: "13px" }}>
          <thead className="table-light-header">
            <tr>
              <th className="p-3 text-uppercase fw-bold text-secondary text-start" style={{ fontSize: "11px", letterSpacing: "0.05em" }}>Description</th>
              <th className="p-3 text-uppercase fw-bold text-secondary text-center" style={{ width: "10%", fontSize: "11px", letterSpacing: "0.05em" }}>Quantity</th>
              <th className="p-3 text-uppercase fw-bold text-secondary text-end" style={{ width: "20%", fontSize: "11px", letterSpacing: "0.05em" }}>Unit Price</th>
              <th className="p-3 text-uppercase fw-bold text-secondary text-end" style={{ width: "20%", fontSize: "11px", letterSpacing: "0.05em" }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.items && data.items.length > 0 ? (
              data.items.map((item, index) => (
                <tr key={index}>
                  <td className="p-3 text-dark">{item.name || "Item description"}</td>
                  <td className="p-3 text-center text-secondary">{item.qty || 0}</td>
                  <td className="p-3 text-end text-secondary">₹{(item.amount || 0).toFixed(2)}</td>
                  <td className="p-3 text-end fw-semibold text-dark">₹{((item.qty || 0) * (item.amount || 0)).toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-3 text-center text-muted">No items added</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Totals Section */}
      <div className="d-flex justify-content-end mb-5">
        <div className="w-100" style={{ maxWidth: "320px", fontSize: "13px" }}>
          <div className="d-flex justify-content-between py-2 border-bottom">
            <span className="text-secondary">Subtotal</span>
            <span className="fw-semibold text-dark">₹{subtotal.toFixed(2)}</span>
          </div>
          {data.tax > 0 && (
            <div className="d-flex justify-content-between py-2 border-bottom">
              <span className="text-secondary">Tax ({data.tax}%)</span>
              <span className="fw-semibold text-dark">₹{taxAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="d-flex justify-content-between py-3">
            <span className="fw-bold text-dark fs-6">Total</span>
            <span className="fw-bold text-dark fs-6" style={{ color: data.themeColor || "#111827" }}>
              ₹{total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Remarks */}
      {data.notes && (
        <div className="mt-4 pt-4 border-top text-muted" style={{ fontSize: "11px" }}>
          <p className="fw-bold text-uppercase text-secondary tracking-wider mb-1" style={{ fontSize: "9px" }}>Remarks / Notes</p>
          <p className="m-0" style={{ whiteSpace: "pre-line" }}>{data.notes}</p>
        </div>
      )}

      {/* Brand logo at bottom center (Matches footer) */}
      <div className="text-center mt-5 pt-3 border-top-0">
        <p className="text-muted fw-bold mb-0" style={{ letterSpacing: "-0.5px", fontSize: "14px", opacity: 0.7 }}>
          <span style={{ color: data.themeColor || "#6366f1" }}>●</span> SmartInvoice
        </p>
      </div>
    </div>
  );
};

export default Template1;
