import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl p-3 shadow-xl text-xs">
        <p className="font-medium text-[var(--text-primary)] mb-1">{label}</p>
        <p className="text-[var(--text-secondary)]">달성률: <span className="text-[var(--accent)] font-semibold">{payload[0].value}%</span></p>
        <p className="text-[var(--text-secondary)]">{payload[0]?.payload?.done}/{payload[0]?.payload?.total} 완료</p>
      </div>
    )
  }
  return null
}

export const WeeklyChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={240}>
    <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -25 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
      <XAxis dataKey="label" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} />
      <YAxis domain={[0, 100]} tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
      <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--surface-elevated)' }} />
      <Bar dataKey="rate" radius={[6, 6, 0, 0]} maxBarSize={40}>
        {data.map((entry, i) => (
          <Cell key={i} fill={entry.rate >= 80 ? 'var(--success)' : entry.rate >= 50 ? 'var(--accent)' : 'var(--warning)'} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
)
