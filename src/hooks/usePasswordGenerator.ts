import { useState, useEffect, useCallback } from 'react';
import { wordlist } from '../words';

/** Returns an unbiased random index in [0, max) using rejection sampling. */
function randomIndex(max: number): number {
    const limit = Math.floor(0x100000000 / max) * max;
    const array = new Uint32Array(1);
    let value: number;
    do {
        window.crypto.getRandomValues(array);
        value = array[0];
    } while (value >= limit);
    return value % max;
}

export interface PasswordOptions {
    mode: 'password' | 'passphrase';
    length: number;
    wordCount: number;
    separator: string;
    includeUppercase: boolean;
    includeNumbers: boolean;
    includeSymbols: boolean;
    excludeConfusing: boolean;
}

export interface StrengthInfo {
    score: number;
    label: string;
}

export function usePasswordGenerator() {
    const [options, setOptions] = useState<PasswordOptions>({
        mode: 'password',
        length: 16,
        wordCount: 5,
        separator: '-',
        includeUppercase: true,
        includeNumbers: true,
        includeSymbols: true,
        excludeConfusing: true,
    });
    const [password, setPassword] = useState('');
    const [copied, setCopied] = useState(false);
    const [strength, setStrength] = useState<StrengthInfo>({ score: 0, label: 'Sehr schwach' });

    const updateOption = <K extends keyof PasswordOptions>(key: K, value: PasswordOptions[K]) => {
        setOptions(prev => ({ ...prev, [key]: value }));
    };

    const calculateStrength = useCallback(() => {
        if (!password) {
            setStrength({ score: 0, label: 'Sehr schwach' });
            return;
        }

        let entropy = 0;
        if (options.mode === 'passphrase') {
            entropy = options.wordCount * Math.log2(wordlist.length);
        } else {
            let poolSize = 26;
            if (options.includeUppercase) poolSize += 26;
            if (options.includeNumbers) poolSize += 10;
            if (options.includeSymbols) poolSize += 30;
            if (options.excludeConfusing) poolSize -= 10;
            entropy = options.length * Math.log2(poolSize);
        }

        if (entropy < 40) setStrength({ score: 1, label: 'Schwach' });
        else if (entropy < 60) setStrength({ score: 2, label: 'Mittel' });
        else if (entropy < 80) setStrength({ score: 3, label: 'Sicher' });
        else setStrength({ score: 4, label: 'Sehr sicher' });
    }, [password, options]);

    useEffect(() => {
        calculateStrength();
    }, [calculateStrength]);

    const buildCharset = useCallback(() => {
        let charset = 'abcdefghijklmnopqrstuvwxyz';
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numberChars = '0123456789';
        const symbolChars = '!@#$%^&*()_+~`|}{[]\\:;?><,./-=';

        if (options.includeUppercase) charset += uppercaseChars;
        if (options.includeNumbers) charset += numberChars;
        if (options.includeSymbols) charset += symbolChars;

        if (options.excludeConfusing) {
            const confusing = /[0O1lI5S2Z|`']/g;
            charset = charset.replace(confusing, '');
        }

        return charset;
    }, [options.includeUppercase, options.includeNumbers, options.includeSymbols, options.excludeConfusing]);

    const isConfusingPair = (prev: string, next: string): boolean => {
        return (prev === 'v' && next === 'v') || (prev === 'r' && next === 'n');
    };

    const isConfusingChar = (ch: string): boolean => {
        return ch === 'w' || ch === 'm';
    };

    const generatePassword = useCallback(() => {
        if (options.mode === 'passphrase') {
            const words = Array.from({ length: options.wordCount }, () =>
                wordlist[randomIndex(wordlist.length)]
            );
            const actualSeparator = options.separator.length > 1 ? options.separator.trim() : options.separator;
            setPassword(words.join(actualSeparator).trim());
            return;
        }

        const charset = buildCharset();
        let generated = '';

        for (let i = 0; i < options.length; i++) {
            let nextChar: string;

            // Use rejection-sampled random index; re-roll for confusing chars
            do {
                nextChar = charset[randomIndex(charset.length)];
            } while (
                options.excludeConfusing && (
                    isConfusingChar(nextChar) ||
                    (i > 0 && isConfusingPair(generated[i - 1], nextChar))
                )
            );

            generated += nextChar;
        }

        setPassword(generated);
    }, [options, buildCharset]);

    useEffect(() => {
        generatePassword();
    }, [generatePassword]);

    const handleCopy = async () => {
        if (!password) return;

        try {
            await navigator.clipboard.writeText(password);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
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

    return {
        ...options,
        password,
        copied,
        strength,
        updateOption,
        generatePassword,
        handleCopy,
    };
}
