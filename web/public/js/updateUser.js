class UpdateUserForm {
  constructor (form) {
    if (form instanceof window.HTMLFormElement) {
      this.form = form
      this.elements = form.elements

      this.named = {
        addStreamerBtn: this.elements.namedItem('addStreamer'),
        streamerNameInput: this.form.querySelector('[data-name="streamerName"]'),
        submitBtn: this.form.querySelector('[data-name="submitBtn"]'),
        streamers: this.form.querySelectorAll('[name="favoriteStreamers[]"]'),
      }

      this.named.addStreamerBtn.addEventListener('click', this.addStreamer.bind(this))

      this.named.streamerNameInput.addEventListener('keydown', ev => {
        if (ev.key === 'Enter') {
          ev.preventDefault()

          if (this.named.addStreamerBtn instanceof window.HTMLButtonElement) {
            this.named.addStreamerBtn.click()
          }
        }
      })

      this.named.streamers.forEach(el => {
        const childEl = el.parentElement.querySelector('.delete')
        childEl.addEventListener('click', this.removeStreamer.bind(this))
      })
    } else {
      throw new Error('That is not a form.')
    }
  }

  addStreamer (ev) {
    ev.preventDefault()

    const value = this.named.streamerNameInput.value
    if (value.length === 0 || value.match(/[^\w]/) || value.length >= 32) {
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

    const tagsElement = document.getElementById('streamers')
    tagsElement.appendChild(node)
    this.named.streamers = this.form.querySelectorAll('[name="favoriteStreamers[]"]')
  }

  removeStreamer (ev) {
    ev.preventDefault()

    const parentElement = ev.target.parentElement

    parentElement.parentElement.removeChild(parentElement)
    this.named.streamers = this.form.querySelectorAll('[name="favoriteStreamers[]"]')
  }
}

(() => new UpdateUserForm(document.getElementById('updateUser')))()
