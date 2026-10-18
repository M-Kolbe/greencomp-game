/* GreenComp Trails / GreenComp Spuren — card content (EN + DE).
 * Draft content, 15 Oct 2026. Card texts in English are written directly, not translated.
 * Official competence descriptors: Bianchi, Pisiotis, Cabrera Giraldez, GreenComp (JRC128040), 2022.
 * Checked word for word against the cards of the JRC GreenComp Game (JRC139070) on 16 Oct 2026.
 * Card texts follow the language rules in SPRACHE.md: one idea per sentence, three steps per task, a clear end.
 */
window.GCT_DATA = {
  version: "0.9 · 2026-10-18",

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
      minutes: 4,
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
      minutes: 4,
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
      minutes: 3,
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
      minutes: 5,
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
      minutes: 5,
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
      minutes: 5,
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
      minutes: 4,
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
      minutes: 5,
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
      minutes: 4,
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
      minutes: 5,
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
      minutes: 4,
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
      minutes: 4,
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

/* Facts to marvel at («wow») and to think about («think»), researched on 18 October 2026, each number checked against the named source.
 * One appears at the end of every station, about the card just played. */
window.GCT_DATA.facts = [
  {"id": "nature-120-minutes", "comp": "valuing-sustainability", "kind": "wow", "text": {"en": "People who spend at least 120 minutes a week in nature feel healthy and content more often. One long visit or several short ones both count.", "de": "Wer pro Woche mindestens 120 Minuten in der Natur verbringt, fühlt sich häufiger gesund und zufrieden. Ob am Stück oder verteilt, spielt keine Rolle."}, "source": "White et al., Scientific Reports, 2019 (University of Exeter)", "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6565732/"},
  {"id": "protection-forest-44", "comp": "valuing-sustainability", "kind": "wow", "text": {"en": "44 percent of Switzerland's forest is protection forest. Its trees shield villages, roads and railways from natural hazards such as avalanches and rockfall.", "de": "44 Prozent des Schweizer Waldes sind Schutzwald. Diese Bäume schützen Dörfer, Strassen und Bahnlinien vor Naturgefahren wie Lawinen und Steinschlag."}, "source": "BAFU & WSL, Waldbericht 2025", "url": "https://www.bafu.admin.ch/dam/de/sd-web/VL0obw1MJTg3/waldbericht_2025.pdf"},
  {"id": "eu-textiles-19kg", "comp": "valuing-sustainability", "kind": "think", "text": {"en": "In 2022, people in the EU bought around 19 kilos of clothes, shoes and household textiles per person – more than ever before.", "de": "Pro Person kauften die Menschen in der EU 2022 rund 19 Kilo Kleider, Schuhe und Heimtextilien – so viel wie noch nie."}, "q": {"en": "Which piece of clothing would you never give away – and why?", "de": "Welches Kleidungsstück würdest du nie hergeben – und warum?"}, "source": "European Environment Agency (EEA), briefing with 2022 data", "url": "https://www.eea.europa.eu/en/newsroom/news/consumption-of-clothing-footwear-other-textiles-in-the-eu-reaches-new-record-high"},
  {"id": "ibis-take-turns", "comp": "supporting-fairness", "kind": "wow", "text": {"en": "Northern bald ibises take turns at the front of their V-formation: each bird leads for about as long as it rests in another's slipstream.", "de": "Waldrappe wechseln sich im V-Flug an der Spitze ab: Jeder Vogel fliegt etwa gleich lange vorne im Wind wie hinten im bequemen Windschatten."}, "source": "Voelkl et al., PNAS, 2015 (Waldrappteam, Austria)", "url": "https://www.pnas.org/doi/10.1073/pnas.1413589112"},
  {"id": "richest-one-percent", "comp": "supporting-fairness", "kind": "think", "text": {"en": "In 2015, the richest one percent of the world's population caused more than twice the greenhouse gas emissions of the poorer half of humanity combined.", "de": "Das reichste Prozent der Weltbevölkerung verursachte 2015 mehr als doppelt so viele Treibhausgase wie die ärmere Hälfte der Menschheit zusammen."}, "q": {"en": "What would a fair way to share climate efforts look like?", "de": "Wie sähe eine faire Verteilung der Klimaschutz-Aufgaben aus?"}, "source": "UNEP, Emissions Gap Report 2020", "url": "https://www.unep.org/en/news-and-stories/press-release/green-pandemic-recovery-essential-close-climate-action-gap-un-report"},
  {"id": "heatwaves-grandchildren", "comp": "supporting-fairness", "kind": "think", "text": {"en": "According to one study, children born in 2020 will live through about seven times as many heatwaves as their grandparents – if today's climate pledges stay as they are.", "de": "Kinder, die 2020 geboren wurden, erleben laut einer Studie rund siebenmal so viele Hitzewellen wie ihre Grosseltern – wenn es bei den heutigen Klimazusagen bleibt."}, "q": {"en": "What do we owe the people who come after us?", "de": "Was schulden wir den Menschen, die nach uns kommen?"}, "source": "Thiery et al., Science, 2021 (press release PIK Potsdam, 2021)", "url": "https://www.pik-potsdam.de/en/news/latest-news/today2019s-children-to-experience-two-to-seven-times-more-extremes-than-their-grandparents"},
  {"id": "soil-most-species", "comp": "promoting-nature", "kind": "wow", "text": {"en": "An estimated 59 percent of all species live in soil – from fungi and worms to bacteria. No habitat on Earth is richer in species.", "de": "Vermutlich leben rund 59 Prozent aller Arten im Boden – von Pilzen über Würmer bis zu Bakterien. Kein Lebensraum der Erde ist artenreicher."}, "source": "Anthony, Bender & van der Heijden (WSL, Agroscope, Univ. Zürich), PNAS, 2023", "url": "https://www.pnas.org/doi/10.1073/pnas.2304663120"},
  {"id": "oak-2300-species", "comp": "promoting-nature", "kind": "wow", "text": {"en": "An oak is like a whole village: in Britain, around 2,300 species use oaks – birds, fungi, lichens, mosses, insects and mammals.", "de": "Eine Eiche ist wie ein ganzes Dorf: In Grossbritannien nutzen rund 2300 Arten Eichen – Vögel, Pilze, Flechten, Moose, Insekten und Säugetiere."}, "source": "Mitchell et al. (James Hutton Institute), Data in Brief, 2019", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6600707/"},
  {"id": "ocean-oxygen-half", "comp": "promoting-nature", "kind": "wow", "text": {"en": "Roughly half of the oxygen produced on Earth is made in the ocean – mostly by tiny plankton drifting in the water.", "de": "Rund die Hälfte des Sauerstoffs, der auf der Erde entsteht, wird im Meer gebildet – vor allem von winzigem Plankton, das im Wasser treibt."}, "source": "NOAA National Ocean Service, Ocean Facts (undated web page)", "url": "https://oceanservice.noaa.gov/facts/ocean-oxygen.html"},
  {"id": "night-light-pollinators", "comp": "systems-thinking", "kind": "wow", "text": {"en": "Light at night disturbs pollinators: on lit meadows in the Swiss Prealps, flowers got 62 percent fewer night-time visits – and later produced less fruit.", "de": "Licht in der Nacht stört Bestäuber: Auf beleuchteten Wiesen in den Schweizer Voralpen gab es 62 Prozent weniger nächtliche Blütenbesuche – und später weniger Früchte."}, "source": "Knop et al. (Universität Bern), Nature, 2017", "url": "https://www.nature.com/articles/nature23288"},
  {"id": "earthworms-millions", "comp": "systems-thinking", "kind": "wow", "text": {"en": "Up to three million earthworms live under one hectare of healthy grassland. Their burrows help rainwater soak into the soil instead of running off.", "de": "Unter einer Hektare gesunder Wiese leben bis zu drei Millionen Regenwürmer. Ihre Gänge helfen, dass Regenwasser im Boden versickert, statt abzufliessen."}, "source": "FiBL (Pfiffner), Merkblatt Regenwürmer / Bioaktuell, 2022", "url": "https://www.bioaktuell.ch/pflanzenbau/boden/allgemein/regenwurm.html"},
  {"id": "footprint-abroad", "comp": "systems-thinking", "kind": "think", "text": {"en": "More than three quarters of the environmental impact caused by consumption in Switzerland occurs abroad – where many of our goods are made.", "de": "Mehr als drei Viertel der Umweltbelastung, die der Konsum in der Schweiz verursacht, entstehen im Ausland – dort, wo viele unserer Waren hergestellt werden."}, "q": {"en": "What traces does your breakfast leave on other continents?", "de": "Welche Spuren hinterlässt dein Frühstück auf anderen Kontinenten?"}, "source": "BAFU, Umwelt-Fussabdrücke der Schweiz 2000–2023, 2026", "url": "https://www.bafu.admin.ch/de/ressourcenverbrauch"},
  {"id": "bacteria-myth", "comp": "critical-thinking", "kind": "wow", "text": {"en": "It was long claimed that our bodies hold ten times more bacteria than human cells. Newer calculations show: the numbers are roughly equal.", "de": "Lange hiess es, in unserem Körper lebten zehnmal mehr Bakterien als eigene Zellen. Neue Berechnungen zeigen: Es sind ungefähr gleich viele."}, "source": "Sender, Fuchs & Milo, PLoS Biology, 2016", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4991899/"},
  {"id": "swiss-forest-grows", "comp": "critical-thinking", "kind": "wow", "text": {"en": "Switzerland's forest is not shrinking but growing – and has been for over 150 years. Mostly in the mountains, where old pastures are turning back into forest.", "de": "Der Wald in der Schweiz schrumpft nicht, er wächst – schon seit über 150 Jahren. Vor allem in den Bergen wachsen alte Weiden wieder zu."}, "source": "BAFU & WSL, Waldbericht 2025", "url": "https://www.bafu.admin.ch/dam/de/sd-web/VL0obw1MJTg3/waldbericht_2025.pdf"},
  {"id": "cotton-bag-7100", "comp": "critical-thinking", "kind": "think", "text": {"en": "A Danish study compared shopping bags: a cotton bag would have to be used about 7,100 times to match a plastic bag on every environmental impact.", "de": "Eine dänische Studie verglich Einkaufstaschen: Eine Baumwolltasche müsste rund 7100 Mal benutzt werden, um bei allen Umweltwirkungen so gut zu sein wie ein Plastiksack."}, "q": {"en": "Why does the answer depend on what you measure?", "de": "Warum hängt die Antwort davon ab, was man misst?"}, "source": "Danish Environmental Protection Agency (Bisinella et al.), 2018", "url": "https://www2.mst.dk/udgiv/publications/2018/02/978-87-93614-73-4.pdf"},
  {"id": "co2-four-in-10000", "comp": "problem-framing", "kind": "think", "text": {"en": "Of every 10,000 molecules in the air, only just over 4 are CO2. That small amount is enough to noticeably warm Earth's climate.", "de": "Von 10 000 Teilchen in der Luft sind nur gut 4 CO2-Moleküle. Diese kleine Menge reicht, um das Klima der Erde spürbar zu erwärmen."}, "q": {"en": "How can so little have such a big effect?", "de": "Wie kann so wenig so viel bewirken?"}, "source": "NOAA Climate.gov, 2025 (NOAA Global Monitoring Laboratory data for 2024)", "url": "https://www.climate.gov/news-features/understanding-climate/climate-change-atmospheric-carbon-dioxide"},
  {"id": "honey-fungus-35ha", "comp": "problem-framing", "kind": "wow", "text": {"en": "Is this one single living thing? In the Swiss National Park, one individual honey fungus spreads underground across about 35 hectares.", "de": "Ist das ein einziges Lebewesen? Im Schweizerischen Nationalpark breitet sich ein einzelner Hallimasch-Pilz unter dem Boden über rund 35 Hektaren aus."}, "source": "WSL, via waldwissen.net (undated)", "url": "https://www.waldwissen.net/de/lebensraum-wald/pilze-und-flechten/der-groesste-pilz-der-schweiz"},
  {"id": "mammal-biomass-wild-5", "comp": "problem-framing", "kind": "think", "text": {"en": "If you weigh all the mammals on Earth, only about 5 percent are wild animals. The rest are humans and their livestock.", "de": "Wiegt man alle Säugetiere der Erde, sind nur rund 5 Prozent wilde Tiere. Der Rest sind Menschen und ihre Nutztiere."}, "q": {"en": "What does this number tell us – and what doesn't it?", "de": "Was sagt diese Zahl – und was sagt sie nicht?"}, "source": "Our World in Data (Ritchie & Spooner), 2024", "url": "https://ourworldindata.org/wild-mammals-birds-biomass"},
  {"id": "silene-30000-years", "comp": "futures-literacy", "kind": "wow", "text": {"en": "A ground squirrel once hid fruits in Siberian permafrost. About 30,000 years later, researchers grew plants from them that flowered and made seeds.", "de": "Ein Erdhörnchen versteckte einst Früchte im sibirischen Dauerfrost. Rund 30 000 Jahre später zogen Forschende daraus Pflanzen, die blühten und Samen bildeten."}, "source": "Yashina et al., PNAS, 2012", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3309767/"},
  {"id": "greenland-shark-272", "comp": "futures-literacy", "kind": "wow", "text": {"en": "Greenland sharks can live for at least 272 years. As far as we know, no other vertebrate lives that long.", "de": "Grönlandhaie können mindestens 272 Jahre alt werden. Kein anderes Wirbeltier lebt nach heutigem Wissen so lange."}, "source": "Nielsen et al., Science, 2016", "url": "https://ora.ox.ac.uk/objects/pubs:633506"},
  {"id": "nuclear-waste-200000", "comp": "futures-literacy", "kind": "think", "text": {"en": "High-level waste from Swiss nuclear power plants must stay safely sealed away from where people live for around 200,000 years.", "de": "Hochaktive Abfälle aus Schweizer Atomkraftwerken müssen rund 200 000 Jahre sicher eingeschlossen bleiben, fern vom Lebensraum der Menschen."}, "q": {"en": "How do you warn people living 200,000 years from now?", "de": "Wie warnt man Menschen, die in 200 000 Jahren leben?"}, "source": "Nagra, web page Langzeitsicherheit (accessed 2026)", "url": "https://www.nagra.ch/de/sicherheit.htm"},
  {"id": "marmot-heartbeat", "comp": "adaptability", "kind": "wow", "text": {"en": "During hibernation, a marmot's heart beats only 4 to 6 times a minute – instead of up to 140 times when it is awake.", "de": "Im Winterschlaf schlägt das Herz eines Murmeltiers nur noch 4 bis 6 Mal pro Minute – statt bis zu 140 Mal wie im wachen Zustand."}, "source": "Arnold (Vetmeduni Wien, Forschungsinstitut für Wildtierkunde), Weidwerk, 2015", "url": "https://www.vetmeduni.ac.at/fileadmin/v/fiwi/Publikationen/Populaerwissenschaftliche/Arnold_2015_Murmeltiere_Weidwerk.pdf"},
  {"id": "summit-plants-five-times", "comp": "adaptability", "kind": "wow", "text": {"en": "Plants are climbing uphill with the warmth: on Europe's summits, five times as many new species arrived between 2007 and 2016 as 50 years earlier.", "de": "Pflanzen wandern mit der Wärme bergauf: Auf Europas Gipfeln kamen zwischen 2007 und 2016 fünfmal so viele neue Arten dazu wie 50 Jahre zuvor."}, "source": "Steinbauer et al., Nature, 2018", "url": "https://www.nature.com/articles/s41586-018-0005-6"},
  {"id": "test-trees-55000", "comp": "adaptability", "kind": "think", "text": {"en": "Over 55,000 young test trees of 18 species are growing across Switzerland. Researchers are checking which ones can cope with the climate of coming decades.", "de": "In der ganzen Schweiz wachsen über 55 000 junge Testbäume von 18 Arten. Forschende prüfen, welche mit dem Klima der nächsten Jahrzehnte zurechtkommen."}, "q": {"en": "What would you plant today so it still thrives in 2100?", "de": "Was würdest du heute pflanzen, damit es 2100 noch gedeiht?"}, "source": "WSL, Projekt Testpflanzungen zukunftsfähiger Baumarten, 2023", "url": "https://www.wsl.ch/en/news/55000-baeume-fuer-einen-klimafitten-wald-der-letzte-setzling-wurde-gepflanzt/"},
  {"id": "velcro-burrs-1951", "comp": "exploratory-thinking", "kind": "wow", "text": {"en": "A Swiss engineer saw tiny hooks on burrs from his dog's fur under a microscope. In 1951, he applied for a patent on the hook-and-loop fastener.", "de": "Ein Schweizer Ingenieur sah unter dem Mikroskop winzige Häkchen an Kletten aus dem Fell seines Hundes. 1951 meldete er den Klettverschluss zum Patent an."}, "source": "Eidgenössisches Institut für Geistiges Eigentum (IGE), 2021", "url": "https://www.ige.ch/en/blog/blog-article/wie-ein-schweizer-den-klettverschluss-erfand"},
  {"id": "slime-mould-railway", "comp": "exploratory-thinking", "kind": "wow", "text": {"en": "A brainless slime mould linked oat flakes, placed like the cities around Tokyo, in 26 hours. Its network resembled the real rail network.", "de": "Ein Schleimpilz ohne Gehirn verband in 26 Stunden Haferflocken, die wie die Städte rund um Tokio verteilt waren. Sein Netz glich dem echten Bahnnetz."}, "source": "Tero et al., Science, 2010 (Science news report, 2010)", "url": "https://www.science.org/content/article/ride-slime-mold-express"},
  {"id": "primrose-hears-bees", "comp": "exploratory-thinking", "kind": "wow", "text": {"en": "In an experiment, evening primroses responded to the buzz of bees: within 3 minutes, their nectar became sweeter. Their petals vibrated with the sound.", "de": "In einem Versuch reagierten Nachtkerzen auf das Summen von Bienen: Innerhalb von 3 Minuten wurde ihr Nektar süsser. Die Blütenblätter schwangen dabei mit."}, "source": "Veits et al., Ecology Letters, 2019", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6852653/"},
  {"id": "bee-swarm-vote", "comp": "political-agency", "kind": "wow", "text": {"en": "A swarm of about 10,000 honeybees chooses its new home in a kind of vote: scouts campaign for sites until one gains enough support.", "de": "Ein Bienenschwarm mit rund 10 000 Tieren wählt sein neues Zuhause in einer Art Abstimmung: Kundschafterinnen werben für Orte, bis einer genug Unterstützung hat."}, "source": "Cornell Chronicle (Thomas Seeley), 2006", "url": "https://news.cornell.edu/stories/2006/04/honeybee-decision-making-ability-rivals-any-department-committee"},
  {"id": "moorland-vote-1987", "comp": "political-agency", "kind": "wow", "text": {"en": "Moorlands are protected by the Swiss Federal Constitution – because in 1987, 57.8 percent of voters said yes to the Rothenthurm initiative.", "de": "Moore stehen in der Schweizer Bundesverfassung unter Schutz – weil 1987 an der Urne 57,8 Prozent Ja zur Rothenthurm-Initiative sagten."}, "source": "BAFU, Zustand und Entwicklung der Moore in der Schweiz (result also listed by the Federal Chancellery)", "url": "https://www.bafu.admin.ch/dam/de/sd-web/VxiC5XLwNHbD/zustand_und_entwicklungdermooreinderschweiz.pdf"},
  {"id": "alpine-freight-rail", "comp": "political-agency", "kind": "think", "text": {"en": "Since a 1994 popular vote, freight crossing the Swiss Alps is meant to go by rail. In 2025, just over two thirds travelled by train.", "de": "Seit einem Volksentscheid von 1994 soll der Güterverkehr durch die Schweizer Alpen auf die Schiene. 2025 fuhren etwas mehr als zwei Drittel der Güter per Bahn."}, "q": {"en": "What does it take for a popular vote to really work?", "de": "Was braucht es, damit ein Volksentscheid wirklich wirkt?"}, "source": "Bundesamt für Verkehr (BAV), 2026", "url": "https://www.news.admin.ch/de/newnsb/pAzo0IO4kxRefXD7Hdnrf"},
  {"id": "starlings-seven-neighbours", "comp": "collective-action", "kind": "wow", "text": {"en": "A flock of thousands of starlings moves like a single creature. The secret: each bird pays attention only to its six or seven nearest neighbours.", "de": "Ein Starenschwarm aus Tausenden Vögeln bewegt sich wie ein einziges Wesen. Das Geheimnis: Jeder Star achtet nur auf seine sechs bis sieben nächsten Nachbarn."}, "source": "Ballerini et al., PNAS, 2008", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2234121/"},
  {"id": "bearded-vulture-35-pairs", "comp": "collective-action", "kind": "wow", "text": {"en": "Bearded vultures had vanished from the Alps. Thanks to a joint project of several Alpine countries, 35 pairs bred in Switzerland alone in 2025.", "de": "Bartgeier waren in den Alpen ausgerottet. Dank einem gemeinsamen Projekt mehrerer Alpenländer brüteten 2025 allein in der Schweiz wieder 35 Paare."}, "source": "Schweizerische Vogelwarte Sempach, species page Bartgeier (status 2025)", "url": "https://www.vogelwarte.ch/de/artenfoerderung-voegel-schweiz/prioritaetsarten/bartgeier/"},
  {"id": "montreal-protocol-all", "comp": "collective-action", "kind": "think", "text": {"en": "In 2009, the Montreal Protocol to protect the ozone layer became the first UN treaty ratified by every country in the world. The ozone layer is slowly recovering.", "de": "2009 wurde das Montreal-Protokoll zum Schutz der Ozonschicht als erster UNO-Vertrag von allen Staaten der Welt ratifiziert. Die Ozonschicht erholt sich langsam."}, "q": {"en": "What does it take for every country to join in?", "de": "Was braucht es, damit alle Länder bei etwas mitmachen?"}, "source": "United Nations, International Day for the Preservation of the Ozone Layer", "url": "https://www.un.org/en/observances/ozone-day"},
  {"id": "jay-5000-acorns", "comp": "individual-initiative", "kind": "wow", "text": {"en": "A single jay can hide up to 5,000 acorns in autumn. The ones it never finds again can sprout – so it helps plant new oaks.", "de": "Ein einzelner Eichelhäher kann im Herbst bis zu 5000 Eicheln verstecken. Was er nicht wiederfindet, kann keimen – so hilft er, neue Eichen zu pflanzen."}, "source": "waldwissen.net (Markwart, der vorlaute Eichenpflanzer); Schweizerische Zeitschrift für Forstwesen, 2025", "url": "https://www.waldwissen.net/de/lebensraum-wald/tiere-im-wald/voegel/markwart-der-vorlaute-eichenpflanzer"},
  {"id": "repair-cafe-4000", "comp": "individual-initiative", "kind": "wow", "text": {"en": "In 2009, Martine Postma invited people to the first Repair Café in Amsterdam. In 2026, the world's 4,000th Repair Café opened – in Canada.", "de": "2009 lud Martine Postma in Amsterdam zum ersten Repair Café ein. 2026 kam weltweit das 4000. Repair Café dazu – in Kanada."}, "source": "Repair Café International, 2026", "url": "https://www.repaircafe.org/en/the-worlds-4000th-repair-cafe-is-in-canada/"},
  {"id": "heating-one-degree", "comp": "individual-initiative", "kind": "think", "text": {"en": "Lowering the room temperature by one degree saves around 6 to 10 percent of heating costs. One small turn of the thermostat works every winter day.", "de": "Ein Grad weniger Raumtemperatur spart rund 6 bis 10 Prozent Heizkosten. Ein kleiner Dreh am Thermostat wirkt jeden Tag des Winters."}, "q": {"en": "How warm does home need to be for you to feel cosy?", "de": "Wie warm muss es zuhause sein, damit du dich wohlfühlst?"}, "source": "EnergieSchweiz (Swiss Federal Office of Energy), Wintertipps (accessed 2026)", "url": "https://www.energieschweiz.ch/stories/wintertipps/"},
  {"id": "tree-view-hospital-stay", "comp": "valuing-sustainability", "kind": "wow", "text": {"en": "In one study, patients with a view of trees stayed in hospital for about 8 days after surgery – with a view of a wall, almost 9 days.", "de": "In einer Studie lagen Kranke mit Blick auf Bäume nach einer Operation rund 8 Tage im Spital – mit Blick auf eine Mauer fast 9 Tage."}, "source": "Roger S. Ulrich, Science, 1984", "url": "https://www.wrrc.arizona.edu/sites/default/files/ulrich-view%20through%20a%20window.pdf"},
  {"id": "awe-walk-15-minutes", "comp": "valuing-sustainability", "kind": "wow", "text": {"en": "In one experiment, older people went for a 15-minute 'awe walk' every week. Over time they felt happier and smiled more broadly in their selfies.", "de": "In einem Versuch gingen ältere Menschen jede Woche 15 Minuten staunend spazieren. Mit der Zeit fühlten sie sich froher und lächelten auf ihren Selfies breiter."}, "source": "Sturm et al., Emotion, 2020 (UCSF)", "url": "https://www.ucsf.edu/news/2020/09/418551/awe-walks-boost-emotional-well-being"},
  {"id": "birds-wellbeing-8-hours", "comp": "valuing-sustainability", "kind": "wow", "text": {"en": "In a London study, people felt better when they saw or heard birds – for up to eight hours afterwards.", "de": "In einer Londoner Studie ging es Menschen besser, wenn sie Vögel sahen oder hörten – noch bis zu acht Stunden danach."}, "source": "Hammoud et al., Scientific Reports, 2022 (King's College London)", "url": "https://www.kcl.ac.uk/news/feeling-chirpy-being-around-birds-is-linked-to-lasting-mental-health-benefits"},
  {"id": "car-free-sundays-1973", "comp": "valuing-sustainability", "kind": "wow", "text": {"en": "Because of the oil crisis, Switzerland had three car-free Sundays at the end of 1973. People went for walks and rode bicycles on the motorways.", "de": "Wegen der Ölkrise waren Ende 1973 in der Schweiz drei Sonntage autofrei. Auf den Autobahnen gingen Menschen spazieren und fuhren Velo."}, "source": "SRF (Schweizer Radio und Fernsehen), 2023", "url": "https://www.srf.ch/radio-srf-musikwelle/vor-50-jahren-drei-sonntage-autofrei"},
  {"id": "part-time-4-in-10", "comp": "valuing-sustainability", "kind": "think", "text": {"en": "In Switzerland, almost 4 in 10 working people work part-time. In Europe, only the Netherlands has a higher share.", "de": "In der Schweiz arbeiten fast 4 von 10 Berufstätigen Teilzeit. In Europa ist dieser Anteil nur in den Niederlanden höher."}, "q": {"en": "What matters more to you: more time or more money?", "de": "Was ist dir wichtiger: mehr Zeit oder mehr Geld?"}, "source": "Bundesamt für Statistik (BFS), Medienmitteilung 2025 (Daten 2024)", "url": "https://www.admin.ch/de/newnsb/aKQ5sPeICslmVN0GN1CYd"},
  {"id": "living-space-47m2", "comp": "valuing-sustainability", "kind": "think", "text": {"en": "In Switzerland, each person has almost 47 square metres of living space on average. The figure rose for years and has stayed level for a while now.", "de": "In der Schweiz hat jede Person im Schnitt knapp 47 Quadratmeter Wohnfläche. Lange stieg dieser Wert, seit ein paar Jahren bleibt er etwa gleich."}, "q": {"en": "How much space does a good life need?", "de": "Wie viel Platz braucht ein gutes Leben?"}, "source": "Bundesamt für Statistik (BFS), Gebäude- und Wohnungsstatistik 2024 (via Keystone-SDA)", "url": "https://www.swissinfo.ch/ger/in-den-meisten-einfamilienh%C3%A4usern-wohnen-h%C3%B6chstens-zwei-personen/90043705"},
  {"id": "babies-expect-fairness", "comp": "supporting-fairness", "kind": "wow", "text": {"en": "In one experiment, babies just 15 months old looked longer when food was shared out unequally – they had probably expected fairness.", "de": "In einem Versuch schauten schon 15 Monate alte Babys länger hin, wenn Essen ungleich verteilt wurde – sie hatten vermutlich Fairness erwartet."}, "source": "Schmidt & Sommerville, PLoS ONE, 2011 (University of Washington)", "url": "https://www.washington.edu/news/2011/10/07/babies-show-sense-of-fairness-altruism-as-early-as-15-months/"},
  {"id": "vampire-bats-share-blood", "comp": "supporting-fairness", "kind": "wow", "text": {"en": "If a vampire bat finds no blood for two nights, it risks starving. Well-fed bats from its group often regurgitate blood for it.", "de": "Findet eine Vampirfledermaus zwei Nächte lang kein Blut, droht sie zu verhungern. Oft würgen dann satte Tiere aus ihrer Gruppe Blut für sie hervor."}, "source": "Gerald S. Wilkinson, Scientific American, 1990", "url": "https://www.scientificamerican.com/author/gerald-s-wilkinson"},
  {"id": "ravens-remember-fair-partners", "comp": "supporting-fairness", "kind": "wow", "text": {"en": "Ravens remember who trades fairly: in an experiment at the University of Vienna, they still preferred fair trading partners a month later.", "de": "Raben merken sich, wer fair tauscht: In einem Versuch der Universität Wien wählten sie noch nach einem Monat lieber faire Tauschpartner."}, "source": "Müller, Massen, Bugnyar & Osvath, Animal Behaviour, 2017", "url": "https://research-portal.uu.nl/en/publications/ravens-remember-the-nature-of-a-single-reciprocal-interaction-seq/"},
  {"id": "guinea-pigs-in-pairs", "comp": "supporting-fairness", "kind": "wow", "text": {"en": "In Switzerland, guinea pigs must as a rule live at least in pairs. No human and no rabbit can replace another guinea pig.", "de": "Meerschweinchen müssen in der Schweiz grundsätzlich mindestens zu zweit leben. Denn kein Mensch und kein Kaninchen ersetzt einen Artgenossen."}, "source": "Bundesamt für Lebensmittelsicherheit und Veterinärwesen (BLV)", "url": "https://www.blv.admin.ch/de/nager"},
  {"id": "ahv-vote-1947", "comp": "supporting-fairness", "kind": "think", "text": {"en": "In 1947, 80 percent of voters said yes to the AHV, Switzerland's old-age pension for everyone.", "de": "1947 sagten 80 Prozent der Stimmenden Ja zur AHV, der Rente im Alter für alle in der Schweiz."}, "q": {"en": "What do young and old owe each other?", "de": "Was schulden sich Junge und Alte gegenseitig?"}, "source": "Swissvotes (Universität Bern), Volksabstimmung vom 6. Juli 1947", "url": "https://swissvotes.ch/vote/144.00/kurzbeschreibung-de.pdf"},
  {"id": "safe-water-one-in-four", "comp": "supporting-fairness", "kind": "think", "text": {"en": "Around 2.1 billion people – one in four on Earth – have no safe drinking water at home.", "de": "Rund 2,1 Milliarden Menschen – jeder vierte Mensch auf der Erde – haben kein sicheres Trinkwasser zu Hause."}, "q": {"en": "What would change in your day without clean tap water?", "de": "Was wäre in deinem Alltag anders ohne sauberes Hahnenwasser?"}, "source": "WHO & UNICEF, Joint Monitoring Programme (JMP), 2025 (Daten 2024)", "url": "https://www.who.int/news/item/26-08-2025-1-in-4-people-globally-still-lack-access-to-safe-drinking-water---who--unicef"},
  {"id": "fairtrade-one-billion-francs", "comp": "supporting-fairness", "kind": "think", "text": {"en": "In 2024, people in Switzerland bought more than one billion francs' worth of Fairtrade products for the first time.", "de": "2024 kauften die Menschen in der Schweiz zum ersten Mal für mehr als eine Milliarde Franken Fairtrade-Produkte."}, "q": {"en": "What makes a price fair – and for whom?", "de": "Was macht einen Preis fair – und für wen?"}, "source": "Fairtrade Max Havelaar Schweiz, Jahresbericht 2024", "url": "https://www.fairtrade.net/ch-de/mach-mit/news/jahresbericht-2024-ftmh.html"},
  {"id": "alpine-swift-200-days", "comp": "promoting-nature", "kind": "wow", "text": {"en": "Alpine swifts probably stay in the air for around 200 days at a stretch – they even eat and sleep while flying.", "de": "Alpensegler bleiben vermutlich rund 200 Tage am Stück in der Luft – sie fressen und schlafen sogar im Flug."}, "source": "Liechti et al., Nature Communications, 2013 (Schweizerische Vogelwarte)", "url": "https://www.nature.com/articles/ncomms3554"},
  {"id": "alpine-salamander-pregnancy", "comp": "promoting-nature", "kind": "wow", "text": {"en": "Alpine salamanders carry their young for two to four years – the higher up they live, the longer. Then fully formed little salamanders are born.", "de": "Alpensalamander tragen ihre Jungen zwei bis vier Jahre im Bauch – je höher sie leben, desto länger. Dann kommen fertige kleine Salamander zur Welt."}, "source": "Naturschutzbund Österreich, Steckbrief Alpensalamander; DGHT, Lurch des Jahres 2026", "url": "https://naturschutzbund.at/files/projekte_aktionen/netzwerk_amphibien/unterlagen/SteckbriefAlpensalamander.pdf"},
  {"id": "saxifrage-4505-metres", "comp": "promoting-nature", "kind": "wow", "text": {"en": "On the Dom in Valais, purple saxifrage blooms at 4,505 metres. No flowering plant has yet been found higher up in Europe.", "de": "Am Dom im Wallis blüht der Gegenblättrige Steinbrech auf 4505 Metern. Bisher wurde in Europa keine Blütenpflanze höher oben gefunden."}, "source": "Christian Körner, Alpine Botany, 2011 (Universität Basel)", "url": "https://phys.org/news/2011-05-4505m-swiss-alps.html"},
  {"id": "eel-journey-sargasso", "comp": "promoting-nature", "kind": "wow", "text": {"en": "European eels swim all the way to the Sargasso Sea in the Atlantic to spawn – 5,000 to 10,000 kilometres, depending on where they start.", "de": "Europäische Aale schwimmen zum Laichen bis in die Sargassosee im Atlantik – je nach Herkunft 5000 bis 10 000 Kilometer weit."}, "source": "Wright et al., Scientific Reports, 2022", "url": "https://orbit.dtu.dk/en/publications/first-direct-evidence-of-adult-european-eels-migrating-to-their-b/"},
  {"id": "virus-dna-8-percent", "comp": "promoting-nature", "kind": "wow", "text": {"en": "Around 8 percent of our DNA comes from viruses. They built themselves into the genes of our ancestors a very long time ago.", "de": "Rund 8 Prozent unseres Erbguts stammen von Viren. Sie haben sich vor sehr langer Zeit in die Gene unserer Vorfahren eingebaut."}, "source": "The Conversation, 2022 (Fachartikel zu menschlichen endogenen Retroviren)", "url": "https://theconversation.com/humans-are-8-virus-how-the-ancient-viral-dna-in-your-genome-plays-a-role-in-human-disease-and-development-192322"},
  {"id": "swiss-red-list-third", "comp": "promoting-nature", "kind": "think", "text": {"en": "A good third of the animal, plant and fungus species assessed in Switzerland are threatened or already extinct.", "de": "Gut ein Drittel der untersuchten Tier-, Pflanzen- und Pilzarten der Schweiz ist gefährdet oder schon ausgestorben."}, "q": {"en": "Does a species matter even if it's no use to us?", "de": "Hat eine Art einen Wert, auch wenn sie uns nichts nützt?"}, "source": "Bundesamt für Umwelt (BAFU), Rote Listen (Stand 2022)", "url": "https://www.bafu.admin.ch/de/artenvielfalt"},
  {"id": "beaver-streams-more-species", "comp": "systems-thinking", "kind": "wow", "text": {"en": "Where beavers dam streams, life flourishes: a Swiss study found more than twice as many species along beaver streams as on stretches without beavers.", "de": "Wo Biber Bäche stauen, blüht das Leben: Eine Schweizer Studie fand an Biberbächen mehr als doppelt so viele Arten wie an Abschnitten ohne Biber."}, "source": "BAFU & info fauna, Synthesebericht «Der Biber – ein wirkungsvoller Partner für lebendige Gewässer», 2025", "url": "https://www.infofauna.ch/sites/default/files/files/publications/synthesebericht_biber_2025_der-biber_ein-wirkungsvoller-partner-fur-lebendige-gewasser_0.pdf"},
  {"id": "sahara-dust-feeds-amazon", "comp": "systems-thinking", "kind": "wow", "text": {"en": "Dust from the Sahara fertilises the Amazon rainforest: each year the wind carries an estimated 22,000 tonnes of phosphorus across the Atlantic.", "de": "Staub aus der Sahara düngt den Amazonas-Regenwald: Jedes Jahr trägt der Wind geschätzt rund 22 000 Tonnen Phosphor über den Atlantik."}, "source": "Yu et al., Geophysical Research Letters, 2015 (NASA / University of Maryland)", "url": "https://essic.umd.edu/estimates-of-saharan-dust-in-amazon/"},
  {"id": "salmon-feed-the-forest", "comp": "systems-thinking", "kind": "wow", "text": {"en": "Dead salmon fertilise the forest: trees and shrubs along salmon streams in Alaska get around a quarter of the nitrogen in their leaves from the fish.", "de": "Tote Lachse düngen den Wald: Bäume und Sträucher an Lachsbächen in Alaska holen rund ein Viertel des Stickstoffs in ihren Blättern aus den Fischen."}, "source": "Helfield & Naiman, Oecologia, 2002", "url": "https://works.bepress.com/helfield_james/7/"},
  {"id": "water-in-air-9-days", "comp": "systems-thinking", "kind": "wow", "text": {"en": "Evaporated water stays in the air for only about 9 days on average. Then it falls back to Earth as rain or snow.", "de": "Verdunstetes Wasser bleibt im Schnitt nur rund 9 Tage in der Luft. Dann fällt es als Regen oder Schnee wieder auf die Erde."}, "source": "van der Ent & Tuinenburg, Hydrology and Earth System Sciences, 2017", "url": "https://hess.copernicus.org/articles/21/779/2017/"},
  {"id": "plants-partner-with-fungi", "comp": "systems-thinking", "kind": "wow", "text": {"en": "More than 8 in 10 plant species live together with fungi on their roots: the fungi supply water and nutrients, and the plants give sugar in return.", "de": "Mehr als 8 von 10 Pflanzenarten leben an ihren Wurzeln mit Pilzen zusammen: Die Pilze liefern Wasser und Nährstoffe, die Pflanzen geben dafür Zucker."}, "source": "Brundrett & Tedersoo, New Phytologist, 2018", "url": "https://sisu.ut.ee/wp-content/uploads/sites/474/brundretttedersoonew_phytologist_-_2018_-_brundrett_-_evolutionary_history_of_mycorrhizal_symbioses_and_global_host_plant_diversity.pdf"},
  {"id": "nitrogen-90-percent-forest", "comp": "systems-thinking", "kind": "think", "text": {"en": "On about 90 percent of Swiss forest land, more nitrogen falls from the air than the forest can bear long-term. Much of it comes from farming.", "de": "Auf rund 90 Prozent der Schweizer Waldfläche fällt mehr Stickstoff aus der Luft, als der Wald auf Dauer verträgt. Ein grosser Teil stammt aus der Landwirtschaft."}, "q": {"en": "When does something useful become too much of a good thing?", "de": "Wann wird etwas Nützliches zu viel des Guten?"}, "source": "Bundesamt für Umwelt (BAFU), Stickstoffeinträge", "url": "https://www.bafu.admin.ch/de/stickstoffeintraege"},
  {"id": "tyre-rubber-200000-tonnes", "comp": "systems-thinking", "kind": "think", "text": {"en": "Over about 30 years, around 200,000 tonnes of rubber particles have built up in Switzerland's environment – almost all of it worn off tyres.", "de": "In rund 30 Jahren haben sich in der Schweiz etwa 200 000 Tonnen Gummiteilchen in der Umwelt angesammelt – fast alles Abrieb von Reifen."}, "q": {"en": "Which consequences only become visible after decades?", "de": "Welche Folgen bemerkt man erst nach Jahrzehnten?"}, "source": "Empa, 2020 (berichtet von SRF)", "url": "https://www.srf.ch/news/schweiz/reifenabrieb-ist-ein-problem-mikrogummi-ist-schlimmer-als-mikroplastik"},
  {"id": "saentis-lightning-100-times", "comp": "critical-thinking", "kind": "wow", "text": {"en": "Lightning never strikes the same place twice? The transmitter tower on the Säntis is hit about 100 times a year.", "de": "Der Blitz schlägt nie zweimal am selben Ort ein? Den Sendeturm auf dem Säntis trifft er rund 100-mal pro Jahr."}, "source": "EPFL, Säntis lightning research station (Rachidi et al.); review 2022", "url": "https://www.epfl.ch/labs/emc/page-97269-en-html"},
  {"id": "earth-closest-to-sun-in-january", "comp": "critical-thinking", "kind": "wow", "text": {"en": "In January, Earth is closest to the Sun – about 5 million kilometres nearer than in July. The seasons come from Earth's tilted axis.", "de": "Im Januar ist die Erde der Sonne am nächsten – rund 5 Millionen Kilometer näher als im Juli. Die Jahreszeiten entstehen durch die schräge Erdachse."}, "source": "NASA Science, Milankovitch (Orbital) Cycles, 2020", "url": "https://climate.nasa.gov/news/2948/milankovitch-orbital-cycles-and-their-role-in-earths-climate/"},
  {"id": "big-old-trees-keep-growing", "comp": "critical-thinking", "kind": "wow", "text": {"en": "Old trees barely grow? Quite the opposite: a single large tree can add as much carbon in one year as an entire mid-sized tree contains.", "de": "Alte Bäume wachsen kaum noch? Im Gegenteil: Ein einziger grosser Baum kann in einem Jahr so viel Kohlenstoff zulegen, wie ein ganzer mittelgrosser Baum enthält."}, "source": "Stephenson et al., Nature 507, 2014 (403 tree species)", "url": "https://www.usgs.gov/publications/rate-tree-carbon-accumulation-increases-continuously-tree-size"},
  {"id": "cow-methane-mostly-burps", "comp": "critical-thinking", "kind": "wow", "text": {"en": "Cow methane mostly comes out the back end? No: about 95 percent of it is burped out.", "de": "Das Methan der Kühe kommt vor allem hinten raus? Nein: Rund 95 Prozent davon rülpsen sie aus."}, "source": "UC Davis CLEAR Center, 2023", "url": "https://clear.ucdavis.edu/news/state-science-summit-seven-things-you-dont-have-be-science-whiz-wrap-your-head-around"},
  {"id": "lemmings-no-mass-suicide", "comp": "critical-thinking", "kind": "wow", "text": {"en": "Lemmings do not leap to their deaths en masse. The famous footage comes from a 1958 Disney film – and was staged.", "de": "Lemminge stürzen sich nicht massenhaft in den Tod. Die berühmten Bilder dazu stammen aus einem Disney-Film von 1958 – und waren gestellt."}, "source": "Alaska Department of Fish and Game, Alaska Fish & Wildlife News (R. Woodford), 2003", "url": "https://www.adfg.alaska.gov/index.cfm?adfg=wildlifenews.view_article&articles_id=56"},
  {"id": "ev-lifecycle-73-percent-less", "comp": "critical-thinking", "kind": "think", "text": {"en": "Are electric cars worse for the climate due to their batteries? Over their lifetime, new ones in the EU emit about 73% less greenhouse gas than petrol cars.", "de": "Elektroautos sind wegen der Batterie schlechter fürs Klima? Neue E-Autos verursachen in der EU über ihr ganzes Leben rund 73 Prozent weniger Treibhausgase als Benziner."}, "q": {"en": "Why do some beliefs persist even when studies show otherwise?", "de": "Warum halten sich manche Annahmen, obwohl Studien anderes zeigen?"}, "source": "ICCT (Negri & Bieker), 2025", "url": "https://theicct.org/pr-electric-cars-getting-cleaner-faster/"},
  {"id": "plastic-only-9-percent-recycled", "comp": "critical-thinking", "kind": "think", "text": {"en": "Worldwide, only about 9 percent of plastic waste actually gets recycled. The rest is burned, landfilled or ends up in the environment.", "de": "Weltweit wird nur rund 9 Prozent des Plastikabfalls tatsächlich rezykliert. Der Rest wird verbrannt, deponiert oder landet in der Umwelt."}, "q": {"en": "Why is plastic so hard to keep in the loop?", "de": "Warum ist Plastik so schwer im Kreislauf zu halten?"}, "source": "OECD, Global Plastics Outlook, 2022 (data for 2019)", "url": "https://www.oecd.org/en/about/news/press-releases/2022/02/plastic-pollution-is-growing-relentlessly-as-waste-management-and-recycling-fall-short.html"},
  {"id": "mercator-africa-14-greenlands", "comp": "problem-framing", "kind": "wow", "text": {"en": "On many world maps, Greenland and Africa look about the same size. In reality, Africa is roughly 14 times larger.", "de": "Auf vielen Weltkarten wirken Grönland und Afrika etwa gleich gross. In Wirklichkeit ist Afrika rund 14-mal grösser."}, "source": "AP / Reuters reporting on the African Union's «Correct The Map» endorsement, Aug 2025", "url": "https://uk.news.yahoo.com/campaigners-want-change-world-map-122239491.html"},
  {"id": "ants-per-person", "comp": "problem-framing", "kind": "wow", "text": {"en": "There are about 2.5 million ants for every human. A research team estimated this from counts all over the world.", "de": "Auf jeden Menschen kommen rund 2,5 Millionen Ameisen. Das schätzt ein Forschungsteam aus Zählungen auf der ganzen Welt."}, "source": "Schultheiss et al., PNAS 2022 (University of Würzburg press release)", "url": "https://idw-online.de/-DDq_AA"},
  {"id": "biodegradable-bags-three-years", "comp": "problem-framing", "kind": "wow", "text": {"en": "In one experiment, ‘biodegradable’ plastic bags could still carry shopping after more than three years in the sea or in soil.", "de": "In einem Versuch konnten «biologisch abbaubare» Plastiksäcke nach über drei Jahren im Meer oder in der Erde noch Einkäufe tragen."}, "source": "Napper & Thompson, Environmental Science & Technology, 2019 (University of Plymouth)", "url": "https://www.sci.news/othersciences/materials/biodegradable-bags-07139.html"},
  {"id": "metres-above-sea-not-equal", "comp": "problem-framing", "kind": "wow", "text": {"en": "‘Metres above sea level’ is not the same everywhere: Switzerland measures from Marseille, Germany from Amsterdam. Depending on the place, heights differ by about 30 centimetres.", "de": "«Meter über Meer» ist nicht überall gleich: Die Schweiz misst ab Marseille, Deutschland ab Amsterdam. Je nach Ort liegen die Höhen rund 30 Zentimeter auseinander."}, "source": "swisstopo / Kanton Basel-Stadt, 200 Jahre Repère Pierre du Niton, 2020", "url": "https://www.bs.ch/news/2020-200-jahre-repere-pierre-du-niton"},
  {"id": "banana-is-a-berry", "comp": "problem-framing", "kind": "wow", "text": {"en": "To botanists, a banana is a berry – but a strawberry is not: its ‘seeds’ are actually tiny fruits.", "de": "Für die Botanik ist die Banane eine Beere – die Erdbeere aber nicht: Ihre «Kerne» sind eigentlich winzige Früchte."}, "source": "Live Science, with a UC Davis plant scientist", "url": "https://www.livescience.com/57477-why-are-bananas-considered-berries.html"},
  {"id": "forest-definition-10-percent", "comp": "problem-framing", "kind": "think", "text": {"en": "In the UN's global statistics, land already counts as forest when tree crowns cover more than 10 percent of the ground.", "de": "Für die Weltstatistik der UNO gilt eine Fläche schon als Wald, wenn Baumkronen mehr als 10 Prozent des Bodens bedecken."}, "q": {"en": "When does a forest really count as a forest for you?", "de": "Ab wann ist ein Wald für dich ein Wald?"}, "source": "FAO, Global Forest Resources Assessment 2020 – Terms and definitions", "url": "https://fra-data.fao.org/definitions/fra/2020/en/tad"},
  {"id": "methane-depends-on-timescale", "comp": "problem-framing", "kind": "think", "text": {"en": "How strongly does a kilogram of methane warm the planet? Over 20 years, about 80 times as much as CO₂; over 100 years, about 30 times.", "de": "Wie stark wärmt ein Kilo Methan? Über 20 Jahre gerechnet rund 80-mal so stark wie CO₂, über 100 Jahre gerechnet rund 30-mal."}, "q": {"en": "Which time span should count in climate decisions?", "de": "Welcher Zeitraum sollte bei Klimaentscheiden zählen?"}, "source": "UNEP 2021; IPCC AR6 WG1, Chapter 7 (2021)", "url": "https://www.unep.org/en/explore-topics/energy/facts-about-methane"},
  {"id": "eunice-foote-1856", "comp": "futures-literacy", "kind": "wow", "text": {"en": "In 1856, Eunice Foote showed in an experiment that CO₂ heats up more in sunlight than air. She concluded that more CO₂ could warm the Earth.", "de": "Schon 1856 zeigte Eunice Foote in einem Versuch: CO₂ erwärmt sich im Sonnenlicht stärker als Luft. Sie folgerte, mehr CO₂ könne die Erde erwärmen."}, "source": "American Physical Society (APS News), 2023; NOAA Climate.gov", "url": "https://www.aps.org/apsnews/2023/07/carbon-dioxide-atmosphere-eunice-foote"},
  {"id": "future-library-2114", "comp": "futures-literacy", "kind": "wow", "text": {"en": "Near Oslo, trees are growing for a collection of books that will only be printed in 2114. Until then, every year one author hands in an unpublished text.", "de": "Bei Oslo wachsen Bäume für eine Büchersammlung, die erst 2114 gedruckt wird. Bis dahin gibt jedes Jahr eine Autorin oder ein Autor einen unveröffentlichten Text ab."}, "source": "Future Library (Katie Paterson), curated by Situations; Smithsonian Magazine 2014", "url": "https://situations.org.uk/projects/slow-space-2010-2014/katie-paterson-future-library"},
  {"id": "seed-vault-1-3-million-samples", "comp": "futures-literacy", "kind": "wow", "text": {"en": "In the permafrost of Svalbard, more than 1.3 million seed samples from around the world are stored – a backup for the farming of the future.", "de": "Im Permafrost auf Spitzbergen lagern über 1,3 Millionen Saatgutproben aus aller Welt – eine Sicherheitskopie für die Landwirtschaft der Zukunft."}, "source": "Crop Trust, Annual Report 2025; NordGen Annual Review 2025", "url": "https://report.croptrust.org/2025/highlights/svalbard-global-seed-vault/"},
  {"id": "schnidejoch-ice-reveals-bow-case", "comp": "futures-literacy", "kind": "wow", "text": {"en": "In the hot summer of 2003, melting ice on the Schnidejoch pass (Bern) revealed parts of a birch-bark bow case. They are about 4,800 years old.", "de": "Im Hitzesommer 2003 gab das schmelzende Eis am Schnidejoch BE Teile eines Bogenfutterals aus Birkenrinde frei. Sie sind rund 4800 Jahre alt."}, "source": "University of Bern, Institute of Archaeological Sciences; Archäologischer Dienst des Kantons Bern", "url": "https://www.iaw.unibe.ch/research/prehistoric_archaeology/schnidejoch_and_ice_archaeology/index_eng.html"},
  {"id": "geneva-chestnut-since-1808", "comp": "futures-literacy", "kind": "wow", "text": {"en": "Geneva has recorded for over 200 years when a horse chestnut tree opens its buds. The record: 29 December 2002, in the middle of winter.", "de": "Genf notiert seit über 200 Jahren, wann eine Rosskastanie ihre Knospen öffnet. Rekord: am 29. Dezember 2002, mitten im Winter."}, "source": "MeteoSchweiz, Lange phänologische Beobachtungsreihen", "url": "https://www.meteoschweiz.admin.ch/klima/klimawandel/vegetationsentwicklung/lange-phaenologische-beobachtungsreihen.html"},
  {"id": "climate-models-predicted-right", "comp": "futures-literacy", "kind": "think", "text": {"en": "Of 17 climate models from 1970 to 2007, 14 correctly predicted the warming that followed – once actual greenhouse gas levels are taken into account.", "de": "Von 17 Klimamodellen aus den Jahren 1970 bis 2007 sagten 14 die spätere Erwärmung richtig voraus – wenn man die tatsächlichen Treibhausgas-Mengen berücksichtigt."}, "q": {"en": "When do we trust a forecast – and when not?", "de": "Wann vertrauen wir einer Vorhersage – und wann nicht?"}, "source": "Hausfather et al., Geophysical Research Letters 2020; NASA 2019", "url": "https://science.nasa.gov/earth/climate-change/study-confirms-climate-models-are-getting-future-warming-projections-right/"},
  {"id": "swiss-glaciers-fifth-in-five-years", "comp": "futures-literacy", "kind": "think", "text": {"en": "Between 2021 and 2026, Swiss glaciers lost almost a fifth of their ice.", "de": "Von 2021 bis 2026 haben die Schweizer Gletscher fast einen Fünftel ihres Eises verloren."}, "q": {"en": "What changes in a valley when its glacier disappears?", "de": "Was verändert sich in einem Tal, wenn sein Gletscher verschwindet?"}, "source": "GLAMOS / SCNAT (Swiss Academy of Sciences), Oct 2026", "url": "https://www.geo.uzh.ch/en/news/2026/glamos-2026.html"},
  {"id": "camel-hump-fat-not-water", "comp": "adaptability", "kind": "wow", "text": {"en": "A camel's hump holds fat, not water. But a thirsty camel can drink more than 100 litres in one go.", "de": "Im Höcker eines Kamels steckt Fett, kein Wasser. Dafür kann ein durstiges Kamel auf einmal über 100 Liter trinken."}, "source": "Live Science, quoting Rick Schwartz (San Diego Zoo)", "url": "https://www.livescience.com/32366-why-do-camels-have-humps.html"},
  {"id": "bajau-divers-larger-spleen", "comp": "adaptability", "kind": "wow", "text": {"en": "The Bajau of Indonesia have lived from diving for generations. Their spleens are about 50 percent larger than those of land-dwelling neighbours – probably a genetic adaptation.", "de": "Die Bajau in Indonesien leben seit Generationen vom Tauchen. Ihre Milz ist rund 50 Prozent grösser als bei ihren Nachbarn an Land – vermutlich eine genetische Anpassung."}, "source": "Ilardo et al., Cell 2018 (Universities of Copenhagen, Cambridge, Radboudumc et al.)", "url": "https://www.sci.news/genetics/bajau-people-spleens-free-diving-05944.html"},
  {"id": "snowfarming-davos-three-quarters", "comp": "adaptability", "kind": "wow", "text": {"en": "In an experiment in Davos, about three quarters of a snow pile survived the whole summer – under a thick layer of sawdust and wood chips.", "de": "In Davos überstanden in einem Versuch rund drei Viertel eines Schneehaufens den ganzen Sommer – unter einer dicken Schicht aus Sägemehl und Holzschnitzeln."}, "source": "Grünewald, Wolfsperger & Lehning (WSL-SLF), The Cryosphere 2018", "url": "https://tc.copernicus.org/articles/12/385/2018/"},
  {"id": "plane-trees-cool-above-39-degrees", "comp": "adaptability", "kind": "wow", "text": {"en": "Measurements on plane trees in Lancy (Geneva) showed they kept cooling their surroundings even above 39 °C. Instead of saving water, they evaporated even more in the heat.", "de": "Messungen an Platanen in Lancy GE zeigten: Die Bäume kühlten ihre Umgebung auch bei über 39 °C. Statt Wasser zu sparen, verdunsteten sie bei Hitze sogar mehr."}, "source": "WSL & EPFL (Bachofen et al.), Urban Forestry & Urban Greening, 2025", "url": "https://www.wsl.ch/en/news/city-trees-provide-cooling-even-in-extreme-heat/"},
  {"id": "mountain-hare-loses-habitat", "comp": "adaptability", "kind": "think", "text": {"en": "Models show that by 2100, the mountain hare could lose about a third of its habitat in the Swiss Alps. It is moving uphill.", "de": "Modelle zeigen: Bis 2100 könnte der Schneehase in den Schweizer Alpen rund einen Drittel seines Lebensraums verlieren. Er weicht nach oben aus."}, "q": {"en": "Where can animals go when there is no higher ground?", "de": "Wohin weichen Tiere aus, wenn es oben nicht weitergeht?"}, "source": "Rehnus et al., Global Change Biology 2018 (WSL)", "url": "https://www.wsl.ch/en/news/climate-change-drives-mountain-hares-to-higher-altitudes/"},
  {"id": "heat-deaths-2022-switzerland", "comp": "adaptability", "kind": "think", "text": {"en": "In summer 2022, a study found, heat killed about 620 people in Switzerland. Heat plans in western Switzerland and Ticino probably kept the number lower.", "de": "Im Sommer 2022 starben in der Schweiz laut einer Studie rund 620 Menschen wegen der Hitze. Hitzeschutzpläne in der Westschweiz und im Tessin hielten die Zahl vermutlich tiefer."}, "q": {"en": "What helps people get through hot days well?", "de": "Was hilft Menschen, heisse Tage gut zu überstehen?"}, "source": "Vicedo-Cabrera et al., Environmental Research Letters 2023 (University of Bern, Swiss TPH)", "url": "https://mediarelations.unibe.ch/media_releases/2023/media_releases_2023/global_warming_caused_60_percent_of_swiss_heat_deaths_in_the_summer_of_2022/index_eng.html"},
  {"id": "whale-flipper-bumps", "comp": "exploratory-thinking", "kind": "wow", "text": {"en": "Humpback whales have bumps on the front edge of their flippers. In a wind-tunnel test, a flipper model with bumps could tilt about 40% steeper before it lost lift.", "de": "Buckelwale haben Höcker vorne an ihren Brustflossen. In einem Windkanal-Versuch liess sich ein Flossenmodell mit Höckern rund 40 % steiler stellen, bevor es den Auftrieb verlor."}, "source": "Miklosovic, Murray, Howle & Fish, Physics of Fluids, 2004", "url": "https://math.wcupa.edu/sciences-mathematics/biology/fFish/documents/2004PF-Megaptera.pdf"},
  {"id": "fungus-violin-blind-test", "comp": "exploratory-thinking", "kind": "wow", "text": {"en": "Empa researchers treated violin wood with a fungus. In a 2009 blind test, 90 of more than 180 listeners liked this violin's sound best – ahead of a real Stradivarius.", "de": "Empa-Forschende behandelten Geigenholz mit einem Pilz. Bei einem Blindtest 2009 fanden 90 von über 180 Zuhörenden den Klang dieser Geige am besten – vor einer echten Stradivari."}, "source": "Empa (Swiss Federal Laboratories for Materials Science and Technology), 2009", "url": "https://www.empa.ch/web/s604/geigestradivari"},
  {"id": "wood-sponge-voltage", "comp": "exploratory-thinking", "kind": "wow", "text": {"en": "Researchers at ETH and Empa turned wood into a soft sponge. When you press it, it produces about 85 times more electrical voltage than ordinary wood.", "de": "Forschende von ETH und Empa verwandelten Holz in einen weichen Schwamm. Drückt man darauf, erzeugt er rund 85-mal mehr elektrische Spannung als normales Holz."}, "source": "ETH Zurich News, 2021 (Sun et al., ACS Nano, 2020)", "url": "https://ethz.ch/en/news-and-events/eth-news/news/2021/03/voltage-from-wood.html"},
  {"id": "lichen-survives-space", "comp": "exploratory-thinking", "kind": "wow", "text": {"en": "A yellow lichen survived 18 months unprotected on the outside of the ISS space station – despite vacuum, UV radiation, heat and cold. Back on Earth, it kept growing.", "de": "Eine Gelbflechte überlebte 18 Monate ungeschützt aussen an der Raumstation ISS – trotz Vakuum, UV-Strahlung, Hitze und Kälte. Zurück auf der Erde wuchs sie weiter."}, "source": "European Space Agency (ESA), Expose-E experiment, 2010", "url": "https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Columbus/Live_long_and_prosper_i_Xanthoria_elegans_i"},
  {"id": "pet-eating-bacterium", "comp": "exploratory-thinking", "kind": "wow", "text": {"en": "In 2016, researchers in Japan found a bacterium at a PET recycling plant that eats PET plastic. In the lab, it broke down thin PET film almost completely in about 6 weeks.", "de": "In Japan fanden Forschende 2016 bei einer PET-Recyclinganlage ein Bakterium, das PET-Plastik frisst. Im Labor zersetzte es dünne PET-Folie in rund 6 Wochen fast ganz."}, "source": "Yoshida et al., Science, 2016", "url": "https://www.science.org/doi/10.1126/science.aad6359"},
  {"id": "deep-seafloor-unseen", "comp": "exploratory-thinking", "kind": "think", "text": {"en": "By 2025, humans had seen less than 0.001% of the deep-sea floor – with their own eyes or with cameras.", "de": "Vom Boden der Tiefsee hatten Menschen bis 2025 weniger als 0,001 % gesehen – mit eigenen Augen oder mit Kameras."}, "q": {"en": "Should we use the deep sea before we know it?", "de": "Sollten wir die Tiefsee nutzen, bevor wir sie kennen?"}, "source": "Bell et al., Science Advances, 2025", "url": "https://www.science.org/doi/10.1126/sciadv.adp8602"},
  {"id": "unusual-combinations-science", "comp": "exploratory-thinking", "kind": "think", "text": {"en": "Research papers that mix lots of proven knowledge with a few unusual combinations are twice as likely to be among the most cited. An analysis of millions of papers showed this.", "de": "Fachartikel, die viel Bewährtes mit ein paar ungewöhnlichen Wissens-Kombinationen mischen, landen doppelt so oft unter den meistzitierten. Das zeigte eine Auswertung von Millionen Artikeln."}, "q": {"en": "Which two subjects could you combine for a new idea?", "de": "Welche zwei Fächer könnte man für eine neue Idee kombinieren?"}, "source": "Uzzi, Mukherjee, Stringer & Jones, Science, 2013", "url": "https://www.kellogg.northwestern.edu/faculty/uzzi/htm/papers/Science-2013-Uzzi-468-72.pdf"},
  {"id": "hiking-trails-constitution", "comp": "political-agency", "kind": "wow", "text": {"en": "Since a popular vote in 1979, hiking trails have been part of the Swiss Federal Constitution. Today, more than 65,000 km of hiking trails are signposted in Switzerland.", "de": "Seit einer Volksabstimmung 1979 stehen die Wanderwege in der Bundesverfassung. Heute sind in der Schweiz über 65 000 km Wanderwege signalisiert."}, "source": "Schweizer Wanderwege, 2024; Bundesverfassung Art. 88 (Volksabstimmung 18.2.1979)", "url": "https://www.schweizer-wanderwege.ch/de/ueber-uns/verband"},
  {"id": "glarus-voting-age-16", "comp": "political-agency", "kind": "wow", "text": {"en": "At its open-air assembly in 2007, the Landsgemeinde of Glarus narrowly decided that 16-year-olds may vote. Glarus was the first canton to do so.", "de": "Unter freiem Himmel beschloss die Glarner Landsgemeinde 2007 knapp: Schon 16-Jährige dürfen abstimmen und wählen. Glarus war damit der erste Kanton."}, "source": "SRF, 2024; Landsgemeindeprotokoll Glarus 2007 (Traktandum 7)", "url": "https://www.srf.ch/news/schweiz/stimmrechtsalter-16-unbeliebt-das-gallische-dorf-warum-glarus-das-stimmrechtsalter-16-annahm"},
  {"id": "eu-common-charger", "comp": "political-agency", "kind": "wow", "text": {"en": "Since the end of 2024, new phones, tablets and headphones in the EU must have a USB-C port. Unused and discarded chargers there add up to about 11,000 tonnes of e-waste a year.", "de": "Seit Ende 2024 brauchen neue Handys, Tablets und Kopfhörer in der EU einen USB-C-Anschluss. Ungenutzte und weggeworfene Ladegeräte machen dort rund 11 000 Tonnen Elektroschrott pro Jahr aus."}, "source": "European Commission, 2024", "url": "https://commission.europa.eu/news-and-media/news/eu-common-charger-rules-power-all-your-devices-single-charger-2024-12-28_en"},
  {"id": "ireland-plastic-bag-levy", "comp": "political-agency", "kind": "wow", "text": {"en": "In 2002, Ireland introduced a small charge on plastic bags. Use dropped almost immediately from 328 to 21 bags per person per year.", "de": "2002 führte Irland eine kleine Abgabe auf Plastiksäcke ein. Der Verbrauch sank fast sofort von 328 auf 21 Säcke pro Person und Jahr."}, "source": "OECD, Environment Working Paper No. 174, 2021", "url": "https://one.oecd.org/document/ENV/WKP(2021)14/en/pdf"},
  {"id": "river-legal-person", "comp": "political-agency", "kind": "wow", "text": {"en": "Since 2017, New Zealand's Whanganui River has been a legal person with its own rights. Two people speak for it: one chosen by the Māori, one by the state.", "de": "Seit 2017 ist der Whanganui-Fluss in Neuseeland rechtlich eine Person mit eigenen Rechten. Zwei Menschen sprechen für ihn: einer bestimmt von den Māori, einer vom Staat."}, "source": "Te Awa Tupua (Whanganui River Claims Settlement) Act, New Zealand, 2017", "url": "https://www.legislation.govt.nz/act/public/2017/0007/latest/whole.html"},
  {"id": "klimaseniorinnen-court", "comp": "political-agency", "kind": "think", "text": {"en": "More than 2,000 older women took Switzerland to court as an association. In 2024, the European Court of Human Rights ruled that Switzerland had not done enough to protect the climate.", "de": "Mehr als 2000 ältere Frauen klagten als Verein gegen die Schweiz. 2024 urteilte der Europäische Gerichtshof für Menschenrechte: Die Schweiz hatte beim Klimaschutz nicht genug getan."}, "q": {"en": "Who should be allowed to go to court for the climate?", "de": "Wer sollte für das Klima vor Gericht gehen dürfen?"}, "source": "European Court of Human Rights, Verein KlimaSeniorinnen Schweiz and Others v. Switzerland, 9 April 2024", "url": "https://hudoc.echr.coe.int/app/conversion/pdf/?library=ECHR&id=003-7919428-11026177&filename=Judgment+Verein+KlimaSeniorinnen+Schweiz+and+Others+v.+Switzerland+-+Violations+of+the+Convention+for+failing+to+implement+sufficient+measures+to+combat+climate+change.pdf"},
  {"id": "high-seas-treaty", "comp": "political-agency", "kind": "think", "text": {"en": "Since 17 January 2026, the UN High Seas Treaty has been in force. It makes protected areas possible on the high seas, which belong to no country – over two thirds of the ocean.", "de": "Seit dem 17. Januar 2026 gilt das UNO-Hochseeabkommen. Es ermöglicht Schutzgebiete auf der Hohen See, die keinem Land gehört – über zwei Drittel des Meeres."}, "q": {"en": "How do you protect something that belongs to no one?", "de": "Wie schützt man etwas, das niemandem gehört?"}, "source": "UN News, 2026", "url": "https://news.un.org/en/story/2026/01/1166762"},
  {"id": "penguin-huddle-heat", "comp": "collective-action", "kind": "wow", "text": {"en": "Emperor penguins huddle tightly together in the Antarctic winter. In one study, temperatures of up to 37.5 °C were measured inside the huddle – almost body temperature.", "de": "Kaiserpinguine drängen sich im antarktischen Winter dicht zusammen. Im Inneren der Gruppe wurden in einer Studie bis zu 37,5 °C gemessen – fast Körpertemperatur."}, "source": "Gilbert et al., Physiology & Behavior, 2006", "url": "https://pubmed.ncbi.nlm.nih.gov/16740281/"},
  {"id": "jura-ant-supercolony", "comp": "collective-action", "kind": "wow", "text": {"en": "In the Vaud Jura, an estimated 1,200 ant mounds form a single colony, linked by ant trails. It is considered Europe's largest wood ant colony.", "de": "Im Waadtländer Jura bilden geschätzt 1200 Ameisenhügel eine einzige Kolonie, verbunden durch Ameisenstrassen. Sie gilt als grösste Waldameisen-Kolonie Europas."}, "source": "Parc Jura vaudois; Musée cantonal de zoologie Lausanne (interview A. Freitag)", "url": "https://parcjuravaudois.ch/fr/chronique-dune-fourmi"},
  {"id": "foldit-gamers-protein", "comp": "collective-action", "kind": "wow", "text": {"en": "For more than ten years, the shape of a protein from a monkey virus puzzled experts. Players of the online puzzle game Foldit delivered a fitting model in 3 weeks.", "de": "Die Form eines Eiweisses aus einem Affenvirus war Fachleuten über zehn Jahre lang ein Rätsel. Spielende des Online-Puzzles Foldit lieferten in 3 Wochen das passende Modell."}, "source": "Nature Reviews Microbiology, 2011 (on Khatib et al., Nature Structural & Molecular Biology, 2011)", "url": "https://www.nature.com/articles/nrmicro2687"},
  {"id": "toerbel-commons", "comp": "collective-action", "kind": "wow", "text": {"en": "In the Valais village of Törbel, the community has managed alpine pastures and water together for more than 500 years. Nobel laureate Elinor Ostrom made the village famous worldwide.", "de": "Im Walliser Dorf Törbel regelt die Dorfgemeinschaft Alpweiden und Wasser seit über 500 Jahren gemeinsam. Die Nobelpreisträgerin Elinor Ostrom machte das Dorf weltweit bekannt."}, "source": "SWI swissinfo.ch, 2025; Historisches Lexikon der Schweiz (Törbel)", "url": "https://www.swissinfo.ch/eng/swiss-democracy/the-swiss-mountain-village-that-inspired-a-nobel-prize-and-digital-governance/89529395"},
  {"id": "migros-cooperative-members", "comp": "collective-action", "kind": "wow", "text": {"en": "Migros is a cooperative and belongs to its members. At the end of 2025, that was more than 2.3 million people.", "de": "Die Migros ist eine Genossenschaft und gehört ihren Mitgliedern. Ende 2025 waren das über 2,3 Millionen Menschen."}, "source": "Migros-Genossenschafts-Bund, Geschäftsbericht 2025", "url": "https://report.migros.ch/2025/app/uploads/Governance_2025_de.pdf"},
  {"id": "swiss-volunteering", "comp": "collective-action", "kind": "think", "text": {"en": "About 4 in 10 people aged 15 and over in Switzerland do voluntary work – in a club or as help for neighbours and acquaintances.", "de": "Rund 4 von 10 Menschen ab 15 Jahren in der Schweiz leisten Freiwilligenarbeit – im Verein oder als Hilfe für Nachbarn und Bekannte."}, "q": {"en": "What would be missing if nobody volunteered anymore?", "de": "Was würde fehlen, wenn niemand mehr freiwillig mithilft?"}, "source": "Bundesamt für Statistik (BFS), Freiwilligenarbeit, data 2024", "url": "https://www.bfs.admin.ch/bfs/de/home/statistiken/arbeit-erwerb/erwerbstaetigkeit-arbeitszeit/vereinbarkeit-unbezahlte-arbeit/freiwilligenarbeit.html"},
  {"id": "climate-support-underestimated", "comp": "collective-action", "kind": "think", "text": {"en": "According to a global survey, 69% would be willing to give a small share of their income for the climate. But on average they think only 43% of others would.", "de": "Laut einer Weltumfrage wären 69 % bereit, einen kleinen Teil ihres Einkommens fürs Klima abzugeben. Im Schnitt glauben sie aber, nur 43 % der anderen würden mitmachen."}, "q": {"en": "Why do we underestimate how many others want to help?", "de": "Warum unterschätzen wir, wie viele andere mithelfen wollen?"}, "source": "Andre, Boneva, Chopra & Falk, Nature Climate Change, 2024 (via Our World in Data)", "url": "https://ourworldindata.org/climate-change-support"},
  {"id": "dunant-red-cross", "comp": "individual-initiative", "kind": "wow", "text": {"en": "In 1859, Geneva businessman Henry Dunant saw thousands of wounded soldiers after a battle. His idea led to the Red Cross – today with nearly 17 million volunteers worldwide.", "de": "1859 sah der Genfer Geschäftsmann Henry Dunant Tausende Verwundete nach einer Schlacht. Seine Idee führte zum Roten Kreuz – heute mit fast 17 Millionen Freiwilligen weltweit."}, "source": "IFRC, World Disasters Report 2026; ICRC history", "url": "https://www.ifrc.org/sites/default/files/2026-02/WDR2026_FullReport_EN.pdf"},
  {"id": "herren-wasp-cassava", "comp": "individual-initiative", "kind": "wow", "text": {"en": "Swiss scientist Hans Rudolf Herren stopped a pest plague on cassava fields in Africa – with a tiny wasp instead of poison. By estimates, this saved more than 20 million lives.", "de": "Der Schweizer Forscher Hans Rudolf Herren stoppte in Afrika eine Schädlingsplage auf Maniok-Feldern – mit einer winzigen Wespe statt Gift. Das rettete nach Schätzungen über 20 Millionen Menschenleben."}, "source": "World Food Prize Foundation, 1995 laureate", "url": "https://www.worldfoodprize.org/en/laureates/19871999_laureates/1995_herren/"},
  {"id": "maathai-green-belt", "comp": "individual-initiative", "kind": "wow", "text": {"en": "In 1977, Wangari Maathai planted a few trees in her own backyard in Kenya and founded the Green Belt Movement. Since then, more than 51 million trees have been planted.", "de": "1977 pflanzte Wangari Maathai in Kenia ein paar Bäume im eigenen Garten und gründete das Green Belt Movement. Seither wurden über 51 Millionen Bäume gepflanzt."}, "source": "UNEP, 2016 (Green Belt Movement figures); Nobel Peace Prize presentation speech, 2004", "url": "https://www.unep.org/news-and-stories/story/wangari-maathais-legacy-feted-across-africa"},
  {"id": "solar-impulse-world", "comp": "individual-initiative", "kind": "wow", "text": {"en": "Swiss explorer Bertrand Piccard wanted a plane that flies on solar power alone. In 2016, he and André Borschberg flew it around the world – more than 40,000 km without fuel.", "de": "Der Schweizer Bertrand Piccard wollte ein Flugzeug, das nur mit Sonnenenergie fliegt. 2016 umrundeten er und André Borschberg damit die Erde – über 40 000 km ohne Treibstoff."}, "source": "FAI (World Air Sports Federation), 2016", "url": "https://www.fai.org/news/10-years-solar-impulse-2-circumnavigation-complete"},
  {"id": "committed-minority-tipping", "comp": "individual-initiative", "kind": "think", "text": {"en": "In an online experiment, a committed minority of about 25% of a group was enough to change an established habit. Below that, it failed.", "de": "In einem Online-Experiment reichte eine entschlossene Minderheit von rund 25 % einer Gruppe, um eine eingespielte Gewohnheit zu ändern. Darunter scheiterte sie."}, "q": {"en": "When did a small group around you change something?", "de": "Wann hat eine kleine Gruppe in deinem Umfeld etwas verändert?"}, "source": "Centola, Becker, Brackbill & Baronchelli, Science, 2018", "url": "https://www.asc.upenn.edu/news-events/news/research-finds-tipping-point-large-scale-social-change"},
  {"id": "solar-ambassadors-walk-the-talk", "comp": "individual-initiative", "kind": "think", "text": {"en": "In a field study in the US, solar ambassadors with their own solar panels got about 63% more people to install panels than ambassadors without their own.", "de": "In einem Feldversuch in den USA gewannen Solar-Botschafter mit eigener Solaranlage rund 63 % mehr Leute für eine Anlage als Botschafter ohne eigene Anlage."}, "q": {"en": "What convinces us more: what someone says or does?", "de": "Überzeugt uns mehr, was jemand sagt oder was jemand tut?"}, "source": "Kraft-Todd, Bollinger, Gillingham, Lamp & Rand, Nature, 2018", "url": "https://www.nature.com/articles/s41586-018-0647-4"}
];
