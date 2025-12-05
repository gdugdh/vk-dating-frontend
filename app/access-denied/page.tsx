"use client"

import { Button } from "@/components/ui/button"
import { ShieldX, RefreshCw } from "lucide-react"

export default function AccessDeniedPage() {
  const handleRetry = () => {
    window.location.reload()
  }

  return (
    <div className="h-dvh flex flex-col items-center justify-center bg-background max-w-md mx-auto px-6">
      <div className="flex flex-col items-center gap-6 text-center">
        {/* Icon */}
        <div className="relative">
          <div className="absolute inset-0 bg-destructive/20 rounded-full blur-2xl" />
          <div className="relative w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center border-2 border-destructive/20">
            <ShieldX className="w-12 h-12 text-destructive" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-foreground">
          Доступ к приложению ограничен
        </h1>

        {/* Description */}
        <div className="flex flex-col gap-4 text-muted-foreground">
          <p>
            Для работы приложения необходимо предоставить доступ к вашим данным VK.
          </p>
          <div className="bg-card/50 rounded-xl p-4 border border-border/50 text-sm text-left">
            <p className="font-semibold text-foreground mb-2">Мы запрашиваем доступ к:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Стене — для анализа интересов</li>
              <li>Группам — для подбора совместимых людей</li>
            </ul>
          </div>
          <p className="text-sm">
            Без этих данных мы не сможем помочь вам найти идеальную пару.
          </p>
        </div>

        {/* Retry Button */}
        <Button
          onClick={handleRetry}
          size="lg"
          className="w-full max-w-sm h-14 text-lg font-semibold rounded-xl mt-4"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Попробовать снова
        </Button>
      </div>
    </div>
  )
}
