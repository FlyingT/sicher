# Sicher?

Ein einfacher, moderner und Docker-optimierter Kennwort und Passphrasen Generator, der Wert auf Klarheit und Sicherheit legt.

## Features

- **Individuelle Generierung**: Schalter für Großbuchstaben, Zahlen und Sonderzeichen.
- **Längen-Kontrolle**: Stufenloser Slider für Kennwortlängen zwischen 8 und 32 Zeichen.
- **Intelligenter Ausschluss**: Optionale Logik zur Vermeidung verwechselbarer Zeichenpaare und Sequenzen:
  - `0` (Null) vs. `O` (O)
  - `1` (Eins) vs. `l` (kleines L) vs. `I` (großes i) vs. `|` (Pipe)
  - `5` (Fünf) vs. `S` (S)
  - `2` (Zwei) vs. `Z` (Z)
  - `vv` (doppeltes v) vs. `w` (w)
  - `rn` (r & n) vs. `m` (m)
  - `` ` `` (Backtick) vs. `'` (einfaches Anführungszeichen)
- **Privatsphäre**: Vollständig lokale Generierung im Browser – es werden keine Daten an Server übertragen.
- **Kopieren mit einem Klick**: Schnelles Kopieren des generierten Passworts.
- **Versionsverlauf**: Transparente Änderungshistorie via `CHANGELOG.md`.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Icon-Set**: Lucide React
- **Container**: Docker & Nginx (Alpine)

## Deployment

### Docker
```bash
docker-compose up -d
```
Das Tool ist anschließend unter `http://localhost:8080` (Standard-Port) erreichbar.

## Entwicklung

1. Abhängigkeiten installieren: `npm install`
2. Dev-Server starten: `npm run dev`
3. Build erstellen: `npm run build`