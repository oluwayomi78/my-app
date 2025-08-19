import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Overview from './Overview';
import Accounts from './Accounts';
import Transaction from './Transaction';
import Analytics from './Analytics';
import Profile from './Profile';
import Setting from './Setting';
import Logout from './Logout';

const Dashboard = () => {
    const [showBalance, setShowBalance] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');

    // const accounts = [ /* ... same data as before ... */];
    const accounts = [
        { id: 1, name: 'Main Account', balance: 12500 },
        { id: 2, name: 'Savings Account', balance: 7500 },
    ];


    // Remove hardcoded transactions; Transaction component will fetch its own data

    // Optionally, you can keep totalBalance logic if needed for Overview
    const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

    // Remove monthlyIncome and monthlyExpenses if not needed elsewhere

    const renderContent = () => {
        switch (activeTab.toLowerCase()) {
            case 'accounts':
                return <Accounts accounts={accounts} showBalance={showBalance} setShowBalance={setShowBalance} />;
            case 'transactions':
                return (
                    <Transaction
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        filterType={filterType}
                        setFilterType={setFilterType}
                    />
                );
            case 'analytics':
                return <Analytics />;
            case 'profile':
                return <Profile />;
            case 'settings':
                return <Setting />;
            case 'logout':
                return <Logout />;
            default:
                return (
                    <Overview
                        accounts={accounts}
                        showBalance={showBalance}
                        setShowBalance={setShowBalance}
                        totalBalance={totalBalance}
                    />
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className="flex-1 flex flex-col min-w-0">
                <Header setSidebarOpen={setSidebarOpen} />
                <div className="flex-1 p-4 lg:p-8 overflow-auto">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

