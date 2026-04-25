import { useMemo } from 'react'
import { TodayHabits } from '../components/dashboard/TodayHabits'
import { ProgressRing } from '../components/dashboard/ProgressRing'
import { StreakCard } from '../components/dashboard/StreakCard'
import { QuickStats } from '../components/dashboard/QuickStats'
import { CalendarHeatmap } from '../components/heatmap/CalendarHeatmap'
import { getTodayProgress } from '../utils/statsUtils'
import { calculateGlobalStreak } from '../utils/streakUtils'
import { motion } from 'framer-motion'

export const Dashboard = ({ habits, completions, onToggle }) => {
  const { done, total } = useMemo(() => getTodayProgress(completions, habits), [completions, habits])
  const { current, longest } = useMemo(() => calculateGlobalStreak(completions, habits), [completions, habits])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 max-w-5xl mx-auto"
    >
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">대시보드</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">오늘도 좋은 하루 만들어봐요 🌿</p>
      </div>

      <QuickStats habits={habits} completions={completions} />

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <TodayHabits habits={habits} completions={completions} onToggle={onToggle} />
          <CalendarHeatmap completions={completions} habits={habits} />
        </div>
        <div className="space-y-5">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 flex flex-col items-center">
            <ProgressRing done={done} total={total} />
          </div>
          <StreakCard current={current} longest={longest} />
        </div>
      </div>
    </motion.div>
  )
}
