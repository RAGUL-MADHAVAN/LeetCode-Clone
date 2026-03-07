import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-lc-bg-card border-b border-lc-border sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-lc-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-smooth">
                            <span className="text-black font-bold text-sm">&lt;/&gt;</span>
                        </div>
                        <span className="text-lg font-bold text-lc-text group-hover:text-lc-accent transition-smooth">
                            CodeArena
                        </span>
                    </Link>

                    {/* Navigation */}
                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                <Link
                                    to="/problems"
                                    className="text-lc-text-secondary hover:text-lc-text text-sm font-medium transition-smooth"
                                >
                                    Problems
                                </Link>
                                <Link
                                    to="/profile"
                                    className="text-lc-text-secondary hover:text-lc-text text-sm font-medium transition-smooth"
                                >
                                    Profile
                                </Link>
                                <div className="flex items-center gap-3 ml-2 pl-4 border-l border-lc-border">
                                    <div className="w-7 h-7 bg-lc-accent/20 rounded-full flex items-center justify-center">
                                        <span className="text-lc-accent text-xs font-bold">
                                            {user.name?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="text-sm text-lc-text-secondary hidden sm:block">
                                        {user.name}
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className="text-xs text-lc-text-secondary hover:text-lc-wrong transition-smooth ml-1"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-lc-text-secondary hover:text-lc-text text-sm font-medium transition-smooth"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="btn-primary text-sm py-1.5 px-4"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
