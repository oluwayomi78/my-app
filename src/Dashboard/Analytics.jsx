import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Analytics = () => {
    const [analyticsData, setAnalyticsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('https://server-mi7c.onrender.com/transactions', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // Process transactions into monthly analytics
                const txs = Array.isArray(res.data) ? res.data : res.data.transactions || [];
                // Group by month and sum income/expenses
                const monthly = {};
                txs.forEach(tx => {
                    if (!tx.date) return;
                    const date = new Date(tx.date);
                    const month = date.toLocaleString('default', { month: 'short', year: '2-digit' });
                    if (!monthly[month]) monthly[month] = { month, income: 0, expenses: 0 };
                    if (tx.type === 'credit' || tx.type === 'deposit') {
                        monthly[month].income += tx.amount || 0;
                    } else if (tx.type === 'debit' || tx.type === 'withdrawal' || tx.type === 'transfer') {
                        monthly[month].expenses += tx.amount || 0;
                    }
                });
                // Sort by month (chronologically)
                const sorted = Object.values(monthly).sort((a, b) => {
                    const [ma, ya] = a.month.split(' ');
                    const [mb, yb] = b.month.split(' ');
                    const da = new Date(`20${ya}`, new Date(Date.parse(ma + ' 1, 2000')).getMonth());
                    const db = new Date(`20${yb}`, new Date(Date.parse(mb + ' 1, 2000')).getMonth());
                    return da - db;
                });
                setAnalyticsData(sorted);
            } catch (err) {
                setError('Failed to fetch analytics data.');
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const hasData = Array.isArray(analyticsData) && analyticsData.length > 0;
    return (
        <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Spending Analytics</h2>
            <div className="w-full h-64 flex items-center justify-center">
                {loading ? (
                    <span className="text-gray-400">Loading analytics...</span>
                ) : error ? (
                    <span className="text-red-400">{error}</span>
                ) : hasData ? (
                    <ResponsiveContainer>
                        <LineChart data={analyticsData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} />
                            <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <span className="text-gray-400">No analytics data available.</span>
                )}
            </div>
        </div>
    );
};

export default Analytics;
