import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/problems');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-4">
            <div className="w-full max-w-md animate-fadeIn">
                <div className="glass-card p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-12 h-12 bg-lc-accent rounded-xl flex items-center justify-center mx-auto mb-4 pulse-glow">
                            <span className="text-black font-bold text-lg">&lt;/&gt;</span>
                        </div>
                        <h1 className="text-2xl font-bold text-lc-text">Welcome Back</h1>
                        <p className="text-sm text-lc-text-secondary mt-1">
                            Sign in to continue coding
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="bg-lc-wrong/10 border border-lc-wrong/30 rounded-lg p-3 mb-4">
                            <p className="text-sm text-lc-wrong">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="login-email"
                                className="block text-sm text-lc-text-secondary mb-1.5"
                            >
                                Email
                            </label>
                            <input
                                id="login-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-field"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="login-password"
                                className="block text-sm text-lc-text-secondary mb-1.5"
                            >
                                Password
                            </label>
                            <input
                                id="login-password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                                    Signing in...
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-sm text-lc-text-secondary mt-6">
                        Don&apos;t have an account?{' '}
                        <Link
                            to="/signup"
                            className="text-lc-accent hover:text-lc-accent-hover transition-smooth"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
