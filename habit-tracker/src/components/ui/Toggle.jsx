import { motion } from 'framer-motion'

export const Toggle = ({ checked, onChange, label }) => (
  <label className="flex items-center gap-3 cursor-pointer" onClick={() => onChange(!checked)}>
    <div
      className="relative w-10 h-6 rounded-full transition-colors duration-200"
      style={{ backgroundColor: checked ? 'var(--accent)' : 'var(--border)' }}
    >
      <motion.div
        animate={{ x: checked ? 18 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
      />
    </div>
    {label && <span className="text-sm text-[var(--text-secondary)]">{label}</span>}
  </label>
)
