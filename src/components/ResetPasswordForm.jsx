import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/ResetPasswordForm.css'


const App = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    
    const [isLoading, setIsLoading] = useState(false);

    const handleReset = async (e) => {
        e.preventDefault();
        setMessage("");
        setIsError(false);
        setIsLoading(true);
        navigate("/login")
        try {
            const response = await axios.post("https://server-mi7c.onrender.com/auth/reset-password", {
                email: email.toLowerCase(),
                otp,
                newPassword,
            });
            setMessage(response.data.message || "Password reset successfully!");
            setEmail("");
            setOtp("");
            setNewPassword("");
            
            
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setMessage(err.response.data.message);
            } else {
                setMessage("Something went wrong. Please check your network and try again.");
            }
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
        <section
            className="reset-section py-5"
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(120deg, #e0e7ff 0%, #f8fafc 100%)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <div style={{
                position: 'absolute',
                top: '-120px',
                left: '-120px',
                width: 300,
                height: 300,
                background: 'radial-gradient(circle, #6366f1 0%, #a5b4fc 100%)',
                filter: 'blur(80px)',
                opacity: 0.4,
                zIndex: 0,
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-100px',
                right: '-100px',
                width: 250,
                height: 250,
                background: 'radial-gradient(circle, #3b82f6 0%, #f8fafc 100%)',
                filter: 'blur(70px)',
                opacity: 0.3,
                zIndex: 0,
            }} />

            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '90vh', zIndex: 1, position: 'relative' }}>
                <div
                    className="card form-card shadow-lg p-4 rounded-4 border-0 animate__animated animate__fadeInUp"
                    style={{
                        maxWidth: 430,
                        width: '100%',
                        background: 'rgba(255,255,255,0.85)',
                        backdropFilter: 'blur(8px)',
                        border: '1.5px solid #e0e7ff',
                        boxShadow: '0 8px 32px 0 rgba(99,102,241,0.10)',
                        transition: 'box-shadow 0.3s',
                    }}
                >
                    <h2 className="form-title text-center mb-4" style={{ color: '#3b3b6d', fontWeight: 700, fontSize: 26, letterSpacing: 0.5 }}>Reset Password</h2>

                    <form onSubmit={handleReset} autoComplete="off">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label visually-hidden">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Your email address"
                                className="form-control form-control-lg rounded-3 shadow-sm"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{ transition: 'box-shadow 0.2s, border 0.2s' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="otp" className="form-label visually-hidden">OTP</label>
                            <input
                                type="text"
                                id="otp"
                                placeholder="Enter the OTP"
                                className="form-control form-control-lg rounded-3 shadow-sm"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                style={{ transition: 'box-shadow 0.2s, border 0.2s' }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="newPassword" className="form-label visually-hidden">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                placeholder="Create a new password"
                                className="form-control form-control-lg rounded-3 shadow-sm"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                style={{ transition: 'box-shadow 0.2s, border 0.2s' }}
                            />
                        </div>
                        {message && (
                            <div
                                className={`message-box ${isError ? "error" : "success"} mb-3`}
                                style={{
                                    background: isError ? '#fee2e2' : '#d1fae5',
                                    color: isError ? '#b91c1c' : '#065f46',
                                    borderRadius: 8,
                                    padding: '10px 16px',
                                    fontWeight: 500,
                                    fontSize: 15,
                                    boxShadow: '0 1px 4px #6366f122',
                                }}
                            >
                                {message}
                            </div>
                        )}
                        <button
                            type="submit"
                            className="btn btn-gradient w-100 py-2 rounded-3 fw-bold submit-button"
                            style={{
                                background: 'linear-gradient(90deg, #6366f1 0%, #3b82f6 100%)',
                                color: '#fff',
                                letterSpacing: 1,
                                fontSize: 17,
                                boxShadow: '0 2px 8px #6366f133',
                                border: 'none',
                                transition: 'transform 0.15s, box-shadow 0.2s',
                            }}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner"></span>
                                    Resetting...
                                </>
                            ) : (
                                "Reset Password"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
        </>
    );
};

export default App;
