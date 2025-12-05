"use client"

import { useState, useRef, useCallback } from "react"
import type { User } from "@/lib/mock-data"
import { UserCard } from "./user-card"

interface CardStackProps {
  users: User[]
  onSwipeLeft: (user: User) => void
  onSwipeRight: (user: User) => void
  onCardClick: (user: User) => void
  currentIndex: number
}

export function CardStack({ users, onSwipeLeft, onSwipeRight, onCardClick, currentIndex }: CardStackProps) {
  const [dragState, setDragState] = useState({ x: 0, y: 0, isDragging: false })
  const [swipedDirection, setSwipedDirection] = useState<"left" | "right" | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const startPos = useRef({ x: 0, y: 0 })

  const handleDragStart = useCallback((clientX: number, clientY: number) => {
    startPos.current = { x: clientX, y: clientY }
    setDragState((prev) => ({ ...prev, isDragging: true }))
  }, [])

  const handleDragMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!dragState.isDragging) return
      const deltaX = clientX - startPos.current.x
      const deltaY = clientY - startPos.current.y
      setDragState((prev) => ({ ...prev, x: deltaX, y: deltaY }))
    },
    [dragState.isDragging],
  )

  const handleDragEnd = useCallback(() => {
    const threshold = 100
    const currentUser = users[currentIndex]

    if (dragState.x > threshold && currentUser) {
      setSwipedDirection("right")
      setTimeout(() => {
        onSwipeRight(currentUser)
        setSwipedDirection(null)
        setDragState({ x: 0, y: 0, isDragging: false })
      }, 300)
    } else if (dragState.x < -threshold && currentUser) {
      setSwipedDirection("left")
      setTimeout(() => {
        onSwipeLeft(currentUser)
        setSwipedDirection(null)
        setDragState({ x: 0, y: 0, isDragging: false })
      }, 300)
    } else {
      setDragState({ x: 0, y: 0, isDragging: false })
    }
  }, [dragState.x, currentIndex, users, onSwipeLeft, onSwipeRight])

  const rotation = dragState.x / 15

  const getCardTransform = () => {
    if (swipedDirection === "right") {
      return "translateX(150%) rotate(30deg)"
    }
    if (swipedDirection === "left") {
      return "translateX(-150%) rotate(-30deg)"
    }
    return `translateX(${dragState.x}px) translateY(${dragState.y * 0.3}px) rotate(${rotation}deg)`
  }

  if (currentIndex >= users.length) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <span className="text-4xl">💔</span>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Анкеты закончились</h3>
          <p className="text-muted-foreground">Попробуйте изменить фильтры или загляните позже</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 relative overflow-hidden">
      {/* Background cards */}
      {users
        .slice(currentIndex + 1, currentIndex + 3)
        .reverse()
        .map((user, idx) => (
          <div
            key={user.id}
            className="absolute inset-2 transition-transform duration-300"
            style={{
              transform: `scale(${0.95 - (1 - idx) * 0.03}) translateY(${(1 - idx) * 15}px)`,
              zIndex: idx,
            }}
          >
            <UserCard user={user} />
          </div>
        ))}

      {/* Active card */}
      <div
        ref={cardRef}
        className="absolute inset-2 touch-none"
        style={{
          transform: getCardTransform(),
          opacity: swipedDirection ? 1 : 1,
          transition: dragState.isDragging ? "none" : "all 0.3s ease-out",
          zIndex: 10,
        }}
        onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
        onMouseMove={(e) => handleDragMove(e.clientX, e.clientY)}
        onMouseUp={handleDragEnd}
        onMouseLeave={() => dragState.isDragging && handleDragEnd()}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchEnd={handleDragEnd}
      >
        <UserCard
          user={users[currentIndex]}
          onExpand={() => !dragState.isDragging && onCardClick(users[currentIndex])}
        />

        {/* Swipe indicators */}
        <div
          className="absolute top-8 left-8 px-4 py-2 border-4 border-accent text-accent font-bold text-2xl rounded-lg rotate-[-20deg] transition-opacity"
          style={{ opacity: Math.max(0, dragState.x / 100) }}
        >
          НРАВИТСЯ
        </div>
        <div
          className="absolute top-8 right-8 px-4 py-2 border-4 border-destructive text-destructive font-bold text-2xl rounded-lg rotate-[20deg] transition-opacity"
          style={{ opacity: Math.max(0, -dragState.x / 100) }}
        >
          ПРОПУСК
        </div>
      </div>
    </div>
  )
}
