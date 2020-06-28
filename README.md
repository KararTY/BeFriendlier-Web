# Twitchr
Looking to hook up with POG Twitch friends?

## Requirements

## Idea
Twitch "Tinder(TM)" bot.

## Execution
  * 10 minute cooldown for a "swiping" command.
  * "Swiping" gives you a text, consisting of the user's bio.
  * You can reply to the bot with "yes" to get more information.
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
  * [Website](web/CHANGELOG.md)
  * [Bot](bot/CHANGELOG.md)

## Todo
  * Database
    * User
      * hasMany: Profile
      * manyToMany: Favorite streamers list. (Matches to other users)
    * Profile
      * manyToMany: Matches list. (Matches to other profiles)
    * (Pivot) Favorite streamers list.
    * (Pivot) Matches list.
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
    * Admin page
      * Ban users
      * Delete users
    * Make sure users go through privacy page & terms page (in that order) before being able to register via Twitch.
  * Bot
    * TODO: Make a todo. Pepega
