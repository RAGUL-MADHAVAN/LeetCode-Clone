import { useState } from 'react';
import Editor from '@monaco-editor/react';

const LANGUAGE_OPTIONS = [
    { value: 'cpp', label: 'C++', monacoId: 'cpp' },
    { value: 'python', label: 'Python', monacoId: 'python' },
    { value: 'java', label: 'Java', monacoId: 'java' },
    { value: 'javascript', label: 'JavaScript', monacoId: 'javascript' },
];

export default function CodeEditor({
    starterCode = {},
    onRun,
    onSubmit,
    isRunning,
    isSubmitting,
}) {
    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState(starterCode['javascript'] || '');
    const [input, setInput] = useState('');
    const [expectedOutput, setExpectedOutput] = useState('');
    const [activeTab, setActiveTab] = useState('input');

    const handleLanguageChange = (e) => {
        const newLang = e.target.value;
        setLanguage(newLang);
        setCode(starterCode[newLang] || '');
    };

    const selectedLangOption = LANGUAGE_OPTIONS.find((l) => l.value === language);

    return (
        <div className="flex flex-col h-full">
            {/* Editor toolbar */}
            <div className="flex items-center justify-between px-4 py-2 bg-lc-bg-card border-b border-lc-border">
                <div className="flex items-center gap-3">
                    <select
                        id="language-selector"
                        value={language}
                        onChange={handleLanguageChange}
                        className="bg-lc-bg-input border border-lc-border text-lc-text text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-lc-accent transition-smooth cursor-pointer"
                    >
                        {LANGUAGE_OPTIONS.map((lang) => (
                            <option key={lang.value} value={lang.value}>
                                {lang.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        id="run-code-btn"
                        onClick={() => onRun && onRun(code, language, input, expectedOutput)}
                        disabled={isRunning || isSubmitting}
                        className="btn-secondary text-sm py-1.5 px-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                    >
                        {isRunning ? (
                            <>
                                <span className="w-3 h-3 border-2 border-lc-text-secondary border-t-transparent rounded-full animate-spin"></span>
                                Running...
                            </>
                        ) : (
                            <>
                                <span className="text-lc-accepted">▶</span> Run
                            </>
                        )}
                    </button>
                    <button
                        id="submit-code-btn"
                        onClick={() => onSubmit && onSubmit(code, language)}
                        disabled={isRunning || isSubmitting}
                        className="btn-success text-sm py-1.5 px-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                    >
                        {isSubmitting ? (
                            <>
                                <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                Submitting...
                            </>
                        ) : (
                            <>
                                <span>⬆</span> Submit
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Monaco Editor */}
            <div className="flex-1 min-h-0">
                <Editor
                    height="100%"
                    language={selectedLangOption?.monacoId || 'javascript'}
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    theme="vs-dark"
                    options={{
                        fontSize: 14,
                        fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        padding: { top: 12 },
                        lineNumbers: 'on',
                        roundedSelection: false,
                        automaticLayout: true,
                        tabSize: 4,
                        wordWrap: 'on',
                    }}
                />
            </div>

            {/* Input / Output tabs */}
            <div className="border-t border-lc-border bg-lc-bg-card">
                <div className="flex border-b border-lc-border">
                    <button
                        onClick={() => setActiveTab('input')}
                        className={`px-4 py-2 text-sm font-medium transition-smooth ${activeTab === 'input'
                                ? 'text-lc-text border-b-2 border-lc-accent'
                                : 'text-lc-text-secondary hover:text-lc-text'
                            }`}
                    >
                        Custom Input
                    </button>
                    <button
                        onClick={() => setActiveTab('expected')}
                        className={`px-4 py-2 text-sm font-medium transition-smooth ${activeTab === 'expected'
                                ? 'text-lc-text border-b-2 border-lc-accent'
                                : 'text-lc-text-secondary hover:text-lc-text'
                            }`}
                    >
                        Expected Output
                    </button>
                </div>
                {activeTab === 'input' && (
                    <div className="p-3">
                        <textarea
                            id="custom-input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Enter custom input here..."
                            className="w-full bg-lc-bg border border-lc-border rounded-lg p-3 text-sm text-lc-text font-mono resize-none focus:outline-none focus:border-lc-accent transition-smooth"
                            rows={3}
                        />
                    </div>
                )}
                {activeTab === 'expected' && (
                    <div className="p-3">
                        <textarea
                            id="expected-output"
                            value={expectedOutput}
                            onChange={(e) => setExpectedOutput(e.target.value)}
                            placeholder="Optional: expected output for custom input (leave empty to just see output)"
                            className="w-full bg-lc-bg border border-lc-border rounded-lg p-3 text-sm text-lc-text font-mono resize-none focus:outline-none focus:border-lc-accent transition-smooth"
                            rows={3}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
