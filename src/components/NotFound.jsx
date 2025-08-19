import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
            <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full animate__animated animate__fadeIn">
                <div className="flex items-center justify-center mb-4">
                    <AlertTriangle size={48} className="text-red-500" />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
                <p className="text-lg text-gray-600 mb-4">Oops! Page not found.</p>
                <p className="text-sm text-gray-500 mb-6">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition duration-300"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
