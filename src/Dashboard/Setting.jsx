import React, { useState } from 'react';


const Setting = () => {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [biometrics, setBiometrics] = useState(false);


    if (typeof window !== 'undefined') {
        document.documentElement.classList.add('dark');
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    const handleSave = () => {
        console.log("Settings saved:", { notifications, darkMode, biometrics });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10 px-4 flex items-center justify-center">
            <div className="w-full max-w-xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Settings</h2>
                <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                        <div>
                            <div className="font-semibold text-gray-800">Notifications</div>
                            <div className="text-gray-500 text-sm">Receive important account updates</div>
                        </div>
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={notifications}
                                onChange={() => setNotifications(v => !v)}
                                className="sr-only"
                            />
                            <span className={`w-10 h-6 flex items-center bg-gray-200 rounded-full p-1 duration-300 ${notifications ? 'bg-blue-500' : ''}`}>
                                <span className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${notifications ? 'translate-x-4' : ''}`}></span>
                            </span>
                        </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                        <div>
                            <div className="font-semibold text-gray-800">Dark Mode</div>
                            <div className="text-gray-500 text-sm">Reduce eye strain with a dark theme</div>
                        </div>
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={darkMode}
                                onChange={() => setDarkMode(v => !v)}
                                className="sr-only"
                            />
                            <span className={`w-10 h-6 flex items-center bg-gray-200 rounded-full p-1 duration-300 ${darkMode ? 'bg-indigo-500' : ''}`}>
                                <span className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${darkMode ? 'translate-x-4' : ''}`}></span>
                            </span>
                        </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-green-50/50 rounded-2xl border border-green-100">
                        <div>
                            <div className="font-semibold text-gray-800">Biometric Login</div>
                            <div className="text-gray-500 text-sm">Enable fingerprint or face ID for login</div>
                        </div>
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={biometrics}
                                onChange={() => setBiometrics(v => !v)}
                                className="sr-only"
                            />
                            <span className={`w-10 h-6 flex items-center bg-gray-200 rounded-full p-1 duration-300 ${biometrics ? 'bg-green-500' : ''}`}>
                                <span className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${biometrics ? 'translate-x-4' : ''}`}></span>
                            </span>
                        </label>
                    </div>
                    <div className="flex justify-center">
                        <button
                            onClick={handleSave}
                            className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold shadow-md transform hover:scale-105 duration-300"
                        >
                            Save Settings
                        </button>
                    </div>

                </div>
                <div className="mt-10 text-center text-gray-400 text-xs">Precious Bank &copy; 2025</div>
            </div>
        </div>
    );
}

export default Setting
