module.exports = (Bacon, enteringShips, destroyerPosition) => {
  const st = enteringShips
    .filter(s => s.type === 'zrk')
    .map(1)
    .scan(0, (acc, v) => acc + v)

  const dEntered = destroyerPosition.map(d => d < 1)

  const tp = enteringShips
    .filter(dEntered)
    .take(5)
    .fold({}, (r, s) => {
      if (!r[s.type]) {
        r[s.type] = 0
      }
      r[s.type] += 1
      return r
    })

  return {st, tp}
}
