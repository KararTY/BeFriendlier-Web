class UpdateProfileForm {
  constructor (form) {
    if (form instanceof window.HTMLFormElement) {
      this.form = form
      this.elements = form.elements

      this.named = {
        bioInput: this.elements.namedItem('bio'),
        colorInput: this.elements.namedItem('color'),
        submitBtn: this.form.querySelector('[data-name="submitBtn"]'),
      }

      this.named.colorInput.addEventListener('input', ev => {
        const styleEl = document.getElementById('color')

        if (styleEl instanceof window.HTMLStyleElement) {
          styleEl.innerHTML = `.hero-body{background-color:${ev.target.value}}`
        }
      })

      // this.named.streamers.forEach(el => {
      //   const childEl = el.querySelector('.delete')
      //   childEl.addEventListener('click', this.removeStreamer.bind(this))
      // })
    } else {
      throw new Error('That is not a form.')
    }
  }

  removeMatch (ev) {
    // ev.preventDefault()

    // const parentElement = ev.target.parentElement
    // const value = parentElement.dataset.streamername
    // if (value.length === 0) {
    //   return
    // }

    // const favoriteStreamers = this.named.favoriteStreamers.value.split(',').filter(Boolean)
    // if (!(favoriteStreamers.includes(value))) {
    //   return
    // }

    // const index = favoriteStreamers.findIndex(streamer => streamer === value)
    // favoriteStreamers.splice(index, 1)

    // this.named.favoriteStreamers.value = `${favoriteStreamers.join(',')}`

    // parentElement.parentElement.removeChild(parentElement)
  }
}

(() => new UpdateProfileForm(document.getElementById('updateProfile')))()
