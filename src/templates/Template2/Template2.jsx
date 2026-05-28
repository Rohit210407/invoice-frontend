import "./Template2.css";

const Template2 = ({ data }) => {
  const subtotal = data.items.reduce(
    (acc, item) => acc + item.qty * item.amount,
    0
  );
  const taxAmount = (subtotal * parseFloat(data.tax || 0)) / 100;
  const total = subtotal + taxAmount;

  const themeColor = data.themeColor || "#0d6efd";
  const lightBg = `${themeColor}0a`; // ~4% opacity
  const borderBg = `${themeColor}26`; // ~15% opacity

  // Generate dynamic QR Code
  const qrData = data.paymentLink || (data.id ? `${window.location.origin}/preview` : "https://github.com/Rohit210407");
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}&color=${themeColor.replace("#", "")}`;

  return (
    <div className="template2 mx-auto my-4 p-5 w-800 bg-white shadow-sm rounded-4 border border-light">
      {/* Header: Logo Left, QR Code Right */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div className="d-flex align-items-center gap-3">
          {data.companyLogo ? (
            <img 
              src={data.companyLogo} 
              alt="Company Logo" 
              style={{ maxHeight: "68px", maxWidth: "200px", objectFit: "contain", borderRadius: "10px" }} 
            />
          ) : (
            <div className="p-3 rounded-3 text-white fw-bold d-flex align-items-center justify-content-center" style={{ backgroundColor: themeColor, width: "50px", height: "50px", fontSize: "20px" }}>
              {data.companyName ? data.companyName.charAt(0).toUpperCase() : "S"}
            </div>
          )}
          <div>
            <h4 className="m-0 fw-bold text-dark" style={{ letterSpacing: "-0.5px" }}>{data.companyName || "Company Name"}</h4>
            <span className="badge mt-1 border px-2 py-1 rounded text-uppercase" style={{ fontSize: "9px", borderColor: borderBg, color: themeColor, backgroundColor: lightBg }}>
              {data.status || "Draft"}
            </span>
          </div>
        </div>
        <div className="text-end">
          <img 
            src={qrCodeUrl} 
            alt="Scan to pay" 
            style={{ width: "85px", height: "85px", border: `1px solid ${borderBg}`, padding: "4px", borderRadius: "12px", backgroundColor: "#fff" }} 
          />
        </div>
      </div>

      {/* Invoice Meta and Details Panel */}
      <div className="p-4 rounded-4 mb-4" style={{ backgroundColor: lightBg, border: `1px solid ${borderBg}` }}>
        <div className="row g-3">
          <div className="col-sm-3">
            <span className="small text-muted d-block mb-1 text-uppercase tracking-wider" style={{ fontSize: "10px" }}>Invoice Number</span>
            <strong className="text-dark" style={{ fontSize: "15px" }}>{data.invoiceNumber || "N/A"}</strong>
          </div>
          <div className="col-sm-3">
            <span className="small text-muted d-block mb-1 text-uppercase tracking-wider" style={{ fontSize: "10px" }}>Issue Date</span>
            <span className="text-dark" style={{ fontSize: "14px" }}>{data.invoiceDate || "N/A"}</span>
          </div>
          <div className="col-sm-3">
            <span className="small text-muted d-block mb-1 text-uppercase tracking-wider" style={{ fontSize: "10px" }}>Due Date</span>
            <span className="text-dark fw-semibold" style={{ fontSize: "14px" }}>{data.paymentDate || "N/A"}</span>
          </div>
          <div className="col-sm-3 text-sm-end text-start">
            <span className="small text-muted d-block mb-1 text-uppercase tracking-wider" style={{ fontSize: "10px" }}>Total Due</span>
            <strong className="fs-5" style={{ color: themeColor }}>₹{total.toFixed(2)}</strong>
          </div>
        </div>
      </div>

      {/* Client Address Blocks */}
      <div className="row g-4 mb-5" style={{ fontSize: "13px" }}>
        <div className="col-sm-6">
          <h6 className="fw-bold mb-2 small text-uppercase tracking-wider text-muted">Sender Information</h6>
          <p className="mb-1 text-dark fw-medium">{data.companyName}</p>
          <p className="mb-1 text-secondary">{data.companyAddress}</p>
          <p className="mb-0 text-secondary">Phone: {data.companyPhone}</p>
        </div>
        <div className="col-sm-6 text-sm-end text-start">
          <h6 className="fw-bold mb-2 small text-uppercase tracking-wider text-muted">Billed To</h6>
          <p className="mb-1 text-dark fw-bold" style={{ fontSize: "14px" }}>{data.billingName}</p>
          <p className="mb-1 text-secondary">{data.billingAddress}</p>
          <p className="mb-0 text-secondary">Phone: {data.billingPhone}</p>
        </div>
      </div>

      {/* Table */}
      <div className="mb-4">
        <div className="table-responsive rounded-4 border overflow-hidden" style={{ borderColor: borderBg }}>
          <table className="table table-borderless align-middle m-0" style={{ fontSize: "13.5px" }}>
            <thead>
              <tr style={{ backgroundColor: lightBg, borderBottom: `1px solid ${borderBg}` }}>
                <th className="p-3 fw-bold text-uppercase tracking-wider" style={{ fontSize: "11px", color: themeColor }}>Item & Description</th>
                <th className="p-3 text-center fw-bold text-uppercase tracking-wider" style={{ width: "10%", fontSize: "11px", color: themeColor }}>Qty</th>
                <th className="p-3 text-end fw-bold text-uppercase tracking-wider" style={{ width: "20%", fontSize: "11px", color: themeColor }}>Rate</th>
                <th className="p-3 text-end fw-bold text-uppercase tracking-wider" style={{ width: "20%", fontSize: "11px", color: themeColor }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.items && data.items.map((item, index) => (
                <tr key={index} style={{ borderBottom: index < data.items.length - 1 ? `1px solid ${borderBg}` : "none" }}>
                  <td className="p-3">
                    <strong className="text-dark d-block">{item.name}</strong>
                    <span className="small text-muted">{item.description}</span>
                  </td>
                  <td className="p-3 text-center text-secondary fw-semibold">{item.qty}</td>
                  <td className="p-3 text-end text-secondary">₹{item.amount?.toFixed(2)}</td>
                  <td className="p-3 text-end fw-bold text-dark">₹{(item.qty * item.amount).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Card */}
      <div className="row g-3 justify-content-end mb-5">
        <div className="col-md-5">
          <div className="p-4 rounded-4" style={{ backgroundColor: lightBg, border: `1px solid ${borderBg}`, fontSize: "13.5px" }}>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">Subtotal</span>
              <span className="fw-semibold text-dark">₹{subtotal.toFixed(2)}</span>
            </div>
            {data.tax > 0 && (
              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary">Tax ({data.tax}%)</span>
                <span className="fw-semibold text-dark">₹{taxAmount.toFixed(2)}</span>
              </div>
            )}
            <hr className="my-3" style={{ borderColor: borderBg }} />
            <div className="d-flex justify-content-between fw-bold align-items-center" style={{ fontSize: "17px" }}>
              <span style={{ color: themeColor }}>Total Due</span>
              <span style={{ color: themeColor }}>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Banking & Remarks Row */}
      <div className="row g-4 mt-2" style={{ fontSize: "12.5px" }}>
        {(data.accountName || data.accountNumber || data.accountIfscCode) && (
          <div className="col-md-6">
            <div className="p-4 rounded-4 h-100" style={{ border: `1px solid #f3f4f6`, backgroundColor: "#fafafa" }}>
              <h6 className="fw-bold mb-3 text-uppercase text-secondary tracking-wider" style={{ fontSize: "10px" }}>Bank Details</h6>
              {data.accountName && <p className="mb-2 text-muted"><strong>Holder:</strong> <span className="text-dark">{data.accountName}</span></p>}
              {data.accountNumber && <p className="mb-2 text-muted"><strong>Account:</strong> <span className="text-dark">{data.accountNumber}</span></p>}
              {data.accountIfscCode && <p className="mb-0 text-muted"><strong>IFSC:</strong> <span className="text-dark">{data.accountIfscCode}</span></p>}
            </div>
          </div>
        )}
        {data.notes && (
          <div className="col-md-6">
            <div className="p-4 rounded-4 h-100" style={{ border: `1px solid #f3f4f6`, backgroundColor: "#fafafa" }}>
              <h6 className="fw-bold mb-3 text-uppercase text-secondary tracking-wider" style={{ fontSize: "10px" }}>Terms & Remarks</h6>
              <p className="mb-0 text-muted" style={{ whiteSpace: "pre-line" }}>{data.notes}</p>
            </div>
          </div>
        )}
      </div>

      {/* Modern Center Footer */}
      <div className="text-center mt-5 pt-3">
        <p className="text-muted fw-bold mb-0" style={{ letterSpacing: "-0.5px", fontSize: "14px", opacity: 0.6 }}>
          SmartInvoice <span style={{ color: themeColor }}>⚡</span> Quick Pay
        </p>
      </div>
    </div>
  );
};

export default Template2;
