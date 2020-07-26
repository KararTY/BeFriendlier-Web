class UpdateProfileForm {
  constructor (form) {
    if (form instanceof window.HTMLFormElement) {
      this.form = form
      this.elements = form.elements

      this.named = {
        bioInput: this.elements.namedItem('bio'),
        colorInput: this.elements.namedItem('color'),
        submitBtn: this.form.querySelector('[data-name="submitBtn"]'),
        matches: document.body.querySelectorAll('[data-unmatch]'),
        csrfToken: this.elements.namedItem('_csrf'),
      }

      this.named.colorInput.addEventListener('input', ev => {
        const styleEl = document.getElementById('color')

        if (styleEl instanceof window.HTMLStyleElement) {
          styleEl.innerHTML = `.hero-body{background-color:${ev.currentTarget.value}}`
        }
      })

      this.named.matches.forEach(el => {
        el.addEventListener('click', this.removeMatch.bind(this))
      })
    } else {
      throw new Error('That is not a form.')
    }
  }

  async removeMatch (ev) {
    ev.preventDefault()

    if (!(ev instanceof window.MouseEvent)) {
      return
    }

    const data = new window.FormData()
    data.append('_csrf', this.named.csrfToken.value)
    data.append('profileID', ev.currentTarget.dataset.unmatch)

    const parentElement = ev.currentTarget.parentElement
    const parentParentElement = parentElement.parentElement

    try {
      const request = await window.fetch(`${window.location.href}/unmatch`, {
        body: data,
        method: 'POST',
        credentials: 'same-origin',
      })

      const res = await request.json()

      window.displayToast(res)
      if (res.error === undefined) {
        parentParentElement.removeChild(parentElement)
        if (parentParentElement.children.length === 0) {
          parentParentElement.appendChild(html.node`<p>You've not matched with anyone. FeelsBadMan</p>`)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }
}

(() => new UpdateProfileForm(document.getElementById('updateProfile')))()
