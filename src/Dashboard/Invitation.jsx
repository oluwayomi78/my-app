
import React, { useState } from 'react';
import axios from 'axios';

const Invitation = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        setError(null);
        try {
            // Call backend API to send invitation
            const res = await axios.post('https://server-mi7c.onrender.com/invitation', {
                email,
                message
            });
            setSuccess(res.data.message || 'Invitation sent successfully!');
            setEmail('');
            setMessage('');
        } catch (err) {
            setError(
                err.response?.data?.message || 'Failed to send invitation.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md   h-[100vh]">
            <h2 className="text-2xl font-bold mb-6 text-indigo-700">Send Invitation</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Recipient Email</label>
                    <input
                        type="email"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Message (optional)</label>
                    <textarea
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        rows={3}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Send Invitation'}
                </button>
                {error && <div className="text-red-600 mt-2">{error}</div>}
                {success && <div className="text-green-600 mt-2">{success}</div>}
            </form>
        </div>
    );
};

export default Invitation;
