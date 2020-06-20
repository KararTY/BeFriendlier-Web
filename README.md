# Twitchr
Looking to hook up with POG Twitch friends?

## Requirements

## Idea
Twitch "Tinder(TM)" bot.

## Execution
  * 10 minute cooldown for "swiping" command.
  * Swiping gives you a text, consisting of the user's bio and a selection of things they like.
  * You can reply to the bot with "yes" or "no" to try to match with the person.
  * Profile can be setup via command. 128 characters bio.
    * Profiles can be setup to be global or channel-specific.
    * Only one global profile.
    * Only one profile per channel.
    * Setup asks you a few questions to better "match" you with Twitch friends.
  * Profiles also accessible via web link, ~~displaying user customized pictures~~(Maybe not?).
  * Choose between global results or channel results.
  * On "match", users are whispered the user name of the person they matched with.

Stay tuned.

### Deadline: Meh.

## Features
  * Website profile page,
    * Customizable background color.
    * 5 favorite streamers.
    * 5 favorite Twitch emotes.

## Changelogs
  * [Website](web/CHANGELOG.md)
  * [Bot](bot/CHANGELOG.md)

## Todo
  * Database
    * User
      * hasMany: Profile
      * manyToMany: Favorite streamers list.
    * Profile
      * manyToMany: Matches list.
    * (Pivot) Favorite streamers list.
    * (Pivot) Matches list.
  * Website
    * ~~Splash page~~
    * ~~Login with Twitch page~~
    * ~~User page~~
    * ~~Profile page~~
      * ~~Background color~~
      * Twitch avatar
      * Twitch name
      * Favorite emotes
      * Favorite streamers
      * Profile bio
      * Matched users list
    * Profile page settings
