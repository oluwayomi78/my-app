import { useState,} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("http://localhost:2580/admin/login", {
                email,
                password,
            });

            console.log("Login successful:", res.data);
            navigate("/admin/user")
        } catch (err) {
            console.error("Login error:", err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else if (err.message) {
                setError(err.message);
            } else {
                setError("Login failed. Please try again.");
            }
        }

    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                className="shadow-lg rounded-4 p-4 bg-white"
                style={{ maxWidth: 400, width: "100%", borderRadius: 24 }}
            >
                <div className="d-flex flex-column align-items-center mb-3">
                    <div
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: "50%",
                            background: "#e0e7ff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: 12,
                        }}
                    >
                        <span style={{ fontSize: 32, color: "#6366f1" }}>🔒</span>
                    </div>
                    <h2 className="mb-1 fw-bold" style={{ color: "#1e293b" }}>Admin Login</h2>
                    <div className="text-muted mb-2" style={{ fontSize: 15 }}>
                        Precious Bank Admin Portal
                    </div>
                </div>
                <form onSubmit={handleLogin}>
                    {error && (
                        <div className="alert alert-danger text-center py-2" role="alert">
                            {error}
                        </div>
                    )}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-semibold">
                            Email Address
                        </label>
                        <input
                            type="email"
                            className="form-control form-control-lg"
                            id="email"
                            placeholder="Enter admin email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ borderRadius: 12, fontSize: 16 }}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label fw-semibold">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control form-control-lg"
                            id="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ borderRadius: 12, fontSize: 16 }}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100 fw-bold py-2"
                        style={{ borderRadius: 12, fontSize: 17, background: "#6366f1", border: "none" }}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
