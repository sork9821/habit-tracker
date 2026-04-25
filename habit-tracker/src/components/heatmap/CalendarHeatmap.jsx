import { useState, useMemo } from 'react'
import { format, subDays, startOfWeek, eachDayOfInterval, getDay } from 'date-fns'
import { ko } from 'date-fns/locale'
import { motion } from 'framer-motion'
import { Tooltip } from '../ui/Tooltip'
import { Heart, BookOpen, Brain, Dumbbell, Users, DollarSign, Palette, Zap } from 'lucide-react'

const ICONS = { Heart, BookOpen, Brain, Dumbbell, Users, DollarSign, Palette, Zap }
const DAYS_KR = ['일', '월', '화', '수', '목', '금', '토']
const WEEKS_COUNT = 17

const MonthlyView = ({ completions, habits }) => {
  const { cells, weeks, monthLabels } = useMemo(() => {
    const today = new Date()
    const totalDays = WEEKS_COUNT * 7
    const start = subDays(today, totalDays - 1)
    const days = eachDayOfInterval({ start, end: today })

    const rawCells = days.map(day => {
      const dateStr = format(day, 'yyyy-MM-dd')
      const dayOfWeek = getDay(day)
      const targetHabits = habits.filter(h => !h.isArchived && h.targetDays.includes(dayOfWeek))
      const done = completions.filter(c => c.date === dateStr && targetHabits.some(h => h.id === c.habitId)).length
      const total = targetHabits.length
      const intensity = total > 0 ? done / total : 0
      return { dateStr, done, total, intensity, day }
    })

    const firstDay = rawCells.length > 0 ? getDay(rawCells[0].day) : 0
    const padded = [...Array(firstDay).fill(null), ...rawCells]
    const wks = []
    for (let i = 0; i < padded.length; i += 7) wks.push(padded.slice(i, i + 7))

    const labels = []
    let lastMonth = -1
    wks.forEach((week, wi) => {
      const firstReal = week.find(c => c !== null)
      if (firstReal) {
        const m = firstReal.day.getMonth()
        if (m !== lastMonth) {
          lastMonth = m
          labels.push({ wi, label: format(firstReal.day, 'M월') })
        }
      }
    })

    return { cells: rawCells, weeks: wks, monthLabels: labels }
  }, [completions, habits])

  const getCellColor = (intensity, done, total) => {
    if (total === 0 || done === 0) return 'var(--surface-elevated)'
    if (intensity < 0.25) return '#6366f133'
    if (intensity < 0.5) return '#6366f155'
    if (intensity < 0.75) return '#6366f188'
    return '#6366f1'
  }

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full">
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
          <div className="flex flex-col gap-[1px] mr-1">
            {DAYS_KR.map((d, i) => (
              <div key={d} className="w-5 h-[14px] flex items-center justify-end pr-1">
                <span className="text-[9px] text-[var(--text-secondary)]">{i % 2 === 1 ? d : ''}</span>
              </div>
            ))}
          </div>

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
  )
}

const WeeklyView = ({ completions, habits }) => {
  const today = new Date()
  const todayStr = format(today, 'yyyy-MM-dd')

  const weekDays = useMemo(() => {
    const weekStart = startOfWeek(today, { weekStartsOn: 0 })
    return eachDayOfInterval({ start: weekStart, end: new Date(weekStart.getTime() + 6 * 86400000) })
  }, [])

  const activeHabits = habits.filter(h => !h.isArchived)

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[480px]">
        {/* Day column headers */}
        <div className="flex items-end mb-3 pl-40">
          {weekDays.map(day => {
            const dateStr = format(day, 'yyyy-MM-dd')
            const isToday = dateStr === todayStr
            return (
              <div key={dateStr} className="flex-1 text-center">
                <p className={`text-[10px] font-medium mb-0.5 ${isToday ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}>
                  {DAYS_KR[getDay(day)]}
                </p>
                <p className={`text-sm font-bold ${isToday ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'}`}>
                  {format(day, 'd')}
                </p>
              </div>
            )
          })}
        </div>

        {/* Habit rows */}
        <div className="space-y-1.5">
          {activeHabits.length === 0 ? (
            <p className="text-sm text-[var(--text-secondary)] text-center py-8">습관이 없어요</p>
          ) : (
            activeHabits.map((habit, hi) => {
              const Icon = ICONS[habit.icon] || Heart
              return (
                <motion.div
                  key={habit.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: hi * 0.04 }}
                  className="flex items-center"
                >
                  {/* Habit label */}
                  <div className="w-40 shrink-0 flex items-center gap-2 pr-3">
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${habit.color}22` }}
                    >
                      <Icon size={12} style={{ color: habit.color }} />
                    </div>
                    <p className="text-xs text-[var(--text-primary)] truncate">{habit.name}</p>
                  </div>

                  {/* Day cells */}
                  {weekDays.map(day => {
                    const dateStr = format(day, 'yyyy-MM-dd')
                    const dayOfWeek = getDay(day)
                    const isTargetDay = habit.targetDays.includes(dayOfWeek)
                    const isCompleted = completions.some(c => c.habitId === habit.id && c.date === dateStr)
                    const isToday = dateStr === todayStr
                    const isFuture = dateStr > todayStr

                    let bg = 'transparent'
                    let border = 'none'
                    if (isCompleted) {
                      bg = `${habit.color}30`
                    } else if (isTargetDay && !isFuture) {
                      bg = 'var(--surface-elevated)'
                    }
                    if (isToday && isTargetDay) {
                      border = `1.5px solid ${habit.color}66`
                    }

                    return (
                      <div key={dateStr} className="flex-1 flex justify-center py-0.5">
                        <Tooltip content={`${format(day, 'M/d')} · ${habit.name} · ${isCompleted ? '완료 ✓' : isTargetDay ? (isFuture ? '예정' : '미완료') : '해당 없음'}`}>
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                            style={{ backgroundColor: bg, border }}
                          >
                            {isCompleted ? (
                              <div
                                className="w-4 h-4 rounded-full shadow-sm"
                                style={{ backgroundColor: habit.color }}
                              />
                            ) : isTargetDay && !isFuture ? (
                              <div
                                className="w-3 h-3 rounded-full border"
                                style={{ borderColor: 'var(--border)' }}
                              />
                            ) : isTargetDay && isFuture ? (
                              <div
                                className="w-2.5 h-2.5 rounded-full opacity-30"
                                style={{ backgroundColor: habit.color }}
                              />
                            ) : null}
                          </div>
                        </Tooltip>
                      </div>
                    )
                  })}
                </motion.div>
              )
            })
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-5 mt-4 pt-3 border-t border-[var(--border)]">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full bg-[var(--accent)]" />
            <span className="text-[10px] text-[var(--text-secondary)]">완료</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full border border-[var(--border)]" />
            <span className="text-[10px] text-[var(--text-secondary)]">미완료</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full opacity-30 bg-[var(--text-secondary)]" />
            <span className="text-[10px] text-[var(--text-secondary)]">예정</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-xl" />
            <span className="text-[10px] text-[var(--text-secondary)]">해당 없음</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export const CalendarHeatmap = ({ completions, habits }) => {
  const [mode, setMode] = useState('monthly')

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[var(--text-primary)]">활동 히트맵</h3>
        <div className="flex bg-[var(--surface-elevated)] rounded-xl p-1 gap-1">
          {['monthly', 'weekly'].map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer border-0 ${
                mode === m
                  ? 'bg-[var(--accent)] text-white'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {m === 'monthly' ? '월간' : '주간'}
            </button>
          ))}
        </div>
      </div>
      {mode === 'monthly'
        ? <MonthlyView completions={completions} habits={habits} />
        : <WeeklyView completions={completions} habits={habits} />
      }
    </div>
  )
}
