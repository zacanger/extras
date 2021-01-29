module.exports = (
  Bacon
, riverFlow
, inCriticalMode
, isOnBreak
, isSingleGate
, systemActive
, riverFlowLimit
) => {
  const tooMuch = riverFlow.map(f => f > riverFlowLimit).toProperty()
  const shouldN = isOnBreak.not().and(
    inCriticalMode.or(systemActive.and(isSingleGate))
  )

  return tooMuch.and(shouldN)
}
