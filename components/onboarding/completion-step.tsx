"use client"

import { Button } from "@/components/ui/button"
import { Heart, Check, Sparkles, Zap } from "lucide-react"

interface CompletionStepProps {
  onComplete: () => void
}

export function CompletionStep({ onComplete }: CompletionStepProps) {
  return (
    <div className="flex flex-col items-center justify-between h-full px-6 py-10">
      {/* Success animation */}
      <div className="relative w-full flex justify-center mt-8">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="relative w-40 h-40">
            {/* Main circle with check */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-28 h-28 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 animate-pulse">
                <Check className="w-14 h-14 text-white" strokeWidth={3} />
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-2 right-0 animate-bounce" style={{ animationDelay: "0s" }}>
              <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
            </div>
            <div className="absolute -bottom-2 -left-2 animate-bounce" style={{ animationDelay: "0.2s" }}>
              <Sparkles className="w-7 h-7 text-yellow-400" />
            </div>
            <div className="absolute top-4 -left-4 animate-bounce" style={{ animationDelay: "0.4s" }}>
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div className="absolute -bottom-4 right-2 animate-bounce" style={{ animationDelay: "0.6s" }}>
              <Heart className="w-5 h-5 text-red-400 fill-red-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 max-w-sm">
        <h1 className="text-3xl font-bold text-foreground">Отлично!</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Твой профиль готов. Теперь мы сможем подобрать для тебя самых подходящих людей.
        </p>

        {/* Stats preview */}
        <div className="w-full grid grid-cols-3 gap-3 mt-4">
          <div className="bg-card/50 border border-border/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">98%</div>
            <div className="text-xs text-muted-foreground mt-1">Точность подбора</div>
          </div>
          <div className="bg-card/50 border border-border/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-400">1000+</div>
            <div className="text-xs text-muted-foreground mt-1">Анкет рядом</div>
          </div>
          <div className="bg-card/50 border border-border/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-pink-400">24/7</div>
            <div className="text-xs text-muted-foreground mt-1">Новые люди</div>
          </div>
        </div>
      </div>

      {/* Bottom button */}
      <Button
        onClick={onComplete}
        size="lg"
        className="w-full max-w-sm h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90"
      >
        <Heart className="w-5 h-5 mr-2" />
        Начать знакомиться
      </Button>
    </div>
  )
}
