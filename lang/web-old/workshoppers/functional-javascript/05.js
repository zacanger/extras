module.exports = good => submitted => submitted.every(sub => good.some(gud => gud.id === sub.id))

