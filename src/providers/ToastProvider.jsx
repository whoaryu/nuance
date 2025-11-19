import { useCallback, useMemo, useRef, useState } from 'react'
import { ToastContext } from '../context/ToastContext'
import ToastStack from '../components/ToastStack'

const AUTO_DISMISS_MS = 3500

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timersRef = useRef(new Map())

  const removeToast = useCallback((id) => {
    setToasts((previous) => previous.filter((toast) => toast.id !== id))
    const timer = timersRef.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timersRef.current.delete(id)
    }
  }, [])

  const pushToast = useCallback(
    ({ title, description, variant = 'default' }) => {
      const id =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(16).slice(2)}`
      const nextToast = { id, title, description, variant }
      setToasts((previous) => [...previous, nextToast])

      const timer = setTimeout(() => removeToast(id), AUTO_DISMISS_MS)
      timersRef.current.set(id, timer)
    },
    [removeToast],
  )

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

