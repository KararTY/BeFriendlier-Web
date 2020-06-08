class UpdateUserForm {
  constructor (form) {
    if (form instanceof window.HTMLFormElement) {
      this.form = form
      this.elements = form.elements

      this.named = {
        addStreamerBtn: this.elements.namedItem('addStreamer'),
        streamerNameInput: this.form.querySelector('[data-name="streamerName"]'),
        favoriteStreamers: this.elements.namedItem('favoriteStreamers'),
        submitBtn: this.form.querySelector('[data-name="submitBtn"]'),
        streamers: this.form.querySelectorAll('[data-streamername]'),
      }

      this.named.addStreamerBtn.addEventListener('click', this.addStreamer.bind(this))

      this.named.streamerNameInput.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter') {
          ev.preventDefault()

          if (this.named.addStreamerBtn instanceof window.HTMLButtonElement) {
            this.named.addStreamerBtn.click()
          }
        }
      })

      this.named.streamers.forEach(el => {
        const childEl = el.querySelector('.delete')
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
      <p class="tag" data-streamername="${value}">
        <span>${value}</span>
        <button class="delete" name="removeStreamer" onclick="${this.removeStreamer.bind(this)}"></button>
      </p>
    `

    const favoriteStreamers = this.named.favoriteStreamers.value.split(',').filter(Boolean)
    if (favoriteStreamers.includes(value)) {
      return
    }

    if (favoriteStreamers.length > 4) {
      return
    }

    favoriteStreamers.push(value)
    this.named.favoriteStreamers.value = `${favoriteStreamers.join(',')}`
    this.named.streamerNameInput.value = ''

    const tagsElement = document.getElementById('streamers')
    tagsElement.appendChild(node)
  }

  removeStreamer (ev) {
    ev.preventDefault()

    const parentElement = ev.target.parentElement
    const value = parentElement.dataset.streamername
    if (value.length === 0) {
      return
    }

    const favoriteStreamers = this.named.favoriteStreamers.value.split(',').filter(Boolean)
    if (!(favoriteStreamers.includes(value))) {
      return
    }

    const index = favoriteStreamers.findIndex(streamer => streamer === value)
    favoriteStreamers.splice(index, 1)

    this.named.favoriteStreamers.value = `${favoriteStreamers.join(',')}`

    parentElement.parentElement.removeChild(parentElement)
  }
}

const updateUserForm = new UpdateUserForm(document.getElementById('updateUser'))
