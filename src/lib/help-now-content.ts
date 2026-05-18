/**
 * Hope — Help Now strategy content.
 *
 * Each trigger has a calm, evidence-informed flow that a parent reads during
 * a hard moment: a title, 3–5 steps (each with a heading and supporting
 * sentence), a closing note, and clinical sources. Content is sourced from
 * the Web App MVP prototype.
 *
 * Translation status:
 *   - en: source of truth (from prototype)
 *   - fr: human-translated for MVP launch
 *   - dr: falls back to English on the page, paired with a "translation
 *         pending" banner. Real Dari translation is a Day-6+ task — flagged
 *         for Muzhgan / a native speaker.
 */

export type TriggerId =
  | "meltdown"
  | "sensory"
  | "transition"
  | "school"
  | "bedtime"
  | "other";

export type SupportedLocale = "en" | "fr" | "dr";

export interface StrategyStep {
  /** Short imperative heading (e.g. "Breathe first") */
  title: string;
  /** One- or two-sentence supportive description */
  description: string;
}

export interface Strategy {
  /** Calm, italic-display heading shown at the top of the screen */
  title: string;
  /** The actual step-by-step calm guidance — 3 to 5 entries */
  steps: StrategyStep[];
  /** A closing note placed below the steps (safety reminder, when-to-call, etc.) */
  note: string;
  /** Clinical sources for transparency */
  sources: string[];
}

const en: Record<TriggerId, Strategy> = {
  meltdown: {
    title: "A meltdown is happening",
    steps: [
      {
        title: "Breathe first",
        description:
          "Take one slow, deliberate breath. In for 4, out for 6. Your calm is the most useful thing in the room right now.",
      },
      {
        title: "Reduce input",
        description:
          "Lower the lights, mute screens and music. Move other family members to a quieter space if you can.",
      },
      {
        title: "Stay close, low and quiet",
        description:
          'Sit on the floor at their level. Say very little — short phrases only. "You\'re safe. I\'m here. We have time."',
      },
      {
        title: "Offer one regulation tool",
        description:
          "A weighted blanket, deep pressure, a familiar object, or noise-cancelling headphones. Offer — do not impose.",
      },
      {
        title: "Wait, then reconnect",
        description:
          "A meltdown ends when it ends. Once they soften, offer water and quiet company. Talking can come later, or not at all.",
      },
    ],
    note: "If this gets worse, or if you feel unsafe, contact your specialist or emergency services.",
    sources: [
      "NICE CG170 · Autism in under 19s",
      "Autism France · Crise sensorielle",
      "HAS · Recommandations 2018",
    ],
  },

  sensory: {
    title: "Sensory overload",
    steps: [
      {
        title: "Find the quieter spot",
        description:
          "Even one room can help. Dim, low-noise, minimal screens. A blanket fort or under-the-table counts.",
      },
      {
        title: "Remove tight clothing",
        description:
          "Tags, waistbands and shoes can amplify overload. Loosen or remove what you can.",
      },
      {
        title: "Offer deep pressure",
        description:
          "A firm hug, a weighted lap pad, or rolling them gently in a blanket can help regulate the nervous system.",
      },
      {
        title: "Slow your own movements",
        description:
          "Children mirror our pace. Move slowly. Speak slowly. Stop trying to fix it.",
      },
    ],
    note: "Sensory overload usually settles within 20–45 minutes. If it continues for hours, call your specialist.",
    sources: [
      "NICE NG142",
      "Autism Speaks · Sensory toolkit",
      "Peer-reviewed: Schaaf et al., 2014",
    ],
  },

  transition: {
    title: "Transition help",
    steps: [
      {
        title: "Name what is changing",
        description:
          '"In two minutes, we are leaving the park." Speak in concrete, short sentences — no abstractions.',
      },
      {
        title: "Use a timer or visual",
        description:
          "A sand timer, a song that ends, or a picture schedule gives the change a beginning and an end.",
      },
      {
        title: "Connect change to comfort",
        description:
          '"After the park, we go home for snack." Always link the leaving to something familiar and safe.',
      },
      {
        title: "Allow a transitional object",
        description:
          "A leaf, a stone, a favourite toy. Carrying something from the old place into the new place can ease the cross-over.",
      },
    ],
    note: "Repeat the same transition language daily — predictability builds trust over weeks.",
    sources: [
      "HAS · Recommandations 2018",
      "Autism France · Transitions du quotidien",
      "NICE CG170",
    ],
  },

  school: {
    title: "School morning",
    steps: [
      {
        title: "Start the night before",
        description:
          "Lay out clothes, pack the bag, prepare lunch. Mornings get easier when fewer decisions live in them.",
      },
      {
        title: "Use the same sequence every day",
        description:
          "Toilet · breakfast · clothes · teeth · shoes · door. Repetition is regulation.",
      },
      {
        title: "Offer one choice, not two",
        description:
          '"Do you want the red socks or the blue socks?" Avoid open-ended questions before 9am.',
      },
      {
        title: "Build in a 5-minute buffer",
        description:
          "Plan to leave 5 minutes earlier than needed. The buffer absorbs surprises.",
      },
    ],
    note: "If mornings stay hard for more than 2 weeks despite a routine, talk to the school aide or your specialist.",
    sources: [
      "NICE NG142",
      "Autism France · Le matin à l'école",
      "HAS · Scolarisation",
    ],
  },

  bedtime: {
    title: "Bedtime",
    steps: [
      {
        title: "Dim everything 45 min before",
        description:
          "Screens off, warm low lights only. Lowering visual stimulation prepares the body for sleep.",
      },
      {
        title: "Same order, every night",
        description:
          "Bath · pyjamas · teeth · story · lights out. Sleep is a routine, not a moment.",
      },
      {
        title: "Sensory cool-down",
        description:
          "A weighted blanket, white noise, or a quiet body scan helps the nervous system slow.",
      },
      {
        title: "Stay nearby briefly",
        description:
          "A few minutes of quiet company often lets a child slip into sleep on their own.",
      },
    ],
    note: "If sleep difficulties persist beyond 4 weeks, request a sleep assessment from your pediatrician.",
    sources: [
      "NICE NG142 · Sleep",
      "HAS · Sommeil chez l'enfant",
      "Peer-reviewed: Cortesi et al., 2010",
    ],
  },

  other: {
    title: "A general grounding",
    steps: [
      {
        title: "Breathe with the ring",
        description:
          "Take three slow rounds: in for 4, hold for 2, out for 6. Three rounds is usually enough.",
      },
      {
        title: "Name three things you can see",
        description:
          "Out loud. This pulls your mind back into the room. It works for you too — not just for them.",
      },
      {
        title: "Lower your voice",
        description:
          "A calm voice is contagious. A loud voice is also contagious. Choose the one you want in the room.",
      },
      {
        title: "Choose one next step",
        description:
          "Just one. A drink of water. Sitting on the floor. Closing a door. Small steps build the way out.",
      },
    ],
    note: "You are doing the right thing by opening this. There is no perfect response.",
    sources: [
      "Autism France · Parents au quotidien",
      "NICE CG170",
      "HAS · Recommandations 2018",
    ],
  },
};

const fr: Record<TriggerId, Strategy> = {
  meltdown: {
    title: "Une crise est en cours",
    steps: [
      {
        title: "Respirez d'abord",
        description:
          "Prenez une respiration lente et délibérée. Inspirez sur 4, expirez sur 6. Votre calme est ce qu'il y a de plus utile dans la pièce.",
      },
      {
        title: "Réduisez les stimulations",
        description:
          "Baissez la lumière, coupez les écrans et la musique. Éloignez les autres membres de la famille vers un espace plus calme si possible.",
      },
      {
        title: "Restez proche, bas, et silencieux",
        description:
          "Asseyez-vous au sol à leur niveau. Parlez très peu — des phrases courtes seulement. « Tu es en sécurité. Je suis là. Nous avons le temps. »",
      },
      {
        title: "Proposez un outil de régulation",
        description:
          "Une couverture lestée, une pression profonde, un objet familier, ou un casque anti-bruit. Proposez — n'imposez pas.",
      },
      {
        title: "Attendez, puis reconnectez",
        description:
          "Une crise se termine quand elle se termine. Quand l'enfant s'apaise, offrez de l'eau et une compagnie silencieuse. Parler peut venir plus tard, ou pas du tout.",
      },
    ],
    note: "Si la situation s'aggrave, ou si vous vous sentez en danger, contactez votre spécialiste ou les services d'urgence.",
    sources: [
      "NICE CG170 · Autisme chez les moins de 19 ans",
      "Autism France · Crise sensorielle",
      "HAS · Recommandations 2018",
    ],
  },

  sensory: {
    title: "Surcharge sensorielle",
    steps: [
      {
        title: "Trouvez un endroit plus calme",
        description:
          "Même une seule pièce peut aider. Lumière tamisée, peu de bruit, écrans éteints. Une cabane en couvertures ou sous la table convient.",
      },
      {
        title: "Retirez les vêtements serrés",
        description:
          "Les étiquettes, ceintures et chaussures peuvent amplifier la surcharge. Desserrez ou retirez ce qui peut l'être.",
      },
      {
        title: "Offrez une pression profonde",
        description:
          "Un câlin ferme, un coussin lesté, ou l'enrouler doucement dans une couverture peut aider à réguler le système nerveux.",
      },
      {
        title: "Ralentissez vos propres gestes",
        description:
          "Les enfants imitent notre rythme. Bougez lentement. Parlez lentement. Cessez de vouloir tout résoudre.",
      },
    ],
    note: "Une surcharge sensorielle se résorbe généralement en 20 à 45 minutes. Si elle dure des heures, appelez votre spécialiste.",
    sources: [
      "NICE NG142",
      "Autism Speaks · Boîte à outils sensorielle",
      "Étude évaluée par les pairs : Schaaf et al., 2014",
    ],
  },

  transition: {
    title: "Aide à la transition",
    steps: [
      {
        title: "Nommez ce qui change",
        description:
          "« Dans deux minutes, nous quittons le parc. » Parlez de façon concrète, en phrases courtes — pas d'abstractions.",
      },
      {
        title: "Utilisez un minuteur ou un repère visuel",
        description:
          "Un sablier, une chanson qui se termine, ou un emploi du temps en images donne un début et une fin au changement.",
      },
      {
        title: "Reliez le changement à un réconfort",
        description:
          "« Après le parc, on rentre pour le goûter. » Reliez toujours le départ à quelque chose de familier et sûr.",
      },
      {
        title: "Permettez un objet de transition",
        description:
          "Une feuille, un caillou, un jouet préféré. Porter quelque chose de l'ancien lieu vers le nouveau facilite le passage.",
      },
    ],
    note: "Répétez le même vocabulaire de transition chaque jour — la prévisibilité construit la confiance sur plusieurs semaines.",
    sources: [
      "HAS · Recommandations 2018",
      "Autism France · Transitions du quotidien",
      "NICE CG170",
    ],
  },

  school: {
    title: "Matin d'école",
    steps: [
      {
        title: "Commencez la veille au soir",
        description:
          "Préparez les vêtements, le sac, le déjeuner. Les matins deviennent plus faciles quand il y a moins de décisions à prendre.",
      },
      {
        title: "Utilisez la même séquence chaque jour",
        description:
          "Toilettes · petit-déjeuner · vêtements · dents · chaussures · porte. La répétition est régulation.",
      },
      {
        title: "Offrez un choix, pas deux",
        description:
          "« Tu veux les chaussettes rouges ou les chaussettes bleues ? » Évitez les questions ouvertes avant 9 h.",
      },
      {
        title: "Prévoyez 5 minutes d'avance",
        description:
          "Planifiez de partir 5 minutes plus tôt que nécessaire. Cette marge absorbe les imprévus.",
      },
    ],
    note: "Si les matins restent difficiles plus de 2 semaines malgré une routine, parlez-en à l'AESH ou à votre spécialiste.",
    sources: [
      "NICE NG142",
      "Autism France · Le matin à l'école",
      "HAS · Scolarisation",
    ],
  },

  bedtime: {
    title: "Heure du coucher",
    steps: [
      {
        title: "Tamisez tout 45 min avant",
        description:
          "Écrans éteints, lumières chaudes et basses seulement. Réduire la stimulation visuelle prépare le corps au sommeil.",
      },
      {
        title: "Le même ordre, chaque soir",
        description:
          "Bain · pyjama · dents · histoire · lumière éteinte. Le sommeil est une routine, pas un instant.",
      },
      {
        title: "Apaisement sensoriel",
        description:
          "Une couverture lestée, du bruit blanc, ou un scan corporel silencieux aide le système nerveux à ralentir.",
      },
      {
        title: "Restez à proximité brièvement",
        description:
          "Quelques minutes de compagnie silencieuse permettent souvent à l'enfant de s'endormir seul.",
      },
    ],
    note: "Si les difficultés de sommeil persistent au-delà de 4 semaines, demandez un bilan du sommeil à votre pédiatre.",
    sources: [
      "NICE NG142 · Sommeil",
      "HAS · Sommeil chez l'enfant",
      "Étude évaluée par les pairs : Cortesi et al., 2010",
    ],
  },

  other: {
    title: "Un ancrage général",
    steps: [
      {
        title: "Respirez en trois cycles",
        description:
          "Faites trois cycles lents : inspirez sur 4, retenez sur 2, expirez sur 6. Trois cycles suffisent généralement.",
      },
      {
        title: "Nommez trois choses que vous voyez",
        description:
          "À voix haute. Cela ramène votre esprit dans la pièce. Cela fonctionne aussi pour vous — pas seulement pour l'enfant.",
      },
      {
        title: "Baissez la voix",
        description:
          "Une voix calme est contagieuse. Une voix forte aussi. Choisissez celle que vous voulez dans la pièce.",
      },
      {
        title: "Choisissez un seul prochain pas",
        description:
          "Un seul. Un verre d'eau. S'asseoir au sol. Fermer une porte. Les petits pas construisent la sortie.",
      },
    ],
    note: "Vous faites bien d'ouvrir ceci. Il n'y a pas de réponse parfaite.",
    sources: [
      "Autism France · Parents au quotidien",
      "NICE CG170",
      "HAS · Recommandations 2018",
    ],
  },
};

// Dari falls back to the English content. The strategy page surfaces a
// "translations pending" banner whenever locale === "dr" so the user knows.
// TODO (Day 6+): native-speaker translation by Muzhgan.
const dr: Record<TriggerId, Strategy> = en;

const ALL_STRATEGIES: Record<SupportedLocale, Record<TriggerId, Strategy>> = {
  en,
  fr,
  dr,
};

/** Valid trigger IDs — used by the route handler to 404 unknown values. */
export const TRIGGER_IDS: ReadonlyArray<TriggerId> = [
  "meltdown",
  "sensory",
  "transition",
  "school",
  "bedtime",
  "other",
];

/**
 * Look up the calm-guidance strategy for a given trigger + locale.
 * Returns null if the trigger is unknown (handled with notFound() upstream).
 */
export function getStrategy(
  locale: string,
  trigger: string,
): Strategy | null {
  const safeLocale = (locale in ALL_STRATEGIES ? locale : "en") as SupportedLocale;
  const safeTrigger = TRIGGER_IDS.includes(trigger as TriggerId)
    ? (trigger as TriggerId)
    : null;
  if (!safeTrigger) return null;
  return ALL_STRATEGIES[safeLocale][safeTrigger];
}
