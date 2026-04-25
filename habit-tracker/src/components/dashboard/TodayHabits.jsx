import { motion, AnimatePresence } from 'framer-motion'
import { Check, BookOpen, Brain, Dumbbell, Users, DollarSign, Palette, Zap, Heart, Plus } from 'lucide-react'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'

const ICONS = { Heart, BookOpen, Brain, Dumbbell, Users, DollarSign, Palette, Zap }

export const TodayHabits = ({ habits, completions, onToggle }) => {
  const navigate = useNavigate()
  const today = format(new Date(), 'yyyy-MM-dd')
  const dayOfWeek = new Date().getDay()
  const todayHabits = habits.filter(h => !h.isArchived && h.targetDays.includes(dayOfWeek))

  if (todayHabits.length === 0) {
    return (
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 flex flex-col items-center gap-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[var(--surface-elevated)] flex items-center justify-center">
          <Check size={32} className="text-[var(--text-secondary)]" />
        </div>
        <div>
          <p className="font-semibold text-[var(--text-primary)]">오늘 할 습관이 없어요</p>
          <p className="text-sm text-[var(--text-secondary)] mt-1">첫 번째 습관을 추가해보세요!</p>
        </div>
        <button
          onClick={() => navigate('/habits')}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer border-0"
        >
          <Plus size={16} /> 습관 추가하기
        </button>
      </div>
    )
  }

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-[var(--border)]">
        <h3 className="font-semibold text-[var(--text-primary)]">오늘의 습관</h3>
        <p className="text-xs text-[var(--text-secondary)] mt-0.5">
          {todayHabits.filter(h => completions.some(c => c.date === today && c.habitId === h.id)).length}/{todayHabits.length} 완료
        </p>
      </div>
      <ul className="divide-y divide-[var(--border)]">
        <AnimatePresence>
          {todayHabits.map(habit => {
            const done = completions.some(c => c.date === today && c.habitId === habit.id)
            const Icon = ICONS[habit.icon] || Heart
            return (
              <motion.li
                key={habit.id}
                layout
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-[var(--surface-elevated)] transition-colors cursor-pointer"
                onClick={() => onToggle(habit.id, today)}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${habit.color}22` }}
                >
                  <Icon size={17} style={{ color: habit.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium transition-colors ${done ? 'line-through text-[var(--text-secondary)]' : 'text-[var(--text-primary)]'}`}>
                    {habit.name}
                  </p>
                  {habit.description && (
                    <p className="text-xs text-[var(--text-secondary)] truncate">{habit.description}</p>
                  )}
                </div>
                <motion.div
                  animate={done ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors`}
                  style={{
                    borderColor: done ? habit.color : 'var(--border)',
                    backgroundColor: done ? habit.color : 'transparent',
                  }}
                >
                  {done && <Check size={14} className="text-white" strokeWidth={3} />}
                </motion.div>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </ul>
    </div>
  )
}
