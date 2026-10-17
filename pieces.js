/* GreenComp Trails — the three window pieces per competence (concept, section «Natur erlebbar machen»):
 * Klang (sound), Stimme (voice), Bild (moving picture). `piece` is the one the card names as its window.
 * Existing `win` entries in data.js are reused as voice or picture; this file adds the missing ones.
 * All voice texts are script drafts for recording, not quotes from real people.
 */
(function () {
  var D = window.GCT_DATA;
  var P = {
    "valuing-sustainability": {
      piece: "voice",
      sound: { preset: "windBell", dur: 62,
        title: { en: "Wind in the grass, a bell far away", de: "Wind im Gras, eine Glocke in der Ferne" },
        steps: [
          { at: 0, text: { en: "Close your eyes. One hand on the table.", de: "Augen zu. Eine Hand auf den Tisch." } },
          { at: 22, text: { en: "If you could keep only one thing, what would it be?", de: "Wenn du nur eines behalten dürftest, was wäre es?" } },
          { at: 55, text: { en: "Open your eyes when you are ready.", de: "Öffne die Augen, wenn du so weit bist." } }
        ] },
      picture: { kind: "seasons", dur: 36,
        steps: [
          { at: 0.5, text: { en: "One year at the same wall.", de: "Ein Jahr an derselben Wand." } },
          { at: 6, text: { en: "Spring.", de: "Frühling." } },
          { at: 13, text: { en: "Summer.", de: "Sommer." } },
          { at: 20, text: { en: "Autumn.", de: "Herbst." } },
          { at: 27, text: { en: "Winter. What stays when everything changes?", de: "Winter. Was bleibt, wenn sich alles ändert?" } }
        ] }
    },
    "supporting-fairness": {
      piece: "voice",
      sound: { preset: "footsteps", dur: 62,
        title: { en: "Footsteps on gravel, coming and going", de: "Schritte auf Kies, sie kommen und gehen" },
        steps: [
          { at: 0, text: { en: "Close your eyes. Listen to the path.", de: "Augen zu. Hör dem Weg zu." } },
          { at: 16, text: { en: "Someone was here before you.", de: "Jemand war vor dir hier." } },
          { at: 36, text: { en: "Someone comes after you.", de: "Jemand kommt nach dir." } },
          { at: 55, text: { en: "What will they find?", de: "Was werden sie vorfinden?" } }
        ] },
      picture: { kind: "footprints", dur: 40,
        steps: [
          { at: 0.5, text: { en: "A path in a park. 1990.", de: "Ein Weg in einem Park. 1990." } },
          { at: 12, text: { en: "Thousands of people walk it. Some leave something behind.", de: "Tausende gehen ihn. Manche lassen etwas liegen." } },
          { at: 24, text: { en: "Someone picks it up, and leaves a note.", de: "Jemand hebt es auf und hinterlässt einen Zettel." } },
          { at: 33, text: { en: "Who was here before you? Who comes after you?", de: "Wer war vor dir hier? Wer kommt nach dir?" } }
        ] }
    },
    "promoting-nature": {
      piece: "sound",
      sound: { preset: "forest", dur: 62,
        title: { en: "Forest at dawn", de: "Wald im Morgengrauen" },
        steps: [
          { at: 0, text: { en: "Close your eyes. Put one hand on the table.", de: "Augen zu. Eine Hand auf den Tisch." } },
          { at: 8, text: { en: "Forest at dawn.", de: "Wald im Morgengrauen." } },
          { at: 54, text: { en: "Open your eyes when you are ready.", de: "Öffne die Augen, wenn du so weit bist." } }
        ] },
      voice: { kind: "voices",
        lines: [
          { who: "elder", label: { en: "A forester", de: "Eine Försterin" },
            text: { en: "For twenty years I have walked the same path through this forest every morning.", de: "Seit zwanzig Jahren gehe ich jeden Morgen denselben Weg durch diesen Wald." } },
          { who: "elder", label: { en: "A forester", de: "Eine Försterin" },
            text: { en: "I know where the fox crosses and which beech is the last to lose its leaves.", de: "Ich weiss, wo der Fuchs den Weg kreuzt und welche Buche als letzte ihr Laub verliert." } },
          { who: "elder", label: { en: "A forester", de: "Eine Försterin" },
            text: { en: "People ask me what I do all day. I listen. The forest tells you when something is wrong, if you are quiet long enough.", de: "Die Leute fragen, was ich den ganzen Tag mache. Ich höre zu. Der Wald sagt dir, wenn etwas nicht stimmt, wenn du lange genug still bist." } }
        ] },
      picture: { kind: "forest", dur: 40, silent: true,
        steps: [
          { at: 0.5, text: { en: "One night becomes a morning.", de: "Eine Nacht wird zum Morgen." } },
          { at: 20, text: { en: "The light comes before the sun.", de: "Das Licht kommt vor der Sonne." } },
          { at: 34, text: { en: "When did you last see this outside?", de: "Wann hast du das zuletzt draussen gesehen?" } }
        ] }
    },
    "systems-thinking": {
      piece: "picture",
      sound: { preset: "streamPlant", dur: 64,
        title: { en: "A stream that flows into a treatment plant", de: "Ein Bach, der in eine Kläranlage mündet" },
        steps: [
          { at: 0, text: { en: "Close your eyes. A stream.", de: "Augen zu. Ein Bach." } },
          { at: 34, text: { en: "The same water, a little later.", de: "Dasselbe Wasser, etwas später." } },
          { at: 55, text: { en: "Where does the water from your tap go?", de: "Wohin geht das Wasser aus deinem Hahn?" } }
        ] },
      voice: { kind: "voices",
        lines: [
          { who: "adult", label: { en: "A T-shirt", de: "Ein T-Shirt" },
            text: { en: "I began as a cotton plant in the sun, far from here.", de: "Ich war eine Baumwollpflanze in der Sonne, weit weg von hier." } },
          { who: "adult", label: { en: "A T-shirt", de: "Ein T-Shirt" },
            text: { en: "Then I travelled further than you ever have. Spun, woven, dyed and sewn by hands nobody thanked.", de: "Dann bin ich weiter gereist als du je. Gesponnen, gewebt, gefärbt, genäht, von Händen, denen niemand gedankt hat." } },
          { who: "adult", label: { en: "A T-shirt", de: "Ein T-Shirt" },
            text: { en: "You wore me a few times. Now I am in a bag by the door. Where do you think I will go next?", de: "Du hast mich ein paar Mal getragen. Jetzt liege ich in einem Sack neben der Tür. Was glaubst du, wohin ich als Nächstes gehe?" } }
        ] }
    },
    "critical-thinking": {
      piece: "picture",
      sound: { preset: "birdQuiz", dur: 44,
        title: { en: "Listening puzzle: how many different birds?", de: "Hör-Rätsel: Wie viele verschiedene Vögel?" },
        steps: [
          { at: 0, text: { en: "Close your eyes. Count the different birds you hear.", de: "Augen zu. Zähl die verschiedenen Vögel, die du hörst." } },
          { at: 38, text: { en: "How many were there?", de: "Wie viele waren es?" } }
        ],
        quiz: { answer: 3, options: [1, 2, 3, 4, 5],
          reveal: { en: "Three: a great tit, a blackbird and a cuckoo. All three were made by a computer. Did you believe they were real?", de: "Drei: Kohlmeise, Amsel und Kuckuck. Alle drei hat ein Computer erzeugt. Hast du geglaubt, dass sie echt sind?" } } },
      voice: { kind: "voices",
        lines: [
          { who: "adult", label: { en: "A fact-checker", de: "Eine Faktenprüferin" },
            text: { en: "When a claim lands on my desk, I ask three questions.", de: "Wenn eine Behauptung auf meinem Tisch landet, stelle ich drei Fragen." } },
          { who: "adult", label: { en: "A fact-checker", de: "Eine Faktenprüferin" },
            text: { en: "Who says it, and what do they gain? What exactly is being claimed? And compared with what?", de: "Wer sagt das, und was hat er oder sie davon? Was genau wird behauptet? Und im Vergleich womit?" } },
          { who: "adult", label: { en: "A fact-checker", de: "Eine Faktenprüferin" },
            text: { en: "Most claims fall apart at the third question. The good ones get stronger.", de: "Die meisten Behauptungen zerfallen bei der dritten Frage. Die guten werden stärker." } }
        ] }
    },
    "problem-framing": {
      piece: "picture",
      sound: { preset: "zoomEar", dur: 62,
        title: { en: "Zooming in by ear: valley, stream, bee", de: "Mit dem Ohr heranzoomen: Tal, Bach, Biene" },
        steps: [
          { at: 0, text: { en: "Close your eyes. The whole valley.", de: "Augen zu. Das ganze Tal." } },
          { at: 20, text: { en: "Closer: a stream.", de: "Näher: ein Bach." } },
          { at: 40, text: { en: "Closer still: one bee.", de: "Noch näher: eine Biene." } },
          { at: 55, text: { en: "In which frame can you act?", de: "In welchem Rahmen könnt ihr handeln?" } }
        ] },
      voice: { kind: "voices",
        lines: [
          { who: "adult", label: { en: "A town planner", de: "Eine Stadtplanerin" },
            text: { en: "Everyone told me: the city is too hot. That is not a problem I can solve.", de: "Alle sagten mir: Die Stadt ist zu heiss. Das ist kein Problem, das ich lösen kann." } },
          { who: "adult", label: { en: "A town planner", de: "Eine Stadtplanerin" },
            text: { en: "So we asked: who suffers most? Older people on the top floors of the old town. Where? Five streets without a single tree. By when? Next summer.", de: "Also fragten wir: Wer leidet am meisten? Ältere Menschen in den oberen Stockwerken der Altstadt. Wo? Fünf Strassen ohne einen einzigen Baum. Bis wann? Nächsten Sommer." } },
          { who: "adult", label: { en: "A town planner", de: "Eine Stadtplanerin" },
            text: { en: "That was a problem we could start on the next morning.", de: "Mit diesem Problem konnten wir am nächsten Morgen anfangen." } }
        ] }
    },
    "futures-literacy": {
      piece: "picture",
      sound: { preset: "street2046", dur: 62,
        title: { en: "The same street, 2026 and 2046", de: "Dieselbe Strasse, 2026 und 2046" },
        steps: [
          { at: 0, text: { en: "Close your eyes. Today.", de: "Augen zu. Heute." } },
          { at: 26, text: { en: "2046. One possibility, not a forecast.", de: "2046. Eine Möglichkeit, keine Vorhersage." } },
          { at: 55, text: { en: "What do you smell?", de: "Was riechst du?" } }
        ] },
      voice: { kind: "voices",
        lines: [
          { who: "teen", label: { en: "A voice from 2046", de: "Eine Stimme aus 2046" },
            text: { en: "It is 2046. I am standing exactly where you are.", de: "Es ist 2046. Ich stehe genau da, wo du jetzt stehst." } },
          { who: "teen", label: { en: "A voice from 2046", de: "Eine Stimme aus 2046" },
            text: { en: "The street smells of wet earth and linden blossom. I hear the tram, children, and a blackbird on the roof.", de: "Die Strasse riecht nach nasser Erde und Lindenblüten. Ich höre die Tram, Kinder und eine Amsel auf dem Dach." } },
          { who: "teen", label: { en: "A voice from 2046", de: "Eine Stimme aus 2046" },
            text: { en: "The ground under my feet is soft. Some of this, you decided.", de: "Der Boden unter meinen Füssen ist weich. Manches davon habt ihr entschieden." } }
        ] }
    },
    "adaptability": {
      piece: "voice",
      sound: { preset: "weather", dur: 62,
        title: { en: "The weather changes", de: "Das Wetter wechselt" },
        steps: [
          { at: 0, text: { en: "Close your eyes. Sun.", de: "Augen zu. Sonne." } },
          { at: 15, text: { en: "Wind.", de: "Wind." } },
          { at: 30, text: { en: "Rain.", de: "Regen." } },
          { at: 46, text: { en: "And again: birds. What did you change last time the plan broke?", de: "Und wieder: Vögel. Was hast du geändert, als der Plan zuletzt zerbrach?" } }
        ] },
      picture: { kind: "crops", dur: 40,
        steps: [
          { at: 0.5, text: { en: "One field, three varieties.", de: "Ein Feld, drei Sorten." } },
          { at: 9, text: { en: "A dry summer. One suffers, two carry.", de: "Ein trockener Sommer. Eine leidet, zwei tragen." } },
          { at: 19, text: { en: "A new fungus. One suffers, two carry.", de: "Ein neuer Pilz. Eine leidet, zwei tragen." } },
          { at: 29, text: { en: "A storm. One bends, two stand.", de: "Ein Sturm. Eine knickt, zwei stehen." } },
          { at: 36, text: { en: "The plan is not one plan any more.", de: "Der Plan ist nicht mehr ein Plan." } }
        ] }
    },
    "exploratory-thinking": {
      piece: "picture",
      sound: { preset: "kingfisherTrain", dur: 60,
        title: { en: "A river, a kingfisher, a train", de: "Ein Fluss, ein Eisvogel, ein Zug" },
        steps: [
          { at: 0, text: { en: "Close your eyes. A river.", de: "Augen zu. Ein Fluss." } },
          { at: 14, text: { en: "A kingfisher calls.", de: "Ein Eisvogel ruft." } },
          { at: 34, text: { en: "A train passes.", de: "Ein Zug fährt vorbei." } },
          { at: 52, text: { en: "What do the two have in common?", de: "Was haben die beiden gemeinsam?" } }
        ] },
      voice: { kind: "voices",
        lines: [
          { who: "elder", label: { en: "A biologist", de: "Eine Biologin" },
            text: { en: "A spider builds its web without a plan on paper.", de: "Eine Spinne baut ihr Netz ohne Plan auf Papier." } },
          { who: "elder", label: { en: "A biologist", de: "Eine Biologin" },
            text: { en: "It tests a thread, lets go, tries another, repairs what tears, and starts again the next night.", de: "Sie prüft einen Faden, lässt los, versucht einen anderen, flickt, was reisst, und fängt in der nächsten Nacht wieder an." } },
          { who: "elder", label: { en: "A biologist", de: "Eine Biologin" },
            text: { en: "When I sit in a long meeting, I sometimes think: we could learn something from her.", de: "Wenn ich in einer langen Sitzung sitze, denke ich manchmal: Von ihr könnten wir etwas lernen." } }
        ] }
    },
    "political-agency": {
      piece: "picture",
      sound: { preset: "townSquare", dur: 60,
        title: { en: "A village square, the town hall clock strikes", de: "Dorfplatz, die Rathausuhr schlägt" },
        steps: [
          { at: 0, text: { en: "Close your eyes. A village square.", de: "Augen zu. Ein Dorfplatz." } },
          { at: 22, text: { en: "The town hall clock. Who decides here?", de: "Die Rathausuhr. Wer entscheidet hier?" } },
          { at: 52, text: { en: "Do you know the way in?", de: "Kennst du den Weg hinein?" } }
        ] },
      voice: { kind: "voices",
        lines: [
          { who: "elder", label: { en: "A council member", de: "Eine Gemeinderätin" },
            text: { en: "When a request reaches the council, I read the first sentence twice.", de: "Wenn ein Antrag in den Gemeinderat kommt, lese ich den ersten Satz zweimal." } },
          { who: "elder", label: { en: "A council member", de: "Eine Gemeinderätin" },
            text: { en: "If I understand what you want and why, you are halfway there. Signatures help. Coming to the meeting helps more.", de: "Wenn ich verstehe, was du willst und warum, bist du schon halb am Ziel. Unterschriften helfen. Zur Sitzung kommen hilft mehr." } },
          { who: "elder", label: { en: "A council member", de: "Eine Gemeinderätin" },
            text: { en: "Most people never come back to ask what happened. Come back.", de: "Die meisten kommen nie zurück, um zu fragen, was daraus wurde. Komm zurück." } }
        ] }
    },
    "collective-action": {
      piece: "picture",
      sound: { preset: "crickets", dur: 62,
        title: { en: "One cricket, then a hundred", de: "Eine Grille, dann hundert" },
        steps: [
          { at: 0, text: { en: "Close your eyes. One cricket.", de: "Augen zu. Eine Grille." } },
          { at: 16, text: { en: "Ten.", de: "Zehn." } },
          { at: 32, text: { en: "A hundred, in step.", de: "Hundert, im Takt." } },
          { at: 55, text: { en: "Nobody conducts them.", de: "Niemand dirigiert sie." } }
        ] },
      voice: { kind: "voices",
        lines: [
          { who: "adult", label: { en: "A choir leader", de: "Eine Chorleiterin" },
            text: { en: "One voice can be lovely.", de: "Eine Stimme kann schön sein." } },
          { who: "adult", label: { en: "A choir leader", de: "Eine Chorleiterin" },
            text: { en: "Thirty voices can fill a church.", de: "Dreissig Stimmen können eine Kirche füllen." } },
          { who: "adult", label: { en: "A choir leader", de: "Eine Chorleiterin" },
            text: { en: "But the moment I wait for is when nobody is leading any more, and they still breathe together.", de: "Aber der Moment, auf den ich warte, ist der, wenn niemand mehr führt und alle trotzdem zusammen atmen." } }
        ] }
    },
    "individual-initiative": {
      piece: "voice",
      sound: { preset: "firstBird", dur: 62,
        title: { en: "The first bird before sunrise", de: "Der erste Vogel vor Sonnenaufgang" },
        steps: [
          { at: 0, text: { en: "Close your eyes. Silence before dawn.", de: "Augen zu. Stille vor der Dämmerung." } },
          { at: 9, text: { en: "One bird starts.", de: "Ein Vogel fängt an." } },
          { at: 30, text: { en: "Others follow.", de: "Andere folgen." } },
          { at: 55, text: { en: "What could you start today?", de: "Was könntest du heute anfangen?" } }
        ] },
      picture: { kind: "snow", dur: 36,
        steps: [
          { at: 0.5, text: { en: "Fresh snow. Nobody has gone yet.", de: "Frischer Schnee. Noch niemand ist gegangen." } },
          { at: 7, text: { en: "One person starts.", de: "Eine Person fängt an." } },
          { at: 18, text: { en: "Others follow the first trace.", de: "Andere folgen der ersten Spur." } },
          { at: 29, text: { en: "What has been waiting for you to start?", de: "Was wartet darauf, dass du anfängst?" } }
        ] }
    }
  };

  var VOICE_KINDS = { voices: 1, child: 1, promises: 1 };
  D.competences.forEach(function (c) {
    var p = P[c.id] || {};
    c.piece = p.piece || "picture";
    c.pieces = { sound: p.sound || null, voice: p.voice || null, picture: p.picture || null };
    if (c.win) {
      if (VOICE_KINDS[c.win.kind]) c.pieces.voice = c.pieces.voice || c.win;
      else if (c.win.kind === "forest") { /* sound piece above replaces the old forest window */ }
      else c.pieces.picture = c.pieces.picture || c.win;
    }
  });
})();
