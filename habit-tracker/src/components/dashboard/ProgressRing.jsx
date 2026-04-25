import { motion } from 'framer-motion'

export const ProgressRing = ({ done, total }) => {
  const pct = total > 0 ? done / total : 0
  const r = 54
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - pct)

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-36 h-36 flex items-center justify-center">
        <svg width="144" height="144" className="rotate-[-90deg]">
          <circle cx="72" cy="72" r={r} fill="none" stroke="var(--border)" strokeWidth="10" />
          <motion.circle
            cx="72"
            cy="72"
            r={r}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-[var(--text-primary)]">
            {Math.round(pct * 100)}%
          </span>
          <span className="text-xs text-[var(--text-secondary)]">{done}/{total}</span>
        </div>
      </div>
      <p className="text-sm text-[var(--text-secondary)]">오늘 달성률</p>
    </div>
  )
}
