import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { X, Mail, Lock, Loader, AlertCircle, Check } from 'lucide-react';

const LoginModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);

    if (!isOpen) return null;

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
                onClose();
                window.location.reload();
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
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>
                    <X size={24} />
                </button>

                <h2 className="modal-title">{isLogin ? 'Login ke StreamID' : 'Daftar Akun'}</h2>
                <p className="modal-subtitle">
                    {isLogin ? 'Masuk untuk mengakses fitur lengkap' : 'Buat akun untuk mulai streaming'}
                </p>

                {error && (
                    <div className="error-alert">
                        <AlertCircle size={16} />
                        <span>{error}</span>
                    </div>
                )}

                {successMessage && (
                    <div className="success-alert">
                        <Check size={16} />
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
                        {loading ? (
                            <Loader size={20} className="spinner" />
                        ) : (
                            isLogin ? 'Masuk' : 'Daftar'
                        )}
                    </button>
                </form>

                <p className="toggle-auth">
                    {isLogin ? 'Belum punya akun? ' : 'Sudah punya akun? '}
                    <button onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Daftar sekarang' : 'Login disini'}
                    </button>
                </p>
            </div>

            <style jsx>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-content {
          background: #1a1d23;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2.5rem;
          width: 100%;
          max-width: 400px;
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .close-btn {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          transition: color 0.2s;
        }

        .close-btn:hover {
          color: white;
        }

        .modal-title {
          font-family: 'Outfit', sans-serif;
          font-size: 1.75rem;
          font-weight: 800;
          color: white;
          text-align: center;
          margin-bottom: 0.5rem;
        }

        .modal-subtitle {
          color: #94a3b8;
          text-align: center;
          margin-bottom: 2rem;
          font-size: 0.95rem;
        }

        .error-alert {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #ef4444;
          padding: 0.75rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          font-size: 0.875rem;
        }

        .success-alert {
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.2);
          color: #22c55e;
          padding: 0.75rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          font-size: 0.875rem;
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
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 0.875rem 1rem 0.875rem 2.75rem;
          color: white;
          font-size: 0.95rem;
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

        .toggle-auth {
          text-align: center;
          margin-top: 1.5rem;
          color: #94a3b8;
          font-size: 0.9rem;
        }

        .toggle-auth button {
          background: none;
          border: none;
          color: #e11d48;
          font-weight: 600;
          cursor: pointer;
          margin-left: 0.25rem;
        }

        .toggle-auth button:hover {
          text-decoration: underline;
        }


      `}</style>
        </div>
    );
};

export default LoginModal;
