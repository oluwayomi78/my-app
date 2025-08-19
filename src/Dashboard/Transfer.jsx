import React, { useState } from 'react';
import axios from 'axios';
import { User, Banknote, Loader2, CheckCircle2, AlertCircle, Landmark } from 'lucide-react';

const Transfer = () => {
    const [form, setForm] = useState({
        accountNumber: '',
        bankName: '',
        recipient: '',
        amount: '',
        note: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [fetchingName, setFetchingName] = useState(false);
    const [showPinModal, setShowPinModal] = useState(false);
    const [pin, setPin] = useState('');
    const [pinError, setPinError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Fetch account name when both fields are filled and account number or bank name loses focus
    const handleAccountBlur = async () => {
        if (form.accountNumber && form.bankName) {
            setFetchingName(true);
            setError('');
            try {
                const res = await axios.post('https://server-mi7c.onrender.com/fetchUserAccountName', {
                    accountNumber: form.accountNumber,
                    bankName: form.bankName,
                });
                // console.log(res.data.accountName)
                if (res.data && res.data.accountName) {
                    setForm(f => ({ ...f, recipient: res.data.accountName }));
                } else {
                    setForm(f => ({ ...f, recipient: '' }));
                    setError(res.data?.message || 'Account name not found.');
                }
            } catch (err) {
                setForm(f => ({ ...f, recipient: '' }));
                setError(err.response?.data?.message || 'Error fetching account name.');
            } finally {
                setFetchingName(false);
            }
        }
    };

    // Show PIN modal before submitting transfer
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        // Validate fields before showing PIN modal
        if (!form.accountNumber.trim() || !form.bankName.trim() || !form.amount || Number(form.amount) <= 0) {
            setError('Please fill all required fields and enter a valid amount.');
            return;
        }
        if (!form.recipient) {
            setError('Please fetch a valid recipient name.');
            return;
        }
        setPin('');
        setPinError('');
        setShowPinModal(true);
    };

    // Actual transfer logic, called after PIN is entered
    const handlePinConfirm = async () => {
        if (!pin || pin.length !== 4 || /\D/.test(pin)) {
            setPinError('PIN must be exactly 4 digits.');
            return;
        }
        setLoading(true);
        setError('');
        setSuccess(false);
        setPinError('');
        try {
            const token = localStorage.getItem('token');
            // Get userId from localStorage (assumes you store it after login)
            const userId = localStorage.getItem('userId');
            if (!userId) {
                setPinError('User not found. Please log in again.');
                setLoading(false);
                return;
            }
            // 1. Verify PIN
            const verifyRes = await axios.post('https://server-mi7c.onrender.com/verifyPin', {
                userId,
                pin
            }, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : ''
                }
            });
            if (!verifyRes.data || !verifyRes.data.success) {
                setPinError(verifyRes.data?.message || 'PIN verification failed.');
                setLoading(false);
                return;
            }
            // 2. Proceed with transfer
            const res = await axios.post('https://server-mi7c.onrender.com/transferFunds', {
                accountNumber: form.accountNumber,
                bankName: form.bankName,
                amount: Number(form.amount),
                note: form.note,
                pin: pin
            }, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : ''
                }
            });
            if (res.data && res.data.success) {
                setSuccess(true);
                setForm({ accountNumber: '', bankName: '', recipient: '', amount: '', note: '' });
                setTimeout(() => setSuccess(false), 2000);
                setShowPinModal(false);
            } else {
                setPinError(res.data?.message || 'Transfer failed.');
            }
        } catch (err) {
            // Prefer pin error if verifyPin fails
            if (err.response?.config?.url?.includes('verifyPin')) {
                setPinError(err.response?.data?.message || 'PIN verification failed.');
            } else {
                setPinError(err.response?.data?.message || 'Transfer failed.');
            }
        } finally {
            setLoading(false);
            setPin('');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500 py-10 px-4">
            <div className="w-full max-w-md bg-white/90 dark:bg-black/90 rounded-3xl shadow-2xl border border-white/50 dark:border-gray-800 p-8 backdrop-blur-xl relative overflow-hidden">
                {/* Animated background accent */}
                <div className="absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-2xl z-0" />
                <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-2xl z-0" />
                <div className="relative z-10">
                    <div className="flex items-center justify-center mb-6">
                        <Banknote className="w-10 h-10 text-blue-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">Transfer Funds</h2>
                    <p className="text-center text-gray-500 dark:text-gray-400 mb-6">Send money securely and instantly</p>
                    <form className="space-y-5" onSubmit={handleSubmit} autoComplete="off">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Recipient Account Number</label>
                            <div className="relative">
                                <Landmark className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    name="accountNumber"
                                    value={form.accountNumber}
                                    onChange={handleChange}
                                    onBlur={handleAccountBlur}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                                    placeholder="Enter account number"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Bank Name</label>
                            <div className="relative">
                                <Banknote className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    name="bankName"
                                    value={form.bankName}
                                    onChange={handleChange}
                                    onBlur={handleAccountBlur}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                                    placeholder="Enter bank name"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Recipient Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    name="recipient"
                                    value={form.recipient}
                                    readOnly
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                                    placeholder={fetchingName ? 'Fetching name...' : 'Recipient name'}
                                />
                                {fetchingName && <Loader2 className="absolute right-4 top-1/2 transform -translate-y-1/2 animate-spin text-blue-400 w-5 h-5" />}
                                {!fetchingName && form.recipient && <CheckCircle2 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />}
                                {!fetchingName && error && !form.recipient && <AlertCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Amount</label>
                            <div className="relative">
                                <Banknote className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="number"
                                    name="amount"
                                    value={form.amount}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                                    placeholder="Enter amount"
                                    min="1"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Note (optional)</label>
                            <input
                                type="text"
                                name="note"
                                value={form.note}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                                placeholder="Add a note"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading || !form.accountNumber.trim() || !form.bankName.trim() || !form.amount || Number(form.amount) <= 0 || !form.recipient}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2"
                        >
                            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                            {loading ? 'Transferring...' : 'Send Money'}
                        </button>
                        {success && (
                            <div className="flex items-center justify-center text-green-600 font-semibold mt-2 gap-2 animate-fadeIn">
                                <CheckCircle2 className="w-5 h-5" /> Transfer Successful!
                            </div>
                        )}
                        {error && (
                            <div className="flex items-center justify-center text-red-600 font-semibold mt-2 gap-2 animate-fadeIn">
                                <AlertCircle className="w-5 h-5" /> {error}
                            </div>
                        )}
                    </form>
                    {/* PIN Modal */}
                    {showPinModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50" onClick={e => { e.stopPropagation(); }}>
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 w-full max-w-xs relative" onClick={e => e.stopPropagation()}>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center">Enter PIN to Confirm</h3>
                                <input
                                    type="password"
                                    value={pin}
                                    onChange={e => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-center text-xl tracking-widest focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 mb-2"
                                    placeholder="••••"
                                    maxLength={4}
                                    inputMode="numeric"
                                    autoFocus
                                />
                                {pinError && <div className="text-red-500 text-sm mb-2 text-center">{pinError}</div>}
                                <div className="flex gap-2 mt-4">
                                    <button
                                        className="flex-1 py-2 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all"
                                        onClick={handlePinConfirm}
                                        disabled={loading}
                                    >
                                        {loading ? <Loader2 className="w-4 h-4 animate-spin inline-block mr-1" /> : null}
                                        Confirm
                                    </button>
                                    <button
                                        className="flex-1 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                                        onClick={e => { e.preventDefault(); setShowPinModal(false); setPin(''); setPinError(''); }}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Transfer;
