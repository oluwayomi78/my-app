import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:2580/admin";

const AdminDashboard = () => {
    const [admins, setAdmins] = useState([]);
    const [activeAdmins, setActiveAdmins] = useState([]);
    const [roleFilter, setRoleFilter] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ name: "", role: "" });

    const fetchAdmins = async (role = "") => {
        setLoading(true);
        setError("");
        try {
            const res = await axios.get(`${API_URL}/admins${role ? `?role=${role}` : ""}`);
            setAdmins(res.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch admins");
        } finally {
            setLoading(false);
        }
    };

    const fetchActiveAdmins = async () => {
        try {
            const res = await axios.get(`${API_URL}/active-admins`);
            setActiveAdmins(res.data);
        } catch (error) {
            console.error("Error fetching active admins:", error);
        }
    };

    useEffect(() => {
        fetchAdmins();
        fetchActiveAdmins();

        const interval = setInterval(fetchActiveAdmins, 60000); 

        return () => clearInterval(interval);
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this admin?")) return;
        try {
            await axios.delete(`${API_URL}/admin/${id}`);
            fetchAdmins(roleFilter);
        } catch (err) {
            setError("Delete failed. Please try again.");
        }
    };

    const handleFilter = (e) => {
        const role = e.target.value;
        setRoleFilter(role);
        fetchAdmins(role);
    };

    const startEdit = (admin) => {
        setEditingId(admin._id);
        setEditForm({ name: admin.name, role: admin.role });
    };

    const handleEditSave = async () => {
        try {
            await axios.put(`${API_URL}/admin/${editingId}`, editForm);
            setEditingId(null);
            fetchAdmins(roleFilter);
        } catch (err) {
            setError("Update failed. Check permissions or data.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
    };

    return (
        <div className="admin-dashboard min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 p-4 md:p-8">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 max-w-6xl mx-auto p-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-indigo-700">Admin Dashboard</h1>
                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <select
                            onChange={handleFilter}
                            value={roleFilter}
                            className="border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        >
                            <option value="">All Roles</option>
                            <option value="superadmin">Super Admin</option>
                            <option value="manager">Manager</option>
                            <option value="support">Support</option>
                        </select>
                        <button
                            onClick={handleLogout}
                            className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg shadow hover:shadow-md transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                        <p className="text-gray-600">Total Admins</p>
                        <p className="text-2xl font-bold text-indigo-700">{admins.length}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                        <p className="text-gray-600">Super Admins</p>
                        <p className="text-2xl font-bold text-green-700">
                            {admins.filter(a => a.role === "superadmin").length}
                        </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <p className="text-gray-600">Active Now</p>
                        <p className="text-2xl font-bold text-blue-700">
                            {activeAdmins.length}
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                        <p>{error}</p>
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {admins.map((admin) => (
                                    <tr key={admin._id} className="hover:bg-gray-50">
                                        {editingId === admin._id ? (
                                            <>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input
                                                        name="name"
                                                        value={editForm.name}
                                                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                                        className="border rounded px-2 py-1 w-full"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{admin.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <select
                                                        name="role"
                                                        value={editForm.role}
                                                        onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                                                        className="border rounded px-2 py-1"
                                                    >
                                                        <option value="superadmin">Super Admin</option>
                                                        <option value="manager">Manager</option>
                                                        <option value="support">Support</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                                    <button
                                                        onClick={handleEditSave}
                                                        className="bg-indigo-600 text-white px-3 py-1 rounded text-sm"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingId(null)}
                                                        className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
                                                    >
                                                        Cancel
                                                    </button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{admin.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{admin.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${admin.role === "superadmin"
                                                        ? "bg-purple-100 text-purple-800"
                                                        : admin.role === "manager"
                                                            ? "bg-blue-100 text-blue-800"
                                                            : "bg-green-100 text-green-800"
                                                        }`}>
                                                        {admin.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                                    <button
                                                        onClick={() => startEdit(admin)}
                                                        className="text-indigo-600 hover:text-indigo-900 btn-edit"
                                                        style={{ marginRight: "10px" }}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(admin._id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
