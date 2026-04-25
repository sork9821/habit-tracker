import { NavLink } from 'react-router-dom'
import { LayoutDashboard, CheckSquare, BarChart2, Flame } from 'lucide-react'
import { motion } from 'framer-motion'

const NAV = [
  { to: '/', icon: LayoutDashboard, label: '대시보드' },
  { to: '/habits', icon: CheckSquare, label: '습관 관리' },
  { to: '/analytics', icon: BarChart2, label: '분석' },
]

export const Sidebar = () => (
  <aside className="w-64 shrink-0 border-r border-[var(--border)] bg-[var(--surface)] flex flex-col h-full">
    <div className="p-6 border-b border-[var(--border)]">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[var(--accent)] flex items-center justify-center">
          <Flame size={18} className="text-white" />
        </div>
        <div>
          <p className="font-bold text-[var(--text-primary)] text-base leading-none">HabitFlow</p>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">습관을 만들어가요</p>
        </div>
      </div>
    </div>

    <nav className="flex-1 p-4 space-y-1">
      {NAV.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
              isActive
                ? 'bg-[var(--accent)] text-white shadow-lg'
                : 'text-[var(--text-secondary)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-primary)]'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Icon size={18} />
              {label}
            </>
          )}
        </NavLink>
      ))}
    </nav>

    <div className="p-4 border-t border-[var(--border)]">
      <p className="text-xs text-[var(--text-secondary)] text-center">매일 조금씩 성장하기</p>
    </div>
  </aside>
)
