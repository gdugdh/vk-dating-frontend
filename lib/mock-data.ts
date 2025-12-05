export interface User {
  id: string
  name: string
  age: number
  city: string
  distance: number
  bio: string
  interests: string[]
  photos: string[]
  isOnline: boolean
  lastSeen?: string
  height?: number
  status: "single" | "divorced" | "widowed"
  bigFive: {
    openness: number // 0-1
    conscientiousness: number
    extraversion: number
    agreeableness: number
    neuroticism: number
  }
  preferences: {
    ageRange: [number, number]
    maxDistance: number
    interests: string[]
  }
}

export const currentUser: User = {
  id: "me",
  name: "Алексей",
  age: 27,
  city: "Москва",
  distance: 0,
  bio: "Разработчик, люблю музыку и технологии.",
  interests: ["Технологии", "Музыка", "Кино", "Путешествия", "Игры"],
  photos: [],
  isOnline: true,
  status: "single",
  bigFive: {
    openness: 0.8,
    conscientiousness: 0.7,
    extraversion: 0.5,
    agreeableness: 0.75,
    neuroticism: 0.3,
  },
  preferences: {
    ageRange: [20, 32],
    maxDistance: 15,
    interests: ["Музыка", "Технологии", "Кино", "Путешествия"],
  },
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Анна",
    age: 25,
    city: "Москва",
    distance: 3,
    bio: "Люблю путешествия, хорошую музыку и уютные вечера. Ищу человека для серьёзных отношений. Работаю в маркетинге, увлекаюсь фотографией.",
    interests: ["Путешествия", "Музыка", "Кино", "Кулинария"],
    photos: [
      "/beautiful-young-woman-portrait-smiling.jpg",
      "/woman-traveling-outdoor-adventure.jpg",
      "/woman-at-cafe-lifestyle.jpg",
    ],
    isOnline: true,
    height: 168,
    status: "single",
    bigFive: {
      openness: 0.85,
      conscientiousness: 0.6,
      extraversion: 0.7,
      agreeableness: 0.8,
      neuroticism: 0.35,
    },
    preferences: {
      ageRange: [24, 35],
      maxDistance: 10,
      interests: ["Музыка", "Путешествия", "Кино"],
    },
  },
  {
    id: "2",
    name: "Мария",
    age: 28,
    city: "Санкт-Петербург",
    distance: 5,
    bio: "Работаю дизайнером, обожаю искусство и архитектуру. В свободное время рисую и читаю. Мечтаю побывать во всех музеях мира.",
    interests: ["Искусство", "Дизайн", "Книги", "Фотография"],
    photos: ["/artistic-woman-portrait-creative.jpg", "/woman-in-art-gallery-museum.jpg"],
    isOnline: false,
    lastSeen: "2 часа назад",
    height: 172,
    status: "single",
    bigFive: {
      openness: 0.95,
      conscientiousness: 0.8,
      extraversion: 0.4,
      agreeableness: 0.7,
      neuroticism: 0.4,
    },
    preferences: {
      ageRange: [25, 38],
      maxDistance: 20,
      interests: ["Искусство", "Книги", "Музыка"],
    },
  },
  {
    id: "3",
    name: "Екатерина",
    age: 24,
    city: "Москва",
    distance: 2,
    bio: "Фитнес-тренер. Веду активный образ жизни, люблю спорт и здоровое питание. Йога — моя медитация.",
    interests: ["Фитнес", "Йога", "ЗОЖ", "Танцы"],
    photos: ["/fit-athletic-woman-portrait-gym.jpg", "/woman-doing-yoga-outdoor.jpg"],
    isOnline: true,
    height: 165,
    status: "single",
    bigFive: {
      openness: 0.6,
      conscientiousness: 0.9,
      extraversion: 0.85,
      agreeableness: 0.75,
      neuroticism: 0.2,
    },
    preferences: {
      ageRange: [22, 32],
      maxDistance: 10,
      interests: ["Фитнес", "ЗОЖ", "Спорт"],
    },
  },
  {
    id: "4",
    name: "Ольга",
    age: 30,
    city: "Казань",
    distance: 8,
    bio: "Врач-терапевт. Ценю искренность и чувство юмора. Мечтаю о большой дружной семье. Люблю готовить и смотреть сериалы.",
    interests: ["Медицина", "Кулинария", "Сериалы", "Прогулки"],
    photos: ["/professional-woman-doctor.png", "/woman-cooking-kitchen-lifestyle.jpg"],
    isOnline: false,
    lastSeen: "5 минут назад",
    height: 170,
    status: "divorced",
    bigFive: {
      openness: 0.5,
      conscientiousness: 0.85,
      extraversion: 0.55,
      agreeableness: 0.9,
      neuroticism: 0.45,
    },
    preferences: {
      ageRange: [28, 42],
      maxDistance: 15,
      interests: ["Кулинария", "Семья", "Путешествия"],
    },
  },
  {
    id: "5",
    name: "Дарья",
    age: 26,
    city: "Москва",
    distance: 1,
    bio: "IT-специалист. Люблю технологии, игры и научную фантастику. Ищу единомышленника. По вечерам стримлю на твиче.",
    interests: ["Технологии", "Игры", "Sci-Fi", "Аниме"],
    photos: ["/tech-savvy-woman-gamer-portrait.jpg", "/woman-with-laptop-cafe-modern.jpg"],
    isOnline: true,
    height: 163,
    status: "single",
    bigFive: {
      openness: 0.9,
      conscientiousness: 0.65,
      extraversion: 0.45,
      agreeableness: 0.7,
      neuroticism: 0.35,
    },
    preferences: {
      ageRange: [23, 32],
      maxDistance: 8,
      interests: ["Технологии", "Игры", "Аниме", "Музыка"],
    },
  },
]

export interface Message {
  id: string
  senderId: string
  text: string
  timestamp: Date
  read: boolean
}

export interface Chat {
  id: string
  user: User
  messages: Message[]
  unreadCount: number
}

export const mockChats: Chat[] = [
  {
    id: "chat1",
    user: mockUsers[0],
    messages: [
      { id: "m1", senderId: "1", text: "Привет! Как дела?", timestamp: new Date(Date.now() - 3600000), read: true },
      {
        id: "m2",
        senderId: "me",
        text: "Привет! Всё хорошо, спасибо!",
        timestamp: new Date(Date.now() - 3000000),
        read: true,
      },
      { id: "m3", senderId: "1", text: "Чем занимаешься?", timestamp: new Date(Date.now() - 1800000), read: false },
    ],
    unreadCount: 1,
  },
  {
    id: "chat2",
    user: mockUsers[2],
    messages: [
      {
        id: "m4",
        senderId: "3",
        text: "Привет! Увидела, что ты тоже любишь спорт 💪",
        timestamp: new Date(Date.now() - 7200000),
        read: true,
      },
    ],
    unreadCount: 0,
  },
]

export interface Like {
  userId: string
  user: User
  isMutual: boolean
  timestamp: Date
}

export const mockLikes: Like[] = [
  { userId: "1", user: mockUsers[0], isMutual: true, timestamp: new Date(Date.now() - 86400000) },
  { userId: "2", user: mockUsers[1], isMutual: false, timestamp: new Date(Date.now() - 172800000) },
  { userId: "3", user: mockUsers[2], isMutual: true, timestamp: new Date(Date.now() - 259200000) },
]
