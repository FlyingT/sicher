import React, { useEffect, useRef } from 'react';
import { qrcodegen } from '../qrcodegen';

interface QrModalProps {
    password: string;
    onClose: () => void;
}

const QrModal: React.FC<QrModalProps> = ({ password, onClose }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current && password) {
            const qr = qrcodegen.QrCode.encodeText(password, qrcodegen.QrCode.Ecc.MEDIUM);
            const canvas = canvasRef.current;
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
    }, [password]);

    return (
        <div className="qr-overlay" onClick={onClose}>
            <div className="qr-modal" onClick={e => e.stopPropagation()}>
                <div className="qr-canvas-container">
                    <canvas ref={canvasRef}></canvas>
                </div>
                <div className="qr-actions">
                    <button className="secondary-btn qr-close-action" onClick={onClose}>
                        Schließen
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QrModal;
