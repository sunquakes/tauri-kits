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

const STORAGE_KEY = 'admin-user'

export function StoreProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved) as User
      } catch {
        return null
      }
    }
    return null
  })

  const setUser = (user: User | null) => {
    setUserState(user)
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

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
