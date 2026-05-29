import { Link, useNavigate } from "react-router-dom";
import { AppContext, initialInvoiceData } from "../context/AppContext.jsx";
import { useContext } from "react";
import Logo from "./Logo.jsx";
import {
  SignedIn,
  SignedOut,
  useClerk,
  UserButton,
} from "@clerk/clerk-react";

const Menubar = () => {
  const { setInvoiceData, setSelectedTemplate, setInvoiceTitle, getNewInvoice } =
    useContext(AppContext);
  const navigate = useNavigate();
  const { openSignIn } = useClerk();
  const handleGenerateClick = () => {
    // Reset context
    setInvoiceData(getNewInvoice());
    setSelectedTemplate("template1");
    setInvoiceTitle("Create Invoice");

    navigate("/generate");
  };

  const openLogin = () => {
    openSignIn({});
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container py-2">
        {/* Brand logo and name */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <Logo 
            height={42} 
            width={42} 
            style={{ 
              transition: "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              borderRadius: "12px",
              filter: "drop-shadow(0 2px 8px rgba(99, 102, 241, 0.2))"
            }} 
            className="logo-hover" 
          />
          <span
            className="fs-4 mx-3"
            style={{ 
              letterSpacing: "-0.5px", 
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "800"
            }}
          >
            SmartInvoice
          </span>
        </Link>
        {/* Navbar toggler for smaller screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/">
                Home
              </Link>
            </li>
            <SignedIn>
              <li className="nav-item">
                <Link className="nav-link fw-medium" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link fw-medium"
                  onClick={handleGenerateClick}
                >
                  Generate
                </button>
              </li>
              <UserButton userProfileMode="navigation" userProfileUrl="/profile" />
            </SignedIn>
            <SignedOut>
              <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                <button
                  className="btn btn-primary rounded-pill px-4"
                  onClick={openLogin}
                >
                  Login/Signup
                </button>
              </li>
            </SignedOut>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menubar;
