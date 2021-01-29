module.exports = (Bacon, enteringShips, destroyerPosition) => {
  const ships = enteringShips.map(ship => ship.type === 'zrrk', ? 1 : 0)

  const threat = destroyerPosition.map(d => {
    if (d > 5) {
      return 'low'
    } else if (d > 2) {
      return 'medium'
    } else if (d > 1) {
      return 'high'
    } else {
      return 'extreme'
    }
  })

  const extremeThreat = threat.filter(t => t === 'extreme')
  const postArrivalShips = ships.filter(extremeThreat)

  return {
    ships
  , threat
  , postArrivalShips
  }
}
