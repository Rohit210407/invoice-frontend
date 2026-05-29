import Logo from "../../components/Logo.jsx";
import { useContext } from "react";
import './LandingPage.css';
import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext.jsx";
import { assets } from "../../assets/assets.js";
import { Github, Linkedin, ArrowRight, CheckCircle2 } from 'lucide-react';

const LandingPage = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const { openSignIn } = useClerk();
    const { setInvoiceData, setSelectedTemplate, setInvoiceTitle, getNewInvoice } = useContext(AppContext);

    const handleActionButton = () => {
        if (user) {
            setInvoiceData(getNewInvoice());
            setSelectedTemplate("template1");
            setInvoiceTitle("Create Invoice");
            navigate("/generate");
        } else {
            openSignIn({});
        }
    }

    return (
        <>
            {/* Hero Section: Full-width, centered text with background image (Retained Upper Part) */}
            <header id="hero" className="hero-section text-white text-center">
                <div className="container py-5 d-flex flex-column justify-content-center" style={{ minHeight: '85vh' }}>
                    <div className="row py-lg-5">
                        <div className="col-lg-9 col-md-10 mx-auto">
                            <div className="d-flex justify-content-center mb-4">
                                <Logo 
                                    height={120} 
                                    width={120} 
                                    className="hero-logo img-fluid"
                                    style={{
                                        filter: "drop-shadow(0 15px 35px rgba(99, 102, 241, 0.5))",
                                        borderRadius: "28px",
                                        animation: "logoFloat 5s ease-in-out infinite",
                                        border: "1px solid rgba(255, 255, 255, 0.2)"
                                    }}
                                />
                            </div>
                            <h1 className="display-3 fw-bold mb-3 text-gradient-glow" style={{ letterSpacing: "-1.5px" }}>
                                SmartInvoice
                            </h1>
                            <h3 className="mb-5 text-white fw-normal" style={{ letterSpacing: "-0.5px" }}>
                                Effortless Invoicing. Professional Results.
                            </h3>
                            <p>
                                {/* Primary call to action */}
                                <button onClick={handleActionButton} className="btn btn-lg btn-warning fw-bold rounded-pill my-2 mx-1 px-5 py-3">
                                    Generate Your First Invoice
                                </button>
                                {/* Secondary call to action */}
                                <Link to="/about" className="btn btn-lg btn-outline-light rounded-pill my-2 mx-1 px-5 py-3">
                                    Learn More
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* How It Works Section: Explains the process in steps using premium glassmorphism */}
            <section id="how-it-works" className="py-5 landing-dark-section">
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <div className="badge px-3 py-2 rounded-pill mb-3" style={{ background: "rgba(99, 102, 241, 0.15)", color: "#818cf8", border: "1px solid rgba(99, 102, 241, 0.25)", fontSize: "14px", fontWeight: "600" }}>
                            Workflow
                        </div>
                        <h2 className="text-center mb-3 display-5 fw-bold text-white" style={{ letterSpacing: "-1px" }}>Get Started in 4 Simple Steps</h2>
                        <p className="fs-6 mx-auto" style={{ color: "#d1d5db", maxWidth: "550px" }}>
                            SmartInvoice streamlines your billing operations. Go from draft to paid statement in seconds.
                        </p>
                    </div>
                    
                    <div className="row g-4 justify-content-center">
                        {/* Step 1 Card */}
                        <div className="col-md-6 col-lg-3 d-flex">
                            <div className="card landing-glass-card h-100 text-center flex-fill p-4">
                                <div className="d-flex align-items-center justify-content-center mb-4 mt-2">
                                    <div className="landing-step-badge step-1">1</div>
                                </div>
                                <div className="card-body p-0">
                                    <h5 className="card-title fw-bold mb-3 text-dark fs-5">Enter Details</h5>
                                    <p className="landing-step-desc mb-0">
                                        Quickly fill in your clients information, item descriptions, quantities, and prices. Our intuitive form makes it a breeze.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Step 2 Card */}
                        <div className="col-md-6 col-lg-3 d-flex">
                            <div className="card landing-glass-card h-100 text-center flex-fill p-4">
                                <div className="d-flex align-items-center justify-content-center mb-4 mt-2">
                                    <div className="landing-step-badge step-2">2</div>
                                </div>
                                <div className="card-body p-0">
                                    <h5 className="card-title fw-bold mb-3 text-dark fs-5">Choose Template</h5>
                                    <p className="landing-step-desc mb-0">
                                        Browse our gallery of professionally designed templates. Pick one that matches your brand and style.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Step 3 Card */}
                        <div className="col-md-6 col-lg-3 d-flex">
                            <div className="card landing-glass-card h-100 text-center flex-fill p-4">
                                <div className="d-flex align-items-center justify-content-center mb-4 mt-2">
                                    <div className="landing-step-badge step-3">3</div>
                                </div>
                                <div className="card-body p-0">
                                    <h5 className="card-title fw-bold mb-3 text-dark fs-5">Preview Invoice</h5>
                                    <p className="landing-step-desc mb-0">
                                        See exactly how your invoice will look before sending it. Make any last-minute adjustments with ease.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Step 4 Card */}
                        <div className="col-md-6 col-lg-3 d-flex">
                            <div className="card landing-glass-card h-100 text-center flex-fill p-4">
                                <div className="d-flex align-items-center justify-content-center mb-4 mt-2">
                                    <div className="landing-step-badge step-4">4</div>
                                </div>
                                <div className="card-body p-0">
                                    <h5 className="card-title fw-bold mb-3 text-dark fs-5">Download & Save</h5>
                                    <p className="landing-step-desc mb-0">
                                        Download your invoice as a PDF, send it directly via email, or save it for your records and future reference.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section: Highlights key benefits with images and premium checklist */}
            <section id="features" className="py-5 landing-dark-section">
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <div className="badge px-3 py-2 rounded-pill mb-3" style={{ background: "rgba(168, 85, 247, 0.15)", color: "#c084fc", border: "1px solid rgba(168, 85, 247, 0.25)", fontSize: "14px", fontWeight: "600" }}>
                            Value Propositions
                        </div>
                        <h2 className="text-center mb-4 display-5 fw-bold text-white" style={{ letterSpacing: "-1px" }}>Why Choose SmartInvoice?</h2>
                    </div>

                    {/* Feature 1 */}
                    <div className="row align-items-center gy-5 mt-2">
                        <div className="col-lg-6">
                            <div className="landing-feature-img-wrapper">
                                <img
                                    src={assets.landing1}
                                    className="img-fluid w-100"
                                    alt="Invoice Customization"
                                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/1e293b/FFFFFF?text=Customization'; }}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 ps-lg-5">
                            <div className="badge px-3 py-1 rounded-pill mb-3" style={{ background: "rgba(99, 102, 241, 0.15)", color: "#818cf8", fontSize: "12px", fontWeight: "600" }}>
                                Custom Branding
                            </div>
                            <h3 className="fw-bold text-white mb-3 h2" style={{ letterSpacing: "-0.5px" }}>Easy to fill invoice details</h3>
                            <p className="lead fs-5 mb-4" style={{ color: "#d1d5db", lineHeight: "1.7" }}>
                                SmartInvoice provides standard data structures that auto-populate default business headers, tax ratios, currencies, and translation properties instantly. No manual typing required.
                            </p>
                            <div className="d-flex flex-column gap-2">
                                <div className="bullet-glow-item">Curated list of templates from gallery.</div>
                                <div className="bullet-glow-item">Add your logo and invoice details.</div>
                                <div className="bullet-glow-item">Tailor fields to your needs.</div>
                            </div>
                        </div>
                    </div>

                    <div className="landing-divider"></div>

                    {/* Feature 2 */}
                    <div className="row align-items-center gy-5 mt-2 flex-lg-row-reverse">
                        <div className="col-lg-6">
                            <div className="landing-feature-img-wrapper">
                                <img
                                    src={assets.landing2}
                                    className="img-fluid w-100"
                                    alt="Time Saving"
                                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/1e293b/FFFFFF?text=Dashboard'; }}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 pe-lg-5">
                            <div className="badge px-3 py-1 rounded-pill mb-3" style={{ background: "rgba(16, 185, 129, 0.15)", color: "#34d399", fontSize: "12px", fontWeight: "600" }}>
                                Live Insights
                            </div>
                            <h3 className="fw-bold text-white mb-3 h2" style={{ letterSpacing: "-0.5px" }}>Beautiful Dashboard</h3>
                            <p className="lead fs-5 mb-4" style={{ color: "#d1d5db", lineHeight: "1.7" }}>
                                Gain full financial clarity using automated analytical widgets. View outstanding statements, track unpaid accounts, and auto-convert currencies in one place.
                            </p>
                            <div className="d-flex flex-column gap-2">
                                <div className="bullet-glow-item">View the previous invoices.</div>
                                <div className="bullet-glow-item">Your saved invoices with thumbnail.</div>
                                <div className="bullet-glow-item">Reuse one or more invoices.</div>
                                <div className="bullet-glow-item">Track the invoices.</div>
                            </div>
                        </div>
                    </div>

                    <div className="landing-divider"></div>

                    {/* Feature 3 */}
                    <div className="row align-items-center gy-5 mt-2">
                        <div className="col-lg-6">
                            <div className="landing-feature-img-wrapper">
                                <img
                                    src={assets.landing3}
                                    className="img-fluid w-100"
                                    alt="Invoice Customization"
                                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/1e293b/FFFFFF?text=Preview'; }}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 ps-lg-5">
                            <div className="badge px-3 py-1 rounded-pill mb-3" style={{ background: "rgba(236, 72, 153, 0.15)", color: "#f472b6", fontSize: "12px", fontWeight: "600" }}>
                                Live Editor
                            </div>
                            <h3 className="fw-bold text-white mb-3 h2" style={{ letterSpacing: "-0.5px" }}>Invoice Preview with Action Buttons</h3>
                            <p className="lead fs-5 mb-4" style={{ color: "#d1d5db", lineHeight: "1.7" }}>
                                What you see is exactly what your client gets. View your fully formatted live templates side-by-side with your input configurations instantly.
                            </p>
                            <div className="d-flex flex-column gap-2">
                                <div className="bullet-glow-item">Live preview.</div>
                                <div className="bullet-glow-item">Switch between multiple invoices.</div>
                                <div className="bullet-glow-item">One click to Save, Download and Delete invoices.</div>
                            </div>
                        </div>
                    </div>

                    <div className="landing-divider"></div>

                    {/* Feature 4 */}
                    <div className="row align-items-center gy-5 mt-2 flex-lg-row-reverse">
                        <div className="col-lg-6">
                            <div className="landing-feature-img-wrapper">
                                <img
                                    src={assets.landing4}
                                    className="img-fluid w-100"
                                    alt="Time Saving"
                                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/1e293b/FFFFFF?text=Delivery'; }}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 pe-lg-5">
                            <div className="badge px-3 py-1 rounded-pill mb-3" style={{ background: "rgba(6, 182, 212, 0.15)", color: "#22d3ee", fontSize: "12px", fontWeight: "600" }}>
                                Direct Dispatch
                            </div>
                            <h3 className="fw-bold text-white mb-3 h2" style={{ letterSpacing: "-0.5px" }}>Send invoices instantly</h3>
                            <p className="lead fs-5 mb-4" style={{ color: "#d1d5db", lineHeight: "1.7" }}>
                                Deliver billing statements securely and instantly to clients. Connect email services to send PDF structures or automated checkout statements smoothly.
                            </p>
                            <div className="d-flex flex-column gap-2">
                                <div className="bullet-glow-item">Send invoices instantly without leaving the application.</div>
                                <div className="bullet-glow-item">One click to send invoices.</div>
                                <div className="bullet-glow-item">Send unlimited invoices.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section: Final prompt for users to start */}
            <section id="generate-invoice" className="py-5 text-center landing-cta-premium text-white">
                <div className="container py-5">
                    <h2 className="display-4 fw-bold mb-3 text-white" style={{ letterSpacing: "-1px" }}>Ready to Streamline Your Invoicing?</h2>
                    <p className="lead mb-5 mx-auto" style={{ maxWidth: '600px', color: '#e5e7eb', fontSize: '1.15rem', lineHeight: '1.7' }}>
                        Join thousands of freelancers and small businesses who trust SmartInvoice.
                        Start creating professional invoices today – its fast, easy, and effective!
                    </p>
                    <button className="btn-pulse-glow" onClick={handleActionButton}>
                        Start Generating Invoices Now
                    </button>
                </div>
            </section>

            {/* Footer: Copyright and social media links */}
            <footer className="py-5 bg-dark text-white-50" style={{ background: "#05070c !important", borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <div className="container text-center">
                    <Logo 
                        height={60} 
                        width={60} 
                        style={{
                            borderRadius: "16px",
                            filter: "drop-shadow(0 4px 15px rgba(99, 102, 241, 0.3))",
                            border: "1px solid rgba(255, 255, 255, 0.1)"
                        }}
                    />
                    <p className="text-white fw-bold mt-3 fs-5 mb-1" style={{ letterSpacing: "-0.5px" }}>SmartInvoice</p>
                    <p className="mb-0 small" style={{ color: "#4b5563" }}>
                        &copy; {new Date().getFullYear()} SmartInvoice. All Rights Reserved.
                    </p>
                    <p className="mt-3">
                        <a href="https://github.com/Rohit210407" target="_blank" rel="noreferrer" className="text-white-50 me-3 d-inline-block hover-scale" style={{ transition: "all 0.3s ease" }} onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.transform = 'scale(1.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.transform = 'scale(1)'; }}>
                            <Github size={26} />
                        </a>
                        <a href="https://www.linkedin.com/in/rohit-wankhede-7a0b2b257" target="_blank" rel="noreferrer" className="text-white-50 d-inline-block hover-scale" style={{ transition: "all 0.3s ease" }} onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.transform = 'scale(1.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.transform = 'scale(1)'; }}>
                            <Linkedin size={26} />
                        </a>
                    </p>
                </div>
            </footer>
        </>
    );
}

export default LandingPage;