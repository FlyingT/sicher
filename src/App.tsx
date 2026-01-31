import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Lock, Copy, RefreshCw, Check, QrCode as QrIcon, Sun, Moon } from 'lucide-react';
import { wordlist } from './words';
import { qrcodegen } from './qrcodegen';

const App: React.FC = () => {
    const [mode, setMode] = useState<'password' | 'passphrase'>('password');
    const [length, setLength] = useState(16);
    const [wordCount, setWordCount] = useState(5);
    const [separator, setSeparator] = useState('-');
    const [password, setPassword] = useState('');
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [excludeConfusing, setExcludeConfusing] = useState(true);
    const [copied, setCopied] = useState(false);
    const [showQr, setShowQr] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('theme');
        if (saved) return saved === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });
    const [strength, setStrength] = useState<{ score: number; label: string }>({ score: 0, label: 'Sehr schwach' });
    const qrCanvasRef = useRef<HTMLCanvasElement>(null);

    const calculateStrength = useCallback(() => {
        if (!password) {
            setStrength({ score: 0, label: 'Sehr schwach' });
            return;
        }

        let entropy = 0;
        if (mode === 'passphrase') {
            // Each word from a 7700 word list adds ~12.9 bits of entropy
            entropy = wordCount * Math.log2(wordlist.length);
        } else {
            let poolSize = 26; // lowercase
            if (includeUppercase) poolSize += 26;
            if (includeNumbers) poolSize += 10;
            if (includeSymbols) poolSize += 30;
            if (excludeConfusing) poolSize -= 10;
            entropy = length * Math.log2(poolSize);
        }

        if (entropy < 40) setStrength({ score: 1, label: 'Schwach' });
        else if (entropy < 60) setStrength({ score: 2, label: 'Mittel' });
        else if (entropy < 80) setStrength({ score: 3, label: 'Sicher' });
        else setStrength({ score: 4, label: 'Sehr sicher' });
    }, [password, mode, length, wordCount, includeUppercase, includeNumbers, includeSymbols, excludeConfusing]);

    useEffect(() => {
        calculateStrength();
    }, [calculateStrength]);

    useEffect(() => {
        if (showQr && qrCanvasRef.current && password) {
            const qr = qrcodegen.QrCode.encodeText(password, qrcodegen.QrCode.Ecc.MEDIUM);
            const canvas = qrCanvasRef.current;
            const scale = 8;
            const size = qr.size * scale;
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = "#FFFFFF";
                ctx.fillRect(0, 0, size, size);
                ctx.fillStyle = "#000000";
                for (let y = 0; y < qr.size; y++) {
                    for (let x = 0; x < qr.size; x++) {
                        if (qr.getModule(x, y)) {
                            ctx.fillRect(x * scale, y * scale, scale, scale);
                        }
                    }
                }
            }
        }
    }, [showQr, password]);

    const generatePassword = useCallback(() => {
        if (mode === 'passphrase') {
            const array = new Uint32Array(wordCount);
            window.crypto.getRandomValues(array);
            const words = Array.from(array).map(num => wordlist[num % wordlist.length]);
            // Sanitize separator to avoid accidental trailing spaces
            const actualSeparator = separator.length > 1 ? separator.trim() : separator;
            setPassword(words.join(actualSeparator).trim());
            return;
        }

        let charset = 'abcdefghijklmnopqrstuvwxyz';
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numberChars = '0123456789';
        const symbolChars = '!@#$%^&*()_+~`|}{[]\\:;?><,./-=';

        if (includeUppercase) charset += uppercaseChars;
        if (includeNumbers) charset += numberChars;
        if (includeSymbols) charset += symbolChars;

        if (excludeConfusing) {
            const confusing = /[0O1lI5S2Z|`']/g;
            charset = charset.replace(confusing, '');
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

    useEffect(() => {
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
        if (darkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [darkMode]);

    const handleCopy = async () => {
        if (!password) return;

        try {
            // Try modern API
            await navigator.clipboard.writeText(password);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            // Fallback for non-secure contexts or older browsers
            try {
                const textArea = document.createElement("textarea");
                textArea.value = password;
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                textArea.style.top = "0";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);

                if (successful) {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                }
            } catch (fallbackErr) {
                console.error('Fallback copy failed', fallbackErr);
            }
        }
    };

    return (
        <div className={`app-container ${darkMode ? 'dark' : ''}`}>
            <button
                className="theme-toggle"
                onClick={() => setDarkMode(!darkMode)}
                title={darkMode ? 'Light Mode' : 'Dark Mode'}
            >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
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
                        <div className="input-group">
                            <span className="input-label">Anzahl der Wörter</span>
                            <div className="slider-container">
                                <div className="slider-info" style={{ display: 'none' }}>
                                    <span>Anzahl</span>
                                    <span>{wordCount}</span>
                                </div>
                                <input
                                    type="range"
                                    min="3"
                                    max="8"
                                    value={wordCount}
                                    onChange={e => setWordCount(parseInt(e.target.value))}
                                />
                                <span className="slider-value-display">{wordCount}</span>
                            </div>
                        </div>

                        <div className="input-group">
                            <span className="input-label">Trennzeichen</span>
                            <input
                                type="text"
                                className="text-input"
                                value={separator}
                                onChange={e => {
                                    const val = e.target.value;
                                    // If user types a character and there was only a space, replace it
                                    if (separator === ' ' && val.length > 1 && val.startsWith(' ')) {
                                        setSeparator(val.substring(1));
                                    } else {
                                        setSeparator(val);
                                    }
                                }}
                                placeholder=""
                                maxLength={5}
                            />
                        </div>
                    </div>
                )}
            </aside>

            <main className="main-content">
                <div className="result-area">
                    <div className="password-display">
                        <div className="password-text">{password || 'Warte auf Generierung...'}</div>
                    </div>

                    <div className="strength-container">
                        <div className="strength-label">
                            <span>Stärke</span>
                            <span>{strength.label}</span>
                        </div>
                        <div className="strength-meter">
                            {[1, 2, 3, 4].map(s => (
                                <div
                                    key={s}
                                    className={`strength-segment ${strength.score >= s ? 'active' : ''} ${strength.score <= 1 ? 'low' :
                                        strength.score <= 2 ? 'medium' : 'high'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button className="primary-btn" onClick={generatePassword}>
                            <RefreshCw size={20} />
                            Generieren
                        </button>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                                className={`secondary-btn ${copied ? 'success' : ''}`}
                                onClick={handleCopy}
                                title="Kopieren"
                            >
                                {copied ? <Check size={20} /> : <Copy size={20} />}
                            </button>
                            <button
                                className="secondary-btn"
                                onClick={() => setShowQr(true)}
                                title="QR-Code anzeigen"
                            >
                                <QrIcon size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {showQr && (
                <div className="qr-overlay" onClick={() => setShowQr(false)}>
                    <div className="qr-modal" onClick={e => e.stopPropagation()}>
                        <h2 style={{ margin: 0, fontSize: '1.2rem' }}>QR-Code</h2>
                        <div className="qr-canvas-container">
                            <canvas ref={qrCanvasRef}></canvas>
                        </div>
                        <div className="qr-actions">
                            <button className="qr-close-btn" onClick={() => setShowQr(false)}>
                                Schließen
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="version-indicator">
                <a href="https://github.com/FlyingT/sicher/blob/main/CHANGELOG.md" target="_blank" rel="noopener noreferrer">
                    v1.6.2 von TK
                </a>
            </div>
        </div>
    );
};

export default App;
