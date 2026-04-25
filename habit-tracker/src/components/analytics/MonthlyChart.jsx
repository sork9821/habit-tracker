import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl p-3 shadow-xl text-xs">
        <p className="font-medium text-[var(--text-primary)] mb-1">{label}일</p>
        <p className="text-[var(--text-secondary)]">달성률: <span className="text-[var(--accent)] font-semibold">{payload[0].value}%</span></p>
      </div>
    )
  }
  return null
}

export const MonthlyChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={240}>
    <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -25 }}>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3} />
          <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
      <XAxis dataKey="label" tick={{ fill: 'var(--text-secondary)', fontSize: 10 }} axisLine={false} tickLine={false} interval={4} />
      <YAxis domain={[0, 100]} tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
      <Tooltip content={<CustomTooltip />} />
      <Area type="monotone" dataKey="rate" stroke="var(--accent)" strokeWidth={2} fill="url(#areaGrad)" dot={false} activeDot={{ r: 4, fill: 'var(--accent)' }} />
    </AreaChart>
  </ResponsiveContainer>
)
