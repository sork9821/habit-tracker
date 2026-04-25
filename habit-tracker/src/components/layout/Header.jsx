import { Sun, Moon, PanelLeft } from 'lucide-react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { motion } from 'framer-motion'

export const Header = ({ theme, onToggleTheme, sidebarOpen, onToggleSidebar }) => (
  <header className="h-16 px-6 border-b border-[var(--border)] bg-[var(--surface)] flex items-center justify-between shrink-0">
    <div className="flex items-center gap-3">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onToggleSidebar}
        title={sidebarOpen ? '사이드바 숨기기' : '사이드바 보이기'}
        className="p-2 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
      >
        <PanelLeft size={18} />
      </motion.button>
      <p className="text-sm text-[var(--text-secondary)]">
        {format(new Date(), 'yyyy년 M월 d일 EEEE', { locale: ko })}
      </p>
    </div>
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onToggleTheme}
      className="p-2 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </motion.button>
  </header>
)
