import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Pin = () => {
    const navigate = useNavigate();
    const [pin, setPin] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        // Only allow numbers, max 4 digits
        const val = e.target.value.replace(/\D/g, '').slice(0, 4);
        setPin(val);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        if (!pin || pin.length !== 4) {
            setError('PIN must be 4 digits.');
            return;
        }
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('https://server-mi7c.onrender.com/Pin', { pin }, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : ''
                }
            });
            if (res.data && res.data.success) {
                setSuccess(true);
                setPin('');
                navigate('/account/create')
            } else {
                setError(res.data?.message || 'Failed to set PIN.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to set PIN.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4">Set Transfer PIN</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="pin" className="block mb-1 font-medium">New PIN:</label>
                    <input
                        type="password"
                        id="pin"
                        name="pin"
                        value={pin}
                        onChange={handleChange}
                        required
                        maxLength={4}
                        inputMode="numeric"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Enter 4-digit PIN"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-60"
                >
                    {loading ? 'Setting...' : 'Set PIN'}
                </button>
                {success && <div className="text-green-600 text-center font-semibold">PIN set successfully!</div>}
                {error && <div className="text-red-600 text-center font-semibold">{error}</div>}
            </form>
        </div>
    );
}

export default Pin
