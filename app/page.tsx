"use client";

import { useState, useEffect } from "react";
import { FeedScreen } from "@/components/dating/feed-screen";
import { LikesScreen } from "@/components/dating/likes-screen";
import { MessagesScreen } from "@/components/dating/messages-screen";
import { ProfileScreen } from "@/components/dating/profile-screen";
import { BottomNav } from "@/components/dating/bottom-nav";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";
import { useAuth } from "@/contexts/AuthContext";

type Tab = "feed" | "likes" | "messages" | "profile";

export default function DatingApp() {
  const [activeTab, setActiveTab] = useState<Tab>("feed");
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<
    boolean | null
  >(null);
  const { user, backendUser, accessToken, isLoading, isVKEnvironment } =
    useAuth();

  useEffect(() => {
    if (isLoading) return;

    // В VK окружении проверяем наличие токена
    if (isVKEnvironment && !accessToken) {
      // Токен отсутствует - пользователь будет перенаправлен AuthProvider'ом
      return;
    }

    // Если пользователь новый - показываем онбординг
    // Если старый - проверяем localStorage
    if (backendUser != null) {
      setIsOnboardingComplete(backendUser.is_verified);
    }
  }, [isLoading, accessToken, isVKEnvironment, backendUser]);

  const handleOnboardingComplete = (data: {
    interests: string[];
    bio: string;
    bigFive: {
      openness: number;
      conscientiousness: number;
      extraversion: number;
      agreeableness: number;
      neuroticism: number;
    } | null;
  }) => {
    localStorage.setItem("onboarding_complete", "true");
    localStorage.setItem("user_interests", JSON.stringify(data.interests));
    localStorage.setItem("user_bio", data.bio);
    if (data.bigFive) {
      localStorage.setItem("user_bigfive", JSON.stringify(data.bigFive));
    }
    setIsOnboardingComplete(true);
  };

  if (isOnboardingComplete === null) {
    return (
      <div className="h-dvh flex items-center justify-center bg-background max-w-md mx-auto">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isOnboardingComplete) {
    const userName = user?.first_name || "Друг";
    return (
      <OnboardingFlow
        userName={userName}
        onComplete={handleOnboardingComplete}
      />
    );
  }

  return (
    <div className="h-dvh flex flex-col bg-background max-w-md mx-auto">
      <div className="flex-1 overflow-hidden">
        {activeTab === "feed" && (
          <FeedScreen onOpenProfile={() => setActiveTab("profile")} />
        )}
        {activeTab === "likes" && <LikesScreen />}
        {activeTab === "messages" && <MessagesScreen />}
        {activeTab === "profile" && <ProfileScreen />}
      </div>

      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        unreadMessages={1}
        newLikes={2}
      />
    </div>
  );
}
