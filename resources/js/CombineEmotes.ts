import { html, render } from 'uhtml'
import { getStatColor, sortEmoteEntryArray } from '../../providers/Battle'
import { displayToast } from './App'
import { emoteResultModal } from './Modal'

interface EmoteUpdate {
  id: string
  amount: number
  name?: string
}

class CombineEmotesForm {
  private readonly elements: Set<string> = new Set()
  private readonly form: HTMLFormElement
  private readonly battleEmotesColumns: HTMLDivElement
  private readonly emotesColumns: HTMLDivElement
  private readonly emotesCombineListColumns: HTMLDivElement
  private readonly submitButtons: HTMLDivElement

  constructor (form: Element) {
    if (form instanceof HTMLFormElement) {
      this.form = form
      this.battleEmotesColumns = document.getElementById('battleEmotesColumns') as HTMLDivElement
      this.emotesColumns = document.getElementById('emotesColumns') as HTMLDivElement
      this.emotesCombineListColumns = document.getElementById('emotesCombineListColumns') as HTMLDivElement
      this.submitButtons = document.getElementById('emoteSubmitButtons') as HTMLDivElement

      const combineButton = this.submitButtons.querySelector('[data-id="combine"]')

      if (combineButton !== null) combineButton.addEventListener('click', () => this.sendRequest())
      else throw new Error('Failed to find combine buttons for CombineEmotes.')

      const emoteIdElements = document.body.querySelectorAll('[data-emote-id]')
      for (let index = 0; index < emoteIdElements.length; index++) {
        const element = emoteIdElements[index] as HTMLButtonElement

        element.addEventListener('click', (event) => this.toggleEmote(element, event))
      }
    } else if (form instanceof Element) {
      throw new Error('Tried to append a non form element to CombineEmotes.')
    }
  }

  private toggleButtons (yes: boolean): void {
    if (!yes) this.submitButtons.classList.add('is-hidden')
    else this.submitButtons.classList.remove('is-hidden')
  }

  private updateEmoteCombineList (): void {
    const emoteIds = [...this.elements]

    render(this.emotesCombineListColumns, html`
      ${emoteIds.map(eId => html`
      <div class="column is-narrow">
        <div class="box">
          <figure class="image is-32x32 is-flex m-auto">
            <img class="is-unselectable object-contain"
              src="${'https://static-cdn.jtvnw.net/emoticons/v2/' + eId + '/default/light/2.0'}">
          </figure>
        </div>
      </div>`
      )}
    `)
  }

  private toggleEmote (element: HTMLButtonElement, event: MouseEvent): void {
    event.preventDefault()

    const { disabled, emoteId } = element.dataset

    if (disabled === '1') return
    if (emoteId === undefined) return

    if (this.elements.has(emoteId)) {
      (element as HTMLElement).classList.remove('has-background-success')
      this.elements.delete(emoteId) // Remove
    } else {
      (element as HTMLElement).classList.add('has-background-success')
      this.elements.add(emoteId) // Add
    }

    this.toggleButtons(this.elements.size > 0)
    this.updateEmoteCombineList()
  }

  private appendToBattleEmotesColumn (entry: { id: any, image: { name: string, localUrl: string, author: string }, statistics: any[] }): void {
    const battleEmotesElement = document.body.querySelector('[data-battle-emotes]')

    if (battleEmotesElement === null) throw new Error('Could not append emote to battle emotes column.')

    battleEmotesElement.classList.remove('is-hidden')
    const battleEmotesTitle = document.body.querySelector('[data-battle-emotes-title]') as HTMLDivElement

    battleEmotesTitle.dataset.battleEmotesTitle = String(Number(battleEmotesTitle.dataset.battleEmotesTitle) + 1)
    battleEmotesTitle.innerText = `Your battle emotes - x${battleEmotesTitle.dataset.battleEmotesTitle} total`

    const battleHTML = html.node`
      <div class="column is-3" data-id="${entry.id}">
        <div class="box content">
          <div class="level is-mobile is-marginless">
            <div class="level-left">
              <strong class="level-item is-size-4">${entry.image.name}</strong>
            </div>
            <div class="level-right" title="Resign the battle emote, receive a random emote from the recipe back.">
              <button class="button" data-resign-battle-emote="${entry.id}"
                onclick="${(ev: MouseEvent) => globalThis.resignBattleEmoteForm.resignBattleEmote(ev.currentTarget, ev)}">
                <small>Resign</small>
              </button>
            </div>
          </div>
          <figure class="image max-width-256 is-flex m-auto">
            <img class="is-unselectable object-contain" src="${'/img/battle_emotes/' + entry.image.localUrl}"
              alt="${entry.image.name + ' emote image.'}" title="${entry.image.name + 'drawn by @' + entry.image.author}">
          </figure>
          <p>
            <br><strong>Level:</strong> <span> ${entry.statistics[0].curValue}</span>
          </p>
          ${entry.statistics.slice(2).map((statistic) => html`
          <p>
            <label class="label">${statistic.name}</label>
            <progress class="${'progress is-small' + getStatColor(statistic.name)}" value="${statistic.curValue}"
              max="${Number(statistic.defValue) + Number(statistic.addValue)}">
              ${(statistic.curValue / (Number(statistic.defValue) + Number(statistic.addValue))) * 100}%
            </progress>
          </p>
          `)}
        </div>
      </div>
    `

    this.battleEmotesColumns.appendChild(battleHTML)
  }

  public updateEmotesColumn (emotes: EmoteUpdate[]): void {
    const emoteTitle = document.querySelector('[data-emotes-title') as HTMLHeadingElement
    const emoteDiv = document.getElementById('emotesColumns') as HTMLDivElement

    for (let index = 0; index < emotes.length; index++) {
      const emoteToUpdate = emotes[index]

      let emote: HTMLAnchorElement | null = this.emotesColumns.querySelector(`[data-emote-id="${emoteToUpdate.id}"]`)

      if (emote === null) {
        const emoteHTML = html.node`
          <div class="column is-narrow is-unselectable">
            <div class="box is-paddingless image is-128x128 is-flex is-flex-direction-column is-align-items-center is-justify-content-center"
              data-emote-id="${emoteToUpdate.id}"
              onclick="${(event: MouseEvent) => this.toggleEmote(event.currentTarget as HTMLButtonElement, event)}">
              <figure class="image is-32x32 is-flex">
                <img class="object-contain"
                  src="${'https://static-cdn.jtvnw.net/emoticons/v2/' + emoteToUpdate.id + '/default/light/1.0'}"
                  alt="${(emoteToUpdate.name ?? emoteToUpdate.id) + ' emote image'}">
              </figure>
              <p><strong data-amount="0">x0</strong></p>
              <small>${emoteToUpdate.name ?? emoteToUpdate.id}</small>
            </div>
          </div>
        `

        emoteDiv.appendChild(emoteHTML)

        emote = this.emotesColumns.querySelector(`[data-emote-id="${emoteToUpdate.id}"]`) as HTMLAnchorElement
      }

      const emoteAmountEl = emote.querySelector('[data-amount]') as HTMLElement

      const count = Number(emoteAmountEl.dataset.amount) + (emoteToUpdate.amount)
      emoteAmountEl.dataset.amount = String(count)

      emoteAmountEl.textContent = `x${emoteAmountEl.dataset.amount}`

      if (count <= 0) {
        (emote as HTMLElement).classList.add('has-background-danger')
        emote.dataset.disabled = '1'
      } else {
        ;(emote as HTMLElement).classList.remove('has-background-success')
        ;(emote as HTMLElement).classList.remove('has-background-danger')
        emote.dataset.disabled = '0'
      }

      emoteTitle.dataset.emotesTitle = String(Number(emoteTitle.dataset.emotesTitle) + emoteToUpdate.amount)
      emoteTitle.innerText = `Your emotes - x${emoteTitle.dataset.emotesTitle} total`
    }
  }

  private async handleResponse (rawResponse: Response): Promise<void> {
    try {
      if (rawResponse.status !== 200) {
        const jsonError = await rawResponse.json()
        const error = new Error(jsonError.error)
        error.name = String(rawResponse.status)
        throw error
      }

      const response = await rawResponse.json()

      this.updateEmotesColumn([...this.elements].map(e => {
        return {
          id: e,
          amount: -1
        }
      }))

      // globalThis.emotesAnimation.rollEmoteResult(response.image)
      emoteResultModal(response)

      this.appendToBattleEmotesColumn(response)

      displayToast({ message: 'You have successfully made a battle emote!' })

      this.elements.clear()
      this.updateEmoteCombineList()
    } catch (error) {
      const err: Error | string = error
      displayToast(err instanceof Error ? { error: `${err.name}: ${err.message}` } : { error })
    }
  }

  private sendRequest (): void {
    const requestBody = new FormData(this.form)

    const emoteEntryArray = [...this.elements].map(eId => { return { emoteId: eId } })
    const sortedArray = sortEmoteEntryArray(emoteEntryArray).map(emoteEntry => emoteEntry.emoteId)
    requestBody.append('emotesToCombine', JSON.stringify(sortedArray))

    fetch(this.form.action, { method: this.form.method, body: requestBody }).then(async (res: any) => {
      return await this.handleResponse(res)
    }).catch(console.error)
  }
}

globalThis.combineEmotesForm = new CombineEmotesForm(document.getElementById('emotesCombine') as HTMLElement)
