import { MoveDiagonal, Eye, EyeOff, TrendingUp, TrendingDown ,Contact ,House, Phone, Wifi, Volleyball,Tv, Wallet, Boxes, Megaphone, MoreHorizontal} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


const Overview = ({ accounts: propAccounts, transactions: propTransactions, showBalance, setShowBalance, totalBalance, monthlyIncome: propMonthlyIncome, monthlyExpenses: propMonthlyExpenses }) => {
    // User state
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('user'));
        } catch {
            return null;
        }
    });
    const [accounts, setAccounts] = useState(Array.isArray(propAccounts) ? propAccounts : []);
    const [transactions, setTransactions] = useState(Array.isArray(propTransactions) ? propTransactions : []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [monthlyIncome, setMonthlyIncome] = useState(typeof propMonthlyIncome === 'number' ? propMonthlyIncome : 0);
    const [monthlyExpenses, setMonthlyExpenses] = useState(typeof propMonthlyExpenses === 'number' ? propMonthlyExpenses : 0);

    // Fetch user if no accounts prop
    useEffect(() => {
        if (!propAccounts) {
            const fetchUser = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const res = await axios.get('https://server-mi7c.onrender.com/profile', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUser(res.data);
                    localStorage.setItem('user', JSON.stringify(res.data));
                    setAccounts([
                        {
                            id: res.data._id || res.data.id || 'main',
                            bank: res.data.bankDetails?.bankName || 'Precious Bank',
                            type: res.data.accountType || 'Main',
                            accountNumber: res.data.accountNumber,
                            balance: res.data.balance || 0,
                        },
                    ]);
                } catch (err) {
                    setError('Error fetching user profile');
                }
            };
            fetchUser();
        } else {
            setAccounts(propAccounts);
        }
    }, [propAccounts]);

    // Fetch transactions if not provided
    useEffect(() => {
        if (!propTransactions) {
            setLoading(true);
            const token = localStorage.getItem('token');
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
                    // Calculate monthly income and expenses
                    const now = new Date();
                    const thisMonth = now.getMonth();
                    const thisYear = now.getFullYear();
                    const monthlyTx = data.filter(t => {
                        const d = new Date(t.date);
                        return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
                    });
                    setMonthlyIncome(monthlyTx.filter(t => t.type === 'credit').reduce((sum, t) => sum + (t.amount || 0), 0));
                    setMonthlyExpenses(Math.abs(monthlyTx.filter(t => t.type === 'debit').reduce((sum, t) => sum + (t.amount || 0), 0)));
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.response?.data?.message || err.message || 'Failed to fetch transactions');
                    setTransactions([]);
                    setMonthlyIncome(0);
                    setMonthlyExpenses(0);
                    setLoading(false);
                });
        } else {
            setTransactions(propTransactions);
        }
    }, [propTransactions]);

    const accountBalance = (user[0]?.balance) || user?.balance || 0;
    const accountType = accounts[0]?.type || user?.accountType || 'Savings';

    const safeTransactions = Array.isArray(transactions) ? transactions : [];
    const recentTransactions = safeTransactions.slice(0, 4);
    const safeMonthlyIncome = typeof monthlyIncome === 'number' ? monthlyIncome : 0;
    const safeMonthlyExpenses = typeof monthlyExpenses === 'number' ? monthlyExpenses : 0;

    const quick = [
        { label: 'To Precious', icon: Contact, to: '/transfer' },
        { label: 'To Bank', icon: House, to: '/transfer' },
        { label: 'withdraw', icon: MoveDiagonal, to: '/transfer' },
    ]
    const actions = [
        { label: 'Airtime', icon: Phone, to: '/airtime' },
        { label: 'Data', icon: Wifi, to: '/data' },
        { label: 'Betting', icon: Volleyball, to: '/betting' },
        { label: 'TV', icon: Tv, to: '/tv' },
        { label: 'Safebox', icon: Wallet, to: '/safe/box' },
        { label: 'Loan', icon: Boxes, to: '/loan' },
        { label: 'Invitation', icon: Megaphone, to: '/invitation' },
        { label: 'More', icon: MoreHorizontal },
    ];

    if (loading) return <div>Loading overview...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <>
            <div className="space-y-8">
                <div className="bg-[#2c6dee] p-6 rounded-2xl shadow-md">
                    <div className="flex items-center justify gap-4 mb-4">
                        <h2 className="text-xl font-semibold text-gray-900 ">Total Balance</h2>
                        <button onClick={() => setShowBalance(!showBalance)} className="text-gray-500 hover:text-gray-700">
                            {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">
                        {showBalance ? `#${accountBalance.toLocaleString()}` : '•••••••'}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                        {accountType}
                    </div>

                    
                </div>

                <div
                className="card p-6 rounded-2xl shadow-md h-auto mt-4"
                // style={{background:'linear-gradient(90deg, rgba(255,25,255,1) 0%, rgba(243,243,243,1) 100%)',
                // }}
            >
                    <div className="flex items-center justify-around mb-4">
                        {quick.map(({ label, icon: Icon, to }, index) => (
                            <Link key={index} to={to} className="flex flex-col items-center">
                                <Icon className="mb-2 bg-blue-500 text-white p-2 rounded-full w-10 h-10 cursor-pointer shadow-md hover:scale-110 transition-transform" />
                                <span className="text-sm font-medium text-gray-800">{label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            <div
                className="card p-6 rounded-2xl shadow-md h-auto"
                // style={{
                //     background:
                //         'linear-gradient(90deg, rgba(255,25,255,1) 0%, rgba(243,243,243,1) 100%)',
                // }}
            >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4 justify-items-center">
                    {actions.map(({ label, icon: Icon, to }, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <Link to={to} className="flex flex-col items-center">
                                <Icon className="mb-2 bg-blue-500 text-white p-2 rounded-full w-10 h-10 cursor-pointer shadow-md hover:scale-110 transition-transform" />
                                <span className="text-sm font-medium text-gray-800">{label}</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Income</h2>
                        <div className="flex items-center text-green-600">
                            <TrendingUp className="w-6 h-6 mr-2" />
                            <span className="text-2xl font-bold">#{safeMonthlyIncome.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Expenses</h2>
                        <div className="flex items-center text-red-600">
                            <TrendingDown className="w-6 h-6 mr-2" />
                            <span className="text-2xl font-bold">#{safeMonthlyExpenses.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h2>
                    <ul className="divide-y divide-gray-200">
                        {recentTransactions.map((t) => (
                            <li key={t.id} className="py-3 flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">{t.description}</p>
                                    <p className="text-sm text-gray-500">{t.date}</p>
                                </div>
                                <div
                                    className={`font-semibold text-right ${t.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}
                                >
                                    {t.type === 'credit' ? '+' : '-'}#{Math.abs(t.amount).toLocaleString()}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Overview;
