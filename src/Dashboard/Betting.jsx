import React, { useState } from 'react';
import axios from 'axios';
import { Volleyball } from 'lucide-react';

const Data = () => {
    const [form, setForm] = useState({
        network: '',
        phone: '',
        amount: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [showPinModal, setShowPinModal] = useState(false);
    const [pin, setPin] = useState('');
    const [pinError, setPinError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setPin('');
        setPinError('');
        setShowPinModal(true);
    };

    const handlePinConfirm = async () => {
        if (!pin || pin.length !== 4 || /\D/.test(pin)) {
            setPinError('PIN must be exactly 4 digits.');
            return;
        }
        setLoading(true);
        setPinError('');
        setError('');
        try {
            const token = localStorage.getItem('token');
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
            // 2. Proceed with data purchase
            const res = await axios.post('https://server-mi7c.onrender.com/betting', {
                ...form,
                amount: Number(form.amount)
            }, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : ''
                }
            });
            setLoading(false);
            if (res.data && res.data.success) {
                setSuccess(true);
                setForm({ network: '', phone: '', amount: '' });
                setShowPinModal(false);
            } else {
                setError(res.data?.message || 'Airtime purchase failed.');
            }
        } catch (err) {
            if (err.response?.config?.url?.includes('verifyPin')) {
                setPinError(err.response?.data?.message || 'PIN verification failed.');
            } else {
                setError(err.response?.data?.message || 'Airtime purchase failed.');
            }
            setLoading(false);
        } finally {
            setPin('');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 py-10 px-4">
            <div className="w-full max-w-md bg-white/90 rounded-3xl shadow-2xl border border-white/50 p-8 backdrop-blur-xl relative overflow-hidden">
                <div className="flex items-center justify-center mb-6">
                    <span className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                        <span className="text-white font-bold text-2xl">{<Volleyball />}</span>
                    </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Betting</h2>
                <p className="text-center text-gray-500 mb-6">Betting on your favorite sports</p>
                <form className="space-y-5" onSubmit={handleSubmit} autoComplete="off">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Betting platform</label>
                        <select
                            name="betting"
                            value={form.betting}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                            required
                        >
                            <option value="">Select Betting Platform</option>
                            <option value="SportyBet">SportyBet</option>
                            <option value="iLOTBet">iLOTBet</option>
                            <option value="1xBet">1xBet</option>
                            <option value="Bet9ja">Bet9ja</option>
                            <option value="BetKing">BetKing</option>
                            <option value="Betway">Betway</option>
                            <option value="NairaBet">NairaBet</option>
                            <option value="Bangbet">Bangbet</option>
                            <option value="BetBonanza">BetBonanza</option>
                            <option value="Africa365">Africa365</option>
                            <option value="EasyWin">EasyWin</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">User ID</label>
                        <input
                            type="tel"
                            name="userId"
                            value={form.userId}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                            placeholder="User ID"
                            maxLength={10}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Amount (₦)</label>
                        <input
                            type="number"
                            name="amount"
                            value={form.amount}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                            placeholder="amount"
                            min="50"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block mr-2"></span>
                        ) : null}
                        {loading ? 'Processing...' : 'Pay'}
                    </button>
                    {success && (
                        <div className="flex items-center justify-center text-green-600 font-semibold mt-2 gap-2 animate-fadeIn">
                            <span className="w-5 h-5 inline-block">✔️</span> Betting successful!
                        </div>
                    )}
                    {error && (
                        <div className="flex items-center justify-center text-red-600 font-semibold mt-2 gap-2 animate-fadeIn">
                            <span className="w-5 h-5 inline-block">❌</span> {error}
                        </div>
                    )}
                </form>
                {/* PIN Modal */}
                {showPinModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50" onClick={e => { e.stopPropagation(); }}>
                        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xs relative" onClick={e => e.stopPropagation()}>
                            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Enter PIN to Confirm</h3>
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
                                    onClick={handlePinConfirm}
                                    disabled={loading}
                                >
                                    {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block mr-1"></span> : null}
                                    Confirm
                                </button>
                                <button
                                    className="flex-1 py-2 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-all"
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
    );
};

export default Data;
