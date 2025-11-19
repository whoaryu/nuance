import { createContext, useContext } from 'react'

export const ToastContext = createContext(() => {})

export function useToastContext() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToastContext must be used within a ToastContext.Provider')
  }
  return context
}

