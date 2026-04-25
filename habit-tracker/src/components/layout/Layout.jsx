import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

export const Layout = ({ theme, onToggleTheme }) => (
  <div className="flex h-screen overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
    <Sidebar />
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      <Header theme={theme} onToggleTheme={onToggleTheme} />
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  </div>
)
