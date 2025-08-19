import React, { useEffect, useState } from "react";
import axios from "axios";

const TransactionModal = ({ open, onClose, transaction }) => {
    if (!open || !transaction) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
                >
                    &times;
                </button>
                <h2 className="text-lg font-bold mb-2">Transaction Details</h2>
                <div className="space-y-1 text-sm">
                    <div>
                        <span className="font-semibold">ID:</span>{" "}
                        {transaction._id || transaction.id}
                    </div>
                    <div>
                        <span className="font-semibold">Type:</span> {transaction.type}
                    </div>
                    <div>
                        <span className="font-semibold">Amount:</span> ₦
                        {transaction.amount?.toLocaleString()}
                    </div>
                    <div>
                        <span className="font-semibold">Status:</span> {transaction.status}
                    </div>
                    <div>
                        <span className="font-semibold">Date:</span>{" "}
                        {transaction.createdAt
                            ? new Date(transaction.createdAt).toLocaleString()
                            : ""}
                    </div>
                    {transaction.note && (
                        <div>
                            <span className="font-semibold">Note:</span> {transaction.note}
                        </div>
                    )}
                    {transaction.sender && (
                        <div>
                            <span className="font-semibold">Sender:</span>{" "}
                            {transaction.sender.accountNumber || transaction.sender}
                        </div>
                    )}
                    {transaction.recipient && (
                        <div>
                            <span className="font-semibold">Recipient:</span>{" "}
                            {transaction.recipient.accountNumber || transaction.recipient}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const typeStyles = {
    transaction: "bg-green-100 border-green-400 text-green-700",
    activities: "bg-blue-100 border-blue-400 text-blue-700",
    services: "bg-yellow-100 border-yellow-400 text-yellow-700",
    info: "bg-gray-100 border-gray-400 text-gray-700",
    error: "bg-red-100 border-red-400 text-red-700",
    success: "bg-green-100 border-green-400 text-green-700",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
};

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTransaction, setModalTransaction] = useState(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await axios.get("https://server-mi7c.onrender.com/notification", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setNotifications(Array.isArray(res.data.data) ? res.data.data : []);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchTransactions = async () => {
            try {
                const res = await axios.get("https://server-mi7c.onrender.com/transactions", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setTransactions(Array.isArray(res.data) ? res.data : []);
            } catch {
                setTransactions([]);
            }
        };
        fetchTransactions();
        fetchNotifications();
    }, []);


    const handleViewTransaction = (transactionId) => {
        // Try both string and object id
        const tx = transactions.find(t => String(t.id || t._id) === String(transactionId));
        if (tx) {
            setModalTransaction(tx);
            setModalOpen(true);
        } else {
            setModalTransaction(null);
            setModalOpen(false);
            alert("Transaction not found.");
        }
    };


    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await axios.get("https://server-mi7c.onrender.com/notification", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                // The backend returns { success, data: [...] }
                setNotifications(Array.isArray(res.data.data) ? res.data.data : []);
            } catch (error) {
                setNotifications([]);
                console.error("Error fetching notifications:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNotifications();
    }, []);

    const filterOptions = [
        { label: "All", value: "all" },
        { label: "Transaction", value: "transaction",  },
        { label: "Activities", value: "activities" },
        { label: "Services", value: "services" },
    ];

    const filteredNotifications =
        filter === "all"
            ? notifications
            : notifications.filter((n) =>
                (filter === "transaction" && n.type === "transaction") ||
                (filter === "activities" && n.type === "activities") ||
                (filter === "services" && n.type === "services")
            );

    if (loading) {
        return <p className="text-gray-500">Loading notifications...</p>;
    }

    return (
        <div>
            <h1 className="text-center mt-3">Notifications</h1>
            <div className="flex gap-2 justify-center mt-6 mb-8">
                {filterOptions.map((opt) => (
                    <button
                        key={opt.value}
                        className={`px-4 py-2 rounded font-semibold border transition-colors duration-150 ${
                            filter === opt.value
                                ? "bg-indigo-600 text-white border-indigo-600"
                                : "bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                        }`}
                        onClick={() => setFilter(opt.value)}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
            {filteredNotifications.length === 0 ? (
                <p className="text-gray-500">No notifications yet.</p>
            ) : (
                <div className="space-y-3 mt-10">
                    {filteredNotifications.map((n, idx) => (
                        <div
                            key={n._id || idx}
                            className={`p-3 border-l-4 rounded shadow ${typeStyles[n.type || "info"]} w-full max-w-2xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2`}
                        >
                            <div className="flex-1 min-w-0">
                                <strong className="block font-semibold truncate">{n.title || "Notification"}</strong>
                                <span className="block text-sm text-gray-700 break-words">{n.message}</span>
                                {n.type && <span className="text-xs text-gray-400">Type: {n.type}</span>}
                            </div>
                            <div className="flex flex-col items-end gap-2 min-w-fit">
                                {n.createdAt && (
                                    <span className="text-xs text-gray-400">{new Date(n.createdAt).toLocaleString()}</span>
                                )}
                                {n.type === "transaction" && n.transactionId && (
                                    <button
                                        onClick={() => handleViewTransaction(n.transactionId)}
                                        className="mt-1 px-3 py-1 bg-indigo-600 text-white rounded text-xs font-semibold hover:bg-indigo-700 transition"
                                    >
                                        View Transaction
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <TransactionModal open={modalOpen && !!modalTransaction} onClose={() => setModalOpen(false)} transaction={modalTransaction} />
        </div>
    );
};

export default Notification;
