const { html, render, svg } = window.uhtml

function initBlurButtons () {
  const blurToggles = document.querySelectorAll('[data-blur]')

  const showImageEl = (value) => html.node`<a class="is-overlay center-text has-text-white is-size-3 has-background-slightly-dark" data-blur-button="${value}" onclick="${
    (ev) => {
      ev.preventDefault()

      const targetElement = document.querySelector(`[data-blur="${ev.target.dataset.blurButton}"`)

      if (!(targetElement instanceof window.HTMLElement)) {
        return
      }

      targetElement.classList.toggle('blur')
      ev.target.classList.toggle('has-background-slightly-dark')

      if (targetElement.classList.contains('blur')) {
        ev.target.innerText = 'Unblur'
      } else {
        ev.target.innerText = ''
      }

      if (targetElement.dataset.blurVanish === 'true') {
        ev.target.outerHTML = ''
      }
    }
  }">Unblur</a>`

  for (let index = 0; index < blurToggles.length; index++) {
    const element = blurToggles[index]

    if (!(element instanceof window.HTMLElement)) {
      return
    }

    element.parentElement.appendChild(showImageEl(element.dataset.blur))
  }
}

initBlurButtons()

console.log('Loaded.')
