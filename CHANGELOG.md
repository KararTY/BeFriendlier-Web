# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 0.2.0 (2020-07-26)


### ⚠ BREAKING CHANGES

* Move files to root directory.

### Features

* Move files to root directory. ([70ac504](https://github.com/KararTY/Twitchr/commit/70ac5048d096333eeaf14944c164d9d1c193dc70))
* **config:** scopes & redirectURI now in a config ([c160167](https://github.com/KararTY/Twitchr/commit/c1601679cab7cabf0d9a9dbfba6874193186493f))
* **splash:** Now shows updated statistics. ([f732a24](https://github.com/KararTY/Twitchr/commit/f732a247a36af36aa327acb0dfbd821f4c93600a))
* **validation:** Validation schemas now cached. ([cf76367](https://github.com/KararTY/Twitchr/commit/cf76367cc16313d4fb93897efbbf11617709f374))


### Bug Fixes

* **gitignore:** Ignore pnpm-lock.yaml ([f401ffd](https://github.com/KararTY/Twitchr/commit/f401ffd5e21fa2fe4b5345bf5d126f8854646804))
* **middlewares:** Use luxon math ([3477db0](https://github.com/KararTY/Twitchr/commit/3477db0108659f2de382909dfa531952466a407d))
* **README:** Fix links & cross Todo items. ([3c0fe87](https://github.com/KararTY/Twitchr/commit/3c0fe872353d1daaf67b11458c9c1efbc9e6b3ea))
* **splash:** Typo, hours when it should be minutes ([bfefe63](https://github.com/KararTY/Twitchr/commit/bfefe63676799db6b268fa28884b3e44f7fc3b4f))
* **Websocket:** Fix import reference to module. ([fed2847](https://github.com/KararTY/Twitchr/commit/fed2847ce7e5e8f624f9d9fbe86b0d764d6fc0b0))
* Refactor dev error when seeds not run. ([7a8c475](https://github.com/KararTY/Twitchr/commit/7a8c475d733ddd46ff0e7c5be1a4273d47e4c155))

## 0.1.0 (2020-07-26)


### ⚠ BREAKING CHANGES

* Remove `/ws` end-point.

### Features

* **config:** scopes & redirectURI now in a config ([c160167](https://github.com/KararTY/Twitchr/commit/c1601679cab7cabf0d9a9dbfba6874193186493f))
* **package:** Add new modules. ([ba792b5](https://github.com/KararTY/Twitchr/commit/ba792b5b20cd7de7ff559d97f9914cc4063633f4))
* **Profile:** Add /paginate end-point. ([921cb6a](https://github.com/KararTY/Twitchr/commit/921cb6a4d6aec91405f23342fa9dcb3b78967201))
* **Profile:** Check if users are matched ([2847858](https://github.com/KararTY/Twitchr/commit/2847858941c9d208a5179076dda9ca662ef9c65d))
* **Profile:** New Match columns. ([9b09e1f](https://github.com/KararTY/Twitchr/commit/9b09e1f64a95db396af7c8dd3876698724fde7fd))
* **splash:** Now shows updated statistics. ([f732a24](https://github.com/KararTY/Twitchr/commit/f732a247a36af36aa327acb0dfbd821f4c93600a))
* **validation:** Validation schemas now cached. ([cf76367](https://github.com/KararTY/Twitchr/commit/cf76367cc16313d4fb93897efbbf11617709f374))
* **Websocket:** Added prototype websocket logic. ([aa0cbcc](https://github.com/KararTY/Twitchr/commit/aa0cbcc4c78bf3d70d12ed9e9e30647bad32165e))


### Bug Fixes

* **gitignore:** Ignore pnpm-lock.yaml ([f401ffd](https://github.com/KararTY/Twitchr/commit/f401ffd5e21fa2fe4b5345bf5d126f8854646804))
* **lint:** Lint tsconfig. ([f081bcc](https://github.com/KararTY/Twitchr/commit/f081bcc1c39f0110c8f11b089a1bd32581b1e23a))
* **middlewares:** Use luxon math ([3477db0](https://github.com/KararTY/Twitchr/commit/3477db0108659f2de382909dfa531952466a407d))
* **Seeding:** Add new user to test banned users. ([94fa520](https://github.com/KararTY/Twitchr/commit/94fa520b5cc5e6728a12eb369ad94159c1f6bcd0))
* **Twitch:** Allow Twitch module to throw errors. ([b8e0a50](https://github.com/KararTY/Twitchr/commit/b8e0a50e16fd562dca477ba1908753b2ae3967d4))
* Refactor dev error when seeds not run. ([7a8c475](https://github.com/KararTY/Twitchr/commit/7a8c475d733ddd46ff0e7c5be1a4273d47e4c155))
* Remove `/ws` end-point. ([a0795c5](https://github.com/KararTY/Twitchr/commit/a0795c571a54f4192c42fdd47da9c602913370ea))
* **splash:** Typo, hours when it should be minutes ([bfefe63](https://github.com/KararTY/Twitchr/commit/bfefe63676799db6b268fa28884b3e44f7fc3b4f))

### v0019a (ba7ccef867e5c3e4c258fb2b4420eabce18d2bb3)
  * This was supposed to be uploaded with c1601679cab7cabf0d9a9dbfba6874193186493f.
    * refactor(Twitch): Updated Twitch.ts
### v0018a (a78c130a6b80b3b897cfa9628c14b833fea10c41)
  * This was supposed to be uploaded with f732a247a36af36aa327acb0dfbd821f4c93600a.
    * refactor(splash): Updated splash template
### v0017a (bfefe63676799db6b268fa28884b3e44f7fc3b4f)
  * fix(splash): Typo, hours when it should be minutes
### v0016a (f732a247a36af36aa327acb0dfbd821f4c93600a)
  * Splash page may contain more statistics in the future, this should be okay for now.
    * feat(splash): Now shows updated statistics.
  * Changed `1_favorite_streamer_lists`'s & `1_matches_lists`'s `created_at` & `updated_at` default value behavior.
    * fix(migrations): Now using toSQL() instead of toFormat().
### v0015a (ad921707f1cd0b99e3edc6a30b8596c72e14e51d)
  * chore(dependencies): Update dependencies.
    * **devdependencies**
      * `@typescript-eslint/eslint-plugin` changed to `^3.7.0`.
      * `eslint` changed to `^7.5.0`.
      * `eslint-plugin-adonis` changed to `^1.0.14`.
      * `eslint-plugin-import` changed to `^2.22.0`.
      * `pino-pretty` changed to `^4.1.0`.
      * `sqlite3` changed to `^5.0.0`.
      * `typescript` changed to `^3.9.7`.
    * **dependencies**
      * `@adonisjs/auth` changed to `^4.2.4`.
      * `got` changed to `^11.5.1`.
      * `pg` changed to `^8.3.0`.
      * `phc-argon2` changed to `^1.0.10`.
### v0014a (affc76836dd0b8a9ef3df9b4148d4fc53e42e391)
  * Renamed template global from `twitchAuth` to `twitchAuthURL` in `AppProvider` for clarification.
    * refactor(AppProvider): Renamed template global.
### v0013a (c1601679cab7cabf0d9a9dbfba6874193186493f)
  * Twitch script now uses the scopes & redirectURI provided in the config under `config/twitch.ts` file. Also moved logic from `AppProvider`'s template global `twitchAuth` to `Twitch` as it's more appropriate to handle all Twitch related logic in one file.
    * feat(config): scopes & redirectURI now in a config
    * feat(TwitchProvider): Now uses new Twitch config.
    * feat(Twitch): authorizationURL now parses url.
    * refactor(AppProvider): Using Twitch.authorizationURL instead.
### v0012a (3477db0108659f2de382909dfa531952466a407d)
  * In the middlewares `RefreshTwitchToken` & `ValidateTwitchToken` the refresh dates are now *next* instead of last. This means we expect the values to be in the positive when diffing *until* the next date is hit.
    * fix(middlewares): Use luxon math
### v0011a (7a8c475d733ddd46ff0e7c5be1a4273d47e4c155)
  * fix: Refactor dev error when seeds not run. Will do a full DRY run later.
### v0010a (cf76367cc16313d4fb93897efbbf11617709f374)
  * feat(validation): Validation schemas now cached.
  * fix(public/js/app): No longer shows "I accept" if already accepted.
  * docs(AuthController): Clarified comments.
  * From here and onwards, [conventional commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) will be used and changelogs will now contain full commit hash and no dates.
### v0009a (24e7b7523cde9666c3b2a28dbe321c06597dba28)
  * Merge pull request #1. Bump lodash from 4.17.15 to 4.17.19 in /web.
### v0009a (0d8534741d0586bf7ae5fbefbcda27966102c571)
  * WIP: Prototype websockets implemented. Only for bot-to-server communications.
  * Updated README.md with more TODOs.
### v0008a (6e9a01d) commit 2020-06-29
  * Users now have to go through Privacy Policy & Terms of Service to be able to register/login.
  * Added a simple `Cookie` class to `app.js`. For dealing with cookies on the front-end.
  * Added `setToSCookies()` function to `app.js`.
### v0007a (18e0ebb) commit 2020-06-28
  * Added `seed` npm script. This will seed the database with development data.
  * Added `r:m:s` npm script. It will rollback, migrate and then seed the database all-in-one command.
  * `AuthController.register()` when `NODE_ENV=development` will now make all users who try to login use the "Test" account that is provided in the `Development` database seed.
  * `ProfilesController.read()` will no longer preload ALL matches, and will instead only query 10 matches.
  * Since all matches are no longer preloaded, things have now been refactored when trying to retrieve someone else's profile.
  * Removed various redundant comments in `ProfilesController`
  * Major refactoring done to `ProfilesController.read()` due to refactoring of Profile model `matches` relationship changing into other Profiles.
  * Changed how a profile is sent to front-end. Every matched user will now have 2 variables: `user` & `profile`.
  * When trying to view someone else's profile, backend will now query the `matches_lists` table instead of how it used to work due to refactoring of Profile model.
  * `guest` variable now not sent to front-end, instead the front-end uses conditional check to see if user should have `updateProfile.edge` template shown.
  * Fixed bug where when deleting profile, users that matched with this profile wouldn't have their record of the deleted profile deleted as well.
  * Refactored `ProfilesController.delete()` to work with new Profile model.
  * WIP: Added `ProfilesController.matches()` to send matches for pagination purposes. Not implemented in front-end yet, however!
  * Fixed bug in `UsersController.update()` when checking banned users. Missed the `await` prefix for the promise.
  * Changed `UsersController.update()` due to refactoring of the Profile model.
  * `newFavoriteStreamers` variable now sorts by `updatedAt` to make sure you don't add duplicate users if they happen to have the same User model `name` value.
  * Fixed bug in `UsersController.delete()` where profiles who matched with you weren't deleted.
  * Added missing `createdAt` field in BannedUser model.
  * Profile model refactored. `chatId` is now `chatUserId`. `global` field has been removed: `chatUserId === 0` is now the check for global profiles. `matches` relationship is now to other Profiles instead of Users, fields have been changed to reflect that. The `matches_lists` will now also return `user_id` and `match_user_id` as `pivotColumns`.
  * Fixed timestamps for `favorite_streamer_lists` schema.
  * Changed `matches_lists` schema to reflect refactoring changes done to Profile model. `profile_id` equals the parent profile's id. `match_profile_id` equals the related profile's id. `match_user_id` equals the related profile's user's id. Timestamps now work, too.
  * Changed `profiles` schema to reflect the refactoring changes. `chat_id` is now `chat_user_id`.
  * Added development seeder, under `database/seeders/Development.ts`. Will fill the database with development data, for debugging purposes.
  * `TwitchProvider` now appends AdonisJS/Logger to the `Twitch` instance.
  * Changed `ev.target` to `ev.currentTarget` in `app.js` due to HTML bubbling.
  * Added `displayToast()` to `app.js`. For creating toast messages in the front-end javascript.
  * More implementations done to `updateProfile.js`. As well as changing `ev.target` to `ev.currentTarget`. Matched users can now be deleted via front-end.
  * Changed `ev.target` to `ev.currentTarget` in `updateUser.js` due to HTML bubbling.
  * Removed stray `is-rounded` classes in profile.edge template.
  * Favorite streamers' list in profile.edge template will now display User model `displayName` as well as `name` if the two do not match or otherwise only display `displayName`. This is for users who have non-latin characters in their display name.
  * Changed the conditional in profile.edge from `!guest` to `profileUser.id === user.id` to check whether user owns said profile.
  * Removed debugging stuff from profile.edge template.
  * Changed profiles.edge template conditional to reflect changes done to Profile model. As well as adding `level-item` classes for consistency.
  * Changed layout of user.edge template. Will now display the commands.edge and updateUser.edge template as columns in desktop screens (Side-by-side).
  * Changed updateProfile.edge template to reflect changes done to Profile model.
  * Changed updateUser.edge template to reflect changes done to Profile model.
  * Changed header sizes in commands.edge template file. They're now smaller.
  * Added matches.edge template file to show profile's matched profiles.
  * `Twitch` now uses AdonisJS/Logger instead of `console.error()`.
### v0006a commit (bc76f3b) 2020-06-26
  * `profile.edge` template file changed. Will now no longer display login (User model `name` column) if it's the same as the display name (User model `displayName` column).
  * Fixed bug in `UsersController.refresh()` where name was set to `display_name` value from Twitch API instead of `login` value from Twitch API.
### v0005a commit (651da6b) 2020-06-25
  * Updated README.md to reflect changes.
  * Added validationRules file to `adonisrc.json` file so that it can properly preload file.
  * Chore: `package.json` updated.
    * **devdependencies**
      * `@adonisjs/assembler` changed to `^2.1.3`.
      * `@typescript-eslint/eslint-plugin` changed to `^3.4.0`.
      * `eslint` changed to `^7.3.1`.
      * `eslint-plugin-adonis` changed to `^1.0.12`.
    * **dependencies**
      * `@adonisjs/auth` changed to `^4.2.2`.
      * `@adonisjs/core` changed to `^5.0.0-preview-rc-1.9`.
  * Refactored flash messages in `AuthController.register` and
  `AuthController.logout`.
  * Added `HealthChecksController` for checking service health. WIP: Will eventually also include health data about the bot.
  * More code readability in `ProfilesController.read()`.
  * Refactored flash messages in `ProfilesController.read()`.
  * Fixed bug where a guest user wouldn't see the `favoriteStreamers[]` for said user.
  * Added `ProfilesController.update()`. Profiles can now be edited.
  * More code readability in `ProfilesController.delete()`.
  * Refactored flash messages in `ProfilesController.delete()`.
  * Implemented `ProfilesController.unmatch()`. *While end-point can be accessed, there's no way to access it via front-end.*
  * More code readability in `UsersController`. Moved imports around.
  * Changed validation method for `UsersController.update()`. Now uses AdonisJS validation module.
  * Refactored flash messages in `UsersController.update()`.
  * Added banned user check for `favoriteStreamers[]`.
  * Added flash message for trying to add banned users to `favoriteStreamers[]`.
  * Removed `Twitch.refreshToken()` from `UsersController.update()`. This is now handled in the `RefreshTwitchToken` middleware.
  * More code readability in `UsersController.update()`. Changed variable names from `i` to `user` in a `map()` and `filter()`. Added conditionals *(Example: value is not undefined)* instead of if statements for `streamerMode` and `globalProfile`.
  * Will now no longer try to add to `favoriteStreamers[]` if `newFavoriteStreamers[]` is empty.
  * Refactored flash messages in `UsersController.delete()`.
  * Refactored flash messages in `UsersController.refresh()`.
  * Removed `Twitch.refreshToken()` from `UsersController.refresh()`. This is now handled in the `RefreshTwitchToken` middleware.
  * Fixed edge (Adonisjs/Edge view template engine) deprecation errors in the default exceptions handler under `App/Exceptions/Handler.ts`.
  * Refactored flash messages in `Auth` middleware.
  * Added `RefreshTwitchToken` middleware. Will refresh Twitch `access_token` every 1 hour if trying to access HTTP Controllers (App/Controllers/Http) behind it. Use `start/routes/` to find out which end-point is using which middleware.
  * Added `ValidateTwitchToken` middleware. Will validate... =/= See above.
  * Added BannedUser model for dealing with banned users.
  * Removed serialization in Profile model for column `color`. Profile model column `color` now has `#` in the database by default.
  * Changed serialization for `favoriteStreamers[]`. The field is serialized into `favorite_streamers` for consistency.
  * Fixed eslint issues in `contracts/events.ts`
  * Added validator contract for typescript type checking.
  * **npm run migration:rollback** is required for this update! This will irreversibly delete all user data! Hopefully for the last time during development.
  * Migration file `1_profiles.ts` has been changed to allow `#` for Profile model `color` column. This is for validation purposes.
  * Migration file for banned_users now exists.
  * Changed migration file name from `1592771278779_users.ts` to `2_users.ts` due to issues with migration order.
  * Made the "Unblur" text optional on blurred elements with the new `data-blur-text` dataset.
  * Added `initToastButton()` to allow the toast notification to be closed.
  * `updateUser.js` has been refactored to work with the new `favoriteStreamers[]`. `favoriteStreamers[]` no longer returns a string. It is now returned as an array on the back-end.
  * Added toast notification stylesheet. It's mostly based on `@rfoel/bulma-toast`.
  * Moved around elements in `core.edge` template and added Open Graph Protocol fields.
  * `core.edge` template now contains the `flashMessages()` as it has been changed into a toast notification.
  * Added `privacy.edge` template & page.
  * Profile now shows off `favoriteStreamers[]` and `favoriteEmotes[]`.
  * Added footer to profile page.
  * Removed flash messages from the `profiles.edge` template.
  * Added footer to profiles page.
  * Removed flash messages from the `splash.edge` template.
  * Added `terms.edge` template & page.
  * Removed `inspect()` in `user.edge` template as we're pretty much done with its implementation.
  * Renamed and reformatted `not-found.edge` template to `notFound.edge` template.
  * Renamed and reformatted `server-error.edge` template to `serverError.edge` template.
  * Fixed a bug in `updateProfile.edge` where user would submit changes to wrong end-point by not appending the `id` parameter.
  * Renamed `#profile` to `#profileSettings` in `updateProfile.edge` template.
  * Removed flash messages from the `updateProfile.edge` template.
  * Added validator flash messages for `updateProfile.edge` template.
  * Renamed `#user` to `#userSetttings` in `updateUser.edge` template.
  * Removed flash messages from the `updateUser.edge` template.
  * Added validator flash messages for `updateUser.edge` template.
  * `favoriteStreamers[]` avatars are now rounded.
  * Refactored how `favoriteStreamers[]` are rendered in `updateUser.edge` template.
  * Changed global profile selector into checkbox.
  * Changed global profile help text to reflect changes.
  * Changed streamer mode selector into checkbox.
  * Changed streamer mode help text to reflect changes.
  * Added `flashMessages.edge` under `includes` folder.
  * Changed how footer is displayed by making the links into buttons.
  * Navbar will now display even if you aren't logged in, but with "Logout", "Profiles" and your profile avatar missing.
  * Removed version number from `user-agent` header sent to Twitch in `src/Twitch.ts`.
  * Added `TwitchValidateBody` for use with the new `Twitch.validateToken()` function.
  * `Twitch.requestToken()` now asks for `user_subscriptions` scope. It's a v5 scope, not sure it actually works in Helix.
  * Changed overload for `Twitch.getUser()`. Should now properly check whether returned value is of array or just a single `TwitchUsersBody`.
  * Fixed bug in `Twitch.refreshToken()`. The request to refresh token is to be done as `POST` and not `GET`.
  * Added `Twitch.validateToken()` function in `Twitch`. For use in the `ValidateTwitchToken` middleware.
  * Added `RefreshTwitchToken`, `ValidateTwitchToken` named middleware to kernel file.
  * Added /health, /privacy, /terms to routes file.
  * Added `hexColorString` validation rule for Profile model `color` column.
  * Added `validTwitchName` validation rule for User model, `favoriteStreamers[]`'s User model name, manyToMany relationship.
  * Added `ValidateTwitchToken`, `RefreshTwitchToken` middleware to `UsersController.update()` and `UsersController.refresh()`.
### v0004a commit (499690a) 2020-06-22
  * Fixed `streamerMode` for profile avatar image.
  * Removed redundant comment in `ProfilesController.read`.
  * Added newline to .env.example file and .gitignore file.
### v0003a commit (d113555) 2020-06-22
  * Added comment to .env.example file.
  * Added value to change hash driver. Keep in mind, no hashing in use yet.
  * Ignoring public/css folder, this can be built with `npm run css-build`.
  * Changelog now includes dates for each commit.
  * Added flash message for malformed profile parameter.
  * Removed `badRequest` response for malformed profile parameter.
  * Added flash message if chat owner for profile doesn't exist. This shouldn't happen, ever, anyway. /shrug
  * Removed `partialRequest` response if chat owner for profile doesn't exist. =/= See above.
  * More code readability for using `toJSON()` when returning models for profiles.
  * `profileUser` is now used for both visiting guest users as well as owner of said profile.
  * Moved flash message if user does not have access to said profile in code.
  * Added flash message for when profile does not exist.
  * WIP: Profile update.
  * Fixed bug for profile deletion. Matched users list are now also deleted.
  * More code readability for `UsersController.update` by changing `makeGlobalPublic` request body to `toggleGlobalPublic`.
  * Added `toggleStreamerMode` to `UsersController.update` request body.
  * Fixed capitalization in flash message for when a Twitch username is malformed.
  * `toggleStreamerMode` now toggles blur for sensitive data on the website.
  * Fixed text in flash message for when refreshing Twitch data. Now clarifies that *your* Twitch data has been refreshed.
  * More code readability for `Middleware/Auth` by sending full `ctx` to `Auth.authenticate()`.
  * Added flash message for when user tries to access content that requires authentication checks.
  * Service will now try to redirect you after login if you had requested content that required authentication checks. **This may be buggy. Needs testing.**
  * `Middleware/Redirect` is now implemented. =/= See above.
  * User model now has `streamerMode`.
  * Updated cors config file.
  * Updated hash config file.
  * Hashing is now `argon` by default. [adonisjs/core reference.](https://github.com/adonisjs/core/commit/fac6bcac2dbc78253f839e1bc053f8a6dba77f00)
  * Added a new user schema for migration. Will add `streamerMode` to all users in database when `npm run migration:run` is used.
  * Chore: `package.json` updated.
    * **devdependencies**
      * `@typescript-eslint/eslint-plugin` changed to `^3.3.0`.
      * `eslint` changed to `^7.3.0`.
      * `eslint-plugin-import` changed to `^2.11.0`.
      * `typescript` changed to `^3.9.5`.
    * **dependencies**
      * `@adonisjs/auth` changed to `^4.2.1`.
      * `@adonisjs/core` changed to `5.0.0-preview-rc-1.6`. *(Last working version during development)*
      * `@adonisjs/lucid` changed to `^8.2.2`.
      * `@adonisjs/session` changed to `^3.0.4`.
      * `@adonisjs/shield` changed to `^3.0.4`.
      * `@adonisjs/view` changed to `^2.0.7`.
      * `bulma` changed to `^0.9.0`.
      * `got` changed to `^11.3.0`.
      * Removed `node-fetch`.
      * `pg` changed to `^8.2.1`.
      * `phc-argon2@1.0.0` added.
  * WIP: Added app.js
  * WIP: Added imagePreview.scss
  * Changed style.scss dimensions variable. Will now include 300x300, for use in profiles' avatar image.
  * Added a new style.scss import. Bulma 0.9.0 separates helpers from the base sass folder into `/bulma/sass/helpers/` instead.
  * Added a new style.scss import for imagePreview.scss stylesheet.
  * Moved µhtml globals from core.edge template to app.js script file.
  * Added `streamerMode` blur to updateProfile.edge template.
  * Moved `noscript` html element to work when #updateProfile form is blurred.
  * Added a [text fragment](https://github.com/WICG/scroll-to-text-fragment) to `disable profile` button url. Should now mark "Global profile".
  * Added `streamerMode` blur to updateUser.edge template.
  * Moved `noscript` html element to work when #updateUser form is blurred.
  * Changed `makeGlobalPublic` to `toggleGlobalPublic` in updateUser.edge template.
  * Added `toggleStreamerMode` select element to updateUser.edge template.
  * Fixed a url in commands.edge template.
  * WIP: Added profile avatar and bio to profile.edge template.
  * Added `streamerMode` blur to profiles.edge template.
  * `SplashController.index` now uses `Middleware/Redirect`.
### v0002a commit (ed12016) 2020-06-21
  * [Fixed error on startup.](https://github.com/KararTY/Twitchr/commit/ed120167b83dc10cac9da1e3109793b1dbd38ab4#diff-fa492029d36185ca8534a9e413b02a4fR107)
  * Fixed links in updateProfile.edge template, profiles.edge template.
### v0001a commit (1ac2181) 2020-06-21
  * Changed README file to reflect changes made to Profile model.
  * Added flash message if Twitch doesn't return a token body.
  * Fixed bug that made user not login if user just registered.
  * Now saving Twitch refresh token to update user's access token for the session.
  * Added flash message for new registered users.
  * Added flash message for users logging in.
  * Added flash message for users logging out.
  * Added flash message for user trying to access profile user is not allowed access to.
  * User can now access matched profiles.
  * Profiles can now be deleted.
  * Changed how the flash message for `favoriteStreamer` *name malformation* now displays.
  * If `streamersToAppend` does not return an array, it now refreshes token and displays a flash message.
  * Added flash message for successfully updating user settings.
  * User can now delete their own account.
  * User can now refresh their Twitch data.
  * Removed `Color` interface.
  * `Profile.color` now returns a hex string (`#ffffff`) instead of `Color` object.
  * Profiles migration scheme changed. Please use `npm run migration:rollback` and then `npm run migration:run`. This will delete all data. In the future, updating models will be done with new files.
  * WIP: Added updateProfile.js
  * Minor changes to updateUser.js
  * WIP: Added updateProfile.edge template.
  * Added `flashMessages` conditional in updateUser.edge template.
  * Fixed various urls in updateProfile.edge template.
  * Changed `item` to `streamer` in updateProfile.edge template `@each` call.
  * Changed text in commands.edge template to reflect changes done to Profile model.
  * navbar.edge template now uses `route()` for creating some links.
  * licenses.edge template now uses `route()` for creating some links.
  * profile.edge template now has a conditional to check for guest users.
  * Added `flashMessages` conditional in profiles.edge template.
  * profiles.edge template now uses `route()` for creating some links.
  * splash.edge now uses `route()` for creating some links.
  * Removed `flashMessages` `inspect()` from user.edge template.
  * Added `TwitchAuthBody` interface for `Twitch`'s `requestToken()` class function.
  * `requestToken()` can now return a `null` on error.
  * Added `refreshToken()` class function for `Twitch`.
  * Added update and delete end-points to profile router.
  * Added delete and refresh end-points to user router.
### v0000a
  * Introducing the changelog. I'll eventually get better at documenting changes done.