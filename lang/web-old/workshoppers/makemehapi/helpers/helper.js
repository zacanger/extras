const a = context => {
  const q = context.data.root.query
  return q.name + q.suffix
}

module.exports = a
