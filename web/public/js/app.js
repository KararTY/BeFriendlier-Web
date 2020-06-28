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

class Cookies {
  constructor () {
    this.rawCookies = document.cookie
    this.cookies = new Map()

    this.parseCookies()
  }

  getCookie (cname) {
    return this.cookies.get(cname)
  }

  setCookie (cname, cvalue) {
    const today = new Date()
    const nextMonth = today.setMonth(today.getMonth() + 1)

    document.cookie = `${cname}=${JSON.stringify(cvalue)};expires=${new Date(nextMonth).toUTCString()};path=/`

    this.parseCookies()
  }

  parseCookies () {
    const cookies = this.rawCookies.split('; ').filter(string => string.length)

    for (let index = 0; index < cookies.length; index++) {
      const cookieStringArr = cookies[index].split('=')
      const cookieName = cookieStringArr[0].trim()
      const cookieValue = cookieStringArr[1].trim()

      this.cookies.set(cookieName, JSON.parse(cookieValue))
    }
  }
}

function setToSCookies () {
  const login = document.getElementById('login')

  if (!(login instanceof window.HTMLElement)) {
    return
  }

  const cookies = new Cookies()

  const path = window.location.pathname
  switch (path) {
    case '/': {
      if (!cookies.getCookie('privacyPolicyAccepted')) {
        login.href = '/privacy'
      } else if (!cookies.getCookie('termsOfServiceAccepted')) {
        login.href = '/terms'
      }

      if (!login.href.startsWith('https://id')) {
        const el = login.lastElementChild
        if (el) {
          el.textContent = 'Register'
        }
      }
      break
    }
    case '/privacy': {
      login.firstElementChild.firstElementChild.addEventListener('click', ev => {
        ev.preventDefault()

        cookies.setCookie('privacyPolicyAccepted', true)

        displayToast({ message: 'Successfully accepted privacy policy, please wait a second...' })

        document.body.firstElementChild.classList.add('blur')

        setTimeout(() => {
          window.location.href = login.firstElementChild.firstElementChild.href
        }, 2500)
      })
      break
    }
    case '/terms': {
      if (!cookies.getCookie('privacyPolicyAccepted')) {
        login.lastElementChild.href = window.location.origin + '/privacy'
        login.lastElementChild.href = window.location.origin + 'Privacy policy'
        login.lastElementChild.addEventListener('click', ev => {
          ev.preventDefault()

          displayToast({
            error: 'Error: You have not accepted Privacy Policy yet.\n' +
            'Please accept Privacy Policy first. Redirecting you...',
          })

          setTimeout(() => {
            window.location.href = login.lastElementChild.href
          }, 2500)
        })
        return
      }

      if (cookies.getCookie('termsOfServiceAccepted')) {
        login.innerHTML = ''
        login.appendChild(html.node`<p>You've accepted the Terms of Service already.</p>`)
        return
      }

      login.lastElementChild.addEventListener('click', ev => {
        ev.preventDefault()

        cookies.setCookie('termsOfServiceAccepted', true)

        displayToast({ message: 'Successfully accepted Terms of Service, please wait a second...' })

        document.body.firstElementChild.classList.add('blur')

        setTimeout(() => {
          window.location.href = login.lastElementChild.href
        }, 2500)
      })
      break
    }
  }
}

initBlurButtons()
initToastButton()
setToSCookies()

console.log('Loaded.')
