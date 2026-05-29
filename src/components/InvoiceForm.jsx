import { Trash2 } from "lucide-react";
import { assets } from "../assets/assets.js";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext.jsx";

const InvoiceForm = () => {
  const { invoiceData, setInvoiceData, convertCurrency, userProfile } = useContext(AppContext);
  const handleChange = (section, field, value) => {
    setInvoiceData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleItemChange = (index, field, value) => {
    const items = invoiceData.items.map((item, i) => {
      if (i === index) {
        const newItem = { ...item, [field]: value };
        if (field === "qty" || field === "amount") {
          newItem.total = (newItem.qty || 0) * (newItem.amount || 0);
        }
        return newItem;
      }
      return item;
    });
    setInvoiceData((prev) => ({ ...prev, items }));
  };

  const addItem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { name: "", qty: 1, amount: 0, total: 0, description: "" },
      ],
    }));
  };

  const deleteItem = (index) => {
    const items = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData((prev) => ({ ...prev, items }));
  };

  const handleSameAsBilling = () => {
    setInvoiceData((prev) => ({
      ...prev,
      shipping: { ...prev.billing },
    }));
  };

  const calculateTotals = () => {
    const subtotal = invoiceData.items.reduce(
      (sum, item) => sum + (item.total || 0),
      0
    );
    const taxRate = Number(invoiceData.tax || 0);
    const taxAmount = (subtotal * taxRate) / 100;
    const grandTotal = subtotal + taxAmount;
    return { subtotal, taxAmount, grandTotal };
  };

  const { subtotal, taxAmount, grandTotal } = calculateTotals();

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInvoiceData((prev) => ({
          ...prev,
          logo: reader.result, // base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // Only generate if it's not already set (for example, editing an existing invoice)
    if (!invoiceData.invoice.number) {
      const randomNumber = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
      setInvoiceData((prev) => ({
        ...prev,
        invoice: { ...prev.invoice, number: randomNumber },
      }));
    }
  }, [invoiceData.invoice.number, setInvoiceData]);

  return (
    <div className="invoiceform container py-4">
      {/* COMPANY LOGO */}
      <div className="mb-4">
        <h5>Company Logo</h5>
        <div className="d-flex align-items-center gap-3">
          <label htmlFor="image" className="form-label">
            <img
              src={invoiceData.logo ? invoiceData.logo : assets.upload_area}
              alt=""
              width={98}
            />
          </label>
          <input
            type="file"
            className="form-control"
            name="logo"
            id="image"
            hidden
            accept="image/*"
            onChange={handleLogoUpload}
          />
        </div>
      </div>

      {/* BRANDING, CURRENCY & LANGUAGE */}
      <div className="mb-4 row g-3">
        <div className="col-md-3">
          <h5>Status</h5>
          <select
            className="form-select"
            value={invoiceData.status || "Draft"}
            onChange={(e) => setInvoiceData(prev => ({ ...prev, status: e.target.value }))}
          >
            <option value="Draft">Draft</option>
            <option value="Sent">Sent</option>
            <option value="Paid">Paid</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
        <div className="col-md-3">
          <h5>Currency</h5>
          <select
            className="form-select"
            value={invoiceData.currency || "INR"}
            onChange={(e) => {
              const selectedCurrency = e.target.value;
              const rate = convertCurrency(1.0, selectedCurrency, userProfile?.homeCurrency || "INR");
              setInvoiceData(prev => ({
                ...prev,
                currency: selectedCurrency,
                exchangeRate: rate || 1.0,
              }));
            }}
          >
            <option value="INR">INR (₹)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="JPY">JPY (¥)</option>
            <option value="AUD">AUD (A$)</option>
            <option value="CAD">CAD (C$)</option>
          </select>
        </div>
        <div className="col-md-3">
          <h5>Language</h5>
          <select
            className="form-select"
            value={invoiceData.language || "EN"}
            onChange={(e) => setInvoiceData(prev => ({ ...prev, language: e.target.value }))}
          >
            <option value="EN">English</option>
            <option value="ES">Spanish (Español)</option>
            <option value="FR">French (Français)</option>
            <option value="DE">German (Deutsch)</option>
            <option value="HI">Hindi (हिन्दी)</option>
          </select>
        </div>
        <div className="col-md-3">
          <h5>Theme Color</h5>
          <div className="d-flex align-items-center gap-2">
            <input
              type="color"
              className="form-control form-control-color"
              style={{ maxWidth: '60px' }}
              value={invoiceData.themeColor || "#0d6efd"}
              onChange={(e) => setInvoiceData(prev => ({ ...prev, themeColor: e.target.value }))}
            />
            <span className="text-muted small">PDF Color</span>
          </div>
        </div>
      </div>

      {/* RECURRING INVOICES CONFIG */}
      <div className="mb-4 card p-3 shadow-sm border border-light">
        <div className="form-check form-switch d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-1 fw-bold text-dark">🔄 Recurring Invoice Template</h5>
            <span className="text-muted small">Auto-generate and email billing statements to your client</span>
          </div>
          <input
            className="form-check-input"
            type="checkbox"
            style={{ width: "50px", height: "24px" }}
            id="isRecurringSwitch"
            checked={invoiceData.isRecurring || false}
            onChange={(e) => {
              const checked = e.target.checked;
              // Set next generation date as 30 days out if enabling
              const nextGen = checked ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() : null;
              setInvoiceData(prev => ({
                ...prev,
                isRecurring: checked,
                recurringInterval: prev.recurringInterval || "MONTHLY",
                recurrenceStatus: checked ? "ACTIVE" : "PAUSED",
                nextGenerationDate: nextGen
              }));
            }}
          />
        </div>
        {invoiceData.isRecurring && (
          <div className="row g-3 mt-2 pt-2 border-top">
            <div className="col-md-6">
              <label className="form-label small fw-bold">Recurrence Period</label>
              <select
                className="form-select"
                value={invoiceData.recurringInterval || "MONTHLY"}
                onChange={(e) => {
                  const val = e.target.value;
                  let diff = 30 * 24 * 60 * 60 * 1000;
                  if (val === "WEEKLY") diff = 7 * 24 * 60 * 60 * 1000;
                  else if (val === "YEARLY") diff = 365 * 24 * 60 * 60 * 1000;
                  setInvoiceData(prev => ({
                    ...prev,
                    recurringInterval: val,
                    nextGenerationDate: new Date(Date.now() + diff).toISOString()
                  }));
                }}
              >
                <option value="WEEKLY">Every Week (Weekly)</option>
                <option value="MONTHLY">Every Month (Monthly)</option>
                <option value="YEARLY">Every Year (Yearly)</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-bold text-muted">Next Generation Target</label>
              <input
                type="text"
                className="form-control bg-light"
                value={invoiceData.nextGenerationDate ? new Date(invoiceData.nextGenerationDate).toLocaleDateString() : "N/A"}
                disabled
              />
            </div>
          </div>
        )}
      </div>
      {/* COMPANY INFO */}
      <div className="mb-4">
        <h5>Your Company</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Company Name"
              value={invoiceData.company.name}
              onChange={(e) => handleChange("company", "name", e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Company Phone"
              value={invoiceData.company.phone}
              onChange={(e) => handleChange("company", "phone", e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input
              type="email"
              className="form-control"
              placeholder="Company Email"
              value={invoiceData.company.email || ""}
              onChange={(e) => handleChange("company", "email", e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Tax / GST Number"
              value={invoiceData.company.gst || ""}
              onChange={(e) => handleChange("company", "gst", e.target.value)}
            />
          </div>
          <div className="col-12">
            <input
              type="text"
              className="form-control"
              placeholder="Company Address"
              value={invoiceData.company.address}
              onChange={(e) =>
                handleChange("company", "address", e.target.value)
              }
            />
          </div>
        </div>
      </div>

      {/* BILL TO */}
      <div className="mb-4">
        <h5>Bill To</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={invoiceData.billing.name}
              onChange={(e) => handleChange("billing", "name", e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Phone"
              value={invoiceData.billing.phone}
              onChange={(e) => handleChange("billing", "phone", e.target.value)}
            />
          </div>
          <div className="col-12">
            <input
              type="email"
              className="form-control"
              placeholder="Client Email Address (required for auto-billing)"
              value={invoiceData.billing.email || ""}
              onChange={(e) => handleChange("billing", "email", e.target.value)}
            />
          </div>
          <div className="col-12">
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              value={invoiceData.billing.address}
              onChange={(e) =>
                handleChange("billing", "address", e.target.value)
              }
            />
          </div>
        </div>
      </div>

      {/* SHIP TO */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5>Ship To</h5>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="sameAsBilling"
              onChange={handleSameAsBilling}
            />
            <label className="form-check-label" htmlFor="sameAsBilling">
              Same as Bill To
            </label>
          </div>
        </div>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={invoiceData.shipping.name}
              onChange={(e) => handleChange("shipping", "name", e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Phone"
              value={invoiceData.shipping.phone}
              onChange={(e) =>
                handleChange("shipping", "phone", e.target.value)
              }
            />
          </div>
          <div className="col-12">
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              value={invoiceData.shipping.address}
              onChange={(e) =>
                handleChange("shipping", "address", e.target.value)
              }
            />
          </div>
        </div>
      </div>

      {/* INVOICE INFO */}
      <div className="mb-4">
        <h5>Invoice Information</h5>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Invoice Number</label>
            <input
              disabled
              type="text"
              className="form-control"
              value={invoiceData.invoice.number}
              onChange={(e) =>
                handleChange("invoice", "number", e.target.value)
              }
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Invoice Date</label>
            <input
              type="date"
              className="form-control"
              placeholder="Invoice Date"
              value={invoiceData.invoice.date}
              onChange={(e) => handleChange("invoice", "date", e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Invoice Due Date</label>
            <input
              type="date"
              className="form-control"
              placeholder="Due Date"
              value={invoiceData.invoice.dueDate}
              onChange={(e) =>
                handleChange("invoice", "dueDate", e.target.value)
              }
            />
          </div>
        </div>
      </div>

      {/* ITEM DETAILS */}
      <div className="mb-4">
        <h5>Item Details</h5>
        {invoiceData.items.map((item, index) => (
          <div key={index} className="card p-3 mb-3">
            <div className="row g-3 mb-2">
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Item Name"
                  value={item.name}
                  onChange={(e) =>
                    handleItemChange(index, "name", e.target.value)
                  }
                />
              </div>
              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Qty"
                  value={item.qty}
                  onChange={(e) =>
                    handleItemChange(index, "qty", Number(e.target.value))
                  }
                />
              </div>
              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Amount"
                  value={item.amount}
                  onChange={(e) =>
                    handleItemChange(index, "amount", Number(e.target.value))
                  }
                />
              </div>
              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control bg-light"
                  placeholder="Total"
                  value={item.total}
                  readOnly
                />
              </div>
            </div>
            <div className="d-flex gap-2">
              <textarea
                className="form-control"
                placeholder="Description"
                value={item.description}
                onChange={(e) =>
                  handleItemChange(index, "description", e.target.value)
                }
              />
              {invoiceData.items.length > 1 && (
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => deleteItem(index)}
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-primary" onClick={addItem}>
          Add Item
        </button>
      </div>

      {/* Account info */}
      <div className="mb-4">
        <h5>Bank Account Details</h5>
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              placeholder="Account Name"
              className="form-control"
              value={invoiceData.account.name}
              onChange={(e) => handleChange("account", "name", e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Account number"
              value={invoiceData.account.number}
              onChange={(e) =>
                handleChange("account", "number", e.target.value)
              }
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Branch/IFSC Code"
              value={invoiceData.account.ifsccode}
              onChange={(e) =>
                handleChange("account", "ifsccode", e.target.value)
              }
            />
          </div>
        </div>
      </div>

      {/* TOTALS */}
      <div className="mb-4">
        <h5>Totals</h5>
        <div className="d-flex justify-content-end">
          <div className="w-100 w-md-50">
            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center my-2">
              <label htmlFor="taxInput" className="me-2">
                Tax Rate (%)
              </label>
              <input
                id="taxInput"
                type="number"
                min="0"
                max="100"
                className="form-control w-50 text-end"
                value={invoiceData.tax}
                onChange={(e) => {
                  let value = e.target.value;
                  if (value !== "") {
                    const numValue = Number(value);
                    if (numValue < 0) {
                      value = "0";
                    } else if (numValue > 100) {
                      value = "100";
                    }
                  }
                  setInvoiceData((prev) => ({ ...prev, tax: value }));
                }}
              />
            </div>
            <div className="d-flex justify-content-between">
              <span>Tax Amount</span>
              <span>₹{taxAmount.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between fw-bold mt-2">
              <span>Grand Total</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* NOTES */}
      <div className="mb-4">
        <h5>Notes:</h5>
        <div className="w-100">
          <textarea
            name="notes"
            rows="3"
            className="form-control"
            value={invoiceData.notes}
            onChange={(e) =>
              setInvoiceData((prev) => ({ ...prev, notes: e.target.value }))
            }
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
