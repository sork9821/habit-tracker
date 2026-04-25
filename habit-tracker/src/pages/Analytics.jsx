import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { WeeklyChart } from '../components/analytics/WeeklyChart'
import { MonthlyChart } from '../components/analytics/MonthlyChart'
import { AchievementBadge } from '../components/analytics/AchievementBadge'
import { getWeeklyStats, getMonthlyStats } from '../utils/statsUtils'
import { calculateStreak } from '../utils/streakUtils'
import { format } from 'date-fns'
import { Flame, CheckCircle2, Target, TrendingUp } from 'lucide-react'
import { Heart, BookOpen, Brain, Dumbbell, Users, DollarSign, Palette, Zap } from 'lucide-react'

const ICONS = { Heart, BookOpen, Brain, Dumbbell, Users, DollarSign, Palette, Zap }

export const Analytics = ({ habits, completions }) => {
  const [view, setView] = useState('weekly')
  const now = new Date()

  const weeklyData = useMemo(() => getWeeklyStats(completions, habits), [completions, habits])
  const monthlyData = useMemo(() => getMonthlyStats(completions, habits, now.getFullYear(), now.getMonth() + 1), [completions, habits])

  const totalCompletions = completions.length
  const longestStreak = useMemo(() => {
    if (!habits.length) return 0
    return Math.max(0, ...habits.map(h => calculateStreak(completions, h.id).longest))
  }, [completions, habits])

  const activeHabits = habits.filter(h => !h.isArchived)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">분석</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">나의 습관 패턴을 확인해보세요</p>
      </div>

      {/* Chart */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-[var(--text-primary)]">달성률 추이</h2>
          <div className="flex bg-[var(--surface-elevated)] rounded-xl p-1 gap-1">
            {['weekly', 'monthly'].map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer border-0 ${
                  view === v
                    ? 'bg-[var(--accent)] text-white'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {v === 'weekly' ? '주간' : '월간'}
              </button>
            ))}
          </div>
        </div>
        {view === 'weekly' ? <WeeklyChart data={weeklyData} /> : <MonthlyChart data={monthlyData} />}
      </div>

      {/* Per-habit stats */}
      {activeHabits.length > 0 && (
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5">
          <h2 className="font-semibold text-[var(--text-primary)] mb-4">습관별 통계</h2>
          <div className="space-y-3">
            {activeHabits.map(habit => {
              const Icon = ICONS[habit.icon] || Heart
              const { current, longest } = calculateStreak(completions, habit.id)
              const total = completions.filter(c => c.habitId === habit.id).length
              const rate = (() => {
                const daysSince = Math.max(1, Math.floor((Date.now() - new Date(habit.createdAt)) / 86400000))
                return Math.min(100, Math.round((total / daysSince) * 100))
              })()
              return (
                <div key={habit.id} className="flex items-center gap-4 p-4 bg-[var(--surface-elevated)] rounded-xl">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${habit.color}22` }}
                  >
                    <Icon size={18} style={{ color: habit.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)] truncate">{habit.name}</p>
                    <div className="mt-1.5 h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${rate}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: habit.color }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 shrink-0 text-center">
                    <div>
                      <p className="text-sm font-bold text-[var(--text-primary)]">{total}</p>
                      <p className="text-[10px] text-[var(--text-secondary)]">총 완료</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-orange-400">{current}</p>
                      <p className="text-[10px] text-[var(--text-secondary)]">현재</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-yellow-400">{longest}</p>
                      <p className="text-[10px] text-[var(--text-secondary)]">최장</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Achievements */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5">
        <h2 className="font-semibold text-[var(--text-primary)] mb-4">성취 뱃지</h2>
        <AchievementBadge totalCompletions={totalCompletions} longestStreak={longestStreak} />
      </div>
    </motion.div>
  )
}
