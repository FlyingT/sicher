import React from 'react';
import { Lock, Sun, Moon } from 'lucide-react';

interface NavbarProps {
    darkMode: boolean;
    onToggleDark: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, onToggleDark }) => (
    <nav className="navbar">
        <div className="navbar-content">
            <div className="nav-brand">
                <Lock size={24} strokeWidth={3} />
                <span>Sicher?</span>
            </div>
            <div className="nav-actions">
                <span className="nav-tagline">
                    Einfacher, lokaler Kennwort- und Passphrasen-Generator
                </span>
                <button
                    className="secondary-btn icon-btn"
                    onClick={onToggleDark}
                    title={darkMode ? 'Light Mode' : 'Dark Mode'}
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </div>
        </div>
    </nav>
);

export default Navbar;
