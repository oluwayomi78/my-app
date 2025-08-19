import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Transaction = ({ transactions: propTransactions }) => {
    const [transactions, setTransactions] = useState(Array.isArray(propTransactions) ? propTransactions : []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!Array.isArray(propTransactions) || propTransactions.length === 0) {
            setLoading(true);

            const token = localStorage.getItem('token'); // get JWT from local storage

            axios.get('https://server-mi7c.onrender.com/transactions', {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    let data = Array.isArray(res.data) ? res.data : [];
                    
                    setTransactions(data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.response?.data?.message || err.message || 'Failed to fetch transactions');
                    setTransactions([]);
                    setLoading(false);
                });
        }
    }, [propTransactions]);

    if (loading) return <div>Loading transactions...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Transactions</h2>
            <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Type
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {transactions.map((t) => (
                            <tr key={t.id || t._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.date ? new Date(t.date).toLocaleString() : ''}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{t.type}</td>
                                <td
                                    className={`px-6 py-4 whitespace-nowrap text-sm font-semibold text-right ${
                                        t.type === 'credit' ? 'text-green-600' : 'text-red-600'
                                    }`}
                                >
                                    {t.type === 'credit' ? '+' : '-'}#{Math.abs(t.amount).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Transaction;
