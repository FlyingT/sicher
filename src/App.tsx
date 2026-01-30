import React, { useState, useEffect, useCallback } from 'react';
import { Lock, Copy, RefreshCw, Check } from 'lucide-react';
import { wordlist } from './words';

const App: React.FC = () => {
    const [mode, setMode] = useState<'password' | 'passphrase'>('password');
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [wordCount, setWordCount] = useState(4);
    const [separator, setSeparator] = useState(' ');
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [excludeConfusing, setExcludeConfusing] = useState(true);
    const [copied, setCopied] = useState(false);

    const generatePassword = useCallback(() => {
        if (mode === 'passphrase') {
            const array = new Uint32Array(wordCount);
            window.crypto.getRandomValues(array);
            const words = Array.from(array).map(num => wordlist[num % wordlist.length]);
            setPassword(words.join(separator));
            return;
        }

        let charset = 'abcdefghijklmnopqrstuvwxyz';
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numberChars = '0123456789';
        const symbolChars = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';

        if (includeUppercase) charset += uppercaseChars;
        if (includeNumbers) charset += numberChars;
        if (includeSymbols) charset += symbolChars;

        if (excludeConfusing) {
            const confusing = /[0O1lI5S2Z|`']/g;
            charset = charset.replace(confusing, '');
            charset = charset.replace(/[s]/g, '');
        }

        let generated = '';
        const array = new Uint32Array(length);
        window.crypto.getRandomValues(array);

        for (let i = 0; i < length; i++) {
            let nextChar = charset[array[i] % charset.length];

            if (excludeConfusing) {
                if (nextChar === 'w') {
                    nextChar = charset[(array[i] + 1) % charset.length];
                }
                if (nextChar === 'm') {
                    nextChar = charset[(array[i] + 2) % charset.length];
                }
                if (i > 0) {
                    const prev = generated[i - 1];
                    if ((prev === 'v' && nextChar === 'v') || (prev === 'r' && nextChar === 'n')) {
                        nextChar = charset[(array[i] + 3) % charset.length];
                    }
                }
            }
            generated += nextChar;
        }

        setPassword(generated);
    }, [mode, length, wordCount, separator, includeUppercase, includeNumbers, includeSymbols, excludeConfusing]);

    useEffect(() => {
        generatePassword();
    }, [generatePassword]);

    const handleCopy = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="app-container">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="app-icon">
                        <Lock size={20} color="white" strokeWidth={3} />
                    </div>
                    <div>
                        <h1>Sicher?</h1>
                        <p className="tagline">Einfacher, lokaler Kennwort und Passphrasen Generator</p>
                    </div>
                </div>

                <div className="mode-toggle">
                    <button
                        className={mode === 'password' ? 'active' : ''}
                        onClick={() => setMode('password')}
                    >
                        Kennwort
                    </button>
                    <button
                        className={mode === 'passphrase' ? 'active' : ''}
                        onClick={() => setMode('passphrase')}
                    >
                        Passphrase
                    </button>
                </div>

                {mode === 'password' ? (
                    <>
                        <div className="control-group">
                            <div className="switch-item">
                                <span className="switch-label">Großbuchstaben</span>
                                <label className="switch">
                                    <input type="checkbox" checked={includeUppercase} onChange={e => setIncludeUppercase(e.target.checked)} />
                                    <span className="slider-toggle"></span>
                                </label>
                            </div>

                            <div className="switch-item">
                                <span className="switch-label">Zahlen</span>
                                <label className="switch">
                                    <input type="checkbox" checked={includeNumbers} onChange={e => setIncludeNumbers(e.target.checked)} />
                                    <span className="slider-toggle"></span>
                                </label>
                            </div>

                            <div className="switch-item">
                                <span className="switch-label">Sonderzeichen</span>
                                <label className="switch">
                                    <input type="checkbox" checked={includeSymbols} onChange={e => setIncludeSymbols(e.target.checked)} />
                                    <span className="slider-toggle"></span>
                                </label>
                            </div>

                            <div className="switch-item">
                                <span className="switch-label">Keine verwechselbaren Zeichen</span>
                                <label className="switch">
                                    <input type="checkbox" checked={excludeConfusing} onChange={e => setExcludeConfusing(e.target.checked)} />
                                    <span className="slider-toggle"></span>
                                </label>
                            </div>
                        </div>

                        <div className="slider-container">
                            <div className="slider-info">
                                <span>Länge</span>
                                <span>{length}</span>
                            </div>
                            <input
                                type="range"
                                min="8"
                                max="32"
                                value={length}
                                onChange={e => setLength(parseInt(e.target.value))}
                            />
                        </div>
                    </>
                ) : (
                    <div className="control-group">
                        <div className="slider-container">
                            <div className="slider-info">
                                <span>Anzahl der Wörter</span>
                                <span>{wordCount}</span>
                            </div>
                            <input
                                type="range"
                                min="3"
                                max="8"
                                value={wordCount}
                                onChange={e => setWordCount(parseInt(e.target.value))}
                            />
                        </div>

                        <div className="input-group">
                            <span className="input-label">Trennzeichen</span>
                            <input
                                type="text"
                                className="text-input"
                                value={separator}
                                onChange={e => setSeparator(e.target.value)}
                                placeholder="Leerzeichen"
                                maxLength={5}
                            />
                        </div>
                    </div>
                )}
            </aside>

            <main className="main-content">
                <div className="result-container">
                    <div className="password-display">
                        {password}
                    </div>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                        <button className="generate-btn" onClick={generatePassword}>
                            <RefreshCw size={20} style={{ marginRight: '8px' }} />
                            Generieren
                        </button>
                        <button
                            className="generate-btn"
                            style={{ background: copied ? '#34c759' : '#8e8e93', maxWidth: '60px', padding: '0' }}
                            onClick={handleCopy}
                        >
                            {copied ? <Check size={24} /> : <Copy size={24} />}
                        </button>
                    </div>
                </div>
            </main>
            <footer className="version-indicator">
                <a href="https://github.com/FlyingT/sicher/blob/main/CHANGELOG.md" target="_blank" rel="noopener noreferrer">
                    v1.2.0 von TK
                </a>
            </footer>
        </div>
    );
};

export default App;
