const { html, render, svg } = window.uhtml

function initBlurButtons () {
  const blurToggles = document.querySelectorAll('[data-blur]')

  const showImageEl = (dataset) => html.node`<a class="${(dataset.blurText ? 'is-size-3 ' : '') + 'is-overlay center-text has-text-white has-background-slightly-dark'}" data-blur-button="${dataset.blur}" onclick="${
    (ev = new window.MouseEvent()) => {
      ev.preventDefault()

      const targetElement = document.querySelector(`[data-blur="${ev.target.dataset.blurButton}"`)

      if (!(targetElement instanceof window.HTMLElement)) {
        return
      }

      targetElement.classList.toggle('blur')
      ev.target.classList.toggle('has-background-slightly-dark')

      if (dataset.blurText) {
        if (targetElement.classList.contains('blur')) {
          ev.target.innerText = 'Unblur'
        } else {
          ev.target.innerText = ''
        }
      }

      if (targetElement.dataset.blurVanish === 'true') {
        ev.target.outerHTML = ''
      }
    }
  }">${dataset.blurText ? 'Unblur' : ''}</a>`

  for (let index = 0; index < blurToggles.length; index++) {
    const element = blurToggles[index]

    if (!(element instanceof window.HTMLElement)) {
      return
    }

    element.parentElement.appendChild(showImageEl(element.dataset))
  }
}

function initToastButton () {
  const toast = document.querySelector('.toast')

  if (toast instanceof window.HTMLElement) {
    toast.addEventListener('click', () => {
      toast.outerHTML = ''
    })
  }
}

initBlurButtons()
initToastButton()

console.log('Loaded.')
