export const Badge = ({ children, color = 'var(--accent)', className = '' }) => (
  <span
    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${className}`}
    style={{ backgroundColor: `${color}22`, color, border: `1px solid ${color}44` }}
  >
    {children}
  </span>
)
