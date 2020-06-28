const { html, render, svg } = window.uhtml

function initBlurButtons () {
  const blurToggles = document.querySelectorAll('[data-blur]')

  const showImageEl = (dataset) => html.node`<a class="${(dataset.blurText ? 'is-size-3 ' : '') + 'is-overlay center-text has-text-white has-background-slightly-dark'}" data-blur-button="${dataset.blur}" onclick="${
    (ev = new window.MouseEvent()) => {
      ev.preventDefault()

      const targetElement = document.querySelector(`[data-blur="${ev.currentTarget.dataset.blurButton}"`)

      if (!(targetElement instanceof window.HTMLElement)) {
        return
      }

      targetElement.classList.toggle('blur')
      ev.currentTarget.classList.toggle('has-background-slightly-dark')

      if (dataset.blurText) {
        if (targetElement.classList.contains('blur')) {
          ev.currentTarget.innerText = 'Unblur'
        } else {
          ev.currentTarget.innerText = ''
        }
      }

      if (targetElement.dataset.blurVanish === 'true') {
        ev.currentTarget.outerHTML = ''
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

function displayToast (message) {
  const toastHTML = html.node`
    <div class="toast animated fadeIn">
      <div class="${message.error ? 'notification is-danger' : 'notification is-success'}">
        <button class="delete"></button>
        <span>${message.error || message.message}</span>
      </div>
    </div>
  `

  const toast = document.querySelector('.toast')

  if (toast instanceof window.HTMLElement) {
    toast.outerHTML = ''
  }

  document.body.appendChild(toastHTML)

  initToastButton()
}

initBlurButtons()
initToastButton()

console.log('Loaded.')
