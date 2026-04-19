import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const DIFFICULTY_COLORS = {
    easy: 'badge-easy',
    medium: 'badge-medium',
    hard: 'badge-hard',
};

export default function ProblemsPage() {
    const { user } = useAuth();
    const [problems, setProblems] = useState([]);
    const [search, setSearch] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [solvedSet, setSolvedSet] = useState(new Set());

    useEffect(() => {
        fetchProblems();
        fetchProfile();
    }, []);

    const fetchProblems = async () => {
        try {
            const res = await api.get('/problems');
            setProblems(res.data);
        } catch (err) {
            console.error('Failed to fetch problems:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchProfile = async () => {
        try {
            const res = await api.get('/auth/profile');
            const solved = new Set(
                res.data.solvedProblems?.map((p) => (typeof p === 'object' ? p._id : p)) || []
            );
            setSolvedSet(solved);
        } catch (err) {
            console.error('Failed to fetch profile:', err);
        }
    };

    const filtered = problems.filter((p) => {
        const matchesSearch = p.title
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchesDifficulty =
            difficultyFilter === 'all' || p.difficulty === difficultyFilter;
        return matchesSearch && matchesDifficulty;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-56px)]">
                <div className="w-8 h-8 border-2 border-lc-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 animate-fadeIn">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-lc-text mb-1">Problems</h1>
                <p className="text-sm text-lc-text-secondary">
                    {problems.length} problems available •{' '}
                    {solvedSet.size} solved
                </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="flex-1">
                    <input
                        id="search-problems"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input-field"
                        placeholder="🔍  Search problems..."
                    />
                </div>
                <div className="flex gap-2">
                    {['all', 'easy', 'medium', 'hard'].map((diff) => (
                        <button
                            key={diff}
                            onClick={() => setDifficultyFilter(diff)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth capitalize ${difficultyFilter === diff
                                    ? diff === 'all'
                                        ? 'bg-lc-accent text-black'
                                        : diff === 'easy'
                                            ? 'bg-lc-easy/20 text-lc-easy border border-lc-easy/40'
                                            : diff === 'medium'
                                                ? 'bg-lc-medium/20 text-lc-medium border border-lc-medium/40'
                                                : 'bg-lc-hard/20 text-lc-hard border border-lc-hard/40'
                                    : 'bg-lc-bg-card text-lc-text-secondary border border-lc-border hover:border-lc-text-secondary'
                                }`}
                        >
                            {diff}
                        </button>
                    ))}
                </div>
            </div>

            {/* Problems table */}
            <div className="glass-card overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-lc-border">
                            <th className="text-left py-3 px-4 text-xs font-semibold text-lc-text-secondary uppercase tracking-wider w-12">
                                #
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-semibold text-lc-text-secondary uppercase tracking-wider">
                                Problem
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-semibold text-lc-text-secondary uppercase tracking-wider w-28">
                                Difficulty
                            </th>
                            <th className="text-center py-3 px-4 text-xs font-semibold text-lc-text-secondary uppercase tracking-wider w-20">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="text-center py-12 text-lc-text-secondary"
                                >
                                    No problems found
                                </td>
                            </tr>
                        ) : (
                            filtered.map((problem, idx) => {
                                const isSolved = solvedSet.has(problem._id);
                                return (
                                    <tr
                                        key={problem._id}
                                        className="border-b border-lc-border/50 hover:bg-lc-bg-hover/50 transition-smooth"
                                    >
                                        <td className="py-3 px-4 text-sm text-lc-text-secondary">
                                            {idx + 1}
                                        </td>
                                        <td className="py-3 px-4">
                                            <Link
                                                to={`/problem/${problem._id}`}
                                                className="text-sm font-medium text-lc-text hover:text-lc-accent transition-smooth"
                                            >
                                                {problem.title}
                                            </Link>
                                            {problem.tags && problem.tags.length > 0 && (
                                                <div className="flex gap-1 mt-1">
                                                    {problem.tags.slice(0, 3).map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="text-[10px] bg-lc-bg-input text-lc-text-secondary px-1.5 py-0.5 rounded"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={DIFFICULTY_COLORS[problem.difficulty]}>
                                                {problem.difficulty}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            {isSolved ? (
                                                <span className="text-lc-accepted text-lg" title="Solved">
                                                    ✓
                                                </span>
                                            ) : (
                                                <span className="text-lc-text-secondary text-lg" title="Not attempted">
                                                    —
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
