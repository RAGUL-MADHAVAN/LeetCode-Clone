export default function TestResults({ results, type }) {
    if (!results) return null;

    const getSummaryColor = (passed, total) => {
        if (!total || total === 0) return 'text-lc-text-secondary';
        if (passed === 0) return 'text-lc-wrong';
        if (passed < total) return 'text-lc-medium';
        return 'text-lc-accepted';
    };

    // For 'run' results (multiple sample cases OR single custom input)
    if (type === 'run') {
        // Backwards compatibility: older shape (stdout/stderr)
        if (!Array.isArray(results.results)) {
            return (
                <div className="animate-fadeIn">
                    <div className="p-4 space-y-3">
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

                        {results.stdout && (
                            <div>
                                <p className="text-xs text-lc-text-secondary mb-1">Output:</p>
                                <pre className="bg-lc-bg rounded-lg p-3 text-sm text-lc-text font-mono whitespace-pre-wrap overflow-auto max-h-40">
                                    {results.stdout}
                                </pre>
                            </div>
                        )}

                        {results.stderr && (
                            <div>
                                <p className="text-xs text-lc-wrong mb-1">Stderr:</p>
                                <pre className="bg-lc-bg rounded-lg p-3 text-sm text-lc-wrong/80 font-mono whitespace-pre-wrap overflow-auto max-h-40">
                                    {results.stderr}
                                </pre>
                            </div>
                        )}

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

        const testResults = results.results;
        const passedComparable = testResults.filter((r) => r.passed !== null);
        const passedCount = passedComparable.filter((r) => r.passed).length;
        const totalCount = passedComparable.length;
        const summaryColor = getSummaryColor(passedCount, totalCount);

        return (
            <div className="animate-fadeIn">
                <div className="p-4 space-y-3">
                    <div className="flex items-center gap-3">
                        <span
                            className={`text-lg font-bold ${results.status?.description === 'Compilation Error'
                                    ? 'text-lc-wrong'
                                    : summaryColor
                                }`}
                        >
                            {results.status?.description || 'Result'}
                        </span>

                        <span className={`text-xs ${summaryColor} bg-lc-bg-card px-2 py-1 rounded`}>
                            {passedCount}/{totalCount}
                        </span>
                    </div>

                    {results.compile_output && (
                        <div>
                            <p className="text-xs text-lc-wrong mb-1">Compilation Error:</p>
                            <pre className="bg-lc-bg rounded-lg p-3 text-sm text-lc-wrong/80 font-mono whitespace-pre-wrap overflow-auto max-h-40">
                                {results.compile_output}
                            </pre>
                        </div>
                    )}

                    <div className="space-y-2">
                        {testResults.map((tc, idx) => {
                            const isComparable = tc.passed !== null;
                            const passed = tc.passed === true;

                            return (
                                <div
                                    key={idx}
                                    className={`rounded-lg p-3 border ${!isComparable
                                            ? 'border-lc-border bg-lc-bg/40'
                                            : passed
                                                ? 'border-lc-accepted/30 bg-lc-accepted/5'
                                                : 'border-lc-wrong/30 bg-lc-wrong/5'
                                        }`}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <span
                                            className={`text-sm font-medium ${!isComparable
                                                    ? 'text-lc-text-secondary'
                                                    : passed
                                                        ? 'text-lc-accepted'
                                                        : 'text-lc-wrong'
                                                }`}
                                        >
                                            {!isComparable ? '•' : passed ? '✓' : '✗'} Test Case {idx + 1}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                                        <div>
                                            <p className="text-lc-text-secondary mb-1">Input:</p>
                                            <pre className="bg-lc-bg rounded p-2 text-lc-text font-mono whitespace-pre-wrap">
                                                {tc.input || ''}
                                            </pre>
                                        </div>
                                        {isComparable && (
                                            <div>
                                                <p className="text-lc-text-secondary mb-1">Expected:</p>
                                                <pre className="bg-lc-bg rounded p-2 text-lc-text font-mono whitespace-pre-wrap">
                                                    {tc.expected}
                                                </pre>
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-lc-text-secondary mb-1">Got:</p>
                                            <pre
                                                className={`bg-lc-bg rounded p-2 font-mono whitespace-pre-wrap ${isComparable && !passed ? 'text-lc-wrong' : 'text-lc-text'
                                                    }`}
                                            >
                                                {tc.actual || '(empty)'}
                                            </pre>
                                        </div>
                                    </div>

                                    {tc.stderr && (
                                        <div className="mt-2">
                                            <p className="text-xs text-lc-wrong mb-1">Stderr:</p>
                                            <pre className="bg-lc-bg rounded p-2 text-xs text-lc-wrong/80 font-mono whitespace-pre-wrap overflow-auto max-h-28">
                                                {tc.stderr}
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    // For 'submit' results (multiple test cases)
    if (type === 'submit' && Array.isArray(results.results)) {
        const { submission, results: testResults, summary } = results;
        const totalSampleCount = testResults.length;
        const passedSampleCount = testResults.filter((r) => r.passed).length;

        const totalAllCount = typeof summary?.total === 'number' ? summary.total : totalSampleCount;
        const passedAllCount = typeof summary?.passed === 'number' ? summary.passed : passedSampleCount;

        const summaryColor = getSummaryColor(passedAllCount, totalAllCount);

        return (
            <div className="animate-fadeIn">
                <div className="p-4 space-y-3">
                    {/* Overall status */}
                    <div className="flex items-center gap-3">
                        <span
                            className={`text-lg font-bold ${submission?.status === 'Accepted' ? 'text-lc-accepted' : 'text-lc-wrong'}`}
                        >
                            {submission?.status || 'Result'}
                        </span>
                        <span className={`text-xs ${summaryColor} bg-lc-bg-card px-2 py-1 rounded`}>
                            {passedAllCount}/{totalAllCount}
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

                    <p className="text-xs text-lc-text-secondary">
                        Sample: {passedSampleCount}/{totalSampleCount}
                    </p>

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
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                                    <div>
                                        <p className="text-lc-text-secondary mb-1">Input:</p>
                                        <pre className="bg-lc-bg rounded p-2 text-lc-text font-mono whitespace-pre-wrap">
                                            {tc.input || ''}
                                        </pre>
                                    </div>
                                    <div>
                                        <p className="text-lc-text-secondary mb-1">Expected:</p>
                                        <pre className="bg-lc-bg rounded p-2 text-lc-text font-mono whitespace-pre-wrap">
                                            {tc.expected}
                                        </pre>
                                    </div>
                                    <div>
                                        <p className="text-lc-text-secondary mb-1">Got:</p>
                                        <pre
                                            className={`bg-lc-bg rounded p-2 font-mono whitespace-pre-wrap ${tc.passed ? 'text-lc-text' : 'text-lc-wrong'
                                                }`}
                                        >
                                            {tc.actual || '(empty)'}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <p className={`text-xs ${summaryColor}`}>
                        {passedAllCount}/{totalAllCount} total test cases passed
                    </p>
                </div>
            </div>
        );
    }

    return null;
}
