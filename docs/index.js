(() => {
  const style = document.createElement('style')
  style.textContent = `body {
    opacity: 0;
    transition: opacity .4s;
  }`
  document.head.append(style)
})();

const onLoad = () => {
  setTimeout(() => {
    document.body.style.opacity = '1'
  }, 400)
}

document.addEventListener('DOMContentLoaded', onLoad)
