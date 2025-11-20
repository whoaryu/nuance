import { useContext } from 'react'
import { ToastContext } from '../context/ToastContext'

// simple hook wrapper around the toast context
export default function useToast() {
  const pushToast = useContext(ToastContext)
  if (!pushToast) {
    throw new Error('useToast must be used within a ToastContext.Provider')
  }
  return pushToast
}

