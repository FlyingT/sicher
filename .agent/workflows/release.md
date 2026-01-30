---
description: Steps for releasing a new version of Sicher?
---

// turbo-all
1. Bestimme die neue Versionsnummer basierend auf der Änderung:
   - v1.[A].[B]
   - A um 1 erhöhen bei neuen Features (Feature)
   - B um 1 erhöhen bei Fehlern/Korrekturen (Fix) nach dem letzten Feature-Upgrade

2. Aktualisiere `src/App.tsx`:
   - Suche nach der `version-indicator` Klasse und ändere den Text `v1.x.y von TK`.

3. Aktualisiere `CHANGELOG.md`:
   - Füge den neuen Versionsabschnitt ganz oben unter der Überschrift ein.
   - Datum: Aktuelles Datum.
   - Liste die Änderungen (Hinzugefügt, Fix, etc.) auf.

4. Aktualisiere `README.md` (falls neue Funktionen hinzugekommen sind).

5. Committe und pushe die Änderungen:
   - Commit-Nachricht auf Deutsch.
   - Beispiel: `git commit -m "Relase v1.x.y: [Kurzbeschreibung]"`

6. Gib die neue Version im Chat aus.
