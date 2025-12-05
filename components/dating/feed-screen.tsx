"use client"

import { useState, useCallback } from "react"
import { type User, mockUsers } from "@/lib/mock-data"
import { Navbar } from "./navbar"
import { CardStack } from "./card-stack"
import { ActionButtons } from "./action-buttons"
import { UserProfileModal } from "./user-profile-modal"
import { FilterModal } from "./filter-modal"

interface FeedScreenProps {
  onOpenProfile: () => void
}

export function FeedScreen({ onOpenProfile }: FeedScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [users] = useState(mockUsers)

  const handleSwipeLeft = useCallback((user: User) => {
    console.log("Disliked:", user.name)
    setCurrentIndex((prev) => prev + 1)
  }, [])

  const handleSwipeRight = useCallback((user: User) => {
    console.log("Liked:", user.name)
    setCurrentIndex((prev) => prev + 1)
  }, [])

  const handleLike = () => {
    const currentUser = users[currentIndex]
    if (currentUser) {
      handleSwipeRight(currentUser)
    }
  }

  const handleDislike = () => {
    const currentUser = users[currentIndex]
    if (currentUser) {
      handleSwipeLeft(currentUser)
    }
  }

  const handleSuperlike = () => {
    const currentUser = users[currentIndex]
    if (currentUser) {
      console.log("Superliked:", currentUser.name)
      setCurrentIndex((prev) => prev + 1)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <Navbar onOpenFilters={() => setShowFilters(true)} onOpenProfile={onOpenProfile} />

      <CardStack
        users={users}
        currentIndex={currentIndex}
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
        onCardClick={setSelectedUser}
      />

      {currentIndex < users.length && (
        <div className="px-4 py-3">
          <ActionButtons onDislike={handleDislike} onLike={handleLike} onSuperlike={handleSuperlike} />
        </div>
      )}

      {selectedUser && (
        <UserProfileModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onLike={() => {
            handleSwipeRight(selectedUser)
            setSelectedUser(null)
          }}
          onDislike={() => {
            handleSwipeLeft(selectedUser)
            setSelectedUser(null)
          }}
          onSuperlike={() => {
            handleSuperlike()
            setSelectedUser(null)
          }}
        />
      )}

      {showFilters && <FilterModal onClose={() => setShowFilters(false)} />}
    </div>
  )
}
