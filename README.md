# Sicher! 🛡️

Ein einfacher, moderner und Docker-optimierter Passwort-Generator, der Wert auf Klarheit und Sicherheit legt.

![]()

## Funktionen

- **Einfache Steuerung**: Schalte Großbuchstaben, Zahlen und Sonderzeichen flexibel ein oder aus.
- **Vermeidung von Verwechslungen**: Option zum Ausschluss von optisch ähnlichen Zeichen:
  - `0` (Null) und `O` (Buchstabe O)
  - `1` (Eins), `l` (kleines L) und `I` (großes i)
  - `5` (Fünf) und `S` (Buchstabe S)
  - `2` (Zwei) und `Z` (Buchstabe Z)
  - `vv` (doppeltes v) und `w` (Buchstabe w)
  - `rn` (r und n) und `m` (Buchstabe m)
  - `|` (Pipe), `1` und `l`
  - `` ` `` (Backtick) und `'` (einfaches Anführungszeichen)
- **Flexibler Slider**: Wähle eine Passwortlänge zwischen 8 und 32 Zeichen.
- **Sofortige Generierung**: Passwörter werden instant bei jeder Einstellungsänderung generiert.
- **Kopieren mit einem Klick**: Schnelles Kopieren des generierten Passworts in die Zwischenablage.
- **Modernes Design**: Dunkle Akzente, klare Typografie und ein responsives Interface.

## Deployment mit Docker

Die Anwendung ist für den Einsatz hinter einem Reverse Proxy (z.B. Nginx Proxy Manager oder Traefik) im Intranet vorkonfiguriert.

### Mit Docker Compose (Empfohlen)

Erstelle eine `docker-compose.yml` mit folgendem Inhalt oder verwende die mitgelieferte Datei:

```yaml
version: '3.8'

services:
  sicher:
    image: ghcr.io/flyingt/sicher:latest
    container_name: sicher-app
    ports:
      - "8080:80"
    restart: unless-stopped
```

Starte den Container:
```bash
docker compose up -d
```

Die App ist dann unter [http://localhost:8080](http://localhost:8080) erreichbar.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Modernes Vanilla CSS (Inter & Outfit Fonts)
- **CI/CD**: GitHub Actions (Build & Push to GHCR)
- **Container**: Docker (Alpine-based Nginx)