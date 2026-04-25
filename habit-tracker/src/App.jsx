import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Dashboard } from './pages/Dashboard'
import { Habits } from './pages/Habits'
import { Analytics } from './pages/Analytics'
import { useHabits } from './hooks/useHabits'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggle } = useTheme()
  const {
    habits,
    completions,
    addHabit,
    updateHabit,
    deleteHabit,
    archiveHabit,
    toggleCompletion,
  } = useHabits()

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout theme={theme} onToggleTheme={toggle} />}>
          <Route
            path="/"
            element={
              <Dashboard
                habits={habits}
                completions={completions}
                onToggle={toggleCompletion}
              />
            }
          />
          <Route
            path="/habits"
            element={
              <Habits
                habits={habits}
                completions={completions}
                onAdd={addHabit}
                onUpdate={updateHabit}
                onDelete={deleteHabit}
                onArchive={archiveHabit}
              />
            }
          />
          <Route
            path="/analytics"
            element={
              <Analytics
                habits={habits}
                completions={completions}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
