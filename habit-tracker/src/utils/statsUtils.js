import { format, subDays, parseISO, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns'

export const getWeeklyStats = (completions, habits) => {
  const days = []
  const today = new Date()
  for (let i = 6; i >= 0; i--) {
    const d = subDays(today, i)
    const dateStr = format(d, 'yyyy-MM-dd')
    const dayOfWeek = d.getDay()
    const targetHabits = habits.filter(h => !h.isArchived && h.targetDays.includes(dayOfWeek))
    const done = completions.filter(c => c.date === dateStr && targetHabits.some(h => h.id === c.habitId)).length
    const total = targetHabits.length
    days.push({
      date: dateStr,
      label: format(d, 'EEE'),
      done,
      total,
      rate: total > 0 ? Math.round((done / total) * 100) : 0,
    })
  }
  return days
}

export const getMonthlyStats = (completions, habits, year, month) => {
  const start = startOfMonth(new Date(year, month - 1))
  const end = endOfMonth(start)
  return eachDayOfInterval({ start, end }).map(d => {
    const dateStr = format(d, 'yyyy-MM-dd')
    const dayOfWeek = d.getDay()
    const targetHabits = habits.filter(h => !h.isArchived && h.targetDays.includes(dayOfWeek))
    const done = completions.filter(c => c.date === dateStr && targetHabits.some(h => h.id === c.habitId)).length
    const total = targetHabits.length
    return {
      date: dateStr,
      label: format(d, 'd'),
      done,
      total,
      rate: total > 0 ? Math.round((done / total) * 100) : 0,
    }
  })
}

export const getHabitStats = (completions, habitId) => {
  const hc = completions.filter(c => c.habitId === habitId)
  return { total: hc.length }
}

export const getTodayProgress = (completions, habits) => {
  const today = format(new Date(), 'yyyy-MM-dd')
  const dayOfWeek = new Date().getDay()
  const todayHabits = habits.filter(h => !h.isArchived && h.targetDays.includes(dayOfWeek))
  const done = todayHabits.filter(h => completions.some(c => c.date === today && c.habitId === h.id)).length
  return { done, total: todayHabits.length }
}
