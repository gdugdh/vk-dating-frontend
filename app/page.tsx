"use client"

import { useState, useEffect } from "react"
import { FeedScreen } from "@/components/dating/feed-screen"
import { LikesScreen } from "@/components/dating/likes-screen"
import { MessagesScreen } from "@/components/dating/messages-screen"
import { ProfileScreen } from "@/components/dating/profile-screen"
import { BottomNav } from "@/components/dating/bottom-nav"
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow"

type Tab = "feed" | "likes" | "messages" | "profile"

export default function DatingApp() {
  const [activeTab, setActiveTab] = useState<Tab>("feed")
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean | null>(null)

  useEffect(() => {
    const onboardingDone = localStorage.getItem("onboarding_complete")
    setIsOnboardingComplete(onboardingDone === "true")
  }, [])

  const handleOnboardingComplete = (data: {
    interests: string[]
    bio: string
    bigFive: {
      openness: number
      conscientiousness: number
      extraversion: number
      agreeableness: number
      neuroticism: number
    } | null
  }) => {
    localStorage.setItem("onboarding_complete", "true")
    localStorage.setItem("user_interests", JSON.stringify(data.interests))
    localStorage.setItem("user_bio", data.bio)
    if (data.bigFive) {
      localStorage.setItem("user_bigfive", JSON.stringify(data.bigFive))
    }
    setIsOnboardingComplete(true)
  }

  if (isOnboardingComplete === null) {
    return (
      <div className="h-dvh flex items-center justify-center bg-background max-w-md mx-auto">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isOnboardingComplete) {
    return <OnboardingFlow userName="Алексей" onComplete={handleOnboardingComplete} />
  }

  return (
    <div className="h-dvh flex flex-col bg-background max-w-md mx-auto">
      <div className="flex-1 overflow-hidden">
        {activeTab === "feed" && <FeedScreen onOpenProfile={() => setActiveTab("profile")} />}
        {activeTab === "likes" && <LikesScreen />}
        {activeTab === "messages" && <MessagesScreen />}
        {activeTab === "profile" && <ProfileScreen />}
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} unreadMessages={1} newLikes={2} />
    </div>
  )
}
