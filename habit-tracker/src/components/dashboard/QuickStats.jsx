import { CheckCircle2, Target, Calendar } from 'lucide-react'

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-4 flex items-center gap-4">
    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}18` }}>
      <Icon size={20} style={{ color }} />
    </div>
    <div>
      <p className="text-2xl font-bold text-[var(--text-primary)]">{value}</p>
      <p className="text-xs text-[var(--text-secondary)]">{label}</p>
    </div>
  </div>
)

export const QuickStats = ({ habits, completions }) => {
  const activeHabits = habits.filter(h => !h.isArchived).length
  const totalDone = completions.length
  const thisWeek = (() => {
    const today = new Date()
    const weekAgo = new Date(today - 7 * 86400000)
    return completions.filter(c => new Date(c.completedAt) >= weekAgo).length
  })()

  return (
    <div className="grid grid-cols-3 gap-4">
      <StatCard icon={Target} label="활성 습관" value={activeHabits} color="var(--accent)" />
      <StatCard icon={CheckCircle2} label="이번 주 완료" value={thisWeek} color="var(--success)" />
      <StatCard icon={Calendar} label="총 완료 횟수" value={totalDone} color="var(--warning)" />
    </div>
  )
}
