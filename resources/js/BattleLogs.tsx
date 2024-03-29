import { createMemo, createResource, createSignal, For, JSXElement, Show } from 'solid-js'
import { render } from 'solid-js/web'

import { getStatColor } from '../../providers/Battle'
import { paginate } from './PaginationHelper'

const [page, setPage] = createSignal()

const fetchLogs = async (page = 0): Promise<any> => await (await fetch(`/emotes/logs?page=${page}`)).json()

const [logsResponse, { refetch }] = createResource(page, fetchLogs)

function Statistic ({ statistic }): JSXElement {
  return (
    <p>
      <strong>{statistic.name}</strong>
      {typeof statistic.defValue === 'number' && typeof statistic.curValue === 'number' && (
        <>
          <strong>: </strong>
          <small>
            {statistic.curValue.toFixed(2)}
            {statistic.defValue !== statistic.curValue
              ? `/${statistic.defValue.toFixed(2)}`
              : undefined}
          </small>
        </>
      )}
    </p>
  )
}

function BattleLog ({ date, won, statistics, participants, images }): JSXElement {
  const [fullStatus, setFullStatus] = createSignal(false)

  return (
    <div class='column is-12'>
      <div class={'animated card' + (logsResponse.loading ? ' fadeOut' : ' fadeIn')}>
        <div class='card-header'>
          <div class='card-header-title' title={new Date(date).toISOString()}>
            {new Date(date).toLocaleString()}
          </div>
          <button
            class={`card-header-icon is-family-monospace ${won ? 'has-text-success' : 'has-text-danger'
              }`}
            onClick={() => setFullStatus(!fullStatus())}
          >
            {won ? (fullStatus() ? 'WIN' : 'W') : fullStatus() ? 'LOSS' : 'L'}
          </button>
        </div>
        <div class='card-content'>
          <div class='level is-mobile'>
            <div class='level-left'>
              <div class='level-item'>
                <figure class='image is-32x32'>
                  <img
                    class='is-rounded'
                    src={'/img/battle_emotes/' + images[0].localUrl}
                    alt={images[0].name + ' emote image.'}
                    title={`${images[0].name} drawn by @${images[0].author}.`}
                  />
                </figure>
              </div>
              <div class='level-item'>
                <span>
                  {images[0].name}{' '}
                  {statistics[0][4] && (
                    <span
                      class={
                        'tag p-1 has-background-dark has-text-' +
                        getStatColor(statistics[0][4].name).split('-').pop()
                      }
                    >{`[${statistics[0][4].name}]`}
                    </span>
                  )}
                </span>
              </div>
              <div class='level-item'>
                <span>{participants[0]}</span>
              </div>
            </div>
            <div class='level-right'>
              <div class='level-item'>
                <span>{participants[1]}</span>
              </div>
              <div class='level-item'>
                <span>
                  {images[1].name}{' '}
                  {statistics[1][4] && (
                    <span
                      class={
                        'tag p-1 has-background-dark has-text-' +
                        getStatColor(statistics[1][4].name).split('-').pop()
                      }
                    >{`[${statistics[1][4].name}]`}
                    </span>
                  )}
                </span>
              </div>
              <div class='level-item'>
                <figure class='image is-32x32'>
                  <img
                    class='is-rounded'
                    src={'/img/battle_emotes/' + images[1].localUrl}
                    alt={images[1].name + ' emote image.'}
                    title={`${images[1].name} drawn by @${images[1].author}.`}
                  />
                </figure>
              </div>
            </div>
          </div>
          <div class='animated'>
            <Show when={fullStatus()}>
              <div class='animated fadeIn content'>
                <div class='level is-mobile'>
                  <div class='level-left'>
                    <div>
                      <p>
                        <strong>Level: </strong>
                        <span> {statistics[0][0].defValue}</span>
                      </p>
                      <For each={statistics[0].slice(1)}>
                        {(statistic: any) => <Statistic statistic={statistic} />}
                      </For>
                    </div>
                  </div>
                  <div class='level-right'>
                    <div class='has-text-right-desktop'>
                      <p>
                        <strong>Level: </strong>
                        <span> {statistics[1][0].defValue}</span>
                      </p>
                      <For each={statistics[1].slice(1)}>
                        {(statistic: any) => <Statistic statistic={statistic} />}
                      </For>
                    </div>
                  </div>
                </div>
              </div>
            </Show>
            <button
              class='button is-fullwidth is-small'
              onClick={() => setFullStatus(!fullStatus())}
            >
              {fullStatus() ? 'Hide' : 'Show'} statistics
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Pagination ({ maxPage }) {
  const pagination = createMemo(() => paginate({ current: page() as number, maxPage }))

  return (
    <nav class='pagination is-centered' role='navigation' aria-label='pagination'>
      <button
        class={`button pagination-previous ${pagination()?.prev && 'is-disabled'}`}
        disabled={!pagination()?.prev}
        onClick={() => pagination()?.prev && setPage((page() as number) - 1)}
      >
        Previous
      </button>
      <button
        class={`button pagination-next ${pagination()?.next && 'is-disabled'}`}
        disabled={!pagination()?.next}
        onClick={() => pagination()?.next && setPage((page() as number) + 1)}
      >
        Next page
      </button>
      <ul class='pagination-list'>
        <For each={pagination()?.items}>
          {(item) => (
            <li>
              {typeof item === 'number' && (
                <button
                  class={`button pagination-link ${page() === item && 'is-current'}`}
                  aria-label={`Goto page ${item}`}
                  aria-current={page() === item ? 'page' : undefined}
                  onClick={() => setPage(item)}
                >
                  {item}
                </button>
              )}
              {typeof item === 'string' && <span class='pagination-ellipsis'>&hellip;</span>}
            </li>
          )}
        </For>
      </ul>
    </nav>
  )
}

function BattleLogsApp () {
  return (
    <div class='columns is-multiline'>
      <div class='column is-12'>
        {logsResponse()?.maxPage && <Pagination maxPage={logsResponse().maxPage} />}
      </div>

      {logsResponse()?.logs && (
        <For each={logsResponse().logs}>{(log: any) => <BattleLog {...log} />}</For>
      )}

      <div class='column is-12'>
        {logsResponse()?.maxPage && <Pagination maxPage={logsResponse().maxPage} />}
      </div>
    </div>
  )
}

const el = document.getElementById('battleLogs')

if (el != null) {
  render(BattleLogsApp, el)
}

const battleTabsToggleBtn = document.querySelectorAll('[data-battle-tabs-toggle]')

battleTabsToggleBtn.forEach((el) =>
  el.addEventListener('click', () => {
    document.querySelector('[data-battle-logs]')?.classList.toggle('is-hidden')
    document.querySelector('[data-battle-emotes]')?.classList.toggle('is-hidden')

    // We only want to run the fetch when user actually clicks on Battle Logs button.
    if (typeof page() !== 'number') setPage(1)
  })
)

const battleLogsRefreshBtn = document.querySelector('[data-battle-logs-reload]')

if (battleLogsRefreshBtn != null) {
  battleLogsRefreshBtn.addEventListener('click', () => refetch())
}
