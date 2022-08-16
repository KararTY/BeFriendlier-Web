import { createResource, createSignal, For } from 'solid-js'
import { render } from 'solid-js/web'

const [time, setTime] = createSignal(new Date().getTime())

const fetchLogs = async () => (await fetch(`/leaderboards/battles`)).json()
const [leaderboardResponse] = createResource(time, fetchLogs)

// Refresh battle leaderboard every hour-ish.
setInterval(() => {
  setTime(new Date().getTime())
}, ((1000 * 60) * 60) + (Math.random() * 1000))

function BattleLeaderboardEntry({ index, avatar, display_name, name, total_wins, total_losses }) {
  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <div class="level is-mobile">
          <div class="level-left">
            <figure class="level-item image is-32x32 is-clipped">
              <img class={`is-rounded${globalThis.streamerMode ? ' blur' : ''}`} data-blur-vanish={globalThis.streamerMode ? 'true' : undefined} data-blur={globalThis.streamerMode ? 'channel-' + name : undefined} src={avatar.replace('300x300', '70x70')} alt={`${display_name}'s avatar`} />
            </figure>
            <span class="level-item">{display_name}{name !== display_name.toLowerCase() ? ' (' + name + ')' : ''}</span>
            {index === 0 &&
              <span class="level-item" title="The Queen Warrior duck!">(👑🥦🦆)</span>}
          </div>
        </div>
      </td>
      <td>
        <strong>{total_wins}</strong>
      </td>
      <td>
        <small>{total_losses}</small>
      </td>
    </tr>
  )
}

function BattlesLeaderboardApp() {
  return (
    <table class={`table is-fullwidth animated${leaderboardResponse.loading ? ' fadeOut' : 'fadeIn'}`}>
      <thead>
        <tr>
          <th><abbr title="Position">Pos</abbr></th>
          <th>User</th>
          <th><abbr title="Total Wins">W</abbr></th>
          <th><abbr title="Total Losses">L</abbr></th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th><abbr title="Position">Pos</abbr></th>
          <th>User</th>
          <th><abbr title="Total Wins">W</abbr></th>
          <th><abbr title="Total Losses">L</abbr></th>
        </tr>
      </tfoot>
      <tbody>
        <For each={leaderboardResponse()}>{(entry: any, index) => <BattleLeaderboardEntry index={index()} {...entry()} />}</For>
      </tbody>
    </table>
  )
}


const el = document.getElementById('battlesLeaderboard')

if (el) {
  render(BattlesLeaderboardApp, el)
}
