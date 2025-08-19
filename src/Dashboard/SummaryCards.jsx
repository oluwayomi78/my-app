import React from 'react';

const SummaryCard = ({ monthlyIncome, monthlyExpenses, totalBalance }) => {
    const summary = [
        {
            label: 'Balance',
            value: totalBalance,
            color: 'text-blue-600',
        },
        {
            label: 'Income',
            value: monthlyIncome,
            color: 'text-green-600',
        },
        {
            label: 'Expenses',
            value: monthlyExpenses,
            color: 'text-red-600',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {summary.map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-md">
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className={`mt-1 text-2xl font-bold ${item.color}`}>${item.value.toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
};

export default SummaryCard;
