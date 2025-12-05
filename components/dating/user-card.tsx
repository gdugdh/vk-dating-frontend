"use client"

import type React from "react"
import { useState } from "react"
import type { User } from "@/lib/mock-data"
import { calculateCompatibility } from "@/lib/compatibility"
import { MapPin, ChevronLeft, ChevronRight, ChevronDown, Sparkles } from "lucide-react"

interface UserCardProps {
  user: User
  onExpand?: () => void
}

export function UserCard({ user, onExpand }: UserCardProps) {
  const [currentPhoto, setCurrentPhoto] = useState(0)
  const [bioExpanded, setBioExpanded] = useState(false)

  const compatibilityScore = calculateCompatibility(user)

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentPhoto((prev) => (prev + 1) % user.photos.length)
  }

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentPhoto((prev) => (prev - 1 + user.photos.length) % user.photos.length)
  }

  const toggleBio = (e: React.MouseEvent) => {
    e.stopPropagation()
    setBioExpanded((prev) => !prev)
  }

  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden bg-card cursor-pointer select-none"
      onClick={onExpand}
    >
      {/* Photo */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-300"
        style={{ backgroundImage: `url(${user.photos[currentPhoto]})` }}
      />

      {/* Photo navigation indicators */}
      <div className="absolute top-3 left-3 right-3 flex gap-1">
        {user.photos.map((_, idx) => (
          <div
            key={idx}
            className={`h-1 flex-1 rounded-full transition-all ${idx === currentPhoto ? "bg-white" : "bg-white/40"}`}
          />
        ))}
      </div>

      {/* Photo navigation buttons */}
      {user.photos.length > 1 && (
        <>
          <button
            onClick={prevPhoto}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/20 rounded-full opacity-0 hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextPhoto}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/20 rounded-full opacity-0 hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
        <Sparkles className="w-4 h-4" />
        {compatibilityScore}%
      </div>

      {/* Online status */}
      {user.isOnline && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-accent/90 text-accent-foreground px-2.5 py-1 rounded-full text-xs font-medium">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          Онлайн
        </div>
      )}

      {/* User info */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {user.name}, {user.age}
            </h2>
            <div className="flex items-center gap-1.5 text-white/80 mt-1">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">
                {user.city} • {user.distance} км
              </span>
            </div>
          </div>
        </div>

        <button onClick={toggleBio} className="w-full mt-3 text-left group">
          <div className="flex items-center gap-2">
            <div
              className={`flex-1 text-white/90 text-sm leading-relaxed transition-all duration-300 ${
                bioExpanded ? "" : "line-clamp-1"
              }`}
            >
              {user.bio}
            </div>
            <ChevronDown
              className={`w-5 h-5 text-white/70 flex-shrink-0 transition-transform duration-300 ${
                bioExpanded ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>

        {/* Interests preview */}
        <div className="flex flex-wrap gap-2 mt-3">
          {user.interests.slice(0, 3).map((interest) => (
            <span key={interest} className="px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
              {interest}
            </span>
          ))}
          {user.interests.length > 3 && (
            <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
              +{user.interests.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
