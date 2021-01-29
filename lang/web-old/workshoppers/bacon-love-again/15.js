module.exports = (Bacon, clicks, startAsyncTask) => {
  const req = clicks.map(true)
  const res = req.flatMap(startAsyncTask)
  return req.awaiting(res)
}
