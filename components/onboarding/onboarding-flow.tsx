"use client"

import { useState } from "react"
import { WelcomeStep } from "./welcome-step"
import { InterestsStep } from "./interests-step"
import { BioStep } from "./bio-step"
import { BigFiveStep } from "./big-five-step"
import { CompletionStep } from "./completion-step"

type OnboardingStep = "welcome" | "interests" | "bio" | "bigfive" | "completion"

interface OnboardingData {
  interests: string[]
  bio: string
  bigFive: {
    openness: number
    conscientiousness: number
    extraversion: number
    agreeableness: number
    neuroticism: number
  } | null
}

interface OnboardingFlowProps {
  userName: string
  onComplete: (data: OnboardingData) => void
}

export function OnboardingFlow({ userName, onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState<OnboardingStep>("welcome")
  const [data, setData] = useState<OnboardingData>({
    interests: [],
    bio: "",
    bigFive: null,
  })

  const handleInterestsNext = (interests: string[]) => {
    setData((prev) => ({ ...prev, interests }))
    setStep("bio")
  }

  const handleBioNext = (bio: string) => {
    setData((prev) => ({ ...prev, bio }))
    setStep("bigfive")
  }

  const handleBigFiveNext = (bigFive: OnboardingData["bigFive"]) => {
    setData((prev) => ({ ...prev, bigFive }))
    setStep("completion")
  }

  const handleComplete = () => {
    onComplete(data)
  }

  return (
    <div className="h-dvh bg-background max-w-md mx-auto">
      {step === "welcome" && <WelcomeStep userName={userName} onNext={() => setStep("interests")} />}
      {step === "interests" && (
        <InterestsStep
          initialInterests={data.interests}
          onNext={handleInterestsNext}
          onBack={() => setStep("welcome")}
        />
      )}
      {step === "bio" && <BioStep initialBio={data.bio} onNext={handleBioNext} onBack={() => setStep("interests")} />}
      {step === "bigfive" && <BigFiveStep onNext={handleBigFiveNext} onBack={() => setStep("bio")} />}
      {step === "completion" && <CompletionStep onComplete={handleComplete} />}
    </div>
  )
}
