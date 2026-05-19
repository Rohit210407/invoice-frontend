import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { AppContext, initialInvoiceData } from "../context/AppContext.jsx";
import { getAllInvoices } from "../service/invoiceService.js";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString();
};

function Dashboard() {
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();
  const { baseURL, setInvoiceData, setSelectedTemplate, setInvoiceTitle } =
    useContext(AppContext);

  const { getToken } = useAuth();

  useEffect(() => {
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
    fetchInvoices();
  }, [baseURL, getToken]);

  const handleViewClick = (invoice) => {
    setInvoiceData(invoice);
    setSelectedTemplate(invoice.template || "template1");
    setInvoiceTitle(invoice.title || "View Invoice");
    navigate("/preview");
  };

  const handleCreateNew = () => {
    // Reset to initial state from context if needed
    setInvoiceTitle("Create Invoice");
    setSelectedTemplate("template1");
    setInvoiceData(JSON.parse(JSON.stringify(initialInvoiceData)));
    navigate("/generate");
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Paid": return "bg-success";
      case "Sent": return "bg-info";
      case "Overdue": return "bg-danger";
      default: return "bg-secondary"; // Draft
    }
  };

  const paidRevenue = invoices
    .filter(inv => inv.status === "Paid")
    .reduce((sum, inv) => {
      const subtotal = inv.items?.reduce((s, item) => s + (item.qty * item.amount), 0) || 0;
      const tax = (subtotal * (inv.tax || 0)) / 100;
      return sum + subtotal + tax;
    }, 0);

  const outstandingBalance = invoices
    .filter(inv => inv.status !== "Paid")
    .reduce((sum, inv) => {
      const subtotal = inv.items?.reduce((s, item) => s + (item.qty * item.amount), 0) || 0;
      const tax = (subtotal * (inv.tax || 0)) / 100;
      return sum + subtotal + tax;
    }, 0);

  const chartData = Object.values(invoices.reduce((acc, inv) => {
    const date = formatDate(inv.createdAt || inv.lastUpdatedAt);
    if (!acc[date]) acc[date] = { date, revenue: 0 };
    if (inv.status === "Paid") {
      const subtotal = inv.items?.reduce((s, item) => s + (item.qty * item.amount), 0) || 0;
      const tax = (subtotal * (inv.tax || 0)) / 100;
      acc[date].revenue += (subtotal + tax);
    }
    return acc;
  }, {})).slice(-7);

  return (
    <div className="container py-5">
      {/* Analytics Dashboard */}
      <div className="row mb-5 g-4">
        <div className="col-md-4">
          <div className="card shadow-sm h-100 bg-primary text-white p-3 border-0">
            <h5>Total Revenue</h5>
            <h2 className="mb-0">₹{paidRevenue.toFixed(2)}</h2>
            <small>From {invoices.filter(i => i.status === "Paid").length} paid invoices</small>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm h-100 bg-warning text-dark p-3 border-0">
            <h5>Outstanding Balance</h5>
            <h2 className="mb-0">₹{outstandingBalance.toFixed(2)}</h2>
            <small>Awaiting payment</small>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm h-100 bg-info text-white p-3 border-0">
            <h5>Total Invoices</h5>
            <h2 className="mb-0">{invoices.length}</h2>
            <small>All time</small>
          </div>
        </div>
      </div>

      {chartData.length > 0 && (
        <div className="card shadow-sm mb-5 p-4 border-0">
          <h5 className="mb-4">Revenue Overview (Last 7 Active Days)</h5>
          <div style={{ height: 300, width: '100%' }}>
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                <Line type="monotone" dataKey="revenue" stroke="#0d6efd" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <h4 className="mb-4">Your Invoices</h4>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
        {/* Create New Invoice Card */}
        <div className="col">
          <div
            className="card h-100 d-flex justify-content-center align-items-center border border-2 border-light shadow-sm"
            style={{ cursor: "pointer", minHeight: "270px" }}
            onClick={handleCreateNew}
          >
            <Plus size={48} />
            <p className="mt-3 fw-medium">Create New Invoice</p>
          </div>
        </div>

        {/* Render Existing Invoices */}
        {invoices.map((invoice, idx) => (
          <div key={idx} className="col">
            <div
              className="card h-100 shadow-sm"
              style={{ cursor: "pointer", minHeight: "270px" }}
              onClick={() => handleViewClick(invoice)}
            >
              {(invoice.logo || invoice.thumbnailUrl) && (
                <img
                  src={invoice.logo || invoice.thumbnailUrl}
                  className="card-img-top"
                  alt="Invoice Thumbnail"
                  style={{ height: "200px", objectFit: "contain", backgroundColor: "#f8f9fa", padding: "1rem" }}
                />
              )}
              <div className="card-body">
                <h6 className="card-title mb-1">
                  {invoice.title}
                  <span className={`badge ms-2 ${getStatusBadge(invoice.status || "Draft")}`}>
                    {invoice.status || "Draft"}
                  </span>
                </h6>
                <small className="text-muted">
                  Last Updated: {formatDate(invoice.lastUpdatedAt)}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
