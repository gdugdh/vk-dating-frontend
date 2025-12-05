"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Brain, ChevronLeft, ChevronRight } from "lucide-react"
import { bigFiveQuestions, answerOptions, calculateBigFive } from "@/lib/big-five-questions"
import { cn } from "@/lib/utils"

interface BigFiveStepProps {
  onNext: (bigFive: {
    openness: number
    conscientiousness: number
    extraversion: number
    agreeableness: number
    neuroticism: number
  }) => void
  onBack: () => void
}

export function BigFiveStep({ onNext, onBack }: BigFiveStepProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})

  const question = bigFiveQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / bigFiveQuestions.length) * 100
  const isLastQuestion = currentQuestion === bigFiveQuestions.length - 1
  const canGoNext = answers[question.id] !== undefined

  const handleAnswer = (value: number) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }))
  }

  const goToNext = () => {
    if (isLastQuestion) {
      const bigFive = calculateBigFive(answers)
      onNext(bigFive)
    } else {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const goToPrev = () => {
    if (currentQuestion === 0) {
      onBack()
    } else {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  return (
    <div className="flex flex-col h-full px-6 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Тест личности</h1>
          <p className="text-sm text-muted-foreground">Помогает найти совместимого партнёра</p>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>
            Вопрос {currentQuestion + 1} из {bigFiveQuestions.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col">
        <div className="bg-card/50 border border-border/50 rounded-2xl p-6 mb-8">
          <p className="text-xl font-medium text-foreground text-center leading-relaxed">{question.text}</p>
        </div>

        {/* Answer options */}
        <div className="flex flex-col gap-3">
          {answerOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className={cn(
                "w-full p-4 rounded-xl text-left transition-all border",
                answers[question.id] === option.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border hover:border-primary/50",
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                    answers[question.id] === option.value ? "border-white bg-white" : "border-muted-foreground",
                  )}
                >
                  {answers[question.id] === option.value && <div className="w-3 h-3 bg-primary rounded-full" />}
                </div>
                <span className="font-medium">{option.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-6">
        <Button onClick={goToPrev} variant="outline" size="icon" className="h-12 w-12 rounded-xl bg-transparent">
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button onClick={goToNext} disabled={!canGoNext} className="flex-1 h-12 rounded-xl">
          {isLastQuestion ? "Завершить тест" : "Далее"}
          {!isLastQuestion && <ChevronRight className="w-4 h-4 ml-2" />}
        </Button>
      </div>
    </div>
  )
}
