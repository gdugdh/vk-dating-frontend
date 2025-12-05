"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, X, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface InterestsStepProps {
  initialInterests: string[]
  onNext: (interests: string[]) => void
  onBack: () => void
}

const suggestedInterests = [
  "Музыка",
  "Кино",
  "Путешествия",
  "Спорт",
  "Технологии",
  "Искусство",
  "Кулинария",
  "Книги",
  "Игры",
  "Фотография",
  "Танцы",
  "Йога",
  "Природа",
  "Мода",
  "Наука",
  "Психология",
  "Языки",
  "Театр",
  "Автомобили",
  "Животные",
]

export function InterestsStep({ initialInterests, onNext, onBack }: InterestsStepProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(initialInterests)
  const [customInterest, setCustomInterest] = useState("")

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) => (prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]))
  }

  const addCustomInterest = () => {
    if (customInterest.trim() && !selectedInterests.includes(customInterest.trim())) {
      setSelectedInterests((prev) => [...prev, customInterest.trim()])
      setCustomInterest("")
    }
  }

  const removeInterest = (interest: string) => {
    setSelectedInterests((prev) => prev.filter((i) => i !== interest))
  }

  return (
    <div className="flex flex-col h-full px-6 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-pink-500 rounded-full flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Твои интересы</h1>
          <p className="text-sm text-muted-foreground">Выбери минимум 3 интереса</p>
        </div>
      </div>

      {/* Selected interests */}
      {selectedInterests.length > 0 && (
        <div className="mb-6">
          <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">
            Выбрано ({selectedInterests.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedInterests.map((interest) => (
              <span
                key={interest}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-full text-sm font-medium"
              >
                {interest}
                <button onClick={() => removeInterest(interest)} className="hover:bg-white/20 rounded-full p-0.5">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Custom interest input */}
      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Добавь свой интерес..."
          value={customInterest}
          onChange={(e) => setCustomInterest(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addCustomInterest()}
          className="bg-card border-border"
        />
        <Button onClick={addCustomInterest} size="icon" variant="secondary" disabled={!customInterest.trim()}>
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {/* Suggested interests */}
      <div className="flex-1 overflow-y-auto">
        <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide">Популярные интересы</p>
        <div className="flex flex-wrap gap-2">
          {suggestedInterests.map((interest) => (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                selectedInterests.includes(interest)
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
              )}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-3 mt-6">
        <Button onClick={onBack} variant="outline" className="flex-1 h-12 rounded-xl bg-transparent">
          Назад
        </Button>
        <Button
          onClick={() => onNext(selectedInterests)}
          disabled={selectedInterests.length < 3}
          className="flex-1 h-12 rounded-xl"
        >
          Далее
        </Button>
      </div>
    </div>
  )
}
