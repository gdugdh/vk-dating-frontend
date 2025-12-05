import { type User, currentUser } from "./mock-data"

function jaccardSimilarity(set1: string[], set2: string[]): number {
  const intersection = set1.filter((item) => set2.includes(item)).length
  const union = new Set([...set1, ...set2]).size
  return union === 0 ? 0 : intersection / union
}

function bigFiveDistance(user1: User, user2: User): number {
  const traits = ["openness", "conscientiousness", "extraversion", "agreeableness", "neuroticism"] as const
  let sumSquared = 0

  for (const trait of traits) {
    const diff = user1.bigFive[trait] - user2.bigFive[trait]
    sumSquared += diff * diff
  }

  // Max possible distance is sqrt(5) ≈ 2.236, normalize to 0-1
  const distance = Math.sqrt(sumSquared)
  return 1 - distance / Math.sqrt(5)
}

function preferenceMatch(candidate: User): number {
  let score = 0
  const prefs = currentUser.preferences

  // Age within range
  if (candidate.age >= prefs.ageRange[0] && candidate.age <= prefs.ageRange[1]) {
    score += 0.3
  } else {
    const ageDiff = Math.min(Math.abs(candidate.age - prefs.ageRange[0]), Math.abs(candidate.age - prefs.ageRange[1]))
    score += Math.max(0, 0.3 - ageDiff * 0.03)
  }

  // Distance within range
  if (candidate.distance <= prefs.maxDistance) {
    score += 0.2 * (1 - candidate.distance / prefs.maxDistance)
  }

  // Preferred interests match
  const prefInterestMatch = jaccardSimilarity(prefs.interests, candidate.interests)
  score += 0.5 * prefInterestMatch

  return score
}

export function calculateCompatibility(candidate: User): number {
  const weights = {
    interests: 0.35,
    bigFive: 0.35,
    preferences: 0.3,
  }

  const interestScore = jaccardSimilarity(currentUser.interests, candidate.interests)
  const bigFiveScore = bigFiveDistance(currentUser, candidate)
  const preferenceScore = preferenceMatch(candidate)

  const totalScore =
    weights.interests * interestScore + weights.bigFive * bigFiveScore + weights.preferences * preferenceScore

  // Scale to 45-98% range for realistic display
  return Math.round(45 + totalScore * 53)
}

export function getCommonInterests(candidate: User): string[] {
  return currentUser.interests.filter((interest) => candidate.interests.includes(interest))
}
