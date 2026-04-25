import { Flame, Trophy } from 'lucide-react'
import { motion } from 'framer-motion'

export const StreakCard = ({ current, longest }) => (
  <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5">
    <p className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider mb-4">스트릭</p>
    <div className="flex gap-6">
      <div className="flex-1 flex flex-col items-center gap-1">
        <motion.div
          animate={{ scale: current > 0 ? [1, 1.1, 1] : 1 }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center"
        >
          <Flame size={24} className="text-orange-400" />
        </motion.div>
        <span className="text-3xl font-bold text-[var(--text-primary)]">{current}</span>
        <span className="text-xs text-[var(--text-secondary)]">현재 스트릭</span>
      </div>
      <div className="w-px bg-[var(--border)]" />
      <div className="flex-1 flex flex-col items-center gap-1">
        <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center">
          <Trophy size={24} className="text-yellow-400" />
        </div>
        <span className="text-3xl font-bold text-[var(--text-primary)]">{longest}</span>
        <span className="text-xs text-[var(--text-secondary)]">최장 스트릭</span>
      </div>
    </div>
  </div>
)
