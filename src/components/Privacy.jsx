import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X} from 'lucide-react'

const Privacy = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
                                <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <img
                                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3c8420ce-a39b-4b2c-b958-15de02c20e1c.png"
                                alt="Global Trust Bank Logo"
                                className="h-10 mr-2"
                            />
                            <span className="text-xl font-bold text-blue-900">Precious Trust Bank</span>
                        </div>

                        <nav className="hidden md:flex space-x-8 ms-5">
                            {['Personal', 'Business', 'Investments', 'About Us', 'Contact'].map((link) => (
                                <Link key={link} to="#" className="text-blue-900 hover:text-blue-600 font-medium no-underline">{link}</Link>
                            ))}
                        </nav>

                        <div className="hidden md:block">
                            <button className="btn btn-outline-primary  px-5 py-2 rounded-full hover:bg-blue-700 transition w-full h-14 ms-5">
                                Sign In
                            </button>
                        </div>

                        <div className="hidden md:block">
                            <Link to={"/open"}>
                                <button className="btn btn-primary text-white px-5 py-2 rounded-full hover:bg-blue-700 transition w-full h-14 ms-4">
                                    Open an account
                                </button>
                            </Link>
                        </div>

                        <button className="md:hidden text-blue-900" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>

                    {isOpen && (
                        <div className="mt-4 md:hidden animate-slide-down">
                            <div className="flex flex-col space-y-4 pb-4">
                                {['Personal', 'Business', 'Investments', 'About Us', 'Contact'].map((link) => (
                                    <Link key={link} to="#" className="text-blue-900 hover:text-blue-600">{link}</Link>
                                ))}
                                <Link to={"/login"}>
                                    <button className="btn btn-outline-primary  px-5 py-2 rounded-full hover:bg-blue-700 transition w-full mb-2">
                                        Sign In
                                    </button>
                                </Link>
                                <Link to={"/open"}>
                                    <button className="btn btn-primary text-white px-5 py-2 rounded-full hover:bg-blue-700 transition w-full">
                                        Open an account
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </header>
            <section className="py-5 bg-light" style={{minHeight: '100vh'}}>
                <div className="container">
                    <h2 className="mb-4 text-center fw-bold mt-5">Privacy Policy</h2>
                    <p className="lead text-center text-muted mb-5">Your trust is precious to us. Here's how we protect it.</p>

                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="accordion" id="privacyAccordion">

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                                            1. Information We Collect
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#privacyAccordion">
                                        <div className="accordion-body">
                                            We collect personal information such as name, contact details, financial data, and usage behavior to serve you better and ensure secure banking.
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                                            2. How We Use Your Data
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#privacyAccordion">
                                        <div className="accordion-body">
                                            We use your data to provide personalized banking services, enhance security, meet legal obligations, and improve our offerings.
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                                            3. Data Security
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#privacyAccordion">
                                        <div className="accordion-body">
                                            We implement advanced encryption, access control, and monitoring tools to keep your data safe and secure at all times.
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingFour">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour">
                                            4. Your Rights & Choices
                                        </button>
                                    </h2>
                                    <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#privacyAccordion">
                                        <div className="accordion-body">
                                            You have the right to access, correct, or delete your data at any time. Contact us to manage your privacy preferences.
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <p className="text-center text-muted mt-4 small">
                                For full details, please contact our support team or visit the Terms & Conditions page.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Privacy
