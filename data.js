/* GreenComp Trails / GreenComp Spuren — card content (EN + DE).
 * Draft content, 15 Oct 2026. Card texts in English are written directly, not translated.
 * Official competence descriptors: Bianchi, Pisiotis, Cabrera Giraldez, GreenComp (JRC128040), 2022.
 * Checked word for word against the cards of the JRC GreenComp Game (JRC139070) on 16 Oct 2026.
 * Card texts follow the language rules in SPRACHE.md: one idea per sentence, three steps per task, a clear end.
 */
window.GCT_DATA = {
  version: "0.8 · 2026-10-17",

  areas: [
    {
      id: "values",
      color: "--a-values",
      name: { en: "Embodying sustainability values", de: "Werte verkörpern" },
      short: { en: "Values", de: "Werte" },
      teaser: {
        en: "Before we know what to do, we need to know what matters.",
        de: "Bevor wir wissen, was zu tun ist, müssen wir wissen, was zählt."
      },
      sound: "wind",
      soundName: { en: "Wind in the grass", de: "Wind im Gras" }
    },
    {
      id: "complexity",
      color: "--a-complex",
      name: { en: "Embracing complexity in sustainability", de: "Komplexität annehmen" },
      short: { en: "Complexity", de: "Komplexität" },
      teaser: {
        en: "Nothing here stands alone. Pull one thread and the whole web moves.",
        de: "Hier steht nichts allein. Zieh an einem Faden, und das ganze Netz bewegt sich."
      },
      sound: "cityToBirds",
      soundName: { en: "City traffic that turns into birdsong", de: "Stadtverkehr, der in Vogelgesang übergeht" }
    },
    {
      id: "futures",
      color: "--a-futures",
      name: { en: "Envisioning sustainable futures", de: "Zukunft entwerfen" },
      short: { en: "Futures", de: "Zukunft" },
      teaser: {
        en: "The future is not a forecast. It is a place we are already building.",
        de: "Die Zukunft ist keine Prognose. Sie ist ein Ort, an dem wir schon bauen."
      },
      sound: "rainToBirds",
      soundName: { en: "Rain stops, the first birds come back", de: "Der Regen hört auf, die ersten Vögel kommen zurück" }
    },
    {
      id: "acting",
      color: "--a-acting",
      name: { en: "Acting for sustainability", de: "Handeln" },
      short: { en: "Acting", de: "Handeln" },
      teaser: {
        en: "Every change began with a first step, taken before everyone was ready.",
        de: "Jede Veränderung begann mit einem ersten Schritt, bevor alle bereit waren."
      },
      sound: "clapping",
      soundName: { en: "One pair of hands claps, then ten, then a hundred", de: "Ein Paar Hände klatscht, dann zehn, dann hundert" }
    }
  ],

  competences: [
    {
      id: "valuing-sustainability", area: "values", no: "1.1",
      name: { en: "Valuing sustainability", de: "Werte für Nachhaltigkeit" },
      question: { en: "What would you give something up for?", de: "Wofür würdest du auf etwas verzichten?" },
      plain: { en: "knowing what matters to you, and checking if it is good for the Earth", de: "wissen, was dir wichtig ist, und prüfen, ob es der Erde guttut" },
      steps: [
        { en: "Everyone takes one thing out of a pocket or bag.", de: "Jede Person nimmt einen Gegenstand aus der Tasche." },
        { en: "Without talking, lay the things on a line: left «I really need this», right «this could go». Anyone may move any of them.", de: "Legt die Gegenstände schweigend auf eine Linie: links «brauche ich wirklich», rechts «könnte weg». Alle dürfen jeden Gegenstand verschieben." },
        { en: "Then talk: where did you agree? Where not? One sentence each.", de: "Dann redet: Wo wart ihr euch einig? Wo nicht? Jede Person ein Satz." }
      ],
      done: { en: "Done when everyone has spoken.", de: "Fertig, wenn alle gesprochen haben." },
      minutes: 3,
      examples: { at: 1, en: "For example: phone, keys, chewing gum, headphones, wallet.", de: "Zum Beispiel: Handy, Schlüssel, Kaugummi, Kopfhörer, Portemonnaie." },
      solo: { en: "Hold one thing from your pocket while you walk. Ask yourself: could I live without it?", de: "Halte beim Gehen einen Gegenstand aus deiner Tasche in der Hand. Frag dich: Könnte ich darauf verzichten?" },
      access: { en: "Without sight: pass the things from hand to hand. Whoever holds one says «I need it» or «it could go».", de: "Ohne Sehen: Die Gegenstände gehen von Hand zu Hand. Wer einen hält, sagt «brauche ich» oder «könnte weg»." },
      windowText: {
        en: "Three voices from three generations answer the same question: “What really matters to you?”",
        de: "Drei Stimmen aus drei Generationen beantworten dieselbe Frage: «Was ist dir wirklich wichtig?»"
      },
      talk: [
        { en: "What was normal for you as a child, but isn’t any more?", de: "Was war für dich als Kind normal und ist es heute nicht mehr?" },
        { en: "Which habit did you change because something else mattered more?", de: "Welche Gewohnheit hast du geändert, weil dir etwas wichtiger wurde?" }
      ],
      photo: { en: "A child’s bicycle against a wall", de: "Ein Kinderfahrrad an einer Wand" },
      definition: "To reflect on personal values; identify and explain how values vary among people and over time, while critically evaluating how they align with sustainability values.",
      win: {
        kind: "voices",
        lines: [
          { who: "elder", label: { en: "Born 1948", de: "Jahrgang 1948" },
            text: { en: "What really matters to me? That my hands are still good for something. And that we never threw bread away.", de: "Was mir wirklich wichtig ist? Dass meine Hände noch zu etwas nütze sind. Und dass wir nie Brot weggeworfen haben." } },
          { who: "adult", label: { en: "Born 1981", de: "Jahrgang 1981" },
            text: { en: "Time. Time with my kids that isn’t squeezed in between two other things.", de: "Zeit. Zeit mit meinen Kindern, die nicht zwischen zwei anderen Dingen eingeklemmt ist." } },
          { who: "teen", label: { en: "Born 2010", de: "Jahrgang 2010" },
            text: { en: "That my friends are okay. And that there is still snow in winter when I’m old.", de: "Dass es meinen Freunden gut geht. Und dass es im Winter noch Schnee gibt, wenn ich alt bin." } }
        ]
      }
    },
    {
      id: "supporting-fairness", area: "values", no: "1.2",
      name: { en: "Supporting fairness", de: "Fairness stützen" },
      question: { en: "Who cleans up after we leave?", de: "Wer räumt auf, wenn wir weg sind?" },
      plain: { en: "being fair, also to the people who come after us", de: "fair sein, auch zu denen, die nach uns kommen" },
      steps: [
        { en: "Put a small amount in the middle, such as ten stones or a bottle of water. Share it out.", de: "Legt eine kleine Menge in die Mitte, zum Beispiel zehn Steine oder eine Flasche Wasser. Teilt sie unter euch auf." },
        { en: "Imagine two more people get a share: someone far away and a child in 2050. Add two empty places and share again.", de: "Stellt euch vor, zwei weitere bekommen auch etwas: ein Mensch von weit weg und ein Kind, das 2050 lebt. Legt zwei leere Plätze dazu und teilt neu." },
        { en: "Everyone says: what was different the second time?", de: "Jede Person sagt: Was war beim zweiten Mal anders?" }
      ],
      done: { en: "Done when everyone has spoken.", de: "Fertig, wenn alle gesprochen haben." },
      minutes: 3,
      examples: { at: 1, en: "Food or drink only if everyone can have it. Otherwise stones, coins or leaves.", de: "Essen oder Trinken nur, wenn alle es vertragen. Sonst Steine, Münzen oder Blätter." },
      solo: { en: "Eat or drink something on your way. First set a part aside for someone still to come. How does that feel?", de: "Iss oder trink etwas unterwegs. Leg vorher einen Teil beiseite für jemanden, der noch kommt. Wie fühlt sich das an?" },
      access: { en: "Without sight: share by touch, piece by piece. Seated: share on a bench or on your lap.", de: "Ohne Sehen: Teilt über die Hände, Stück für Stück. Sitzend: Teilt auf einer Bank oder auf dem Schoss." },
      windowText: {
        en: "A child from the year 2050 asks the group a question. Voice only, no picture.",
        de: "Ein Kind aus dem Jahr 2050 stellt der Gruppe eine Frage. Nur Stimme, kein Bild."
      },
      talk: [
        { en: "When did you last share something you would rather have kept?", de: "Wann hast du zuletzt etwas geteilt, das du lieber behalten hättest?" },
        { en: "What did you use today that someone else has to clean up?", de: "Was hast du heute benutzt, das jemand anderes aufräumen muss?" }
      ],
      photo: { en: "A table after the party", de: "Ein Tisch nach dem Fest" },
      definition: "To support equity and justice for current and future generations and learn from previous generations for sustainability.",
      win: {
        kind: "child",
        lines: [
          { who: "child", label: { en: "A child, 2050", de: "Ein Kind, 2050" },
            text: { en: "Hello. I’m nine years old. It’s the year 2050, and I’m standing exactly where you are standing now.", de: "Hallo. Ich bin neun Jahre alt. Es ist das Jahr 2050, und ich stehe genau da, wo ihr jetzt steht." } },
          { who: "child", label: { en: "A child, 2050", de: "Ein Kind, 2050" },
            text: { en: "I wanted to ask you something.", de: "Ich wollte euch etwas fragen." } },
          { who: "child", label: { en: "A child, 2050", de: "Ein Kind, 2050" },
            text: { en: "What did you leave here for me?", de: "Was habt ihr mir hier gelassen?" } }
        ]
      }
    },
    {
      id: "promoting-nature", area: "values", no: "1.3",
      name: { en: "Promoting nature", de: "Natur fördern" },
      question: { en: "When did you last feel part of nature?", de: "Wann hast du dich zuletzt als Teil der Natur gefühlt?" },
      plain: { en: "feeling that we are part of nature, and looking after it", de: "spüren, dass wir Teil der Natur sind, und sie schützen" },
      steps: [
        { en: "Go outside. Everyone touches something alive: a tree, soil, grass, water.", de: "Geht nach draussen. Jede Person berührt etwas Lebendiges: Baum, Erde, Gras, Wasser." },
        { en: "Stay silent for 60 seconds.", de: "Bleibt 60 Sekunden still." },
        { en: "Everyone says exactly one word for what they felt.", de: "Jede Person sagt genau ein Wort für das, was sie gespürt hat." }
      ],
      done: { en: "Done after the last word.", de: "Fertig nach dem letzten Wort." },
      minutes: 2,
      solo: { en: "Touch something alive. Stay silent for one minute. Then say one word.", de: "Berühre etwas Lebendiges. Bleib eine Minute still. Sag dann ein Wort." },
      access: { en: "Seated: someone brings a leaf or a little soil. Without sight: touch and smell.", de: "Sitzend: Jemand bringt ein Blatt oder etwas Erde. Ohne Sehen: tasten und riechen." },
      windowText: {
        en: "Sixty seconds of forest, recorded at dawn. Eyes closed, one hand on the table.",
        de: "60 Sekunden Wald, aufgenommen im Morgengrauen. Augen zu, Hand auf den Tisch."
      },
      talk: [
        { en: "Where did you most like to be outdoors as a child? Does that place still exist?", de: "Wo warst du als Kind am liebsten draussen? Gibt es den Ort noch?" },
        { en: "Which place outdoors would you stand up for?", de: "Für welchen Ort draussen würdest du dich einsetzen?" }
      ],
      photo: { en: "A hand on tree bark", de: "Eine Hand an einer Baumrinde" },
      definition: "To acknowledge that humans are part of nature; and to respect the needs and rights of other species and of nature itself in order to restore and regenerate healthy and resilient ecosystems.",
      win: {
        kind: "forest", dur: 60,
        steps: [
          { at: 0, text: { en: "Close your eyes. Put one hand on the table.", de: "Augen zu. Eine Hand auf den Tisch." } },
          { at: 8, text: { en: "Forest at dawn.", de: "Wald im Morgengrauen." } },
          { at: 52, text: { en: "Open your eyes when you are ready.", de: "Öffne die Augen, wenn du so weit bist." } }
        ]
      }
    },
    {
      id: "systems-thinking", area: "complexity", no: "2.1",
      name: { en: "Systems thinking", de: "Systemdenken" },
      question: { en: "What is your breakfast connected to?", de: "Was hängt alles an deinem Frühstück?" },
      plain: { en: "seeing how things are connected", de: "sehen, wie alles zusammenhängt" },
      steps: [
        { en: "One person names something from their breakfast, for example bread.", de: "Eine Person nennt etwas aus ihrem Frühstück, zum Beispiel Brot." },
        { en: "Going round, each person says where it came from before that: shop, truck, bakery, mill, field …", de: "Reihum sagt jede Person, woher es davor kam: Laden, Lastwagen, Bäckerei, Mühle, Feld …" },
        { en: "Each person is now one link in the chain. Stand in that order and hold hands. Then someone in the middle lets go: what is missing from the breakfast now?", de: "Jede Person ist jetzt ein Glied der Kette. Stellt euch so auf und gebt euch die Hände. Dann lässt jemand in der Mitte los: Was fehlt jetzt beim Frühstück?" }
      ],
      done: { en: "Done when everyone has said what is missing without that link.", de: "Fertig, wenn alle gesagt haben, was ohne dieses Glied fehlt." },
      minutes: 4,
      solo: { en: "Think of your breakfast. With every few steps, go one link back: plate, shop, truck, field. How far do you get?", de: "Denk an dein Frühstück. Geh alle paar Schritte ein Glied zurück: Teller, Laden, Lastwagen, Feld. Wie weit kommst du?" },
      access: { en: "Seated: lay one stone in a row for each link. Then take one out of the middle.", de: "Sitzend: Legt für jedes Glied einen Stein in eine Reihe. Dann nehmt einen aus der Mitte weg." },
      windowText: {
        en: "A T-shirt in sixty seconds: field, factory, shop, wardrobe, used-clothes bag.",
        de: "Ein T-Shirt in 60 Sekunden: Feld, Fabrik, Laden, Schrank, Altkleidersack."
      },
      talk: [
        { en: "What did you throw away this week, and where is it now?", de: "Was hast du diese Woche weggeworfen, und wo ist es jetzt?" },
        { en: "Which of your choices has effects you never see?", de: "Welche deiner Entscheidungen hat Folgen, die du nie siehst?" }
      ],
      photo: { en: "A clothing bank in the evening sun", de: "Ein Altkleidercontainer in der Abendsonne" },
      definition: "To approach a sustainability problem from all sides; to consider time, space and context in order to understand how elements interact within and between systems.",
      win: {
        kind: "chain", dur: 60,
        steps: [
          { icon: "field", label: { en: "Field", de: "Feld" }, text: { en: "A cotton field. A lot of sun, a lot of water.", de: "Ein Baumwollfeld. Viel Sonne, viel Wasser." } },
          { icon: "factory", label: { en: "Factory", de: "Fabrik" }, text: { en: "Spinning, weaving, dyeing, sewing. Many hands, often far away.", de: "Spinnen, weben, färben, nähen. Viele Hände, oft weit weg." } },
          { icon: "shop", label: { en: "Shop", de: "Laden" }, text: { en: "A price tag. What is not written on it?", de: "Ein Preisschild. Was steht nicht darauf?" } },
          { icon: "wardrobe", label: { en: "Wardrobe", de: "Schrank" }, text: { en: "In the wardrobe. How often will you wear it?", de: "Im Schrank. Wie oft wirst du es tragen?" } },
          { icon: "bag", label: { en: "Used-clothes bag", de: "Altkleidersack" }, text: { en: "In the used-clothes bag. Where does it go now?", de: "Im Altkleidersack. Wohin geht es jetzt?" } }
        ]
      }
    },
    {
      id: "critical-thinking", area: "complexity", no: "2.2",
      name: { en: "Critical thinking", de: "Kritisches Denken" },
      question: { en: "What do you believe without ever checking it?", de: "Was glaubst du, ohne es je geprüft zu haben?" },
      plain: { en: "checking if something is true", de: "prüfen, ob etwas stimmt" },
      steps: [
        { en: "One person says something about nature or climate that they believe is true.", de: "Eine Person sagt einen Satz über Natur oder Klima, den sie für wahr hält." },
        { en: "The others ask: “How do you know?” After each answer they ask again, up to three times.", de: "Die anderen fragen: «Woher weisst du das?» Auf jede Antwort fragen sie noch einmal, bis dreimal." },
        { en: "Then it is the next person’s turn.", de: "Dann ist die nächste Person dran." }
      ],
      done: { en: "Done when everyone has had a turn, or time is up.", de: "Fertig, wenn alle dran waren oder die Zeit um ist." },
      minutes: 4,
      examples: { at: 1, en: "For example: paper is always better than plastic. Organic always comes from nearby. Planting a tree makes up for a flight.", de: "Zum Beispiel: Papier ist immer besser als Plastik. Bio kommt immer von nah. Ein gepflanzter Baum gleicht einen Flug aus." },
      solo: { en: "Think of something about nature or climate that you believe. Ask yourself three times: how do I know?", de: "Denk an einen Satz über Natur oder Klima, den du glaubst. Frag dich dreimal: Woher weiss ich das?" },
      access: { en: "Without hearing: ask the question with a sign, a hand behind your ear.", de: "Ohne Hören: Die Frage wird mit einem Zeichen gestellt, Hand hinters Ohr." },
      windowText: {
        en: "Two adverts, 20 seconds each. Which one tells the truth? The answer comes only after you have talked.",
        de: "Zwei Werbespots, je 20 Sekunden. Welcher sagt die Wahrheit? Die Auflösung kommt erst nach dem Gespräch."
      },
      talk: [
        { en: "When did you last change your mind, and why?", de: "Wann hast du zuletzt deine Meinung geändert, und warum?" },
        { en: "What have you bought because it said «green» on it?", de: "Was hast du schon gekauft, weil «grün» draufstand?" }
      ],
      photo: { en: "A shelf full of green labels", de: "Ein Regal mit grünen Etiketten" },
      definition: "To assess information and arguments, identify assumptions, challenge the status quo, and reflect on how personal, social and cultural backgrounds influence thinking and conclusions.",
      win: {
        kind: "ads",
        ads: [
          { brand: "SKYLA", tone: "sky",
            claim: { en: "Fly climate neutral.", de: "Klimaneutral fliegen." },
            text: { en: "Fly SKYLA. Every gram of CO₂ from your flight is offset by our forest projects. Fly with a clear conscience.", de: "Fliegen Sie mit SKYLA. Jedes Gramm CO₂ Ihres Flugs gleichen wir mit unseren Waldprojekten aus. Fliegen Sie mit gutem Gewissen." },
            small: { en: "Offsetting via certified forest projects.", de: "Kompensation über zertifizierte Waldprojekte." } },
          { brand: "KLAR", tone: "plain",
            claim: { en: "70 % less plastic.", de: "70 % weniger Plastik." },
            text: { en: "KLAR washing-up liquid, now as a refill pouch. 70 percent less plastic than our one-litre bottle, measured by weight.", de: "KLAR Spülmittel, jetzt im Nachfüllbeutel. 70 Prozent weniger Plastik als unsere Ein-Liter-Flasche, gemessen am Gewicht." },
            small: { en: "Compared with the KLAR 1 l bottle, by weight.", de: "Im Vergleich zur KLAR-1-l-Flasche, nach Gewicht." } }
        ],
        ask: { en: "Which advert tells the truth? Talk first. Then open the answer.", de: "Welcher Spot sagt die Wahrheit? Erst reden. Dann die Auflösung öffnen." },
        reveal: {
          en: "KLAR makes a claim you can check: less plastic than what (its own bottle), by how much (70 %), measured how (by weight). It could still be wrong, but you know what to ask. SKYLA promises a neutral impact because of offsetting. Since 27 September 2026, EU consumer law bans claims that a product has a neutral, reduced or positive climate impact based on offsetting (Directive (EU) 2024/825). Both adverts are invented for this game.",
          de: "KLAR macht eine Aussage, die man prüfen kann: weniger Plastik als was (die eigene Flasche), wie viel weniger (70 %), wie gemessen (nach Gewicht). Sie kann trotzdem falsch sein, aber man weiss, was man fragen muss. SKYLA verspricht eine neutrale Wirkung durch Kompensation. Seit dem 27. September 2026 verbietet das EU-Verbraucherrecht Aussagen, ein Produkt sei dank Kompensation klimaneutral, klimafreundlicher oder klimapositiv (Richtlinie (EU) 2024/825). Beide Spots sind für dieses Spiel erfunden."
        }
      }
    },
    {
      id: "problem-framing", area: "complexity", no: "2.3",
      name: { en: "Problem framing", de: "Probleme einrahmen" },
      question: { en: "What exactly is the problem?", de: "Was genau ist eigentlich das Problem?" },
      plain: { en: "making a problem clear enough to tackle", de: "ein Problem so klar machen, dass man es anpacken kann" },
      steps: [
        { en: "Lay a big frame on the ground with sticks or stones. Name a problem at this place.", de: "Legt mit Ästen oder Steinen einen grossen Rahmen auf den Boden. Nennt ein Problem an diesem Ort." },
        { en: "Make the frame smaller and answer: who is affected? Where exactly?", de: "Macht den Rahmen kleiner und klärt: Wen betrifft es? Wo genau?" },
        { en: "Make it smaller again: what could be done by next week?", de: "Macht ihn noch kleiner: Was könnte man bis nächste Woche tun?" }
      ],
      done: { en: "Done when you have one thing you can really do.", de: "Fertig, wenn ihr etwas habt, das ihr wirklich tun könnt." },
      minutes: 4,
      examples: { at: 1, en: "For example: litter, noise, no shade, the path is blocked, nothing is in flower.", de: "Zum Beispiel: Abfall, Lärm, kein Schatten, der Weg ist versperrt, nichts blüht." },
      solo: { en: "Think of a problem near you. Who is affected? What could be done by next week?", de: "Denk an ein Problem in deiner Nähe. Wen betrifft es? Was ginge bis nächste Woche?" },
      access: { en: "Seated: show the frame with your hands.", de: "Sitzend: Zeigt den Rahmen mit den Händen." },
      windowText: {
        en: "One problem, three pictures: from space, from the city, from the backyard.",
        de: "Ein Problem, drei Bilder: aus dem All, aus der Stadt, aus dem Hinterhof."
      },
      talk: [
        { en: "Which problem feels too big to start on?", de: "Welches Problem ist dir zu gross, um anzufangen?" },
        { en: "When did you solve something that wasn’t the real problem?", de: "Wann hast du etwas gelöst, das gar nicht das eigentliche Problem war?" }
      ],
      photo: { en: "An empty picture frame in a meadow", de: "Ein leerer Bilderrahmen auf einer Wiese" },
      definition: "To formulate current or potential challenges as a sustainability problem in terms of difficulty, people involved, time and geographical scope, in order to identify suitable approaches to anticipating and preventing problems, and to mitigating and adapting to already existing problems.",
      win: {
        kind: "zoom", dur: 48,
        steps: [
          { scene: "space", label: { en: "From space", de: "Aus dem All" }, text: { en: "Heat. From space: the planet is getting warmer.", de: "Hitze. Aus dem All: Die Erde wird wärmer." } },
          { scene: "city", label: { en: "From the city", de: "Aus der Stadt" }, text: { en: "From the city: asphalt and concrete store heat. Some streets stay much warmer at night than others.", de: "Aus der Stadt: Asphalt und Beton speichern Hitze. Manche Strassen bleiben nachts viel wärmer als andere." } },
          { scene: "yard", label: { en: "From the backyard", de: "Aus dem Hinterhof" }, text: { en: "From the backyard: this bench has no shade in the afternoon. In summer, nobody sits here any more.", de: "Aus dem Hinterhof: Diese Bank hat am Nachmittag keinen Schatten. Im Sommer sitzt hier niemand mehr." } }
        ],
        ask: { en: "Which frame can you get your hands on?", de: "Welchen Rahmen könnt ihr anfassen?" }
      }
    },
    {
      id: "futures-literacy", area: "futures", no: "3.1",
      name: { en: "Futures literacy", de: "Zukunftskompetenz" },
      question: { en: "What will your neighbourhood smell like in 20 years?", de: "Wie riecht dein Quartier in 20 Jahren?" },
      plain: { en: "imagining a good future and finding the way there", de: "sich eine gute Zukunft vorstellen und den Weg dorthin finden" },
      steps: [
        { en: "Everyone closes their eyes.", de: "Alle schliessen die Augen." },
        { en: "One person describes this place in 2046. What do you hear and smell? How does the ground feel?", de: "Eine Person beschreibt diesen Ort im Jahr 2046. Was hört und riecht ihr? Wie fühlt sich der Boden an?" },
        { en: "Open your eyes. Everyone says: which part of it do I want?", de: "Augen auf. Jede Person sagt: Was davon wünsche ich mir?" }
      ],
      done: { en: "Done when everyone has said what they want.", de: "Fertig, wenn alle gesagt haben, was sie sich wünschen." },
      minutes: 3,
      examples: { at: 2, en: "For example: do you hear cars or birds? Does it smell of tarmac or soil? Is the ground hot or cool?", de: "Zum Beispiel: Hört ihr Autos oder Vögel? Riecht es nach Asphalt oder Erde? Ist der Boden heiss oder kühl?" },
      solo: { en: "Close your eyes for a moment. Picture this place in 2046: what do you hear and smell? Which part of it do you want?", de: "Schliess kurz die Augen. Stell dir diesen Ort im Jahr 2046 vor: Was hörst du, was riechst du? Was davon wünschst du dir?" },
      access: { en: "Without hearing: the person draws the future on the ground or on paper.", de: "Ohne Hören: Die Person zeichnet die Zukunft auf den Boden oder auf Papier." },
      windowText: {
        en: "The same street in 1990, today and 2050: three pictures, thirty seconds.",
        de: "Dieselbe Strasse 1990, heute und 2050, drei Bilder, 30 Sekunden."
      },
      talk: [
        { en: "What in your daily life will seem strange in 20 years?", de: "Was an deinem Alltag wird in 20 Jahren seltsam wirken?" },
        { en: "What should still be exactly the same in 20 years?", de: "Was soll es in 20 Jahren genau so geben wie heute?" }
      ],
      photo: { en: "A street in the fog", de: "Eine Strasse im Nebel" },
      definition: "To envision alternative sustainable futures by imagining and developing alternative scenarios and identifying the steps needed to achieve a preferred sustainable future.",
      win: {
        kind: "street", dur: 30,
        steps: [
          { year: "1990", text: { en: "1990.", de: "1990." } },
          { year: "today", text: { en: "Today.", de: "Heute." } },
          { year: "2050", text: { en: "2050. One possibility, not a forecast.", de: "2050. Eine Möglichkeit, keine Vorhersage." } }
        ]
      }
    },
    {
      id: "adaptability", area: "futures", no: "3.2",
      name: { en: "Adaptability", de: "Anpassungsfähigkeit" },
      question: { en: "What do you do when the plan stops working?", de: "Was tust du, wenn der Plan nicht mehr geht?" },
      plain: { en: "carrying on when things change", de: "weitermachen, wenn sich alles ändert" },
      steps: [
        { en: "Together, build a tower from what lies around: stones, sticks, cones.", de: "Baut zusammen einen Turm aus dem, was hier liegt: Steine, Äste, Zapfen." },
        { en: "After one minute, the leader changes one rule that fits the place.", de: "Nach einer Minute ändert die Spielleitung eine Regel, die zum Ort passt." },
        { en: "Keep building. Then everyone says: what helped me?", de: "Baut weiter. Dann sagt jede Person: Was hat mir geholfen?" }
      ],
      done: { en: "Done when the hourglass has run through.", de: "Fertig, wenn die Sanduhr durch ist." },
      minutes: 4,
      examples: { at: 2, en: "For example: “It’s raining: one hand only.” “It’s getting dark: no more talking.” “Material is running out: one piece must go.”", de: "Zum Beispiel: «Es regnet: nur noch eine Hand.» «Es wird dunkel: kein Reden mehr.» «Material wird knapp: ein Teil muss weg.»" },
      solo: { en: "Pick a path. After one minute, take a different one. What did you find?", de: "Nimm dir einen Weg vor. Nach einer Minute nimmst du einen anderen. Was hast du entdeckt?" },
      access: { en: "Seated: build on your lap or on a bench.", de: "Sitzend: Baut auf dem Schoss oder auf einer Bank." },
      windowText: {
        en: "A farmer tells, in 45 seconds, how she switched varieties three times.",
        de: "Eine Bäuerin erzählt in 45 Sekunden, wie sie dreimal die Sorte gewechselt hat."
      },
      talk: [
        { en: "When did a plan last fall apart, and what came of it?", de: "Wann ist dir zuletzt ein Plan zerbrochen, und was wurde daraus?" },
        { en: "Which habit would you have to change if the weather got more extreme?", de: "Welche Gewohnheit müsstest du ändern, wenn das Wetter extremer wird?" }
      ],
      photo: { en: "A river flowing around a stone", de: "Ein Fluss, der um einen Stein fliesst" },
      definition: "To manage transitions and challenges in complex sustainability situations and make decisions related to the future in the face of uncertainty, ambiguity and risk.",
      win: {
        kind: "voices",
        lines: [
          { who: "farmer", label: { en: "A farmer", de: "Eine Bäuerin" },
            text: { en: "I’ve farmed the same land for thirty years. First wheat, like my father.", de: "Ich bin seit dreissig Jahren Bäuerin auf demselben Hof. Zuerst Weizen, wie mein Vater." } },
          { who: "farmer", label: { en: "A farmer", de: "Eine Bäuerin" },
            text: { en: "Then came the dry summers, so I switched to a variety that needs less water. Then a fungus showed up that we never used to have here. I switched again.", de: "Dann kamen die trockenen Sommer, und ich habe auf eine Sorte gewechselt, die weniger Wasser braucht. Dann kam ein Pilz, den es hier früher nicht gab. Wieder gewechselt." } },
          { who: "farmer", label: { en: "A farmer", de: "Eine Bäuerin" },
            text: { en: "Now I grow three varieties side by side. If one fails, the others carry it. The plan isn’t one plan any more. It’s three.", de: "Heute baue ich drei Sorten nebeneinander an. Wenn eine ausfällt, tragen die anderen. Der Plan ist nicht mehr ein Plan. Es sind drei." } }
        ]
      }
    },
    {
      id: "exploratory-thinking", area: "futures", no: "3.3",
      name: { en: "Exploratory thinking", de: "Erkundendes Denken" },
      question: { en: "What does a spider have to do with your home?", de: "Was hat eine Spinne mit deinem Zuhause zu tun?" },
      plain: { en: "trying new things, and linking things that don’t belong together", de: "Neues ausprobieren und Dinge verbinden, die nicht zusammengehören" },
      steps: [
        { en: "Everyone fetches one thing from here. If it is too big, just point at it.", de: "Jede Person holt ein Ding von hier. Ist es zu gross, zeigt sie nur darauf." },
        { en: "Pick two things that don’t fit together at all.", de: "Wählt zwei Dinge aus, die gar nicht zusammenpassen." },
        { en: "Find three links between the two.", de: "Findet drei Verbindungen zwischen den beiden." }
      ],
      done: { en: "Done when you have three links.", de: "Fertig bei drei Verbindungen." },
      minutes: 3,
      examples: { at: 3, en: "For example, a leaf and a shoe: both have lines. Both turn brown with time. Both protect something.", de: "Zum Beispiel Blatt und Schuh: Beide haben Linien. Beide werden mit der Zeit braun. Beide schützen etwas." },
      solo: { en: "Find two things that don’t fit together, for example a leaf and a shoe. Find three links between them.", de: "Such dir zwei Dinge, die nicht zusammenpassen, zum Beispiel ein Blatt und einen Schuh. Finde drei Verbindungen." },
      access: { en: "Without sight: name things you can hear or touch.", de: "Ohne Sehen: Nennt Dinge, die ihr hört oder ertastet." },
      windowText: {
        en: "Forty-five seconds: how a bullet train learned from a bird.",
        de: "45 Sekunden: Wie ein Schnellzug von einem Vogel lernte."
      },
      talk: [
        { en: "What did you learn somewhere unexpected that helped you later?", de: "Was hast du an einem unerwarteten Ort gelernt, das dir später half?" },
        { en: "When did you last try something without knowing if it would work?", de: "Wann hast du zuletzt etwas ausprobiert, ohne zu wissen, ob es klappt?" }
      ],
      photo: { en: "A kingfisher", de: "Ein Eisvogel" },
      definition: "To adopt a relational way of thinking by exploring and linking different disciplines, using creativity and experimentation with novel ideas or methods.",
      win: {
        kind: "kingfisher", dur: 45,
        steps: [
          { phase: "train", text: { en: "Japan, in the 1990s. Whenever the bullet train shot out of a tunnel, there was a loud bang.", de: "Japan, in den 1990er-Jahren. Immer wenn der Schnellzug aus einem Tunnel schoss, gab es einen lauten Knall." } },
          { phase: "bird", text: { en: "Eiji Nakatsu, an engineer and birdwatcher, thought of the kingfisher. It dives from air into water and barely makes a splash.", de: "Eiji Nakatsu, Ingenieur und Vogelbeobachter, dachte an den Eisvogel. Er taucht aus der Luft ins Wasser und spritzt dabei kaum." } },
          { phase: "morph", text: { en: "So the train got a long nose shaped like the kingfisher’s beak.", de: "Also bekam der Zug eine lange Nase in der Form des Eisvogelschnabels." } },
          { phase: "done", text: { en: "It became quieter and used less energy. A bird solved a problem the engineers had been stuck on.", de: "Er wurde leiser und brauchte weniger Energie. Ein Vogel löste ein Problem, an dem die Ingenieure festsassen." } }
        ]
      }
    },
    {
      id: "political-agency", area: "acting", no: "4.1",
      name: { en: "Political agency", de: "Politische Handlungsfähigkeit" },
      question: { en: "Who decides about the air you breathe?", de: "Wer entscheidet über die Luft, die du atmest?" },
      plain: { en: "knowing who decides, and having your say", de: "wissen, wer entscheidet, und mitreden" },
      steps: [
        { en: "Name one rule here that you would change.", de: "Nennt eine Regel hier, die ihr ändern würdet." },
        { en: "Work out who decides it: one person, a council, a meeting? If you don’t know, guess.", de: "Klärt, wer darüber entscheidet: eine Person, ein Rat, eine Versammlung? Wisst ihr es nicht, ratet." },
        { en: "Find the first step: whom could you ask?", de: "Findet den ersten Schritt: Wen könnt ihr fragen?" }
      ],
      done: { en: "Done when you have a name or an office.", de: "Fertig, wenn ihr einen Namen oder eine Stelle habt." },
      minutes: 4,
      examples: { at: 1, en: "For example: keep off the grass. Lunch break indoors only. The lights stay on all night. Nowhere to park a bike.", de: "Zum Beispiel: Rasen betreten verboten. Mittagspause nur drinnen. Das Licht brennt die ganze Nacht. Kein Velo-Abstellplatz." },
      solo: { en: "Find a rule near you that you would change. Who decides it? Whom could you ask?", de: "Such eine Regel in deiner Umgebung, die du ändern würdest. Wer entscheidet darüber? Wen könntest du fragen?" },
      access: { en: "Without hearing: write it down instead of talking.", de: "Ohne Hören: aufschreiben statt reden." },
      windowText: {
        en: "Sixty seconds: how a request to a municipality comes about, in three steps.",
        de: "60 Sekunden: Wie ein Antrag an eine Gemeinde entsteht, in drei Schritten."
      },
      talk: [
        { en: "When did you last ask for something, not just wish for it?", de: "Wann hast du zuletzt etwas gefordert, nicht nur gewünscht?" },
        { en: "Which rule did nobody decide, yet everyone follows?", de: "Welche Regel hat bei euch niemand beschlossen, und alle halten sich daran?" }
      ],
      /* Alone (the walk): the same questions without a group. null keeps the group question. */
      talkSolo: [null, { en: "Which rule around you did nobody decide, yet everyone follows?", de: "Welche Regel hat in deiner Umgebung niemand beschlossen, und alle halten sich daran?" }],
      photo: { en: "An empty council chamber", de: "Ein leerer Sitzungssaal" },
      definition: "To navigate the political system, identify political responsibility and accountability for unsustainable behaviour, and demand effective policies for sustainability.",
      win: {
        kind: "steps", dur: 60,
        steps: [
          { title: { en: "Say it in one sentence", de: "In einem Satz sagen" }, text: { en: "Write down what should change, and why. Find out who decides: council, committee, administration.", de: "Schreib auf, was sich ändern soll und warum. Finde heraus, wer entscheidet: Gemeinderat, Kommission, Verwaltung." } },
          { title: { en: "Find allies", de: "Verbündete suchen" }, text: { en: "Signatures, an association, the local paper. More names, more weight.", de: "Unterschriften, ein Verein, die Lokalzeitung. Mehr Namen, mehr Gewicht." } },
          { title: { en: "Hand it in and follow up", de: "Einreichen und nachfragen" }, text: { en: "In writing, dated and signed. Ask by when you will get an answer, and go to the meeting.", de: "Schriftlich, mit Datum und Unterschrift. Frag, bis wann ihr Antwort bekommt, und geht zur Sitzung." } }
        ],
        note: { en: "The exact route differs from one municipality to the next.", de: "Der genaue Weg ist in jeder Gemeinde anders." }
      }
    },
    {
      id: "collective-action", area: "acting", no: "4.2",
      name: { en: "Collective action", de: "Kollektives Handeln" },
      question: { en: "What can you only do together?", de: "Was schafft ihr nur gemeinsam?" },
      questionSolo: { en: "What can you only do together with others?", de: "Was schaffst du nur mit anderen zusammen?" },
      plain: { en: "making change together", de: "gemeinsam etwas bewegen" },
      steps: [
        { en: "Stand in a circle and look at the ground.", de: "Stellt euch in einen Kreis und schaut auf den Boden." },
        { en: "Count to 20 together, in no set order: whoever wants says the next number. If two speak at once, start again at 1.", de: "Zählt gemeinsam bis 20, ohne Reihenfolge: Wer will, sagt die nächste Zahl. Sprechen zwei gleichzeitig, beginnt ihr wieder bei 1." },
        { en: "Afterwards, everyone says: what helped us?", de: "Danach sagt jede Person: Was hat uns geholfen?" }
      ],
      done: { en: "Done at 20. After two minutes, 10 counts too.", de: "Fertig bei 20. Nach zwei Minuten gilt auch 10." },
      minutes: 3,
      solo: { en: "Think of something you only managed with others. Whom could you ask this week to do something together?", de: "Denk an etwas, das du nur mit anderen geschafft hast. Wen könntest du diese Woche für etwas Gemeinsames fragen?" },
      access: { en: "Without hearing: instead of numbers, everyone raises one hand in turn. Nobody agrees who goes next.", de: "Ohne Hören: Statt Zahlen hebt jede Person nacheinander eine Hand. Niemand macht ab, wer als Nächstes dran ist." },
      windowText: {
        en: "Forty-five seconds: a village initiative, from 3 to 300 people.",
        de: "45 Sekunden: Eine Dorf-Initiative, von 3 auf 300 Menschen."
      },
      talk: [
        { en: "What did you manage with others that you could never have done alone?", de: "Was ist dir mit anderen gelungen, das du allein nie geschafft hättest?" },
        { en: "Who in this group would you ask if you started something next week?", de: "Wen aus dieser Gruppe würdest du fragen, wenn du nächste Woche etwas anfängst?" }
      ],
      talkSolo: [null, { en: "Whom would you ask if you started something next week?", de: "Wen würdest du fragen, wenn du nächste Woche etwas anfängst?" }],
      photo: { en: "Many hands on a rope", de: "Viele Hände an einem Seil" },
      definition: "To act for change in collaboration with others.",
      win: {
        kind: "grow", dur: 45,
        steps: [
          { n: 3, text: { en: "It started with three neighbours and a broken bench at the bus stop. They fixed it on a Saturday.", de: "Es begann mit drei Nachbarinnen und einer kaputten Bank an der Bushaltestelle. Sie reparierten sie an einem Samstag." } },
          { n: 30, text: { en: "The next Saturday, thirty people came with tools.", de: "Am nächsten Samstag kamen dreissig Leute mit Werkzeug." } },
          { n: 300, text: { en: "Two years later, three hundred people look after the village paths, a seed library and a repair café. Nobody planned three hundred. It began with three.", de: "Zwei Jahre später kümmern sich dreihundert Menschen um die Dorfwege, eine Saatgutbibliothek und ein Reparatur-Café. Niemand hat dreihundert geplant. Es begann mit drei." } }
        ]
      }
    },
    {
      id: "individual-initiative", area: "acting", no: "4.3",
      name: { en: "Individual initiative", de: "Eigeninitiative" },
      question: { en: "What could you still do today?", de: "Was könntest du heute noch tun?" },
      plain: { en: "making a start yourself", de: "selbst anfangen" },
      steps: [
        { en: "Everyone names one thing they are good at: listening, organising, fixing, cooking …", de: "Jede Person nennt etwas, das sie gut kann: zuhören, organisieren, reparieren, kochen …" },
        { en: "The others say where it could help nature or the climate.", de: "Die anderen sagen, wo das der Natur oder dem Klima nützen könnte." },
        { en: "Everyone names a first step for tomorrow.", de: "Jede Person nennt einen ersten Schritt für morgen." }
      ],
      done: { en: "Done when everyone has a first step.", de: "Fertig, wenn jede Person einen ersten Schritt hat." },
      minutes: 3,
      solo: { en: "Think of something you are good at. Where could it help nature or the climate? What is a first step for tomorrow?", de: "Denk an etwas, das du gut kannst. Wo könnte es der Natur oder dem Klima nützen? Was ist ein erster Schritt für morgen?" },
      access: { en: "Without hearing: write it down or show it.", de: "Ohne Hören: aufschreiben oder zeigen." },
      windowText: {
        en: "Thirty seconds: three people say what they promised a week ago and what they have done since.",
        de: "30 Sekunden: Drei Menschen sagen, was sie vor einer Woche versprochen und seither getan haben."
      },
      talk: [
        { en: "What has been waiting for months for you to start?", de: "Was wartet seit Monaten darauf, dass du anfängst?" },
        { en: "What did you once just do, without asking anyone?", de: "Was hast du einmal einfach gemacht, ohne jemanden zu fragen?" }
      ],
      photo: { en: "A first footprint in the snow", de: "Ein erster Fussabdruck im Schnee" },
      definition: "To identify own potential for sustainability and to actively contribute to improving prospects for the community and the planet.",
      win: {
        kind: "promises",
        lines: [
          { who: "adult", grow: 1, label: { en: "Promise 1", de: "Versprechen 1" },
            text: { en: "A week ago I promised to cycle to work twice. I did it three times.", de: "Vor einer Woche habe ich versprochen, zweimal mit dem Velo zur Arbeit zu fahren. Ich habe es dreimal gemacht." } },
          { who: "elder", grow: 0.75, label: { en: "Promise 2", de: "Versprechen 2" },
            text: { en: "I promised to call the council about the street light that is on all day. I called. They said they would look at it.", de: "Ich habe versprochen, wegen der Strassenlampe anzurufen, die den ganzen Tag brennt. Ich habe angerufen. Sie schauen es sich an." } },
          { who: "teen", grow: 0.35, label: { en: "Promise 3", de: "Versprechen 3" },
            text: { en: "I promised to stop buying bottled water. I made it to Thursday. I’m starting again.", de: "Ich habe versprochen, kein Wasser in Flaschen mehr zu kaufen. Bis Donnerstag hat es geklappt. Ich fange wieder an." } }
        ]
      }
    }
  ],

  trails: [
    { id: "senses", name: { en: "Senses", de: "Sinne" }, motto: { en: "Notice it.", de: "Nimm es wahr." },
      change: { en: "Do the task with one sense only: eyes closed, touch only, or listen only.", de: "Macht die Aufgabe mit nur einem Sinn: Augen zu, nur tasten oder nur hören." },
      changeSolo: { en: "Do the task with one sense only: eyes closed, touch only, or listen only.", de: "Mach die Aufgabe mit nur einem Sinn: Augen zu, nur tasten oder nur hören." } },
    { id: "emotion", name: { en: "Emotion", de: "Gefühl" }, motto: { en: "Say what it does to you.", de: "Sag, was es mit dir macht." },
      change: { en: "Before you start, everyone names a feeling. One word only.", de: "Bevor ihr anfangt, nennt jede Person ein Gefühl. Nur ein Wort." },
      changeSolo: { en: "Before you start, name one feeling. One word only.", de: "Bevor du anfängst, nenn ein Gefühl. Nur ein Wort." } },
    { id: "beauty", name: { en: "Beauty", de: "Schönheit" }, motto: { en: "Find the beautiful.", de: "Finde das Schöne." },
      change: { en: "Before you start, everyone shows the group something beautiful here.", de: "Bevor ihr anfangt, zeigt jede Person der Gruppe etwas Schönes an diesem Ort." },
      changeSolo: { en: "Before you start, find something beautiful here and look at it for a minute.", de: "Bevor du anfängst, such dir hier etwas Schönes und schau es eine Minute lang an." } },
    { id: "meaning", name: { en: "Meaning", de: "Bedeutung" }, motto: { en: "What does it mean to you?", de: "Was heisst das für dich?" },
      change: { en: "During the task, everyone tells a short story from their own life that fits.", de: "Bei der Aufgabe erzählt jede Person eine kurze Geschichte aus ihrem Leben, die dazu passt." },
      changeSolo: { en: "During the task, think of a story from your own life that fits.", de: "Denk bei der Aufgabe an eine Geschichte aus deinem Leben, die dazu passt." } },
    { id: "care", name: { en: "Care", de: "Fürsorge" }, motto: { en: "Do something for it.", de: "Tu etwas dafür." },
      change: { en: "At the end, do something good for the place: pick up litter, water a plant.", de: "Tut am Schluss etwas Gutes für den Ort: Abfall aufheben, eine Pflanze giessen." },
      changeSolo: { en: "At the end, do something good for the place: pick up litter, water a plant.", de: "Tu am Schluss etwas Gutes für den Ort: Abfall aufheben, eine Pflanze giessen." } }
  ],

  sparks: [
    { id: "slow", name: { en: "Slow motion", de: "Zeitlupe" }, text: { en: "Do everything in slow motion.", de: "Macht alles in Zeitlupe." } },
    { id: "mute", name: { en: "Silent", de: "Stumm" }, text: { en: "Show, don’t talk.", de: "Nur zeigen, nicht reden." } },
    { id: "foley", name: { en: "Sound effects", de: "Geräuschkulisse" }, text: { en: "One person makes all the sounds.", de: "Eine Person macht alle Geräusche dazu." } },
    { id: "youngest", name: { en: "The youngest leads", de: "Die Jüngste leitet" }, text: { en: "The youngest person leads now.", de: "Die jüngste Person leitet jetzt." } },
    { id: "double", name: { en: "Double", de: "Doppelt" }, text: { en: "Draw a second trail card. Both count. If they clash, the second one wins.", de: "Zieht eine zweite Spurkarte. Beide gelten. Widersprechen sie sich, gilt die zweite." } },
    { id: "swap", name: { en: "Swap", de: "Tausch" }, text: { en: "Swap the skill card. Say out loud why.", de: "Tauscht die Fähigkeitskarte. Sagt laut, warum." } }
  ],

  silence: [
    { id: "sixty", title: { en: "Sixty seconds of silence.", de: "60 Sekunden Stille." }, text: { en: "Nobody speaks for one minute.", de: "Eine Minute lang spricht niemand." } },
    { id: "out", title: { en: "Go outside. In any weather.", de: "Geht raus. Bei jedem Wetter." }, text: { en: "Play the next round outdoors. Already outside? Walk ten steps further, without a word.", de: "Die nächste Runde spielt ihr draussen. Schon draussen? Geht zehn Schritte weiter, ohne ein Wort." } },
    { id: "phones", title: { en: "Phones in the middle, screens down.", de: "Handys in die Mitte, Bildschirm nach unten." }, text: { en: "This card can come at any time, even in the middle of the game.", de: "Diese Karte kann jederzeit kommen, auch mitten im Spiel." } },
    { id: "window", title: { en: "Look around until someone sees something alive.", de: "Schaut euch um, bis jemand etwas Lebendiges sieht." }, text: { en: "Indoors: out of the window. Only then do you go on.", de: "Drinnen: aus dem Fenster. Erst dann geht es weiter." } },
    { id: "morning", title: { en: "One person tells what they heard outside this morning.", de: "Eine Person erzählt, was sie heute Morgen draussen gehört hat." }, text: { en: "If you heard nothing, say so.", de: "Wer nichts gehört hat, sagt das." } }
  ],

  promise: {
    front: { en: "In the next seven days I will …", de: "In den nächsten sieben Tagen werde ich …" },
    back: { en: "Show this card to someone from your group in seven days.", de: "Zeig diese Karte in sieben Tagen jemandem aus deiner Gruppe." }
  },

  /* The joker. The JRC set has three blank jokers «to use if needed» and no rule. Here the joker has a clear job:
   * the group writes its own card for the place, with the same parts as every competence card. */
  joker: {
    count: 4,
    back: { en: "Write your own card for this place: one question from everyday life, three steps, a clear end.", de: "Schreibt eure eigene Karte für diesen Ort: eine Frage aus dem Alltag, drei Schritte, ein klares Ende." },
    rule: { en: "Once per game, instead of a card you drew.", de: "Einmal pro Spiel, statt einer gezogenen Karte." },
    missing: { en: "Is a skill missing? Give it a name.", de: "Fehlt euch eine Fähigkeit? Gebt ihr einen Namen." },
    example: {
      comp: "promoting-nature",
      q: { en: "Who lives here apart from us?", de: "Wer wohnt hier ausser uns?" },
      steps: [
        { en: "Everyone looks for one sign of an animal: a track, a hole, a feather.", de: "Jede Person sucht ein Zeichen von einem Tier: Spur, Loch, Feder." },
        { en: "Show your find to the group. Do not touch anything alive.", de: "Zeigt euch die Funde. Nichts Lebendiges anfassen." },
        { en: "Together, guess who left it.", de: "Ratet zusammen, wer es war." }
      ],
      done: { en: "Done when every find has a guess.", de: "Fertig, wenn jeder Fund einen Tipp hat." }
    }
  },

  /* «Original plus», round 0: the 17 Sustainable Development Goals of the UN, as in the JRC game. Official short titles. */
  sdgs: [
    { n: 1, en: "No poverty", de: "Keine Armut" },
    { n: 2, en: "Zero hunger", de: "Kein Hunger" },
    { n: 3, en: "Good health and well-being", de: "Gesundheit und Wohlergehen" },
    { n: 4, en: "Quality education", de: "Hochwertige Bildung" },
    { n: 5, en: "Gender equality", de: "Geschlechtergleichheit" },
    { n: 6, en: "Clean water and sanitation", de: "Sauberes Wasser und Sanitäreinrichtungen" },
    { n: 7, en: "Affordable and clean energy", de: "Bezahlbare und saubere Energie" },
    { n: 8, en: "Decent work and economic growth", de: "Menschenwürdige Arbeit und Wirtschaftswachstum" },
    { n: 9, en: "Industry, innovation and infrastructure", de: "Industrie, Innovation und Infrastruktur" },
    { n: 10, en: "Reduced inequalities", de: "Weniger Ungleichheiten" },
    { n: 11, en: "Sustainable cities and communities", de: "Nachhaltige Städte und Gemeinden" },
    { n: 12, en: "Responsible consumption and production", de: "Nachhaltiger Konsum und nachhaltige Produktion" },
    { n: 13, en: "Climate action", de: "Massnahmen zum Klimaschutz" },
    { n: 14, en: "Life below water", de: "Leben unter Wasser" },
    { n: 15, en: "Life on land", de: "Leben an Land" },
    { n: 16, en: "Peace, justice and strong institutions", de: "Frieden, Gerechtigkeit und starke Institutionen" },
    { n: 17, en: "Partnerships for the goals", de: "Partnerschaften zur Erreichung der Ziele" }
  ],

  /* Estimate cards. Only cards with a checked source are playable.
   * The answer never appears on the printed card; only the board (Tafel) and the answer booklet show it. */
  estimates: [
    {
      id: "food-waste-kg", comp: "systems-thinking", type: "number",
      q: { en: "How many kilograms of food does one person in the EU waste per year?", de: "Wie viele Kilogramm Lebensmittel wirft ein Mensch in der EU pro Jahr weg?" },
      answer: 132, unit: { en: "kg", de: "kg" },
      detail: { en: "132 kg (2022), 72 kg of it at home.", de: "132 kg (2022), davon 72 kg zu Hause." },
      viz: "split",
      parts: [
        { v: 72, label: { en: "Households", de: "Haushalte" }, hi: true },
        { v: 25, label: { en: "Manufacturing", de: "Verarbeitung" } },
        { v: 15, label: { en: "Restaurants", de: "Gastronomie" } },
        { v: 11, label: { en: "Retail", de: "Handel" } },
        { v: 10, label: { en: "Primary production", de: "Landwirtschaft" } }
      ],
      vizNote: { en: "kg per person, 2022. Parts add up to 133 because of rounding.", de: "kg pro Person, 2022. Die Teile ergeben wegen Rundung 133." },
      source: "Eurostat, 2024 (data 2022)"
    },
    {
      id: "food-waste-share", comp: "systems-thinking", type: "truefalse",
      q: { en: "More than half of the food wasted in the EU is wasted in restaurants and shops.", de: "Mehr als die Hälfte der weggeworfenen Lebensmittel in der EU fällt in Restaurants und Läden an." },
      answer: false,
      detail: { en: "Not true: 54 % is wasted in households.", de: "Stimmt nicht: 54 % entstehen in Haushalten." },
      viz: "split", highlightOnly: true,
      parts: [
        { v: 72, label: { en: "Households", de: "Haushalte" }, hi: true },
        { v: 25, label: { en: "Manufacturing", de: "Verarbeitung" } },
        { v: 15, label: { en: "Restaurants", de: "Gastronomie" } },
        { v: 11, label: { en: "Retail", de: "Handel" } },
        { v: 10, label: { en: "Primary production", de: "Landwirtschaft" } }
      ],
      vizNote: { en: "kg per person, 2022.", de: "kg pro Person, 2022." },
      source: "Eurostat, 2024 (data 2022)"
    },
    {
      id: "birds-lost", comp: "promoting-nature", type: "number",
      q: { en: "How many fewer birds are there in the EU today than in 1980?", de: "Wie viele Vögel gibt es in der EU heute weniger als 1980?" },
      answer: 600, unit: { en: "million", de: "Millionen" },
      detail: { en: "About 600 million fewer breeding birds, one in six. The house sparrow alone: 247 million.", de: "Rund 600 Millionen Brutvögel weniger, jeder sechste. Allein beim Haussperling: 247 Millionen." },
      viz: "flock",
      vizNote: { en: "One dot = 10 million birds. Darker dots: house sparrows.", de: "Ein Punkt = 10 Millionen Vögel. Dunklere Punkte: Haussperlinge." },
      source: "BirdLife, 2021"
    },
    {
      id: "renewables-share", comp: "futures-literacy", type: "number",
      q: { en: "What percentage of the EU’s electricity came from renewable sources such as wind and sun in 2024?", de: "Wie viel Prozent des Stroms in der EU kam 2024 aus erneuerbaren Quellen wie Wind und Sonne?" },
      answer: 47, unit: { en: "%", de: "%" },
      detail: { en: "47 % (in 2019 it was 34 %).", de: "47 % (2019 waren es 34 %)." },
      viz: "line", points: [[2019, 34], [2024, 47]],
      vizNote: { en: "Only the two checked values are shown, no invented years in between.", de: "Nur die zwei geprüften Werte, keine erfundenen Jahre dazwischen." },
      source: "Ember, 2025"
    },
    {
      id: "solar-coal", comp: "futures-literacy", type: "truefalse",
      q: { en: "In 2024, solar power overtook coal power in the EU for the first time.", de: "Solarstrom hat 2024 in der EU zum ersten Mal Kohlestrom überholt." },
      answer: true,
      detail: { en: "True: solar 11 %, coal 10 %.", de: "Stimmt: Solar 11 %, Kohle 10 %." },
      viz: "bars", bars: [{ v: 11, label: { en: "Solar", de: "Solar" }, hi: true }, { v: 10, label: { en: "Coal", de: "Kohle" } }],
      vizNote: { en: "Share of EU electricity, 2024.", de: "Anteil am Strom in der EU, 2024." },
      source: "Ember, 2025"
    },
    {
      id: "climate-serious", comp: "political-agency", type: "number",
      q: { en: "What percentage of people in the EU see climate change as a serious problem?", de: "Wie viel Prozent der Menschen in der EU halten den Klimawandel für ein ernstes Problem?" },
      answer: 85, unit: { en: "%", de: "%" },
      detail: { en: "85 % (survey February to March 2025, 26 319 people).", de: "85 % (Umfrage Februar bis März 2025, 26 319 Befragte)." },
      viz: "ring",
      source: "Special Eurobarometer 565, 2025"
    },
    {
      id: "who-responsible", comp: "individual-initiative", type: "truefalse",
      q: { en: "Most people in the EU think that they themselves are mainly responsible for protecting the climate.", de: "Die meisten Menschen in der EU finden: Für den Klimaschutz sind vor allem sie selbst verantwortlich." },
      answer: false,
      detail: { en: "Not true: 92 % take action themselves, but only 28 % see themselves as mainly responsible.", de: "Stimmt nicht: 92 % handeln selbst, aber nur 28 % sehen sich als Hauptverantwortliche." },
      viz: "pair", pair: [{ v: 92, label: { en: "take action themselves", de: "handeln selbst" } }, { v: 28, label: { en: "see themselves as mainly responsible", de: "sehen sich als hauptverantwortlich" } }],
      source: "Special Eurobarometer 565, 2025"
    }
  ],

  /* Open estimate slots: a number gets a card only once a source stands behind it. */
  estimateGaps: [
    { comp: "valuing-sustainability", idea: { en: "How long people in the EU keep a smartphone", de: "Wie lange Menschen in der EU ein Smartphone behalten" } },
    { comp: "valuing-sustainability", idea: null },
    { comp: "supporting-fairness", idea: null },
    { comp: "supporting-fairness", idea: null },
    { comp: "promoting-nature", idea: { en: "Share of EU land that is protected", de: "Anteil geschützter Fläche in der EU" } },
    { comp: "critical-thinking", idea: null },
    { comp: "critical-thinking", idea: null },
    { comp: "problem-framing", idea: null },
    { comp: "problem-framing", idea: null },
    { comp: "adaptability", idea: null },
    { comp: "adaptability", idea: null },
    { comp: "exploratory-thinking", idea: null },
    { comp: "exploratory-thinking", idea: null },
    { comp: "political-agency", idea: { en: "How many European Citizens’ Initiatives have ever succeeded", de: "Wie viele EU-Bürgerinitiativen je Erfolg hatten" } },
    { comp: "collective-action", idea: null },
    { comp: "collective-action", idea: null },
    { comp: "individual-initiative", idea: null }
  ],

  /* Nature Connection Index items (Richardson et al. 2019, Sustainability 11(12), 3250).
   * German wording is a working translation, not validated. */
  nci: [
    { en: "I always find beauty in nature", de: "Ich finde in der Natur immer Schönheit" },
    { en: "I always treat nature with respect", de: "Ich behandle die Natur immer mit Respekt" },
    { en: "Being in nature makes me very happy", de: "In der Natur zu sein, macht mich sehr glücklich" },
    { en: "Spending time in nature is very important to me", de: "Zeit in der Natur zu verbringen, ist mir sehr wichtig" },
    { en: "I find being in nature really amazing", de: "Ich finde es wirklich wunderbar, in der Natur zu sein" },
    { en: "I feel part of nature", de: "Ich fühle mich als Teil der Natur" }
  ],

  /* Solo walk ("Der Spaziergang"). {q}, {task}, {talk} are filled from the card. Durations in seconds. */
  walk: [
    { id: "arrive", dur: 60, title: { en: "Arrive", de: "Ankommen" },
      say: { en: "Welcome. Put your phone in your pocket. For the next minute, just walk. Notice how fast you are going, and slow down a little.", de: "Willkommen. Steck das Handy ein. Eine Minute lang gehst du einfach. Merk, wie schnell du gehst, und werde ein wenig langsamer." } },
    { id: "question", dur: 45, title: { en: "Your question", de: "Deine Frage" },
      say: { en: "Here is your question for today. {q} You don’t have to answer it. Just take it with you.", de: "Hier ist deine Frage für heute. {q} Du musst sie nicht beantworten. Nimm sie einfach mit." } },
    { id: "task", dur: 180, title: { en: "Make it real", de: "Mach es echt" },
      say: { en: "Now, something to do. {task} Take your time. I’ll be back in a few minutes.", de: "Jetzt etwas zum Tun. {task} Lass dir Zeit. Ich melde mich in ein paar Minuten wieder." } },
    { id: "silence", dur: 120, title: { en: "Two minutes, only this place", de: "Zwei Minuten, nur dieser Ort" },
      say: { en: "Now I will be quiet for two minutes. Only this place is talking.", de: "Jetzt schweige ich zwei Minuten. Nur dieser Ort spricht." } },
    { id: "talk", dur: 90, title: { en: "A question for you alone", de: "Eine Frage nur für dich" },
      say: { en: "A question for you alone. Answer it out loud or in your head. {talk}", de: "Eine Frage nur für dich. Antworte laut oder im Kopf. {talk}" } },
    { id: "estimate", dur: 60, title: { en: "A guess", de: "Eine Schätzfrage" },
      say: { en: "A guess. {eq} Say your number out loud.", de: "Eine Schätzfrage. {eq} Sag deine Zahl laut." },
      sayTF: { en: "Is it true? {eq} Thumbs up or thumbs down.", de: "Stimmt’s? {eq} Daumen hoch oder runter." },
      reveal: { en: "The answer: {ed}", de: "Die Auflösung: {ed}" } },
    { id: "promise", dur: 60, title: { en: "Seven days", de: "Sieben Tage" },
      say: { en: "Last question. What will you do in the next seven days? When you know, say it out loud. At home, write it on your promise card.", de: "Letzte Frage. Was wirst du in den nächsten sieben Tagen tun? Wenn du es weisst, sag es laut. Zu Hause schreibst du es auf deine Versprechen-Karte." } },
    { id: "close", dur: 25, title: { en: "Back", de: "Zurück" },
      say: { en: "Thank you for walking. Look around once more before you head back.", de: "Danke fürs Gehen. Schau dich noch einmal um, bevor du zurückgehst." } }
  ],

  sources: [
    { short: "Lumber, Richardson & Sheffield 2017", text: "Beyond knowing nature: Contact, emotion, compassion, meaning, and beauty are pathways to nature connection. PLoS ONE 12(5): e0177186." },
    { short: "Richardson et al. 2019", text: "A Measure of Nature Connectedness for Children and Adults: Validation, Performance, and Insights. Sustainability 11(12): 3250." },
    { short: "Bianchi, Pisiotis & Cabrera Giraldez 2022", text: "GreenComp – The European sustainability competence framework. JRC128040, Publications Office of the EU." },
    { short: "JRC 2024", text: "European Commission, Joint Research Centre; Szkola, Napoli, Pisiotis, Williquet: The GreenComp Game, 2024, JRC139070. CC BY 4.0." },
    { short: "Eurostat 2024", text: "Food waste and food waste prevention – estimates (data 2022)." },
    { short: "BirdLife 2021", text: "Burns et al., Abundance decline in the avifauna of the European Union reveals cross-continental similarities in biodiversity change. Ecology and Evolution, 2021." },
    { short: "Ember 2025", text: "European Electricity Review 2025." },
    { short: "Eurobarometer 565", text: "Special Eurobarometer 565: Climate change, 2025." },
    { short: "Directive (EU) 2024/825", text: "Empowering consumers for the green transition; applies from 27 September 2026." }
  ]
};

/* Each task is three short steps and a clear end ("done"). Places that show a single paragraph use the joined text. */
window.GCT_DATA.competences.forEach(function (c) {
  c.task = { en: c.steps.map(function (x) { return x.en; }).join(" "), de: c.steps.map(function (x) { return x.de; }).join(" ") };
});
