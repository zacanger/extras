const getDependencies = (module, res) => {
  res = res || []
  let dependencies = module && module.dependencies || []
  Object.keys(dependencies).forEach(dep => {
    let key = dep + '@' + module.dependencies[dep].version
    if (res.indexOf(key) === -1) {
      res.push(key)
    }
    getDependencies(module.dependencies[dep], res)
  })
  return res.sort()
}

module.exports = getDependencies

