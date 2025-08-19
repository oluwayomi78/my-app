import React from 'react';
import {
    Home,
    Wallet,
    FileText,
    BarChart3,
    User,
    Settings,
    LogOut,
    X,
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
    const sidebarItems = [
        { id: 'overview', icon: Home, label: 'Overview' },
        { id: 'accounts', icon: Wallet, label: 'Accounts' },
        { id: 'transactions', icon: FileText, label: 'Transactions' },
        { id: 'analytics', icon: BarChart3, label: 'Analytics' },
        { id: 'Profile', icon: User, label: 'Profile' },
        { id: 'settings', icon: Settings, label: 'Settings' },
        { id: 'logout', icon: LogOut, label: 'Logout' },
    ];
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div
            className={`fixed lg:static inset-y-0 left-0 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0 transition-transform duration-200 z-50`}
        >
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-[#2c6dee]">Precious Bank</h1>
                        <p className="text-sm text-gray-500 mt-1">Digital Banking</p>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <nav className="mt-6">
                {sidebarItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            setActiveTab(item.id);
                            setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center px-6 py-3 text-left hover:bg-blue-50 transition-colors ${activeTab === item.id
                                ? 'bg-blue-50 border-r-2 border-blue-500 text-blue-700'
                                : 'text-gray-600'
                            }`}
                    >
                        <item.icon className="w-5 h-5 mr-3" />
                        {item.label}
                    </button>
                ))}
            </nav>

            <div className="absolute bottom-0 w-64 p-6 border-t border-gray-200">
                <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center overflow-hidden">
                        {user && user.profilePhoto ? (
                            <img
                                src={user.profilePhoto}
                                alt="Profile"
                                className="w-10 h-10 object-cover rounded-full"
                            />
                        ) : (
                            <User className="w-6 h-6 text-white" />
                        )}
                    </div>
                    <div className="ml-3">
                        <p className="font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                        <p className="text-sm text-gray-500">Premium Member</p>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100">
                        <Settings className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100">
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
