import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import '../css/Forget.css'
import { useNavigate } from 'react-router-dom'


const ForgetPassword = () => {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    try{
      const response = await axios.post("https://server-mi7c.onrender.com/auth/request-otp",{
        email: email.toLowerCase()
      })
      console.log(response.data.message)
      navigate("/reset")
    }catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data.message);
      } else {
        console.log("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      <section
        className="forgot-section py-5"
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(120deg, #e0e7ff 0%, #f8fafc 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative blurred circles for glassmorphism effect */}
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
            className="card forgot-password-card shadow-lg p-4 rounded-4 border-0 animate__animated animate__fadeInUp"
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
            <div className="card-header card-header-custom text-center bg-white border-0 mb-3" style={{ background: 'none', fontWeight: 700, fontSize: 22, color: '#3b3b6d', letterSpacing: 0.5, border: 'none' }}>
              <img src="/pp.png" alt="Precious Bank Logo" className="precious-bank-logo mb-2" style={{ width: 60, borderRadius: 16, boxShadow: '0 2px 12px #6366f144' }} />
              <div>Forgot Your Password?</div>
            </div>
            <div className="card-body p-4">
              {submitted ? (
                <p className="text-center mb-4 text-success">If this email is registered, a reset link has been sent.</p>
              ) : (
                <>
                  <p className="text-center mb-4" style={{ fontSize: 15 }}>
                    Enter your email address below and we'll send you instructions to reset your password.
                  </p>
                  <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label visually-hidden">Email Address</label>
                      <input
                        type="email"
                        className="form-control form-control-lg rounded-3 shadow-sm"
                        id="email"
                        name="email"
                        placeholder="Your Email Address"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        style={{ transition: 'box-shadow 0.2s, border 0.2s' }}
                      />
                      <div className="form-text form-text-muted mt-2" style={{ fontSize: 13 }}>
                        Please use the email address associated with your Precious Bank account.
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-gradient w-100 py-2 rounded-3 fw-bold mt-3"
                      style={{
                        background: 'linear-gradient(90deg, #6366f1 0%, #3b82f6 100%)',
                        color: '#fff',
                        letterSpacing: 1,
                        fontSize: 17,
                        boxShadow: '0 2px 8px #6366f133',
                        border: 'none',
                        transition: 'transform 0.15s, box-shadow 0.2s',
                      }}
                    >
                      Send Reset Link
                    </button>
                  </form>
                </>
              )}
              <div className="text-center mt-4">
                <p className="mb-0" style={{ fontSize: 15 }}>Remembered your password?{' '}
                  <Link to="/login" className="fw-semibold" style={{ color: '#6366f1', textDecoration: 'underline', textUnderlineOffset: 3 }}>Back to Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ForgetPassword
