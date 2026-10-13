export interface PhraseVariant {
  id: string;
  label: string;
  hebrew: string;
  transliteration: string;
}

export interface Phrase {
  id: string;
  meaning: string;
  usage: string;
  genderNote: string;
  variants: PhraseVariant[];
  references: string[];
  referenceNote: string;
}

export interface PhraseGroup {
  id: string;
  title: string;
  description: string;
  phrases: Phrase[];
}

const same = (hebrew: string, transliteration: string): PhraseVariant[] => [
  { id: 'same', label: 'Same form', hebrew, transliteration },
];
const paired = (axis: 'speaker' | 'addressee', male: [string, string], female: [string, string]): PhraseVariant[] => [
  { id: 'male', label: `Male ${axis}`, hebrew: male[0], transliteration: male[1] },
  { id: 'female', label: `Female ${axis}`, hebrew: female[0], transliteration: female[1] },
];
const unchanged = 'The expression does not change with the speaker or the person addressed.';

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
    phrases: [
      { id: 'hello', meaning: 'Hello / goodbye', usage: 'A simple greeting when you meet someone. The same word can also be used when leaving.', genderNote: unchanged, variants: same('שָׁלוֹם', 'shalom'), references: ['omniglot'], referenceNote: 'Greeting and farewell meanings checked; nikud drafted for editorial review.' },
      { id: 'good-morning', meaning: 'Good morning', usage: 'Greet someone in the morning, at a café, at work, or at the start of a conversation.', genderNote: unchanged, variants: same('בֹּקֶר טוֹב', 'boker tov'), references: ['teachme', 'omniglot'], referenceNote: 'Phrase and transliteration cross-checked; nikud drafted.' },
      { id: 'good-evening', meaning: 'Good evening', usage: 'Use this as an evening greeting, rather than as a good-night farewell.', genderNote: unchanged, variants: same('עֶרֶב טוֹב', 'erev tov'), references: ['teachme', 'omniglot'], referenceNote: 'Phrase and meaning cross-checked; usage note and nikud drafted.' },
      { id: 'goodbye', meaning: 'Goodbye / see you', usage: 'Say this when you are leaving. It is a farewell, not a first greeting.', genderNote: unchanged, variants: same('לְהִתְרָאוֹת', "lehitra'ot"), references: ['omniglot'], referenceNote: 'Farewell phrase checked; nikud drafted.' },
      { id: 'my-name', meaning: 'My name is…', usage: 'Add your name after the phrase. The dots mark the place for your name; do not read them aloud.', genderNote: unchanged, variants: same('שְׁמִי…', 'shmi…'), references: ['teachme'], referenceNote: 'Name-introduction pattern checked; nikud drafted.' },
      { id: 'your-name', meaning: 'What is your name?', usage: 'Ask one person their name. Choose the form for the person you are speaking to.', genderNote: 'The ending changes with the person addressed, not the speaker.', variants: paired('addressee', ['אֵיךְ קוֹרְאִים לְךָ?', "eikh kor'im lekha"], ['אֵיךְ קוֹרְאִים לָךְ?', "eikh kor'im lakh"]), references: ['teachme'], referenceNote: 'Male/female addressee forms checked; nikud drafted.' },
    ],
  },
  {
    id: 'politeness', title: 'Politeness and everyday replies', description: 'Small expressions that make everyday exchanges easier.',
    phrases: [
      { id: 'thank-you', meaning: 'Thank you', usage: 'Thank someone for help, an answer, or something they have handed you.', genderNote: unchanged, variants: same('תּוֹדָה', 'toda'), references: ['omniglot'], referenceNote: 'Meaning and pronunciation checked; nikud drafted.' },
      { id: 'please', meaning: "Please / you’re welcome", usage: 'Add it to a request for “please”. In reply to thanks it means “you’re welcome”; when handing something over it can mean “here you are”.', genderNote: unchanged, variants: same('בְּבַקָּשָׁה', 'bevakasha'), references: ['omniglot'], referenceNote: 'Please and reply-to-thanks meanings checked; handover context and nikud require editorial review.' },
      { id: 'excuse-me', meaning: 'Excuse me / sorry', usage: 'Get someone’s attention politely, or apologize for a small interruption or mistake.', genderNote: unchanged, variants: same('סְלִיחָה', 'slikha'), references: ['omniglot'], referenceNote: 'Apology/attention senses checked; nikud drafted.' },
      { id: 'yes', meaning: 'Yes', usage: 'Give a short affirmative answer. Tone and context still matter.', genderNote: unchanged, variants: same('כֵּן', 'ken'), references: ['omniglot'], referenceNote: 'Basic affirmative checked; nikud drafted.' },
      { id: 'no', meaning: 'No', usage: 'Give a short negative answer. Use “No, thank you” below when politely declining an offer.', genderNote: unchanged, variants: same('לֹא', 'lo'), references: ['omniglot'], referenceNote: 'Basic negative checked; nikud drafted.' },
      { id: 'im-fine', meaning: 'I’m fine / I’m okay', usage: 'A short reply when someone asks how you are. This expression uses the same wording for any speaker.', genderNote: unchanged, variants: same('אֲנִי בְּסֵדֶר', 'ani beseder'), references: ['teachme'], referenceNote: 'Reply pattern checked; nikud drafted.' },
    ],
  },
  {
    id: 'food', title: 'Ordering food and drink', description: 'Make a simple request and finish the exchange politely.',
    phrases: [
      { id: 'water-please', meaning: 'Can I have water, please?', usage: 'Ask for water when ordering or while sitting at a table. The request does not specify a type of water.', genderNote: unchanged, variants: same('אֶפְשָׁר מַיִם, בְּבַקָּשָׁה?', 'efshar mayim bevakasha'), references: ['omniglot'], referenceNote: 'Composed noun request; constituent request/politeness patterns checked. Full naturalness and nikud pending review.' },
      { id: 'coffee-please', meaning: 'I want coffee, please', usage: 'A simple café order. Choose the form for the speaker; “please” softens the direct request.', genderNote: 'Rotse / rotsa changes with the speaker. The server’s gender does not change it.', variants: paired('speaker', ['אֲנִי רוֹצֶה קָפֶה, בְּבַקָּשָׁה.', 'ani rotse kafe bevakasha'], ['אֲנִי רוֹצָה קָפֶה, בְּבַקָּשָׁה.', 'ani rotsa kafe bevakasha']), references: ['want', 'omniglot'], referenceNote: 'Want verb, speaker agreement and request usage checked. Composed coffee request and nikud pending editorial review.' },
      { id: 'menu-please', meaning: 'Can I have a menu, please?', usage: 'Ask for the menu before ordering.', genderNote: unchanged, variants: same('אֶפְשָׁר תַּפְרִיט, בְּבַקָּשָׁה?', 'efshar tafrit bevakasha'), references: ['menu', 'omniglot'], referenceNote: 'Menu lemma/vowels checked. Composed request needs usage and full nikud review.' },
      { id: 'bill-please', meaning: 'The bill, please', usage: 'Ask for the bill when you are ready to pay at a café or restaurant.', genderNote: unchanged, variants: same('חֶשְׁבּוֹן, בְּבַקָּשָׁה.', 'kheshbon bevakasha'), references: ['omniglot'], referenceNote: 'Composed request; please pattern checked. Bill lemma and full phrase require editorial verification.' },
      { id: 'without-milk', meaning: 'Without milk, please', usage: 'Add this when ordering a drink. This short request is not a complete allergy or food-safety explanation.', genderNote: unchanged, variants: same('בְּלִי חָלָב, בְּבַקָּשָׁה.', 'bli khalav bevakasha'), references: ['omniglot'], referenceNote: 'Composed ingredient request; full lexical, nikud and naturalness check required.' },
      { id: 'thank-you-very-much', meaning: 'Thank you very much', usage: 'Offer a warmer thank-you after someone brings your order or helps with a request.', genderNote: unchanged, variants: same('תּוֹדָה רַבָּה', 'toda raba'), references: ['teachme', 'omniglot'], referenceNote: 'Distinct expanded thank-you phrase cross-checked; nikud drafted.' },
    ],
  },
  {
    id: 'shopping', title: 'Shopping and paying', description: 'Ask about an item, a size, or a way to pay.',
    phrases: [
      { id: 'how-much', meaning: 'How much does this cost?', usage: 'Point to one item or show it while asking the price.', genderNote: unchanged, variants: same('כַּמָּה זֶה עוֹלֶה?', 'kama ze ole'), references: ['omniglot'], referenceNote: 'Price question checked; nikud drafted.' },
      { id: 'do-you-have-this', meaning: 'Do you have this?', usage: 'Show the item or a picture. These forms address one shop assistant, not a group.', genderNote: 'Lekha / lakh changes with the person addressed.', variants: paired('addressee', ['יֵשׁ לְךָ אֶת זֶה?', 'yesh lekha et ze'], ['יֵשׁ לָךְ אֶת זֶה?', 'yesh lakh et ze']), references: ['teachme'], referenceNote: 'Composed availability question; singular pronoun distinction checked against addressee patterns. Naturalness/nikud pending review.' },
      { id: 'another-size', meaning: 'Can I have another size?', usage: 'Use this while trying on clothing or looking at the item you want in another size.', genderNote: unchanged, variants: same('אֶפְשָׁר מִדָּה אַחֶרֶת?', 'efshar mida akheret'), references: ['size'], referenceNote: 'Size noun checked. Composed phrase and adjective agreement require editorial review.' },
      { id: 'pay-by-card', meaning: 'Can I pay by credit card?', usage: 'Ask whether credit-card payment is possible before paying.', genderNote: unchanged, variants: same('אֶפְשָׁר לְשַׁלֵּם בְּאַשְׁרַאי?', "efshar leshalem be'ashrai"), references: ['pay', 'credit'], referenceNote: 'Infinitive and credit lemma/vowels checked; composed payment expression and prefix nikud need usage review.' },
      { id: 'pay-cash', meaning: 'Can I pay in cash?', usage: 'Ask whether cash payment is possible. This does not ask for a discount.', genderNote: unchanged, variants: same('אֶפְשָׁר לְשַׁלֵּם בִּמְזֻמָּן?', 'efshar leshalem bimezuman'), references: ['pay', 'cash'], referenceNote: 'Pay and cash forms checked; prefix pointing and conversational transliteration specifically pending editorial review.' },
      { id: 'no-thank-you', meaning: 'No, thank you', usage: 'Politely decline an offer, such as an extra item or a bag.', genderNote: unchanged, variants: same('לֹא, תּוֹדָה.', 'lo toda'), references: ['omniglot'], referenceNote: 'Composed refusal from independently checked no/thank-you expressions; usage and nikud pending review.' },
    ],
  },
  {
    id: 'help', title: 'Directions and asking for help', description: 'Find your way or ask for a little more time to understand.',
    phrases: [
      { id: 'where-bathroom', meaning: 'Where is the bathroom?', usage: 'Ask where the toilets are in a café, shop, or public place.', genderNote: unchanged, variants: same('אֵיפֹה הַשֵּׁרוּתִים?', 'eifo hasherutim'), references: ['omniglot', 'service'], referenceNote: 'Bathroom expression checked in phrase reference; pointed plural and article inferred from lemma, pending native review.' },
      { id: 'help-please', meaning: 'Can I have some help, please?', usage: 'Ask someone nearby for assistance with an ordinary task or question.', genderNote: unchanged, variants: same('אֶפְשָׁר עֶזְרָה, בְּבַקָּשָׁה?', 'efshar ezra bevakasha'), references: ['omniglot'], referenceNote: 'Composed help request; lexical forms, nikud and everyday use need editorial verification.' },
      { id: 'dont-understand', meaning: 'I don’t understand', usage: 'Say this when you have not understood what someone said. Choose the speaker’s form.', genderNote: 'Mevin / mevina changes with the speaker.', variants: paired('speaker', ['אֲנִי לֹא מֵבִין.', 'ani lo mevin'], ['אֲנִי לֹא מְבִינָה.', 'ani lo mevina']), references: ['teachme', 'omniglot'], referenceNote: 'Meaning, transliteration and speaker agreement cross-checked; nikud drafted.' },
      { id: 'repeat-please', meaning: 'Can you repeat that?', usage: 'Ask one person to repeat what they said. Pick the form for the person you are speaking to.', genderNote: 'Atah yakhol / at yekhola changes with the person addressed.', variants: paired('addressee', ['אַתָּה יָכוֹל לַחֲזֹר עַל זֶה?', 'ata yakhol lakhazor al ze'], ['אַתְּ יְכוֹלָה לַחֲזֹר עַל זֶה?', 'at yekhola lakhazor al ze']), references: ['teachme'], referenceNote: 'Full question and male/female addressee forms checked; nikud drafted.' },
      { id: 'more-slowly', meaning: 'Can you speak more slowly?', usage: 'Ask for a slower pace when you need more time to follow the conversation.', genderNote: unchanged, variants: same('אֶפְשָׁר לְדַבֵּר יוֹתֵר לְאַט?', "efshar ledaber yoter le'at"), references: ['omniglot'], referenceNote: 'Full expression/pronunciation checked; full nikud drafted.' },
      { id: 'speak-english', meaning: 'Do you speak English?', usage: 'Ask one person whether you can continue in English.', genderNote: 'Medaber / medaberet changes with the person addressed.', variants: paired('addressee', ['אַתָּה מְדַבֵּר אַנְגְּלִית?', 'ata medaber anglit'], ['אַתְּ מְדַבֶּרֶת אַנְגְּלִית?', 'at medaberet anglit']), references: ['omniglot'], referenceNote: 'Full expression and addressee distinction checked; nikud drafted.' },
    ],
  },
];

export const phrases = phraseGroups.flatMap(group => group.phrases);

export function phraseVariant(phraseId: string, variantId = 'same'): PhraseVariant {
  const variant = phrases.find(phrase => phrase.id === phraseId)?.variants.find(item => item.id === variantId);
  if (!variant) throw new Error(`Unknown phrase variant: ${phraseId}/${variantId}`);
  return variant;
}

// Original exchanges assembled from the taught records, not copied dialogues.
export const phraseDialogues = [
  { id: 'morning-dialogue', title: 'A morning greeting', setting: 'Two people meet at the start of the day.', turns: [
    { role: 'First person', phraseId: 'hello', variantId: 'same', translation: 'Hello.' },
    { role: 'Second person', phraseId: 'good-morning', variantId: 'same', translation: 'Good morning.' },
  ] },
  { id: 'cafe-dialogue', title: 'A café order', setting: 'A female customer orders coffee; the server replies while handing it over.', turns: [
    { role: 'Customer', phraseId: 'coffee-please', variantId: 'female', translation: 'I want coffee, please.' },
    { role: 'Server', phraseId: 'please', variantId: 'same', translation: 'Here you are.' },
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

export const phraseQuestions = [
  { question: 'Which Hebrew phrases should I learn first?', answer: 'Start with a greeting, thank you, please and a request you can use today. Practise a few expressions in their situations before adding more.' },
  { question: 'Can I use these phrases before I can read Hebrew?', answer: 'Yes. The English meanings and Latin-letter transliterations help you start. Transliteration is an approximation; learning the letters and hearing spoken Hebrew will help you develop your pronunciation.' },
  { question: 'When do I need a different gender form?', answer: 'Look at the label on the card. “Speaker” means the form follows the person saying the phrase. “Addressee” means it follows the person being spoken to. The examples that address someone use singular forms.' },
];

// Leave human approval and publication explicit. References alone do not release teaching content.
export const phraseReview = {
  editorialApproved: false,
  reviewer: null as string | null,
  qualification: null as string | null,
  reviewedAt: null as string | null,
  approvedContentSha256: null as string | null,
  published: false,
  publishedAt: null as string | null,
};
