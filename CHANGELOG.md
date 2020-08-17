# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.3.3](https://github.com/KararTY/Twitchr/compare/v0.2.0...v0.3.3) (2020-08-17)

### [0.3.2](https://github.com/KararTY/Twitchr/compare/v0.3.1...v0.3.2) (2020-08-17)


### Features

* Add BIO & Fix EMOTES ([5ed3cff](https://github.com/KararTY/Twitchr/commit/5ed3cff93a596d859aabbaf6f564dbb092a0f184))
* Add experimental PerspectiveAPI support. ([697f02c](https://github.com/KararTY/Twitchr/commit/697f02c5134fdd978d7ec595ef8118f43bf08942))
* Allow user to see bio & emotes. ([2e811fd](https://github.com/KararTY/Twitchr/commit/2e811fd3ce483fb0f60f069bafbb6a769f4d6664))
* Escape potential pinged users in ROLLMATCH ([393e92f](https://github.com/KararTY/Twitchr/commit/393e92fb647d1404b735e980554190c05b5d206c))


### Bug Fixes

* add space ([dc9d80f](https://github.com/KararTY/Twitchr/commit/dc9d80f8dea7bc87e8558038fb4f3b9a98b653ea))
* Add update script. ([000b1f2](https://github.com/KararTY/Twitchr/commit/000b1f23b703a4c7e449fee98136bc46ba9deb13))
* Allow global profile bio to be changed. ([a2cb223](https://github.com/KararTY/Twitchr/commit/a2cb223938ca05ab8140693bc967714b558d7d8e))
* Allow rules accidentally allowed external access. ([73b3e43](https://github.com/KararTY/Twitchr/commit/73b3e43e1ee26b7c180565e2b8c9a854be5b0b97))
* Allow server to handle global requests. ([fff9ee8](https://github.com/KararTY/Twitchr/commit/fff9ee8448586511d0d685feba328669a45b3046))
* Allow user to download user data. ([06c7c98](https://github.com/KararTY/Twitchr/commit/06c7c98af0506aa4c7033b1ae71f8f8f94640b60))
* Change start script. ([2f5154a](https://github.com/KararTY/Twitchr/commit/2f5154aff99b2b1c773906a55a3b3316136c9816))
* Don't leak login details in URL. ([065d650](https://github.com/KararTY/Twitchr/commit/065d650883bcdd16697f487907a781c7c58706c7))
* Don't ping favorite streamers. ([2025545](https://github.com/KararTY/Twitchr/commit/2025545278b2bb4a8f45674afcc49f424b470816))
* Don't show "cached" users as new users. ([f01f9e5](https://github.com/KararTY/Twitchr/commit/f01f9e5642bc56207ac234dd140014e41d5f24ff))
* Handle LEAVECHAT with empty userTwitch vars. ([53adaa4](https://github.com/KararTY/Twitchr/commit/53adaa4787f364b32cff9096fdeb6303d9803af5))
* Ignore pnpm-lock.yaml ([becdf5c](https://github.com/KararTY/Twitchr/commit/becdf5c534323273db04bba98f450816927d7cd2))
* Initialize script fix. ([4bbfbfd](https://github.com/KararTY/Twitchr/commit/4bbfbfde1b331700a89a19a333708e598836227f))
* Make sure the timer to wait for bot login starts. ([36bd845](https://github.com/KararTY/Twitchr/commit/36bd8455f9eef9091d6fe6a27d2c849831e9e605))
* Make validation rule compile as asynchronous. ([edef9b1](https://github.com/KararTY/Twitchr/commit/edef9b1b33efb18dec32563ebc55a5cbdece094d))
* Make Ws have its own Twitch instance. ([9c66a23](https://github.com/KararTY/Twitchr/commit/9c66a2309bf735a40410a400dc9d3316fd16dfb0))
* More verbosity. ([3e6db80](https://github.com/KararTY/Twitchr/commit/3e6db80f2ebb149febf8f852d76fbf4241ca65e2))
* noed -> node ([575d531](https://github.com/KararTY/Twitchr/commit/575d531e531dcef2add7b0e55045e518f07c777d))
* Potential fix for BIO response. ([e99679c](https://github.com/KararTY/Twitchr/commit/e99679c2ea833c75ce4018cf8dfccc0841a0ec6f))
* Queue no longer throwing errors. ([94bbd77](https://github.com/KararTY/Twitchr/commit/94bbd77e6ec13bf57cdb92d86d1eabcabf1499e7))
* Ratelimit profile updating to 1 minute. ([f3aa900](https://github.com/KararTY/Twitchr/commit/f3aa9001284c9a779fe99dd5a02b25862e3bbe74))
* Refactor bot login. ([b370699](https://github.com/KararTY/Twitchr/commit/b370699855336e92d72c7c8df68a7610a8d149dc))
* Remove reject from arguments. ([069d394](https://github.com/KararTY/Twitchr/commit/069d39434bd51a23d0544ac0567e9e4dca464c89))
* Removing favorite streamers in total count. ([acd8b16](https://github.com/KararTY/Twitchr/commit/acd8b16eea6c6043a2cc919d702bd422fd3475e0))
* Revert accidental uploads. ([afa022f](https://github.com/KararTY/Twitchr/commit/afa022fd66e7bb654d50ebd72ff822c443bb4722))
* Send websocket back on BIO request. ([5ffe395](https://github.com/KararTY/Twitchr/commit/5ffe3951d24a1e5bdfe174c626bed1768b60b054))
* Sort profiles by ascending with profile.id ([fb7c2fb](https://github.com/KararTY/Twitchr/commit/fb7c2fb8c9502fe3b3f6cd68258bf8481fae70e4))
* Splash now correctly displays real users. ([5d66e14](https://github.com/KararTY/Twitchr/commit/5d66e1415ecfe3f440c2ec2a988af27726e12b29))
* test ([39822d3](https://github.com/KararTY/Twitchr/commit/39822d347fa6e144e5d5c8105585ea966b724ab2))
* Test adding middleware to register end-point. ([f5f8ee1](https://github.com/KararTY/Twitchr/commit/f5f8ee18a313efc1d50537121851ab241531fc47))
* Users need access to register URL. ([1c32f8a](https://github.com/KararTY/Twitchr/commit/1c32f8ad24a95fd1d3ee66bed46ad6f10ca6e301))
* **LEGAL:** Update Terms of Service & Privacy policy ([f4f267d](https://github.com/KararTY/Twitchr/commit/f4f267d02099132372d178644a2e33fb42b1617b))
* **View:** `is-rounded` on favorite streamers icon ([d447d38](https://github.com/KararTY/Twitchr/commit/d447d382891c11f48800a5852103affd51e6a8a5))
* **View:** Change commands prefix. ([ffb8a18](https://github.com/KararTY/Twitchr/commit/ffb8a18f7794ae6563e44dc70a382aaf7c4a6c8d))
* **View:** Update commands & Clarify profiles. ([1e26cc3](https://github.com/KararTY/Twitchr/commit/1e26cc3b0f986c37dac52f09b87e822534753b0d))
* **Ws:** Also validate token. ([a2c998d](https://github.com/KararTY/Twitchr/commit/a2c998d8254e985717c3a30719aa47ff8479d5b2))
* toxic -> TOXICITY ([f100e2d](https://github.com/KararTY/Twitchr/commit/f100e2d160d29545968ed69039c9a5de661cbe91))
* Update README. ([17d0197](https://github.com/KararTY/Twitchr/commit/17d0197052586dbd05d7960d07f3febccaf3c638))
* **Views:** item -> emote ([1d492f1](https://github.com/KararTY/Twitchr/commit/1d492f133eb8766f5f4171ca1f79d516c5d4a4b0))

### [0.3.1](https://github.com/KararTY/Twitchr/compare/v0.2.0...v0.3.1) (2020-08-10)


### Bug Fixes

* build-server instead of build ([ec8acba](https://github.com/KararTY/Twitchr/commit/ec8acba6f9c548aca422b10de1b5f5c84e6c7324))
* Should now work with postgresql. ([89f380c](https://github.com/KararTY/Twitchr/commit/89f380c886a788bb32c1d4d21346f1ee395d60e6))
* **CSS:** Use local font. ([5e25cf0](https://github.com/KararTY/Twitchr/commit/5e25cf03c729e0b84144dd67b7885d8ea7e4a102))
* **LEGAL:**  Updated date for Privacy Policy. ([10f2909](https://github.com/KararTY/Twitchr/commit/10f29094d676dc0e302da5e6083919a79e7d186b))
* Replace example.com with actual website URL. ([0bf438d](https://github.com/KararTY/Twitchr/commit/0bf438dca946de2de8ef1ad457bbc9534330f3fc))
* **View:** Move footer in error to proper place. ([c5ea163](https://github.com/KararTY/Twitchr/commit/c5ea1637705b96b8df3575707c21ea1c181d0a64))

## [0.3.0](https://github.com/KararTY/Twitchr/compare/v0.2.0...v0.3.0) (2020-08-10)


### ⚠ BREAKING CHANGES

* Moved TwitchProvider logic to AppProvider.

### Features

* Add parcel bundler & update packages. ([de993fe](https://github.com/KararTY/Twitchr/commit/de993fec7687eda929997f2ae0bfe0e2f9a5c14d))
* Enable healthChecks for db. ([b9ef963](https://github.com/KararTY/Twitchr/commit/b9ef96375b1889991c75d72e1d5991ca6da0fcfb))
* Moved TwitchProvider logic to AppProvider. ([e10fc9e](https://github.com/KararTY/Twitchr/commit/e10fc9e443733d0da2d080ab3d211c0de7c9bacb))
* Now disconnects websockets without userAgent ([62561a3](https://github.com/KararTY/Twitchr/commit/62561a321b615026b92c24b9cfe6bd2cb3bdf392))
* The big #$!? update. ([37ee515](https://github.com/KararTY/Twitchr/commit/37ee515c405b64f10e525ff21b70f2103ec5e166))
* Use parcel bundler for frontend javascript. ([34863b1](https://github.com/KararTY/Twitchr/commit/34863b1b91609f6845025b049ba74ce69f57d09f))
* **Twitch:** Added 2 new env variables. ([801cc40](https://github.com/KararTY/Twitchr/commit/801cc40c69e0dee3ae77fed1a13a68dd8dd9ff7c))
* **Twitch:** Move redirectURI string to env file. ([b5c84bc](https://github.com/KararTY/Twitchr/commit/b5c84bc3c7af1fec2a3e910e36902b88a6be6ea6))
* **User:** Add `host` column to model. ([9cb928e](https://github.com/KararTY/Twitchr/commit/9cb928e8092f01c8ab221f978e7ac61f536ade12))


### Bug Fixes

*  Fix initialize not existing, it exists now. ([4be99ba](https://github.com/KararTY/Twitchr/commit/4be99ba54d02c3dad44975841ccb76119e96e252))
*  Will now "build" resources. ([6a72710](https://github.com/KararTY/Twitchr/commit/6a72710a0c9432c68ca718f7af233b6b94b494f7))
* Add LOG_LEVEL to .env.example ([28bba5a](https://github.com/KararTY/Twitchr/commit/28bba5aafeb8d20dd8d5a7e1f6b5f89606dd80ac))
* emote.url changed to emote.id. ([bde3049](https://github.com/KararTY/Twitchr/commit/bde3049af57fc459311f9f54546d3ed684261a78))
* Formatting files. ([63e2748](https://github.com/KararTY/Twitchr/commit/63e274895b367a67c6f745df7e9bfe8840895af7))
* Moved dev login logic to separate function. ([57cf13d](https://github.com/KararTY/Twitchr/commit/57cf13def0b2fffbe0ad6c34b839808f06b2d7d3))
* Moved Emote interface to shared module. ([1efd4de](https://github.com/KararTY/Twitchr/commit/1efd4defc09f63a87157fd112df561bed79c45cb))
* Moving matches list to its own function. ([0170f16](https://github.com/KararTY/Twitchr/commit/0170f1656e8182feb6626f3c7d9892789218d802))
* nextRoll -> nextRolls ([b3d7bab](https://github.com/KararTY/Twitchr/commit/b3d7bab0ce11266a9b8c4aa547797aa60edd59a2))
* Now anonymizing profiles on user delete. ([71d445d](https://github.com/KararTY/Twitchr/commit/71d445dcb376f7fda4a155868a1d5b4af9deff2f))
* **frontend:** Add navbar toggle logic. ([fd57387](https://github.com/KararTY/Twitchr/commit/fd57387cf0a2c09bb5e556b861dde596e20754c4))
* **frontend:** Improve navbar & footer. ([1a2abb3](https://github.com/KararTY/Twitchr/commit/1a2abb340bceb378fd00d465f610c434b4a55209))
* Added & Used ensureIsOfType for frontend. ([f9be75d](https://github.com/KararTY/Twitchr/commit/f9be75d92d3dd6f82383b492bdadda70fc9c5bfa))
* Fix eslint inclusion for resources directory ([bfac947](https://github.com/KararTY/Twitchr/commit/bfac947721e958b2dbae805905988208452a21ad))
* No longer building the resources folder. ([9d2f020](https://github.com/KararTY/Twitchr/commit/9d2f0202dd51865210cd47bd310b674596fdbecd))
* One consistent gitignore file in all projects ([c0f11e9](https://github.com/KararTY/Twitchr/commit/c0f11e95b6060c2dc16cd65e6b5e70069cfa5210))
* Remove comments from json file. ([190f5ce](https://github.com/KararTY/Twitchr/commit/190f5ce8180aebb0225be605505260977335006c))
* Update befriendlier-shared related code. ([934a261](https://github.com/KararTY/Twitchr/commit/934a261a4ea7582baad9c5ba1674c9d73667c30b))
* Update code to the new befriendlier-shared. ([89ba791](https://github.com/KararTY/Twitchr/commit/89ba79187afa0dbf5def9fdcb5b18b9d7cf29a01))
* Users are now anonymized on deletion. ([712fd09](https://github.com/KararTY/Twitchr/commit/712fd09ab1db2d9d64214fd59a5d531b6f34ed85))
* **Healthcheck:** No longer checking all db health ([3e968ee](https://github.com/KararTY/Twitchr/commit/3e968ee3a773e45bef88633b4caf7d5cc438acd0))
* **Seeders:** Initialize.ts should no longer error ([d335db9](https://github.com/KararTY/Twitchr/commit/d335db92d1c62cd074cff6df0a6c2a789becd3e6))
* **Splash:** Use models for querying. ([6cf7dd4](https://github.com/KararTY/Twitchr/commit/6cf7dd4029a925eed95ec14dc1f3f8a65f97cca6))
* **Twitch:** Log errors now slightly more readable ([817aa84](https://github.com/KararTY/Twitchr/commit/817aa8414aaa530294b4e45334acc8562e5c0c09))
* **Ws:** Fix ws termination log. ([bc5d087](https://github.com/KararTY/Twitchr/commit/bc5d087ba9c485311f53d0e8fa6c40ee4b2b0df2))
* Typos. ([cfee85d](https://github.com/KararTY/Twitchr/commit/cfee85d0354e84ab028b89ca24f6737ed8d352b2))
* Update eslintrc file. ([1e7ee83](https://github.com/KararTY/Twitchr/commit/1e7ee838eec02e24a9785c925e89cac33ab53dc0))
* **Ws:** Fix Match.ts to use new shared types. ([8a08467](https://github.com/KararTY/Twitchr/commit/8a08467c6591b8c3042c49868736b8dbd99c5a06))
* Rename instances of Twitchr to Befriendlier. ([268091f](https://github.com/KararTY/Twitchr/commit/268091f15da75a8f2e227acb979a2744e83b779f))
* **Twitch:** Moved env logic to config file. ([ca539d8](https://github.com/KararTY/Twitchr/commit/ca539d854ecc9629c1a0025530be0404a2dca4cf))

## 0.2.0 (2020-07-26)


### ⚠ BREAKING CHANGES

* Move files to root directory.

### Features

* Move files to root directory. ([70ac504](https://github.com/KararTY/BeFriendlier-Web/commit/70ac5048d096333eeaf14944c164d9d1c193dc70))


### Bug Fixes

* **README:** Fix links & cross Todo items. ([3c0fe87](https://github.com/KararTY/BeFriendlier-Web/commit/3c0fe872353d1daaf67b11458c9c1efbc9e6b3ea))
* **Websocket:** Fix import reference to module. ([fed2847](https://github.com/KararTY/BeFriendlier-Web/commit/fed2847ce7e5e8f624f9d9fbe86b0d764d6fc0b0))

## 0.1.0 (2020-07-26)


### ⚠ BREAKING CHANGES

* Remove `/ws` end-point.

### Features

* **config:** scopes & redirectURI now in a config ([c160167](https://github.com/KararTY/BeFriendlier-Web/commit/c1601679cab7cabf0d9a9dbfba6874193186493f))
* **package:** Add new modules. ([ba792b5](https://github.com/KararTY/BeFriendlier-Web/commit/ba792b5b20cd7de7ff559d97f9914cc4063633f4))
* **Profile:** Add /paginate end-point. ([921cb6a](https://github.com/KararTY/BeFriendlier-Web/commit/921cb6a4d6aec91405f23342fa9dcb3b78967201))
* **Profile:** Check if users are matched ([2847858](https://github.com/KararTY/BeFriendlier-Web/commit/2847858941c9d208a5179076dda9ca662ef9c65d))
* **Profile:** New Match columns. ([9b09e1f](https://github.com/KararTY/BeFriendlier-Web/commit/9b09e1f64a95db396af7c8dd3876698724fde7fd))
* **splash:** Now shows updated statistics. ([f732a24](https://github.com/KararTY/BeFriendlier-Web/commit/f732a247a36af36aa327acb0dfbd821f4c93600a))
* **validation:** Validation schemas now cached. ([cf76367](https://github.com/KararTY/BeFriendlier-Web/commit/cf76367cc16313d4fb93897efbbf11617709f374))
* **Websocket:** Added prototype websocket logic. ([aa0cbcc](https://github.com/KararTY/BeFriendlier-Web/commit/aa0cbcc4c78bf3d70d12ed9e9e30647bad32165e))


### Bug Fixes

* **gitignore:** Ignore pnpm-lock.yaml ([f401ffd](https://github.com/KararTY/BeFriendlier-Web/commit/f401ffd5e21fa2fe4b5345bf5d126f8854646804))
* **lint:** Lint tsconfig. ([f081bcc](https://github.com/KararTY/BeFriendlier-Web/commit/f081bcc1c39f0110c8f11b089a1bd32581b1e23a))
* **middlewares:** Use luxon math ([3477db0](https://github.com/KararTY/BeFriendlier-Web/commit/3477db0108659f2de382909dfa531952466a407d))
* **Seeding:** Add new user to test banned users. ([94fa520](https://github.com/KararTY/BeFriendlier-Web/commit/94fa520b5cc5e6728a12eb369ad94159c1f6bcd0))
* **Twitch:** Allow Twitch module to throw errors. ([b8e0a50](https://github.com/KararTY/BeFriendlier-Web/commit/b8e0a50e16fd562dca477ba1908753b2ae3967d4))
* Refactor dev error when seeds not run. ([7a8c475](https://github.com/KararTY/BeFriendlier-Web/commit/7a8c475d733ddd46ff0e7c5be1a4273d47e4c155))
* Remove `/ws` end-point. ([a0795c5](https://github.com/KararTY/BeFriendlier-Web/commit/a0795c571a54f4192c42fdd47da9c602913370ea))
* **splash:** Typo, hours when it should be minutes ([bfefe63](https://github.com/KararTY/BeFriendlier-Web/commit/bfefe63676799db6b268fa28884b3e44f7fc3b4f))

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
  * [Fixed error on startup.](https://github.com/KararTY/BeFriendlier-Web/commit/ed120167b83dc10cac9da1e3109793b1dbd38ab4#diff-fa492029d36185ca8534a9e413b02a4fR107)
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