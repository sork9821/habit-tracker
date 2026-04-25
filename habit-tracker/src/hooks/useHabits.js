import { useLocalStorage } from './useLocalStorage'
import { format } from 'date-fns'

const genId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`

export const useHabits = () => {
  const [habits, setHabits] = useLocalStorage('habit-habits', [])
  const [completions, setCompletions] = useLocalStorage('habit-completions', [])

  const addHabit = (data) => {
    const habit = {
      id: genId(),
      name: data.name,
      description: data.description || '',
      category: data.category || 'health',
      color: data.color || '#6366f1',
      icon: data.icon || 'Heart',
      frequency: 'daily',
      targetDays: data.targetDays || [0, 1, 2, 3, 4, 5, 6],
      createdAt: new Date().toISOString(),
      isArchived: false,
      order: habits.length,
    }
    setHabits(prev => [...prev, habit])
    return habit
  }

  const updateHabit = (id, data) => {
    setHabits(prev => prev.map(h => h.id === id ? { ...h, ...data } : h))
  }

  const deleteHabit = (id) => {
    setHabits(prev => prev.filter(h => h.id !== id))
    setCompletions(prev => prev.filter(c => c.habitId !== id))
  }

  const archiveHabit = (id) => {
    setHabits(prev => prev.map(h => h.id === id ? { ...h, isArchived: !h.isArchived } : h))
  }

  const toggleCompletion = (habitId, dateStr) => {
    const existing = completions.find(c => c.habitId === habitId && c.date === dateStr)
    if (existing) {
      setCompletions(prev => prev.filter(c => !(c.habitId === habitId && c.date === dateStr)))
    } else {
      setCompletions(prev => [...prev, {
        id: genId(),
        habitId,
        date: dateStr,
        completedAt: new Date().toISOString(),
        note: '',
      }])
    }
  }

  const isCompleted = (habitId, dateStr) =>
    completions.some(c => c.habitId === habitId && c.date === dateStr)

  return {
    habits,
    completions,
    addHabit,
    updateHabit,
    deleteHabit,
    archiveHabit,
    toggleCompletion,
    isCompleted,
  }
}
