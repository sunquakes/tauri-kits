import { ReactNode } from 'react'
import './Panel.scss'

interface PanelProps {
  icon?: ReactNode
  title: string
  status?: string
  statusType?: 'success' | 'warning' | 'info'
  children: ReactNode
  className?: string
}

export default function Panel({ icon, title, status, statusType = 'success', children, className = '' }: PanelProps) {
  return (
    <section className={`sc-panel ${className}`}>
      <div className="sc-panel-header">
        {icon && <span className="sc-panel-icon">{icon}</span>}
        <span className="sc-panel-title">{title}</span>
        {status && (
          <span className={`sc-panel-status status-${statusType}`}>{status}</span>
        )}
      </div>
      <div className="sc-panel-body">
        {children}
      </div>
    </section>
  )
}
