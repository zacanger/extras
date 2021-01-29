module.exports = (Bacon, riverFlowInCubicFeet, litresInCubicFeet) =>
  riverFlowInCubicFeet
    .flatMap(t => {
      const cf = t[0]
      const ns = t[1]
      const lt = Math.round(cf * litresInCubicFeet)

      if (lt > 200000) {
        return Bacon.interval(100, lt).take(ns)
      } else {
        return Bacon.never()
      }
    })
