import { motion } from 'framer-motion'
import { Edit2, Trash2, Archive, ArchiveRestore, Heart, BookOpen, Brain, Dumbbell, Users, DollarSign, Palette, Zap, Flame } from 'lucide-react'
import { calculateStreak } from '../../utils/streakUtils'

const ICONS = { Heart, BookOpen, Brain, Dumbbell, Users, DollarSign, Palette, Zap }
const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토']

export const HabitCard = ({ habit, completions, onEdit, onDelete, onArchive }) => {
  const Icon = ICONS[habit.icon] || Heart
  const { current } = calculateStreak(completions, habit.id)
  const totalDone = completions.filter(c => c.habitId === habit.id).length

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      className={`bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden ${habit.isArchived ? 'opacity-60' : ''}`}
    >
      <div className="flex items-start gap-4 p-5" style={{ borderLeft: `4px solid ${habit.color}` }}>
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${habit.color}22` }}
        >
          <Icon size={20} style={{ color: habit.color }} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="font-semibold text-[var(--text-primary)] truncate">{habit.name}</h3>
            {habit.isArchived && (
              <span className="text-[10px] px-1.5 py-0.5 bg-[var(--surface-elevated)] text-[var(--text-secondary)] rounded-md shrink-0">보관됨</span>
            )}
          </div>
          {habit.description && (
            <p className="text-xs text-[var(--text-secondary)] truncate mb-2">{habit.description}</p>
          )}

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Flame size={12} className="text-orange-400" />
              <span className="text-xs text-[var(--text-secondary)]">{current}일 연속</span>
            </div>
            <span className="text-[var(--border)]">·</span>
            <span className="text-xs text-[var(--text-secondary)]">총 {totalDone}회</span>
            <span className="text-[var(--border)]">·</span>
            <div className="flex gap-0.5">
              {DAY_LABELS.map((d, i) => (
                <span
                  key={i}
                  className="text-[9px] w-4 h-4 rounded flex items-center justify-center"
                  style={{
                    backgroundColor: habit.targetDays.includes(i) ? `${habit.color}33` : 'var(--surface-elevated)',
                    color: habit.targetDays.includes(i) ? habit.color : 'var(--text-secondary)',
                  }}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onEdit(habit)}
            className="p-1.5 rounded-lg hover:bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer border-0"
          >
            <Edit2 size={15} />
          </button>
          <button
            onClick={() => onArchive(habit.id)}
            className="p-1.5 rounded-lg hover:bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer border-0"
          >
            {habit.isArchived ? <ArchiveRestore size={15} /> : <Archive size={15} />}
          </button>
          <button
            onClick={() => onDelete(habit.id)}
            className="p-1.5 rounded-lg hover:bg-red-500/10 text-[var(--text-secondary)] hover:text-red-400 transition-colors cursor-pointer border-0"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
