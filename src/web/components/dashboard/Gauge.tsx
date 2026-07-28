import './Gauge.scss'

interface GaugeProps {
  value: number | string
  unit?: string
  label: string
  color?: 'cyan' | 'magenta' | 'green' | 'gold'
  percent?: number
  size?: 'normal' | 'small'
  textMode?: 'number' | 'text'
}

export default function Gauge({ value, unit, label, color = 'cyan', percent = 40, size = 'normal', textMode = 'number' }: GaugeProps) {
  const conicGradient = () => {
    const colorMap = {
      cyan: 'var(--sc-cyan)',
      magenta: 'var(--sc-magenta)',
      green: 'var(--sc-success)',
      gold: 'var(--sc-gold)'
    }
    const bgColor = colorMap[color]
    const alphaColor = color === 'cyan' ? 'rgba(0, 212, 255, 0.08)' :
                      color === 'magenta' ? 'rgba(255, 0, 160, 0.08)' :
                      color === 'green' ? 'rgba(0, 255, 166, 0.08)' :
                      'rgba(255, 204, 0, 0.08)'
    return `conic-gradient(${bgColor} 0% ${percent}%, ${alphaColor} ${percent}% 100%)`
  }

  return (
    <div className="sc-gauge-item">
      <div
        className={`sc-gauge-circle ${color} ${size === 'small' ? 'small' : ''}`}
        style={{ background: conicGradient() }}
      >
        <div className="sc-gauge-center">
          {textMode === 'number' ? (
            <>
              <span className="sc-gauge-number">{value}</span>
              {unit && <span className="sc-gauge-unit">{unit}</span>}
            </>
          ) : (
            <span className="sc-gauge-text">{value}</span>
          )}
        </div>
      </div>
      <div className="sc-gauge-label">{label}</div>
    </div>
  )
}
