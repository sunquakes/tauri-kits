import { ReactNode } from 'react'
import './IndicatorCard.scss'

interface IndicatorCardProps {
  icon: ReactNode
  value: string
  unit: string
  label: string
  color?: 'cyan' | 'magenta' | 'gold' | 'green'
}

export default function IndicatorCard({ icon, value, unit, label, color = 'cyan' }: IndicatorCardProps) {
  return (
    <div className="sc-indicator-card">
      <div className={`sc-hex-icon ${color !== 'cyan' ? color : ''}`}>
        {icon}
      </div>
      <div className="sc-indicator-info">
        <div className={`sc-indicator-value ${color !== 'cyan' ? color : ''}`}>
          {value}<span className="sc-unit">{unit}</span>
        </div>
        <div className="sc-indicator-label">{label}</div>
      </div>
    </div>
  )
}
