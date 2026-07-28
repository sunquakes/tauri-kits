import { ReactNode } from 'react'
import ReactECharts from 'echarts-for-react'
import './ChartCard.scss'

interface ChartCardProps {
  icon: ReactNode
  title: string
  tag: string
  tagColor?: 'cyan' | 'magenta'
  option: any
  className?: string
}

export default function ChartCard({ icon, title, tag, tagColor = 'cyan', option, className = '' }: ChartCardProps) {
  return (
    <section className={`sc-chart-card ${className}`}>
      <div className="sc-chart-card-header">
        <span className={`sc-chart-card-icon ${tagColor}`}>{icon}</span>
        <span className="sc-chart-card-title">{title}</span>
        <span className={`sc-chart-card-tag ${tagColor}`}>{tag}</span>
      </div>
      <div className="sc-chart-card-body">
        <div className="sc-chart-card-wrap">
          <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
        </div>
      </div>
    </section>
  )
}
