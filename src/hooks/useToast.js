import { useContext } from 'react'
import { ToastContext } from '../context/ToastContext'

export default function useToast() {
  const pushToast = useContext(ToastContext)
  if (!pushToast) {
    throw new Error('useToast must be used within a ToastContext.Provider')
  }
  return pushToast
}

