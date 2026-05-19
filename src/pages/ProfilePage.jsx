import React, { useContext, useState } from 'react';
import { UserProfile } from '@clerk/clerk-react';
import { Building2, CreditCard, Save } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const BusinessProfilePage = () => {
  const { initialInvoiceData } = useContext(AppContext);
  const [companyData, setCompanyData] = useState({
    name: initialInvoiceData.company.name || '',
    email: 'contact@mycompany.com',
    phone: initialInvoiceData.company.phone || '',
    address: initialInvoiceData.company.address || '',
    gst: 'GSTIN123456789',
  });

  const handleSave = () => {
    // Mock save logic
    toast.success('Business profile updated successfully!');
  };

  return (
    <div className="p-4 w-100">
      <h2 className="h4 fw-bold mb-4">Business Profile</h2>
      <p className="text-muted mb-4">
        Set your default business details here. These will be automatically populated into new invoices you generate.
      </p>

      <div className="mb-3">
        <label className="form-label fw-medium">Company Name</label>
        <input 
          type="text" 
          className="form-control" 
          value={companyData.name} 
          onChange={(e) => setCompanyData({...companyData, name: e.target.value})} 
          placeholder="e.g. Acme Corp" 
        />
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label fw-medium">Business Email</label>
          <input 
            type="email" 
            className="form-control" 
            value={companyData.email} 
            onChange={(e) => setCompanyData({...companyData, email: e.target.value})} 
          />
        </div>
        <div className="col-md-6 mt-3 mt-md-0">
          <label className="form-label fw-medium">Phone Number</label>
          <input 
            type="text" 
            className="form-control" 
            value={companyData.phone} 
            onChange={(e) => setCompanyData({...companyData, phone: e.target.value})} 
          />
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label fw-medium">Business Address</label>
        <textarea 
          className="form-control" 
          rows="3" 
          value={companyData.address} 
          onChange={(e) => setCompanyData({...companyData, address: e.target.value})} 
        />
      </div>
      <div className="mb-4">
        <label className="form-label fw-medium">Tax / GST Number</label>
        <input 
          type="text" 
          className="form-control" 
          value={companyData.gst} 
          onChange={(e) => setCompanyData({...companyData, gst: e.target.value})} 
        />
      </div>

      <button className="btn btn-primary d-flex align-items-center gap-2" onClick={handleSave}>
        <Save size={18} /> Save Changes
      </button>
    </div>
  );
};

const SubscriptionPage = () => {
  return (
    <div className="p-4 w-100">
      <h2 className="h4 fw-bold mb-4">Subscription & Billing</h2>
      
      <div className="card border-primary mb-4 shadow-sm">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">Enterprise Plan</h5>
          <span className="badge bg-light text-primary">Active</span>
        </div>
        <div className="card-body">
          <h3 className="card-title fw-bold">₹1,999<span className="fs-6 text-muted fw-normal">/month</span></h3>
          <p className="card-text text-muted">Next billing date: <strong>{new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}</strong></p>
          <hr />
          <ul className="list-unstyled mb-0">
            <li className="mb-2">✓ Unlimited Invoices</li>
            <li className="mb-2">✓ Custom Branding & Templates</li>
            <li className="mb-2">✓ Analytics Dashboard</li>
            <li>✓ Stripe Payment Integrations</li>
          </ul>
        </div>
      </div>

      <div className="d-flex gap-3">
        <button className="btn btn-outline-primary">Manage Billing</button>
        <button className="btn btn-outline-danger">Cancel Plan</button>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  return (
    <div className="container-fluid bg-light min-vh-100 py-5">
      <div className="container d-flex justify-content-center">
        <UserProfile path="/profile" routing="path" appearance={{ elements: { card: "shadow-lg border-0 w-100", rootBox: "w-100" }}}>
          <UserProfile.Page 
            label="Business Profile" 
            labelIcon={<Building2 size={16} />} 
            url="business-profile"
          >
            <BusinessProfilePage />
          </UserProfile.Page>
          
          <UserProfile.Page 
            label="Subscription" 
            labelIcon={<CreditCard size={16} />} 
            url="subscription"
          >
            <SubscriptionPage />
          </UserProfile.Page>
        </UserProfile>
      </div>
    </div>
  );
};

export default ProfilePage;
