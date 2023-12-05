import { ReactNode, createContext, useState } from 'react'

type UserType = {
  authTime: number,
  exp: number
  setAuthTime: (newState: number) => void,
  setExp: (newState: number) => void,
  isSessionValid: () => boolean
}

const initialValue: UserType = {
  authTime: 0,
  exp: 0,
  setAuthTime: () => { },
  setExp: () => { },
  isSessionValid: () => false
}

export const UserContext = createContext(initialValue)

type UserContextProps = {
  children: ReactNode
}

export const UserContextProvider =
  ({ children }: UserContextProps) => {
    const [authTime, setAuthTime] = useState(initialValue.authTime)
    const [exp, setExp] = useState(initialValue.exp)

    return <UserContext.Provider value={{
      authTime,
      exp,
      setAuthTime,
      setExp,
      isSessionValid: () => {
        const timestamp = new Date().getTime()
        const diff = exp * 1000 - timestamp
        return diff > 0
      }
    }}>{children}</UserContext.Provider>
  }