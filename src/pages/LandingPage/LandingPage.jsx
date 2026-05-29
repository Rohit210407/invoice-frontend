import Logo from "../../components/Logo.jsx";
import {useContext} from "react";
import './LandingPage.css';
import {useClerk, useUser} from "@clerk/clerk-react";
import {useNavigate, Link} from "react-router-dom";
import {AppContext, initialInvoiceData} from "../../context/AppContext.jsx";
import {assets} from "../../assets/assets.js";
import { Github, Linkedin } from 'lucide-react';

const LandingPage = () => {
    const {user} = useUser();
    const navigate = useNavigate();
    const {openSignIn} = useClerk();
    const {setInvoiceData, setSelectedTemplate, setInvoiceTitle, getNewInvoice} = useContext(AppContext);

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
            {/* Hero Section: Full-width, centered text with background image */}
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

            {/* How It Works Section: Explains the process in steps using cards */}
            <section id="how-it-works" className="py-5 bg-light">
                <div className="container">
                    <h2 className="text-center mb-5 display-5 fw-bold">Get Started in 4 Simple Steps</h2>
                    <div className="row g-4 justify-content-center">
                        {/* Step 1 Card */}
                        <div className="col-md-6 col-lg-3 d-flex">
                            <div className="card h-100 shadow-sm border-0 text-center flex-fill">
                                <div className="card-img-top-container d-flex align-items-center justify-content-center p-4 bg-primary-soft">
                                    <img
                                        src="https://placehold.co/150x150/0D6EFD/FFFFFF?text=1&font=montserrat"
                                        className="rounded-circle"
                                        alt="Enter Invoice Details"
                                        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/150x150/E0E0E0/000000?text=Error'; }}
                                    />
                                </div>
                                <div className="card-body p-4">
                                    <h5 className="card-title fw-bold mb-2 fs-5">Enter Details</h5>
                                    <p className="card-text text-muted small">
                                        Quickly fill in your clients information, item descriptions, quantities, and prices. Our intuitive form makes it a breeze.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Step 2 Card */}
                        <div className="col-md-6 col-lg-3 d-flex">
                            <div className="card h-100 shadow-sm border-0 text-center flex-fill">
                                <div className="card-img-top-container d-flex align-items-center justify-content-center p-4 bg-success-soft">
                                    <img
                                        src="https://placehold.co/150x150/198754/FFFFFF?text=2&font=montserrat"
                                        className="rounded-circle"
                                        alt="Choose Template"
                                        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/150x150/E0E0E0/000000?text=Error'; }}
                                    />
                                </div>
                                <div className="card-body p-4">
                                    <h5 className="card-title fw-bold mb-2 fs-5">Choose Template</h5>
                                    <p className="card-text text-muted small">
                                        Browse our gallery of professionally designed templates. Pick one that matches your brand and style.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Step 3 Card */}
                        <div className="col-md-6 col-lg-3 d-flex">
                            <div className="card h-100 shadow-sm border-0 text-center flex-fill">
                                <div className="card-img-top-container d-flex align-items-center justify-content-center p-4 bg-warning-soft">
                                    <img
                                        src="https://placehold.co/150x150/FFC107/000000?text=3&font=montserrat"
                                        className="rounded-circle"
                                        alt="Preview Invoice"
                                        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/150x150/E0E0E0/000000?text=Error'; }}
                                    />
                                </div>
                                <div className="card-body p-4">
                                    <h5 className="card-title fw-bold mb-2 fs-5">Preview Invoice</h5>
                                    <p className="card-text text-muted small">
                                        See exactly how your invoice will look before sending it. Make any last-minute adjustments with ease.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Step 4 Card */}
                        <div className="col-md-6 col-lg-3 d-flex">
                            <div className="card h-100 shadow-sm border-0 text-center flex-fill">
                                <div className="card-img-top-container d-flex align-items-center justify-content-center p-4 bg-info-soft">
                                    <img
                                        src="https://placehold.co/150x150/0DCAF0/FFFFFF?text=4&font=montserrat"
                                        className="rounded-circle"
                                        alt="Download & Save"
                                        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/150x150/E0E0E0/000000?text=Error'; }}
                                    />
                                </div>
                                <div className="card-body p-4">
                                    <h5 className="card-title fw-bold mb-2 fs-5">Download & Save</h5>
                                    <p className="card-text text-muted small">
                                        Download your invoice as a PDF, send it directly via email, or save it for your records and future reference.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section: Highlights key benefits with images and text */}
            <section id="features" className="py-5">
                <div className="container">
                    <h2 className="text-center mb-5 display-5 fw-bold">Why Choose SmartInvoice?</h2>
                    {/* Feature 1 */}
                    <div className="row align-items-center gy-4">
                        <div className="col-md-6">
                            <img
                                src={assets.landing1}
                                className="img-fluid rounded shadow-lg"
                                alt="Invoice Customization"
                                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/E0E0E0/000000?text=Error'; }}
                            />
                        </div>
                        <div className="col-md-6">
                            <h3 className="fw-bold mx-2">Easy to fill invoice details</h3>
                            <p className="text-muted lead fs-6 mx-2">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                            <ul className="list-unstyled text-muted">
                                <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Curated list of templates from gallery.</li>
                                <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Add your logo and invoice details.</li>
                                <li><i className="bi bi-check-circle-fill text-primary me-2"></i>Tailor fields to your needs.</li>
                            </ul>
                        </div>
                    </div>
                    {/* Feature 2 */}
                    <div className="row align-items-center gy-4 mt-5 flex-row-reverse"> {/* flex-row-reverse alternates image/text */}
                        <div className="col-md-6">
                            <img
                                src={assets.landing2}
                                className="img-fluid rounded shadow-lg"
                                alt="Time Saving"
                                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/E0E0E0/000000?text=Error'; }}
                            />
                        </div>
                        <div className="col-md-6">
                            <h3 className="fw-bold mx-2">Beautiful Dashboard</h3>
                            <p className="text-muted lead fs-6 mx-2">
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <ul className="list-unstyled text-muted">
                                <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>View the previous invoices.</li>
                                <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Your saved invoices with thumbnail.</li>
                                <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Reuse one or more invoices.</li>
                                <li><i className="bi bi-check-circle-fill text-primary me-2"></i>Track the invoices.</li>

                            </ul>
                        </div>
                    </div>
                    {/* Feature 3 */}
                    <div className="row align-items-center gy-4 mt-5">
                        <div className="col-md-6">
                            <img
                                src={assets.landing3}
                                className="img-fluid rounded shadow-lg"
                                alt="Invoice Customization"
                                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/E0E0E0/000000?text=Error'; }}
                            />
                        </div>
                        <div className="col-md-6">
                            <h3 className="fw-bold mx-2">Invoice Preview with Action Buttons</h3>
                            <p className="text-muted lead fs-6 mx-2">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                            <ul className="list-unstyled text-muted">
                                <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Live preview.</li>
                                <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Switch between multiple invoices.</li>
                                <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>One click to Save, Download and Delete invoices.</li>
                            </ul>
                        </div>
                    </div>
                    {/* Feature 4 */}
                    <div className="row align-items-center gy-4 mt-5 flex-row-reverse"> {/* flex-row-reverse alternates image/text */}
                        <div className="col-md-6">
                            <img
                                src={assets.landing4}
                                className="img-fluid rounded shadow-lg"
                                alt="Time Saving"
                                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/E0E0E0/000000?text=Error'; }}
                            />
                        </div>
                        <div className="col-md-6">
                            <h3 className="fw-bold mx-2">Send invoices instantly</h3>
                            <p className="text-muted lead fs-6 mx-2">
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <ul className="list-unstyled text-muted">
                                <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Send invoices instantly without leaving the application.</li>
                                <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>One click to send invoices.</li>
                                <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Send unlimited invoices.</li>

                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section: Final prompt for users to start */}
            <section id="generate-invoice" className="py-5 text-center bg-primary text-white">
                <div className="container">
                    <h2 className="display-5 fw-bold mb-3">Ready to Streamline Your Invoicing?</h2>
                    <p className="lead mb-4 mx-auto" style={{ maxWidth: '600px' }}>
                        Join thousands of freelancers and small businesses who trust SmartInvoice.
                        Start creating professional invoices today – its fast, easy, and effective!
                    </p>
                    <button className="btn btn-lg btn-warning fw-bold rounded-pill px-5 py-3" onClick={handleActionButton}>
                        Start Generating Invoices Now
                    </button>
                </div>
            </section>

            {/* Footer: Copyright and social media links */}
            <footer className="py-5 bg-dark text-white-50">
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
                    <p className="text-white fw-bold mt-3 fs-5" style={{ letterSpacing: "-0.5px" }}>SmartInvoice</p>
                    <p className="mb-0">
                        &copy; {new Date().getFullYear()} SmartInvoice. All Rights Reserved.
                    </p>
                    <p className="mt-3">
                        <a href="https://github.com/Rohit210407" target="_blank" rel="noreferrer" className="text-white-50 me-3" style={{ transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.classList.replace('text-white-50', 'text-white')} onMouseLeave={(e) => e.currentTarget.classList.replace('text-white', 'text-white-50')}>
                            <Github size={28} />
                        </a>
                        <a href="https://www.linkedin.com/in/rohit-wankhede-7a0b2b257" target="_blank" rel="noreferrer" className="text-white-50" style={{ transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.classList.replace('text-white-50', 'text-white')} onMouseLeave={(e) => e.currentTarget.classList.replace('text-white', 'text-white-50')}>
                            <Linkedin size={28} />
                        </a>
                    </p>
                </div>
            </footer>
        </>
    );
}

export default LandingPage;