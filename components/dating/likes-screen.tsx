"use client"

import { useState } from "react"
import { mockLikes, type User } from "@/lib/mock-data"
import { Heart, MessageCircle } from "lucide-react"
import { UserProfileModal } from "./user-profile-modal"

export function LikesScreen() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const mutualLikes = mockLikes.filter((like) => like.isMutual)
  const pendingLikes = mockLikes.filter((like) => !like.isMutual)

  return (
    <div className="h-full flex flex-col">
      <header className="px-4 py-3 bg-card border-b border-border">
        <h1 className="text-lg font-bold text-foreground">Симпатии</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Mutual likes */}
        {mutualLikes.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4 text-accent" fill="currentColor" />
              Взаимные симпатии
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {mutualLikes.map((like) => (
                <button
                  key={like.userId}
                  onClick={() => setSelectedUser(like.user)}
                  className="relative rounded-xl overflow-hidden aspect-[3/4] bg-card"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${like.user.photos[0]})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                  {/* Mutual badge */}
                  <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    <Heart className="w-4 h-4 text-accent-foreground" fill="currentColor" />
                  </div>

                  {/* User info */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white font-semibold">
                      {like.user.name}, {like.user.age}
                    </p>
                    <p className="text-white/70 text-sm">{like.user.city}</p>
                  </div>

                  {/* Chat button */}
                  <div className="absolute bottom-3 right-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-primary-foreground" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Pending likes */}
        {pendingLikes.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Они вам нравятся
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {pendingLikes.map((like) => (
                <button
                  key={like.userId}
                  onClick={() => setSelectedUser(like.user)}
                  className="relative rounded-xl overflow-hidden aspect-[3/4] bg-card"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${like.user.photos[0]})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white font-semibold">
                      {like.user.name}, {like.user.age}
                    </p>
                    <p className="text-white/70 text-sm">{like.user.city}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {mockLikes.length === 0 && (
          <div className="flex-1 flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Heart className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Пока нет симпатий</h3>
              <p className="text-muted-foreground text-sm">Продолжайте свайпать, чтобы найти пару</p>
            </div>
          </div>
        )}
      </div>

      {selectedUser && (
        <UserProfileModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onLike={() => setSelectedUser(null)}
          onDislike={() => setSelectedUser(null)}
          onSuperlike={() => setSelectedUser(null)}
        />
      )}
    </div>
  )
}
