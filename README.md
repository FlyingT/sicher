# Sicher?

Ein einfacher, moderner und Docker-optimierter Kennwort und Passphrasen Generator, der Wert auf Klarheit und Sicherheit legt. 
Vibe-Coded mit Google Antigravity. Gedacht für die Bereitstellung im Intranet, nicht für das Internet.

![](https://github.com/FlyingT/sicher/blob/main/1-Kennwort.png)


![](https://github.com/FlyingT/sicher/blob/main/2-Passphrase.png)

## Features

- **Major Redesign**: Modernes Top-Navbar-Layout für eine bessere Übersicht.
- **Navbar Tagline**: Descriptive tagline added for better context.
- **Brand Consistency**: Design-Harmonisierung mit den Projekten "Belegt" und "Mosaik".
- **Shaded Footer**: New shaded footer bar for versioning.
- **Improved UX**: Shaded mode toggles and unified slider designs.
- **Offline QR-Code**: Cleaned up popup for maximum simplicity.

### Aktuelle Version: v1.8.1 (01. Februar 2026)

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
