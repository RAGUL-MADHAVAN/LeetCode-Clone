import { useState, useEffect } from 'react';
import api from '../services/api';

export default function ProfilePage() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await api.get('/auth/stats');
            setStats(res.data);
        } catch (err) {
            console.error('Failed to fetch stats:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-56px)]">
                <div className="w-8 h-8 border-2 border-lc-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!stats) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-56px)]">
                <p className="text-lc-text-secondary">Failed to load profile</p>
            </div>
        );
    }

    const statCards = [
        {
            label: 'Total Submissions',
            value: stats.totalSubmissions,
            icon: '📊',
            color: 'text-lc-accent',
            bg: 'bg-lc-accent/10',
        },
        {
            label: 'Accepted',
            value: stats.acceptedSubmissions,
            icon: '✅',
            color: 'text-lc-accepted',
            bg: 'bg-lc-accepted/10',
        },
        {
            label: 'Problems Solved',
            value: stats.solvedProblems,
            icon: '🏆',
            color: 'text-lc-medium',
            bg: 'bg-lc-medium/10',
        },
        {
            label: 'Accuracy',
            value: `${stats.accuracy}%`,
            icon: '🎯',
            color: 'text-lc-easy',
            bg: 'bg-lc-easy/10',
        },
    ];

    const statusColor = {
        Accepted: 'text-lc-accepted',
        'Wrong Answer': 'text-lc-wrong',
        'Runtime Error': 'text-lc-wrong',
        'Compilation Error': 'text-lc-wrong',
        'Time Limit Exceeded': 'text-lc-medium',
        Pending: 'text-lc-text-secondary',
    };

    const solvedByDifficulty = stats.solvedByDifficulty || { easy: 0, medium: 0, hard: 0 };

    const today = new Date();
    const start = new Date();
    start.setDate(today.getDate() - 364);

    const activity = stats.submissionActivity || {};
    const days = [];
    for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
        const iso = d.toISOString().slice(0, 10);
        days.push({
            date: iso,
            count: activity[iso] || 0,
        });
    }

    const maxCount = days.reduce((m, x) => Math.max(m, x.count), 0);
    const activityColor = (count) => {
        if (!count) return 'bg-lc-bg-input';
        if (maxCount <= 1) return 'bg-lc-accepted/50';
        const ratio = count / maxCount;
        if (ratio < 0.34) return 'bg-lc-accepted/30';
        if (ratio < 0.67) return 'bg-lc-accepted/60';
        return 'bg-lc-accepted';
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 animate-fadeIn">
            {/* Profile header */}
            <div className="glass-card p-6 mb-8">
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-lc-accent/20 rounded-2xl flex items-center justify-center">
                        <span className="text-lc-accent text-2xl font-bold">
                            {stats.user.name?.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-lc-text">
                            {stats.user.name}
                        </h1>
                        <p className="text-sm text-lc-text-secondary">{stats.user.email}</p>
                        <p className="text-xs text-lc-text-secondary mt-1">
                            Member since{' '}
                            {new Date(stats.user.createdAt).toLocaleDateString('en-US', {
                                month: 'long',
                                year: 'numeric',
                            })}
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {statCards.map((stat) => (
                    <div key={stat.label} className="glass-card p-5">
                        <div className="flex items-center gap-3 mb-3">
                            <div
                                className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}
                            >
                                <span className="text-lg">{stat.icon}</span>
                            </div>
                        </div>
                        <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                        <p className="text-xs text-lc-text-secondary mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Accuracy progress bar */}
            <div className="glass-card p-6 mb-8">
                <h2 className="text-sm font-semibold text-lc-text mb-4">
                    Submission Accuracy
                </h2>
                <div className="w-full bg-lc-bg-input rounded-full h-3 overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-lc-accent to-lc-accepted rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${Math.min(parseFloat(stats.accuracy), 100)}%` }}
                    />
                </div>
                <div className="flex justify-between mt-2">
                    <span className="text-xs text-lc-text-secondary">
                        {stats.acceptedSubmissions} accepted out of{' '}
                        {stats.totalSubmissions} submissions
                    </span>
                    <span className="text-xs text-lc-accent font-medium">
                        {stats.accuracy}%
                    </span>
                </div>
            </div>

            {/* Solved breakdown + Activity heatmap */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
                <div className="glass-card p-6">
                    <h2 className="text-sm font-semibold text-lc-text mb-4">
                        Problems Solved Breakdown
                    </h2>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-lc-bg rounded-lg border border-lc-border p-4">
                            <p className="text-xs text-lc-text-secondary mb-1">Easy</p>
                            <p className="text-2xl font-bold text-lc-easy">{solvedByDifficulty.easy}</p>
                        </div>
                        <div className="bg-lc-bg rounded-lg border border-lc-border p-4">
                            <p className="text-xs text-lc-text-secondary mb-1">Medium</p>
                            <p className="text-2xl font-bold text-lc-medium">{solvedByDifficulty.medium}</p>
                        </div>
                        <div className="bg-lc-bg rounded-lg border border-lc-border p-4">
                            <p className="text-xs text-lc-text-secondary mb-1">Hard</p>
                            <p className="text-2xl font-bold text-lc-hard">{solvedByDifficulty.hard}</p>
                        </div>
                    </div>
                </div>

                <div className="glass-card p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-lc-text">
                            Submission Activity (Last 12 months)
                        </h2>
                        <span className="text-xs text-lc-text-secondary">
                            Max/day: {maxCount}
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <div className="min-w-[720px]">
                            <div className="grid grid-rows-7 grid-flow-col gap-1">
                                {days.map((d) => (
                                    <div
                                        key={d.date}
                                        title={`${d.date}: ${d.count} submissions`}
                                        className={`w-3.5 h-3.5 rounded ${activityColor(d.count)} border border-lc-border/40`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent submissions */}
            <div className="glass-card overflow-hidden">
                <div className="p-4 border-b border-lc-border">
                    <h2 className="text-sm font-semibold text-lc-text">
                        Recent Submissions
                    </h2>
                </div>
                {stats.recentSubmissions && stats.recentSubmissions.length > 0 ? (
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
                                    Time
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.recentSubmissions.map((sub) => (
                                <tr
                                    key={sub._id}
                                    className="border-b border-lc-border/50 hover:bg-lc-bg-hover/50 transition-smooth"
                                >
                                    <td className="py-3 px-4 text-sm text-lc-text">
                                        {sub.problemId?.title || 'Unknown'}
                                    </td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`text-sm font-medium ${statusColor[sub.status] || 'text-lc-text-secondary'
                                                }`}
                                        >
                                            {sub.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className="text-xs bg-lc-bg-input text-lc-text-secondary px-2 py-1 rounded">
                                            {sub.language}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-xs text-lc-text-secondary">
                                        {new Date(sub.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="p-8 text-center text-lc-text-secondary text-sm">
                        No submissions yet. Start solving problems!
                    </div>
                )}
            </div>
        </div>
    );
}
