import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Shield, ArrowRight, CheckCircle2, AlertCircle, Fingerprint } from 'lucide-react';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const res = await axios.post('https://server-mi7c.onrender.com/login', formData);
            // console.log('Login successful:', res.data);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            // Store userId for PIN/transfer API usage
            if (res.data.user && res.data.user.id) {
                localStorage.setItem('userId', res.data.user.id);
            }
            setFormData({ email: '', password: '' });
            toast.success(`Login successful! ${res.data.user.name}`, { position: 'top-center' });
            setTimeout(() => navigate('/Dashboard'), 1500);
        } catch (error) {
            // console.error('Login error:', error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message, { position: 'top-center' });
            } else {
                toast.error('Login failed. Please try again.', { position: 'top-center' });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleBiometricLogin = () => {
        console.log('Biometric login attempted');
        
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center py-8 px-4">
            <ToastContainer />
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-teal-500/10 rounded-full blur-2xl"></div>
            </div>

            <div className="w-full max-w-md relative">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl mb-6 shadow-xl">
                        <span className="text-white font-bold text-2xl">PB</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                    <p className="text-gray-600">Secure access to your precious finances</p>
                </div>

                {/* Main Login Card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 mb-6">
                    <div className="space-y-6">
                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-blue-500" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className={`w-full pl-12 pr-4 py-4 bg-gray-50/70 border-2 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder:text-gray-400 ${errors.email ? 'border-red-500 bg-red-50/50' : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    placeholder="your.email@example.com"
                                />
                                {errors.email && (
                                    <div className="flex items-center mt-2 text-red-500 text-sm">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.email}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-blue-500" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    className={`w-full pl-12 pr-12 py-4 bg-gray-50/70 border-2 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder:text-gray-400 ${errors.password ? 'border-red-500 bg-red-50/50' : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                                {errors.password && (
                                    <div className="flex items-center mt-2 text-red-500 text-sm">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.password}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center space-x-3 cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="sr-only"
                                    />
                                    <div className={`w-5 h-5 border-2 rounded-md transition-all duration-200 ${rememberMe
                                            ? 'bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-500'
                                            : 'border-gray-300 group-hover:border-gray-400'
                                        }`}>
                                        {rememberMe && (
                                            <CheckCircle2 className="w-3 h-3 text-white absolute top-0.5 left-0.5 transform -translate-x-0.5 -translate-y-0.5" />
                                        )}
                                    </div>
                                </div>
                                <span className="text-sm font-medium text-gray-700">Remember me</span>
                            </label>

                            <Link
                                to={"/forget"}
                                className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-semibold hover:from-blue-600 hover:to-indigo-700 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group"
                        >
                            {isLoading ? (
                                <div className="flex items-center space-x-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Signing in...</span>
                                </div>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white/80 text-gray-500 font-medium">Or continue with</span>
                            </div>
                        </div>

                        <button
                            onClick={handleBiometricLogin}
                            className="w-full py-4 px-6 bg-gray-50/70 hover:bg-gray-100/70 border-2 border-gray-200 hover:border-gray-300 text-gray-700 rounded-2xl font-semibold transition-all duration-200 flex items-center justify-center space-x-3 group"
                        >
                            <Fingerprint className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
                            <span>Use Biometric Login</span>
                        </button>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/open" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                            Create Account
                        </Link>
                    </p>
                </div>

                <div className="mt-8 text-center">
                    <div className="inline-flex items-center space-x-2 text-gray-500 text-sm bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-white/40">
                        <Shield className="w-4 h-4" />
                        <span>256-bit SSL encryption • Your data is secure</span>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/40 text-center hover:bg-white/80 transition-all cursor-pointer group">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                            <span className="text-white font-bold text-sm">24/7</span>
                        </div>
                        <p className="text-xs font-medium text-gray-600">Customer Support</p>
                    </div>

                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/40 text-center hover:bg-white/80 transition-all cursor-pointer group">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-xs font-medium text-gray-600">Secure Banking</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;