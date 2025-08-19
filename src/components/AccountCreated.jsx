import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, AlertTriangle} from 'lucide-react';

const AccountCreated = () => {
    const location = useLocation();
    const user = location.state?.user || JSON.parse(localStorage.getItem('user'));

    if (!user.accountNumber) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
                <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
                    <AlertTriangle className="w-10 h-10 text-yellow-500 mb-2" />
                    <h2 className="text-xl font-bold text-gray-800 mb-2">No Account Info Found</h2>
                    <p className="text-gray-600 mb-4">Please complete the signup process first.</p>
                    <Link to="/open" className="inline-block px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition font-semibold">
                        Go to Signup
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center max-w-md w-full">
                <CheckCircle2 className="w-14 h-14 text-green-500 mb-4 animate-bounce" />
                <h2 className="text-2xl font-bold text-green-600 mb-2 text-center">Account Created Successfully!</h2>
                <p className="mt-2 text-lg text-gray-700 text-center">Your account number is:</p>
                <h3 className="text-2xl font-bold text-indigo-600 mt-2 tracking-widest bg-indigo-50 px-4 py-2 rounded-lg select-all">
                    {user.accountNumber}
                </h3>
                <Link to="/login" className="inline-block mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition shadow-lg">
                    Login Now
                </Link>
            </div>
        </div>
    );
};

export default AccountCreated;
