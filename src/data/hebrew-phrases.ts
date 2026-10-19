export interface PhraseVariant {
  id: string;
  label: string;
  hebrew: string;
  transliteration: string;
}

export interface FrPhraseContent {
  /** Card H3: "<searched Latin spelling> — <French meaning>", e.g. "Boker tov — bonjour (le matin)". */
  heading: string;
  meaning: string;
  usage: string;
  genderNote: string;
  /** Full FR variants (Hebrew usually unchanged from the EN variants; transliteration always follows French reading conventions — ch, kh, ou, é). */
  variants: PhraseVariant[];
}

export interface Phrase {
  id: string;
  meaning: string;
  usage: string;
  genderNote: string;
  variants: PhraseVariant[];
  references: string[];
  referenceNote: string;
  /** FR counterpart content (docs/seo/research/fr/PHRASES_FR.md). Localized, not translated — see speak-english/speak-french. */
  fr?: FrPhraseContent;
}

export interface PhraseGroup {
  id: string;
  title: string;
  description: string;
  phrases: Phrase[];
  frTitle?: string;
  frDescription?: string;
}

const same = (hebrew: string, transliteration: string): PhraseVariant[] => [
  { id: 'same', label: 'Same form', hebrew, transliteration },
];
const paired = (axis: 'speaker' | 'addressee', male: [string, string], female: [string, string]): PhraseVariant[] => [
  { id: 'male', label: `Male ${axis}`, hebrew: male[0], transliteration: male[1] },
  { id: 'female', label: `Female ${axis}`, hebrew: female[0], transliteration: female[1] },
];
const unchanged = 'The expression does not change with the speaker or the person addressed.';
const unchangedFr = "L'expression ne change pas selon qui parle ou à qui l'on s'adresse.";

// FR variant builders reuse the EN Hebrew/id/label — only the transliteration
// follows French reading conventions (ch, kh, ou, é). Hebrew + nikud stay identical
// to the EN variants; only speak-english/speak-french (below) overrides Hebrew itself.
const frSame = (base: PhraseVariant[], transliteration: string): PhraseVariant[] => [
  { ...base[0], transliteration },
];
const frPaired = (base: PhraseVariant[], male: string, female: string): PhraseVariant[] => [
  { ...base[0], transliteration: male },
  { ...base[1], transliteration: female },
];

// Reference checks are drafting evidence, not a native-speaker approval.
// Composed requests are labeled explicitly; an inflection table is not a usage review.
export const phraseReferences = {
  omniglot: { title: 'Omniglot: Useful Hebrew phrases', url: 'https://www.omniglot.com/language/phrases/hebrew.php', checkedAt: '2026-10-13' },
  teachme: { title: 'Teach Me Hebrew: Basic Hebrew phrases', url: 'https://www.teachmehebrew.com/100-basic-hebrew-phrases.html', checkedAt: '2026-10-13' },
  want: { title: 'Ivrit with Aviv: To want', url: 'https://www.ivritwithaviv.com/hebrew-verbs/want/', checkedAt: '2026-10-13' },
  menu: { title: 'Pealim: menu', url: 'https://www.pealim.com/dict/5932-tafrit/', checkedAt: '2026-10-13' },
  credit: { title: 'Pealim: credit', url: 'https://www.pealim.com/dict/8008-ashray/', checkedAt: '2026-10-13' },
  cash: { title: 'Pealim: cash', url: 'https://www.pealim.com/he/dict/4696-mezuman/', checkedAt: '2026-10-13' },
  size: { title: 'Pealim: size', url: 'https://www.pealim.com/dict/5858-mida/', checkedAt: '2026-10-13' },
  pay: { title: 'Pealim: to pay', url: 'https://www.pealim.com/dict/2232-leshalem/', checkedAt: '2026-10-13' },
  service: { title: 'Pealim: service / services', url: 'https://www.pealim.com/dict/6200-sherut/', checkedAt: '2026-10-13' },
} as const;

export const phraseGroups: PhraseGroup[] = [
  {
    id: 'greetings', title: 'Greetings and introductions', description: 'Start a conversation, introduce yourself, or say goodbye.',
    frTitle: 'Salutations et présentations', frDescription: 'Commence une conversation, présente-toi, ou dis au revoir.',
    phrases: [
      { id: 'hello', meaning: 'Hello / goodbye', usage: 'A simple greeting when you meet someone. The same word can also be used when leaving.', genderNote: unchanged, variants: same('שָׁלוֹם', 'shalom'), references: ['omniglot'], referenceNote: 'Greeting and farewell meanings checked; nikud drafted for editorial review.',
        fr: { heading: 'Chalom — bonjour / au revoir', meaning: 'Bonjour / au revoir', usage: 'Une salutation simple pour saluer quelqu’un. Le même mot peut aussi être utilisé en partant.', genderNote: unchangedFr, variants: frSame(same('שָׁלוֹם', 'shalom'), 'chalom') } },
      { id: 'good-morning', meaning: 'Good morning', usage: 'Greet someone in the morning, at a café, at work, or at the start of a conversation.', genderNote: unchanged, variants: same('בֹּקֶר טוֹב', 'boker tov'), references: ['teachme', 'omniglot'], referenceNote: 'Phrase and transliteration cross-checked; nikud drafted.',
        fr: { heading: 'Boker tov — bonjour (le matin)', meaning: 'Bonjour (le matin)', usage: 'Salue quelqu’un le matin, au café, au travail, ou au début d’une conversation.', genderNote: unchangedFr, variants: frSame(same('בֹּקֶר טוֹב', 'boker tov'), 'boker tov') } },
      { id: 'good-evening', meaning: 'Good evening', usage: 'Use this as an evening greeting, rather than as a good-night farewell.', genderNote: unchanged, variants: same('עֶרֶב טוֹב', 'erev tov'), references: ['teachme', 'omniglot'], referenceNote: 'Phrase and meaning cross-checked; usage note and nikud drafted.',
        fr: { heading: 'Erev tov — bonsoir', meaning: 'Bonsoir', usage: 'Utilise cette expression comme salutation du soir, pas comme formule pour souhaiter bonne nuit en partant.', genderNote: unchangedFr, variants: frSame(same('עֶרֶב טוֹב', 'erev tov'), 'erev tov') } },
      { id: 'goodbye', meaning: 'Goodbye / see you', usage: 'Say this when you are leaving. It is a farewell, not a first greeting.', genderNote: unchanged, variants: same('לְהִתְרָאוֹת', "lehitra'ot"), references: ['omniglot'], referenceNote: 'Farewell phrase checked; nikud drafted.',
        fr: { heading: "Lehitra'ot — au revoir / à bientôt", meaning: 'Au revoir / à bientôt', usage: 'Dis-le en partant. C’est une formule de départ, pas une salutation pour arriver.', genderNote: unchangedFr, variants: frSame(same('לְהִתְרָאוֹת', "lehitra'ot"), "lehitra'ot") } },
      { id: 'my-name', meaning: 'My name is…', usage: 'Add your name after the phrase. The dots mark the place for your name; do not read them aloud.', genderNote: unchanged, variants: same('שְׁמִי…', 'shmi…'), references: ['teachme'], referenceNote: 'Name-introduction pattern checked; nikud drafted.',
        fr: { heading: 'Chmi… — je m’appelle…', meaning: 'Je m’appelle…', usage: 'Ajoute ton prénom après cette expression. Les points de suspension marquent la place de ton prénom ; ne les prononce pas.', genderNote: unchangedFr, variants: frSame(same('שְׁמִי…', 'shmi…'), 'chmi…') } },
      { id: 'your-name', meaning: 'What is your name?', usage: 'Ask one person their name. Choose the form for the person you are speaking to.', genderNote: 'The ending changes with the person addressed, not the speaker.', variants: paired('addressee', ['אֵיךְ קוֹרְאִים לְךָ?', "eikh kor'im lekha"], ['אֵיךְ קוֹרְאִים לָךְ?', "eikh kor'im lakh"]), references: ['teachme'], referenceNote: 'Male/female addressee forms checked; nikud drafted.',
        fr: { heading: "Eikh kor'im lekha ? — comment tu t'appelles ?", meaning: "Comment tu t'appelles ?", usage: "Demande le prénom d'une personne. Choisis la forme selon la personne à qui tu parles.", genderNote: "La terminaison change selon la personne à qui l'on s'adresse, pas selon qui parle.",
          variants: frPaired(paired('addressee', ['אֵיךְ קוֹרְאִים לְךָ?', "eikh kor'im lekha"], ['אֵיךְ קוֹרְאִים לָךְ?', "eikh kor'im lakh"]), "eikh kor'im lekha", "eikh kor'im lakh") } },
    ],
  },
  {
    id: 'politeness', title: 'Politeness and everyday replies', description: 'Small expressions that make everyday exchanges easier.',
    frTitle: 'Politesse et réponses du quotidien', frDescription: 'De petites expressions qui facilitent les échanges du quotidien.',
    phrases: [
      { id: 'thank-you', meaning: 'Thank you', usage: 'Thank someone for help, an answer, or something they have handed you.', genderNote: unchanged, variants: same('תּוֹדָה', 'toda'), references: ['omniglot'], referenceNote: 'Meaning and pronunciation checked; nikud drafted.',
        fr: { heading: 'Toda — merci', meaning: 'Merci', usage: "Remercie quelqu'un pour son aide, une réponse, ou quelque chose qu'on vient de te donner.", genderNote: unchangedFr, variants: frSame(same('תּוֹדָה', 'toda'), 'toda') } },
      { id: 'please', meaning: "Please / you’re welcome", usage: 'Add it to a request for “please”. In reply to thanks it means “you’re welcome”; when handing something over it can mean “here you are”.', genderNote: unchanged, variants: same('בְּבַקָּשָׁה', 'bevakasha'), references: ['omniglot'], referenceNote: 'Please and reply-to-thanks meanings checked; handover context and nikud require editorial review.',
        fr: { heading: "Bevakacha — s'il te plaît / je t'en prie", meaning: "S'il te plaît / je t'en prie", usage: "Ajoute-le à une demande pour dire « s'il te plaît ». En réponse à un merci, cela veut dire « je t'en prie » ; en tendant quelque chose, cela peut vouloir dire « voilà ».", genderNote: unchangedFr, variants: frSame(same('בְּבַקָּשָׁה', 'bevakasha'), 'bevakacha') } },
      { id: 'excuse-me', meaning: 'Excuse me / sorry', usage: 'Get someone’s attention politely, or apologize for a small interruption or mistake.', genderNote: unchanged, variants: same('סְלִיחָה', 'slikha'), references: ['omniglot'], referenceNote: 'Apology/attention senses checked; nikud drafted.',
        fr: { heading: 'Slikha — excuse-moi / pardon', meaning: 'Excuse-moi / pardon', usage: "Attire poliment l'attention de quelqu'un, ou excuse-toi pour une petite interruption ou une erreur.", genderNote: unchangedFr, variants: frSame(same('סְלִיחָה', 'slikha'), 'slikha') } },
      { id: 'yes', meaning: 'Yes', usage: 'Give a short affirmative answer. Tone and context still matter.', genderNote: unchanged, variants: same('כֵּן', 'ken'), references: ['omniglot'], referenceNote: 'Basic affirmative checked; nikud drafted.',
        fr: { heading: 'Ken — oui', meaning: 'Oui', usage: 'Donne une courte réponse affirmative. Le ton et le contexte comptent toujours.', genderNote: unchangedFr, variants: frSame(same('כֵּן', 'ken'), 'ken') } },
      { id: 'no', meaning: 'No', usage: 'Give a short negative answer. Use “No, thank you” below when politely declining an offer.', genderNote: unchanged, variants: same('לֹא', 'lo'), references: ['omniglot'], referenceNote: 'Basic negative checked; nikud drafted.',
        fr: { heading: 'Lo — non', meaning: 'Non', usage: 'Donne une courte réponse négative. Utilise « non merci » ci-dessous pour décliner poliment une offre.', genderNote: unchangedFr, variants: frSame(same('לֹא', 'lo'), 'lo') } },
      { id: 'im-fine', meaning: 'I’m fine / I’m okay', usage: 'A short reply when someone asks how you are. This expression uses the same wording for any speaker.', genderNote: unchanged, variants: same('אֲנִי בְּסֵדֶר', 'ani beseder'), references: ['teachme'], referenceNote: 'Reply pattern checked; nikud drafted.',
        fr: { heading: 'Ani beseder — ça va / je vais bien', meaning: 'Ça va / je vais bien', usage: 'Une courte réponse quand on te demande comment tu vas. Cette expression utilise la même forme quel que soit le locuteur.', genderNote: unchangedFr, variants: frSame(same('אֲנִי בְּסֵדֶר', 'ani beseder'), 'ani beseder') } },
    ],
  },
  {
    id: 'food', title: 'Ordering food and drink', description: 'Make a simple request and finish the exchange politely.',
    frTitle: 'Commander à manger et à boire', frDescription: "Fais une demande simple et termine l'échange poliment.",
    phrases: [
      { id: 'water-please', meaning: 'Can I have water, please?', usage: 'Ask for water when ordering or while sitting at a table. The request does not specify a type of water.', genderNote: unchanged, variants: same('אֶפְשָׁר מַיִם, בְּבַקָּשָׁה?', 'efshar mayim bevakasha'), references: ['omniglot'], referenceNote: 'Composed noun request; constituent request/politeness patterns checked. Full naturalness and nikud pending review.',
        fr: { heading: "Efchar mayim, bevakacha ? — je peux avoir de l'eau, s'il te plaît ?", meaning: "Je peux avoir de l'eau, s'il te plaît ?", usage: "Demande de l'eau en commandant ou à table. La demande ne précise pas de type d'eau.", genderNote: unchangedFr, variants: frSame(same('אֶפְשָׁר מַיִם, בְּבַקָּשָׁה?', 'efshar mayim bevakasha'), 'efchar mayim bevakacha') } },
      { id: 'coffee-please', meaning: 'I want coffee, please', usage: 'A simple café order. Choose the form for the speaker; “please” softens the direct request.', genderNote: 'Rotse / rotsa changes with the speaker. The server’s gender does not change it.', variants: paired('speaker', ['אֲנִי רוֹצֶה קָפֶה, בְּבַקָּשָׁה.', 'ani rotse kafe bevakasha'], ['אֲנִי רוֹצָה קָפֶה, בְּבַקָּשָׁה.', 'ani rotsa kafe bevakasha']), references: ['want', 'omniglot'], referenceNote: 'Want verb, speaker agreement and request usage checked. Composed coffee request and nikud pending editorial review.',
        fr: { heading: "Ani rotsé kafé, bevakacha — je veux un café, s'il te plaît", meaning: "Je veux un café, s'il te plaît", usage: "Une commande simple au café. Choisis la forme selon le locuteur ; « s'il te plaît » adoucit la demande directe.", genderNote: "Rotsé / rotsa change selon le locuteur. Le genre du serveur ne change pas la forme.",
          variants: frPaired(paired('speaker', ['אֲנִי רוֹצֶה קָפֶה, בְּבַקָּשָׁה.', 'ani rotse kafe bevakasha'], ['אֲנִי רוֹצָה קָפֶה, בְּבַקָּשָׁה.', 'ani rotsa kafe bevakasha']), 'ani rotsé kafé bevakacha', 'ani rotsa kafé bevakacha') } },
      { id: 'menu-please', meaning: 'Can I have a menu, please?', usage: 'Ask for the menu before ordering.', genderNote: unchanged, variants: same('אֶפְשָׁר תַּפְרִיט, בְּבַקָּשָׁה?', 'efshar tafrit bevakasha'), references: ['menu', 'omniglot'], referenceNote: 'Menu lemma/vowels checked. Composed request needs usage and full nikud review.',
        fr: { heading: "Efchar tafrit, bevakacha ? — je peux avoir une carte, s'il te plaît ?", meaning: "Je peux avoir une carte, s'il te plaît ?", usage: 'Demande la carte avant de commander.', genderNote: unchangedFr, variants: frSame(same('אֶפְשָׁר תַּפְרִיט, בְּבַקָּשָׁה?', 'efshar tafrit bevakasha'), 'efchar tafrit bevakacha') } },
      { id: 'bill-please', meaning: 'The bill, please', usage: 'Ask for the bill when you are ready to pay at a café or restaurant.', genderNote: unchanged, variants: same('חֶשְׁבּוֹן, בְּבַקָּשָׁה.', 'kheshbon bevakasha'), references: ['omniglot'], referenceNote: 'Composed request; please pattern checked. Bill lemma and full phrase require editorial verification.',
        fr: { heading: "Khechbon, bevakacha — l'addition, s'il te plaît", meaning: "L'addition, s'il te plaît", usage: "Demande l'addition quand tu es prêt à payer au café ou au restaurant.", genderNote: unchangedFr, variants: frSame(same('חֶשְׁבּוֹן, בְּבַקָּשָׁה.', 'kheshbon bevakasha'), 'khechbon bevakacha') } },
      { id: 'without-milk', meaning: 'Without milk, please', usage: 'Add this when ordering a drink. This short request is not a complete allergy or food-safety explanation.', genderNote: unchanged, variants: same('בְּלִי חָלָב, בְּבַקָּשָׁה.', 'bli khalav bevakasha'), references: ['omniglot'], referenceNote: 'Composed ingredient request; full lexical, nikud and naturalness check required.',
        fr: { heading: "Bli khalav, bevakacha — sans lait, s'il te plaît", meaning: "Sans lait, s'il te plaît", usage: "Ajoute cette expression en commandant une boisson. Cette courte demande n'est pas une explication complète d'allergie ou de sécurité alimentaire.", genderNote: unchangedFr, variants: frSame(same('בְּלִי חָלָב, בְּבַקָּשָׁה.', 'bli khalav bevakasha'), 'bli khalav bevakacha') } },
      { id: 'thank-you-very-much', meaning: 'Thank you very much', usage: 'Offer a warmer thank-you after someone brings your order or helps with a request.', genderNote: unchanged, variants: same('תּוֹדָה רַבָּה', 'toda raba'), references: ['teachme', 'omniglot'], referenceNote: 'Distinct expanded thank-you phrase cross-checked; nikud drafted.',
        fr: { heading: 'Toda raba — merci beaucoup', meaning: 'Merci beaucoup', usage: "Propose un remerciement plus chaleureux après qu'on t'a apporté ta commande ou aidé pour une demande.", genderNote: unchangedFr, variants: frSame(same('תּוֹדָה רַבָּה', 'toda raba'), 'toda raba') } },
    ],
  },
  {
    id: 'shopping', title: 'Shopping and paying', description: 'Ask about an item, a size, or a way to pay.',
    frTitle: 'Faire des achats et payer', frDescription: 'Demande un article, une taille, ou un moyen de paiement.',
    phrases: [
      { id: 'how-much', meaning: 'How much does this cost?', usage: 'Point to one item or show it while asking the price.', genderNote: unchanged, variants: same('כַּמָּה זֶה עוֹלֶה?', 'kama ze ole'), references: ['omniglot'], referenceNote: 'Price question checked; nikud drafted.',
        fr: { heading: 'Kama zé olé ? — ça coûte combien ?', meaning: 'Ça coûte combien ?', usage: 'Montre du doigt un article, ou montre-le, en demandant le prix.', genderNote: unchangedFr, variants: frSame(same('כַּמָּה זֶה עוֹלֶה?', 'kama ze ole'), 'kama zé olé') } },
      { id: 'do-you-have-this', meaning: 'Do you have this?', usage: 'Show the item or a picture. These forms address one shop assistant, not a group.', genderNote: 'Lekha / lakh changes with the person addressed.', variants: paired('addressee', ['יֵשׁ לְךָ אֶת זֶה?', 'yesh lekha et ze'], ['יֵשׁ לָךְ אֶת זֶה?', 'yesh lakh et ze']), references: ['teachme'], referenceNote: 'Composed availability question; singular pronoun distinction checked against addressee patterns. Naturalness/nikud pending review.',
        fr: { heading: 'Yech lekha et zé ? — tu as ça ?', meaning: 'Tu as ça ?', usage: "Montre l'article ou une photo. Ces formes s'adressent à un seul vendeur, pas à un groupe.", genderNote: "Lekha / lakh change selon la personne à qui l'on s'adresse.",
          variants: frPaired(paired('addressee', ['יֵשׁ לְךָ אֶת זֶה?', 'yesh lekha et ze'], ['יֵשׁ לָךְ אֶת זֶה?', 'yesh lakh et ze']), 'yech lekha et zé', 'yech lakh et zé') } },
      { id: 'another-size', meaning: 'Can I have another size?', usage: 'Use this while trying on clothing or looking at the item you want in another size.', genderNote: unchanged, variants: same('אֶפְשָׁר מִדָּה אַחֶרֶת?', 'efshar mida akheret'), references: ['size'], referenceNote: 'Size noun checked. Composed phrase and adjective agreement require editorial review.',
        fr: { heading: 'Efchar mida akheret ? — je peux avoir une autre taille ?', meaning: 'Je peux avoir une autre taille ?', usage: "Utilise cette expression en essayant un vêtement ou en regardant l'article que tu veux dans une autre taille.", genderNote: unchangedFr, variants: frSame(same('אֶפְשָׁר מִדָּה אַחֶרֶת?', 'efshar mida akheret'), 'efchar mida akheret') } },
      { id: 'pay-by-card', meaning: 'Can I pay by credit card?', usage: 'Ask whether credit-card payment is possible before paying.', genderNote: unchanged, variants: same('אֶפְשָׁר לְשַׁלֵּם בְּאַשְׁרַאי?', "efshar leshalem be'ashrai"), references: ['pay', 'credit'], referenceNote: 'Infinitive and credit lemma/vowels checked; composed payment expression and prefix nikud need usage review.',
        fr: { heading: "Efchar lechalem be'achraï ? — je peux payer par carte ?", meaning: 'Je peux payer par carte ?', usage: 'Demande si le paiement par carte est possible avant de payer.', genderNote: unchangedFr, variants: frSame(same('אֶפְשָׁר לְשַׁלֵּם בְּאַשְׁרַאי?', "efshar leshalem be'ashrai"), "efchar lechalem be'achraï") } },
      { id: 'pay-cash', meaning: 'Can I pay in cash?', usage: 'Ask whether cash payment is possible. This does not ask for a discount.', genderNote: unchanged, variants: same('אֶפְשָׁר לְשַׁלֵּם בִּמְזֻמָּן?', 'efshar leshalem bimezuman'), references: ['pay', 'cash'], referenceNote: 'Pay and cash forms checked; prefix pointing and conversational transliteration specifically pending editorial review.',
        fr: { heading: 'Efchar lechalem bimezouman ? — je peux payer en espèces ?', meaning: 'Je peux payer en espèces ?', usage: 'Demande si le paiement en espèces est possible. Cela ne demande pas de réduction.', genderNote: unchangedFr, variants: frSame(same('אֶפְשָׁר לְשַׁלֵּם בִּמְזֻמָּן?', 'efshar leshalem bimezuman'), 'efchar lechalem bimezouman') } },
      { id: 'no-thank-you', meaning: 'No, thank you', usage: 'Politely decline an offer, such as an extra item or a bag.', genderNote: unchanged, variants: same('לֹא, תּוֹדָה.', 'lo toda'), references: ['omniglot'], referenceNote: 'Composed refusal from independently checked no/thank-you expressions; usage and nikud pending review.',
        fr: { heading: 'Lo, toda — non merci', meaning: 'Non merci', usage: 'Décline poliment une offre, comme un article en plus ou un sac.', genderNote: unchangedFr, variants: frSame(same('לֹא, תּוֹדָה.', 'lo toda'), 'lo toda') } },
    ],
  },
  {
    id: 'help', title: 'Directions and asking for help', description: 'Find your way or ask for a little more time to understand.',
    frTitle: "S'orienter et demander de l'aide", frDescription: "Trouve ton chemin ou demande un peu plus de temps pour comprendre.",
    phrases: [
      { id: 'where-bathroom', meaning: 'Where is the bathroom?', usage: 'Ask where the toilets are in a café, shop, or public place.', genderNote: unchanged, variants: same('אֵיפֹה הַשֵּׁרוּתִים?', 'eifo hasherutim'), references: ['omniglot', 'service'], referenceNote: 'Bathroom expression checked in phrase reference; pointed plural and article inferred from lemma, pending native review.',
        fr: { heading: 'Eifo hacheroutim ? — où sont les toilettes ?', meaning: 'Où sont les toilettes ?', usage: 'Demande où se trouvent les toilettes dans un café, un magasin, ou un lieu public.', genderNote: unchangedFr, variants: frSame(same('אֵיפֹה הַשֵּׁרוּתִים?', 'eifo hasherutim'), 'eifo hacheroutim') } },
      { id: 'help-please', meaning: 'Can I have some help, please?', usage: 'Ask someone nearby for assistance with an ordinary task or question.', genderNote: unchanged, variants: same('אֶפְשָׁר עֶזְרָה, בְּבַקָּשָׁה?', 'efshar ezra bevakasha'), references: ['omniglot'], referenceNote: 'Composed help request; lexical forms, nikud and everyday use need editorial verification.',
        fr: { heading: "Efchar ezra, bevakacha ? — je peux avoir de l'aide, s'il te plaît ?", meaning: "Je peux avoir de l'aide, s'il te plaît ?", usage: 'Demande de l’aide à quelqu’un à proximité pour une tâche ou une question ordinaire.', genderNote: unchangedFr, variants: frSame(same('אֶפְשָׁר עֶזְרָה, בְּבַקָּשָׁה?', 'efshar ezra bevakasha'), 'efchar ezra bevakacha') } },
      { id: 'dont-understand', meaning: 'I don’t understand', usage: 'Say this when you have not understood what someone said. Choose the speaker’s form.', genderNote: 'Mevin / mevina changes with the speaker.', variants: paired('speaker', ['אֲנִי לֹא מֵבִין.', 'ani lo mevin'], ['אֲנִי לֹא מְבִינָה.', 'ani lo mevina']), references: ['teachme', 'omniglot'], referenceNote: 'Meaning, transliteration and speaker agreement cross-checked; nikud drafted.',
        fr: { heading: 'Ani lo mevin — je ne comprends pas', meaning: 'Je ne comprends pas', usage: 'Dis-le quand tu n’as pas compris ce que quelqu’un a dit. Choisis la forme du locuteur.', genderNote: 'Mevin / mevina change selon le locuteur.',
          variants: frPaired(paired('speaker', ['אֲנִי לֹא מֵבִין.', 'ani lo mevin'], ['אֲנִי לֹא מְבִינָה.', 'ani lo mevina']), 'ani lo mevin', 'ani lo mevina') } },
      { id: 'repeat-please', meaning: 'Can you repeat that?', usage: 'Ask one person to repeat what they said. Pick the form for the person you are speaking to.', genderNote: 'Atah yakhol / at yekhola changes with the person addressed.', variants: paired('addressee', ['אַתָּה יָכוֹל לַחֲזֹר עַל זֶה?', 'ata yakhol lakhazor al ze'], ['אַתְּ יְכוֹלָה לַחֲזֹר עַל זֶה?', 'at yekhola lakhazor al ze']), references: ['teachme'], referenceNote: 'Full question and male/female addressee forms checked; nikud drafted.',
        fr: { heading: 'Ata yakhol lakhazor al zé ? — tu peux répéter ?', meaning: 'Tu peux répéter ?', usage: 'Demande à une personne de répéter ce qu’elle a dit. Choisis la forme selon la personne à qui tu parles.', genderNote: "Ata yakhol / at yekhola change selon la personne à qui l'on s'adresse.",
          variants: frPaired(paired('addressee', ['אַתָּה יָכוֹל לַחֲזֹר עַל זֶה?', 'ata yakhol lakhazor al ze'], ['אַתְּ יְכוֹלָה לַחֲזֹר עַל זֶה?', 'at yekhola lakhazor al ze']), 'ata yakhol lakhazor al zé', 'at yekhola lakhazor al zé') } },
      { id: 'more-slowly', meaning: 'Can you speak more slowly?', usage: 'Ask for a slower pace when you need more time to follow the conversation.', genderNote: unchanged, variants: same('אֶפְשָׁר לְדַבֵּר יוֹתֵר לְאַט?', "efshar ledaber yoter le'at"), references: ['omniglot'], referenceNote: 'Full expression/pronunciation checked; full nikud drafted.',
        fr: { heading: "Efchar ledaber yoter le'at ? — tu peux parler plus lentement ?", meaning: 'Tu peux parler plus lentement ?', usage: "Demande un rythme plus lent quand tu as besoin de plus de temps pour suivre la conversation.", genderNote: unchangedFr, variants: frSame(same('אֶפְשָׁר לְדַבֵּר יוֹתֵר לְאַט?', "efshar ledaber yoter le'at"), "efchar ledaber yoter le'at") } },
      // Localized, not translated: FR learners ask whether the other person speaks
      // French, not English — Hebrew changes from אנגלית (English) to צרפתית (French).
      { id: 'speak-english', meaning: 'Do you speak English?', usage: 'Ask one person whether you can continue in English.', genderNote: 'Medaber / medaberet changes with the person addressed.', variants: paired('addressee', ['אַתָּה מְדַבֵּר אַנְגְּלִית?', 'ata medaber anglit'], ['אַתְּ מְדַבֶּרֶת אַנְגְּלִית?', 'at medaberet anglit']), references: ['omniglot'], referenceNote: 'Full expression and addressee distinction checked; nikud drafted.',
        fr: { heading: 'Ata medaber tsarfatit ? — tu parles français ?', meaning: 'Tu parles français ?', usage: "Demande à une personne si tu peux continuer en français.", genderNote: "Medaber / medaberet change selon la personne à qui l'on s'adresse.",
          variants: [
            { id: 'male', label: 'Male addressee', hebrew: 'אַתָּה מְדַבֵּר צָרְפָתִית?', transliteration: 'ata medaber tsarfatit' },
            { id: 'female', label: 'Female addressee', hebrew: 'אַתְּ מְדַבֶּרֶת צָרְפָתִית?', transliteration: 'at medaberet tsarfatit' },
          ] } },
    ],
  },
];

export const phrases = phraseGroups.flatMap(group => group.phrases);

export function phraseVariant(phraseId: string, variantId = 'same'): PhraseVariant {
  const variant = phrases.find(phrase => phrase.id === phraseId)?.variants.find(item => item.id === variantId);
  if (!variant) throw new Error(`Unknown phrase variant: ${phraseId}/${variantId}`);
  return variant;
}

/** FR counterpart of phraseVariant — same lookup, but returns the phrase's FR variant
 *  (French transliteration, and for speak-english/speak-french, French-localized Hebrew). */
export function phraseVariantFr(phraseId: string, variantId = 'same'): PhraseVariant {
  const phrase = phrases.find(p => p.id === phraseId);
  const variant = phrase?.fr?.variants.find(item => item.id === variantId);
  if (!variant) throw new Error(`Unknown FR phrase variant: ${phraseId}/${variantId}`);
  return variant;
}

// Original exchanges assembled from the taught records, not copied dialogues.
export const phraseDialogues = [
  { id: 'morning-dialogue', title: 'A morning greeting', setting: 'Two people meet at the start of the day.',
    frTitle: 'Une salutation du matin', frSetting: 'Deux personnes se rencontrent au début de la journée.',
    turns: [
      { role: 'First person', frRole: 'Première personne', phraseId: 'hello', variantId: 'same', translation: 'Hello.', frTranslation: 'Bonjour.' },
      { role: 'Second person', frRole: 'Deuxième personne', phraseId: 'good-morning', variantId: 'same', translation: 'Good morning.', frTranslation: 'Bonjour (le matin).' },
    ] },
  { id: 'cafe-dialogue', title: 'A café order', setting: 'A female customer orders coffee; the server replies while handing it over.',
    frTitle: 'Une commande au café', frSetting: 'Une cliente commande un café ; le serveur répond en le lui tendant.',
    turns: [
      { role: 'Customer', frRole: 'Cliente', phraseId: 'coffee-please', variantId: 'female', translation: 'I want coffee, please.', frTranslation: "Je veux un café, s'il te plaît." },
      { role: 'Server', frRole: 'Serveur', phraseId: 'please', variantId: 'same', translation: 'Here you are.', frTranslation: 'Voilà.' },
    ] },
];

export const phraseExercises = [
  { id: 'phrase-morning', prompt: 'You meet someone in the morning. Which phrase is a morning greeting?', correctOptionId: 'morning-answer', explanation: 'Boker tov means “Good morning”. Erev tov is an evening greeting; lehitra’ot is a farewell.', options: [
    { id: 'morning-evening', phraseId: 'good-evening', variantId: 'same' },
    { id: 'morning-answer', phraseId: 'good-morning', variantId: 'same' },
    { id: 'morning-goodbye', phraseId: 'goodbye', variantId: 'same' },
  ] },
  { id: 'phrase-thanks', prompt: 'Someone has helped you. Which phrase means “Thank you”?', correctOptionId: 'thanks-answer', explanation: 'Toda means “Thank you”. Use it to acknowledge help or a kind gesture.', options: [
    { id: 'thanks-answer', phraseId: 'thank-you', variantId: 'same' },
    { id: 'thanks-milk', phraseId: 'without-milk', variantId: 'same' },
    { id: 'thanks-bathroom', phraseId: 'where-bathroom', variantId: 'same' },
  ] },
  { id: 'phrase-water', prompt: 'You would like water at a café. Which phrase asks for water politely?', correctOptionId: 'water-answer', explanation: 'Efshar mayim, bevakasha? asks for water politely. The other choices ask for coffee and a menu.', options: [
    { id: 'water-coffee', phraseId: 'coffee-please', variantId: 'female' },
    { id: 'water-menu', phraseId: 'menu-please', variantId: 'same' },
    { id: 'water-answer', phraseId: 'water-please', variantId: 'same' },
  ] },
];

// FR practice quiz: same taught phrases/options, French prompts and explanations.
export const frPhraseExercises = [
  { id: 'phrase-morning-fr', prompt: 'Tu rencontres quelqu’un le matin. Quelle expression est une salutation du matin ?', correctOptionId: 'morning-answer-fr', explanation: 'Boker tov veut dire « bonjour (le matin) ». Erev tov est une salutation du soir ; lehitra’ot est une formule de départ.', options: [
    { id: 'morning-evening-fr', phraseId: 'good-evening', variantId: 'same' },
    { id: 'morning-answer-fr', phraseId: 'good-morning', variantId: 'same' },
    { id: 'morning-goodbye-fr', phraseId: 'goodbye', variantId: 'same' },
  ] },
  { id: 'phrase-thanks-fr', prompt: 'Quelqu’un t’a aidé. Quelle expression veut dire « merci » ?', correctOptionId: 'thanks-answer-fr', explanation: 'Toda veut dire « merci ». Utilise-le pour reconnaître une aide ou un geste gentil.', options: [
    { id: 'thanks-answer-fr', phraseId: 'thank-you', variantId: 'same' },
    { id: 'thanks-milk-fr', phraseId: 'without-milk', variantId: 'same' },
    { id: 'thanks-bathroom-fr', phraseId: 'where-bathroom', variantId: 'same' },
  ] },
  { id: 'phrase-water-fr', prompt: 'Tu voudrais de l’eau au café. Quelle expression demande de l’eau poliment ?', correctOptionId: 'water-answer-fr', explanation: 'Efchar mayim, bevakacha ? demande de l’eau poliment. Les autres choix demandent un café et une carte.', options: [
    { id: 'water-coffee-fr', phraseId: 'coffee-please', variantId: 'female' },
    { id: 'water-menu-fr', phraseId: 'menu-please', variantId: 'same' },
    { id: 'water-answer-fr', phraseId: 'water-please', variantId: 'same' },
  ] },
];

export const phraseQuestions = [
  { question: 'Which Hebrew phrases should I learn first?', answer: 'Start with a greeting, thank you, please and a request you can use today. Practise a few expressions in their situations before adding more.' },
  { question: 'Can I use these phrases before I can read Hebrew?', answer: 'Yes. The English meanings and Latin-letter transliterations help you start. Transliteration is an approximation; learning the letters and hearing spoken Hebrew will help you develop your pronunciation.' },
  { question: 'When do I need a different gender form?', answer: 'Look at the label on the card. “Speaker” means the form follows the person saying the phrase. “Addressee” means it follows the person being spoken to. The examples that address someone use singular forms.' },
];

// FR FAQ: real FR queries from docs/seo/research/fr/PHRASES_FR.md, tu register.
export const frPhraseQuestions = [
  { question: 'Comment dit-on bonjour en hébreu ?', answer: 'Utilise chalom pour une salutation simple, à tout moment de la journée, ou boker tov le matin et erev tov le soir.' },
  { question: 'Que signifie « boker tov » ?', answer: 'Boker tov veut dire « bonjour », au sens propre « bon matin ». Utilise-le pour saluer quelqu’un en début de journée.' },
  { question: 'Quelle est la différence entre « toda » et « toda raba » ?', answer: 'Toda veut dire « merci » ; toda raba veut dire « merci beaucoup », pour un remerciement plus appuyé.' },
  { question: 'Que signifie « mazel tov » ?', answer: 'Mazel tov veut dire littéralement « bonne étoile » et sert à féliciter quelqu’un, par exemple pour une naissance, un mariage ou une réussite. Ce n’est pas l’une des expressions enseignées sur cette page, mais tu la croiseras souvent.' },
  { question: 'Comment dit-on « au revoir » en hébreu ?', answer: 'Utilise lehitra’ot, qui veut dire « à bientôt ». Chalom fonctionne aussi bien pour se saluer que pour se dire au revoir.' },
  { question: 'Par où commencer pour apprendre l’hébreu ?', answer: 'Commence par l’alphabet hébreu et sa prononciation, puis ajoute du vocabulaire utile comme ces expressions. Construis ensuite progressivement la grammaire et la lecture.' },
];

// Leave human approval and publication explicit. References alone do not release teaching content.
// Released 2026-10-14 by product owner approval, without the external native-speaker
// sign-off originally planned — see docs/hebrew-phrases-landing-implementation-brief.md.
// The FR counterpart content (phrase.fr, frPhraseQuestions, frPhraseExercises,
// phraseDialogues' fr fields) was added to this same source file on 2026-10-19,
// which moves phraseContentSha256 (it hashes the whole phraseGroups/phraseDialogues
// objects) — approvedContentSha256 below is updated to match. The EN-reviewed
// teaching content (meaning/usage/Hebrew) did not change, so reviewedAt/publishedAt
// are left at the original EN approval date; the rendered EN page is unchanged.
export const phraseReview = {
  editorialApproved: true,
  reviewer: 'Viktor (product owner)' as string | null,
  qualification: 'Product owner editorial approval; references checked in-app. No external native-speaker sign-off.' as string | null,
  reviewedAt: '2026-10-14' as string | null,
  approvedContentSha256: '3c744256c1be85fa91c06b5db9cd7782576c1b7c18128de490b07ce66e609724' as string | null,
  published: true,
  publishedAt: '2026-10-14' as string | null,
};

// FR release gate — independent of phraseReview so a future EN content edit and an FR
// edit are each re-approved on their own terms, same precedent as alphabet-course.json's
// per-locale `locales.fr` block.
export const phraseReviewFr = {
  editorialApproved: true,
  reviewer: 'Viktor (product owner)' as string | null,
  qualification: 'Product owner editorial approval; FR localization checked against docs/seo/research/fr/PHRASES_FR.md and phrases-fr-review.md. No external native-speaker sign-off.' as string | null,
  reviewedAt: '2026-10-19' as string | null,
  approvedContentSha256: '4bbc16bf3f267aa57675d4480b4b6f6ceca9b994ea3107d92e01ab1c7ac9f6a0' as string | null,
  published: true,
  publishedAt: '2026-10-19' as string | null,
  backfill: true,
};
