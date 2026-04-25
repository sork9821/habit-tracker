import { useState, useEffect } from 'react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { HabitColorPicker } from './HabitColorPicker'
import { CATEGORIES } from '../../constants/categories'
import { HABIT_COLORS } from '../../constants/colors'
import { Heart, BookOpen, Brain, Dumbbell, Users, DollarSign, Palette, Zap } from 'lucide-react'

const ICON_MAP = { Heart, BookOpen, Brain, Dumbbell, Users, DollarSign, Palette, Zap }
const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토']

const defaultForm = {
  name: '',
  description: '',
  category: 'health',
  color: '#6366f1',
  icon: 'Heart',
  targetDays: [0, 1, 2, 3, 4, 5, 6],
}

export const HabitForm = ({ isOpen, onClose, onSubmit, initial }) => {
  const [form, setForm] = useState(defaultForm)

  useEffect(() => {
    if (isOpen) {
      setForm(initial ? { ...defaultForm, ...initial } : defaultForm)
    }
  }, [isOpen, initial])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const toggleDay = (day) => {
    set('targetDays', form.targetDays.includes(day)
      ? form.targetDays.filter(d => d !== day)
      : [...form.targetDays, day])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    onSubmit(form)
    onClose()
  }

  const labelClass = "block text-xs font-medium text-[var(--text-secondary)] mb-1.5"
  const inputClass = "w-full px-3 py-2 bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)] transition-colors"

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initial ? '습관 수정' : '새 습관 추가'}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className={labelClass}>습관 이름 *</label>
          <input
            className={inputClass}
            placeholder="예: 독서 30분"
            value={form.name}
            onChange={e => set('name', e.target.value)}
            required
            autoFocus
          />
        </div>

        <div>
          <label className={labelClass}>설명 (선택)</label>
          <input
            className={inputClass}
            placeholder="예: 잠들기 전 책 읽기"
            value={form.description}
            onChange={e => set('description', e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>카테고리</label>
          <div className="grid grid-cols-4 gap-2">
            {CATEGORIES.map(cat => {
              const Icon = ICON_MAP[cat.icon] || Heart
              const active = form.category === cat.key
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => {
                    set('category', cat.key)
                    set('icon', cat.icon)
                    set('color', cat.color)
                  }}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl border text-xs transition-all cursor-pointer ${
                    active
                      ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]'
                      : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)]/50'
                  }`}
                >
                  <Icon size={16} />
                  {cat.label}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <label className={labelClass}>색상</label>
          <HabitColorPicker value={form.color} onChange={v => set('color', v)} />
        </div>

        <div>
          <label className={labelClass}>반복 요일</label>
          <div className="flex gap-2">
            {DAY_LABELS.map((d, i) => (
              <button
                key={i}
                type="button"
                onClick={() => toggleDay(i)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                  form.targetDays.includes(i)
                    ? 'text-white border-transparent'
                    : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)]/50'
                }`}
                style={form.targetDays.includes(i) ? { backgroundColor: form.color, borderColor: form.color } : {}}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>
            취소
          </Button>
          <Button type="submit" className="flex-1" disabled={!form.name.trim()}>
            {initial ? '수정하기' : '추가하기'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
