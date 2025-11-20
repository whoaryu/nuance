// simple two-tier cache: memory first, then localStorage
// memory is faster but doesn't persist, localStorage is slower but survives refreshes
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
    // localStorage might be full, just fail silently
  }
}

// check memory first, then localStorage, return null if expired or missing
export function getCachedValue(key, ttl = DEFAULT_TTL) {
  const now = Date.now()
  const inMemory = memoryCache.get(key)
  if (inMemory && now - inMemory.timestamp < ttl) {
    return inMemory.value
  }

  // not in memory or expired, check localStorage
  const stored = readStorage(key)
  if (stored && now - stored.timestamp < ttl) {
    // update memory cache while we're at it
    memoryCache.set(key, stored)
    return stored.value
  }

  return null
}

// write to both memory and localStorage
export function setCachedValue(key, value) {
  const payload = { value, timestamp: Date.now() }
  memoryCache.set(key, payload)
  writeStorage(key, payload)
}

