import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import CodeEditor from '../components/CodeEditor';
import TestResults from '../components/TestResults';

const DIFFICULTY_BADGE = {
    easy: 'badge-easy',
    medium: 'badge-medium',
    hard: 'badge-hard',
};

export default function ProblemPage() {
    const { id } = useParams();
    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [runResult, setRunResult] = useState(null);
    const [submitResult, setSubmitResult] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [resultType, setResultType] = useState(null);

    useEffect(() => {
        fetchProblem();
    }, [id]);

    const fetchProblem = async () => {
        try {
            const res = await api.get(`/problems/${id}`);
            setProblem(res.data);
        } catch (err) {
            console.error('Failed to fetch problem:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleRun = async (code, language, input) => {
        setIsRunning(true);
        setRunResult(null);
        setSubmitResult(null);
        setResultType('run');
        try {
            const res = await api.post('/code/run', {
                problemId: id,
                source_code: code,
                language,
                input: input || (problem.sampleTestCases?.[0]?.input || ''),
            });
            setRunResult(res.data);
        } catch (err) {
            setRunResult({
                status: { description: 'Error' },
                stderr: err.response?.data?.message || err.message,
            });
        } finally {
            setIsRunning(false);
        }
    };

    const handleSubmit = async (code, language) => {
        setIsSubmitting(true);
        setRunResult(null);
        setSubmitResult(null);
        setResultType('submit');
        try {
            const res = await api.post('/submissions', {
                problemId: id,
                code,
                language,
            });
            setSubmitResult(res.data);
        } catch (err) {
            setSubmitResult({
                submission: { status: 'Error' },
                results: [],
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-56px)]">
                <div className="w-8 h-8 border-2 border-lc-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!problem) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-56px)] gap-4">
                <p className="text-lc-text-secondary">Problem not found</p>
                <Link to="/problems" className="btn-primary text-sm">
                    Back to Problems
                </Link>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-56px)] flex animate-fadeIn">
            {/* Left panel — Problem description */}
            <div className="w-1/2 border-r border-lc-border overflow-y-auto">
                <div className="p-6">
                    {/* Breadcrumb */}
                    <div className="mb-4">
                        <Link
                            to="/problems"
                            className="text-xs text-lc-text-secondary hover:text-lc-accent transition-smooth"
                        >
                            ← Back to Problems
                        </Link>
                    </div>

                    {/* Title */}
                    <div className="flex items-center gap-3 mb-4">
                        <h1 className="text-xl font-bold text-lc-text">{problem.title}</h1>
                        <span className={DIFFICULTY_BADGE[problem.difficulty]}>
                            {problem.difficulty}
                        </span>
                    </div>

                    {/* Tags */}
                    {problem.tags && problem.tags.length > 0 && (
                        <div className="flex gap-2 mb-6">
                            {problem.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs bg-lc-bg-input text-lc-text-secondary px-2 py-1 rounded-md"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Description */}
                    <div className="prose prose-invert max-w-none mb-6">
                        <div className="text-sm text-lc-text leading-relaxed whitespace-pre-wrap">
                            {problem.description}
                        </div>
                    </div>

                    {/* Sample Test Cases */}
                    {problem.sampleTestCases && problem.sampleTestCases.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-lc-text mb-2">
                                Sample Test Cases
                            </h3>
                            {problem.sampleTestCases.map((tc, idx) => (
                                <div key={idx} className="mb-4">
                                    <div className="bg-lc-bg-card rounded-lg border border-lc-border overflow-hidden">
                                        <div className="bg-lc-bg px-4 py-2 border-b border-lc-border text-xs font-semibold text-lc-text-secondary">
                                            Test Case {idx + 1}
                                        </div>
                                        <div className="p-4 grid grid-cols-1 gap-4">
                                            <div>
                                                <h4 className="text-xs font-semibold text-lc-text mb-1">Input:</h4>
                                                <pre className="text-xs text-lc-text font-mono whitespace-pre-wrap">
                                                    {tc.input}
                                                </pre>
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-semibold text-lc-text mb-1">Output:</h4>
                                                <pre className="text-xs text-lc-text font-mono whitespace-pre-wrap">
                                                    {tc.output}
                                                </pre>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Right panel — Code editor + results */}
            <div className="w-1/2 flex flex-col">
                {/* Editor section */}
                <div className="flex-1 min-h-0">
                    <CodeEditor
                        starterCode={problem.functionSignatures || {}}
                        onRun={handleRun}
                        onSubmit={handleSubmit}
                        isRunning={isRunning}
                        isSubmitting={isSubmitting}
                    />
                </div>

                {/* Results section */}
                {(runResult || submitResult) && (
                    <div className="border-t border-lc-border bg-lc-bg-card max-h-64 overflow-y-auto">
                        {resultType === 'run' && runResult && (
                            <TestResults results={runResult} type="run" />
                        )}
                        {resultType === 'submit' && submitResult && (
                            <TestResults results={submitResult} type="submit" />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
