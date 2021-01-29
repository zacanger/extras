module.exports = (Bacon, sector1, sector2, sector3, sector4) =>
  Bacon.combineTemplate({
    sector1
  , sector2
  , sector3
  , sector4
  , sector5 : Bacon.constant(0)
  })
