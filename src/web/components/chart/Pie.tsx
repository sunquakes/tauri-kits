import { ReactNode } from 'react'
import ChartCard from './ChartCard'
import ChartBox from './ChartBox'
import { getThemeColors, alpha } from './theme'

export interface PieDataItem {
  value: number
  name: string
}

export interface PieChartProps {
  title: string
  tag?: string
  tagColor?: 'cyan' | 'magenta'
  className?: string
  icon?: ReactNode
  variant?: 'card' | 'box'
  data: PieDataItem[]
  /** 半径：传 [inner, outer] 为环形图，传字符串为实心饼图 */
  radius?: [string, string] | string
  /** 中心位置 */
  center?: [string, string]
  /** 中心主文字（如 "100%"） */
  centerText?: string
  /** 中心副文字 */
  centerSubText?: string
  /** 图例位置 */
  legendPosition?: 'right' | 'bottom'
  /** 自定义颜色序列 */
  colors?: string[]
}

export default function Pie({
  title,
  tag = '',
  tagColor = 'cyan',
  className = '',
  icon,
  variant = 'card',
  data,
  radius = '65%',
  center = ['38%', '50%'],
  centerText,
  centerSubText,
  legendPosition = 'right',
  colors
}: PieChartProps) {
  const c = getThemeColors()
  const defaultColors = [
    alpha('--sc-cyan', 0.82),
    alpha('--sc-magenta', 0.82),
    alpha('--sc-purple', 0.82),
    alpha('--sc-success', 0.82),
    alpha('--sc-gold', 0.82)
  ]
  const colorList = colors ?? defaultColors

  const option = {
    legend:
      legendPosition === 'right'
        ? {
            right: 0,
            orient: 'vertical',
            textStyle: { color: c.textSecondary, fontSize: 10 },
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 6
          }
        : {
            bottom: 0,
            textStyle: { color: c.textSecondary, fontSize: 10 },
            itemWidth: 12,
            itemHeight: 8,
            itemGap: 8
          },
    ...(centerText
      ? {
          graphic: [
            {
              type: 'text',
              left: center[0],
              top: '42%',
              style: {
                text: centerText,
                fill: c.cyan,
                font: 'bold 24px "DIN Alternate","Bahnschrift","Impact",sans-serif',
                textAlign: 'center'
              }
            },
            ...(centerSubText
              ? [
                  {
                    type: 'text',
                    left: center[0],
                    top: '56%',
                    style: {
                      text: centerSubText,
                      fill: c.textSecondary,
                      font: '10px "PingFang SC","Microsoft YaHei",sans-serif',
                      textAlign: 'center'
                    }
                  }
                ]
              : [])
          ]
        }
      : {}),
    series: [
      {
        type: 'pie',
        radius: radius as any,
        center,
        data,
        label: { show: false },
        itemStyle: {
          borderColor: c.blue,
          borderWidth: 2
        },
        color: colorList
      }
    ],
    tooltip: {
      backgroundColor: c.bgPanelSolid,
      borderColor: c.borderCyan,
      borderWidth: 1,
      textStyle: { color: c.textPrimary, fontSize: 12 }
    }
  }

  if (variant === 'box') {
    return <ChartBox title={title} option={option} />
  }

  return (
    <ChartCard
      icon={icon}
      title={title}
      tag={tag}
      tagColor={tagColor}
      option={option}
      className={className}
    />
  )
}
