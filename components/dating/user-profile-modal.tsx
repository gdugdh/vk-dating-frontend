"use client"

import type { User } from "@/lib/mock-data"
import { X, MapPin, Heart, Star, Flag, ChevronLeft, ChevronRight, Sparkles, Music, Palette, MapPinned, Film, Users } from "lucide-react"
import { useState } from "react"

interface UserProfileModalProps {
  user: User
  onClose: () => void
  onLike: () => void
  onDislike: () => void
  onSuperlike: () => void
}

export function UserProfileModal({ user, onClose, onLike, onDislike, onSuperlike }: UserProfileModalProps) {
  const [currentPhoto, setCurrentPhoto] = useState(0)

  const nextPhoto = () => setCurrentPhoto((prev) => (prev + 1) % user.photos.length)
  const prevPhoto = () => setCurrentPhoto((prev) => (prev - 1 + user.photos.length) % user.photos.length)

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center justify-between">
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white"
        >
          <X className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white">
          <Flag className="w-5 h-5" />
        </button>
      </div>

      <div className="h-full overflow-y-auto pb-24">
        {/* Photo gallery */}
        <div className="relative aspect-[3/4] w-full">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${user.photos[currentPhoto]})` }}
          />

          {/* Photo indicators */}
          <div className="absolute top-16 left-4 right-4 flex gap-1">
            {user.photos.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 flex-1 rounded-full ${idx === currentPhoto ? "bg-white" : "bg-white/40"}`}
              />
            ))}
          </div>

          {/* Photo navigation */}
          {user.photos.length > 1 && (
            <>
              <button
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/30 rounded-full"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/30 rounded-full"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}

          {/* Online badge */}
          {user.isOnline && (
            <div className="absolute top-16 right-4 flex items-center gap-1.5 bg-accent text-accent-foreground px-3 py-1.5 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Онлайн
            </div>
          )}

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* User info */}
        <div className="px-5 -mt-16 relative z-10">
          <h1 className="text-3xl font-bold text-foreground">
            {user.name}, {user.age}
          </h1>

          <div className="flex items-center gap-2 text-muted-foreground mt-2">
            <MapPin className="w-4 h-4" />
            <span>
              {user.city} • {user.distance} км
            </span>
          </div>

          {user.height && <div className="text-muted-foreground mt-1">Рост: {user.height} см</div>}

          {!user.isOnline && user.lastSeen && (
            <div className="text-muted-foreground text-sm mt-1">Был(а) в сети: {user.lastSeen}</div>
          )}

          {/* Bio */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">О себе</h3>
            <p className="text-foreground leading-relaxed">{user.bio}</p>
          </div>

          {/* Interests */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Интересы</h3>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          {user.aiInsights && (
            <div className="mt-6 mb-8 bg-gradient-to-br from-yellow-500/10 via-amber-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                  AI Insights
                </h3>
                <span className="text-xs text-muted-foreground ml-auto">Анализ ML модели</span>
              </div>

              {/* Music Genres */}
              {user.aiInsights.musicGenres && user.aiInsights.musicGenres.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Music className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-xs font-semibold text-foreground">Музыкальные вкусы</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {user.aiInsights.musicGenres.map((genre) => (
                      <span
                        key={genre}
                        className="px-2.5 py-1 bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 rounded-lg text-xs"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                  {user.aiInsights.favoriteArtists && user.aiInsights.favoriteArtists.length > 0 && (
                    <div className="mt-1.5 text-xs text-muted-foreground">
                      Слушает: {user.aiInsights.favoriteArtists.join(", ")}
                    </div>
                  )}
                </div>
              )}

              {/* Hobbies */}
              {user.aiInsights.hobbies && user.aiInsights.hobbies.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Palette className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-xs font-semibold text-foreground">Увлечения</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {user.aiInsights.hobbies.map((hobby) => (
                      <span
                        key={hobby}
                        className="px-2.5 py-1 bg-orange-500/20 text-orange-700 dark:text-orange-300 rounded-lg text-xs"
                      >
                        {hobby}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Communities */}
              {user.aiInsights.communities && user.aiInsights.communities.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-xs font-semibold text-foreground">Сообщества VK</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {user.aiInsights.communities.slice(0, 4).map((community) => (
                      <span
                        key={community}
                        className="px-2.5 py-1 bg-amber-500/20 text-amber-700 dark:text-amber-300 rounded-lg text-xs"
                      >
                        {community}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Movie Genres */}
              {user.aiInsights.movieGenres && user.aiInsights.movieGenres.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Film className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-xs font-semibold text-foreground">Любимое кино</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {user.aiInsights.movieGenres.map((genre) => (
                      <span
                        key={genre}
                        className="px-2.5 py-1 bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 rounded-lg text-xs"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Travel Destinations */}
              {user.aiInsights.travelDestinations && user.aiInsights.travelDestinations.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPinned className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-xs font-semibold text-foreground">Хочет посетить</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {user.aiInsights.travelDestinations.map((destination) => (
                      <span
                        key={destination}
                        className="px-2.5 py-1 bg-orange-500/20 text-orange-700 dark:text-orange-300 rounded-lg text-xs"
                      >
                        {destination}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Lifestyle */}
              {user.aiInsights.lifestyle && (
                <div className="mb-4 p-3 bg-black/5 dark:bg-white/5 rounded-xl">
                  <div className="text-xs font-semibold text-foreground mb-1">Образ жизни</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{user.aiInsights.lifestyle}</p>
                </div>
              )}

              {/* Personality */}
              {user.aiInsights.personality && (
                <div className="p-3 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl">
                  <div className="text-xs font-semibold text-foreground mb-1">Личность (AI анализ)</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{user.aiInsights.personality}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Fixed action buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={onDislike}
            className="w-16 h-16 flex items-center justify-center rounded-full bg-card border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all"
          >
            <X className="w-7 h-7" />
          </button>
          <button
            onClick={onSuperlike}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-card border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <Star className="w-6 h-6" />
          </button>
          <button
            onClick={onLike}
            className="w-16 h-16 flex items-center justify-center rounded-full bg-card border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all"
          >
            <Heart className="w-7 h-7" />
          </button>
        </div>
      </div>
    </div>
  )
}
