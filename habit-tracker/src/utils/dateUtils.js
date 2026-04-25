import { format, startOfDay, parseISO, isToday, isSameDay, subDays, eachDayOfInterval, startOfWeek, endOfWeek, startOfMonth, endOfMonth, differenceInDays, isValid } from 'date-fns'
import { ko } from 'date-fns/locale'

export const toDateString = (date) => format(date, 'yyyy-MM-dd')

export const todayString = () => toDateString(new Date())

export const formatDisplayDate = (date) => format(date, 'M월 d일 EEEE', { locale: ko })

export const getLast12Weeks = () => {
  const today = new Date()
  const start = subDays(today, 83) // ~12 weeks
  return eachDayOfInterval({ start, end: today })
}

export const getWeekDays = (weekStart = 1) => {
  const today = new Date()
  const start = startOfWeek(today, { weekStartsOn: weekStart })
  const end = endOfWeek(today, { weekStartsOn: weekStart })
  return eachDayOfInterval({ start, end })
}

export const getMonthDays = () => {
  const today = new Date()
  const start = startOfMonth(today)
  const end = endOfMonth(today)
  return eachDayOfInterval({ start, end })
}

export const parseDateString = (str) => parseISO(str)

export const isDateToday = (dateStr) => {
  try {
    return isSameDay(parseISO(dateStr), new Date())
  } catch {
    return false
  }
}
