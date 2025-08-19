import React, { useState } from "react";
import axios from "axios";

const NotificationForm = () => {
    const [form, setForm] = useState({
        title: "",
        message: "",
        type: "info",
    });
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const token = localStorage.getItem("token"); // make sure user is logged in

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponse(null);

        try {
            const res = await axios.post(
                "https://server-mi7c.onrender.com/notification",
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setResponse({ type: "success", message: res.data.message });
            setForm({ title: "", message: "", type: "info" }); 
        } catch (err) {
            setResponse({
                type: "error",
                message: err.response?.data?.message || "Failed to send notification",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-6 p-4 bg-white shadow-lg rounded-2xl">
            <h2 className="text-xl font-semibold mb-4">Send Notification</h2>

            {response && (
                <div
                    className={`p-2 mb-3 rounded ${response.type === "success"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                >
                    {response.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Notification Title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                <textarea
                    name="message"
                    placeholder="Notification Message"
                    value={form.message}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                ></textarea>

                <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                >
                    <option value="info">Info</option>
                    <option value="success">Success</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                </select>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {loading ? "Sending..." : "Send Notification"}
                </button>
            </form>
        </div>
    );
};

export default NotificationForm;
