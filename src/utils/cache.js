const memoryCache = new Map()
const DEFAULT_TTL = 1000 * 60 * 15 // 15 minutes

const isBrowser = typeof window !== 'undefined'

function readStorage(key) {
  if (!isBrowser) return null
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeStorage(key, payload) {
  if (!isBrowser) return
  try {
    window.localStorage.setItem(key, JSON.stringify(payload))
  } catch {
    /* noop */
  }
}

export function getCachedValue(key, ttl = DEFAULT_TTL) {
  const now = Date.now()
  const inMemory = memoryCache.get(key)
  if (inMemory && now - inMemory.timestamp < ttl) {
    return inMemory.value
  }

  const stored = readStorage(key)
  if (stored && now - stored.timestamp < ttl) {
    memoryCache.set(key, stored)
    return stored.value
  }

  return null
}

export function setCachedValue(key, value) {
  const payload = { value, timestamp: Date.now() }
  memoryCache.set(key, payload)
  writeStorage(key, payload)
}

