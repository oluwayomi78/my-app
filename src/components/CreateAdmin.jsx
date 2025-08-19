// import React, { useState } from 'react';
// import axios from 'axios';
// import { useFormik } from 'formik';
// import { useNavigate } from 'react-router-dom';
// import * as Yup from 'yup';


// const CreateAdmin = () => {
//     const [response, setResponse] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const navigate = useNavigate();
    
//     const formik = useFormik({
//         initialValues: {
//             name: '',
//             email: '',
//             password: '',
//             role: 'manager',
//         },
//         validationSchema: Yup.object({
//             name: Yup.string().required('Name is required'),
//             email: Yup.string().email('Invalid email').required('Email is required'),
//             password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//             role: Yup.string().required('Role is required'),
//         }),
//         onSubmit: async (values, { resetForm, setSubmitting }) => {
//             try {
//                 const res = await axios.post('http://localhost:2580/admin/create', values);
//                 setResponse(res.data.message);
//                 resetForm();
//                 navigate('/admin/login')
//             } catch (err) {
//                 setResponse(err.response?.data?.message || 'Error creating admin');
//             } finally {
//                 setSubmitting(false);
//             }
//         },
//     });

//     return (
//         <section
//             className="create-admin-section py-5"
//             style={{
//                 minHeight: '100vh',
//                 background: 'linear-gradient(120deg, #e0e7ff 0%, #f8fafc 100%)',
//                 position: 'relative',
//                 overflow: 'hidden',
//             }}
//         >
//             <div style={{
//                 position: 'absolute',
//                 top: '-120px',
//                 left: '-120px',
//                 width: 300,
//                 height: 300,
//                 background: 'radial-gradient(circle, #6366f1 0%, #a5b4fc 100%)',
//                 filter: 'blur(80px)',
//                 opacity: 0.4,
//                 zIndex: 0,
//             }} />
//             <div style={{
//                 position: 'absolute',
//                 bottom: '-100px',
//                 right: '-100px',
//                 width: 250,
//                 height: 250,
//                 background: 'radial-gradient(circle, #3b82f6 0%, #f8fafc 100%)',
//                 filter: 'blur(70px)',
//                 opacity: 0.3,
//                 zIndex: 0,
//             }} />

//             <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '90vh', zIndex: 1, position: 'relative' }}>
//                 <div
//                     className="card create-admin-card shadow-lg p-4 rounded-4 border-0 animate__animated animate__fadeInUp"
//                     style={{
//                         maxWidth: 430,
//                         width: '100%',
//                         background: 'rgba(255,255,255,0.85)',
//                         backdropFilter: 'blur(8px)',
//                         border: '1.5px solid #e0e7ff',
//                         boxShadow: '0 8px 32px 0 rgba(99,102,241,0.10)',
//                         transition: 'box-shadow 0.3s',
//                     }}
//                 >
//                     <h3 className="text-center mb-4 fw-bold" style={{ color: '#3b3b6d', fontSize: 25, letterSpacing: 0.5 }}>Create New Admin</h3>
//                     {response && <div className="mb-3 text-center fw-semibold" style={{ background: '#e0e7ff', color: '#3b3b6d', borderRadius: 8, padding: '10px 16px', fontSize: 15 }}>{response}</div>}
//                     <form onSubmit={formik.handleSubmit} autoComplete="off">
//                         <div className="mb-3">
//                             <label className="form-label fw-semibold">Name</label>
//                             <input
//                                 type="text"
//                                 name="name"
//                                 className={`form-control form-control-lg rounded-3 shadow-sm${formik.touched.name && formik.errors.name ? ' is-invalid' : ''}`}
//                                 required
//                                 style={{ transition: 'box-shadow 0.2s, border 0.2s' }}
//                                 value={formik.values.name}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                             />
//                             {formik.touched.name && formik.errors.name && (
//                                 <div className="invalid-feedback d-block small">{formik.errors.name}</div>
//                             )}
//                         </div>
//                         <div className="mb-3">
//                             <label className="form-label fw-semibold">Email</label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 className={`form-control form-control-lg rounded-3 shadow-sm${formik.touched.email && formik.errors.email ? ' is-invalid' : ''}`}
//                                 required
//                                 style={{ transition: 'box-shadow 0.2s, border 0.2s' }}
//                                 value={formik.values.email}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                             />
//                             {formik.touched.email && formik.errors.email && (
//                                 <div className="invalid-feedback d-block small">{formik.errors.email}</div>
//                             )}
//                         </div>
//                         <div className="mb-3 position-relative">
//                             <label className="form-label fw-semibold">Password</label>
//                             <div style={{ position: 'relative' }}>
//                                 <input
//                                     type={showPassword ? 'text' : 'password'}
//                                     name="password"
//                                     className={`form-control form-control-lg rounded-3 shadow-sm pe-5${formik.touched.password && formik.errors.password ? ' is-invalid' : ''}`}
//                                     required
//                                     style={{ transition: 'box-shadow 0.2s, border 0.2s', paddingRight: 44 }}
//                                     value={formik.values.password}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                 />
//                                 <button
//                                     type="button"
//                                     tabIndex={-1}
//                                     aria-label={showPassword ? 'Hide password' : 'Show password'}
//                                     onClick={() => setShowPassword(v => !v)}
//                                     style={{
//                                         position: 'absolute',
//                                         top: '50%',
//                                         right: 12,
//                                         transform: 'translateY(-50%)',
//                                         background: 'none',
//                                         border: 'none',
//                                         padding: 0,
//                                         margin: 0,
//                                         cursor: 'pointer',
//                                         outline: 'none',
//                                         zIndex: 2,
//                                         height: 28,
//                                         width: 28,
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         justifyContent: 'center',
//                                     }}
//                                 >
//                                     {showPassword ? (
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#6366f1" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0 1 12 19c-5 0-9-4-9-7s4-7 9-7c1.13 0 2.21.19 3.22.54M19.07 19.07 4.93 4.93m14.14 14.14A9.97 9.97 0 0 1 21 12c0-1.13-.19-2.21-.54-3.22M9.88 9.88a3 3 0 1 0 4.24 4.24" /></svg>
//                                     ) : (
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#6366f1" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 0c0 3-4 7-9 7s-9-4-9-7 4-7 9-7 9 4 9 7Z" /></svg>
//                                     )}
//                                 </button>
//                             </div>
//                             {formik.touched.password && formik.errors.password && (
//                                 <div className="invalid-feedback d-block small">{formik.errors.password}</div>
//                             )}
//                         </div>
//                         <div className="mb-3">
//                             <label className="form-label fw-semibold">Role</label>
//                             <select
//                                 name="role"
//                                 className={`form-control form-control-lg rounded-3 shadow-sm${formik.touched.role && formik.errors.role ? ' is-invalid' : ''}`}
//                                 style={{ transition: 'box-shadow 0.2s, border 0.2s' }}
//                                 value={formik.values.role}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                             >
//                                 <option value="superadmin">Super Admin</option>
//                                 <option value="manager">Manager</option>
//                                 <option value="support">Support</option>
//                             </select>
//                             {formik.touched.role && formik.errors.role && (
//                                 <div className="invalid-feedback d-block small">{formik.errors.role}</div>
//                             )}
//                         </div>
//                         <button
//                             type="submit"
//                             className="btn btn-gradient w-100 py-2 rounded-3 fw-bold mt-2"
//                             style={{
//                                 background: 'linear-gradient(90deg, #6366f1 0%, #3b82f6 100%)',
//                                 color: '#fff',
//                                 letterSpacing: 1,
//                                 fontSize: 17,
//                                 boxShadow: '0 2px 8px #6366f133',
//                                 border: 'none',
//                                 transition: 'transform 0.15s, box-shadow 0.2s',
//                             }}
//                             disabled={formik.isSubmitting}
//                         >
//                             {formik.isSubmitting ? 'Creating...' : 'Create Admin'}
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default CreateAdmin;
