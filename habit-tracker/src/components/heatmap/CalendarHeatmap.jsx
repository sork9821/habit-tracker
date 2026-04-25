import { useMemo } from 'react'
import { format, subDays, startOfWeek, eachDayOfInterval, getDay } from 'date-fns'
import { ko } from 'date-fns/locale'
import { motion } from 'framer-motion'
import { Tooltip } from '../ui/Tooltip'

const DAYS = ['일', '월', '화', '수', '목', '금', '토']
const WEEKS = 17

export const CalendarHeatmap = ({ completions, habits }) => {
  const cells = useMemo(() => {
    const today = new Date()
    const totalDays = WEEKS * 7
    const start = subDays(today, totalDays - 1)
    const days = eachDayOfInterval({ start, end: today })

    return days.map(day => {
      const dateStr = format(day, 'yyyy-MM-dd')
      const dayOfWeek = getDay(day)
      const targetHabits = habits.filter(h => !h.isArchived && h.targetDays.includes(dayOfWeek))
      const done = completions.filter(c => c.date === dateStr && targetHabits.some(h => h.id === c.habitId)).length
      const total = targetHabits.length
      const intensity = total > 0 ? done / total : 0
      return { dateStr, done, total, intensity, day }
    })
  }, [completions, habits])

  const getCellColor = (intensity, done, total) => {
    if (total === 0) return 'var(--surface-elevated)'
    if (done === 0) return 'var(--surface-elevated)'
    if (intensity < 0.25) return '#6366f133'
    if (intensity < 0.5) return '#6366f155'
    if (intensity < 0.75) return '#6366f188'
    return '#6366f1'
  }

  const firstDay = cells.length > 0 ? getDay(cells[0].day) : 0
  const paddedCells = [...Array(firstDay).fill(null), ...cells]

  const weeks = []
  for (let i = 0; i < paddedCells.length; i += 7) {
    weeks.push(paddedCells.slice(i, i + 7))
  }

  const monthLabels = useMemo(() => {
    const labels = []
    let lastMonth = -1
    weeks.forEach((week, wi) => {
      const firstReal = week.find(c => c !== null)
      if (firstReal) {
        const m = firstReal.day.getMonth()
        if (m !== lastMonth) {
          lastMonth = m
          labels.push({ wi, label: format(firstReal.day, 'M월') })
        }
      }
    })
    return labels
  }, [weeks])

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5">
      <h3 className="font-semibold text-[var(--text-primary)] mb-4">활동 히트맵</h3>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Month labels */}
          <div className="flex mb-1 ml-7">
            {weeks.map((_, wi) => {
              const ml = monthLabels.find(l => l.wi === wi)
              return (
                <div key={wi} className="w-[14px] mx-[1px] text-[10px] text-[var(--text-secondary)] shrink-0">
                  {ml?.label || ''}
                </div>
              )
            })}
          </div>

          <div className="flex gap-0.5">
            {/* Day labels */}
            <div className="flex flex-col gap-[1px] mr-1">
              {DAYS.map((d, i) => (
                <div key={d} className="w-5 h-[14px] flex items-center justify-end pr-1">
                  <span className="text-[9px] text-[var(--text-secondary)]">
                    {i % 2 === 1 ? d : ''}
                  </span>
                </div>
              ))}
            </div>

            {/* Grid */}
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[1px]">
                {week.map((cell, di) => (
                  <div key={di} className="w-[14px] h-[14px]">
                    {cell ? (
                      <Tooltip content={`${format(cell.day, 'M/d')} — ${cell.done}/${cell.total} 완료`}>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: wi * 0.005 }}
                          className="w-[14px] h-[14px] rounded-sm cursor-default"
                          style={{ backgroundColor: getCellColor(cell.intensity, cell.done, cell.total) }}
                        />
                      </Tooltip>
                    ) : (
                      <div className="w-[14px] h-[14px]" />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-3 justify-end">
            <span className="text-[10px] text-[var(--text-secondary)]">적음</span>
            {[0, 0.25, 0.5, 0.75, 1].map(v => (
              <div
                key={v}
                className="w-[14px] h-[14px] rounded-sm"
                style={{ backgroundColor: v === 0 ? 'var(--surface-elevated)' : getCellColor(v, 1, 1) }}
              />
            ))}
            <span className="text-[10px] text-[var(--text-secondary)]">많음</span>
          </div>
        </div>
      </div>
    </div>
  )
}
