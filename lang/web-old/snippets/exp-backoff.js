const exponentialBackoff = (
  f = () => {},
  tries = 10,
  wait = 1000,
  log = () => {}
) => {
  try {
    return f()
  } catch (e) {
    log(e)
    if (tries) {
      setTimeout(() => {
        exponentialBackoff(f, tries - 1, wait * 2)
      })
    } else {
      log(`Tried ${f.name} ${tries} times`)
    }
  }
}
