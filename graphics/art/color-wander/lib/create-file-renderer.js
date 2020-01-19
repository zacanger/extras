const mapLimit = require('map-limit')
const newArray = require('new-array')
const Canvas = require('canvas')
const Image = Canvas.Image
const padLeft = require('pad-left')
const assign = require('object-assign')
const path = require('path')
const createRenderer = require('./create-renderer')
const fs = require('fs')

module.exports = (opt, cb) => {
  let renderer
  const pixelRatio = typeof opt.pixelRatio === 'number' ? opt.pixelRatio : 1
  const canvas = new Canvas(opt.width * pixelRatio, opt.height * pixelRatio)
  const context = canvas.getContext('2d')

  const steps = opt.steps
  const frameDigits = String(steps).length
  const seedName = typeof opt.seedName !== 'undefined' ? ('_' + opt.seedName) : ''
  const filename = (opt.filename || 'render') + seedName
  const outputDir = opt.outputDir || process.cwd()
  let frame = 0
  const interval = typeof opt.interval === 'number' ? opt.interval : 0.0001
  const cwd = opt.cwd || process.cwd()

  const outputCanvas = (isAsync, cb) => {
    const stamp = isAsync ? ('_' + padLeft(frame, frameDigits, '0')) : ''
    const filePath = path.resolve(outputDir, filename + stamp + '.png')
    fs.writeFile(filePath, canvas.toBuffer(), cb)
  }

  const render = () => {
    renderer.clear()
    for (let i = 0; i < steps; i++) {
      console.log((i + 1) + ' / ' + steps)
      renderer.step(interval)
      frame++
    }
    outputCanvas(false)
  }

  const renderAsync = () => {
    renderer.clear()
    const array = newArray(steps)
    let i = 0
    mapLimit(array, 1, (item, next) => {
      console.log((i++ + 1) + ' / ' + steps)
      renderer.step(interval)
      outputCanvas(true, next)
      frame++
    }, (err) => {
      if (err) throw err
      console.log('Finished')
    })
  }

  fs.readFile(path.resolve(cwd, opt.backgroundSrc), (err, buffer) => {
    if (err) return cb(err)
    const backgroundImage = new Image()
    backgroundImage.src = buffer

    const debugLuma = opt.debugLuma
    const asVideoFrames = opt.asVideoFrames

    renderer = createRenderer(assign(opt, {
      backgroundImage: backgroundImage,
      context: context
    }))

    if (debugLuma) {
      renderer.debugLuma()
      outputCanvas()
    } else {
      if (asVideoFrames) renderAsync()
      else render()
    }
  })
}
