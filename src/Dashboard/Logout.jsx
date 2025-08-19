import React from 'react'
import axios from 'axios';


const Logout = () => {
    const handleLogout = async () => {
        const confirmed = window.confirm("Are you sure you want to log out?");
        if (!confirmed) return;
        try {
            await axios.post("https://server-mi7c.onrender.com/logout", {}, { withCredentials: true });
        } catch (err) {
            console.log(err)
        }
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };
    return (
        <div className="flex justify-center items-center min-h-[100px]">
            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold shadow">Log Out</button>
        </div>
    );
}

export default Logout
