import React, { useState, useEffect, useCallback } from 'react';
import { Shield, Copy, RefreshCw, Check } from 'lucide-react';

const App: React.FC = () => {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [excludeConfusing, setExcludeConfusing] = useState(true);
    const [copied, setCopied] = useState(false);

    const generatePassword = useCallback(() => {
        let charset = 'abcdefghijklmnopqrstuvwxyz';
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numberChars = '0123456789';
        const symbolChars = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';

        if (includeUppercase) charset += uppercaseChars;
        if (includeNumbers) charset += numberChars;
        if (includeSymbols) charset += symbolChars;

        if (excludeConfusing) {
            // Remove: 0, O, 1, l, I, 5, S, 2, Z
            // Remove: |, `, '
            // We also handle 'vv' and 'rn' during generation
            const confusing = /[0O1lI5S2Z|`']/g;
            charset = charset.replace(confusing, '');

            // Special cases for S/s logic mentioned in plan
            charset = charset.replace(/[s]/g, '');
        }

        let generated = '';
        const array = new Uint32Array(length);
        window.crypto.getRandomValues(array);

        for (let i = 0; i < length; i++) {
            let nextChar = charset[array[i] % charset.length];

            // Handle confusing sequences: vv (don't allow w to be confused or vv to form)
            if (excludeConfusing) {
                // If the character is 'w' and we exclude confusing, we might want to skip it? 
                // The prompt said "vv (doppeltes v) und w (Buchstabe w)". 
                // This usually means exclude 'w' because it looks like 'vv'.
                if (nextChar === 'w') {
                    // re-roll once
                    nextChar = charset[(array[i] + 1) % charset.length];
                }

                // rn -> m
                if (nextChar === 'm') {
                    nextChar = charset[(array[i] + 2) % charset.length];
                }

                // If about to form 'vv' or 'rn', re-roll
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
    }, [length, includeUppercase, includeNumbers, includeSymbols, excludeConfusing]);

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
                    <Shield size={28} />
                    <h1>Sicher?</h1>
                </div>

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
                    v1.0.0 von TK
                </a>
            </footer>
        </div>
    );
};

export default App;
