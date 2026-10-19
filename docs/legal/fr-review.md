# FR legal pages — for owner/lawyer review

Full text of the two new FR legal pages, as published. Each is a
translation of the matching EN page (same dates, same obligations, no
additions/removals), formal "vous" register (an exception to the
site-wide "tu" rule, scoped to legal pages only).

- FR: `/fr/conditions/` — source: `src/pages/fr/conditions/index.astro`
- EN counterpart: `/terms/` — source: `src/pages/terms.astro`
- FR: `/fr/confidentialite/` — source: `src/pages/fr/confidentialite/index.astro`
- EN counterpart: `/website-privacy/` — source: `src/pages/website-privacy.astro`

Both FR pages open with: "Cette traduction est fournie à titre
informatif. En cas de divergence, la version anglaise fait foi." linking
to the EN page.

## Discrepancy found between EN text and the actual analytics code

None. Checked `src/lib/analytics-consent.ts` and
`src/components/AnalyticsHead.astro` against the EN
`/website-privacy/` text: region-gated Consent Mode v2 defaults,
banner shown only in the EEA/UK/CH (via a timezone heuristic), ads
storage/personalization/user-data always denied, Google signals and ad
personalization off, no trackers besides GA4. The EN page already
matches the code, so the FR translation below matches both.

---

## /fr/conditions/ (Conditions d'utilisation)

Cette traduction est fournie à titre informatif. En cas de divergence,
la version anglaise fait foi.

### 1. Acceptation des conditions

En téléchargeant, installant ou utilisant Learn Hebrew – Read & Speak
(« l'Application »), vous acceptez d'être lié par les présentes
Conditions d'utilisation. Si vous n'acceptez pas ces conditions,
veuillez ne pas utiliser l'Application. Ces Conditions s'appliquent à
tous les utilisateurs de l'Application, y compris aux utilisateurs des
versions gratuite et Premium.

### 2. Description du service

Learn Hebrew – Read & Speak (également appelée HebrewEdu ou AlefBet
Tutor) est une application mobile éducative développée par VIKTOR
SOKOLIUK et distribuée via Google Play et l'Apple App Store.
L'Application propose un contenu structuré d'apprentissage de l'hébreu,
comprenant des leçons sur l'alphabet, des exercices de vocabulaire, des
exercices de lecture et un accompagnement audio à la prononciation.
Certaines fonctionnalités sont gratuites ; d'autres nécessitent un
abonnement Premium.

### 3. Abonnement Premium

L'Application peut proposer un accès Premium via des abonnements à
renouvellement automatique qui débloquent du contenu et des
fonctionnalités supplémentaires au-delà du niveau gratuit. Les offres
et les prix disponibles peuvent varier selon la plateforme, le pays, la
devise, les promotions, les offres d'introduction et la configuration
du magasin d'applications. L'écran d'achat applicable détermine les
offres et les prix qui vous sont proposés.

- **Facturation :** sur iOS, le paiement est prélevé via l'Apple App
  Store à l'aide de votre compte Apple. Sur Android, le paiement est
  prélevé via le compte Google Play applicable. Le magasin concerné
  traite la transaction.
- **Renouvellement automatique :** les abonnements se renouvellent
  automatiquement à la fin de chaque période de facturation, sauf
  annulation conforme aux règles du magasin applicable avant la date de
  renouvellement.
- **Annulation :** vous gérez ou annulez un abonnement depuis le compte
  du magasin auquel il a été souscrit — par exemple, les réglages
  d'abonnement du compte Apple sur iOS, ou Google Play → Abonnements
  sur Android. L'annulation prend généralement effet à la fin de la
  période de facturation en cours, sous réserve des règles du magasin
  applicable.
- **Essais gratuits et offres d'introduction :** une offre éligible
  peut inclure un essai gratuit ou une autre offre d'introduction.
  L'éligibilité et la durée sont indiquées par le magasin et l'écran
  d'achat applicables. Sauf annulation conforme aux règles du magasin
  applicable, un essai éligible se transforme, à la fin de la période
  d'essai, en l'abonnement payant affiché.
- **Restauration des achats :** l'Application propose une fonction de
  restauration des achats pour les achats éligibles, lorsque le magasin
  applicable la prend en charge. La restauration est soumise aux règles
  de compte, de transaction et de plateforme du magasin.
- **Remboursements :** les achats effectués via les magasins sont
  traités par Apple ou Google Play. Les demandes de remboursement sont
  traitées selon les politiques et procédures du magasin applicable.
  Nous ne traitons pas directement les remboursements des achats
  effectués via l'Apple App Store ou Google Play.
- **Modifications de prix :** les prix des abonnements et les offres
  disponibles peuvent évoluer. Toute notification ou procédure de
  consentement applicable est gérée selon les règles du magasin
  applicable.

### 4. Gratuit vs Premium

La version gratuite de l'Application donne accès à des leçons
d'introduction et à une sélection limitée de contenu, avec des limites
quotidiennes sur certaines activités et des publicités récompensées
optionnelles. Les abonnés Premium bénéficient d'un accès complet à
toutes les leçons, histoires de lecture, listes de vocabulaire et à
tout contenu futur ajouté à l'Application, sans limites quotidiennes et
sans publicité. Les fonctionnalités disponibles dans chaque niveau sont
susceptibles d'évoluer.

### 5. Publicités récompensées et récompenses intégrées

La version gratuite de l'Application vous permet de regarder des
publicités récompensées pour recevoir des récompenses intégrées, telles
que des tentatives quotidiennes supplémentaires, des essais de quiz
supplémentaires ou des pièces dans l'application.

- **Optionnel :** regarder des publicités est toujours facultatif.
- **Récompenses :** une récompense n'est accordée qu'une fois la
  publicité visionnée en entier. Dans certains cas, par exemple
  lorsqu'une publicité ne peut pas être chargée, une récompense peut
  néanmoins être accordée à notre discrétion.
- **Limites et disponibilité :** des limites quotidiennes s'appliquent
  aux récompenses, et la disponibilité des publicités n'est pas
  garantie.
- **Éléments virtuels :** les pièces et autres récompenses sont
  virtuelles, n'ont aucune valeur monétaire et ne peuvent être
  achetées, vendues, échangées, transférées ou converties en argent ou
  en toute autre chose. Elles peuvent être modifiées ou réinitialisées,
  y compris quotidiennement.
- **Premium :** aucune publicité n'est affichée aux abonnés Premium.

### 6. Explications de mots

Lorsqu'elles sont disponibles, les explications de mots sont générées
automatiquement à l'aide de l'intelligence artificielle (OpenAI). Elles
peuvent contenir des erreurs et sont fournies à des fins d'apprentissage
uniquement, sans garantie d'exactitude ou d'exhaustivité.

### 7. Conduite de l'utilisateur

En utilisant l'Application, vous vous engagez à ne pas :

- Désassembler, décompiler ou effectuer une ingénierie inverse sur
  toute partie de l'Application
- Copier, reproduire ou distribuer le contenu de l'Application sans
  autorisation écrite préalable
- Utiliser l'Application à des fins illégales ou non autorisées
- Tenter de contourner une restriction de contenu ou le paiement d'un
  abonnement
- Manipuler, automatiser ou contourner les récompenses publicitaires ou
  les limites quotidiennes
- Porter atteinte à la sécurité ou au bon fonctionnement de
  l'Application

### 8. Propriété intellectuelle

Tout le contenu de l'Application — y compris, sans s'y limiter, les
textes de leçons, les enregistrements audio, les illustrations et le
design de l'interface — appartient à VIKTOR SOKOLIUK ou lui est concédé
sous licence. Il vous est accordé une licence limitée, non exclusive et
non transférable pour utiliser l'Application à des fins personnelles et
éducatives, non commerciales. Aucun contenu ne peut être reproduit ou
distribué sans autorisation écrite expresse.

### 9. Exclusion de garanties

L'Application est fournie « en l'état » et « selon disponibilité »,
sans garantie d'aucune sorte, expresse ou implicite. Nous ne
garantissons pas que l'Application sera exempte d'erreurs,
ininterrompue, ou qu'elle répondra à vos objectifs d'apprentissage
spécifiques. Les résultats de l'apprentissage d'une langue dépendent de
l'effort et de la pratique individuels.

### 10. Limitation de responsabilité

Dans toute la mesure permise par la loi applicable, VIKTOR SOKOLIUK ne
pourra être tenu responsable de tout dommage indirect, accessoire,
spécial, consécutif ou punitif résultant de votre utilisation ou de
votre incapacité à utiliser l'Application, même si nous avons été
informés de la possibilité de tels dommages.

### 11. Résiliation

Nous nous réservons le droit de suspendre ou de résilier votre accès à
l'Application à notre discrétion, sans préavis, si nous estimons que
vous avez violé les présentes Conditions. En cas de résiliation, votre
droit d'utiliser l'Application cesse immédiatement. Les dispositions
qui, par leur nature, doivent survivre à la résiliation resteront en
vigueur.

### 12. Apple App Store

Si vous avez téléchargé l'Application depuis l'Apple App Store, le
contrat de licence d'utilisateur final standard (Standard EULA)
d'Apple (https://www.apple.com/legal/internet-services/itunes/dev/stdeula/)
s'applique en plus des présentes Conditions. Apple n'est pas
responsable de l'Application ni de son contenu et n'a aucune obligation
de maintenance ou d'assistance à son égard. Apple et ses filiales sont
des bénéficiaires tiers des présentes Conditions et peuvent les faire
appliquer à votre égard.

### 13. Modifications des présentes conditions

Nous pouvons mettre à jour ces Conditions d'utilisation de temps à
autre. Lorsque nous apportons des modifications significatives, nous en
informerons les utilisateurs par une notification dans l'application ou
en mettant à jour cette page. La poursuite de l'utilisation de
l'Application après la publication des modifications constitue votre
acceptation des Conditions révisées.

### 14. Contact

Pour toute question concernant ces Conditions d'utilisation, veuillez
nous contacter :

- **Développeur :** VIKTOR SOKOLIUK
- **E-mail :** vicsothemes@gmail.com

Last updated (same date as EN `/terms/`): 2026-09-25.

---

## /fr/confidentialite/ (Politique de confidentialité du site)

Cette traduction est fournie à titre informatif. En cas de divergence,
la version anglaise fait foi.

### Champ d'application

Cette page couvre uniquement le site HebrewEdu à l'adresse
hebrewedu.com. Pour les applications mobiles HebrewEdu, consultez la
Politique de confidentialité de l'application (en anglais, `/privacy/`).

### Google Analytics

Le site utilise Google Analytics 4 (GA4), fourni par Google, pour
comprendre la manière dont le site est utilisé — par exemple, quelles
pages sont consultées et quels liens vers l'application sont suivis.

Si vous vous trouvez dans l'Espace économique européen (EEE), au
Royaume-Uni ou en Suisse, Google Analytics ne fonctionne qu'après que
vous l'ayez accepté dans la bannière de consentement affichée lors de
votre première visite. Si vous refusez, il n'est jamais chargé et aucun
cookie analytique n'est déposé. Hors de ces régions, Google Analytics
fonctionne par défaut, conformément à la loi applicable, et vous pouvez
à tout moment modifier votre choix (voir « Votre choix » ci-dessous).

Lorsqu'il est actif, Google Analytics peut traiter des données
techniques et d'usage telles que les pages consultées, des informations
sur le navigateur et l'appareil, la localisation approximative déduite
de votre adresse IP, et vos interactions avec le site (par exemple les
clics sur les liens vers les pages de l'application dans les magasins,
ou l'activité de leçon/pratique). Il peut déposer des cookies ou des
identifiants similaires dans votre navigateur.

Les fonctionnalités publicitaires sont désactivées : le site n'active
ni les signaux Google ni la personnalisation publicitaire, et les
signaux de consentement liés à la publicité (`ad_storage`,
`ad_user_data`, `ad_personalization`) sont toujours refusés. Nous
n'envoyons volontairement ni votre nom, ni votre adresse e-mail, ni
aucun texte que vous saisissez à Google Analytics.

### Votre choix

Vous pouvez modifier votre choix en matière d'analytique à tout moment
grâce au lien « Choix de confidentialité » en bas de chaque page — il
rouvre la bannière de consentement, où que vous soyez. Votre choix est
stocké dans le stockage local de votre navigateur, sur votre appareil,
et non sur nos serveurs. Si vous retirez votre consentement,
l'analytique s'arrête et nous tentons de supprimer les cookies de
Google Analytics (`_ga`, `_ga_*`) ; vous pouvez également les supprimer
vous-même dans les réglages de votre navigateur.

### Conservation

Les données Google Analytics sont conservées dans notre propriété GA4
pendant 14 mois au maximum, après quoi elles sont automatiquement
supprimées, selon les paramètres de conservation standard de GA4 fixés
par Google.

### Traitement par Google

Google traite les données selon ses propres règles : politique de
confidentialité de Google (https://policies.google.com/privacy) et
comment Google utilise les informations provenant de sites ou
d'applications qui utilisent ses services
(https://policies.google.com/technologies/partner-sites).

### Contact

Questions concernant cette page : vicsothemes@gmail.com

Last updated (same date as EN `/website-privacy/`): 2026-10-15.
