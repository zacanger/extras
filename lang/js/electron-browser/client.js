const handleLoadStop = (_) => {
  isLoading = false
}

const handleLoadAbort = (event) => {
  console.log('Load aborted', event)
}

const getNextPresetZoom = (zoomFactor) => {
  const preset = [
    0.25,
    0.33,
    0.5,
    0.67,
    0.75,
    0.9,
    1,
    1.1,
    1.25,
    1.5,
    1.75,
    2,
    2.5,
    3,
    4,
    5,
  ]

  let low = 0
  let high = preset.length - 1
  let mid
  while (high - low > 1) {
    mid = Math.floor((high + low) / 2)
    if (preset[mid] < zoomFactor) {
      low = mid
    } else if (preset[mid] > zoomFactor) {
      high = mid
    } else {
      return { low: preset[mid - 1], high: preset[mid + 1] }
    }
  }
  return { low: preset[low], high: preset[high] }
}

const increaseZoom = () => {
  const webview = document.querySelector('webview')
  webview.getZoom((zoomFactor) => {
    const nextHigherZoom = getNextPresetZoom(zoomFactor).high
    webview.setZoom(nextHigherZoom)
    document.forms['zoom-form']['zoom-text'].value = nextHigherZoom.toString()
  })
}

const decreaseZoom = () => {
  const webview = document.querySelector('webview')
  webview.getZoom((zoomFactor) => {
    const nextLowerZoom = getNextPresetZoom(zoomFactor).low
    webview.setZoom(nextLowerZoom)
    document.forms['zoom-form']['zoom-text'].value = nextLowerZoom.toString()
  })
}

const handleKeyDown = (event) => {
  if (event.ctrlKey) {
    switch (event.keyCode) {
      // Ctrl+.
      case 107:
      case 187:
        event.preventDefault()
        increaseZoom()
        break

      // Ctrl-.
      case 109:
      case 189:
        event.preventDefault()
        decreaseZoom()
    }
  }
}


const doLayout = () => {
  const webview = document.querySelector('webview')
  const controls = document.querySelector('#controls')
  const controlsHeight = controls.offsetHeight
  const windowWidth = document.documentElement.clientWidth
  const windowHeight = document.documentElement.clientHeight
  const webviewWidth = windowWidth
  const webviewHeight = windowHeight - controlsHeight

  webview.style.width = webviewWidth + 'px'
  webview.style.height = webviewHeight + 'px'

  const sadWebview = document.querySelector('#sad-webview')
  sadWebview.style.width = webviewWidth + 'px'
  sadWebview.style.height = webviewHeight * 2 / 3 + 'px'
  sadWebview.style.paddingTop = webviewHeight / 3 + 'px'
}
window.onresize = doLayout

const resetExitedState = () => {
  document.body.classList.remove('exited')
  document.body.classList.remove('crashed')
  document.body.classList.remove('killed')
}

const navigateTo = (url) => {
  resetExitedState()
  document.querySelector('webview').src = url
}

const handleExit = (event) => {
  document.body.classList.add('exited')
  if (event.type == 'abnormal') {
    document.body.classList.add('crashed')
  } else if (event.type == 'killed') {
    document.body.classList.add('killed')
  }
}

const handleLoadStart = (event) => {
  document.body.classList.add('loading')
  isLoading = true

  resetExitedState()
  if (!event.isTopLevel) {
    return
  }

  document.querySelector('#location').value = event.url
}

const handleLoadRedirect = (event) => {
  resetExitedState()
  document.querySelector('#location').value = event.newUrl
}

const handleLoadCommit = () => {
  resetExitedState()
  const webview = document.querySelector('webview')
  document.querySelector('#location').value = webview.getURL()
  document.querySelector('#back').disabled = !webview.canGoBack()
  document.querySelector('#forward').disabled = !webview.canGoForward()
}

let isLoading = false
const onload = () => {
  const webview = document.querySelector('webview')
  doLayout()

  document.querySelector('#back').onclick = webview.goBack

  document.querySelector('#forward').onclick = webview.goForward

  document.querySelector('#home').onclick = () => {
    navigateTo('https://duckduckgo.com')
  }

  document.querySelector('#reload').onclick = () => {
    if (isLoading) {
      webview.stop()
    } else {
      webview.reload()
    }
  }

  document.querySelector('#reload').addEventListener(
    'webkitAnimationIteration', () => {
      if (!isLoading) {
        document.body.classList.remove('loading')
      }
    })

  document.querySelector('#location-form').onsubmit = (e) =>{
    e.preventDefault()
    let val = document.querySelector('#location').value
    if (!val.includes('://')) {
      val = `http://${val}`
    }

    navigateTo(val)
  }

  webview.addEventListener('close', handleExit)
  webview.addEventListener('did-start-loading', handleLoadStart)
  webview.addEventListener('did-stop-loading', handleLoadStop)
  webview.addEventListener('did-fail-load', handleLoadAbort)
  webview.addEventListener('did-get-redirect-request', handleLoadRedirect)
  webview.addEventListener('did-finish-load', handleLoadCommit)
}
window.onload = onload
