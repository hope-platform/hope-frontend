/**
 * Hope — Resource Hub content.
 *
 * 8 Quick Guides covering the 5 MVP categories (Daily routines,
 * Communication, Sensory needs, Sleep, Self-care for parents). Each
 * guide is short, structured, and ends with peer-reviewed citations.
 *
 * Translation status:
 *   - en: source of truth
 *   - fr: human-translated for MVP launch (reviewed by Claude — review
 *         with a native speaker before launch)
 *   - dr: falls back to English. A "translation pending" banner is
 *         shown in the reader for Dari users.
 *
 * Categories must match `GuideCategory` below.
 */

export type GuideCategory =
  | "routine"
  | "comm"
  | "sensory"
  | "sleep"
  | "self";

export type GuideIcon =
  | "Sun"
  | "BookOpen"
  | "MessageCircle"
  | "Sparkles"
  | "Waves"
  | "Bed"
  | "Moon"
  | "Heart";

export type SupportedLocale = "en" | "fr" | "dr";

export interface GuideBody {
  /** First paragraph; orients the reader. */
  intro: string;
  /** 3–5 short bullets. */
  shortVersion: string[];
  /** 3–5 ordered, time-boxed actions. */
  thisWeek: string[];
  /** Optional reminder that Hope is a general guide, not personalised advice. */
  caveat?: string;
}

export interface Guide {
  /** Stable slug used in routing (/resources/[slug]). */
  slug: string;
  /** Translated title. */
  title: string;
  /** 1–2 sentence summary, shown on the card. */
  summary: string;
  body: GuideBody;
  category: GuideCategory;
  icon: GuideIcon;
  /** Estimated read time, in minutes. */
  readMinutes: number;
  /** Shown as a "New" tag on the card. */
  isNew?: boolean;
  /** Clinical sources, language-neutral (proper nouns). */
  sources: string[];
}

/**
 * Categories with their localised labels. Used by the picker tabs.
 */
export const CATEGORIES: Record<
  GuideCategory,
  { en: string; fr: string; dr: string }
> = {
  routine: { en: "Daily routines",  fr: "Routines",          dr: "روال‌های روزانه" },
  comm:    { en: "Communication",   fr: "Communication",     dr: "ارتباط" },
  sensory: { en: "Sensory needs",   fr: "Besoins sensoriels",dr: "نیازهای حسی" },
  sleep:   { en: "Sleep",           fr: "Sommeil",           dr: "خواب" },
  self:    { en: "For parents",     fr: "Pour les parents",  dr: "برای والدین" },
};

/* ────────────────────────────────────────────────────────── */
/*  English content (source of truth)                          */
/* ────────────────────────────────────────────────────────── */

const en: Guide[] = [
  {
    slug: "calming-morning-routine",
    title: "Building a calming morning routine",
    summary: "The five anchors that turn chaos into a sequence your child can rely on.",
    category: "routine",
    icon: "Sun",
    readMinutes: 4,
    isNew: true,
    body: {
      intro:
        "Mornings are loud, fast and full of decisions. For an autistic child, that's a lot of unpredictability stacked into 30 minutes. The simplest fix is also the most effective: a fixed sequence that becomes a kind of muscle memory for the whole family.",
      shortVersion: [
        "Predictability builds regulation — same sequence, same time, every day.",
        "One change at a time. Two changes is too many.",
        "When it fails, return to the last thing that worked. No guilt.",
      ],
      thisWeek: [
        "Pick the most stressful moment of your day.",
        "Write down the exact sequence you currently follow.",
        "Remove or simplify one step. Just one.",
        "Repeat the new sequence for 7 days before changing anything else.",
      ],
      caveat: "This is a general guide. Your child's specialist knows them better — adapt what fits.",
    },
    sources: [
      "NICE CG170 · Autism in under 19s",
      "HAS · Recommandations 2018",
      "Peer-reviewed: Lai et al., 2014",
    ],
  },
  {
    slug: "visual-schedules-that-work",
    title: "Visual schedules that actually work",
    summary: "Why most visual schedules fail in the first week — and how to fix yours.",
    category: "routine",
    icon: "BookOpen",
    readMinutes: 5,
    body: {
      intro:
        "Visual schedules look beautiful on Pinterest and stop working by Thursday. The reason is almost always the same: too many steps, too many words, not enough rehearsal.",
      shortVersion: [
        "Start with 3 pictures. Three. Not eight.",
        "Use real photos of your home and your child where possible.",
        "Move or remove a card as each step is done — visible progress matters.",
      ],
      thisWeek: [
        "Take 3 photos: morning, lunch, bedtime.",
        "Print or display them where the routine actually happens.",
        "Walk through them once together, in advance, when there's no pressure.",
        "Live with this set for one week before adding anything.",
      ],
    },
    sources: [
      "Autism France · Outils visuels",
      "Peer-reviewed: Knight et al., 2015",
      "NICE NG142",
    ],
  },
  {
    slug: "alternative-ways-to-connect",
    title: "When words are hard: alternative ways to connect",
    summary: "Pictures, gestures, and AAC tools you can start using this week.",
    category: "comm",
    icon: "MessageCircle",
    readMinutes: 6,
    body: {
      intro:
        "Speech is one mode of communication, not the only one. Autistic children often communicate richly through gesture, gaze, drawing, written words, and assistive technology — sometimes long before fluent speech emerges, sometimes alongside it forever.",
      shortVersion: [
        "Honour every attempt to communicate, in any modality.",
        "Pair words with pictures or gestures consistently.",
        "AAC (Augmentative & Alternative Communication) doesn't delay speech — research shows it often helps.",
      ],
      thisWeek: [
        "Notice 3 ways your child already communicates without words.",
        "Pair one daily word ('water', 'more', 'finished') with a clear gesture or picture.",
        "If you suspect AAC could help, ask your SLP about a low-tech trial first.",
      ],
      caveat: "Speech-language pathologists can recommend tools specific to your child's profile.",
    },
    sources: [
      "ASHA · AAC clinical guidance",
      "Peer-reviewed: Romski et al., 2015",
      "Autism France · CAA",
    ],
  },
  {
    slug: "sensory-diets-everyday",
    title: "Sensory diets for everyday life",
    summary: "A simple framework parents can use without an occupational therapist in the room.",
    category: "sensory",
    icon: "Sparkles",
    readMinutes: 8,
    body: {
      intro:
        "A 'sensory diet' is just a planned schedule of sensory input across the day — proprioception, vestibular, tactile, auditory — that helps a child stay regulated. The phrase is fancy. The idea is simple.",
      shortVersion: [
        "Most regulating activities involve pressure or weight (carrying, climbing, pushing).",
        "Front-load the day with regulating input — don't wait for dysregulation.",
        "Track what helped each day, even briefly. Patterns appear within 2 weeks.",
      ],
      thisWeek: [
        "Add 5 minutes of jumping / climbing / carrying before each transition.",
        "Identify one sensory tool your child reaches for naturally.",
        "Make that tool easy to access in the moments it's most needed.",
        "Log what you tried each evening for a week.",
      ],
    },
    sources: [
      "Peer-reviewed: Schaaf et al., 2014",
      "Autism Speaks · Sensory toolkit",
      "NICE NG142",
    ],
  },
  {
    slug: "sensory-tools-explained",
    title: "Noise-cancelling, weighted, deep pressure: what helps and when",
    summary: "A plain-language guide to sensory tools, with sources you can trust.",
    category: "sensory",
    icon: "Waves",
    readMinutes: 5,
    body: {
      intro:
        "Sensory tools are everywhere — and confusing. This guide cuts through the noise: what each tool actually does, when to try it, and what the research says.",
      shortVersion: [
        "Noise-cancelling headphones: best for shutdowns and overstimulating public spaces.",
        "Weighted blankets / vests: best for transitions and bedtime — not all day.",
        "Chewable jewellery: cheap, low-stigma, helps with oral-motor regulation.",
      ],
      thisWeek: [
        "Pick ONE tool to trial. Don't buy three at once.",
        "Trial it in two contrasting situations — calm and harder.",
        "Decide in 7 days whether to keep, swap, or shelve.",
      ],
      caveat: "Weighted products should be ~10% of body weight maximum, and never used during sleep without OT guidance.",
    },
    sources: [
      "Peer-reviewed: Gee et al., 2016 (weighted vests)",
      "AOTA · Sensory integration practice",
      "NICE NG142",
    ],
  },
  {
    slug: "bedtime-routines",
    title: "Bedtime routines for autistic children",
    summary: "Why predictability matters more than darkness or sound machines.",
    category: "sleep",
    icon: "Bed",
    readMinutes: 7,
    body: {
      intro:
        "Sleep is a routine before it is a moment. Most bedtime advice for autistic children works only when the run-up is consistent — same order, same lighting, same words.",
      shortVersion: [
        "The 45 minutes BEFORE bed matter more than the bed itself.",
        "Same order every night beats fancy gadgets.",
        "Many autistic children need more sensory cool-down, not less.",
      ],
      thisWeek: [
        "Write down your current bedtime sequence end-to-end.",
        "Identify the one step that varies most. Lock it.",
        "Dim all lights 45 minutes before sleep time, every night.",
        "Stick with this for a week before assessing.",
      ],
    },
    sources: [
      "NICE NG142 · Sleep",
      "HAS · Sommeil chez l'enfant",
      "Peer-reviewed: Cortesi et al., 2010",
    ],
  },
  {
    slug: "night-waking-next-steps",
    title: "Night-waking: gentle next steps",
    summary: "What to try first, what to avoid, and when to ask for help.",
    category: "sleep",
    icon: "Moon",
    readMinutes: 4,
    body: {
      intro:
        "Most autistic children wake at night sometimes; many do nightly. Before you change anything big, check the small things — temperature, hunger, sensory comfort.",
      shortVersion: [
        "Check the basics first: warm, fed, dry, comfortable.",
        "Stay calm and dull — boring company helps return to sleep.",
        "Persistent waking past 4 weeks deserves a sleep assessment.",
      ],
      thisWeek: [
        "Track wakings for 3 nights — time, duration, what helped.",
        "Adjust temperature or bedding if a pattern shows.",
        "Limit screen exposure during the waking response.",
      ],
    },
    sources: [
      "NICE NG142 · Sleep",
      "Peer-reviewed: Cortesi et al., 2010",
      "AAP · Sleep guidance",
    ],
  },
  {
    slug: "your-nervous-system",
    title: "Your nervous system matters too",
    summary: "How to refill your own reserves on the hardest days.",
    category: "self",
    icon: "Heart",
    readMinutes: 3,
    body: {
      intro:
        "Co-regulation works in both directions. A regulated parent helps an unsettled child come back to baseline. An exhausted parent can't, and that's not a moral failing — it's biology.",
      shortVersion: [
        "Three slow breaths is a complete intervention.",
        "Five minutes alone, on purpose, every day, is not a luxury.",
        "You don't have to feel okay to be okay enough.",
      ],
      thisWeek: [
        "Identify one 5-minute window where you can be alone.",
        "Protect it. Repeat tomorrow.",
        "Ask one person for one specific thing this week.",
      ],
      caveat: "If you feel constantly overwhelmed, please talk to your GP or a therapist — you deserve support too.",
    },
    sources: [
      "Autism France · Parents au quotidien",
      "Peer-reviewed: Bonis, 2016 (parental stress)",
      "NICE CG170",
    ],
  },
];

/* ────────────────────────────────────────────────────────── */
/*  French content (reviewed by Claude — re-read with a       */
/*  native speaker before launch)                              */
/* ────────────────────────────────────────────────────────── */

const fr: Guide[] = [
  {
    slug: "calming-morning-routine",
    title: "Construire une routine matinale apaisante",
    summary: "Les cinq ancres qui transforment le chaos en une séquence sur laquelle votre enfant peut compter.",
    category: "routine",
    icon: "Sun",
    readMinutes: 4,
    isNew: true,
    body: {
      intro:
        "Les matins sont bruyants, rapides et pleins de décisions. Pour un enfant autiste, c'est beaucoup d'imprévisibilité concentrée en 30 minutes. La solution la plus simple est aussi la plus efficace : une séquence fixe qui devient une sorte de mémoire musculaire pour toute la famille.",
      shortVersion: [
        "La prévisibilité construit la régulation — même séquence, même heure, chaque jour.",
        "Un changement à la fois. Deux, c'est déjà trop.",
        "Quand ça ne marche plus, revenez à ce qui marchait. Sans culpabilité.",
      ],
      thisWeek: [
        "Identifiez le moment le plus stressant de votre journée.",
        "Écrivez la séquence exacte que vous suivez actuellement.",
        "Retirez ou simplifiez une étape. Une seule.",
        "Répétez la nouvelle séquence pendant 7 jours avant de changer autre chose.",
      ],
      caveat: "Ceci est un guide général. Le spécialiste de votre enfant le connaît mieux — adaptez ce qui convient.",
    },
    sources: [
      "NICE CG170 · Autisme chez les moins de 19 ans",
      "HAS · Recommandations 2018",
      "Étude évaluée par les pairs : Lai et al., 2014",
    ],
  },
  {
    slug: "visual-schedules-that-work",
    title: "Des emplois du temps visuels qui fonctionnent vraiment",
    summary: "Pourquoi la plupart des emplois du temps visuels échouent dès la première semaine — et comment corriger le vôtre.",
    category: "routine",
    icon: "BookOpen",
    readMinutes: 5,
    body: {
      intro:
        "Les emplois du temps visuels sont beaux sur Pinterest et arrêtent de fonctionner dès le jeudi. La raison est presque toujours la même : trop d'étapes, trop de mots, pas assez de répétition.",
      shortVersion: [
        "Commencez avec 3 images. Trois. Pas huit.",
        "Utilisez de vraies photos de votre maison et de votre enfant si possible.",
        "Déplacez ou retirez une carte à chaque étape — voir la progression compte.",
      ],
      thisWeek: [
        "Prenez 3 photos : matin, déjeuner, coucher.",
        "Affichez-les là où la routine se passe réellement.",
        "Parcourez-les ensemble une fois, à l'avance, sans pression.",
        "Vivez avec ce set pendant une semaine avant d'ajouter quoi que ce soit.",
      ],
    },
    sources: [
      "Autism France · Outils visuels",
      "Étude évaluée par les pairs : Knight et al., 2015",
      "NICE NG142",
    ],
  },
  {
    slug: "alternative-ways-to-connect",
    title: "Quand les mots sont difficiles : d'autres façons de se connecter",
    summary: "Images, gestes et outils CAA que vous pouvez commencer à utiliser cette semaine.",
    category: "comm",
    icon: "MessageCircle",
    readMinutes: 6,
    body: {
      intro:
        "La parole est un mode de communication parmi d'autres. Les enfants autistes communiquent souvent richement par le geste, le regard, le dessin, les mots écrits et la technologie d'aide — parfois bien avant l'émergence d'une parole fluide, parfois en parallèle pour toujours.",
      shortVersion: [
        "Honorez chaque tentative de communication, dans quelque modalité que ce soit.",
        "Associez les mots à des images ou des gestes de façon cohérente.",
        "La CAA ne retarde pas la parole — la recherche montre qu'elle aide souvent.",
      ],
      thisWeek: [
        "Remarquez 3 façons dont votre enfant communique déjà sans mots.",
        "Associez un mot quotidien (« eau », « encore », « fini ») à un geste ou une image claire.",
        "Si vous pensez que la CAA pourrait aider, demandez à votre orthophoniste un essai basse technologie d'abord.",
      ],
      caveat: "Les orthophonistes peuvent recommander des outils adaptés au profil de votre enfant.",
    },
    sources: [
      "ASHA · Recommandations CAA",
      "Étude évaluée par les pairs : Romski et al., 2015",
      "Autism France · CAA",
    ],
  },
  {
    slug: "sensory-diets-everyday",
    title: "Diètes sensorielles au quotidien",
    summary: "Un cadre simple que les parents peuvent utiliser sans ergothérapeute sur place.",
    category: "sensory",
    icon: "Sparkles",
    readMinutes: 8,
    body: {
      intro:
        "Une « diète sensorielle » est simplement un programme planifié d'entrées sensorielles dans la journée — proprioception, vestibulaire, tactile, auditif — qui aide l'enfant à rester régulé. Le mot est compliqué. L'idée est simple.",
      shortVersion: [
        "La plupart des activités régulatrices impliquent pression ou poids (porter, grimper, pousser).",
        "Chargez la journée en amont — n'attendez pas la dysrégulation.",
        "Notez ce qui a aidé chaque jour, même brièvement. Des schémas apparaissent en 2 semaines.",
      ],
      thisWeek: [
        "Ajoutez 5 minutes de sauts / escalade / port avant chaque transition.",
        "Identifiez un outil sensoriel vers lequel votre enfant se tourne naturellement.",
        "Rendez cet outil facile d'accès aux moments où il est le plus utile.",
        "Notez ce que vous avez essayé chaque soir pendant une semaine.",
      ],
    },
    sources: [
      "Étude évaluée par les pairs : Schaaf et al., 2014",
      "Autism Speaks · Boîte à outils sensorielle",
      "NICE NG142",
    ],
  },
  {
    slug: "sensory-tools-explained",
    title: "Anti-bruit, lestés, pression profonde : ce qui aide et quand",
    summary: "Un guide en langage clair sur les outils sensoriels, avec des sources fiables.",
    category: "sensory",
    icon: "Waves",
    readMinutes: 5,
    body: {
      intro:
        "Les outils sensoriels sont partout — et déroutants. Ce guide démêle l'essentiel : ce que fait chaque outil, quand l'essayer et ce que dit la recherche.",
      shortVersion: [
        "Casque anti-bruit : utile pour les shutdowns et les espaces publics surchargés.",
        "Couvertures / gilets lestés : utiles pour les transitions et le coucher — pas toute la journée.",
        "Bijoux à mâcher : bon marché, peu stigmatisants, aident à la régulation oro-motrice.",
      ],
      thisWeek: [
        "Choisissez UN outil à tester. N'en achetez pas trois d'un coup.",
        "Testez-le dans deux situations contrastées — calme et plus difficile.",
        "Décidez en 7 jours si vous gardez, échangez ou rangez.",
      ],
      caveat: "Les produits lestés devraient représenter ~10 % du poids corporel maximum, et ne jamais être utilisés pendant le sommeil sans conseil d'un ergothérapeute.",
    },
    sources: [
      "Étude évaluée par les pairs : Gee et al., 2016 (gilets lestés)",
      "AOTA · Intégration sensorielle",
      "NICE NG142",
    ],
  },
  {
    slug: "bedtime-routines",
    title: "Routines de coucher pour les enfants autistes",
    summary: "Pourquoi la prévisibilité compte plus que l'obscurité ou les machines à bruit blanc.",
    category: "sleep",
    icon: "Bed",
    readMinutes: 7,
    body: {
      intro:
        "Le sommeil est une routine avant d'être un moment. La plupart des conseils sur le coucher pour les enfants autistes ne fonctionnent que si la préparation est cohérente — même ordre, même lumière, mêmes mots.",
      shortVersion: [
        "Les 45 minutes AVANT le coucher comptent plus que le lit lui-même.",
        "Même ordre chaque soir bat tous les gadgets.",
        "Beaucoup d'enfants autistes ont besoin de plus d'apaisement sensoriel, pas moins.",
      ],
      thisWeek: [
        "Écrivez votre séquence de coucher actuelle, de bout en bout.",
        "Identifiez l'étape qui varie le plus. Verrouillez-la.",
        "Tamisez toutes les lumières 45 minutes avant le coucher, chaque soir.",
        "Maintenez cela une semaine avant d'évaluer.",
      ],
    },
    sources: [
      "NICE NG142 · Sommeil",
      "HAS · Sommeil chez l'enfant",
      "Étude évaluée par les pairs : Cortesi et al., 2010",
    ],
  },
  {
    slug: "night-waking-next-steps",
    title: "Réveils nocturnes : prochaines étapes en douceur",
    summary: "Ce qu'il faut essayer en premier, ce qu'il faut éviter, et quand demander de l'aide.",
    category: "sleep",
    icon: "Moon",
    readMinutes: 4,
    body: {
      intro:
        "La plupart des enfants autistes se réveillent parfois la nuit ; beaucoup chaque nuit. Avant de changer quelque chose de gros, vérifiez les petites choses — température, faim, confort sensoriel.",
      shortVersion: [
        "Vérifiez d'abord les bases : chaud, nourri, sec, à l'aise.",
        "Restez calme et terne — une compagnie ennuyeuse aide à retrouver le sommeil.",
        "Un réveil persistant au-delà de 4 semaines mérite un bilan du sommeil.",
      ],
      thisWeek: [
        "Notez les réveils pendant 3 nuits — heure, durée, ce qui a aidé.",
        "Ajustez la température ou la literie si un schéma apparaît.",
        "Limitez l'exposition aux écrans pendant la réponse au réveil.",
      ],
    },
    sources: [
      "NICE NG142 · Sommeil",
      "Étude évaluée par les pairs : Cortesi et al., 2010",
      "AAP · Recommandations sommeil",
    ],
  },
  {
    slug: "your-nervous-system",
    title: "Votre système nerveux compte aussi",
    summary: "Comment refaire le plein de vos propres réserves les jours les plus difficiles.",
    category: "self",
    icon: "Heart",
    readMinutes: 3,
    body: {
      intro:
        "La co-régulation fonctionne dans les deux sens. Un parent régulé aide un enfant agité à revenir au calme. Un parent épuisé ne peut pas, et ce n'est pas un échec moral — c'est de la biologie.",
      shortVersion: [
        "Trois respirations lentes sont une intervention complète.",
        "Cinq minutes seul, à dessein, chaque jour, ne sont pas un luxe.",
        "Vous n'avez pas besoin d'aller bien pour aller assez bien.",
      ],
      thisWeek: [
        "Identifiez une fenêtre de 5 minutes où vous pouvez être seul.",
        "Protégez-la. Recommencez demain.",
        "Demandez à une personne quelque chose de précis cette semaine.",
      ],
      caveat: "Si vous vous sentez constamment dépassé, parlez-en à votre médecin ou à un thérapeute — vous méritez du soutien aussi.",
    },
    sources: [
      "Autism France · Parents au quotidien",
      "Étude évaluée par les pairs : Bonis, 2016 (stress parental)",
      "NICE CG170",
    ],
  },
];

/* ────────────────────────────────────────────────────────── */
/*  Dari falls back to English. The reader shows a banner.    */
/*  TODO: native-speaker translation by Muzhgan / community.  */
/* ────────────────────────────────────────────────────────── */
const dr: Guide[] = en;

const ALL_GUIDES: Record<SupportedLocale, Guide[]> = { en, fr, dr };

export function getGuides(locale: string): Guide[] {
  const safe = (locale in ALL_GUIDES ? locale : "en") as SupportedLocale;
  return ALL_GUIDES[safe];
}

export function getGuide(locale: string, slug: string): Guide | null {
  return getGuides(locale).find((g) => g.slug === slug) ?? null;
}
