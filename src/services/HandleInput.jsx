export const handleInput = (setGlobalError, value, cb) => {
  if (!value) {
    setGlobalError(true)
  } else {
    setGlobalError(false)
  }
  return (...args) => cb(...args)
}
