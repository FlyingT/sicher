# Sicher?

Ein einfacher, moderner und Docker-optimierter Kennwort- und Passphrasen-Generator, der Wert auf Klarheit und Sicherheit legt.
Vibe-Coded mit Google Antigravity. Gedacht für die Bereitstellung im Intranet, nicht für das Internet.

![](https://github.com/FlyingT/sicher/blob/main/1-Kennwort.png)


![](https://github.com/FlyingT/sicher/blob/main/2-Passphrase.png)

## Features

- **Kennwort-Generator**: Zufällige Passwörter mit konfigurierbarer Länge (8–64 Zeichen), Großbuchstaben, Zahlen und Sonderzeichen.
- **Passphrasen-Generator**: Sichere Passphrasen aus einer deutschen Wörterliste (7.700+ Begriffe), mit einstellbarer Wortanzahl und Trennzeichen.
- **Verwechslungsschutz**: Optionaler Ausschluss ähnlich aussehender Zeichen (`0/O`, `1/l/I`, `vv/w`, `rn/m` etc.).
- **Entropie-Stärke**: Visuelle Anzeige der Passwortstärke basierend auf Entropie-Berechnung.
- **Offline QR-Code**: Generierung eines QR-Codes für das erstellte Kennwort – komplett lokal, ohne externe Dienste.
- **Dark/Light Mode**: Automatische Erkennung der Systemeinstellungen mit manuellem Toggle.
- **Kryptografisch sicher**: Nutzt `window.crypto.getRandomValues()` mit Rejection Sampling (kein Modulo-Bias).
- **Docker-optimiert**: Gehärteter Nginx-Container (Non-Root, Security-Header, SPA-Routing).

## Deployment

Um den Generator lokal mit Docker zu starten, kann folgende `docker-compose.yml` verwendet werden:

```yaml
services:
  sicher:
    container_name: sicher
    image: ghcr.io/flyingt/sicher:latest
    ports:
      - "8080:8080"
    restart: unless-stopped
```

```bash
docker-compose up -d
```
Das Tool ist anschließend unter `http://localhost:8080` (Standard-Port) erreichbar.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Icon-Set**: Lucide React
- **Container**: Docker & Nginx (Alpine, Non-Root)
