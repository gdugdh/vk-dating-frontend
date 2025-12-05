import type { User } from "./mock-data"
import { getCommonInterests } from "./compatibility"

interface ChatSuggestion {
  id: string
  text: string
  category: "greeting" | "music" | "tech" | "travel" | "hobby" | "joke" | "question"
  icon: string
}

export function generateChatSuggestions(partner: User): ChatSuggestion[] {
  const commonInterests = getCommonInterests(partner)
  const suggestions: ChatSuggestion[] = []

  // Greeting suggestions
  const greetings = [
    { text: `Привет, ${partner.name}! Рад познакомиться 👋`, category: "greeting" as const, icon: "👋" },
    { text: "Привет! Как твой день проходит?", category: "greeting" as const, icon: "😊" },
  ]
  suggestions.push({ ...greetings[Math.floor(Math.random() * greetings.length)], id: "g1" })

  // Interest-based suggestions
  if (commonInterests.includes("Музыка") || partner.interests.includes("Музыка")) {
    suggestions.push({
      id: "music1",
      text: "Какую музыку сейчас слушаешь? Я в последнее время открыл для себя новые треки",
      category: "music",
      icon: "🎵",
    })
  }

  if (
    commonInterests.includes("Технологии") ||
    partner.interests.includes("Технологии") ||
    partner.interests.includes("Игры")
  ) {
    suggestions.push({
      id: "tech1",
      text: "Видела последние новости из мира технологий? Есть что обсудить!",
      category: "tech",
      icon: "💻",
    })
  }

  if (commonInterests.includes("Путешествия") || partner.interests.includes("Путешествия")) {
    suggestions.push({
      id: "travel1",
      text: "Куда бы ты хотела поехать в следующий отпуск?",
      category: "travel",
      icon: "✈️",
    })
  }

  if (partner.interests.includes("Кино") || commonInterests.includes("Кино")) {
    suggestions.push({
      id: "hobby1",
      text: "Смотрела что-нибудь интересное в последнее время?",
      category: "hobby",
      icon: "🎬",
    })
  }

  if (partner.interests.includes("Кулинария")) {
    suggestions.push({
      id: "hobby2",
      text: "Какое твоё фирменное блюдо? Я люблю готовить по выходным",
      category: "hobby",
      icon: "🍳",
    })
  }

  if (partner.interests.includes("Фитнес") || partner.interests.includes("Йога")) {
    suggestions.push({
      id: "hobby3",
      text: "Как давно занимаешься спортом? Мне нужна мотивация 💪",
      category: "hobby",
      icon: "🏃",
    })
  }

  // Fun/joke suggestions
  const jokes = [
    { text: "Если бы ты могла выбрать любую суперспособность, какую бы выбрала?", icon: "✨" },
    { text: "Два важных вопроса: пицца или суши? И кошки или собаки?", icon: "🍕" },
    { text: "Расскажи что-то необычное о себе, чего нет в профиле", icon: "🤔" },
  ]
  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)]
  suggestions.push({
    id: "joke1",
    text: randomJoke.text,
    category: "joke",
    icon: randomJoke.icon,
  })

  // Limit to 4-5 most relevant suggestions
  return suggestions.slice(0, 5)
}
