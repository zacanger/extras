const m = (a, f) => a.reduce((ac, it, ix, ar) => ac.concat(f(it, ix, ar)), [])
module.exports = m

