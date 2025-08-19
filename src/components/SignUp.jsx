import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Phone, Lock, Calendar, Users, Shield, ArrowRight, CheckCircle2 } from 'lucide-react';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        gender: '',
        dateOfBirth: '',
        accountType: '',
        agreeTerms: false,
    });
    const [errors, setErrors] = useState({});
    const [showPinModal, setShowPinModal] = useState(false);
    const [pin, setPin] = useState('');
    const [pinError, setPinError] = useState('');
    const [pinLoading, setPinLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
            if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
            if (!formData.email.trim()) newErrors.email = 'Email is required';
            if (!formData.accountType) newErrors.accountType = 'Account type is required';
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
        } else if (step === 2) {
            if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
            if (!formData.gender) newErrors.gender = 'Gender is required';
            if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        } else if (step === 3) {
            if (!formData.password) newErrors.password = 'Password is required';
            else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
            if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, 3));
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateStep(3)) {
            try {
                setLoading(true);
                const res = await axios.post(
                    'https://server-mi7c.onrender.com/signup',
                    formData
                );
                toast.success('Account created successfully!', { position: 'top-center' });
                // Store signup token for PIN creation only
                if (res.data && res.data.token) {
                    localStorage.setItem('signup_token', res.data.token);
                }
                // Show PIN modal and store userId for PIN creation
                setShowPinModal(true);
                setPin('');
                setPinError('');
                // Store userId for PIN creation (always use res.data.id)
                window._signupUserId = res.data && res.data.id;
            } catch (error) {
                console.error('Error submitting form:', error);
                const errorMessage = error.response?.data?.message || 'Error submitting form';
                toast.error(errorMessage, { position: 'top-center' });
            } finally {
                setLoading(false);
            }
        }
    };

    const handlePinSubmit = async (e) => {
        e.preventDefault();
        setPinError('');
        if (!pin || pin.length !== 4) {
            setPinError('PIN must be 4 digits.');
            return;
        }
        setPinLoading(true);
        try {
            const userId = window._signupUserId;
            // Use signup_token for PIN creation
            const token = localStorage.getItem('signup_token');
            const res = await axios.post('https://server-mi7c.onrender.com/setPin', { userId, pin }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.data && res.data.success) {
                toast.success('PIN set successfully!', { position: 'top-center' });
                setShowPinModal(false);
                // Remove signup_token after use
                localStorage.removeItem('signup_token');
                setTimeout(() => navigate('/login'), 1500);
            } else {
                setPinError(res.data?.message || 'Failed to set PIN.');
            }
        } catch (err) {
            setPinError(err.response?.data?.message || 'Failed to set PIN.');
        } finally {
            setPinLoading(false);
        }
    };

    const steps = [
        { number: 1, title: 'Personal Info', icon: User },
        { number: 2, title: 'Contact Details', icon: Phone },
        { number: 3, title: 'Security', icon: Shield },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
            <ToastContainer />
            {/* Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl"></div>
            </div>
            {/* PIN Modal */}
            {showPinModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xs relative">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Set Your 4-digit PIN</h3>
                        <form onSubmit={handlePinSubmit}>
                            <input
                                type="password"
                                value={pin}
                                onChange={e => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-center text-xl tracking-widest focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 mb-2"
                                placeholder="••••"
                                maxLength={4}
                                inputMode="numeric"
                                autoFocus
                            />
                            {pinError && <div className="text-red-500 text-sm mb-2 text-center">{pinError}</div>}
                            <div className="flex gap-2 mt-4">
                                <button
                                    className="flex-1 py-2 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all"
                                    type="submit"
                                    disabled={pinLoading}
                                >
                                    {pinLoading ? 'Setting...' : 'Set PIN'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="max-w-md mx-auto relative">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
                        <span className="text-white font-bold text-xl">PB</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
                    <p className="text-gray-600">Join thousands who trust Precious Bank</p>
                </div>

                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        {steps.map((step, index) => (
                            <div key={step.number} className="flex items-center">
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${currentStep >= step.number
                                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                                        : 'bg-gray-200 text-gray-400'
                                    }`}>
                                    {currentStep > step.number ? (
                                        <CheckCircle2 className="w-5 h-5" />
                                    ) : (
                                        <step.icon className="w-5 h-5" />
                                    )}
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${currentStep > step.number ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-gray-200'
                                        }`}></div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <span className="text-sm font-medium text-gray-600">
                            Step {currentStep} of 3: {steps[currentStep - 1].title}
                        </span>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8">
                    <div className="space-y-6">

                        {/* Step 1: Personal Information */}
                        {currentStep === 1 && (
                            <div className="space-y-6 animate-fadeIn">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                                            className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${errors.firstName ? 'border-red-500' : 'border-gray-200'
                                                }`}
                                            placeholder="John"
                                        />
                                    </div>
                                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            value={formData.lastName}
                                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                                            className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${errors.lastName ? 'border-red-500' : 'border-gray-200'
                                                }`}
                                            placeholder="Doe"
                                        />
                                    </div>
                                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${errors.email ? 'border-red-500' : 'border-gray-200'
                                                }`}
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Account Type</label>
                                    <div className="relative">
                                        <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <select
                                            value={formData.accountType}
                                            onChange={(e) => handleInputChange('accountType', e.target.value)}
                                            className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 appearance-none ${errors.accountType ? 'border-red-500' : 'border-gray-200'}`}
                                        >
                                            <option value="">Select Account Type</option>
                                            <option value="Savings">Savings</option>
                                            <option value="Current">Current</option>
                                            <option value="Business">Business</option>
                                        </select>
                                    </div>
                                    {errors.accountType && <p className="text-red-500 text-sm mt-1">{errors.accountType}</p>}
                                </div>
                            </div>
                        )}

                        {/* Step 2: Contact Details */}
                        {currentStep === 2 && (
                            <div className="space-y-6 animate-fadeIn">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="tel"
                                            value={formData.phoneNumber}
                                            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                                            className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${errors.phoneNumber ? 'border-red-500' : 'border-gray-200'
                                                }`}
                                            placeholder="08012345678"
                                        />
                                    </div>
                                    {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                                    <div className="relative">
                                        <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <select
                                            value={formData.gender}
                                            onChange={(e) => handleInputChange('gender', e.target.value)}
                                            className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 appearance-none ${errors.gender ? 'border-red-500' : 'border-gray-200'
                                                }`}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="date"
                                            value={formData.dateOfBirth}
                                            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                            max={new Date().toISOString().split('T')[0]}
                                            className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-200'
                                                }`}
                                        />
                                    </div>
                                    {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Security */}
                        {currentStep === 3 && (
                            <div className="space-y-6 animate-fadeIn">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={formData.password}
                                            onChange={(e) => handleInputChange('password', e.target.value)}
                                            className={`w-full pl-12 pr-12 py-4 bg-gray-50 border-2 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${errors.password ? 'border-red-500' : 'border-gray-200'
                                                }`}
                                            placeholder="Create a strong password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

                                    <div className="mt-3">
                                        <div className="text-sm text-gray-600">Password must contain:</div>
                                        <ul className="text-sm text-gray-500 mt-1 space-y-1">
                                            <li className={`flex items-center ${formData.password.length >= 6 ? 'text-green-600' : ''}`}>
                                                <div className={`w-1.5 h-1.5 rounded-full mr-2 ${formData.password.length >= 6 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                                At least 6 characters
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-200/50">
                                    <div className="flex items-start space-x-3">
                                        <input
                                            type="checkbox"
                                            id="agreeTerms"
                                            checked={formData.agreeTerms}
                                            onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                                            className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <label htmlFor="agreeTerms" className="text-sm text-gray-700 leading-relaxed">
                                            I agree to the{' '}
                                            <a href="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
                                                Terms of Service
                                            </a>{' '}
                                            and{' '}
                                            <a href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
                                                Privacy Policy
                                            </a>
                                            .
                                        </label>
                                    </div>
                                    {errors.agreeTerms && <p className="text-red-500 text-sm mt-2">{errors.agreeTerms}</p>}
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex space-x-4 pt-6">
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="flex-1 py-4 px-6 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-all duration-200"
                                >
                                    Back
                                </button>
                            )}

                            {currentStep < 3 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="flex-1 py-4 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                                >
                                    <span>Continue</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="flex-1 py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                                >
                                    Create Account
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Login Link */}
                    <div className="text-center mt-8 pt-6 border-t border-gray-200">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Security Badge */}
                <div className="text-center mt-8">
                    <div className="inline-flex items-center space-x-2 text-gray-500 text-sm">
                        <Shield className="w-4 h-4" />
                        <span>Your information is protected with bank-grade security</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;