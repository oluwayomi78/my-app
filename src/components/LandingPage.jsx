import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

import '../css/Landing.css'

const LandingPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    const features = [
        {
            icon: 'fa-piggy-bank',
            title: 'Savings Accounts',
            description: 'Competitive interest rates with flexible saving options to grow your money.',
        },
        {
            icon: 'fa-home',
            title: 'Home Loans',
            description: 'Special mortgage rates and personalized repayment plans for your dream home.',
        },
        {
            icon: 'fa-credit-card',
            title: 'Credit Cards',
            description: 'Rewards, cash back and travel benefits with our premium credit card options.',
        },
    ];

    const feature = [
        'Instant money transfers and payments',
        'Deposit checks with mobile check capture',
        'Real-time spending notifications',
        'Customizable budgeting tools',
    ];

    const [amount, setAmount] = useState('');
    const [rate, setRate] = useState('');
    const [years, setYears] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState(null);

    const calculateLoan = (e) => {
        e.preventDefault();
        if (!amount || !rate || !years) return;

        const principal = parseFloat(amount);
        const monthlyRate = parseFloat(rate) / 100 / 12;
        const totalPayments = parseFloat(years) * 12;

        const payment =
            (principal * monthlyRate) /
            (1 - Math.pow(1 + monthlyRate, -totalPayments));

        setMonthlyPayment(payment.toFixed(2));
    };

    const testimonials = [
        {
            name: 'Abiodun Temilade',
            role: 'Business Owner',
            comment:
                'PreciousBank has completely changed the way I handle my business finances. Their mobile app is super intuitive, and customer support is top-notch!',
            image: 'https://randomuser.me/api/portraits/women/68.jpg',
        },
        {
            name: 'Babatunde Bright',
            role: 'Software Engineer',
            comment:
                'I love how fast and transparent the loan process is. It’s banking done right!',
            image: 'https://randomuser.me/api/portraits/men/32.jpg',
        },
        {
            name: 'Oyekanmi Grace',
            role: 'Freelancer',
            comment:
                'The budgeting tools and instant notifications keep me financially disciplined. I highly recommend PreciousBank!',
            image: 'https://randomuser.me/api/portraits/women/44.jpg',
        },
    ];
    return (
        <div className="overflow-hidden">
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
                            <Link to={"/login"}>
                            <button className="btn btn-outline-primary  px-5 py-2 rounded-full hover:bg-blue-700 transition w-full h-14 ms-5">
                                Sign In
                            </button>
                            </Link>
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
                                    <button className="btn btn-primary text-white px-5 py-2 rounded-full hover:bg-blue-700  transition w-full">
                                        Open an account
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </header>


            <section className="bg-[#1e419b] text-white py-20">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-10 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Smart Banking for a Digital World
                        </h1>
                        <p className="text-xl mb-8">
                            Experience banking reimagined with our innovative digital solutions
                            designed for your financial success.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition">
                                <Link to="/open">
                                    Open an Account
                                </Link>
                            </button>
                            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-bold transition">
                                Learn More
                            </button>
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <img
                            src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/522ed97d-417f-4e62-b10f-d8fd2a768a93.png"
                            alt="Happy young professional using mobile banking app"
                            className="rounded-lg shadow-xl"
                        />
                    </div>
                </div>
            </section>


            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-blue-900 mb-4">Your Financial Partner</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Comprehensive solutions designed to help you achieve your financial goals
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-xl shadow-md text-center transition-all duration-300 card-hover"
                            >
                                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <i className={`fas ${feature.icon} text-blue-600 text-2xl`}></i>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-blue-900">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-10 md:mb-0">
                            <img
                                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/17b4544b-01a6-4ba5-802c-17e34d755778.png"
                                alt="Mobile banking app interface"
                                className="rounded-lg shadow-xl"
                            />
                        </div>
                        <div className="md:w-1/2 md:pl-12">
                            <h2 className="text-3xl font-bold text-blue-900 mb-6">Banking at Your Fingertips</h2>
                            <p className="text-gray-600 mb-6">
                                Our award-winning mobile app puts you in complete control of your finances, anytime, anywhere.
                            </p>
                            <ul className="space-y-4 mb-8">
                                {feature.map((feature, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex flex-wrap gap-4">
                                <img
                                    src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3df91193-b6f1-4603-90ef-67c7da8b6ebc.png"
                                    alt="Download on the App Store badge"
                                    className="h-12"
                                />
                                <img
                                    src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b876bda5-f894-46e5-9247-4f8677f305c6.png"
                                    alt="Get it on Google Play badge"
                                    className="h-12"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Loan Calculator</h2>
                        <form onSubmit={calculateLoan} className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block mb-1 font-medium">Loan Amount (₦)</label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                                    placeholder="Enter loan amount"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Interest Rate (%)</label>
                                <input
                                    type="number"
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                                    placeholder="e.g. 7.5"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Loan Term (Years)</label>
                                <input
                                    type="number"
                                    value={years}
                                    onChange={(e) => setYears(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                                    placeholder="e.g. 5"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
                            >
                                Calculate
                            </button>
                        </form>

                        {monthlyPayment && (
                            <div className="mt-8 text-center">
                                <h3 className="text-xl font-semibold text-green-600">
                                    Estimated Monthly Payment:
                                </h3>
                                <p className="text-3xl font-bold text-blue-900 mt-2">₦{monthlyPayment}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>


            <section className="py-16 bg-blue-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">What Our Customers Say</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((t, idx) => (
                            <div key={idx} className="bg-white rounded-lg shadow-lg p-6 text-center">
                                <img
                                    src={t.image}
                                    alt={t.name}
                                    className="w-20 h-20 mx-auto rounded-full mb-4 object-cover"
                                />
                                <h3 className="text-xl font-semibold text-gray-800">{t.name}</h3>
                                <p className="text-sm text-blue-500 mb-3">{t.role}</p>
                                <p className="text-gray-600 italic">“{t.comment}”</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            <section className="bg-blue-700 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to take control of your finances?
                    </h2>
                    <p className="text-blue-100 max-w-2xl mx-auto mb-8">
                        Join thousands of satisfied customers who trust PreciousBank for secure, seamless, and smart banking.
                    </p>
                    <Link to={"/open"}>
                        <button className="bg-white text-blue-700 hover:bg-blue-100 font-semibold px-8 py-3 rounded-full inline-flex items-center gap-2 transition">
                            Get Started <ArrowRight size={20} />
                        </button>
                    </Link>
                </div>
            </section>


            <footer className="bg-[#111827] text-white py-12 px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">


                    <div>
                        <h3 className="text-xl font-semibold mb-4">PreciousBank</h3>
                        <p className="text-sm text-blue-100">
                            Building your financial future with smart, secure, and simple banking.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-blue-100">
                            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                            <li><Link to="/features" className="hover:text-white transition">Features</Link></li>
                            <li><Link to="/loans" className="hover:text-white transition">Loans</Link></li>
                            <li><Link to="/testimonials" className="hover:text-white transition">Testimonials</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-2 text-sm text-blue-100">
                            <li className="flex items-center gap-2"><Mail size={16} /> support@preciousbank.com</li>
                            <li className="flex items-center gap-2"><Phone size={16} /> +234 701 234 5678</li>
                            <li className="flex items-center gap-2"><MapPin size={16} /> 24 Allen Avenue, Ikeja, Lagos</li>
                        </ul>


                        <div className="flex gap-4 mt-4 text-blue-100">
                            <Link to="#"><Facebook size={20} /></Link>
                            <Link to="#"><Twitter size={20} /></Link>
                            <Link to="#"><Instagram size={20} /></Link>
                            <Link to="#"><Linkedin size={20} /></Link>
                        </div>
                    </div>
                </div>


                <div className="mt-10 text-center text-[#535b68] text-sm">
                    &copy; {new Date().getFullYear()} PreciousBank. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
export default LandingPage;
