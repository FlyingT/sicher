# Sicher?

Ein einfacher, moderner und Docker-optimierter Kennwort und Passphrasen Generator, der Wert auf Klarheit und Sicherheit legt.

## Features

- **Privatsphäre**: Vollständig lokale Generierung im Browser – es werden keine Daten an Server übertragen.
- **Individuelle Generierung**: Schalter für Großbuchstaben, Zahlen und Sonderzeichen.
- **Längen-Kontrolle**: Stufenloser Slider für Kennwortlängen zwischen 8 und 32 Zeichen.
- **Kopieren mit einem Klick**: Schnelles Kopieren des generierten Passworts.
- **Intelligenter Ausschluss**: Optionale Logik zur Vermeidung verwechselbarer Zeichenpaare und Sequenzen:
  - `0` (Null) vs. `O` (O)
  - `1` (Eins) vs. `l` (kleines L) vs. `I` (großes i) vs. `|` (Pipe)
  - `5` (Fünf) vs. `S` (S)
  - `2` (Zwei) vs. `Z` (Z)
  - `vv` (doppeltes v) vs. `w` (w)
  - `rn` (r & n) vs. `m` (m)
  - `` ` `` (Backtick) vs. `'` (einfaches Anführungszeichen)

## Deployment

Um den Generator lokal mit Docker zu starten, kann folgende `docker-compose.yml` verwendet werden:

```yaml
version: '3.8'

services:
  sicher:
    container_name: sicher
    image: ghcr.io/flyingt/sicher:latest
    ports:
      - "8080:80"
    restart: unless-stopped
```

```bash
docker-compose up -d
```
Das Tool ist anschließend unter `http://localhost:8080` (Standard-Port) erreichbar.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Icon-Set**: Lucide React
- **Container**: Docker & Nginx (Alpine)