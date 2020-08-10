# BeFriendlier
Looking to match with POG Twitch friends?

## Requirements

## Idea
Twitch "Tinder(TM)" bot.

## Execution
  * 10 minute cooldown for a "swiping" command.
  * "Swiping" gives you a text, consisting of the user's bio.
  * You can reply to the bot with "more" to get more information.
  * You can reply to the bot with "match" to try to match with the person.
  * You can reply with "next" or "no" to skip the person.
  * Profile can be setup via command. 128 characters bio.
    * Profiles can be setup to be global or channel-specific.
    * Only one global profile.
    * Only one profile per channel.
    * Setup asks you a few questions to better "match" you with other users.
  * Profiles also accessible via web link.
  * Choose between global results or channel results.
  * On "match", users are **whispered** the username of the person they matched with.

Stay tuned.

### Deadline: Meh.

## Features
  * Website profile page,
    * Customizable background color.
    * 5 favorite streamers.
    * 5 favorite Twitch emotes.
    * 128 characters bio.

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
  * `npm start-watch` to start web server in watch mode (Reloads on file change) with debugging websocket enabled.
  * Or alternatively `npm start` to start web server in "production" mode (No reloading on file change and no debugging websocket). That's it.

## Contributing
  * Use the provided eslint `.eslintrc.json` file.
  * Run `npm run lint` to check for formatting issues.
  * Run `npm run lintfix` to fix formatting issues.
  * Always create a new branch, it's recommended to not push to master.
  * Issue a pull request. Pull requests are squashed into 1 commit.
  * Use semver semantics in your commits, and make sure they adhere to the conventional commits specification. [Read more here](https://www.conventionalcommits.org/en/v1.0.0/).
  * If you are creating a release in your own fork, run `npm run release`.

## Database relationships
  * User
    * hasMany: Profile
    * manyToMany: Favorite streamers list. (Matches to other users)
  * Profile
    * manyToMany: Matches list. (Matches to other profiles)
  * (Pivot) Favorite streamers list.
  * (Pivot) Matches list.

## Todo
  * Website
    * ~~Splash page~~
    * ~~Login with Twitch page~~
    * ~~User page~~
    * ~~Profile page~~
      * ~~Background color~~
      * ~Twitch avatar~
      * ~Twitch name~
      * ~~Favorite emotes~~
      * ~Favorite streamers~
      * ~Profile bio~
      * ~~Matched users list~~
    * ~~Profile page settings~~
    * ~~Make sure users go through privacy page & terms page (in that order) before being able to register via Twitch.~~
    * Admin page
      * Ban users
      * Delete users
    * Bots end-point
      * ~~Keep track of clients.~~
      * Refresh bot data.
      * Tell bot to track new channel.
      * ~~Roll a match.~~
      * ~~Confirm matches.~~
      * ~~Remove matches.~~
  * Bot
    * ~~TODO: Make a todo. Pepega~~
