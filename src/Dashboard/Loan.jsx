import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Loan = () => {
    const [amount, setAmount] = useState('');
    const [duration, setDuration] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [loans, setLoans] = useState([]);
    const [loansLoading, setLoansLoading] = useState(false);
    const [loansError, setLoansError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:2580/loan', {
                amount: Number(amount),
                duration: Number(duration),
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });
            setSuccess(res.data.message || 'Loan request successful!');
            setAmount('');
            setDuration('');
            fetchLoans();
        } catch (err) {
            setError(err.response?.data?.message || 'Loan request failed');
        } finally {
            setLoading(false);
        }
    };

    const fetchLoans = async () => {
        setLoansLoading(true);
        setLoansError(null);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('https://server-mi7c.onrender.com/getLoans', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });
            setLoans(res.data.transactions || []);
        } catch (err) {
            setLoansError('Could not fetch loan history');
        } finally {
            setLoansLoading(false);
        }
    };

    useEffect(() => {
        fetchLoans();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md mt-50">
            <h2 className="text-2xl font-bold mb-6 text-indigo-700">Request a Loan</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Amount (₦)</label>
                    <input
                        type="number"
                        min="1000"
                        step="100"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    {[
                        { val: 1000, months: 1 },
                        { val: 2000, months: 2 },
                        { val: 3000, months: 3 },
                        { val: 5000, months: 4 },
                        { val: 10000, months: 8 }
                    ].map(opt => (
                        <button
                            key={opt.val}
                            type="button"
                            style={{ marginRight: '8px', width: '70px', backgroundColor: 'lightgray', height: '40px' }}
                            onClick={() => { setAmount(opt.val); setDuration(opt.months); }}
                        >
                            {opt.val}
                        </button>
                    ))}
                </div>
                <div>
                    <label className="block text-gray-700">Duration (months)</label>
                    <input
                        type="number"
                        min="1"
                        max="36"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={duration}
                        onChange={e => setDuration(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
                    disabled={loading}
                >
                    {loading ? 'Requesting...' : 'Request Loan'}
                </button>
                {error && <div className="text-red-600 mt-2">{error}</div>}
                {success && <div className="text-green-600 mt-2">{success}</div>}
            </form>

            <div className="mt-10">
                <h3 className="text-xl font-semibold mb-4 text-indigo-700">Loan History</h3>
                {loansLoading ? (
                    <div>Loading loan history...</div>
                ) : loansError ? (
                    <div className="text-red-600">{loansError}</div>
                ) : loans.length === 0 ? (
                    <div>No loan history found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left border">
                            <thead>
                                <tr className="bg-indigo-100">
                                    <th className="py-2 px-3">Amount (₦)</th>
                                    <th className="py-2 px-3">Duration (months)</th>
                                    <th className="py-2 px-3">Status</th>
                                    <th className="py-2 px-3">Due Date</th>
                                    <th className="py-2 px-3">Loan Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loans.map(loan => (
                                    <tr key={loan._id} className="border-b">
                                        <td className="py-2 px-3">{loan.amount}</td>
                                        <td className="py-2 px-3">{loan.note?.match(/(\d+) months?/)?.[1] || '-'}</td>
                                        <td className="py-2 px-3">{loan.status}</td>
                                        <td className="py-2 px-3">{loan.dueDate ? new Date(loan.dueDate).toLocaleDateString() : '-'}</td>
                                        <td className="py-2 px-3">{loan.loanStatus || '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Loan;
