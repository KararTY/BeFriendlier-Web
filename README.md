# BeFriendlier

Looking to match with POG Twitch friends?

## External APIs in use

* [Perspective API](https://www.perspectiveapi.com/)

## Requirements

* Production:
  * postgresql

## Features

* Website profile page.
  * Customizable background color.
  * 5 favorite streamers.
  * 128 characters bio, including 3 favorite Twitch emotes.
* Emotes
  * Collect Twitch emotes.
  * Combine emotes to make exclusive battle emotes.
  * Battle with your matched friends using your battle emotes.
* Leaderboards
  * See who has farmed the most emotes and become 👑🦆 (King/Queen Duck). Hosted channels have a separate leaderboard.
* Twitch bot [(Separate)](https://github.com/KararTY/BeFriendlier-Bot).

## Changelogs

* [Website](CHANGELOG.md)
* [Bot](https://github.com/KararTY/BeFriendlier-Bot/blob/master/CHANGELOG.md)
* [Shared](https://github.com/KararTY/BeFriendlier-Shared/blob/master/CHANGELOG.md)

## Setup

* `npm i` / `yarn i` / `pnpm i --shamefully-hoist` to install packages.
* Copy `.env.example`, to a new file named `.env`.
* Change the environment values in the new `.env` file.
* Check `config/` directory for other configurations to change. Default config values should be sufficient for development, however.
* If your `DB_CONNECTION` is not set to `sqlite`, make sure to create a database with the same name under `DB_NAME`.
* `npm run r:m:s` for seeding the database with initial values. If `NODE_ENV` is set to `development`, you will also get development values to test around with.
* `npm run dev` to start web server in watch mode (Reloads on file change) with debugging websocket enabled.
* Or alternatively `npm run build && npm start` to build & start web server in "production" mode (No reloading on file change and no debugging websocket). That's it.

## Contributing

* Use `ts-standard` for linting and code style:
  * Run `npm run lint` to check for formatting issues.
  * Run `npm run format` to fix formatting issues.
* Always create a new branch, it's recommended to not push to master.
* Issue a pull request. Pull requests are squashed into 1 commit.
* Pull requests should ***only introduce or fix one thing***.
* Use Conventional Commits specification for your commit messages. [Read more here](https://www.conventionalcommits.org/en/v1.0.0/). This project mostly make use of fix/feat/chore/docs/refactor.
* If you are creating a release in your own fork, run `npm run release`.

## Database relationships

* User
  * profile hasMany: Profile
  * emotes hasMany: EmoteEntry
  * favoriteStreamers manyToMany: Favorite streamers list. (Matches to other users)
* Profile
  * manyToMany: Matches list. (Matches to other profiles)
* BattleEntry
  * user belongsTo: User
  * battle belongsTo: Battle
* Battle
  * battleEntries hasMany: BattleEntry
* (Pivot) Favorite streamers list.
* (Pivot) Matches list.

[Find the database models under app/Models.](app/Models/)

## Todo

[Check project page for Todo list.](https://github.com/users/KararTY/projects/1)
