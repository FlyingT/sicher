# Changelog

Alle wichtigen Änderungen an diesem Projekt werden in dieser Datei festgehalten.

## [1.4.0] - 2026-01-31

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