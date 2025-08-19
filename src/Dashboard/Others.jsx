// import React, { useState } from "react";
// import axios from "axios";

// const Others = () => {
//     const [form, setForm] = useState({
//         recipient_code: "",
//         amount: "",
//         reason: "",
//     });
//     const [loading, setLoading] = useState(false);
//     const [result, setResult] = useState(null);

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const res = await axios.post("http://localhost:5000/api/paystack/make-transfer", {
//                 ...form,
//                 amount: Number(form.amount),
//             });
//             setResult(res.data);
//         } catch (err) {
//             console.error(err.response?.data || err.message);
//             setResult({ error: err.response?.data?.message || "Something went wrong" });
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="p-6 bg-gray-100 rounded-xl w-[400px]">
//             <h2 className="text-lg font-bold mb-3">Make Transfer</h2>
//             <form onSubmit={handleSubmit} className="space-y-3">
//                 <input
//                     type="text"
//                     name="recipient_code"
//                     placeholder="Recipient Code"
//                     className="p-2 border rounded w-full"
//                     onChange={handleChange}
//                 />
//                 <input
//                     type="number"
//                     name="amount"
//                     placeholder="Amount (₦)"
//                     className="p-2 border rounded w-full"
//                     onChange={handleChange}
//                 />
//                 <input
//                     type="text"
//                     name="reason"
//                     placeholder="Reason (optional)"
//                     className="p-2 border rounded w-full"
//                     onChange={handleChange}
//                 />
//                 <button
//                     type="submit"
//                     className="bg-green-600 text-white px-4 py-2 rounded"
//                     disabled={loading}
//                 >
//                     {loading ? "Processing..." : "Send Money"}
//                 </button>
//             </form>

//             {result && (
//                 <pre className="bg-white p-3 mt-4 rounded text-sm">
//                     {JSON.stringify(result, null, 2)}
//                 </pre>
//             )}
//         </div>
//     );
// };

// export default Others;
