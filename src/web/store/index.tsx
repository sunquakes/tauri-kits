import { createContext, useContext, useState, ReactNode } from 'react'

interface StoreContextType {
  // 前台模块的状态（待后续实现）
  state: Record<string, unknown>
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state] = useState({})

  return (
    <StoreContext.Provider value={{ state }}>
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
