import { html } from 'uhtml'

interface ToastMessage {
  error?: string
  message?: string
}

(function initBlurButtons () {
  const showImageEl = (dataset: DOMStringMap) => html.node`<a class="${(dataset.blurText === 'true' ? 'is-size-3 ' : '') + 'is-overlay center-text has-text-white has-background-slightly-dark'}" data-blur-button="${dataset.blur}" onclick="${
    (ev: Event) => {
      ev.preventDefault()

      const target: HTMLElement = ensureIsOfType(ev.currentTarget, HTMLElement)
      // We're expecting this function's rendered element to have a "data-blur-button" field with a string.
      const blurButtonValue: string = target.dataset.blurButton
      const targetElement = document.querySelector(`[data-blur="${blurButtonValue}"`)

      if (!(targetElement instanceof window.HTMLElement)) {
        return
      }

      targetElement.classList.toggle('blur')
      target.classList.toggle('has-background-slightly-dark')

      if (dataset.blurText === 'true') {
        if (targetElement.classList.contains('blur') as boolean) {
          target.innerText = 'Unblur'
        } else {
          target.innerText = ''
        }
      }

      if (targetElement.dataset.blurVanish === 'true') {
        target.outerHTML = ''
      }
    }
  }">${dataset.blurText === 'true' ? 'Unblur' : ''}</a>`

  const blurToggles = document.querySelectorAll('[data-blur]')

  for (let index = 0; index < blurToggles.length; index++) {
    const element: HTMLElement = ensureIsOfType(blurToggles[index], HTMLElement)
    const parentElement = element.parentElement

    if (parentElement !== null) {
      parentElement.appendChild(showImageEl(element.dataset))
    }
  }
})()

function initToastButton () {
  const toast: HTMLElement | null = document.querySelector('.toast')

  if (toast instanceof window.HTMLElement) {
    toast.addEventListener('click', () => {
      toast.outerHTML = ''
    })
  }
}

export function displayToast (message: ToastMessage) {
  const toastHTML = html.node`
    <div class="toast animated fadeIn">
      <div class="${message.error !== undefined ? 'notification is-danger' : 'notification is-success'}">
        <button class="delete"></button>
        <span>${message.error ?? message.message}</span>
      </div>
    </div>
  `

  const toast = document.querySelector('.toast')

  if (toast instanceof HTMLElement) {
    toast.outerHTML = ''
  }

  document.body.appendChild(toastHTML)

  initToastButton()
}

class Cookies {
  private readonly rawCookies: string
  private readonly cookies: Map<string, any>

  constructor () {
    this.rawCookies = document.cookie
    this.cookies = new Map()

    this.parseCookies()
  }

  public getCookie = (cname: string): any | undefined => {
    return this.cookies.get(cname)
  }

  public setCookie = (cname: string, cvalue: any) => {
    const today = new Date()
    const nextMonth = today.setMonth(today.getMonth() + 1)

    document.cookie = `${cname}=${JSON.stringify(cvalue)};expires=${new Date(nextMonth).toUTCString()};path=/`

    this.parseCookies()
  }

  public parseCookies = () => {
    const cookies = this.rawCookies.split('; ').filter(string => string.length)

    for (let index = 0; index < cookies.length; index++) {
      const cookieStringArr = cookies[index].split('=')
      const cookieName = cookieStringArr[0].trim()
      const cookieValue = cookieStringArr[1].trim()

      this.cookies.set(cookieName, JSON.parse(cookieValue))
    }
  }
}

(function setToSCookies () {
  const login = document.getElementById('login')

  if (!(login instanceof HTMLDivElement)) {
    return
  }

  const firstElementChild: HTMLAnchorElement = ensureIsOfType(login.firstElementChild, HTMLAnchorElement)
  const cookies = new Cookies()
  const path = window.location.pathname

  switch (path) {
    case '/': {
      if (!(cookies.getCookie('privacyPolicyAccepted') as boolean)) {
        firstElementChild.href = '/privacy'
      } else if (!(cookies.getCookie('termsOfServiceAccepted') as boolean)) {
        firstElementChild.href = '/terms'
      }

      if (!(firstElementChild.href.startsWith('https://id') as boolean)) {
        const el = firstElementChild.lastElementChild
        if (el !== null) {
          el.textContent = 'Register'
        }
      }
      break
    }
    case '/privacy': {
      if (cookies.getCookie('privacyPolicyAccepted') as boolean) {
        login.innerHTML = ''
        login.appendChild(html.node`<p>You've accepted the Privacy Policy already.</p>`)
        return
      }

      firstElementChild.addEventListener('click', ev => {
        ev.preventDefault()

        cookies.setCookie('privacyPolicyAccepted', true)

        displayToast({ message: 'Successfully accepted privacy policy, please wait a second...' })

        document.body.firstElementChild.classList.add('blur')

        setTimeout(() => {
          window.location.href = firstElementChild.href
        }, 2500)
      })
      break
    }
    case '/terms': {
      if (!(cookies.getCookie('privacyPolicyAccepted') as boolean)) {
        firstElementChild.href = String(window.location.origin) + '/privacy'
        firstElementChild.addEventListener('click', ev => {
          ev.preventDefault()

          redirect({
            error: 'Error: You have not accepted Privacy Policy yet.\n' +
            'Please accept Privacy Policy first. Redirecting you...',
          }, (ev.currentTarget as HTMLAnchorElement).href)
        })
        return
      }

      if (cookies.getCookie('termsOfServiceAccepted') as boolean) {
        login.innerHTML = ''
        login.appendChild(html.node`<p>You've accepted the Terms of Service already.</p>`)
        return
      }

      firstElementChild.addEventListener('click', ev => {
        ev.preventDefault()

        cookies.setCookie('termsOfServiceAccepted', true)

        redirect({
          message: 'Successfully accepted Terms of Service, please wait a second...',
        }, (ev.currentTarget as HTMLAnchorElement).href)
      })
      break
    }
  }
})()

function redirect (toastMessage: ToastMessage, url: string) {
  displayToast(toastMessage)

  document.body.firstElementChild.classList.add('blur')

  setTimeout(() => {
    window.location.href = url
  }, 2500)
}

(function initNavbarToggles () {
  const navbarButtons: NodeListOf<HTMLElement> = document.querySelectorAll('.navbar-brand .navbar-burger')

  if (navbarButtons.length > 0) {
    for (let index = 0; index < navbarButtons.length; index++) {
      const navbarButton = navbarButtons[index]
      navbarButton.addEventListener('click', function onClickNavbar (this: HTMLElement) {
        this.classList.toggle('is-active')
        document.querySelector(`[data-menu="${String(this.dataset.target)}"]`).classList.toggle('is-active')
      })
    }
  }
})()

export function ensureIsOfType (el: any, Type: any) {
  if (!(el instanceof Type)) {
    throw new Error(`${String(el)} is not of type ${String(Type)}`)
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  return el as typeof Type
}

initToastButton()
