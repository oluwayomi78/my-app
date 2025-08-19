import { useState, useEffect } from 'react';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Accounts = ({ accounts: propAccounts, showBalance, setShowBalance }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [accounts, setAccounts] = useState(Array.isArray(propAccounts) ? propAccounts : []);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.warn('No token found. Please log in.', { autoClose: 3000 });
                setLoading(false);
                return;
            }
            try {
                const res = await axios.get('https://server-mi7c.onrender.com/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(res.data);
                console.log('User data fetched:', res.data);
                localStorage.setItem('user', JSON.stringify(res.data));
                // If no accounts prop, use user data for accounts
                if (!propAccounts) {
                    setAccounts([
                        {
                            id: res.data._id || res.data.id || 'main',
                            bank: res.data.bankDetails?.bankName || 'Precious Bank',
                            type: res.data.accountType || 'Main',
                            accountNumber: res.data.accountNumber,
                            balance: res.data.balance || 0,
                        },
                    ]);
                }
            } catch (error) {
                toast.error('Error fetching user data. Please log in again.', { autoClose: 3000 });
            }
            setLoading(false);
        };
        fetchUser();
    }, [propAccounts]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        // Only show toast if not already shown
        if (!document.getElementById('user-toast')) {
            toast.error('User data not found. Please log in again.', { autoClose: 3000, toastId: 'user-toast' });
        }
        return <div>Error: User data not found.</div>;
    }

    // If accounts is empty but user is loaded, show user's main account
    // const displayAccounts = accounts.length > 0 ? accounts : [{
    //     id: user._id || user.id || 'main',
    //     bank: user.bankDetails?.bankName || 'Precious Bank',
    //     type: user.accountType || 'Main',
    //     accountNumber: user.accountNumber,
    //     balance: user.balance || 0,
    // }];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Accounts</h2>
                <button onClick={() => setShowBalance(!showBalance)} className="text-gray-500 hover:text-gray-700">
                    {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <p className="text-sm text-gray-500">{user.bankDetails.bankName}</p>
                    <p className="text-lg font-medium text-gray-900 mt-1">{user.accountType}</p>
                    <p className="text-sm text-gray-400">•••• {String(user.accountNumber || '').slice(-4)}</p>
                    <p className="text-xl font-bold text-gray-900 mt-2">
                        {showBalance ? `#${(user.balance || 0).toLocaleString()}` : '•••••••'}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <p className="text-sm text-gray-500">Demo Bank</p>
                    <p className="text-lg font-medium text-gray-900 mt-1">Savings</p>
                    <p className="text-sm text-gray-400">•••• 1234</p>
                    <p className="text-xl font-bold text-gray-900 mt-2">
                        {showBalance ? `#${(1234567).toLocaleString()}` : '•••••••'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Accounts;
