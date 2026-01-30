# Sicher?

Ein einfacher, moderner und Docker-optimierter Kennwort und Passphrasen Generator, der Wert auf Klarheit und Sicherheit legt.

## Features

- **Offline QR-Code**: Generiere einen QR-Code für dein Passwort direkt lokal in der App.
- **Entropie-Meter**: Visuelle Anzeige der Passwortstärke in Echtzeit.
- **Passphrasen-Modus**: Generiere sichere Sätze aus einer Liste von über 7.700 Wörtern.
- **Kopieren mit Feedback**: Ein-Klick-Kopieren mit visueller Bestätigung (Haken & Grünfärbung).
- **Stärke-Anzeige**: Integriertes Entropy Meter, das die Sicherheit von Kennwörtern und Passphrasen visualisiert.

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