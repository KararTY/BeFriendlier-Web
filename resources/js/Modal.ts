import { html, render } from 'uhtml'
import { getStatColor } from '../../providers/Battle'

const modal = document.querySelector('.modal') as HTMLElement

export function emoteResultModal (entry: { id: any, image: { name: string, localUrl: string, author: string }, statistics: any[] }): void {
  render(modal, html`
    <div class="modal-background" onclick="${closeModal}"></div>
    <div class="modal-card">
      <div class="modal-card-body content has-text-centered">
        <h1 class="title">A successful combination!</h1>
        <figure class="image is-256x256 is-flex m-auto">
          <img class="is-unselectable object-contain" src="${'/img/battle_emotes/' + entry.image.localUrl}"
            alt="${entry.image.name + ' emote image.'}" title="${entry.image.name + 'drawn by @' + entry.image.author}">
        </figure>
        <hr>
        <div class="columns">
          <div class="column">
            ${entry.statistics.slice(3).map((statistic) => html`
              <p>
                <label class="label">${statistic.name}</label>
                <progress class="${'progress is-small' + getStatColor(statistic.name)}" value="${statistic.curValue}"
                  max="${Number(statistic.defValue) + Number(statistic.addValue)}">
                  ${(statistic.curValue / (Number(statistic.defValue) + Number(statistic.addValue))) * 100}%
                </progress>
              </p>
            `)}
          </div>
          <div class="column">
            <p><strong>You've made ${entry.image.name}!</strong></p>
            <p>Drawn by: "${entry.image.author}"</p>
            <hr>
            <div class="buttons is-centered">
              <button class="button is-success" onclick="${closeModal}">Acknowledge</button>
              <div title="Resign the battle emote, receive a random emote from the recipe back.">
                <button class="button is-danger" onclick="${resignEmote}" data-resign-battle-emote="${entry.id}">Resign</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" onclick="${closeModal}"></button>
  `)

  modal.classList.add('is-active')
}

function closeModal (): void {
  modal.classList.remove('is-active')
}

function resignEmote (ev: MouseEvent): void {
  globalThis.resignBattleEmoteForm.resignBattleEmote(ev.currentTarget, ev)

  closeModal()
}
