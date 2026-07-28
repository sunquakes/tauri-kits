import { createContext, useContext, useState, ReactNode } from 'react'

interface User {
  id: number
  username: string
  password: string
  nickname: string
  state: number
  create_time: string
  update_time: string
}

interface StoreContextType {
  user: User | null
  setUser: (user: User | null) => void
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  return (
    <StoreContext.Provider value={{ user, setUser }}>
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
