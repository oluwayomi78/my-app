import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Terms = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <header className="bg-white shadow-md sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <img
                            src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3c8420ce-a39b-4b2c-b958-15de02c20e1c.png"
                            alt="Precious Bank Logo"
                            className="h-10 mr-2"
                        />
                        <span className="text-xl font-bold text-blue-900">Precious Trust Bank</span>
                    </div>

                    <nav className="hidden md:flex space-x-8">
                        {['Personal', 'Business', 'Investments', 'About Us', 'Contact'].map((link) => (
                            <Link
                                key={link}
                                to="#"
                                className="text-blue-900 hover:text-blue-600 font-medium no-underline"
                            >
                                {link}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/login">
                            <button className="border border-blue-700 text-blue-700 px-5 py-2 rounded-full hover:bg-blue-700 hover:text-white transition">
                                Sign In
                            </button>
                        </Link>
                        <Link to="/open">
                            <button className="bg-blue-700 text-white px-5 py-2 rounded-full hover:bg-blue-800 transition">
                                Open an Account
                            </button>
                        </Link>
                    </div>


                    <button
                        className="md:hidden text-blue-900"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {isOpen && (
                    <div className="px-4 pb-4 md:hidden bg-white border-t">
                        <div className="flex flex-col space-y-4 mt-2">
                            {['Personal', 'Business', 'Investments', 'About Us', 'Contact'].map((link) => (
                                <Link
                                    key={link}
                                    to="#"
                                    className="text-blue-900 hover:text-blue-600"
                                >
                                    {link}
                                </Link>
                            ))}
                            <Link to="/login">
                                <button className="border border-blue-700 text-blue-700 px-5 py-2 rounded-full hover:bg-blue-700 hover:text-white transition w-full">
                                    Sign In
                                </button>
                            </Link>
                            <Link to="/open">
                                <button className="bg-blue-700 text-white px-5 py-2 rounded-full hover:bg-blue-800 transition w-full">
                                    Open an Account
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-20">
                <div className="container mx-auto text-center px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                        Welcome to <span className="text-yellow-500">Precious Bank</span>
                    </h1>
                    <p className="text-lg mt-4 text-gray-700 font-medium">
                        Not Just Valuable — <strong>Precious.</strong>
                    </p>
                    <Link
                        to="/open"
                        className="inline-block mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-full transition"
                    >
                        Get Started
                    </Link>
                </div>
            </section>
        </>
    );
};

export default Terms;
