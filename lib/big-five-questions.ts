export interface BigFiveQuestion {
  id: number
  text: string
  trait: "openness" | "conscientiousness" | "extraversion" | "agreeableness" | "neuroticism"
  reversed: boolean // некоторые вопросы имеют обратный подсчёт
}

export const bigFiveQuestions: BigFiveQuestion[] = [
  // Openness (Открытость опыту)
  {
    id: 1,
    text: "Я люблю пробовать новые и необычные вещи",
    trait: "openness",
    reversed: false,
  },
  {
    id: 2,
    text: "Меня привлекает искусство и творчество",
    trait: "openness",
    reversed: false,
  },
  {
    id: 3,
    text: "Я предпочитаю привычный распорядок дня",
    trait: "openness",
    reversed: true,
  },

  // Conscientiousness (Добросовестность)
  {
    id: 4,
    text: "Я всегда довожу начатое до конца",
    trait: "conscientiousness",
    reversed: false,
  },
  {
    id: 5,
    text: "Я люблю, когда всё спланировано заранее",
    trait: "conscientiousness",
    reversed: false,
  },
  {
    id: 6,
    text: "Иногда я откладываю важные дела на потом",
    trait: "conscientiousness",
    reversed: true,
  },

  // Extraversion (Экстраверсия)
  {
    id: 7,
    text: "Я легко завожу новые знакомства",
    trait: "extraversion",
    reversed: false,
  },
  {
    id: 8,
    text: "Большие компании заряжают меня энергией",
    trait: "extraversion",
    reversed: false,
  },
  {
    id: 9,
    text: "Мне комфортнее проводить время в одиночестве",
    trait: "extraversion",
    reversed: true,
  },

  // Agreeableness (Доброжелательность)
  {
    id: 10,
    text: "Я стараюсь помочь людям, даже если это неудобно",
    trait: "agreeableness",
    reversed: false,
  },
  {
    id: 11,
    text: "Я легко прощаю людей",
    trait: "agreeableness",
    reversed: false,
  },
  {
    id: 12,
    text: "В споре мне важно отстоять свою точку зрения",
    trait: "agreeableness",
    reversed: true,
  },

  // Neuroticism (Нейротизм)
  {
    id: 13,
    text: "Я часто переживаю о будущем",
    trait: "neuroticism",
    reversed: false,
  },
  {
    id: 14,
    text: "Меня легко вывести из равновесия",
    trait: "neuroticism",
    reversed: false,
  },
  {
    id: 15,
    text: "Я обычно спокойно отношусь к трудностям",
    trait: "neuroticism",
    reversed: true,
  },
]

export const answerOptions = [
  { value: 1, label: "Совсем не согласен" },
  { value: 2, label: "Не согласен" },
  { value: 3, label: "Нейтрально" },
  { value: 4, label: "Согласен" },
  { value: 5, label: "Полностью согласен" },
]

export function calculateBigFive(answers: Record<number, number>): {
  openness: number
  conscientiousness: number
  extraversion: number
  agreeableness: number
  neuroticism: number
} {
  const traits = {
    openness: { sum: 0, count: 0 },
    conscientiousness: { sum: 0, count: 0 },
    extraversion: { sum: 0, count: 0 },
    agreeableness: { sum: 0, count: 0 },
    neuroticism: { sum: 0, count: 0 },
  }

  bigFiveQuestions.forEach((q) => {
    const answer = answers[q.id]
    if (answer !== undefined) {
      const score = q.reversed ? 6 - answer : answer
      traits[q.trait].sum += score
      traits[q.trait].count++
    }
  })

  return {
    openness: traits.openness.count > 0 ? (traits.openness.sum / traits.openness.count - 1) / 4 : 0.5,
    conscientiousness:
      traits.conscientiousness.count > 0
        ? (traits.conscientiousness.sum / traits.conscientiousness.count - 1) / 4
        : 0.5,
    extraversion: traits.extraversion.count > 0 ? (traits.extraversion.sum / traits.extraversion.count - 1) / 4 : 0.5,
    agreeableness:
      traits.agreeableness.count > 0 ? (traits.agreeableness.sum / traits.agreeableness.count - 1) / 4 : 0.5,
    neuroticism: traits.neuroticism.count > 0 ? (traits.neuroticism.sum / traits.neuroticism.count - 1) / 4 : 0.5,
  }
}
