import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function SubmissionsPage() {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        try {
            const storedUser = localStorage.getItem('user');
            const user = storedUser ? JSON.parse(storedUser) : null;
            if (!user?._id) {
                setError('Not logged in');
                return;
            }

            const res = await api.get(`/submissions/user/${user._id}/all`);
            setSubmissions(res.data || []);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load submissions');
        } finally {
            setLoading(false);
        }
    };

    const statusColor = {
        Accepted: 'text-lc-accepted',
        'Wrong Answer': 'text-lc-wrong',
        'Runtime Error': 'text-lc-wrong',
        'Compilation Error': 'text-lc-wrong',
        'Time Limit Exceeded': 'text-lc-medium',
        Pending: 'text-lc-text-secondary',
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-56px)]">
                <div className="w-8 h-8 border-2 border-lc-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-8">
                <div className="glass-card p-6">
                    <p className="text-lc-wrong text-sm">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 animate-fadeIn">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-lc-text mb-1">All Submissions</h1>
                <p className="text-sm text-lc-text-secondary">
                    {submissions.length} submissions
                </p>
            </div>

            <div className="glass-card overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-lc-border">
                            <th className="text-left py-3 px-4 text-xs font-semibold text-lc-text-secondary uppercase tracking-wider">
                                Problem
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-semibold text-lc-text-secondary uppercase tracking-wider">
                                Status
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-semibold text-lc-text-secondary uppercase tracking-wider">
                                Language
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-semibold text-lc-text-secondary uppercase tracking-wider">
                                Runtime
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-semibold text-lc-text-secondary uppercase tracking-wider">
                                Time
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-10 text-lc-text-secondary text-sm">
                                    No submissions yet.
                                </td>
                            </tr>
                        ) : (
                            submissions.map((s) => (
                                <tr
                                    key={s._id}
                                    className="border-b border-lc-border/50 hover:bg-lc-bg-hover/50 transition-smooth"
                                >
                                    <td className="py-3 px-4">
                                        <Link
                                            to={s.problemId?._id ? `/problem/${s.problemId._id}` : '#'}
                                            className="text-sm font-medium text-lc-text hover:text-lc-accent transition-smooth"
                                        >
                                            {s.problemId?.title || 'Unknown'}
                                        </Link>
                                        {s.problemId?.difficulty && (
                                            <div className="mt-1">
                                                <span className={`badge-${s.problemId.difficulty}`}>{s.problemId.difficulty}</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`text-sm font-medium ${statusColor[s.status] || 'text-lc-text-secondary'}`}>
                                            {s.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className="text-xs bg-lc-bg-input text-lc-text-secondary px-2 py-1 rounded">
                                            {s.language}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-xs text-lc-text-secondary">
                                        {s.runtime || '—'}
                                    </td>
                                    <td className="py-3 px-4 text-xs text-lc-text-secondary">
                                        {s.createdAt ? new Date(s.createdAt).toLocaleString() : '—'}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-6">
                <Link to="/profile" className="text-sm text-lc-text-secondary hover:text-lc-accent transition-smooth">
                    ← Back to Profile
                </Link>
            </div>
        </div>
    );
}
