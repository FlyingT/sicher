import React from 'react';
import { RefreshCw } from 'lucide-react';
import type { PasswordOptions } from '../hooks/usePasswordGenerator';

interface SettingsPanelProps {
    mode: PasswordOptions['mode'];
    length: number;
    wordCount: number;
    separator: string;
    includeUppercase: boolean;
    includeNumbers: boolean;
    includeSymbols: boolean;
    excludeConfusing: boolean;
    onUpdate: <K extends keyof PasswordOptions>(key: K, value: PasswordOptions[K]) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
    mode,
    length,
    wordCount,
    separator,
    includeUppercase,
    includeNumbers,
    includeSymbols,
    excludeConfusing,
    onUpdate,
}) => (
    <aside className="settings-card">
        <div className="section-header">
            <RefreshCw size={18} />
            Modus &amp; Einstellungen
        </div>

        <div className="mode-toggle mode-toggle-spacing">
            <button
                className={mode === 'password' ? 'active' : ''}
                onClick={() => onUpdate('mode', 'password')}
            >
                Kennwort
            </button>
            <button
                className={mode === 'passphrase' ? 'active' : ''}
                onClick={() => onUpdate('mode', 'passphrase')}
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
                            <input type="checkbox" checked={includeUppercase} onChange={e => onUpdate('includeUppercase', e.target.checked)} />
                            <span className="slider-toggle"></span>
                        </label>
                    </div>

                    <div className="switch-item">
                        <span className="switch-label">Zahlen</span>
                        <label className="switch">
                            <input type="checkbox" checked={includeNumbers} onChange={e => onUpdate('includeNumbers', e.target.checked)} />
                            <span className="slider-toggle"></span>
                        </label>
                    </div>

                    <div className="switch-item">
                        <span className="switch-label">Sonderzeichen</span>
                        <label className="switch">
                            <input type="checkbox" checked={includeSymbols} onChange={e => onUpdate('includeSymbols', e.target.checked)} />
                            <span className="slider-toggle"></span>
                        </label>
                    </div>

                    <div className="switch-item">
                        <span className="switch-label">Keine Verwechslung</span>
                        <label className="switch">
                            <input type="checkbox" checked={excludeConfusing} onChange={e => onUpdate('excludeConfusing', e.target.checked)} />
                            <span className="slider-toggle"></span>
                        </label>
                    </div>
                </div>

                <div className="slider-container slider-top-spacing">
                    <div className="slider-info">
                        <span className="input-label">Länge</span>
                        <span className="slider-value-display">{length}</span>
                    </div>
                    <input
                        type="range"
                        min="8"
                        max="64"
                        value={length}
                        onChange={e => onUpdate('length', parseInt(e.target.value))}
                    />
                </div>
            </>
        ) : (
            <div className="control-group">
                <div className="slider-container">
                    <div className="slider-info">
                        <span className="input-label">Anzahl der Wörter</span>
                        <span className="slider-value-display">{wordCount}</span>
                    </div>
                    <input
                        type="range"
                        min="3"
                        max="12"
                        value={wordCount}
                        onChange={e => onUpdate('wordCount', parseInt(e.target.value))}
                    />
                </div>

                <div className="input-group separator-top-spacing">
                    <span className="input-label">Trennzeichen</span>
                    <input
                        type="text"
                        className="text-input"
                        value={separator}
                        onChange={e => onUpdate('separator', e.target.value)}
                        placeholder="-"
                        maxLength={5}
                    />
                </div>
            </div>
        )}
    </aside>
);

export default SettingsPanel;
