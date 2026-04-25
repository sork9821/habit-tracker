import { parseISO, isSameDay, subDays, format } from 'date-fns'

export const calculateStreak = (completions, habitId) => {
  const habitCompletions = completions
    .filter(c => c.habitId === habitId)
    .map(c => c.date)
    .sort()
    .reverse()

  if (habitCompletions.length === 0) return { current: 0, longest: 0 }

  let currentStreak = 0
  let longestStreak = 0
  let tempStreak = 1
  let checkDate = new Date()

  const todayStr = format(checkDate, 'yyyy-MM-dd')
  const hasToday = habitCompletions.includes(todayStr)
  const yesterdayStr = format(subDays(checkDate, 1), 'yyyy-MM-dd')
  const hasYesterday = habitCompletions.includes(yesterdayStr)

  if (hasToday) {
    currentStreak = 1
    for (let i = 1; i < 365; i++) {
      const d = format(subDays(checkDate, i), 'yyyy-MM-dd')
      if (habitCompletions.includes(d)) {
        currentStreak++
      } else {
        break
      }
    }
  } else if (hasYesterday) {
    currentStreak = 1
    for (let i = 2; i < 365; i++) {
      const d = format(subDays(checkDate, i), 'yyyy-MM-dd')
      if (habitCompletions.includes(d)) {
        currentStreak++
      } else {
        break
      }
    }
  }

  // Calculate longest streak
  const sorted = [...habitCompletions].sort()
  if (sorted.length > 0) {
    let streak = 1
    longestStreak = 1
    for (let i = 1; i < sorted.length; i++) {
      const prev = parseISO(sorted[i - 1])
      const curr = parseISO(sorted[i])
      const diff = (curr - prev) / (1000 * 60 * 60 * 24)
      if (diff === 1) {
        streak++
        longestStreak = Math.max(longestStreak, streak)
      } else if (diff > 1) {
        streak = 1
      }
    }
  }

  return { current: currentStreak, longest: Math.max(longestStreak, currentStreak) }
}

export const calculateGlobalStreak = (completions, habits) => {
  if (!habits.length) return { current: 0, longest: 0 }

  const activeHabits = habits.filter(h => !h.isArchived)
  if (!activeHabits.length) return { current: 0, longest: 0 }

  const checkDate = new Date()
  let currentStreak = 0

  for (let i = 0; i < 365; i++) {
    const d = format(subDays(checkDate, i), 'yyyy-MM-dd')
    const dayCompletions = completions.filter(c => c.date === d)
    const completedHabits = new Set(dayCompletions.map(c => c.habitId))
    const targetHabits = activeHabits.filter(h => {
      const dayOfWeek = parseISO(d).getDay()
      return h.targetDays.includes(dayOfWeek)
    })
    if (targetHabits.length === 0) continue
    const allDone = targetHabits.every(h => completedHabits.has(h.id))
    if (allDone) {
      if (i === 0 || currentStreak > 0) currentStreak++
    } else {
      if (i > 0) break
    }
  }

  return { current: currentStreak, longest: currentStreak }
}
