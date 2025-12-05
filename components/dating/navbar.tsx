"use client"

import { SlidersHorizontal, User } from "lucide-react"

interface NavbarProps {
  onOpenFilters: () => void
  onOpenProfile: () => void
}

export function Navbar({ onOpenFilters, onOpenProfile }: NavbarProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
      <button
        onClick={onOpenFilters}
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
        aria-label="Фильтры"
      >
        <SlidersHorizontal className="w-5 h-5 text-foreground" />
      </button>

      <h1 className="text-lg font-bold text-primary">Знакомства</h1>

      <button
        onClick={onOpenProfile}
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
        aria-label="Профиль"
      >
        <User className="w-5 h-5 text-foreground" />
      </button>
    </header>
  )
}
