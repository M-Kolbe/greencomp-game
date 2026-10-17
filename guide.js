/* GreenComp Trails — guide (Spielanleitung), finds (badges), walk signals. EN + DE, plus easy read. */
(function () {
  var D = window.GCT_DATA;

  /* Sounds that mark a new step on the walk and the end of the hourglass. Synthesised in audio.js. */
  D.signals = [
    { id: "blackbird", name: { en: "Blackbird", de: "Amsel" } },
    { id: "greattit", name: { en: "Great tit", de: "Kohlmeise" } },
    { id: "cuckoo", name: { en: "Cuckoo", de: "Kuckuck" } },
    { id: "woodpecker", name: { en: "Woodpecker", de: "Specht" } },
    { id: "bowl", name: { en: "Singing bowl", de: "Klangschale" } }
  ];

  /* Finds: the digital twin of the real finds (leaf, stone, cone) a group lays on the area card.
   * Solo play has no points (concept); finds mark what you did, not how well. */
  D.badges = [
    { id: "first", icon: "foot", color: "--a-values", name: { en: "First trace", de: "Erste Spur" }, how: { en: "Finish your first round or walk.", de: "Spiel deine erste Runde oder deinen ersten Spaziergang zu Ende." } },
    { id: "outside", icon: "cloud", color: "--a-complex", name: { en: "In any weather", de: "Bei jedem Wetter" }, how: { en: "Do a task really outdoors.", de: "Mach eine Aufgabe wirklich draussen." } },
    { id: "trails5", icon: "fork", color: "--sign", name: { en: "All five paths", de: "Alle fünf Wege" }, how: { en: "Play each of the five trail cards once.", de: "Spiel jede der fünf Spurkarten einmal." } },
    { id: "spark", icon: "spark", color: "--blaze", name: { en: "Sparks fly", de: "Funkenflug" }, how: { en: "Draw a spark card.", de: "Zieh eine Funkenkarte." } },
    { id: "silence", icon: "feather", color: "--a-futures", name: { en: "Held the silence", de: "Stille gehalten" }, how: { en: "Stay with two minutes of silence on a walk, or sixty seconds on the board.", de: "Halte zwei Minuten Stille auf einem Spaziergang aus, oder 60 Sekunden an der Tafel." } },
    { id: "areas4", icon: "compass", color: "--a-acting", name: { en: "Four areas", de: "Vier Bereiche" }, how: { en: "Play a card from each of the four areas.", de: "Spiel eine Karte aus jedem der vier Bereiche." } },
    { id: "promise", icon: "seed", color: "--a-values", name: { en: "Promised", de: "Versprochen" }, how: { en: "Write your first promise.", de: "Schreib dein erstes Versprechen." } },
    { id: "kept", icon: "sprout", color: "--a-values", name: { en: "Kept my word", de: "Wort gehalten" }, how: { en: "Keep a promise for seven days.", de: "Halte ein Versprechen sieben Tage lang." } },
    { id: "spoton", icon: "target", color: "--a-complex", name: { en: "Spot on", de: "Treffsicher" }, how: { en: "Get an estimate within ten percent.", de: "Triff eine Schätzung auf zehn Prozent genau." } },
    { id: "ear", icon: "ear", color: "--a-futures", name: { en: "Good ear", de: "Gutes Ohr" }, how: { en: "Solve the listening puzzle in the window of «Critical thinking».", de: "Löse das Hör-Rätsel im Fenster von «Kritisches Denken»." } },
    { id: "reader", icon: "eye", color: "--a-complex", name: { en: "Tracker", de: "Spurenleser" }, how: { en: "Read the guide to the end.", de: "Lies die Anleitung bis zum Schluss." } },
    { id: "leader", icon: "flag", color: "--a-acting", name: { en: "Game leader", de: "Spielleitung" }, how: { en: "Lead a board game to the group of the day.", de: "Leite ein Spiel an der Tafel bis zur Gruppe des Tages." } },
    { id: "walks3", icon: "boot", color: "--a-futures", name: { en: "Three walks", de: "Drei Spaziergänge" }, how: { en: "Take three walks.", de: "Geh drei Spaziergänge." } },
    { id: "walks12", icon: "peak", color: "--a-acting", name: { en: "Twelve weeks", de: "Zwölf Wochen" }, how: { en: "Take all twelve walks.", de: "Geh alle zwölf Spaziergänge." } },
    { id: "coasters", icon: "coaster", color: "--a-complex", name: { en: "Coaster hunt", de: "Deckel-Jagd" }, how: { en: "Scan three different coasters.", de: "Scanne drei verschiedene Deckel." } },
    { id: "joker", icon: "joker", color: "--a-futures", name: { en: "Own card", de: "Eigene Karte" }, how: { en: "Write a joker card.", de: "Schreib eine Joker-Karte." } },
    { id: "master", icon: "crown", color: "--sign", name: { en: "Master card", de: "Meisterkarte" }, how: { en: "Collect ten finds.", de: "Sammle zehn Fundstücke." } }
  ];

  /* Why a group plays today. Said in the briefing and asked again in the debrief. */
  D.goals = [
    { id: "meet", t: { en: "Get to know each other", de: "Einander kennenlernen" } },
    { id: "topic", t: { en: "Start a topic", de: "In ein Thema einsteigen" } },
    { id: "recharge", t: { en: "Recharge outdoors", de: "Draussen auftanken" } },
    { id: "change", t: { en: "Change something", de: "Etwas verändern" } },
    { id: "play", t: { en: "Just play", de: "Einfach spielen" } },
    /* «Original plus»: the JRC game becomes round 0. The group picks a UN goal first, then the skills it needs. */
    { id: "sdg", t: { en: "Work on a UN goal (as in the original)", de: "An einem UNO-Ziel arbeiten (wie im Original)" } }
  ];
  /* The five innovation areas of EducationForClimate. In the JRC game a group picks one of them in round 2.
   * Here they are offered under the goal «as in the original», so that a group can replay the original almost one to one. */
  D.e4c = [
    { id: "competences", t: { en: "Develop green competences", de: "Grüne Fähigkeiten stärken" } },
    { id: "teachers", t: { en: "Train teachers", de: "Lehrende schulen" } },
    { id: "science", t: { en: "Bridge education with science", de: "Schule und Wissenschaft verbinden" } },
    { id: "awareness", t: { en: "Raise awareness", de: "Aufmerksamkeit schaffen" } },
    { id: "behaviour", t: { en: "Change behaviours", de: "Verhalten ändern" } }
  ];

  /* What this is about, said once and shown at the start: on the home page, in the guide and in the briefing. */
  D.about = {
    items: [
      { icon: "globe", t: { en: "What is GreenComp?", de: "Was ist GreenComp?" },
        d: { en: "GreenComp is a framework of the European Union. It describes twelve skills we all need for a sustainable future, in four areas: values, complexity, future and action. The Joint Research Centre (JRC) of the European Commission published it in 2022.", de: "GreenComp ist ein Rahmen der Europäischen Union. Er beschreibt zwölf Fähigkeiten, die wir alle für eine nachhaltige Zukunft brauchen, in vier Bereichen: Werte, Komplexität, Zukunft und Handeln. Herausgegeben hat ihn 2022 die Gemeinsame Forschungsstelle (JRC) der EU-Kommission." } },
      { icon: "compass", t: { en: "What is the goal?", de: "Was ist das Ziel?" },
        d: { en: "Not to read about these skills, but to experience them: outside, with hands, ears and eyes, and in conversation with others. What you have felt yourself, you understand better and use more often.", de: "Diese Fähigkeiten nicht lesen, sondern erleben: draussen, mit Händen, Ohren und Augen und im Gespräch mit anderen. Was man selbst gespürt hat, versteht man besser und braucht es eher im Alltag." } },
      { icon: "seed", t: { en: "What do you take home?", de: "Was nehmt ihr mit?" },
        d: { en: "The group agrees on one small shared plan. Everyone writes a promise for the next seven days. And you see the place where you played a little differently.", de: "Die Gruppe einigt sich auf ein kleines gemeinsames Vorhaben. Jede Person schreibt ein Versprechen für die nächsten sieben Tage. Und ihr seht den Ort, an dem ihr gespielt habt, ein wenig anders." } },
      { icon: "table", t: { en: "Who is it for?", de: "Für wen?" },
        d: { en: "For everyone, without prior knowledge: school classes, teams, clubs, families. In a group of 3 to 5, a whole room, or alone.", de: "Für alle, ohne Vorwissen: Schulklassen, Teams, Vereine, Familien. In einer Gruppe von 3 bis 5, als ganzer Raum oder allein." } }
    ],
    brief: { en: "What this is about: GreenComp describes twelve skills we all need for a sustainable future. Today you experience them outside instead of reading about them. At the end there is one small shared plan.", de: "Darum geht es: GreenComp beschreibt zwölf Fähigkeiten, die wir alle für eine nachhaltige Zukunft brauchen. Heute erlebt ihr sie draussen, statt darüber zu lesen. Am Schluss steht ein kleines gemeinsames Vorhaben." },
    briefSolo: { en: "What this is about: GreenComp describes twelve skills we all need for a sustainable future. Here you experience one of them, instead of reading about it.", de: "Darum geht es: GreenComp beschreibt zwölf Fähigkeiten, die wir alle für eine nachhaltige Zukunft brauchen. Hier erlebst du eine davon, statt darüber zu lesen." },
    source: { en: "Based on GreenComp (JRC, 2022) and the GreenComp Game of the JRC (2024).", de: "Grundlage: GreenComp (JRC, 2022) und das GreenComp Game des JRC (2024)." }
  };

  /* What the game leader does before the day. Based on outdoor-learning practice: walk the site, note hazards, check again on the day. */
  D.prep = [
    { id: "place", t: { en: "Walk the place and pick four stations", de: "Ort ablaufen und vier Stationen wählen" }, d: { en: "One station per area, two to five minutes apart on foot. Put a coaster in the area colour at each station. The area cards stay in the group’s bag.", de: "Eine Station pro Bereich, zwei bis fünf Minuten zu Fuss auseinander. Legt an jede Station einen Bierdeckel mit der Bereichsfarbe. Die Bereichskarten bleiben im Beutel der Gruppe." } },
    { id: "hazards", t: { en: "Note the hazards", de: "Gefahren notieren" }, d: { en: "Water, roads, bikes, things to trip on, poisonous plants. Check again on the day.", de: "Wasser, Strasse, Velos, Stolperstellen, giftige Pflanzen. Am Spieltag noch einmal kurz prüfen." } },
    { id: "rain", t: { en: "Plan B for rain", de: "Plan B für Regen" }, d: { en: "Which station works under a roof? The leading phone goes in a zip bag; the screen still works through the plastic. Rain is no reason to cancel.", de: "Welche Station geht unter einem Dach? Das Leitungs-Handy kommt in einen Zipbeutel; der Bildschirm reagiert auch durch die Folie. Regen ist kein Grund abzusagen." } },
    { id: "access", t: { en: "Check for barriers", de: "Barrieren prüfen" }, d: { en: "Can everyone reach every station, seated and without stairs? Every card has a second form.", de: "Ist jede Station sitzend und ohne Treppe erreichbar? Jede Karte hat eine zweite Form." } },
    { id: "material", t: { en: "Get the material ready", de: "Material bereitlegen" }, d: { en: "Card set, hourglass or this phone, pens for the promise cards, four coasters for the stations, a zip bag.", de: "Kartenset, Sanduhr oder dieses Handy, Stifte für die Versprechen-Karten, vier Bierdeckel für die Stationen, ein Zipbeutel." } },
    { id: "phone", t: { en: "Charge one phone and test the sound", de: "Ein Handy laden und den Ton testen" }, d: { en: "It plays the sounds and keeps time. Try «Play now» up to the first step.", de: "Es spielt die Klänge und hält die Zeit. Probiert «Jetzt spielen» bis zum ersten Schritt aus." } },
    { id: "groups", t: { en: "Plan the groups", de: "Gruppen planen" }, d: { en: "Three to five people per group. With several groups, open the board and enter the groups.", de: "3 bis 5 Personen pro Gruppe. Bei mehreren Gruppen die Tafel öffnen und die Gruppen eintragen." } },
    { id: "time", t: { en: "Plan the time", de: "Zeit planen" }, d: { en: "Use the time planner below. Bigger groups talk a little longer.", de: "Nutzt den Zeitplaner unten. Grössere Gruppen reden etwas länger." } }
  ];

  D.guide = {
    quick: [
      { icon: "card", t: { en: "Draw a skill card", de: "Fähigkeitskarte ziehen" }, d: { en: "Read the curiosity question out loud.", de: "Die Neugier-Frage laut vorlesen." } },
      { icon: "fork", t: { en: "Draw a trail card", de: "Spurkarte ziehen" }, d: { en: "It decides how you do the task.", de: "Sie bestimmt, wie ihr die Aufgabe macht." } },
      { icon: "hand", t: { en: "Make it real", de: "Mach es echt" }, d: { en: "2 to 4 minutes, at the place where you are, one step after another. The card says how long.", de: "2 bis 4 Minuten, an dem Ort, an dem ihr seid, einen Schritt nach dem anderen. Die Karte sagt, wie lange." } },
      { icon: "talk", t: { en: "Talk", de: "Reden" }, d: { en: "Draw a conversation card. Whoever asks answers first.", de: "Gesprächskarte ziehen. Wer fragt, antwortet zuerst." } }
    ],
    bag: [
      { type: "area", n: 4, edge: "edge-square", t: { en: "Area cards", de: "Bereichskarten" }, d: { en: "Travel with the group; the finds are laid on them. QR code for the station sound indoors.", de: "Reisen mit der Gruppe mit; auf ihnen liegen die Fundstücke. QR-Code für den Klang zur Station, drinnen." } },
      { type: "comp", n: 12, edge: "edge-circle", t: { en: "Skill cards", de: "Fähigkeitskarten" }, d: { en: "Curiosity question and task on the front. On the back: the JRC definition, the solo form, the second form and the window.", de: "Vorne Neugier-Frage und Aufgabe. Hinten die Definition des JRC, die Form für allein, die zweite Form und das Fenster." } },
      { type: "trail", n: 5, edge: "edge-arrow", t: { en: "Trail cards", de: "Spurkarten" }, d: { en: "Senses, emotion, beauty, meaning, care.", de: "Sinne, Gefühl, Schönheit, Bedeutung, Fürsorge." } },
      { type: "talk", n: 24, edge: "edge-circle", t: { en: "Conversation cards", de: "Gesprächskarten" }, d: { en: "Round, with a photo. Two per skill.", de: "Rund, mit Foto. Zwei pro Fähigkeit." } },
      { type: "est", n: 24, edge: "edge-diamond", t: { en: "Estimate cards", de: "Schätzkarten" }, d: { en: "A number or a claim. The answer is on the board or in the phone: the surprise is the reward.", de: "Eine Zahl oder eine Behauptung. Die Antwort steht auf der Tafel oder im Handy: Die Überraschung ist der Lohn." } },
      { type: "spark", n: 6, edge: "edge-tri", t: { en: "Spark cards", de: "Funkenkarten" }, d: { en: "Small rule changes that make a task surprising.", de: "Kleine Regeländerungen, die eine Aufgabe überraschend machen." } },
      { type: "silence", n: 5, edge: "edge-stripe", t: { en: "Silence cards", de: "Stille-Karten" }, d: { en: "Interrupt and ground. At least one per game.", de: "Unterbrechen und erden. Mindestens eine pro Spiel." } },
      { type: "promise", n: 12, edge: "edge-circle", t: { en: "Promise cards", de: "Versprechen-Karten" }, d: { en: "Seed paper. Written, pocketed, planted after seven days.", de: "Saatpapier. Beschrieben, eingesteckt, nach sieben Tagen gepflanzt." } },
      { type: "joker", n: 4, edge: "edge-star", t: { en: "Joker cards", de: "Joker-Karten" }, d: { en: "Blank. The group writes its own card for its place. Once per game.", de: "Leer. Die Gruppe schreibt eine eigene Karte für ihren Ort. Einmal pro Spiel." } }
    ],
    extras: [
      { t: { en: "5-minute hourglass", de: "5-Minuten-Sanduhr" }, d: { en: "When the sand has run through, time is up, even mid-sentence.", de: "Wenn der Sand durch ist, ist Schluss, auch mitten im Satz." } },
      { t: { en: "Answer booklet", de: "Lösungsheft" }, d: { en: "For a game without a board.", de: "Für ein Spiel ohne Tafel." } },
      { t: { en: "Coasters", de: "Bierdeckel" }, d: { en: "Twelve, one per question. They lie on tables where people meet. A phone camera on the code, and the game starts at that table. In the expedition, a coaster marks each station.", de: "Zwölf, einer pro Frage. Sie liegen auf Tischen, wo Leute zusammensitzen. Handykamera auf den Code, und das Spiel beginnt an diesem Tisch. Bei der Expedition markiert ein Deckel jede Station." } }
    ],
    rules: [
      { icon: "tree", t: { en: "Real first", de: "Zuerst echt" }, d: { en: "Whatever can be done for real is done for real. The window opens only when the real thing is not possible.", de: "Was echt geht, wird echt gemacht. Das Fenster geht nur auf, wenn es echt nicht geht." } },
      { icon: "phone", t: { en: "Phones face down", de: "Handys nach unten" }, d: { en: "All phones lie in the middle, screens down, for the whole game. The phone that leads the game too: it chimes when the time is up.", de: "Alle Handys liegen das ganze Spiel über in der Mitte, Bildschirm nach unten. Auch das Handy, das das Spiel führt: Es klingt, wenn die Zeit um ist." } },
      { icon: "talk", t: { en: "Whoever asks answers first", de: "Wer fragt, antwortet zuerst" }, d: { en: "On every conversation card.", de: "Auf jeder Gesprächskarte." } },
      { icon: "cloud", t: { en: "Outdoors in any weather", de: "Draussen bei jedem Wetter" }, d: { en: "Rain is no reason to stay in.", de: "Regen ist kein Grund, drinnen zu bleiben." } },
      { icon: "hand", t: { en: "Nobody has to", de: "Niemand muss" }, d: { en: "Every task is an offer. You may pass, and nobody asks why.", de: "Jede Aufgabe ist ein Angebot. Passen ist erlaubt, und niemand fragt nach dem Warum." } }
    ],
    roles: [
      { icon: "card", t: { en: "Game leader", de: "Spielleitung" }, d: { en: "Reads the card out loud and keeps time.", de: "Liest die Karte vor und hält die Zeit." } },
      { icon: "phone", t: { en: "Silence keeper", de: "Stille-Hüterin oder Stille-Hüter" }, d: { en: "Collects the phones at the start. The only one who may lift a phone, and only for a window.", de: "Sammelt zu Beginn die Handys ein. Darf als Einzige oder Einziger ein Handy heben, und nur für ein Fenster." } },
      { icon: "eye", t: { en: "Tracker", de: "Spurenleserin oder Spurenleser" }, d: { en: "Checks that the task really follows the trail card, for example really with eyes closed.", de: "Achtet darauf, dass die Aufgabe wirklich auf dem Weg der Spurkarte gemacht wird, zum Beispiel wirklich mit geschlossenen Augen." } }
    ],
    /* 60 minutes: arrive 2, briefing 1, choose 2, four stations of 11, debrief 8, promise 2, next leader 1.
     * First do, then talk: the silence card comes before the briefing. The debrief is where most of the learning happens (see ANALYSE-ORIGINAL.md). */
    expedition: [
      { min: 2, k: "arrive", t: { en: "Arrive", de: "Ankommen" }, d: { en: "Form groups, phones in the middle, draw a silence card and do it.", de: "Gruppen bilden, Handys in die Mitte, eine Stille-Karte ziehen und tun." } },
      { min: 1, k: "brief", t: { en: "Briefing", de: "Einführung" }, d: { en: "Why are you playing today? Three rules. Roles.", de: "Wozu spielt ihr heute? Drei Regeln. Rollen." } },
      { min: 2, k: "choose", t: { en: "Choose", de: "Wählen" }, d: { en: "Each group picks the skill it needs most. It is played at its own station. Or: play one station first, then choose.", de: "Jede Gruppe wählt die Fähigkeit, die sie am meisten braucht. Sie wird an ihrer Station gespielt. Oder: erst eine Station spielen, dann wählen." } },
      { min: 11, k: "s1", t: { en: "Station 1", de: "Station 1" }, d: null },
      { min: 11, k: "s2", t: { en: "Station 2", de: "Station 2" }, d: null },
      { min: 11, k: "s3", t: { en: "Station 3", de: "Station 3" }, d: null },
      { min: 11, k: "s4", t: { en: "Station 4", de: "Station 4" }, d: null },
      { min: 8, k: "debrief", t: { en: "Debrief", de: "Nachbesprechung" }, d: { en: "Three questions: What happened? What does it mean for us? What do we do now? It ends with a shared plan. The finds lie side by side.", de: "Drei Fragen: Was ist passiert? Was heisst das für uns? Was machen wir damit? Am Ende steht ein gemeinsames Vorhaben. Die Fundstücke liegen nebeneinander." } },
      { min: 2, k: "promise", t: { en: "Promise", de: "Versprechen" }, d: { en: "Everyone writes one action for the next seven days on a promise card and keeps it.", de: "Jede Person schreibt eine Handlung für die nächsten sieben Tage auf eine Versprechen-Karte und steckt sie ein." } },
      { min: 1, k: "leader", t: { en: "Next game leader", de: "Nächste Spielleitung" }, d: { en: "Count to three, everyone points at the same time at the person who leads the next game. No points, no winner.", de: "Bis drei zählen, alle zeigen gleichzeitig auf die Person, die das nächste Spiel leitet. Ohne Punkte, ohne Sieg." } }
    ],
    station: [
      { sec: 20, t: { en: "Listen", de: "Zuhören" }, d: { en: "Twenty seconds, eyes closed, listen to the place. Indoors, the board plays a sound.", de: "Zwanzig Sekunden, Augen zu, dem Ort zuhören. Drinnen spielt die Tafel einen Klang." } },
      { sec: 240, t: { en: "Task", de: "Aufgabe" }, d: { en: "Draw a skill card and a trail card, then do the three steps, one after another. The card says how long.", de: "Fähigkeitskarte und Spurkarte ziehen, dann die drei Schritte, einer nach dem anderen. Die Karte sagt, wie lange." } },
      { sec: 180, t: { en: "Talk", de: "Gespräch" }, d: { en: "Draw a conversation card. Whoever asks answers first. The rest of the time up to 7:20.", de: "Gesprächskarte ziehen. Wer fragt, antwortet zuerst. Die restliche Zeit bis 7:20." } },
      { sec: 120, t: { en: "Estimate", de: "Schätzen" }, d: { en: "Everyone guesses, then the answer. Who came closest?", de: "Alle schätzen, dann die Auflösung. Wer lag am nächsten?" } },
      { sec: 100, t: { en: "One sentence and a find", de: "Ein Satz und ein Fundstück" }, d: { en: "One sentence each: what do I take with me? Then find something real and lay it on your area card. It comes with you.", de: "Ein Satz pro Person: Was nehme ich mit? Dann ein echtes Fundstück suchen und auf eure Bereichskarte legen. Es kommt mit." } }
    ],
    modes: [
      { id: "expedition", t: { en: "Expedition", de: "Expedition" }, meta: { en: "60 min · 3–5 per group", de: "60 Min. · 3–5 pro Gruppe" } },
      { id: "five", t: { en: "Five minutes", de: "Fünf Minuten" }, meta: { en: "5 min · any group", de: "5 Min. · jede Gruppe" },
        steps: [
          { en: "One skill card, one trail card.", de: "Eine Fähigkeitskarte, eine Spurkarte." },
          { en: "Do the task.", de: "Die Aufgabe machen." },
          { en: "One sentence each.", de: "Ein Satz pro Person." }
        ],
        note: { en: "A way into a meeting or a seminar.", de: "Als Einstieg in eine Sitzung oder ein Seminar." } },
      { id: "original", t: { en: "Original plus", de: "Original plus" }, meta: { en: "60 min + UN goal · schools, training", de: "60 Min. + UNO-Ziel · Schule, Weiterbildung" },
        steps: [
          { en: "Round 0, as in the JRC game: the group picks one UN Sustainable Development Goal.", de: "Runde 0 wie im Spiel des JRC: Die Gruppe wählt ein Nachhaltigkeitsziel der UNO." },
          { en: "Everyone gives one dot to the skill this goal needs most.", de: "Jede Person gibt einen Punkt der Fähigkeit, die dieses Ziel am meisten braucht." },
          { en: "The chosen skills wait at their stations and are lived with their task.", de: "Die gewählten Fähigkeiten liegen an ihren Stationen bereit und werden mit ihrer Aufgabe erlebt." },
          { en: "At the end the groups compare their choices, as in the original, and may share them in the GreenComp community.", de: "Am Schluss vergleichen die Gruppen ihre Wahl, wie im Original, und dürfen sie in der GreenComp-Community teilen." }
        ],
        note: { en: "In the app: choose the goal «Work on a UN goal», then one of the five innovation areas of EducationForClimate (as in round 2 of the original). Or add round 0 when choosing. Schools can plan a lesson on the goal at the end.", de: "In der App: das Ziel «An einem UNO-Ziel arbeiten» wählen, dann einen der fünf Innovationsbereiche von EducationForClimate (wie in Runde 2 des Originals). Oder beim Wählen «Runde 0» dazunehmen. Schulen planen am Schluss eine Lektion zum Ziel." } },
      { id: "walk", t: { en: "The walk", de: "Der Spaziergang" }, meta: { en: "10 min · alone", de: "10 Min. · allein" },
        steps: [
          { en: "Take a skill card, your phone and headphones. Go out.", de: "Nimm eine Fähigkeitskarte, dein Handy und Kopfhörer. Geh los." },
          { en: "Scan the code on the card and choose «Walk». A voice leads you to the place, then goes quiet for two minutes. A bird marks the end.", de: "Scanne den Code auf der Karte und wähle «Spaziergang». Eine Stimme führt dich zum Ort und schweigt dann zwei Minuten. Ein Vogel zeigt das Ende an." },
          { en: "At home, write your promise on a promise card. One card a week makes twelve weeks.", de: "Zu Hause schreibst du dein Versprechen auf eine Versprechen-Karte. Eine Karte pro Woche ergibt zwölf Wochen." }
        ],
        note: { en: "Without a phone: each skill card carries its solo form on the back.", de: "Ohne Handy: Jede Fähigkeitskarte trägt ihre Form für allein auf der Rückseite." } }
    ],
    fun: [
      { icon: "spark", t: { en: "Sparks", de: "Funken" }, d: { en: "At every station the group decides whether to draw a spark. Once per game is a must.", de: "An jeder Station entscheidet die Gruppe, ob sie einen Funken zieht. Einmal pro Spiel ist Pflicht." } },
      { icon: "leaf", t: { en: "Collecting finds", de: "Spuren sammeln" }, d: { en: "After each station the group finds a real object outside (leaf, stone, cone) and takes it along. At the debrief, each group’s four finds lie side by side.", de: "Nach jeder Station sucht die Gruppe draussen ein echtes Fundstück (Blatt, Stein, Zapfen) und nimmt es mit. Bei der Nachbesprechung liegen die vier Fundstücke jeder Gruppe nebeneinander." } },
      { icon: "hourglass", t: { en: "One clock", de: "Eine Uhr" }, d: { en: "One hourglass for the whole task: a real one, or the one in the phone, which then lies face down. Nobody looks at a device. When the sand has run through, time is up.", de: "Eine Sanduhr für die ganze Aufgabe: eine echte oder die im Handy, das dann mit dem Bildschirm nach unten liegt. Niemand schaut auf ein Gerät. Wenn der Sand durch ist, ist Schluss." } },
      { icon: "joker", t: { en: "Joker", de: "Joker" }, d: { en: "Once per game the group may write its own card instead of the one it drew: a question, three steps, a clear end. About three minutes.", de: "Einmal pro Spiel darf die Gruppe statt der gezogenen Karte eine eigene schreiben: eine Frage, drei Schritte, ein klares Ende. Etwa drei Minuten." } },
      { icon: "coaster", t: { en: "Flicking", de: "Schnipsen" }, d: { en: "Whoever flicks the coaster off the table edge and catches it may choose the trail. Ten seconds.", de: "Wer den Deckel von der Tischkante schnipst und fängt, darf die Spur wählen. Zehn Sekunden." } }
    ],
    access: [
      { en: "Every task has a second form on the card: seated, without seeing, without hearing.", de: "Jede Aufgabe hat eine zweite Form auf der Karte: sitzend, ohne Sehen, ohne Hören." },
      { en: "The «Text» door shows everything there is to hear, as writing. Windows have subtitles.", de: "Die Tür «Text» zeigt alles, was zu hören ist, als Schrift. Die Fenster haben Untertitel." },
      { en: "The walk voice reads the whole card out loud.", de: "Die Spaziergang-Stimme liest die ganze Karte vor." },
      { en: "Large type, high contrast, and every card type has its own shape at the edge, not only a colour.", de: "Grosse Schrift, hoher Kontrast, und jeder Kartentyp hat eine eigene Form am Rand, nicht nur eine Farbe." },
      { en: "Every area has its own sign as well as its colour: a heart, a network, a sunrise, a rising arrow.", de: "Jeder Bereich hat neben der Farbe ein eigenes Zeichen: Herz, Netz, Sonnenaufgang, steigender Pfeil." }
    ],
    /* Easy read (Leichte Sprache): short sentences, one idea per line. */
    easy: [
      { h: { en: "What is this?", de: "Was ist das?" }, p: [
        { en: "This is a card game.", de: "Das ist ein Karten-Spiel." },
        { en: "It is about nature and the future.", de: "Es geht um Natur und Zukunft." },
        { en: "You play outside.", de: "Ihr spielt draussen." },
        { en: "You play in a group of 3 to 5 people. Or alone.", de: "Ihr spielt in einer Gruppe mit 3 bis 5 Menschen. Oder allein." }
      ] },
      { h: { en: "How do you play?", de: "Wie spielt man?" }, p: [
        { en: "First, choose a card that matters to you.", de: "Zuerst wählt ihr eine Karte aus, die euch wichtig ist." },
        { en: "Take a skill card. It has a question.", de: "Nehmt eine Fähigkeitskarte. Darauf steht eine Frage." },
        { en: "Take a trail card. It says how you do the task.", de: "Nehmt eine Spurkarte. Sie sagt, wie ihr die Aufgabe macht." },
        { en: "Do what the card says. For example: touch a tree.", de: "Macht, was auf der Karte steht. Zum Beispiel: einen Baum anfassen." },
        { en: "You may also write your own card. It is called the joker.", de: "Ihr dürft auch eine eigene Karte schreiben. Sie heisst Joker." },
        { en: "Then talk about it.", de: "Dann redet darüber." }
      ] },
      { h: { en: "The rules", de: "Die Regeln" }, p: [
        { en: "Put your phones in the middle.", de: "Legt die Handys in die Mitte." },
        { en: "The screen points down.", de: "Der Bildschirm zeigt nach unten." },
        { en: "Whoever asks a question answers first.", de: "Wer eine Frage stellt, antwortet zuerst." },
        { en: "Go outside, even when it rains.", de: "Geht raus, auch wenn es regnet." },
        { en: "Nobody has to do anything. You may say: I pass.", de: "Niemand muss etwas tun. Ihr dürft sagen: Ich passe." }
      ] },
      { h: { en: "Guessing", de: "Raten" }, p: [
        { en: "There are cards with a number to guess.", de: "Es gibt Karten mit einer Zahl zum Raten." },
        { en: "Everyone guesses. Then you see the answer.", de: "Alle raten. Dann seht ihr die Antwort." },
        { en: "Who was closest? There are no points.", de: "Wer lag am nächsten? Punkte gibt es keine." }
      ] },
      { h: { en: "At the end", de: "Am Schluss" }, p: [
        { en: "You talk together: What happened today?", de: "Ihr redet zusammen: Was war heute?" },
        { en: "You agree on one thing to do as a group.", de: "Ihr sucht zusammen eine Sache aus, die ihr tun wollt." },
        { en: "Write on a card what you will do in the next 7 days.", de: "Schreib auf eine Karte, was du in den nächsten 7 Tagen tust." },
        { en: "Keep the card.", de: "Behalte die Karte." },
        { en: "After 7 days, show it to someone from your group.", de: "Zeig sie nach 7 Tagen jemandem aus deiner Gruppe." },
        { en: "Count to three. Everyone points at one person. This person leads the next game.", de: "Zählt bis drei. Alle zeigen auf eine Person. Diese Person leitet das nächste Spiel." }
      ] }
    ]
  };
})();
