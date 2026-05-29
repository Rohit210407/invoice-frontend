import './Template5.css';

const Template5 = ({ data }) => {
    const subtotal = data.items.reduce((acc, item) => acc + item.qty * item.amount, 0);
    const taxAmount = (subtotal * parseFloat(data.tax || 0)) / 100;
    const total = subtotal + taxAmount;

    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        } catch (error) {
            return dateString;
        }
    };

    const t = data.t || {
      billedFrom: "Billed From",
      billedTo: "Bill To",
      invoiceNo: "Invoice No",
      date: "Invoice Date",
      dueDate: "Due Date",
      description: "Item # / Description",
      qty: "Quantity",
      rate: "Rate",
      amount: "Amount",
      subtotal: "Subtotal",
      tax: "Tax",
      total: "Total",
      bankDetails: "Bank Account Details",
      holder: "Account Holder",
      number: "Account Number",
      ifsc: "IFSC / Branch Code",
      terms: "Notes"
    };

    return (
        <div className="template5 mx-auto my-4 p-4 border rounded">
            {/* Header */}
            <div className="d-flex flex-column flex-md-row justify-content-between mb-4">
                <div>
                    {data.companyLogo && (
                        <div className="mb-2">
                            <img
                                src={data.companyLogo}
                                alt="Company Logo"
                                width={98}
                            />
                        </div>
                    )}
                    <h4 className="fw-bold">{data.companyName}</h4>
                    <p className="mb-1">{data.companyAddress}</p>
                    <p className="mb-1">{data.companyPhone}</p>
                    {data.companyEmail && <p className="mb-1">{data.companyEmail}</p>}
                    {data.companyGst && <p className="mb-0"><strong>{t.gst || "GSTIN"}:</strong> {data.companyGst}</p>}
                </div>
                <div className="text-md-end w-50">
                    <h5 className="fw-bold">INVOICE</h5>
                    <p className="mb-1"><strong>{t.invoiceNo}:</strong> {data.invoiceNumber}</p>
                    <p className="mb-1"><strong>{t.date}:</strong> {formatDate(data.invoiceDate)}</p>
                    <p className="mb-0"><strong>{t.dueDate}:</strong> {formatDate(data.paymentDate)}</p>
                </div>
            </div>

            {/* Address Section */}
            <div className="row mb-4">
                <div className="col-md-6">
                    <h6 className="fw-bold">{t.billedTo}:</h6>
                    <p className="mb-1">{data.billingName}</p>
                    <p className="mb-1">{data.billingAddress}</p>
                    <p className="mb-0">{data.billingPhone}</p>
                </div>
                {data.shippingName && data.shippingAddress && data.shippingPhone && <div className="col-md-6 text-md-end">
                    <h6 className="fw-bold">Shipped To:</h6>
                    <p className="mb-1">{data.shippingName}</p>
                    <p className="mb-1">{data.shippingAddress}</p>
                    <p className="mb-0">{data.shippingPhone}</p>
                </div>}
            </div>

            {/* Items Table */}
            <div className="table-responsive mb-4">
                <table className="table mb-0 ">
                    <thead className="template5-table-head text-white table-light">
                    <tr>
                        <th className="p-3">{t.description}</th>
                        <th className="p-3 text-center">{t.qty}</th>
                        <th className="p-3 text-center">{t.rate}</th>
                        <th className="p-3 text-end">{t.amount}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.items.map((item, index) => (
                        <tr key={index} className="items-row">
                            <td className="p-3">
                                <div className="fw-bold">{item.name}</div>
                                <div className="text-muted small">{item.description}</div>
                            </td>
                            <td className="p-3 text-center">{item.qty}</td>
                            <td className="p-3 text-center">{data.currencySymbol}{item.amount.toFixed(2)}</td>
                            <td className="p-3 text-end">{data.currencySymbol}{(item.qty * item.amount).toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Totals */}
            <div className="d-flex justify-content-end">
                <div style={{ width: '100%', maxWidth: '400px' }}>
                    <table className="table mb-0">
                        <tbody>
                        <tr>
                            <td><strong>{t.subtotal}</strong></td>
                            <td className="text-end">{data.currencySymbol}{subtotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td><strong>{t.tax} ({data.tax}%)</strong></td>
                            <td className="text-end">{data.currencySymbol}{taxAmount.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td><strong>{t.total}</strong></td>
                            <td className="text-end fw-bold">{data.currencySymbol}{total.toFixed(2)}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bank Account Details Section */}
            {(data.accountName || data.accountNumber || data.accountIfscCode) && (
                <div className="mt-4">
                    <h6 className="mb-2 fw-semibold">{t.bankDetails}</h6>
                    {data.accountName && <p className="mb-1"><strong>{t.holder || "Account Holder"}:</strong> {data.accountName}</p>}
                    {data.accountNumber && <p className="mb-1"><strong>{t.number || "Account Number"}:</strong> {data.accountNumber}</p>}
                    {data.accountIfscCode && <p className="mb-0"><strong>{t.ifsc || "IFSC / Branch Code"}:</strong> {data.accountIfscCode}</p>}
                </div>
            )}

            {/* Notes */}
            {data?.notes && (
                <div className="mt-5">
                    <h6 className="fw-bold">{t.terms}</h6>
                    <p className="mb-0">{data.notes}</p>
                </div>
            )}
        </div>
    );
};

export default Template5;
