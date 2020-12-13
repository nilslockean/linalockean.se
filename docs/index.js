(() => {
  document.body.classList.remove('no-js')
  document.body.setAttribute('aria-hidden', 'true')

  const style = document.createElement('style')
  style.textContent = `body {
    opacity: 0;
    transition: opacity .4s;
  }`
  document.head.append(style)
})();

const checkFont = (fontname) => {
  return new Promise(resolve => {
    let checks = 0
    let interval = null
    let hasLoaded = false
    
    const onSuccess = () => {
      if ( interval !== null ) {
        clearInterval(interval)
      }
      document.body.classList.add(fontname.toLowerCase().replaceAll(' ', '-') + '--loaded')
      resolve(hasLoaded)
    }
    
    const check = () => {
      checks++

      if ( checks >= 20 ) return onSuccess()

      try {
        hasLoaded = document.fonts.check('1rem "' + fontname + '"')
      } catch (_error) {
        return onSuccess()
      }
      
      if ( hasLoaded ) {
        onSuccess()
      }
    }
    
    interval = setInterval(check, 100)
  })
}

const onLoad = () => {
  const fadeIn = () => {
    document.body.style.opacity = '1'
    document.body.setAttribute('aria-hidden', 'false')
  }
  let timeout = null
  const fontChecks = [
    checkFont('Roboto Mono'),
    checkFont('Windsor D')
  ]

  Promise.all(fontChecks).then(_ => {
    clearTimeout(timeout)
    fadeIn()
  })

  timeout = setTimeout(fadeIn, 1000)
}

document.addEventListener('DOMContentLoaded', onLoad)