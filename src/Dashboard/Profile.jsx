
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { Copy} from 'lucide-react'

const Profile = () => {
    const [user, setUser] = useState(null);
    const [showEdit, setShowEdit] = useState(false);
    const [editData, setEditData] = useState(null);
    const [editLoading, setEditLoading] = useState(false);
    const [editError, setEditError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get('https://server-mi7c.onrender.com/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(res.data);
                console.log(res.data);
                localStorage.setItem('user', JSON.stringify(res.data));
            } catch (err) {
                // handle error
            }
        };
        fetchProfile();
    }, []);

    if (!user) return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200">
            <div className="text-lg text-gray-500 font-semibold animate-pulse">Loading...</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200 flex items-center justify-center py-10 px-2 sm:px-4 relative overflow-x-hidden">
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-blue-400/30 via-indigo-400/20 to-purple-400/30 rounded-full blur-3xl z-0"></div>
            <div className="w-full max-w-lg mx-auto z-10">
                <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/60 p-4 sm:p-8 relative overflow-hidden">
                    <div className="flex flex-col items-center mt-20 mb-6 mt-3">
                        <div className="bg-gradient-to-tr from-blue-500 via-indigo-400 to-purple-400 p-1.5 rounded-full shadow-xl mt-10">
                            <img
                                src={user.profilePhoto && user.profilePhoto !== ''
                                    ? user.profilePhoto
                                    : (() => {
                                        let first = user.firstName ? user.firstName[0].toUpperCase() : '';
                                        let last = user.lastName ? user.lastName[0].toUpperCase() : '';
                                        let initials = (first + last) || 'U';
                                        return `https://ui-avatars.com/api/?name=${initials}&background=4f46e5&color=fff&size=128&rounded=true`;
                                    })()
                                }
                                alt={user.firstName + ' ' + user.lastName + ' Profile Photo'}
                                loading="lazy"
                                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg ring-4 ring-blue-200/40 hover:ring-indigo-400 transition-all duration-300 hover:scale-110 bg-gray-100"
                                onError={e => {
                                    e.target.onerror = null;
                                    let first = user.firstName ? user.firstName[0].toUpperCase() : '';
                                    let last = user.lastName ? user.lastName[0].toUpperCase() : '';
                                    let initials = (first + last) || 'U';
                                    e.target.src = `https://ui-avatars.com/api/?name=${initials}&background=4f46e5&color=fff&size=128&rounded=true`;
                                }}
                            />
                        </div>
                        <button
                            className="absolute top-6 right-6 sm:top-8 sm:right-8 bg-blue-100 hover:bg-blue-200 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onClick={() => {
                                setEditData({
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    email: user.email,
                                    phoneNumber: user.phoneNumber,
                                    dateOfBirth: user.dateOfBirth ? user.dateOfBirth.slice(0,10) : '',
                                    gender: user.gender || '',
                                    accountTier: user.accountTier || '',
                                    accountType: user.accountType || '',
                                    accountStatus: user.accountStatus || '',
                                    profilePhoto: user.profilePhoto || '',
                                    address: {
                                        street: user.address?.street || '',
                                        city: user.address?.city || '',
                                        state: user.address?.state || '',
                                        country: user.address?.country || '',
                                    },
                                });
                                setShowEdit(true);
                                setEditError("");
                            }}
                        >Edit</button>
            {/* Edit Modal */}
            {showEdit && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative animate-fadeIn">
                        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl font-bold" onClick={() => setShowEdit(false)}>&times;</button>
                        <h2 className="text-lg font-bold mb-4 text-gray-800">Edit Profile</h2>
                        {editError && <div className="text-red-500 text-sm mb-2">{editError}</div>}
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                setEditLoading(true);
                                setEditError("");
                                try {
                                    const token = localStorage.getItem('token');
                                    const res = await axios.put('https://server-mi7c.onrender.com/updateUser', editData, {
                                        headers: { Authorization: `Bearer ${token}` },
                                    });
                                    setUser(res.data.user);
                                    setShowEdit(false);
                                } catch (err) {
                                    setEditError(err.response?.data?.message || 'Update failed');
                                } finally {
                                    setEditLoading(false);
                                }
                            }}
                        >
                            <div className="grid grid-cols-1 gap-3">
                                <input className="border rounded-lg px-3 py-2" placeholder="First Name" value={editData.firstName} onChange={e => setEditData(d => ({...d, firstName: e.target.value}))} required />
                                <input className="border rounded-lg px-3 py-2" placeholder="Last Name" value={editData.lastName} onChange={e => setEditData(d => ({...d, lastName: e.target.value}))} required />
                                <input className="border rounded-lg px-3 py-2" placeholder="Email" type="email" value={editData.email} onChange={e => setEditData(d => ({...d, email: e.target.value}))} required />
                                <input className="border rounded-lg px-3 py-2" placeholder="Phone Number" value={editData.phoneNumber} onChange={e => setEditData(d => ({...d, phoneNumber: e.target.value}))} required />
                                <input className="border rounded-lg px-3 py-2" placeholder="Date of Birth" type="date" value={editData.dateOfBirth} onChange={e => setEditData(d => ({...d, dateOfBirth: e.target.value}))} />
                                <input className="border rounded-lg px-3 py-2" placeholder="Gender" value={editData.gender} onChange={e => setEditData(d => ({...d, gender: e.target.value}))} />
                                <input className="border rounded-lg px-3 py-2" placeholder="Account Tier" value={editData.accountTier} onChange={e => setEditData(d => ({...d, accountTier: e.target.value}))} />
                                <input className="border rounded-lg px-3 py-2" placeholder="Account Type" value={editData.accountType} onChange={e => setEditData(d => ({...d, accountType: e.target.value}))} />
                                <input className="border rounded-lg px-3 py-2" placeholder="Account Status" value={editData.accountStatus} onChange={e => setEditData(d => ({...d, accountStatus: e.target.value}))} />
                                <input
                                    type="file"
                                    className="border rounded-lg px-3 py-2"
                                    accept="image/*"
                                    onChange={async e => {
                                        const file = e.target.files[0];
                                        if (file) { 
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setEditData(d => ({ ...d, profilePhoto: reader.result }));
                                            };
                                            reader.readAsDataURL(file);
                                        } else {
                                            // If no file selected, set to initials avatar
                                            let first = editData.firstName ? editData.firstName[0].toUpperCase() : '';
                                            let last = editData.lastName ? editData.lastName[0].toUpperCase() : '';
                                            let initials = (first + last) || 'U';
                                            setEditData(d => ({ ...d, profilePhoto: `https://ui-avatars.com/api/?name=${initials}&background=4f46e5&color=fff&size=128&rounded=true` }));
                                        }
                                    }}
                                />
                                <input className="border rounded-lg px-3 py-2" placeholder="Street" value={editData.address.street} onChange={e => setEditData(d => ({...d, address: {...d.address, street: e.target.value}}))} />
                                <input className="border rounded-lg px-3 py-2" placeholder="City" value={editData.address.city} onChange={e => setEditData(d => ({...d, address: {...d.address, city: e.target.value}}))} />
                                <input className="border rounded-lg px-3 py-2" placeholder="State" value={editData.address.state} onChange={e => setEditData(d => ({...d, address: {...d.address, state: e.target.value}}))} />
                                <input className="border rounded-lg px-3 py-2" placeholder="Country" value={editData.address.country} onChange={e => setEditData(d => ({...d, address: {...d.address, country: e.target.value}}))} />
                            </div>
                            <button type="submit" className="w-full mt-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold shadow hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 disabled:opacity-60" disabled={editLoading}>
                                {editLoading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
                    </div>
                    <div className="text-center mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight drop-shadow">{user.firstName} {user.lastName}</h2>
                        <p className="text-gray-500 text-xs sm:text-sm mt-1">{user.email}</p>
                        <p className="text-gray-500 text-xs sm:text-sm mt-1">{user.phoneNumber}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:gap-4 text-gray-700 text-sm sm:text-base">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-blue-50/70 rounded-xl px-4 py-3 shadow-sm">
                            <span className="font-semibold">Precious Account Number:</span>
                            <span className="text-gray-600 break-all">{user.accountNumber}</span>
                            {/* copy button */}
                            {/* <button onClick={() => navigator.clipboard.writeText(user.accountNumber)} className="ml-2 text-blue-500 hover:underline">
                                <Copy className="inline-block mr-1" />
                            </button> */}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-indigo-50/70 rounded-xl px-4 py-3 shadow-sm">
                            <span className="font-semibold">Account Type:</span>
                            <span className="text-gray-600">{user.accountType}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-purple-50/70 rounded-xl px-4 py-3 shadow-sm">
                            <span className="font-semibold">Account Tier:</span>
                            <span className="text-gray-600">{user.accountTier}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-blue-50/70 rounded-xl px-4 py-3 shadow-sm">
                            <span className="font-semibold">Status:</span>
                            <span className="text-gray-600">{user.accountStatus}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-indigo-50/70 rounded-xl px-4 py-3 shadow-sm">
                            <span className="font-semibold">Balance:</span>
                            <span className="text-gray-700 font-bold">₦{user.balance?.toLocaleString()}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-purple-50/70 rounded-xl px-4 py-3 shadow-sm">
                            <span className="font-semibold">Currency:</span>
                            <span className="text-gray-600">{user.currency}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-blue-50/70 rounded-xl px-4 py-3 shadow-sm">
                            <span className="font-semibold">Member Since:</span>
                            <span className="text-gray-600">{new Date(user.registrationDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-indigo-50/70 rounded-xl px-4 py-3 shadow-sm">
                            <span className="font-semibold">Status Reason:</span>
                            <span className="text-gray-600">{user.statusReason}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-indigo-50/70 rounded-xl px-4 py-3 shadow-sm">
                            <span className="font-semibold">Address:</span>
                            <span className="text-gray-600">
                                {user.address?.street}, {user.address?.city}, {user.address?.state}, {user.address?.country}
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-center mt-8">
                        {/* <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 ring-offset-2 focus:ring-2 focus:ring-blue-400 focus:outline-none scale-100 hover:scale-105 active:scale-95">
                            Update Profile
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;