"use client"

import { useState } from "react"
import { Camera, Plus, Settings, Eye, EyeOff, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

export function ProfileScreen() {
  const [profileVisible, setProfileVisible] = useState(true)
  const [profile, setProfile] = useState({
    name: "Алексей",
    age: 28,
    city: "Москва",
    bio: "Люблю путешествия, музыку и хороший кофе. Работаю в IT, но в душе творческий человек.",
    interests: ["Путешествия", "Музыка", "Кофе", "Технологии", "Кино"],
    photos: ["/young-man-portrait-professional.jpg", "/man-traveling-outdoor.jpg", "/man-at-cafe-lifestyle.jpg"],
    height: 180,
  })

  return (
    <div className="h-full flex flex-col">
      <header className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <h1 className="text-lg font-bold text-foreground">Мой профиль</h1>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">
        {/* Photos */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Фотографии</h3>
          <div className="grid grid-cols-3 gap-2">
            {profile.photos.map((photo, idx) => (
              <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-muted">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${photo})` }} />
                <button className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/50 flex items-center justify-center">
                  <Camera className="w-3 h-3 text-white" />
                </button>
              </div>
            ))}
            {profile.photos.length < 6 && (
              <button className="aspect-square rounded-xl border-2 border-dashed border-border flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-colors">
                <Plus className="w-8 h-8 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>

        {/* Basic info */}
        <div className="px-4 py-3 space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <span className="text-muted-foreground">Имя</span>
            <div className="flex items-center gap-2">
              <span className="text-foreground">{profile.name}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-border">
            <span className="text-muted-foreground">Возраст</span>
            <div className="flex items-center gap-2">
              <span className="text-foreground">{profile.age} лет</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-border">
            <span className="text-muted-foreground">Город</span>
            <div className="flex items-center gap-2">
              <span className="text-foreground">{profile.city}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-border">
            <span className="text-muted-foreground">Рост</span>
            <div className="flex items-center gap-2">
              <span className="text-foreground">{profile.height} см</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">О себе</h3>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-foreground leading-relaxed">{profile.bio}</p>
        </div>

        {/* Interests */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Интересы</h3>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest) => (
              <span key={interest} className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm">
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Profile visibility */}
        <div className="px-4 py-4 mt-4 bg-card border-y border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {profileVisible ? (
                <Eye className="w-5 h-5 text-accent" />
              ) : (
                <EyeOff className="w-5 h-5 text-muted-foreground" />
              )}
              <div>
                <h3 className="font-semibold text-foreground">Видимость профиля</h3>
                <p className="text-sm text-muted-foreground">
                  {profileVisible ? "Ваш профиль виден другим" : "Профиль скрыт"}
                </p>
              </div>
            </div>
            <Switch checked={profileVisible} onCheckedChange={setProfileVisible} />
          </div>
        </div>

        {/* Save button */}
        <div className="p-4">
          <Button className="w-full h-12 text-base font-semibold">Сохранить изменения</Button>
        </div>
      </div>
    </div>
  )
}
