"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

interface FilterModalProps {
  onClose: () => void
}

export function FilterModal({ onClose }: FilterModalProps) {
  const [ageRange, setAgeRange] = useState([18, 45])
  const [distance, setDistance] = useState([50])
  const [onlineOnly, setOnlineOnly] = useState(false)
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(["single"])

  const statuses = [
    { id: "single", label: "Не замужем/Не женат" },
    { id: "divorced", label: "В разводе" },
    { id: "widowed", label: "Вдова/Вдовец" },
  ]

  const toggleStatus = (statusId: string) => {
    setSelectedStatuses((prev) => (prev.includes(statusId) ? prev.filter((s) => s !== statusId) : [...prev, statusId]))
  }

  const handleApply = () => {
    console.log("Filters applied:", { ageRange, distance, onlineOnly, selectedStatuses })
    onClose()
  }

  const handleReset = () => {
    setAgeRange([18, 45])
    setDistance([50])
    setOnlineOnly(false)
    setSelectedStatuses(["single"])
  }

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-bold">Фильтры</h2>
        <button onClick={handleReset} className="text-primary text-sm font-medium">
          Сброс
        </button>
      </div>

      <div className="p-5 space-y-8 overflow-y-auto" style={{ maxHeight: "calc(100vh - 140px)" }}>
        {/* Age range */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Возраст</h3>
            <span className="text-muted-foreground text-sm">
              {ageRange[0]} - {ageRange[1]} лет
            </span>
          </div>
          <Slider value={ageRange} onValueChange={setAgeRange} min={18} max={70} step={1} className="w-full" />
        </div>

        {/* Distance */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Расстояние</h3>
            <span className="text-muted-foreground text-sm">до {distance[0]} км</span>
          </div>
          <Slider value={distance} onValueChange={setDistance} min={1} max={200} step={1} className="w-full" />
        </div>

        {/* Online only toggle */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Только онлайн</h3>
            <p className="text-muted-foreground text-sm">Показывать только активных пользователей</p>
          </div>
          <Switch checked={onlineOnly} onCheckedChange={setOnlineOnly} />
        </div>

        {/* Status filter */}
        <div>
          <h3 className="font-semibold text-foreground mb-4">Семейный статус</h3>
          <div className="space-y-3">
            {statuses.map((status) => (
              <button
                key={status.id}
                onClick={() => toggleStatus(status.id)}
                className={`w-full text-left px-4 py-3 rounded-xl border transition-colors ${
                  selectedStatuses.includes(status.id)
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-foreground"
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Apply button */}
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-background border-t border-border">
        <Button onClick={handleApply} className="w-full h-12 text-base font-semibold">
          Применить фильтры
        </Button>
      </div>
    </div>
  )
}
