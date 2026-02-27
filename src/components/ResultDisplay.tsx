import React from 'react';
import { RefreshCw, Copy, Check, QrCode as QrIcon } from 'lucide-react';
import type { StrengthInfo } from '../hooks/usePasswordGenerator';

interface ResultDisplayProps {
    password: string;
    strength: StrengthInfo;
    copied: boolean;
    onGenerate: () => void;
    onCopy: () => void;
    onShowQr: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
    password,
    strength,
    copied,
    onGenerate,
    onCopy,
    onShowQr,
}) => (
    <section className="result-card">
        <div className="result-display">
            <div className="password-text">{password || '...'}</div>
        </div>

        <div className="strength-container">
            <div className="strength-label">
                <span>Entropie-Stärke</span>
                <span>{strength.label}{strength.bits > 0 ? ` (${strength.bits} Bit)` : ''}</span>
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
            <button className="primary-btn" onClick={onGenerate}>
                <RefreshCw size={20} />
                Generieren
            </button>
            <div className="action-buttons-secondary">
                <button
                    className={`secondary-btn icon-btn-lg ${copied ? 'success' : ''}`}
                    onClick={onCopy}
                    title="Kopieren"
                >
                    {copied ? <Check size={24} /> : <Copy size={24} />}
                </button>
                <button
                    className="secondary-btn icon-btn-lg"
                    onClick={onShowQr}
                    title="QR-Code anzeigen"
                >
                    <QrIcon size={24} />
                </button>
            </div>
        </div>
    </section>
);

export default ResultDisplay;
