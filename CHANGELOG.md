## [1.9.1] - 2026-02-27
### Behoben
- **Passphrasen-Umbruch**: Zeilenumbruch erfolgt nur noch am Trennzeichen, nicht mehr mitten im Wort (`overflow-wrap: break-word` statt `word-break: break-all`).
- **Non-Root Container**: Nginx lauscht auf Port 8080 (unprivilegiert), `COPY --chown=nginx:nginx` für korrekte Dateirechte, Reihenfolge im Dockerfile korrigiert.

### Hinzugefügt
- **Entropie in Bit**: Stärke-Anzeige zeigt nun den konkreten Entropie-Wert in Bit (z.B. „Sehr sicher (103 Bit)").
- **Escape-Taste**: QR-Code-Popup lässt sich mit der Escape-Taste schließen.

## [1.9.0] - 2026-02-27
### Architektur
- **Komponentenstruktur**: `App.tsx` von 390 auf ~55 Zeilen reduziert und in `Navbar`, `SettingsPanel`, `ResultDisplay` und `QrModal` aufgeteilt.
- **Custom Hooks**: Logik für Theme (`useTheme`) und Passwort-Generierung (`usePasswordGenerator`) in wiederverwendbare Hooks extrahiert.
- **CSS Cleanup**: Toten Code entfernt (`.sidebar`, `.app-container`, `.theme-toggle` etc.), Inline-Styles in CSS-Klassen überführt, Responsive Breakpoint korrigiert.

### Sicherheit & Kryptografie
- **Rejection Sampling**: Modulo-Bias in der Zufallsgenerierung behoben – `randomIndex()` verwirft Werte oberhalb des größten Vielfachen von `max` für gleichverteilte Ergebnisse.
- **Verwechslungsschutz**: Robustere Logik mit `while`-Schleife statt einfachem Offset, um garantiert keine verwechselbaren Zeichen auszugeben.

### Infrastruktur
- **Dockerfile**: `npm ci` statt `npm install` für reproduzierbare Builds, Nginx als Non-Root-User.
- **nginx.conf**: Security-Header (`X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy`, `Permissions-Policy`), SPA-Routing, Asset-Caching.
- **docker-compose.yml**: Veraltete `version`-Angabe entfernt.
- **Dependencies**: Alle Versionen exakt gepinnt (ohne `^`-Ranges).

### SEO & Dokumentation
- **Meta-Tags**: `description`, `theme-color` und Open Graph Tags in `index.html` ergänzt.
- **README**: Stabile Feature-Liste statt Changelog-Einträge, Sprache vereinheitlicht (Deutsch).

## [1.8.1] - 2026-02-01
### Fixed
- **Navbar Tagline**: Beschreibung "Einfacher, lokaler Kennwort- und Passphrasen-Generator" hinzugefügt.
- **UI Polishing**: "Shaded"-Look für den Modus-Toggle wiederhergestellt (Schatten & Hintergrund).
- **Footer**: Feststehender Footer-Balken mit Schattierung hinzugefügt (wie in Mosaik).
- **Slider Design**: Slider für Wortanzahl (Passphrase) an das Design der Kennwort-Länge angepasst.
- **QR-Code Cleanup**: Header-Text und Logo im Popup entfernt für einen cleaner Look.

## [1.8.0] - 2026-02-01
### Added
- **Major Redesign**: Umstellung auf ein modernes Top-Navbar Layout (inspiriert durch "Belegt" & "Mosaik").
- **Brand Consistency**: Neue Farbpalette basierend auf Indigo und Slate.
- **Improved UX**: Card-basierte Struktur für Einstellungen und Ergebnisse.
- **Enhanced Mobile UI**: Vollständig responsives Header-Layout.
- **Bugfixes**: Kleinere CSS Korrekturen für den Dark Mode.

## [1.7.0] - 2026-01-31
### Added
- Design-Harmonisierung: UI an das Projekt "Belegt" angepasst.
- Umstellung auf die Schriftart **Inter** für die gesamte App.
- Neues Farbschema basierend auf Tailwind Gray-50 und Blue-500.
- Modernere, reduzierte Eckenradien (8px) und verfeinerte Schatten.
- Optimierter Header und dezentere Footer-Gestaltung.

## [1.6.2] - 2026-01-31
### Added
- Dark Mode Support: Automatische Erkennung der Systemeinstellungen und manueller Toggle (oben rechts).
- Die Design-Einstellungen werden dauerhaft im Browser gespeichert (`localStorage`).

### Fixed
- Der Standardwert für die Wortanzahl bei Passphrasen wurde auf 5 Wörter erhöht.

## [v1.5.0] - 2026-01-31
### Added
- Offline QR-Code Generierung für erstellte Kennwörter/Passphrasen
- QR-Code kann über einen neuen Button neben der Kopier-Schaltfläche angezeigt werden

### Changed
- UI Refactoring: Stärke-Anzeige wurde unter das Passwort-Feld verschoben für bessere Übersichtlichkeit
- Layout-Anpassungen für eine kompaktere Darstellung
- Update der Abhängigkeiten und interner Logik

## [v1.4.0] - 2026-01-31

### Hinzugefügt
- (Feature) Stärke-Indikator (Entropy Meter): Visualisierung der Passwortstärke basierend auf Entropie-Berechnung.

### Behoben
- (Fix) Platzhalter-Text im Trennzeichen-Feld entfernt für ein saubereres UI.

## [1.3.1] - 2026-01-31

### Behoben
- (Fix) Automatisches Entfernen von führenden Leerzeichen beim Wechsel von Standard-Trennzeichen zu benutzerdefiniertem Trennzeichen.
- (Fix) Word-Spacing bei Passphrasen korrigiert.

## [1.3.0] - 2026-01-31

### Hinzugefügt
- (Feature) Optisches Feedback (Haken & Grünfärbung) beim Kopieren des Passworts.

### Behoben
- (Fix) Kopieren-Button funktioniert nun auch in nicht-sicheren Umgebungen (Fallback-Logik).
- (Fix) Unnötige Leerzeichen bei Passphrasen mit benutzerdefinierten Trennzeichen entfernt.

## [1.2.0] - 2026-01-31

### Hinzugefügt
- (Feature) Benutzerdefiniertes Trennzeichen für Passphrasen einstellbar.

### Geändert
- (Fix) Slider-Bereich für Passphrasen auf 3 bis 8 Wörter korrigiert.
- (Fix) Textbeschriftung in "Anzahl der Wörter" geändert.

## [1.1.0] - 2026-01-31

### Hinzugefügt
- (Feature) Passphrasen-Generator integriert (Modus-Umschalter in der Sidebar).
- (Feature) Deutsche Wörterliste (7700+ Begriffe) für sichere Passphrasen.
- (Feature) Slider für die Anzahl der Wörter (3-10) im Passphrasen-Modus.

## [1.0.3] - 2026-01-30

### Hinzugefügt
- (Fix) Neues Padlock-Icon im UI mit abgerundetem Hintergrund (identisch zu Mosaik/Belegt Stil).
- (Fix) Docker-Compose Code-Beispiel in der `README.md` ergänzt.

## [1.0.2] - 2026-01-30

### Hinzugefügt
- (Fix) Tagline "Einfacher, lokaler Kennwort und Passphrasen Generator" im UI ergänzt.
- (Fix) Favicon im Browser-Tab hinzugefügt (Padlock-Icon).

### Geändert
- (Fix) Titel im Browser-Tab auf "Sicher? - Kennwort Generator" geändert.

## [1.0.1] - 2026-01-30

### Behoben
- (Fix) UI-Überlagerung der Versionsanzeige mit der Umrandung korrigiert.

## [1.0.0] - 2026-01-30

### Hinzugefügt
- Initialer Release des Passwort-Generators "Sicher?".
- Schalter für Großbuchstaben, Zahlen und Sonderzeichen.
- Logik zum Ausschluss verwechselbarer Zeichen und Sequenzen (`vv`, `rn`).
- Passwortlängen-Slider (8-32 Zeichen).
- Versionsanzeige im UI mit Link zum Changelog. (Fix)