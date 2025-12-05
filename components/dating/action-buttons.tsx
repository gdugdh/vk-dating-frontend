"use client"

import { X, Heart, Star } from "lucide-react"

interface ActionButtonsProps {
  onDislike: () => void
  onLike: () => void
  onSuperlike: () => void
}

export function ActionButtons({ onDislike, onLike, onSuperlike }: ActionButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-6">
      <button
        onClick={onDislike}
        className="w-16 h-16 flex items-center justify-center rounded-full bg-card border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all hover:scale-110 active:scale-95"
        aria-label="Не интересует"
      >
        <X className="w-7 h-7" />
      </button>

      <button
        onClick={onSuperlike}
        className="w-16 h-16 flex items-center justify-center rounded-full bg-card border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110 active:scale-95"
        aria-label="Суперлайк"
      >
        <Star className="w-7 h-7" />
      </button>

      <button
        onClick={onLike}
        className="w-16 h-16 flex items-center justify-center rounded-full bg-card border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all hover:scale-110 active:scale-95"
        aria-label="Нравится"
      >
        <Heart className="w-7 h-7" />
      </button>
    </div>
  )
}
