import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type ThemeName = 'tech' | 'eco' | 'alert' | 'vital' | 'future'

export const THEMES: { key: ThemeName; color: string }[] = [
  { key: 'tech', color: '#00c9ff' },
  { key: 'eco', color: '#00d4a0' },
  { key: 'alert', color: '#ff3b3b' },
  { key: 'vital', color: '#ffa726' },
  { key: 'future', color: '#8b5cf6' }
]

interface StoreContextType {
  theme: ThemeName
  setTheme: (theme: ThemeName) => void
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

const STORAGE_KEY = 'sc-theme'

export function StoreProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeName | null
    return saved && THEMES.some((t) => t.key === saved) ? saved : 'tech'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const setTheme = (t: ThemeName) => {
    setThemeState(t)
  }

  return (
    <StoreContext.Provider value={{ theme, setTheme }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}
