"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { User, Lightbulb } from "lucide-react"

interface BioStepProps {
  initialBio: string
  onNext: (bio: string) => void
  onBack: () => void
}

const bioSuggestions = ["Чем ты увлекаешься?", "Какую музыку слушаешь?", "Как проводишь выходные?", "О чём мечтаешь?"]

export function BioStep({ initialBio, onNext, onBack }: BioStepProps) {
  const [bio, setBio] = useState(initialBio)
  const maxLength = 300

  return (
    <div className="flex flex-col h-full px-6 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">О себе</h1>
          <p className="text-sm text-muted-foreground">Расскажи, какой ты человек</p>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-card/50 border border-border/50 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-medium text-foreground">Подсказки</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {bioSuggestions.map((suggestion, i) => (
            <span key={i} className="text-xs text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full">
              {suggestion}
            </span>
          ))}
        </div>
      </div>

      {/* Text area */}
      <div className="flex-1">
        <Textarea
          placeholder="Например: Люблю путешествовать и открывать новые места. По вечерам играю на гитаре или смотрю хорошее кино. Ищу человека, с которым можно делиться впечатлениями..."
          value={bio}
          onChange={(e) => setBio(e.target.value.slice(0, maxLength))}
          className="min-h-[200px] bg-card border-border resize-none text-base leading-relaxed"
        />
        <p className="text-xs text-muted-foreground mt-2 text-right">
          {bio.length} / {maxLength}
        </p>
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-3 mt-6">
        <Button onClick={onBack} variant="outline" className="flex-1 h-12 rounded-xl bg-transparent">
          Назад
        </Button>
        <Button onClick={() => onNext(bio)} disabled={bio.length < 20} className="flex-1 h-12 rounded-xl">
          Далее
        </Button>
      </div>
    </div>
  )
}
