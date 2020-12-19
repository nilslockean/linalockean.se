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
  document.body.classList.remove('no-js')

  const labels = document.querySelectorAll('.no-js')
  if ( !!labels ) {
    for ( const label of labels ) label.parentElement.removeChild(label)
  }
  

  const loader = document.getElementById('loader')
  if ( !loader ) return;

  const style = document.createElement('style')
  style.textContent = `#loader {
    transition: opacity .4s;
  }`
  document.head.append(style)

  loader.setAttribute('aria-hidden', 'false')
  loader.classList.remove('hidden')

  const fadeIn = () => {
    loader.setAttribute('aria-hidden', 'true')
    loader.classList.remove('hidden')
    loader.style.opacity = '0'
    setTimeout(() => {
      loader.parentElement.removeChild(loader)
    }, 400)
  }

  let timeout = setTimeout(fadeIn, 2000)

  checkFont('Roboto Mono').then(_ => {
    clearTimeout(timeout)
    fadeIn()
  })
}

document.addEventListener('DOMContentLoaded', onLoad)

// <div class="lds-dual-ring"></div>