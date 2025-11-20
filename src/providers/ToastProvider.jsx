import { useCallback, useMemo, useRef, useState } from 'react'
import { ToastContext } from '../context/ToastContext'
import ToastStack from '../components/ToastStack'

const AUTO_DISMISS_MS = 3500 // 3.5 seconds feels right

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  // keep track of timers so we can clear them if toast is dismissed early
  const timersRef = useRef(new Map())

  const removeToast = useCallback((id) => {
    setToasts((previous) => previous.filter((toast) => toast.id !== id))
    // clean up the timer
    const timer = timersRef.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timersRef.current.delete(id)
    }
  }, [])

  const pushToast = useCallback(
    ({ title, description, variant = 'default' }) => {
      // generate ID - use crypto.randomUUID if available, fallback to timestamp + random
      const id =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(16).slice(2)}`
      const nextToast = { id, title, description, variant }
      setToasts((previous) => [...previous, nextToast])

      // auto-dismiss after delay
      const timer = setTimeout(() => removeToast(id), AUTO_DISMISS_MS)
      timersRef.current.set(id, timer)
    },
    [removeToast],
  )

  // memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(
    () =>
      ({ title, description, variant }) =>
        pushToast({ title, description, variant }),
    [pushToast],
  )

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastStack toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  )
}

