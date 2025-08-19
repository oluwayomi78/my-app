import React from 'react';
import { PlusCircle, ArrowDownCircle, ArrowUpCircle, CreditCard } from 'lucide-react';

const Quick = () => {
    const actions = [
        { icon: <ArrowUpCircle className="w-6 h-6" />, label: 'Send Money' },
        { icon: <ArrowDownCircle className="w-6 h-6" />, label: 'Request' },
        { icon: <CreditCard className="w-6 h-6" />, label: 'Pay Bills' },
        { icon: <PlusCircle className="w-6 h-6" />, label: 'Top Up' },
    ];

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {actions.map((action, index) => (
                    <button
                        key={index}
                        className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                    >
                        <div className="mb-2 text-gray-700">{action.icon}</div>
                        <span className="text-sm font-medium text-gray-700">{action.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Quick;
