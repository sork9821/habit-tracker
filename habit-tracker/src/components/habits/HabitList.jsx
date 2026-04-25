import { AnimatePresence } from 'framer-motion'
import { HabitCard } from './HabitCard'

export const HabitList = ({ habits, completions, onEdit, onDelete, onArchive }) => {
  if (habits.length === 0) return null

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {habits.map(habit => (
          <HabitCard
            key={habit.id}
            habit={habit}
            completions={completions}
            onEdit={onEdit}
            onDelete={onDelete}
            onArchive={onArchive}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
