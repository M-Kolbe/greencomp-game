# GreenComp Trails / GreenComp Spuren (Arbeitstitel)

**GreenComp erleben.** Die digitale Ebene zum Kartenset «GreenComp Spuren», gebaut nach dem Konzept vom 14. Oktober 2026.
Eine statische Web-App ohne Build-Schritt, ohne Konto und ohne Tracking. Alles, was gespeichert wird,
bleibt im Browser des Geräts (`localStorage`). Nach dem ersten Laden läuft sie offline (Service Worker).

Die Karten bleiben Papier, das Gespräch bleibt der Kern. Die App ist nur das «Fenster».

**Spielen:** https://m-kolbe.github.io/greencomp-game/ (Link zum Weitergeben, auch per WhatsApp)

## Was drin ist

| Bereich | Adresse | Was es tut |
|---|---|---|
| Start | `#` | Alpen-Morgendämmerung als animierter Kopf, Titel «GreenComp erleben» und gleich darunter **«Jetzt spielen – Wer spielt?»** mit drei Knöpfen (Nur ich · Wir sind 3 bis 5 · Ein ganzer Raum). Darunter die Abkürzung **«Gleich los · eine Station, 15 Min.»** (ohne Einrichten, gut zum ersten Ausprobieren). Läuft ein Spiel, steht dort «Weiterspielen». Daneben der Bierdeckel zum Umdrehen und Schnipsen, genau so gezeichnet wie der gedruckte, darunter Kacheln zu allen Wegen, Wegweiser zu allen 12 Karten, freiwillig der Nature Connection Index |
| **Eingang zum Testen** | `#los` | Führt ohne Startseite und ohne Auswahl direkt in «eine Station»: Stille, eine Minute Einführung, eine Station, kurze Nachbesprechung, nächste Spielleitung. Rund 15 Minuten. Die Adresse wird im Verlauf ersetzt, «Zurück» startet also kein neues Spiel |
| **Jetzt spielen** | `#spielen` | Das ganze Spiel Schritt für Schritt, jeder Schritt auf einem eigenen Bildschirm mit einem grossen «Weiter». Aufgebaut wie ein gutes Lernspiel: **Einführung, Spiel, Nachbesprechung**, und **zuerst tun, dann reden**. Erst: Wer spielt? Wie viel Zeit (5 Minuten, eine Station oder Expedition)? Namen. Dann **Ankommen in Stille** (Handys in die Mitte, eine Stille-Karte). Dann **eine Minute Einführung**: Wozu spielt ihr? So läuft es (Ablauf mit Minuten und «An jeder Station: Zuhören 20 s · Aufgabe 2 bis 4 Min. · Reden 3 Min. · Schätzen 2 Min. · ein Satz und ein Fundstück 1:40»), drei Regeln mit «Niemand muss. Passen ist erlaubt.», Rollen, draussen oder drinnen. Tempo, Blick auf den Ort, Ton und Punkte liegen hinter «Mehr». Jeder Schritt mit Uhr sagt unter seinem Namen, wie lange er dauert. **Wählen**: Jede Person zeigt gleichzeitig auf die Fähigkeit, die die Gruppe am meisten braucht. Die gewählte Karte wird an ihrer Station gespielt. Die Spielleitung kann das Wählen hinter die erste Station legen («Erst eine Station spielen, dann wählen»). Mit **Runde 0 («Original plus»)** wählt die Gruppe zuerst eines der 17 UNO-Nachhaltigkeitsziele und einen der fünf Innovationsbereiche von EducationForClimate, dann die Fähigkeiten dafür. Pro Station: **Zuhören** (draussen 20 Sekunden dem Ort zuhören, drinnen spielt die App den Klang), Fähigkeitskarte, Spurkarte, Funke, **Mach es echt: ein Schritt pro Bildschirm**, eine Sanduhr für alle drei Schritte so lange, wie die Karte sagt, Reden, Schätzen (die Überraschung ist der Lohn: «Am nächsten: …»), ein Satz und ein Fundstück, das mitkommt. **Nachbesprechung** in drei Fragen: Was ist passiert? Was heisst das für uns (gilt unsere Wahl noch)? Was machen wir damit (gemeinsames Vorhaben mit Daumenprobe)? Bei einer Station wird hier gewählt. Am Schluss Versprechen, **«Wer leitet das nächste Spiel?»** (alle zeigen gleichzeitig auf eine Person) und eine **Gruppenkarte** zum Kopieren oder Teilen. 5 Minuten und allein bleiben kurz. Gezogene Karten liegen in lesbarer Grösse auf dem «Tisch», nie übereinander; Antippen zeigt sie gross. Am Handy gehört der Bildschirm im Spiel ganz dem Spiel (keine Tab-Leiste über den Karten). |
| **Vorbereiten** | `#vorbereiten` | Für die Spielleitung, etwa 20 Minuten vor dem Tag: Ziel wählen, Liste mit 8 Punkten (Ort ablaufen, Gefahren notieren, Regenplan, Barrieren, Material, Handy, Gruppen, Zeit), Zeitplaner nach Spielart, Gruppengrösse und Tempo, was am Spieltag zu tun ist |
| **Der Deckel** | `#deckel` | Der Bierdeckel als Werbemittel: die zwölf Deckel (vorne Morgenrot und Frage, hinten gelber Wegweiser «Jetzt spielen» und QR-Code), die fünf Erkennungszeichen, **Druckdaten** (113 × 113 mm mit Beschnitt, 24 Seiten als PDF, oder A4-Probedruck mit Schnittlinie), SVG pro Seite, technische Angaben, Prüfliste, Orte. Siehe `DECKEL.md` |
| Nach dem Scan | `#d1` bis `#d12` | Ziel der QR-Codes auf den Deckeln: zeigt genau diesen Deckel (erst die gescannte Rückseite, dann die Frage), «Jetzt spielen · 5 Minuten» startet mit einem Tipp, dazu Spaziergang oder ganzes Spiel, «Gefundene Deckel: x von 12» |
| Kompetenzseite (QR-Ziel) | `#k-<id>` | Karte mit Vorder- und Rückseite (Vorderseite: Alltagssprache, Frage, drei Schritte, «Fertig, wenn»), «Diese Karte jetzt spielen» (startet das geführte Spiel mit genau dieser Karte), vier Türen: Fenster (Klang, Stimme, Bild), Spaziergang, Tafel, Text |
| Fenster | Tür auf der Kompetenzseite | Pro Kompetenz drei Stücke wie im Konzept: **Klang** (60 s Klanglandschaft, Augen zu), **Stimme** (30 bis 60 s), **Bild** (bewegtes Bild). 36 Stücke, alle mit Untertiteln und Mitschrift. Das Stück, das auf der Karte steht, ist markiert. Zuerst steht immer die echte Aufgabe da |
| Hör-Rätsel | Fenster «Kritisches Denken», Klang | Wie viele verschiedene Vögel hörst du? Auflösung: drei, und alle drei kommen aus dem Computer |
| Spaziergang | `#walk-<id>` | Einzelspiel, knapp 11 Minuten. Jeder neue Schritt beginnt mit einem Vogelruf. Nach der Aufgabe (3 Minuten) und der Stille (2 Minuten) erklingt ein ganzer Vogelgesang, damit man ohne hinzuschauen weiss, dass die Zeit um ist. Signal wählbar: Amsel, Kohlmeise, Kuckuck, Specht, Klangschale. Der Hintergrund wird über den Spaziergang heller |
| Fünf Minuten | Knopf auf jeder Karte | Spurkarte ziehen (3D-Wende) oder nach dem Schnipsen wählen, Funkenrad drehen, 5-Minuten-Sanduhr mit Vogelsignal. Liegt das Handy mit dem Bildschirm nach unten, wird es schwarz. Am Ende: «Wart ihr draussen?» und Versprechen |
| Tafel | `#tafel` | Ein Bildschirm für den Raum: Gruppen mit Personen, Ankommen mit drei Regeln, Stille-Karte und 60 Sekunden Stille, **Wählen** (eine Kompetenz pro Gruppe, die an ihrer Station gespielt wird, freiwillig mit UNO-Ziel wie im Original), 4 Stationen zu 11 Minuten mit Klang zur Station, Raum-Uhr und Schätzkarte. Die Auflösung erscheint erst, wenn alle Gruppen geschätzt haben, mit Bewegtbild. Funke und Fundstück pro Gruppe, **Nachbesprechung** mit drei Fragen und Zeitmesser, Wahl und Vorhaben pro Gruppe, am Schluss die **Vergleichsrunde wie im Original** (die Wahl jeder Gruppe nebeneinander, «bleibt» oder «jetzt anders», mit Vorhaben: das Bild zum Fotografieren). Nur mit eingeschalteten Punkten: Punkte für Personen (+3, +1), Treffsicherheit und Podest für die Gruppe des Tages |
| Schätz-Training | `#schaetzen` | Die 7 geprüften Schätzkarten allein üben, mit Schieberegler und Auflösung |
| Lösungsheft | `#loesungen` | Alle Antworten mit Quelle, für ein Spiel ohne Tafel |
| Spielanleitung | `#anleitung` | In 60 Sekunden, fünf Grundregeln, vier Arten zu spielen (Expedition als klickbare Zeitleiste), drei Rollen, Beutel-Inhalt mit Kartenformen, Spass-Mechaniken, Punkte, Barrierefreiheit. Umschaltbar auf **Leichte Sprache** |
| Mein Weg | `#spuren` | Bergkarte mit 12 Stationen bis zum Gipfel, Gruppenkarten der gespielten Gruppenspiele, eigene Joker, **17 Fundstücke** zum Sammeln, Versprechen mit Sieben-Tage-Frage und Kalender-Erinnerung |
| Klang zur Station | `#station-<bereich>` | Ziel der QR-Codes auf den 4 Bereichskarten |
| Das ganze Set | `#set` | Alle 96 Karten (Vorder- und Rückseiten), filterbar, druckbar (70 × 120 mm, Tarot-Format, 4 pro A4). Antippen zeigt eine Karte **gross**: umdrehen, wischen, Pfeiltasten. Beim Druck der Rückseiten ist jede Reihe **gespiegelt**, damit beidseitig gedruckt (an der langen Kante gewendet) jede Rückseite hinter ihrer Vorderseite liegt |
| **Joker** | `#joker` | Eine eigene Karte schreiben: Fähigkeit (oder eine fehlende mit eigenem Namen), Frage, drei Schritte, «Fertig, wenn». Daneben die Karte, wie sie gedruckt aussieht, und ein **Sprach-Check** nach `SPRACHE.md` (Fragezeichen, drei Schritte, klares Ende, höchstens 20 Wörter, passt auf die Karte). Gespeicherte Joker erscheinen unter «Mein Weg» und werden mit dem Set gedruckt. Im Spiel: **einmal pro Spiel** statt der gezogenen Karte |
| Messung | `#messung` | NCI vorher, nachher und nach 7 Tagen mit selbstgewähltem Code, Export als CSV |
| Werkstatt | `#werkstatt` | Für die Macher: Adresse für die QR-Codes, A/B/C-Tabelle 12 × 5, Produktionsliste aller 52 Medien-Stücke, Stand der Schätzkarten, Prüfliste vor dem Druck |

Am Handy gibt es unten eine Tab-Leiste (Start, Karten, **Spielen** in der Mitte, Anleitung, Mein Weg); im laufenden Spiel ist sie ausgeblendet. Am Computer steht «Spielen» als erster Punkt oben.
Sprachen: Englisch und Deutsch, Schalter oben. Deutsch im Liechtensteiner Stil (kein ß, Guillemets).

## Spielmechaniken

- **Fundstücke** (17): das digitale Gegenstück zu den echten Fundstücken auf der Bereichskarte. Sie zeigen,
  *was* man gemacht hat, nicht wie gut. Allein gibt es weiterhin keine Punkte (Konzept). Beispiele: «Erste Spur»,
  «Bei jedem Wetter» (Aufgabe wirklich draussen gemacht), «Alle fünf Wege», «Stille gehalten», «Wort gehalten»
  (Versprechen nach 7 Tagen gehalten), «Gutes Ohr» (Hör-Rätsel), «Eigene Karte» (Joker geschrieben), «Deckel-Jagd» (drei verschiedene Deckel gescannt), «Meisterkarte» (10 Fundstücke).
- **Ohne Punkte** (seit v0.7 die Grundeinstellung): Schätzen bleibt, die Überraschung ist der Lohn, und die App sagt, wer am
  nächsten lag. Am Schluss zählen alle bis drei und zeigen gleichzeitig auf die Person, die das nächste Spiel leitet. Kein Mutpunkt,
  keine Spurenpunkte, keine Meisterkarte. Wer Punkte will, schaltet sie ein (Einführung unter «Mehr», auf der Tafel bei den
  Gruppen): dann nur fürs Schätzen, nächste Schätzung +3, zweitnächste +1, bei «Stimmt’s?» +1 für alle, die richtig liegen.
  Aufgaben und Gespräche bleiben immer ohne Punkte.
- **Funke**: Die Tafel merkt sich pro Gruppe, ob schon ein Funke gezogen wurde, und mahnt am Schluss («einmal pro Spiel ist Pflicht»).

- **Zeiten**: Expedition 60 Minuten = Ankommen 2, Einführung 1, Wählen 2, vier Stationen à 11, Nachbesprechung 8, Versprechen 2,
  nächste Spielleitung 1. Eine Station: Zuhören 20 Sekunden, Aufgabe so lange, wie die Karte sagt (2 bis 4 Minuten), Gespräch für
  den Rest bis 7:20, Schätzen 2, ein Satz und Fundstück 1:40. Ab fünf Personen wird pro Person 20 Sekunden länger geredet. Dazu
  Tempo ruhig, normal oder zügig. Die Minuten pro Karte sind ein Vorschlag zum Testen, keine Messung.
- **Draussen ist der Ort der Klang**: Ein Handy-Lautsprecher geht draussen im Wind unter, und eine Aufnahme widerspricht «zuerst
  echt». Draussen zeigt die App nur die Sanduhr für 20 Sekunden Zuhören; drinnen spielt sie den Klang zur Station.
- **Wählen und Nachbesprechung**: aus dem Original übernommen (dort einigt sich die Gruppe, und ein Drittel der Zeit gehört dem
  Vergleich) und mit erprobten Methoden umgesetzt: Punktabstimmung, Daumenprobe, «Was? – Was heisst das? – Was nun?».
  Begründung und Quellen in `ANALYSE-ORIGINAL.md`.
- **Joker**: Das Original hat drei leere Joker ohne Regel. Hier hat der Joker eine klare Aufgabe: eine eigene Karte für den Ort,
  mit denselben Teilen wie jede Fähigkeitskarte. Einmal pro Spiel, etwa drei Minuten.
- **Zeichen pro Bereich**: Herz (Werte), Netz (Komplexität), Sonnenaufgang (Zukunft), steigender Pfeil (Handeln). Auf jeder Karte,
  jedem Wegweiser und beim Wählen. So ist die Farbe nie das einzige Merkmal (WCAG 1.4.1), auch für Menschen mit Farbsehschwäche.

- **Ein Wort pro Publikum**: Für alles, was Spielende lesen, heisst es «Fähigkeit» (Fähigkeitskarte), auf Englisch «skill».
  «Kompetenz» steht nur in der Definitionszeile des JRC auf der Kartenrückseite und gegenüber dem JRC.

## Neu in v0.8 (17. Oktober 2026)

- Startseite: Die drei Wege (Nur ich · Wir sind 3 bis 5 · Ein ganzer Raum) sind wieder offen sichtbar, kein Titel «Wege hinein».
  Darunter «Gleich los» (eine Station).
- **Original plus ist keine eigene Spielart mehr**, sondern die Expedition mit dem Ziel «An einem UNO-Ziel arbeiten (wie im
  Original)». Dieses Ziel wählt man in der Einführung; es kostet eine Minute mehr. Direkt starten: Kachel «Wie im Original: mit
  UNO-Ziel» auf der Startseite oder «Original plus spielen» in der Anleitung.
- **Die Minuten sind sichtbar**: In der Einführung stehen Ablauf und «An jeder Station …» wieder offen da, und jeder Schritt mit Uhr
  sagt unter seinem Namen, wie lange er dauert («Station 1 · 3 Min.»).
- Stille-Karten passen drinnen und draussen. Funke «Doppelt»: Widersprechen sich die Spurkarten, gilt die zweite.
  Der Spaziergang dauert knapp 11 statt gut 13 Minuten (Stille 2 Minuten).
- **Zum Weitergeben**: `GreenComp-erleben.html`, die ganze App in einer Datei (siehe «Starten»).
- **Vorlesen lässt sich stoppen**: Der Knopf zeigt «■ Stopp», solange gesprochen wird. **Jede Uhr hat «Überspringen»**:
  Die Zeit endet, und es geht zum nächsten Bildschirm (bei der Aufgabe direkt zum Gespräch). Auch im 5-Minuten-Spiel.
- **Von Station zu Station**: Jeder Schritt zeigt «Station 2 von 4». Der letzte Schritt einer Station heisst «Weiter zu Station 2»,
  und an der neuen Station steht, wohin es geht («Ein Bierdeckel in dieser Farbe markiert sie»). Klar gesagt: An einer Station liegen
  die drei Karten eines Bereichs, jede Gruppe spielt eine davon. Beim Reden steht, dass die Frage auf der runden Karte das Thema ist
  und wer sie vorliest.
- **Tafel**: Die zwölf Fähigkeiten beim Wählen stehen in zwei Spalten statt vier gequetschten; der Überlappungs-Test prüft jetzt alle
  Ansichten der Tafel.

## Neu in v0.7 (17. Oktober 2026)

- Karten im **Tarot-Format 70 × 120 mm** mit grösserer Schrift. Vorne Frage, drei Schritte mit Beispielen dort, wo Leute
  einfrieren, «Fertig, wenn» und die Minuten («Mach es echt · 3 min»). Hinten Definition, Form für allein, zweite Form und der
  Fenster-Code (20 mm), denn das Fenster ist die Alternative, wenn es echt nicht geht.
- Neue Aufgaben für Werte (ordnen statt reden), Fairness (etwas Knappes teilen, mit Satz zu Allergien), Systemdenken (die Kette
  wackelt), Anpassungsfähigkeit (die Regel kommt vom Ort), Kollektives Handeln (bis 20, mit Ausweg), Erkundendes Denken (die Dinge
  kommen vom Ort); vier neue Gesprächsfragen.
- Einfacher spielen: ohne Punkte, zuerst Stille, eine Minute Einführung, ein Schritt pro Bildschirm, Zuhören draussen, Eingang `#los`.
- Anschluss an das Original: Innovationsbereiche von EducationForClimate, Vergleichsrunde auf der Tafel, Teilen in der Community,
  Scaffold-Karten für Schulen.
- Die Bereichskarte reist mit der Gruppe, ein Bierdeckel markiert die Station. Regenplan mit Zipbeutel fürs Leitungs-Handy.

## Kartendarstellung

Jede kleine Karte ist in jeder Grösse die gedruckte Karte: Schrift und Abstände wachsen mit der Kartenbreite
(CSS-Container-Einheiten, Basis 70 mm). Was im Druck passt, passt deshalb auch am Bildschirm, im Spiel und in der
Grossansicht. Ein Browsertest misst alle 96 Karten, Vorder- und Rückseite, Deutsch und Englisch, am Bildschirm und im Druck.
Ein zweiter Test sucht auf allen Seiten und in jedem Spielschritt (Handy, Tablet, Computer) Karten, Schilder und Felder, die sich
überlappen oder abgeschnitten sind.

## Sprache

Alle Karten und Anweisungen folgen festen Regeln: ein Gedanke pro Satz, rund 15 Wörter, bekannte Wörter, drei Schritte pro
Aufgabe mit «Fertig, wenn …», keine Arbeitswelt vorausgesetzt, kein Material ausser dem, was am Ort liegt. Die Regeln und die
Messung vorher und nachher stehen in `SPRACHE.md`, alle Texte zum Überarbeiten in `KARTENTEXTE.md`. Ein Test prüft, dass jede
der 96 Karten auf 70 × 120 mm passt, Vorder- und Rückseite, Deutsch und Englisch.

## Was echt ist und was Platzhalter

- **Platzhalter:** Alle Klänge sind synthetisch (Web Audio: Amsel, Kohlmeise, Buchfink, Kuckuck, Zaunkönig,
  Rotkehlchen, Eisvogel, Specht, Taube, Grillen, Bienen, Glocken, Schritte auf Kies, Bach, Regen, Donner, Zug, Tram,
  Kläranlage). Die Stimmen sind die Computerstimme des Geräts, die Bilder einfache Zeichnungen. Die App sagt das
  überall dazu. Echte Aufnahmen ersetzen sie später; die Produktionsliste in der Werkstatt hat dafür die Spalten
  Datei, Urheber, Lizenz, Freigabe.
- **Skripte für die Stimmen** (drei Generationen, Kind 2050, Försterin, T-Shirt, Faktenprüferin, Stadtplanerin,
  Stimme aus 2046, Bäuerin, Biologin, Gemeinderätin, Chorleiterin, drei Versprechen) sind erfundene Entwürfe für
  die Aufnahme, keine echten Zitate.
- **Schätzkarten:** Nur die 7 Karten mit Quelle aus dem Konzept sind spielbar. Die übrigen 17 stehen als
  «braucht eine geprüfte Zahl» im Set. Keine Zahl ohne Quelle.
- **Nature Connection Index:** Die App zeigt den ungewichteten Mittelwert (1 bis 7) und sagt das dazu.
  Die offizielle Gewichtung (0 bis 100) der University of Derby muss noch eingesetzt werden.
  Die deutschen NCI-Aussagen sind eine Arbeitsübersetzung.
- **JRC-Definitionen:** Am 16. Oktober 2026 Wort für Wort gegen die Karten des JRC-Spiels (JRC139070) geprüft. Sie stimmen.
- **Englische Kartentexte** sind ein Entwurf. Laut Konzept werden die deutschen Texte direkt geschrieben, nicht übersetzt.
- **Tafel-Wertung:** Treffsicherheit pro Gruppe = 100 × (1 − |log10(Schätzung / Antwort)|), mindestens 0.
  Treffer 100, Faktor 2 daneben etwa 70, ab Faktor 10 null. Bei «Stimmt’s?» der Anteil der Gruppe, der richtig lag.

## Starten

**Am einfachsten: `GreenComp-erleben.html`.** Die ganze App in einer Datei. Doppelklick öffnet sie in jedem aktuellen Browser,
auch ohne Internet (nur die Schriften kommen dann aus dem System). Man kann sie per Mail schicken, auf einen USB-Stick legen oder auf
jeden Webspace hochladen. Fortschritt und Namen bleiben im Browser des jeweiligen Geräts. Neu erzeugen nach jeder Änderung:
`python3 einzeldatei.py`. **Für Handys und WhatsApp einen Link schicken, nicht die Datei.** Eine HTML-Datei im Chat öffnet das iPhone nur als Vorschau,
ohne dass die App läuft; auf Android hängt es vom Gerät ab. Ein Link öffnet sich überall im Browser. Dafür die Datei auf einen Webspace
legen (zum Beispiel GitHub Pages) oder den Link des veröffentlichten Artefakts teilen. Hinweis: QR-Codes führen auf die Adresse, unter der die App läuft. Für gedruckte Karten und Deckel deshalb
in der Werkstatt die eigene Adresse eintragen.

Als Ordner: keine Installation. Lokal reicht ein beliebiger statischer Server, zum Beispiel:

```bash
npx serve .
```

Für GitHub Pages den Ordner als Seite veröffentlichen. Auf Karten und Deckel kommt nie die GitHub-Adresse,
sondern eine eigene Domain, die weiterleitet (in der Werkstatt einstellbar).

Externe Abhängigkeiten: Google Fonts (Atkinson Hyperlegible, Barlow Condensed) und `qrcode-generator@1.4.4`
von jsDelivr. Fällt das Netz aus, zeigt die App statt des QR-Codes die Adresse als Text.

## Dateien

Inhalte:
- `data.js`: Karteninhalte (EN/DE), Joker, die 17 UNO-Ziele, Schätzkarten mit Quellen, Spaziergang-Skript
- `pieces.js`: die drei Fenster-Stücke pro Kompetenz (Klang, Stimme, Bild)
- `guide.js`: Spielanleitung, Leichte Sprache, Einführung, Ziele, Fundstücke, Signale
- `i18n.js`: Oberflächentexte (EN/DE)

Programm (in dieser Ladereihenfolge):
- `audio.js`: Klang-Engine (Vogelarten, Klanglandschaften, Signale)
- `core.js`: Speicher, Sprache, Hilfsfunktionen, Stimme, Zeitsteuerung, Overlays, Meldungen, Fundstücke
- `cards.js`: Kartendarstellung, Grossansicht, Joker-Karten, Set, Lösungsheft
- `joker.js`: Joker schreiben (Editor mit Vorschau und Sprach-Check)
- `deckel.js`: der Bierdeckel (eine Zeichnung für App, Scan-Seite und Druckdaten), Seite nach dem Scan, Druckseite
- `viz.js`: Wertung und animierte Auflösungen
- `scenes.js`: das Fenster mit allen Szenen
- `play.js`: Fünf Minuten, Spaziergang, Schätz-Training
- `tafel.js`: die Tafel
- `spielen.js`: «Jetzt spielen», das geführte Spiel Schritt für Schritt, und «Vorbereiten»
- `pages.js`: Start, Kompetenz, Station, Mein Weg, Anleitung, Messung, Werkstatt
- `app.js`: Navigation und Start
- `index.html`: Gerüst und Gestaltung
- `sw.js`, `manifest.webmanifest`, `icon.svg`: offline und installierbar
- `vendor/qrcode-generator-1.4.4.js`: QR-Bibliothek von Kazuhiko Arase (MIT), für die Einzeldatei
- `einzeldatei.py`, `GreenComp-erleben.html`: baut die App als eine Datei zum Weitergeben

Dokumente:
- `KARTENTEXTE.md`: alle Kartentexte und Anweisungen zum Überarbeiten (aus den App-Daten erzeugt)
- `SPRACHE.md`: die Sprachregeln und die Messung
- `ANALYSE-ORIGINAL.md`: Vergleich mit dem JRC-Spiel, Recherche, Vorschläge
- `DECKEL.md`: der Bierdeckel als Werbemittel: Erkennungszeichen, die zwölf Deckel, Druckangaben, Prüfung, Quellen

## Lizenz

Aufgebaut auf «The GreenComp Game», European Commission, Joint Research Centre; Szkola, Napoli, Pisiotis,
Williquet, 2024, JRC139070, CC BY 4.0. Geändert: Neugier-Fragen, Aufgaben, Spur-, Funken-, Stille-,
Schätz-, Versprechen- und Joker-Karten ergänzt. Dieser Entwurf steht ebenfalls unter CC BY 4.0.
