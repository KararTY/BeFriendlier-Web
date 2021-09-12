import { html } from 'uhtml'
import { ensureIsOfType } from './App'

class UpdateUserForm {
  private readonly form: HTMLFormElement
  private readonly elements: HTMLFormControlsCollection
  private readonly named: {
    addStreamerBtn: HTMLButtonElement
    streamerNameInput: HTMLInputElement
    submitBtn: HTMLButtonElement
    streamers: NodeListOf<HTMLInputElement>
  }

  constructor (form: Element | null) {
    if (form instanceof HTMLFormElement) {
      this.form = form
      this.elements = form.elements

      this.named = {
        addStreamerBtn: ensureIsOfType(this.elements.namedItem('addStreamer'), HTMLButtonElement),
        streamerNameInput: ensureIsOfType(this.form.querySelector('[data-name="streamerName"]'), HTMLInputElement),
        submitBtn: ensureIsOfType(this.form.querySelector('[data-name="submitBtn"]'), HTMLButtonElement),
        streamers: this.form.querySelectorAll('[name="favoriteStreamers[]"]'),
      }

      this.named.addStreamerBtn.addEventListener('click', (ev) => this.addStreamer(ev))

      this.named.streamerNameInput.addEventListener('keydown', ev => {
        if (ev.key === 'Enter') {
          ev.preventDefault()

          this.named.addStreamerBtn.click()
        }
      })

      this.named.streamers.forEach(el => {
        const parentElement = el.parentElement

        if (parentElement === null) {
          console.error('This element has no parentElement.')
          return
        }

        const deleteButton = parentElement.querySelector('.delete')

        if (deleteButton === null) {
          console.error('parentElement has no child with ".delete" class.')
          return
        }

        deleteButton.addEventListener('click', (ev) => this.removeStreamer(ev))
      })
    } else if (form instanceof Element) {
      throw new Error('Tried to append a non form element to UpdateUser.')
    }
  }

  private addStreamer = (ev: Event) => {
    ev.preventDefault()

    // Make sure ev is a MousEvent before proceeding.
    ensureIsOfType(ev, MouseEvent)

    const value = this.named.streamerNameInput.value.toLowerCase()

    if (value.length === 0 ?? value.match(/[^\w]/) ?? value.length >= 32) {
      return
    }

    const node = html.node`
      <p class="tag">
        <span>${value}</span>
        <button class="delete" name="removeStreamer" onclick="${this.removeStreamer.bind(this)}"></button>
        <input type="text" class="is-hidden" name="favoriteStreamers[]" value="${value}">
      </p>
    `

    if (this.named.streamers.length > 4) {
      return
    }

    for (let index = 0; index < this.named.streamers.length; index++) {
      const element = this.named.streamers[index]
      if (element.value === value) {
        return
      }
    }

    this.named.streamerNameInput.value = ''

    const tagsElement: HTMLElement = ensureIsOfType(document.getElementById('streamers'), HTMLElement)

    tagsElement.appendChild(node)
    this.named.streamers = this.form.querySelectorAll('[name="favoriteStreamers[]"]')
  }

  private removeStreamer = (ev: Event) => {
    ev.preventDefault()

    const mouseEvent: MouseEvent = ensureIsOfType(ev, MouseEvent)
    const target: HTMLElement = ensureIsOfType(mouseEvent.currentTarget, HTMLElement)
    const parentElement = target.parentElement

    parentElement.parentElement.removeChild(parentElement)
    this.named.streamers = this.form.querySelectorAll('[name="favoriteStreamers[]"]')
  }
}

(() => new UpdateUserForm(document.getElementById('updateUser')))()
