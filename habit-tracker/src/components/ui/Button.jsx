import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white',
  secondary: 'bg-[var(--surface-elevated)] hover:bg-[var(--border)] text-[var(--text-primary)]',
  ghost: 'hover:bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
  danger: 'bg-[var(--danger)] hover:opacity-90 text-white',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  icon: 'p-2',
}

export const Button = ({ variant = 'primary', size = 'md', className = '', children, ...props }) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    className={`
      inline-flex items-center gap-2 rounded-lg font-medium
      transition-colors duration-150 cursor-pointer border-0 outline-none
      disabled:opacity-50 disabled:cursor-not-allowed
      ${variants[variant]} ${sizes[size]} ${className}
    `}
    {...props}
  >
    {children}
  </motion.button>
)
