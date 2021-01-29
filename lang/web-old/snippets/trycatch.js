const tc = (fn, ...args) => {
  try {
    return fn(...args)
  } catch (e) {
    return e instanceof Error ? e : new Error(e)
  }
}
