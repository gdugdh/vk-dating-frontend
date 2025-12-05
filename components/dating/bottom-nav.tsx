"use client"

import { Flame, Heart, MessageCircle, User } from "lucide-react"

type Tab = "feed" | "likes" | "messages" | "profile"

interface BottomNavProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
  unreadMessages?: number
  newLikes?: number
}

export function BottomNav({ activeTab, onTabChange, unreadMessages = 0, newLikes = 0 }: BottomNavProps) {
  const tabs = [
    { id: "feed" as Tab, icon: Flame, label: "Лента" },
    { id: "likes" as Tab, icon: Heart, label: "Симпатии", badge: newLikes },
    { id: "messages" as Tab, icon: MessageCircle, label: "Чаты", badge: unreadMessages },
    { id: "profile" as Tab, icon: User, label: "Профиль" },
  ]

  return (
    <nav className="flex items-center justify-around bg-card border-t border-border py-2 px-4">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="relative flex flex-col items-center justify-center py-2 px-4 min-w-[60px] transition-colors"
          >
            <div className="relative">
              <Icon
                className={`w-6 h-6 transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`}
                fill={isActive ? "currentColor" : "none"}
              />
              {tab.badge && tab.badge > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-destructive text-destructive-foreground text-xs font-bold rounded-full px-1">
                  {tab.badge > 99 ? "99+" : tab.badge}
                </span>
              )}
            </div>
            <span className={`text-xs mt-1 ${isActive ? "text-primary" : "text-muted-foreground"}`}>{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
