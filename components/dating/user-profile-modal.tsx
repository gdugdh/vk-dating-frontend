"use client";

import type { User } from "@/lib/mock-data";
import {
  X,
  MapPin,
  Heart,
  Star,
  Flag,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Music,
  Palette,
  MapPinned,
  Film,
  Users,
} from "lucide-react";
import { useState } from "react";

interface UserProfileModalProps {
  user: User;
  onClose: () => void;
  onLike: () => void;
  onDislike: () => void;
  onSuperlike: () => void;
}

export function UserProfileModal({
  user,
  onClose,
  onLike,
  onDislike,
  onSuperlike,
}: UserProfileModalProps) {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const nextPhoto = () =>
    setCurrentPhoto((prev) => (prev + 1) % user.photos.length);
  const prevPhoto = () =>
    setCurrentPhoto(
      (prev) => (prev - 1 + user.photos.length) % user.photos.length,
    );

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

          {user.height && (
            <div className="text-muted-foreground mt-1">
              Рост: {user.height} см
            </div>
          )}

          {!user.isOnline && user.lastSeen && (
            <div className="text-muted-foreground text-sm mt-1">
              Был(а) в сети: {user.lastSeen}
            </div>
          )}

          {/* Bio */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              О себе
            </h3>
            <p className="text-foreground leading-relaxed">{user.bio}</p>
          </div>

          {/* Interests */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Интересы
            </h3>
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
            <div className="mt-6 mb-8 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 border-2 border-amber-200 dark:border-amber-700/50 rounded-2xl p-6 shadow-xl">
              {/* Header */}
              <div className="flex items-center gap-3 mb-5 pb-4 border-b-2 border-amber-200 dark:border-amber-700/40">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-amber-900 dark:text-amber-100">
                    AI Insights
                  </h3>
                  <span className="text-xs text-amber-700 dark:text-amber-300">
                    Анализ на основе данных VK
                  </span>
                </div>
              </div>

              {/* Music Genres */}
              {user.aiInsights.musicGenres &&
                user.aiInsights.musicGenres.length > 0 && (
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Music className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      <span className="text-sm font-bold text-amber-900 dark:text-amber-100">
                        Музыкальные вкусы
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {user.aiInsights.musicGenres.map((genre) => (
                        <span
                          key={genre}
                          className="px-3 py-1.5 bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 rounded-lg text-xs font-medium border border-amber-200 dark:border-amber-700/50"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                    {user.aiInsights.favoriteArtists &&
                      user.aiInsights.favoriteArtists.length > 0 && (
                        <div className="mt-2 text-sm text-amber-700 dark:text-amber-300">
                          Слушает: <span className="font-medium">{user.aiInsights.favoriteArtists.join(", ")}</span>
                        </div>
                      )}
                  </div>
                )}

              {/* Hobbies */}
              {user.aiInsights.hobbies &&
                user.aiInsights.hobbies.length > 0 && (
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Palette className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      <span className="text-sm font-bold text-amber-900 dark:text-amber-100">
                        Увлечения
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {user.aiInsights.hobbies.map((hobby) => (
                        <span
                          key={hobby}
                          className="px-3 py-1.5 bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-200 rounded-lg text-xs font-medium border border-orange-200 dark:border-orange-700/50"
                        >
                          {hobby}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {/* Communities */}
              {user.aiInsights.communities &&
                user.aiInsights.communities.length > 0 && (
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      <span className="text-sm font-bold text-amber-900 dark:text-amber-100">
                        Сообщества VK
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {user.aiInsights.communities
                        .slice(0, 4)
                        .map((community) => (
                          <span
                            key={community}
                            className="px-3 py-1.5 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200 rounded-lg text-xs font-medium border border-yellow-200 dark:border-yellow-700/50"
                          >
                            {community}
                          </span>
                        ))}
                    </div>
                  </div>
                )}

              {/* Movie Genres */}
              {user.aiInsights.movieGenres &&
                user.aiInsights.movieGenres.length > 0 && (
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Film className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      <span className="text-sm font-bold text-amber-900 dark:text-amber-100">
                        Любимое кино
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {user.aiInsights.movieGenres.map((genre) => (
                        <span
                          key={genre}
                          className="px-3 py-1.5 bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 rounded-lg text-xs font-medium border border-amber-200 dark:border-amber-700/50"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {/* Travel Destinations */}
              {user.aiInsights.travelDestinations &&
                user.aiInsights.travelDestinations.length > 0 && (
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPinned className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      <span className="text-sm font-bold text-amber-900 dark:text-amber-100">
                        Хочет посетить
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {user.aiInsights.travelDestinations.map((destination) => (
                        <span
                          key={destination}
                          className="px-3 py-1.5 bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-200 rounded-lg text-xs font-medium border border-orange-200 dark:border-orange-700/50"
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
                  <div className="text-xs font-semibold text-foreground mb-1">
                    Образ жизни
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {user.aiInsights.lifestyle}
                  </p>
                </div>
              )}

              {/* Personality */}
              {user.aiInsights.personality && (
                <div className="p-3 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl">
                  <div className="text-xs font-semibold text-foreground mb-1">
                    Личность (AI анализ)
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {user.aiInsights.personality}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
