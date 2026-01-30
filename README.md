# Sicher?

Ein einfacher, moderner und Docker-optimierter Kennwort und Passphrasen Generator, der Wert auf Klarheit und Sicherheit legt.

## Features

- **Privatsphäre**: Vollständig lokale Generierung im Browser – es werden keine Daten an Server übertragen.
- **Kennwort & Passphrase**: Wähle zwischen klassischen Kennwörtern oder einprägsamen Passphrasen.
- **Wörterliste**: Passphrasen werden aus einer kuratierten Liste von über 7.700 deutschen Wörtern generiert.
- **Individuelle Kontrolle**:
  - **Kennwort**: Schalter für Großbuchstaben, Zahlen, Sonderzeichen und Länge (8-32).
  - **Passphrase**: Auswahl der Wortanzahl (3-8) und benutzerdefiniertes Trennzeichen.
- **Intelligenter Ausschluss**: Optionale Logik zur Vermeidung verwechselbarer Zeichenpaare und Sequenzen (z.B. `0` vs `O`, `1` vs `l`, `rn` vs `m`).

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