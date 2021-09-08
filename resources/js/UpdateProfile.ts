import { html } from 'uhtml'
import { displayToast, ensureIsOfType } from './App'
import Theme from '../../providers/Theme/Index'

class UpdateProfileForm {
  private readonly elements: HTMLFormControlsCollection
  private readonly named: {
    bioInput: HTMLInputElement
    colorInput: HTMLInputElement
    themeSelect: HTMLSelectElement
    csrfToken: HTMLInputElement
    submitBtn: HTMLButtonElement
    matches: NodeListOf<Element>
  }

  constructor (form: Element | null) {
    if (form instanceof HTMLFormElement) {
      this.elements = form.elements

      this.named = {
        bioInput: ensureIsOfType(this.elements.namedItem('bio'), HTMLInputElement),
        colorInput: ensureIsOfType(this.elements.namedItem('color'), HTMLInputElement),
        themeSelect: ensureIsOfType(this.elements.namedItem('theme'), HTMLSelectElement),
        csrfToken: ensureIsOfType(this.elements.namedItem('_csrf'), HTMLInputElement),
        submitBtn: form.querySelector('[data-name="submitBtn"]'),
        matches: document.body.querySelectorAll('[data-unmatch]'),
      }

      this.named.colorInput.addEventListener('input', (ev: Event) => {
        const styleEl: HTMLStyleElement = ensureIsOfType(document.getElementById('color'), HTMLStyleElement)
        const targetEl: HTMLInputElement = ensureIsOfType(ev.currentTarget, HTMLInputElement)

        styleEl.innerHTML = `.hero-body{background-color:${String(targetEl.value)}}`
      })

      this.named.themeSelect.addEventListener('change', (ev: Event) => {
        const themeEl: HTMLStyleElement = ensureIsOfType(document.getElementById('theme'), HTMLStyleElement)
        const targetEl: HTMLSelectElement = ensureIsOfType(ev.currentTarget, HTMLSelectElement)
        const selectedElement: HTMLOptionElement = ensureIsOfType(targetEl.selectedOptions[0], HTMLOptionElement)

        const options = targetEl.querySelectorAll('option')
        for (let index = 0; index < options.length; index++) {
          const element = options[index]
          element.selected = element.value === selectedElement.value
        }

        themeEl.innerHTML = `.themed-background{background:${Theme.getThemeColor(selectedElement.value).background};}.themed-text{color:${Theme.getThemeColor(selectedElement.value).text};}`
      })

      this.named.matches.forEach(el => {
        el.addEventListener('click', (ev) => this.removeMatch(ev))
      })
    } else if (form instanceof Element) {
      throw new Error('Tried to append a non form element to UpdateProfile.')
    }
  }

  private removeMatch = (ev: Event) => {
    ev.preventDefault()

    const mouseEvent: MouseEvent = ensureIsOfType(ev, MouseEvent)
    const target: HTMLElement = ensureIsOfType(mouseEvent.currentTarget, HTMLElement)
    const parentElement = target.parentElement

    if (parentElement === null) {
      console.error('This element has no parentElement.')
      displayToast({ error: 'Could not remove match. Try reloading the page.' })
      return
    }

    const parentParentElement = parentElement.parentElement

    if (parentParentElement === null) {
      console.error('This element has no parentParentElement.')
      displayToast({ error: 'Could not remove match. Try reloading the page.' })
      return
    }

    const data = new FormData()
    data.append('_csrf', this.named.csrfToken.value)
    data.append('profileID', target.dataset.unmatch ?? 'Error')

    fetch(`${String(window.location.href)}/unmatch`, {
      body: data,
      method: 'POST',
      credentials: 'same-origin',
    }).then(request => request.json()).then(res => {
      displayToast(res)
      if (res.error === undefined) {
        parentParentElement.removeChild(parentElement)
        if (parentParentElement.children.length === 0) {
          parentParentElement.appendChild(html.node`<p>You've not matched with anyone. FeelsBadMan</p>`)
        }
      }
    }).catch(error => {
      console.error(error)
    })
  }
}

(() => new UpdateProfileForm(document.getElementById('updateProfile')))()
