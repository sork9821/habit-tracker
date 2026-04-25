import { useState } from 'react'
import { Plus, LayoutGrid } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { HabitList } from '../components/habits/HabitList'
import { HabitForm } from '../components/habits/HabitForm'
import { Toggle } from '../components/ui/Toggle'

export const Habits = ({ habits, completions, onAdd, onUpdate, onDelete, onArchive }) => {
  const [formOpen, setFormOpen] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [showArchived, setShowArchived] = useState(false)

  const handleEdit = (habit) => {
    setEditTarget(habit)
    setFormOpen(true)
  }

  const handleClose = () => {
    setFormOpen(false)
    setEditTarget(null)
  }

  const handleSubmit = (data) => {
    if (editTarget) {
      onUpdate(editTarget.id, data)
    } else {
      onAdd(data)
    }
  }

  const visible = habits.filter(h => showArchived ? true : !h.isArchived)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">습관 관리</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            {habits.filter(h => !h.isArchived).length}개의 활성 습관
          </p>
        </div>
        <Button onClick={() => setFormOpen(true)}>
          <Plus size={16} /> 습관 추가
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <Toggle
          checked={showArchived}
          onChange={setShowArchived}
          label="보관된 습관 보기"
        />
      </div>

      {visible.length === 0 ? (
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-12 flex flex-col items-center gap-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[var(--surface-elevated)] flex items-center justify-center">
            <LayoutGrid size={32} className="text-[var(--text-secondary)]" />
          </div>
          <div>
            <p className="font-semibold text-[var(--text-primary)]">습관이 없어요</p>
            <p className="text-sm text-[var(--text-secondary)] mt-1">첫 번째 습관을 추가해서 시작해보세요!</p>
          </div>
          <Button onClick={() => setFormOpen(true)}>
            <Plus size={16} /> 첫 습관 추가하기
          </Button>
        </div>
      ) : (
        <HabitList
          habits={visible}
          completions={completions}
          onEdit={handleEdit}
          onDelete={onDelete}
          onArchive={onArchive}
        />
      )}

      <HabitForm
        isOpen={formOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        initial={editTarget}
      />
    </motion.div>
  )
}
