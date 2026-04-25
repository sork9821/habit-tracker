import { motion } from 'framer-motion'
import { Trophy, Flame, Star, Zap, Award, Target } from 'lucide-react'

const BADGES = [
  { id: 'first', label: '첫 완료', desc: '처음으로 습관 완료', icon: Star, color: '#f59e0b', req: (total) => total >= 1 },
  { id: 'week', label: '7일 연속', desc: '7일 연속 달성', icon: Flame, color: '#f97316', req: (_, longest) => longest >= 7 },
  { id: 'month', label: '30일 연속', desc: '30일 연속 달성', icon: Trophy, color: '#eab308', req: (_, longest) => longest >= 30 },
  { id: '50', label: '50회 달성', desc: '총 50회 완료', icon: Target, color: '#6366f1', req: (total) => total >= 50 },
  { id: '100', label: '100회 달성', desc: '총 100회 완료', icon: Award, color: '#06b6d4', req: (total) => total >= 100 },
  { id: '365', label: '1년 연속', desc: '365일 연속 달성', icon: Zap, color: '#a855f7', req: (_, longest) => longest >= 365 },
]

export const AchievementBadge = ({ totalCompletions, longestStreak }) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {BADGES.map((badge, i) => {
        const unlocked = badge.req(totalCompletions, longestStreak)
        const Icon = badge.icon
        return (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border text-center ${
              unlocked
                ? 'border-[var(--border)] bg-[var(--surface)]'
                : 'border-[var(--border)] bg-[var(--surface)] opacity-40'
            }`}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: unlocked ? `${badge.color}22` : 'var(--surface-elevated)' }}
            >
              <Icon size={22} style={{ color: unlocked ? badge.color : 'var(--text-secondary)' }} />
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--text-primary)]">{badge.label}</p>
              <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">{badge.desc}</p>
            </div>
            {unlocked && (
              <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: `${badge.color}22`, color: badge.color }}>
                달성!
              </span>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
