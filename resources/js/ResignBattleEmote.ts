import { displayToast } from './App'

class ResignBattleEmoteForm {
  private readonly actionUrl = '/emotes/resign'

  constructor () {
    const resignBattleEmoteIds = document.body.querySelectorAll('[data-resign-battle-emote]')

    for (let index = 0; index < resignBattleEmoteIds.length; index++) {
      const element = resignBattleEmoteIds[index] as HTMLButtonElement

      element.addEventListener('click', (event) => this.resignBattleEmote(element, event))
    }
  }

  public resignBattleEmote (element: HTMLButtonElement, event: MouseEvent): void {
    event.preventDefault()

    const id = element.dataset.resignBattleEmote as string

    const accepted = confirm('Are you sure you want to resign this battle emote?\n\nYou will receive one random emote from the same recipe in return for resigning this battle emote.')

    if (accepted) this.sendRequest(id)
  }

  private removeFromBattleEmotesColumn (battleEmoteId: string): void {
    const battleEmotesDiv = document.body.querySelector('[data-battle-emotes]') as HTMLDivElement
    const battleEmotesTitle = document.body.querySelector('[data-battle-emotes-title]') as HTMLHeadingElement

    battleEmotesTitle.dataset.battleEmotesTitle = String(Number(battleEmotesTitle.dataset.battleEmotesTitle) - 1)
    battleEmotesTitle.innerText = `Your battle emotes - x${battleEmotesTitle.dataset.battleEmotesTitle} total`

    const battleEmoteDiv = battleEmotesDiv.querySelector(`[data-id="${battleEmoteId}"]`)
    if (battleEmoteDiv !== null) battleEmoteDiv.outerHTML = ''
    else throw new Error('Could not remove battle emote from column. Refresh site?')
  }

  private async handleResponse (rawResponse: Response, battleEmoteId: string): Promise<void> {
    try {
      if (rawResponse.status !== 200) {
        const jsonError = await rawResponse.json()
        const error = new Error(jsonError.error)
        error.name = String(rawResponse.status)
        throw error
      }

      const response = await rawResponse.json()

      globalThis.combineEmotesForm.updateEmotesColumn([{ ...response, amount: 1 }])

      this.removeFromBattleEmotesColumn(battleEmoteId)

      displayToast({ message: `You have received x1 ${String(response.name)} for resigning your battle emote.` })
    } catch (error) {
      const err: Error | string = error
      displayToast(err instanceof Error ? { error: `${err.name}: ${err.message}` } : { error })
    }
  }

  private sendRequest (id: string): void {
    const requestBody = new FormData()
    requestBody.append('_csrf', (document.querySelector('[name="_csrf"]') as HTMLInputElement).value)
    requestBody.append('battleEmoteToResign', id)

    fetch(this.actionUrl, { method: 'POST', body: requestBody }).then(async (res: any) => {
      return await this.handleResponse(res, id)
    }).catch(console.error)
  }
}

globalThis.resignBattleEmoteForm = new ResignBattleEmoteForm()
