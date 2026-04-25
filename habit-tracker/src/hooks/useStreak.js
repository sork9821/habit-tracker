import { useMemo } from 'react'
import { calculateStreak, calculateGlobalStreak } from '../utils/streakUtils'

export const useStreak = (completions, habits) => {
  const globalStreak = useMemo(
    () => calculateGlobalStreak(completions, habits),
    [completions, habits]
  )

  const getHabitStreak = (habitId) => calculateStreak(completions, habitId)

  return { globalStreak, getHabitStreak }
}
