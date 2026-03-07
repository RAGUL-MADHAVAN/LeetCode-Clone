export default function TestResults({ results, type }) {
    if (!results) return null;

    // For 'run' results (single execution)
    if (type === 'run') {
        return (
            <div className="animate-fadeIn">
                <div className="p-4 space-y-3">
                    {/* Status */}
                    <div className="flex items-center gap-2">
                        <span
                            className={`text-sm font-semibold ${results.status?.id === 3
                                    ? 'text-lc-accepted'
                                    : 'text-lc-wrong'
                                }`}
                        >
                            {results.status?.description || 'Unknown'}
                        </span>
                        {results.time && (
                            <span className="text-xs text-lc-text-secondary">
                                Runtime: {results.time}s
                            </span>
                        )}
                        {results.memory && (
                            <span className="text-xs text-lc-text-secondary">
                                Memory: {results.memory} KB
                            </span>
                        )}
                    </div>

                    {/* stdout */}
                    {results.stdout && (
                        <div>
                            <p className="text-xs text-lc-text-secondary mb-1">Output:</p>
                            <pre className="bg-lc-bg rounded-lg p-3 text-sm text-lc-text font-mono whitespace-pre-wrap overflow-auto max-h-40">
                                {results.stdout}
                            </pre>
                        </div>
                    )}

                    {/* stderr */}
                    {results.stderr && (
                        <div>
                            <p className="text-xs text-lc-wrong mb-1">Stderr:</p>
                            <pre className="bg-lc-bg rounded-lg p-3 text-sm text-lc-wrong/80 font-mono whitespace-pre-wrap overflow-auto max-h-40">
                                {results.stderr}
                            </pre>
                        </div>
                    )}

                    {/* compile_output */}
                    {results.compile_output && (
                        <div>
                            <p className="text-xs text-lc-wrong mb-1">Compilation Error:</p>
                            <pre className="bg-lc-bg rounded-lg p-3 text-sm text-lc-wrong/80 font-mono whitespace-pre-wrap overflow-auto max-h-40">
                                {results.compile_output}
                            </pre>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // For 'submit' results (multiple test cases)
    if (type === 'submit' && Array.isArray(results.results)) {
        const { submission, results: testResults } = results;
        const allPassed = testResults.every((r) => r.passed);

        return (
            <div className="animate-fadeIn">
                <div className="p-4 space-y-3">
                    {/* Overall status */}
                    <div className="flex items-center gap-3">
                        <span
                            className={`text-lg font-bold ${allPassed ? 'text-lc-accepted' : 'text-lc-wrong'
                                }`}
                        >
                            {submission?.status || (allPassed ? 'Accepted' : 'Wrong Answer')}
                        </span>
                        {submission?.runtime && (
                            <span className="text-xs text-lc-text-secondary bg-lc-bg-card px-2 py-1 rounded">
                                {submission.runtime}
                            </span>
                        )}
                        {submission?.memory && (
                            <span className="text-xs text-lc-text-secondary bg-lc-bg-card px-2 py-1 rounded">
                                {submission.memory}
                            </span>
                        )}
                    </div>

                    {/* Test case results */}
                    <div className="space-y-2">
                        {testResults.map((tc, idx) => (
                            <div
                                key={idx}
                                className={`rounded-lg p-3 border ${tc.passed
                                        ? 'border-lc-accepted/30 bg-lc-accepted/5'
                                        : 'border-lc-wrong/30 bg-lc-wrong/5'
                                    }`}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span
                                        className={`text-sm font-medium ${tc.passed ? 'text-lc-accepted' : 'text-lc-wrong'
                                            }`}
                                    >
                                        {tc.passed ? '✓' : '✗'} Test Case {idx + 1}
                                    </span>
                                </div>
                                {!tc.passed && (
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div>
                                            <p className="text-lc-text-secondary mb-1">Expected:</p>
                                            <pre className="bg-lc-bg rounded p-2 text-lc-text font-mono">
                                                {tc.expected}
                                            </pre>
                                        </div>
                                        <div>
                                            <p className="text-lc-text-secondary mb-1">Got:</p>
                                            <pre className="bg-lc-bg rounded p-2 text-lc-wrong font-mono">
                                                {tc.actual || '(empty)'}
                                            </pre>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <p className="text-xs text-lc-text-secondary">
                        {testResults.filter((r) => r.passed).length}/{testResults.length}{' '}
                        test cases passed
                    </p>
                </div>
            </div>
        );
    }

    return null;
}
