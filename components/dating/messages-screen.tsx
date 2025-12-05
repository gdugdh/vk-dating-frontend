"use client"

import { useState } from "react"
import { mockChats, type Chat } from "@/lib/mock-data"
import { ChatWindow } from "./chat-window"

export function MessagesScreen() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return "сейчас"
    if (diffMins < 60) return `${diffMins} мин`
    if (diffHours < 24) return `${diffHours} ч`
    return `${diffDays} дн`
  }

  if (selectedChat) {
    return <ChatWindow chat={selectedChat} onBack={() => setSelectedChat(null)} />
  }

  return (
    <div className="h-full flex flex-col">
      <header className="px-4 py-3 bg-card border-b border-border">
        <h1 className="text-lg font-bold text-foreground">Сообщения</h1>
      </header>

      <div className="flex-1 overflow-y-auto">
        {mockChats.length === 0 ? (
          <div className="flex-1 flex items-center justify-center py-12">
            <div className="text-center px-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Нет сообщений</h3>
              <p className="text-muted-foreground text-sm">Начните общаться с вашими взаимными симпатиями</p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {mockChats.map((chat) => {
              const lastMessage = chat.messages[chat.messages.length - 1]

              return (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors text-left"
                >
                  {/* Avatar */}
                  <div className="relative">
                    <div
                      className="w-14 h-14 rounded-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${chat.user.photos[0]})` }}
                    />
                    {chat.user.isOnline && (
                      <span className="absolute bottom-0 right-0 w-4 h-4 bg-accent border-2 border-background rounded-full" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground truncate">{chat.user.name}</h3>
                      <span className="text-xs text-muted-foreground ml-2">{formatTime(lastMessage.timestamp)}</span>
                    </div>
                    <p
                      className={`text-sm truncate ${chat.unreadCount > 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}
                    >
                      {lastMessage.senderId === "me" && "Вы: "}
                      {lastMessage.text}
                    </p>
                  </div>

                  {/* Unread badge */}
                  {chat.unreadCount > 0 && (
                    <span className="min-w-[22px] h-[22px] flex items-center justify-center bg-primary text-primary-foreground text-xs font-bold rounded-full px-1.5">
                      {chat.unreadCount}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
