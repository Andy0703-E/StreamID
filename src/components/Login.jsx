import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Mail, Lock, Loader, AlertCircle, Check, ArrowLeft } from 'lucide-react';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                // Redirect to home on success
                window.location.href = '/';
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                setSuccessMessage('Pendaftaran berhasil! Silakan cek email Anda untuk verifikasi.');
                setIsLogin(true);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <button className="back-btn" onClick={() => window.location.href = '/'}>
                <ArrowLeft size={20} />
                Kembali
            </button>

            <div className="login-card">
                <div className="logo-section">
                    <img src="/logo.png" alt="StreamID Logo" className="logo" />
                    <h1 className="title">{isLogin ? 'Selamat Datang Kembali' : 'Bergabung dengan StreamID'}</h1>
                    <p className="subtitle">
                        {isLogin ? 'Masuk untuk lanjut nonton tayangan favoritmu' : 'Daftar sekarang untuk akses ribuan konten menarik'}
                    </p>
                </div>

                {error && (
                    <div className="alert error-alert">
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                {successMessage && (
                    <div className="alert success-alert">
                        <Check size={18} />
                        <span>{successMessage}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Email</label>
                        <div className="input-wrapper">
                            <Mail size={18} className="input-icon" />
                            <input
                                type="email"
                                placeholder="nama@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-wrapper">
                            <Lock size={18} className="input-icon" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                        </div>
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? <Loader size={20} className="spinner" /> : (isLogin ? 'Masuk Sekarang' : 'Daftar Akun')}
                    </button>
                </form>

                <div className="footer">
                    <p>
                        {isLogin ? 'Belum punya akun? ' : 'Sudah punya akun? '}
                        <button className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? 'Daftar disini' : 'Login disini'}
                        </button>
                    </p>
                </div>
            </div>

            <style jsx>{`
                .login-container {
                    min-height: 100vh;
                    background: radial-gradient(circle at top right, #1e293b, #0f1115);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                    position: relative;
                }

                .back-btn {
                    position: absolute;
                    top: 2rem;
                    left: 2rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: #94a3b8;
                    padding: 0.75rem 1.25rem;
                    border-radius: 12px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: all 0.2s;
                }

                .back-btn:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: white;
                }

                .login-card {
                    background: #1a1d23;
                    width: 100%;
                    max-width: 420px;
                    padding: 2.5rem;
                    border-radius: 24px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }

                .logo-section {
                    text-align: center;
                    margin-bottom: 2rem;
                }

                .logo {
                    height: 48px;
                    margin-bottom: 1.5rem;
                }

                .title {
                    font-size: 1.75rem;
                    font-weight: 800;
                    color: white;
                    margin-bottom: 0.5rem;
                    font-family: 'Outfit', sans-serif;
                }

                .subtitle {
                    color: #94a3b8;
                    font-size: 0.95rem;
                }

                .alert {
                    padding: 1rem;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 1.5rem;
                    font-size: 0.9rem;
                }

                .error-alert {
                    background: rgba(239, 68, 68, 0.1);
                    border: 1px solid rgba(239, 68, 68, 0.2);
                    color: #ef4444;
                }

                .success-alert {
                    background: rgba(34, 197, 94, 0.1);
                    border: 1px solid rgba(34, 197, 94, 0.2);
                    color: #22c55e;
                }

                .form-group {
                    margin-bottom: 1.25rem;
                }

                label {
                    display: block;
                    color: #e2e8f0;
                    font-size: 0.875rem;
                    font-weight: 500;
                    margin-bottom: 0.5rem;
                }

                .input-wrapper {
                    position: relative;
                }

                .input-icon {
                    position: absolute;
                    left: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #94a3b8;
                }

                input {
                    width: 100%;
                    background: rgba(0, 0, 0, 0.3);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    padding: 0.875rem 1rem 0.875rem 2.75rem;
                    color: white;
                    font-size: 1rem;
                    transition: all 0.2s;
                }

                input:focus {
                    outline: none;
                    border-color: #e11d48;
                    background: rgba(225, 29, 72, 0.05);
                }

                .submit-btn {
                    width: 100%;
                    background: linear-gradient(to right, #e11d48, #fb7185);
                    color: white;
                    border: none;
                    padding: 1rem;
                    border-radius: 12px;
                    font-weight: 700;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: all 0.2s;
                    margin-top: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .submit-btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 25px rgba(225, 29, 72, 0.3);
                }

                .submit-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .spinner {
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .footer {
                    text-align: center;
                    margin-top: 1.5rem;
                    color: #94a3b8;
                    font-size: 0.95rem;
                }

                .toggle-btn {
                    background: none;
                    border: none;
                    color: #e11d48;
                    font-weight: 600;
                    cursor: pointer;
                }

                .toggle-btn:hover {
                    text-decoration: underline;
                }
            `}</style>
        </div>
    );
};

export default Login;
