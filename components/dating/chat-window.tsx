"use client"

import { useState, useRef, useEffect } from "react"
import type { Chat } from "@/lib/mock-data"
import { generateChatSuggestions } from "@/lib/chat-suggestions"
import { ArrowLeft, Send, MoreVertical, Sparkles } from "lucide-react"

interface ChatWindowProps {
  chat: Chat
  onBack: () => void
}

export function ChatWindow({ chat, onBack }: ChatWindowProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState(chat.messages)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const suggestions = generateChatSuggestions(chat.user)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!message.trim()) return

    setMessages((prev) => [
      ...prev,
      {
        id: `m${Date.now()}`,
        senderId: "me",
        text: message,
        timestamp: new Date(),
        read: false,
      },
    ])
    setMessage("")
  }

  const handleSuggestionClick = (text: string) => {
    setMessage(text)
  }

  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background max-w-md mx-auto">
      {/* Header */}
      <header className="flex items-center gap-3 px-2 py-2 bg-card border-b border-border">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 flex-1">
          <div className="relative">
            <div
              className="w-10 h-10 rounded-full bg-cover bg-center"
              style={{ backgroundImage: `url(${chat.user.photos[0]})` }}
            />
            {chat.user.isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-accent border-2 border-card rounded-full" />
            )}
          </div>
          <div>
            <h2 className="font-semibold text-foreground">{chat.user.name}</h2>
            <p className="text-xs text-muted-foreground">{chat.user.isOnline ? "в сети" : chat.user.lastSeen}</p>
          </div>
        </div>

        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => {
          const isMe = msg.senderId === "me"

          return (
            <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                  isMe
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-secondary text-secondary-foreground rounded-bl-md"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p className={`text-xs mt-1 ${isMe ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {formatMessageTime(msg.timestamp)}
                </p>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="px-4 py-3 bg-card/50 border-t border-border/50">
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs text-muted-foreground">Темы для разговора</span>
        </div>
        <div className="flex flex-col gap-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion.text)}
              className="flex items-center gap-2 px-3 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground text-sm rounded-xl transition-colors text-left"
            >
              <span className="text-base">{suggestion.icon}</span>
              <span className="line-clamp-1">{suggestion.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 bg-card border-t border-border">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Напишите сообщение..."
            className="flex-1 px-4 py-3 bg-input border border-border rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
