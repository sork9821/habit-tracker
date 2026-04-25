import { Check } from 'lucide-react'
import { HABIT_COLORS } from '../../constants/colors'

export const HabitColorPicker = ({ value, onChange }) => (
  <div className="flex flex-wrap gap-2">
    {HABIT_COLORS.map(color => (
      <button
        key={color}
        type="button"
        onClick={() => onChange(color)}
        className="w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 cursor-pointer border-0"
        style={{ backgroundColor: color }}
      >
        {value === color && <Check size={14} className="text-white" strokeWidth={3} />}
      </button>
    ))}
  </div>
)
