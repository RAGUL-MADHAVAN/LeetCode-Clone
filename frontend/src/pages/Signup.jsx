import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signup(name, email, password);
            navigate('/problems');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed');
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
                        <h1 className="text-2xl font-bold text-lc-text">
                            Create Account
                        </h1>
                        <p className="text-sm text-lc-text-secondary mt-1">
                            Join CodeArena and start coding
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
                                htmlFor="signup-name"
                                className="block text-sm text-lc-text-secondary mb-1.5"
                            >
                                Full Name
                            </label>
                            <input
                                id="signup-name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input-field"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="signup-email"
                                className="block text-sm text-lc-text-secondary mb-1.5"
                            >
                                Email
                            </label>
                            <input
                                id="signup-email"
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
                                htmlFor="signup-password"
                                className="block text-sm text-lc-text-secondary mb-1.5"
                            >
                                Password
                            </label>
                            <input
                                id="signup-password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field"
                                placeholder="Min. 6 characters"
                                required
                                minLength={6}
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
                                    Creating account...
                                </span>
                            ) : (
                                'Sign Up'
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-sm text-lc-text-secondary mt-6">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="text-lc-accent hover:text-lc-accent-hover transition-smooth"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
