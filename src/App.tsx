import React, { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { usePasswordGenerator } from './hooks/usePasswordGenerator';
import Navbar from './components/Navbar';
import SettingsPanel from './components/SettingsPanel';
import ResultDisplay from './components/ResultDisplay';
import QrModal from './components/QrModal';

const App: React.FC = () => {
    const { darkMode, toggleDarkMode } = useTheme();
    const gen = usePasswordGenerator();
    const [showQr, setShowQr] = useState(false);

    return (
        <div className={`app-wrapper ${darkMode ? 'dark' : ''}`}>
            <Navbar darkMode={darkMode} onToggleDark={toggleDarkMode} />

            <main className="main-container">
                <div className="content-grid">
                    <SettingsPanel
                        mode={gen.mode}
                        length={gen.length}
                        wordCount={gen.wordCount}
                        separator={gen.separator}
                        includeUppercase={gen.includeUppercase}
                        includeNumbers={gen.includeNumbers}
                        includeSymbols={gen.includeSymbols}
                        excludeConfusing={gen.excludeConfusing}
                        onUpdate={gen.updateOption}
                    />

                    <ResultDisplay
                        password={gen.password}
                        strength={gen.strength}
                        copied={gen.copied}
                        onGenerate={gen.generatePassword}
                        onCopy={gen.handleCopy}
                        onShowQr={() => setShowQr(true)}
                    />
                </div>
            </main>

            {showQr && (
                <QrModal password={gen.password} onClose={() => setShowQr(false)} />
            )}

            <footer className="version-indicator">
                <a href="https://github.com/FlyingT/sicher/blob/main/CHANGELOG.md" target="_blank" rel="noopener noreferrer">
                    v1.9.0 von TK
                </a>
            </footer>
        </div>
    );
};

export default App;
