import "./Template3.css";

const Template3 = ({ data }) => {
  const subtotal = data.items.reduce(
    (acc, item) => acc + item.qty * item.amount,
    0
  );
  const taxAmount = (subtotal * parseFloat(data.tax || 0)) / 100;
  const total = subtotal + taxAmount;

  const themeColor = data.themeColor || "#0d6efd";

  const qrCodeUrl = data.qrCodeUrl;

  return (
    <div className="template3 mx-auto my-4 p-5 w-800 bg-white shadow-sm border border-light">
      {/* Header: Logo Left, QR Code Right */}
      <div className="d-flex justify-content-between align-items-start mb-5 pb-4 border-bottom">
        <div>
          {data.companyLogo ? (
            <img 
              src={data.companyLogo} 
              alt="Company Logo" 
              className="mb-2" 
              style={{ maxHeight: "72px", maxWidth: "210px", objectFit: "contain" }} 
            />
          ) : (
            <h1 className="editorial-title m-0 fw-bold" style={{ fontSize: "30px", letterSpacing: "-0.5px" }}>
              {data.companyName || "SmartInvoice"}
            </h1>
          )}
          <span className="d-block small text-muted text-uppercase tracking-wider mt-1" style={{ fontSize: "9px" }}>
            Official Invoice Document
          </span>
        </div>
        <div>
          <img 
            src={qrCodeUrl} 
            alt="Scan QR to pay" 
            style={{ width: "80px", height: "80px", border: "1px solid #e5e7eb", padding: "4px" }} 
          />
        </div>
      </div>

      {/* Grid aligned company and customer details */}
      <div className="row g-4 mb-5" style={{ fontSize: "13px", lineHeight: "1.6" }}>
        <div className="col-sm-4">
          <span className="small text-muted text-uppercase d-block mb-2 tracking-wider" style={{ fontSize: "9px" }}>Billed From</span>
          <p className="mb-1 fw-bold text-dark">{data.companyName}</p>
          <p className="mb-1 text-secondary">{data.companyAddress}</p>
          <p className="mb-1 text-secondary">Phone: {data.companyPhone}</p>
          {data.companyEmail && <p className="mb-1 text-secondary">Email: {data.companyEmail}</p>}
          {data.companyGst && <p className="mb-0 text-secondary">GSTIN: {data.companyGst}</p>}
        </div>
        <div className="col-sm-4">
          <span className="small text-muted text-uppercase d-block mb-2 tracking-wider" style={{ fontSize: "9px" }}>Billed To</span>
          <p className="mb-1 fw-bold text-dark">{data.billingName}</p>
          <p className="mb-1 text-secondary">{data.billingAddress}</p>
          <p className="mb-0 text-secondary">Phone: {data.billingPhone}</p>
        </div>
        <div className="col-sm-4 text-sm-end text-start">
          <span className="small text-muted text-uppercase d-block mb-2 tracking-wider" style={{ fontSize: "9px" }}>Reference</span>
          <p className="mb-1 text-secondary"><strong>Invoice No:</strong> <span className="text-dark fw-bold">{data.invoiceNumber}</span></p>
          <p className="mb-1 text-secondary"><strong>Date:</strong> <span className="text-dark">{data.invoiceDate}</span></p>
          <p className="mb-0 text-secondary"><strong>Due Date:</strong> <span className="text-dark fw-bold" style={{ color: themeColor }}>{data.paymentDate}</span></p>
        </div>
      </div>

      {/* Fine-line minimalist Table */}
      <div className="mb-4">
        <table className="table table-borderless alignment-middle border-top border-bottom py-2" style={{ fontSize: "13px" }}>
          <thead>
            <tr className="border-bottom text-uppercase" style={{ fontSize: "11px", letterSpacing: "0.06em" }}>
              <th className="p-3 fw-bold text-dark text-start">Description</th>
              <th className="p-3 text-center fw-bold text-dark" style={{ width: "10%" }}>Qty</th>
              <th className="p-3 text-end fw-bold text-dark" style={{ width: "20%" }}>Price</th>
              <th className="p-3 text-end fw-bold text-dark" style={{ width: "20%" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items && data.items.map((item, index) => (
              <tr key={index} className="border-bottom-subtle">
                <td className="p-3 text-dark fw-medium">{item.name}</td>
                <td className="p-3 text-center text-secondary">{item.qty}</td>
                <td className="p-3 text-end text-secondary">₹{item.amount?.toFixed(2)}</td>
                <td className="p-3 text-end fw-bold text-dark">₹{(item.qty * item.amount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Minimalist Totals Row */}
      <div className="row g-3 justify-content-end mb-5">
        <div className="col-md-5">
          <div className="p-2" style={{ fontSize: "13px" }}>
            <div className="d-flex justify-content-between py-1">
              <span className="text-secondary">Subtotal</span>
              <span className="text-dark fw-medium">₹{subtotal.toFixed(2)}</span>
            </div>
            {data.tax > 0 && (
              <div className="d-flex justify-content-between py-1">
                <span className="text-secondary">Tax ({data.tax}%)</span>
                <span className="text-dark fw-medium">₹{taxAmount.toFixed(2)}</span>
              </div>
            )}
            <hr className="my-2" />
            <div className="d-flex justify-content-between fw-bold align-items-center py-1" style={{ fontSize: "16px" }}>
              <span className="text-dark text-uppercase tracking-wider">Total</span>
              <span className="text-dark">₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Remarks & Terms Section */}
      <div className="row g-4 mt-2 border-top pt-4" style={{ fontSize: "12px", lineHeight: "1.6" }}>
        <div className="col-md-6">
          {(data.accountName || data.accountNumber || data.accountIfscCode) && (
            <div>
              <h6 className="fw-bold mb-2 text-dark text-uppercase tracking-wider" style={{ fontSize: "9px" }}>Bank details</h6>
              {data.accountName && <p className="mb-1 text-muted"><strong>Account Holder:</strong> {data.accountName}</p>}
              {data.accountNumber && <p className="mb-1 text-muted"><strong>Account Number:</strong> {data.accountNumber}</p>}
              {data.accountIfscCode && <p className="mb-0 text-muted"><strong>IFSC / Branch:</strong> {data.accountIfscCode}</p>}
            </div>
          )}
        </div>
        <div className="col-md-6">
          {data.notes && (
            <div>
              <h6 className="fw-bold mb-2 text-dark text-uppercase tracking-wider" style={{ fontSize: "9px" }}>Terms & remarks</h6>
              <p className="m-0 text-muted" style={{ whiteSpace: "pre-line" }}>{data.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Elegant Serif Footer */}
      <div className="text-center mt-5 pt-4 border-top">
        <p className="mb-0 editorial-font text-muted italic" style={{ fontSize: "13px" }}>
          Thank you for choosing SmartInvoice.
        </p>
      </div>
    </div>
  );
};

export default Template3;
