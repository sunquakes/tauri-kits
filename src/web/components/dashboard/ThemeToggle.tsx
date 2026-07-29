import { useState, useRef, useEffect } from 'react'
import { SkinOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useStore, THEMES } from '../../store'
import './ThemeToggle.scss'

export default function ThemeToggle() {
  const { t } = useTranslation()
  const { theme, setTheme } = useStore()
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  const currentTheme = THEMES.find((item) => item.key === theme)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div className="sc-theme-wrap" ref={wrapRef}>
      <button
        className="sc-theme-btn"
        onClick={() => setOpen((v) => !v)}
        title={t('theme.switch')}
      >
        <SkinOutlined style={{ fontSize: 16 }} />
        <span
          className="sc-theme-dot"
          style={{ background: currentTheme?.color }}
        />
      </button>

      <div className={`sc-theme-picker ${open ? 'open' : ''}`}>
        {THEMES.map((item) => (
          <button
            key={item.key}
            className={`sc-theme-option ${theme === item.key ? 'active' : ''}`}
            style={{ '--opt-color': item.color } as React.CSSProperties}
            onClick={() => {
              setTheme(item.key)
              setOpen(false)
            }}
            title={t(`theme.${item.key}`)}
          >
            <span className="sc-theme-option-dot" />
          </button>
        ))}
      </div>
    </div>
  )
}
