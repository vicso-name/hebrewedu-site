# FR Hebrew-phrases page — content for proofreading

All 30 FR phrase cards (heading, Hebrew, transliteration, gender variants, meaning,
usage note) and both FR dialogues, generated from `src/data/hebrew-phrases.ts`
(each phrase's `fr` field) for native-speaker proofreading before/after launch.
Hebrew + nikud are identical to the EN page for every phrase except
**speak-english** (`Ata medaber tsarfatit ? — tu parles français ?`), which is
localized rather than translated: FR learners ask whether the other person
speaks French, not English, so the Hebrew changes from אַנְגְּלִית to
צָרְפָתִית.

Transliteration (the bracketed pronunciation field under the Hebrew) follows
French reading conventions: `ch` for the Hebrew ש sound (not `sh`), `kh`
unchanged (guttural, as in English), `ou` for the /u/ ("oo") vowel (e.g.
`bimezouman`, `hacheroutim`), and `é` on any word-final vowel sound that
would otherwise read silent in French (`kafé`, `zé`, `olé`, `rotsé`).

Card headings use the **searched Latin spelling** (the same transliteration
the EN page uses, e.g. "Shalom", "Bevakasha", "Efshar mayim, bevakasha") —
not the French-reading-convention spelling above, which stays in the
pronunciation field only. Format: "`<searched Latin spelling>` —
`<French meaning>`" (e.g. "Boker tov — bonjour (le matin)", "Toda raba —
merci beaucoup").

**Register (tu/vous):** reader-facing instructions ("Choisis la forme...",
"Demande...") stay *tu* throughout. The French *meaning* of a phrase said to
a stranger (waiter, shop assistant, passer-by, asking for help) uses *vous*:
excusez-moi/pardon, vous avez ça ?, vous pouvez répéter ?, vous pouvez
parler plus lentement ?, vous parlez français ?, s'il vous plaît (water/menu/
help/bill/without-milk requests, and the "please" card's heading), je
voudrais un café s'il vous plaît. Friendly phrases (comment tu t'appelles ?)
stay *tu*. Hebrew has no tu/vous distinction — the how-to-use section now
says so explicitly: "L'hébreu ne distingue pas tu et vous : la même phrase
s'emploie avec un ami comme avec un serveur."

No phrase card has an audio player today (checked against
`src/components/phrases/PhraseCard.astro`), so there is nothing for the FR
cards to gracefully omit — noted here per the editorial brief's instruction
to confirm this rather than leave it unchecked.

Source: `docs/seo/research/fr/PHRASES_FR.md` (title/H1/meta/slug, keyword
research) and `keywords-fr.csv` (cluster phrases).

---

## Salutations et présentations

Commence une conversation, présente-toi, ou dis au revoir.

### Shalom — bonjour / au revoir

- ID: hello
- Hébreu: שָׁלוֹם — Transcription: [chalom] (Same form)
- Sens: Bonjour / au revoir
- Usage: Une salutation simple pour saluer quelqu’un. Le même mot peut aussi être utilisé en partant.
- Accord de genre: L'expression ne change pas selon qui parle ou à qui l'on s'adresse.

### Boker tov — bonjour (le matin)

- ID: good-morning
- Hébreu: בֹּקֶר טוֹב — Transcription: [boker tov] (Same form)
- Sens: Bonjour (le matin)
- Usage: Salue quelqu’un le matin, au café, au travail, ou au début d’une conversation.
- Accord de genre: L'expression ne change pas selon qui parle ou à qui l'on s'adresse.

### Erev tov — bonsoir

- ID: good-evening
- Hébreu: עֶרֶב טוֹב — Transcription: [erev tov] (Same form)
- Sens: Bonsoir
- Usage: Utilise cette expression comme salutation du soir, pas comme formule pour souhaiter bonne nuit en partant.
- Accord de genre: L'expression ne change pas selon qui parle ou à qui l'on s'adresse.

### Lehitra'ot — au revoir / à bientôt

- ID: goodbye
- Hébreu: לְהִתְרָאוֹת — Transcription: [lehitra'ot] (Same form)
- Sens: Au revoir / à bientôt
- Usage: Dis-le en partant. C’est une formule de départ, pas une salutation pour arriver.
- Accord de genre: L'expression ne change pas selon qui parle ou à qui l'on s'adresse.

### Shmi… — je m’appelle…

- ID: my-name
- Hébreu: שְׁמִי… — Transcription: [chmi…] (Same form)
- Sens: Je m’appelle…
- Usage: Ajoute ton prénom après cette expression. Les points de suspension marquent la place de ton prénom ; ne les prononce pas.
- Accord de genre: L'expression ne change pas selon qui parle ou à qui l'on s'adresse.

### Eikh kor'im lekha ? — comment tu t'appelles ?

- ID: your-name
- Hébreu: אֵיךְ קוֹרְאִים לְךָ? — Transcription: [eikh kor'im lekha] (Male addressee)
- Hébreu: אֵיךְ קוֹרְאִים לָךְ? — Transcription: [eikh kor'im lakh] (Female addressee)
- Sens: Comment tu t'appelles ?
- Usage: Demande le prénom d'une personne. Choisis la forme selon la personne à qui tu parles.
- Accord de genre: La terminaison change selon la personne à qui l'on s'adresse, pas selon qui parle.

## Politesse et réponses du quotidien

De petites expressions qui facilitent les échanges du quotidien.

### Toda — merci

- ID: thank-you
- Hébreu: תּוֹדָה — Transcription: [toda] (Same form)
- Sens: Merci
- Usage: Remercie quelqu'un pour son aide, une réponse, ou quelque chose qu'on vient de te donner.
- Accord de genre: L'expression ne change pas selon qui parle ou à qui l'on s'adresse.

### Bevakasha — s'il te plaît / s'il vous plaît / de rien

- ID: please
- Hébreu: בְּבַקָּשָׁה — Transcription: [bevakacha] (Same form)
- Sens: S'il te plaît / s'il vous plaît / de rien
- Usage: Ajoute-le à une demande pour dire « s'il te plaît » ou « s'il vous plaît ». En réponse à un merci, cela veut dire « de rien » ; en tendant quelque chose, cela peut vouloir dire « voilà ».
- Accord de genre: L'expression ne change pas selon qui parle ou à qui l'on s'adresse.

### Slikha — excusez-moi / pardon

- ID: excuse-me
- Hébreu: סְלִיחָה — Transcription: [slikha] (Same form)
- Sens: Excusez-moi / pardon
- Usage: Attire poliment l'attention de quelqu'un, ou excuse-toi pour une petite interruption ou une erreur.
- Accord de genre: L'expression ne change pas selon qui parle ou à qui l'on s'adresse.

### Ken — oui

- ID: yes
- Hébreu: כֵּן — Transcription: [ken] (Same form)
- Sens: Oui
- Usage: Donne une courte réponse affirmative. Le ton et le contexte comptent toujours.
- Accord de genre: L'expression ne change pas selon qui parle ou à qui l'on s'adresse.

### Lo — non

- ID: no
- Hébreu: לֹא — Transcription: [lo] (Same form)
- Sens: Non
- Usage: Donne une courte réponse négative. Utilise « non merci » ci-dessous pour décliner poliment une offre.
- Accord de genre: L'expression ne change pas selon qui parle ou à qui l'on s'adresse.

### Ani beseder — ça va / je vais bien

- ID: im-fine
- Hébreu: אֲנִי בְּסֵדֶר — Transcription: [ani beseder] (Same form)
- Sens: Ça va / je vais bien
- Usage: Une courte réponse quand on te demande comment tu vas. Cette expression utilise la même forme quel que soit le locuteur.
- Accord de genre: L'expression ne change pas selon qui parle ou à qui l'on s'adresse.

## Commander à manger et à boire

Fais une demande simple et termine l'échange poliment.

### Efshar mayim, bevakasha ? — je peux avoir de l'eau, s'il vous plaît ?

- ID: water-please
- Hébreu: אֶפְשָׁר מַיִם, בְּבַקָּשָׁה? — Transcription: [efchar mayim bevakacha] (Same form)
- Sens: Je peux avoir de l'eau, s'il vous plaît ?
- Usage: Demande de l'eau en commandant ou à table. La demande ne précise pas de type d'eau.
- Accord de genre: L'expression ne change pas selon qui parle ou à qui l'on s'adresse.

### Ani rotse kafe, bevakasha — je voudrais un café, s'il vous plaît

- ID: coffee-please
- Hébreu: אֲנִי רוֹצֶה קָפֶה, בְּבַקָּשָׁה. — Transcription: [ani rotsé kafé bevakacha] (Male speaker)
- Hébreu: אֲנִי רוֹצָה קָפֶה, בְּבַקָּשָׁה. — Transcription: [ani rotsa kafé bevakacha] (Female speaker)
- Sens: Je voudrais un café, s'il vous plaît
- Usage: Une commande simple au café. Choisis la forme selon le locuteur ; « s'il vous plaît » adoucit la demande directe.
- Accord de genre: Rotse / rotsa change selon le locuteur. Le genre du serveur ne change pas la forme.

### Efshar tafrit, bevakasha ? — je peux avoir une carte, s'il vous plaît ?

- ID: menu-please
- Hébreu: אֶפְשָׁר תַּפְרִיט, בְּבַקָּשָׁה? — Transcription: [efchar tafrit bevakacha] (Same form)
- Sens: Je peux avoir une carte, s'il vous plaît ?
- Usage: Demande la carte avant de commander.
- Accord de genre: L'expression ne change pas selon qui parle ou à qui l'on s'adresse.

### Kheshbon, bevakasha — l'addition, s'il vous plaît

- ID: bill-please
- Hébreu: חֶשְׁבּוֹן, בְּבַקָּשָׁה. — Transcription: [khechbon bevakacha] (Same form)
- Sens: L'addition, s'il vous plaît
- Usage: Demande l'addition quand tu es prêt à payer au café ou au restaurant.
- Accord de genre: L'expression ne change pas selon qui parle ou à qui l'on s'adresse.

### Bli khalav, bevakasha — sans lait, s'il vous plaît

- ID: without-milk
- Hébreu: בְּלִי חָלָב, בְּבַקָּשָׁה. — Transcription: [bli khalav bevakacha] (Same form)
- Sens: Sans lait, s'il vous plaît
- Usage: Ajoute cette expression en commandant une boisson. Cette courte demande n'est pas une explication complète d'allergie ou de sécurité alimentaire.
- Accord de genre: L'expression ne change pas selon qui parle ou à qui l'on s'adresse.

### Toda raba — merci beaucoup

- ID: thank-you-very-much
- Hébreu: תּוֹדָה רַבָּה — Transcription: [toda raba] (Same form)
- Sens: Merci beaucoup
- Usage: Propose un remerciement plus chaleureux après qu'on t'a apporté ta commande ou aidé pour une demande.
- Accord de genre: L'expression ne change pas selon qui parle ou à qui l'on s'adresse.

## Faire des achats et payer

Demande un article, une taille, ou un moyen de paiement.

### Kama ze ole ? — ça coûte combien ?

- ID: how-much
- Hébreu: כַּמָּה זֶה עוֹלֶה? — Transcription: [kama zé olé] (Same form)
- Sens: Ça coûte combien ?
- Usage: Montre du doigt un article, ou montre-le, en demandant le prix.
- Accord de genre: L'expression ne change pas selon qui parle ou à qui l'on s'adresse.

### Yesh lekha et ze ? — vous avez ça ?

- ID: do-you-have-this
- Hébreu: יֵשׁ לְךָ אֶת זֶה? — Transcription: [yech lekha et zé] (Male addressee)
- Hébreu: יֵשׁ לָךְ אֶת זֶה? — Transcription: [yech lakh et zé] (Female addressee)
- Sens: Vous avez ça ?
- Usage: Montre l'article ou une photo. Ces formes s'adressent à un seul vendeur, pas à un groupe.
- Accord de genre: Lekha / lakh change selon la personne à qui l'on s'adresse.

### Efshar mida akheret ? — je peux avoir une autre taille ?

- ID: another-size
- Hébreu: אֶפְשָׁר מִדָּה אַחֶרֶת? — Transcription: [efchar mida akheret] (Same form)
- Sens: Je peux avoir une autre taille ?
- Usage: Utilise cette expression en essayant un vêtement ou en regardant l'article que tu veux dans une autre taille.
- Accord de genre: L'expression ne change pas selon qui parle ou à qui l'on s'adresse.

### Efshar leshalem be'ashrai ? — je peux payer par carte ?

- ID: pay-by-card
- Hébreu: אֶפְשָׁר לְשַׁלֵּם בְּאַשְׁרַאי? — Transcription: [efchar lechalem be'achraï] (Same form)
- Sens: Je peux payer par carte ?
- Usage: Demande si le paiement par carte est possible avant de payer.
- Accord de genre: L'expression ne change pas selon qui parle ou à qui l'on s'adresse.

### Efshar leshalem bimezuman ? — je peux payer en espèces ?

- ID: pay-cash
- Hébreu: אֶפְשָׁר לְשַׁלֵּם בִּמְזֻמָּן? — Transcription: [efchar lechalem bimezouman] (Same form)
- Sens: Je peux payer en espèces ?
- Usage: Demande si le paiement en espèces est possible. Cela ne demande pas de réduction.
- Accord de genre: L'expression ne change pas selon qui parle ou à qui l'on s'adresse.

### Lo, toda — non merci

- ID: no-thank-you
- Hébreu: לֹא, תּוֹדָה. — Transcription: [lo toda] (Same form)
- Sens: Non merci
- Usage: Décline poliment une offre, comme un article en plus ou un sac.
- Accord de genre: L'expression ne change pas selon qui parle ou à qui l'on s'adresse.

## S'orienter et demander de l'aide

Trouve ton chemin ou demande un peu plus de temps pour comprendre.

### Eifo hasherutim ? — où sont les toilettes ?

- ID: where-bathroom
- Hébreu: אֵיפֹה הַשֵּׁרוּתִים? — Transcription: [eifo hacheroutim] (Same form)
- Sens: Où sont les toilettes ?
- Usage: Demande où se trouvent les toilettes dans un café, un magasin, ou un lieu public.
- Accord de genre: L'expression ne change pas selon qui parle ou à qui l'on s'adresse.

### Efshar ezra, bevakasha ? — je peux avoir de l'aide, s'il vous plaît ?

- ID: help-please
- Hébreu: אֶפְשָׁר עֶזְרָה, בְּבַקָּשָׁה? — Transcription: [efchar ezra bevakacha] (Same form)
- Sens: Je peux avoir de l'aide, s'il vous plaît ?
- Usage: Demande de l’aide à quelqu’un à proximité pour une tâche ou une question ordinaire.
- Accord de genre: L'expression ne change pas selon qui parle ou à qui l'on s'adresse.

### Ani lo mevin — je ne comprends pas

- ID: dont-understand
- Hébreu: אֲנִי לֹא מֵבִין. — Transcription: [ani lo mevin] (Male speaker)
- Hébreu: אֲנִי לֹא מְבִינָה. — Transcription: [ani lo mevina] (Female speaker)
- Sens: Je ne comprends pas
- Usage: Dis-le quand tu n’as pas compris ce que quelqu’un a dit. Choisis la forme du locuteur.
- Accord de genre: Mevin / mevina change selon le locuteur.

### Ata yakhol lakhazor al ze ? — vous pouvez répéter ?

- ID: repeat-please
- Hébreu: אַתָּה יָכוֹל לַחֲזֹר עַל זֶה? — Transcription: [ata yakhol lakhazor al zé] (Male addressee)
- Hébreu: אַתְּ יְכוֹלָה לַחֲזֹר עַל זֶה? — Transcription: [at yekhola lakhazor al zé] (Female addressee)
- Sens: Vous pouvez répéter ?
- Usage: Demande à une personne de répéter ce qu’elle a dit. Choisis la forme selon la personne à qui tu parles.
- Accord de genre: Ata yakhol / at yekhola change selon la personne à qui l'on s'adresse.

### Efshar ledaber yoter le'at ? — vous pouvez parler plus lentement ?

- ID: more-slowly
- Hébreu: אֶפְשָׁר לְדַבֵּר יוֹתֵר לְאַט? — Transcription: [efchar ledaber yoter le'at] (Same form)
- Sens: Vous pouvez parler plus lentement ?
- Usage: Demande un rythme plus lent quand tu as besoin de plus de temps pour suivre la conversation.
- Accord de genre: L'expression ne change pas selon qui parle ou à qui l'on s'adresse.

### Ata medaber tsarfatit ? — vous parlez français ?

- ID: speak-english
- Hébreu: אַתָּה מְדַבֵּר צָרְפָתִית? — Transcription: [ata medaber tsarfatit] (Male addressee)
- Hébreu: אַתְּ מְדַבֶּרֶת צָרְפָתִית? — Transcription: [at medaberet tsarfatit] (Female addressee)
- Sens: Vous parlez français ?
- Usage: Demande à une personne si tu peux continuer en français.
- Accord de genre: Medaber / medaberet change selon la personne à qui l'on s'adresse.

## Dialogues

### Une salutation du matin

Deux personnes se rencontrent au début de la journée.

- Première personne: Bonjour. (phrase: hello/same)
- Deuxième personne: Bonjour (le matin). (phrase: good-morning/same)

### Une commande au café

Une cliente commande un café ; le serveur répond en le lui tendant.

- Cliente: Je voudrais un café, s'il vous plaît. (phrase: coffee-please/female)
- Serveur: Voilà. (phrase: please/same)


