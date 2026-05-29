import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Calendar, CreditCard, Mail, CheckCircle, ChevronRight, User } from "lucide-react";
import { AppContext, initialInvoiceData } from "../context/AppContext.jsx";
import { getAllInvoices, saveInvoice } from "../service/invoiceService.js";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString();
};

function Dashboard() {
  const [invoices, setInvoices] = useState([]);
  const [activeTab, setActiveTab] = useState("invoices");
  
  // Search & Filters State
  const [customerSearch, setCustomerSearch] = useState("");
  const [billingFilter, setBillingFilter] = useState("All");
  const [selectedCustomerFilter, setSelectedCustomerFilter] = useState(null);

  const navigate = useNavigate();
  const { baseURL, setInvoiceData, setSelectedTemplate, setInvoiceTitle, getNewInvoice, convertCurrency, userProfile } =
    useContext(AppContext);

  const { getToken } = useAuth();

  const fetchInvoices = async () => {
    try {
      const token = await getToken();
      const response = await getAllInvoices(baseURL, token);
      setInvoices(response.data);
    } catch (error) {
      console.error("Failed to load invoices", error);
      toast.error("Something went wrong. Unable to load invoices");
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [baseURL, getToken]);

  const handleViewClick = (invoice) => {
    setInvoiceData(invoice);
    setSelectedTemplate(invoice.template || "template1");
    setInvoiceTitle(invoice.title || "View Invoice");
    navigate("/preview");
  };

  const handleCreateNew = () => {
    setInvoiceTitle("Create Invoice");
    setSelectedTemplate("template1");
    setInvoiceData(getNewInvoice());
    navigate("/generate");
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Paid": return "bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-1";
      case "Sent": return "bg-info-subtle text-info border border-info-subtle rounded-pill px-3 py-1";
      case "Overdue": return "bg-danger-subtle text-danger border border-danger-subtle rounded-pill px-3 py-1";
      default: return "bg-secondary-subtle text-secondary border border-secondary-subtle rounded-pill px-3 py-1"; // Draft
    }
  };

  const currencySymbols = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    AUD: "A$",
    CAD: "C$",
  };

  const homeSymbol = currencySymbols[userProfile?.homeCurrency || "INR"] || "₹";

  const getInvoiceSymbol = (inv) => {
    return currencySymbols[inv.currency || "INR"] || "₹";
  };

  // Calculations for Invoices
  const getInvoiceTotalAmount = (inv) => {
    const subtotal = inv.items?.reduce((s, item) => s + (item.qty * item.amount), 0) || 0;
    const tax = (subtotal * (inv.tax || 0)) / 100;
    return subtotal + tax;
  };

  const getInvoiceTotalAmountInHomeCurrency = (inv) => {
    const total = getInvoiceTotalAmount(inv);
    const home = userProfile?.homeCurrency || "INR";
    const invoiceCurr = inv.currency || "INR";
    
    if (inv.exchangeRate && inv.exchangeRate !== 1.0) {
      return total * inv.exchangeRate;
    }
    return convertCurrency(total, invoiceCurr, home);
  };

  const paidRevenue = invoices
    .filter(inv => inv.status === "Paid")
    .reduce((sum, inv) => sum + getInvoiceTotalAmountInHomeCurrency(inv), 0);

  const outstandingBalance = invoices
    .filter(inv => inv.status !== "Paid")
    .reduce((sum, inv) => sum + getInvoiceTotalAmountInHomeCurrency(inv), 0);

  const chartData = Object.values(invoices.reduce((acc, inv) => {
    const date = formatDate(inv.createdAt || inv.lastUpdatedAt);
    if (!acc[date]) acc[date] = { date, revenue: 0 };
    if (inv.status === "Paid") {
      acc[date].revenue += getInvoiceTotalAmountInHomeCurrency(inv);
    }
    return acc;
  }, {})).slice(-7);

  // Dynamic Customer CRM Aggregation Helper
  const getCustomersList = () => {
    const customerMap = {};
    invoices.forEach((inv) => {
      const name = inv.billing?.name?.trim() || "";
      if (!name) return;

      const email = inv.billing?.email || "N/A";
      const phone = inv.billing?.phone || "N/A";
      const address = inv.billing?.address || "N/A";
      const totalAmount = getInvoiceTotalAmountInHomeCurrency(inv);
      const isPaid = inv.status === "Paid";

      if (!customerMap[name]) {
        customerMap[name] = {
          name,
          email,
          phone,
          address,
          totalInvoiced: 0,
          totalPaid: 0,
          outstanding: 0,
          invoicesCount: 0,
        };
      }

      customerMap[name].invoicesCount += 1;
      customerMap[name].totalInvoiced += totalAmount;
      if (isPaid) {
        customerMap[name].totalPaid += totalAmount;
      } else {
        customerMap[name].outstanding += totalAmount;
      }
    });

    return Object.values(customerMap);
  };

  const customersList = getCustomersList();
  const filteredCustomers = customersList.filter(cust => 
    cust.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
    cust.email.toLowerCase().includes(customerSearch.toLowerCase())
  );

  // Billings Ledger Helper
  const getFilteredBillings = () => {
    if (billingFilter === "All") return invoices;
    if (billingFilter === "Paid") return invoices.filter(inv => inv.status === "Paid");
    if (billingFilter === "Unpaid") return invoices.filter(inv => inv.status !== "Paid");
    return invoices;
  };

  const filteredBillings = getFilteredBillings();

  // Record Manual Payment Action
  const handleRecordPayment = async (invoice) => {
    try {
      const token = await getToken();
      const updatedInvoice = { ...invoice, status: "Paid" };
      const response = await saveInvoice(baseURL, updatedInvoice, token);
      
      if (response.status === 200) {
        toast.success(`Manual payment recorded for Invoice #${invoice.invoice?.number || invoice.id}!`);
        fetchInvoices(); // Refresh all state
      } else {
        toast.error("Failed to record manual payment.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to record payment.");
    }
  };

  // Send Payment Reminder Simulation
  const handleSendReminder = (email) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Compiling invoice reminder payload...',
        success: `Payment reminder email successfully dispatched to ${email}!`,
        error: 'Failed to send reminder email.',
      }
    );
  };

  const filteredInvoices = selectedCustomerFilter 
    ? invoices.filter(inv => inv.billing?.name === selectedCustomerFilter)
    : invoices;

  return (
    <div className="container py-5" style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>
      
      {/* Dynamic Tab-based Navigation */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-5">
        <ul className="nav nav-pills gap-2 bg-light p-2 rounded-4 shadow-sm border border-light" style={{ borderRadius: "16px" }}>
          <li className="nav-item">
            <button 
              className={`nav-link rounded-pill px-4 py-2 border-0 fw-bold transition ${activeTab === "invoices" ? "active bg-primary text-white" : "text-secondary bg-transparent"}`}
              onClick={() => {
                setActiveTab("invoices");
                setSelectedCustomerFilter(null);
              }}
            >
              📊 Invoices
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link rounded-pill px-4 py-2 border-0 fw-bold transition ${activeTab === "customers" ? "active bg-primary text-white" : "text-secondary bg-transparent"}`}
              onClick={() => setActiveTab("customers")}
            >
              👥 Customer CRM
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link rounded-pill px-4 py-2 border-0 fw-bold transition ${activeTab === "billings" ? "active bg-primary text-white" : "text-secondary bg-transparent"}`}
              onClick={() => setActiveTab("billings")}
            >
              💳 Billings & Ledger
            </button>
          </li>
        </ul>
        
        <button className="btn btn-primary d-flex align-items-center justify-content-center gap-2 rounded-pill px-4 py-2 shadow-sm" onClick={handleCreateNew}>
          <Plus size={20} />
          <strong>Create New Invoice</strong>
        </button>
      </div>

      {/* SUMMARY BANNER CARDS */}
      <div className="row mb-5 g-4">
        <div className="col-md-4">
          <div className="card shadow-sm h-100 p-4 border-0 rounded-4" style={{ background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)", color: "#fff" }}>
            <span className="small text-white-50 text-uppercase tracking-wider fw-bold">Total Revenue</span>
            <h2 className="mb-2 fw-black mt-2">{homeSymbol}{paidRevenue.toFixed(2)}</h2>
            <small className="text-white-50">From {invoices.filter(i => i.status === "Paid").length} paid receipts • Consolidated in {userProfile?.homeCurrency || "INR"}</small>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm h-100 p-4 border-0 rounded-4" style={{ background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", color: "#fff" }}>
            <span className="small className text-white-50 text-uppercase tracking-wider fw-bold">Outstanding Balance</span>
            <h2 className="mb-2 fw-black mt-2">{homeSymbol}{outstandingBalance.toFixed(2)}</h2>
            <small className="text-white-50">Awaiting customer clearance • Consolidated in {userProfile?.homeCurrency || "INR"}</small>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm h-100 p-4 border-0 rounded-4" style={{ background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)", color: "#fff" }}>
            <span className="small className text-white-50 text-uppercase tracking-wider fw-bold">Total Invoices</span>
            <h2 className="mb-2 fw-black mt-2">{invoices.length}</h2>
            <small className="text-white-50">Consolidated history</small>
          </div>
        </div>
      </div>

      {/* ==================== TAB 1: INVOICES ==================== */}
      {activeTab === "invoices" && (
        <>
          {chartData.length > 0 && !selectedCustomerFilter && (
            <div className="card shadow-sm mb-5 p-4 border-0 rounded-4">
              <h5 className="mb-4 fw-bold text-dark">Revenue Overview (Last 7 Active Days)</h5>
              <div style={{ height: 260, width: '100%' }}>
                <ResponsiveContainer>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="date" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip formatter={(value) => `${homeSymbol}${value.toFixed(2)}`} />
                    <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
            <h4 className="fw-bold text-dark m-0">
              {selectedCustomerFilter ? `Invoices for ${selectedCustomerFilter}` : "Your Invoices"}
            </h4>
            {selectedCustomerFilter && (
              <button className="btn btn-sm btn-outline-secondary rounded-pill px-3" onClick={() => setSelectedCustomerFilter(null)}>
                Clear Customer Filter
              </button>
            )}
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
            {/* Create New Card */}
            {!selectedCustomerFilter && (
              <div className="col">
                <div
                  className="card h-100 d-flex justify-content-center align-items-center border border-2 border-dashed shadow-sm rounded-4"
                  style={{ cursor: "pointer", minHeight: "270px", borderColor: "#6366f1" }}
                  onClick={handleCreateNew}
                >
                  <div className="p-3 bg-primary-subtle rounded-circle text-primary mb-3">
                    <Plus size={36} />
                  </div>
                  <strong className="text-dark">Create Invoice</strong>
                </div>
              </div>
            )}

            {/* Render Invoices */}
            {filteredInvoices.map((invoice, idx) => (
              <div key={idx} className="col">
                <div
                  className="card h-100 shadow-sm border border-light rounded-4 overflow-hidden"
                  style={{ cursor: "pointer", minHeight: "270px" }}
                  onClick={() => handleViewClick(invoice)}
                >
                  <div className="d-flex align-items-center justify-content-center p-3 bg-light" style={{ height: "150px" }}>
                    {invoice.logo || invoice.thumbnailUrl ? (
                      <img
                        src={invoice.logo || invoice.thumbnailUrl}
                        className="img-fluid"
                        alt="Invoice Thumbnail"
                        style={{ maxHeight: "120px", objectFit: "contain" }}
                      />
                    ) : (
                      <CreditCard size={48} className="text-secondary" />
                    )}
                  </div>
                  <div className="card-body p-3">
                    <h6 className="card-title fw-bold mb-2 text-truncate text-dark">{invoice.title}</h6>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="small text-muted">{invoice.invoice?.number || `No: ${invoice.id?.substring(0, 5)}`}</span>
                      <strong className="text-dark">{getInvoiceSymbol(invoice)}{getInvoiceTotalAmount(invoice).toFixed(2)}</strong>
                    </div>
                    {invoice.isRecurring && (
                      <div className="mb-2">
                        <span className="badge bg-primary-subtle text-primary rounded-pill small" style={{ fontSize: "10px" }}>
                          🔄 Recurring ({invoice.recurringInterval})
                        </span>
                      </div>
                    )}
                    <div className="d-flex justify-content-between align-items-center">
                      <span className={`badge ${getStatusBadge(invoice.status || "Draft")}`}>
                        {invoice.status || "Draft"}
                      </span>
                      <small className="text-muted" style={{ fontSize: "11px" }}>
                        {formatDate(invoice.lastUpdatedAt)}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ==================== TAB 2: CUSTOMERS ==================== */}
      {activeTab === "customers" && (
        <div className="card shadow-sm border-0 p-4 rounded-4 bg-white">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
            <h5 className="fw-bold text-dark m-0">Customer CRM</h5>
            <div className="position-relative" style={{ maxWidth: "300px", width: "100%" }}>
              <Search className="position-absolute text-muted" size={18} style={{ left: "12px", top: "12px" }} />
              <input 
                type="text" 
                placeholder="Search clients..." 
                className="form-control rounded-pill pl-5 border"
                style={{ paddingLeft: "40px", height: "42px" }}
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th className="py-3 px-4 text-secondary text-uppercase" style={{ fontSize: "11px", fontWeight: "800" }}>Client Name</th>
                  <th className="py-3 px-4 text-secondary text-uppercase" style={{ fontSize: "11px", fontWeight: "800" }}>Contact details</th>
                  <th className="py-3 px-4 text-secondary text-uppercase text-center" style={{ fontSize: "11px", fontWeight: "800" }}>Invoices</th>
                  <th className="py-3 px-4 text-secondary text-uppercase text-end" style={{ fontSize: "11px", fontWeight: "800" }}>Total Billed</th>
                  <th className="py-3 px-4 text-secondary text-uppercase text-end" style={{ fontSize: "11px", fontWeight: "800" }}>Outstanding</th>
                  <th className="py-3 px-4 text-secondary text-uppercase text-center" style={{ fontSize: "11px", fontWeight: "800" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((cust, idx) => (
                    <tr key={idx}>
                      <td className="py-3 px-4">
                        <div className="d-flex align-items-center gap-3">
                          <div className="p-2 bg-primary-subtle rounded-circle text-primary d-flex align-items-center justify-content-center" style={{ width: "38px", height: "38px" }}>
                            <User size={18} />
                          </div>
                          <div>
                            <strong className="text-dark d-block">{cust.name}</strong>
                            <span className="small text-muted">{cust.address}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="d-block text-dark small">{cust.email}</span>
                        <span className="d-block text-muted small">{cust.phone}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="badge bg-light text-dark border px-2 py-1 rounded-pill">{cust.invoicesCount}</span>
                      </td>
                      <td className="py-3 px-4 text-end text-dark fw-bold">{homeSymbol}{cust.totalInvoiced.toFixed(2)}</td>
                      <td className="py-3 px-4 text-end">
                        <span className={`fw-bold ${cust.outstanding > 0 ? "text-danger" : "text-success"}`}>
                          {homeSymbol}{cust.outstanding.toFixed(2)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button className="btn btn-sm btn-outline-primary rounded-pill px-3 d-inline-flex align-items-center gap-1" onClick={() => {
                          setSelectedCustomerFilter(cust.name);
                          setActiveTab("invoices");
                        }}>
                          View Invoices
                          <ChevronRight size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-4 text-center text-muted">No customers found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================== TAB 3: BILLINGS & LEDGER ==================== */}
      {activeTab === "billings" && (
        <div className="card shadow-sm border-0 p-4 rounded-4 bg-white">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
            <h5 className="fw-bold text-dark m-0">Billings & Payments Ledger</h5>
            
            {/* Status Segment Filters */}
            <div className="btn-group border rounded-pill p-1 bg-light">
              {["All", "Paid", "Unpaid"].map((status) => (
                <button
                  key={status}
                  className={`btn btn-sm rounded-pill px-3 py-2 border-0 ${billingFilter === status ? "btn-primary text-white" : "btn-light text-secondary bg-transparent"}`}
                  onClick={() => setBillingFilter(status)}
                >
                  <strong>{status}</strong>
                </button>
              ))}
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th className="py-3 px-4 text-secondary text-uppercase" style={{ fontSize: "11px", fontWeight: "800" }}>Invoice No</th>
                  <th className="py-3 px-4 text-secondary text-uppercase" style={{ fontSize: "11px", fontWeight: "800" }}>Customer</th>
                  <th className="py-3 px-4 text-secondary text-uppercase" style={{ fontSize: "11px", fontWeight: "800" }}>Due Date</th>
                  <th className="py-3 px-4 text-secondary text-uppercase text-end" style={{ fontSize: "11px", fontWeight: "800" }}>Amount</th>
                  <th className="py-3 px-4 text-secondary text-uppercase text-center" style={{ fontSize: "11px", fontWeight: "800" }}>Status</th>
                  <th className="py-3 px-4 text-secondary text-uppercase text-center" style={{ fontSize: "11px", fontWeight: "800" }}>Checkout Link</th>
                  <th className="py-3 px-4 text-secondary text-uppercase text-center" style={{ fontSize: "11px", fontWeight: "800" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBillings.length > 0 ? (
                  filteredBillings.map((inv, idx) => (
                    <tr key={idx}>
                      <td className="py-3 px-4">
                        <strong className="text-dark">#{inv.invoice?.number || `No: ${inv.id?.substring(0, 5)}`}</strong>
                        <span className="d-block text-muted small">{inv.title}</span>
                      </td>
                      <td className="py-3 px-4">
                        <strong className="text-dark d-block">{inv.billing?.name || "Walk-in client"}</strong>
                        <span className="small text-muted">{inv.billing?.email}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="d-flex align-items-center gap-2 small text-secondary">
                          <Calendar size={14} />
                          {inv.invoice?.dueDate || "N/A"}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-end text-dark fw-bold">{getInvoiceSymbol(inv)}{getInvoiceTotalAmount(inv).toFixed(2)}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`badge ${getStatusBadge(inv.status || "Draft")}`}>
                          {inv.status || "Draft"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {inv.paymentLink ? (
                          <a href={inv.paymentLink} target="_blank" rel="noreferrer" className="btn btn-xs btn-outline-success rounded-pill px-3" style={{ fontSize: "12px" }}>
                            Pay Link
                          </a>
                        ) : (
                          <span className="text-muted small">No Link</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="d-flex gap-2 justify-content-center">
                          {inv.status !== "Paid" ? (
                            <>
                              <button className="btn btn-sm btn-success rounded-pill px-3 d-inline-flex align-items-center gap-1" onClick={() => handleRecordPayment(inv)}>
                                <CheckCircle size={14} />
                                Record Pay
                              </button>
                              <button className="btn btn-sm btn-outline-info rounded-pill px-3 d-inline-flex align-items-center gap-1" onClick={() => handleSendReminder(inv.billing?.email)}>
                                <Mail size={14} />
                                Remind
                              </button>
                            </>
                          ) : (
                            <span className="text-success small fw-bold d-inline-flex align-items-center gap-1">
                              <CheckCircle size={16} />
                              Cleared
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-4 text-center text-muted">No transactions registered</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
