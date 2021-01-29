// lulz
try {
  // stuff
} catch (e) {
  window.location.href = `http://stackoverflow.com/search?q=[js]+${e.message}`
}

window.onerror = e =>
    window.location.href = `http://stackoverflow.com/search?q=[js]+${e.message}`

addEventListener('unhandledrejection', (e, p) => {
  if (p) console.log('promise', p)
  window.location.href = `http://stackoverflow.com/search?q=promise+${e.message}`
})
