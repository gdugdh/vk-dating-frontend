"use client"

import { Button } from "@/components/ui/button"
import { Heart, Sparkles, Users, MessageCircle } from "lucide-react"

interface WelcomeStepProps {
  userName: string
  onNext: () => void
}

export function WelcomeStep({ userName, onNext }: WelcomeStepProps) {
  return (
    <div className="flex flex-col items-center justify-between h-full px-6 py-10">
      {/* Top decorative elements */}
      <div className="relative w-full flex justify-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col items-center gap-4">
          {/* Floating hearts animation */}
          <div className="relative w-40 h-40">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
                <Heart className="w-12 h-12 text-white fill-white" />
              </div>
            </div>
            <div className="absolute top-2 right-4 animate-bounce" style={{ animationDelay: "0.1s" }}>
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="absolute bottom-4 left-2 animate-bounce" style={{ animationDelay: "0.3s" }}>
              <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
            </div>
            <div className="absolute top-8 left-0 animate-bounce" style={{ animationDelay: "0.5s" }}>
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 max-w-sm">
        <h1 className="text-3xl font-bold text-foreground">
          Привет, <span className="text-primary">{userName}</span>!
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Чтобы найти идеального партнёра, нам нужно узнать тебя немного лучше. Это займёт всего пару минут.
        </p>

        {/* Features list */}
        <div className="flex flex-col gap-4 mt-4 w-full">
          <div className="flex items-center gap-4 bg-card/50 rounded-xl p-4 border border-border/50">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">Расскажи о своих интересах</span>
          </div>
          <div className="flex items-center gap-4 bg-card/50 rounded-xl p-4 border border-border/50">
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-sm text-muted-foreground">Пройди тест на совместимость</span>
          </div>
          <div className="flex items-center gap-4 bg-card/50 rounded-xl p-4 border border-border/50">
            <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-sm text-muted-foreground">Найди идеальные совпадения</span>
          </div>
        </div>
      </div>

      {/* Bottom button */}
      <Button onClick={onNext} size="lg" className="w-full max-w-sm h-14 text-lg font-semibold rounded-xl">
        Начнём
      </Button>
    </div>
  )
}
