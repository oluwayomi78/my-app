import { useState, useEffect } from 'react';
import axios from 'axios';
import { Menu, Bell } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Header = ({ setSidebarOpen }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Format today's date
    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

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
                localStorage.setItem('user', JSON.stringify(res.data));
                // console.log(res.data);
            } catch (err) {
                const msg = err.response?.data?.message || 'Something went wrong';
                toast.error(`Could not fetch user profile: ${msg}`, { autoClose: 4000 });
            } finally {
                setTimeout(() => setLoading(false), 500);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return <div className="text-center mt-4">Loading user data...</div>;
    }

    const firstName = user?.firstName || user?.name?.split(' ')[0] || 'First';
    const lastName = user?.lastName || user?.name?.split(' ')[1] || 'Last';

    return (
        <>
            <ToastContainer position="top-right" />

            {/* Mobile Header */}
            <div className="lg:hidden bg-white border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 rounded-lg hover:bg-gray-100"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <h1 className="font-semibold text-gray-900" style={{fontSize: '1.5rem' }}>Hi, {firstName} {lastName}</h1>
                    <Link to={'/notifications'}>
                    <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Bell className="w-6 h-6" />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
                    </button>
                    </Link>
                </div>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:flex items-center justify-between px-8 pt-8 mb-8">
                <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 ">
                        Hi, {firstName} {lastName}
                    </h2>
                    <p className="text-gray-600 mt-1">Here's your financial overview for today</p>
                </div>
                <div className="flex items-center space-x-4">
                    <Link to={'/notifications'}>
                    <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Bell className="w-6 h-6" />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
                    </button>
                    </Link>
                    <div className="text-right">
                        <p className="text-sm text-gray-500">Today</p>
                        <p className="font-medium text-gray-900">{today}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
