# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.5.0](https://github.com/KararTY/Twitchr/compare/v0.3.3...v0.5.0) (2022-04-16)


### ⚠ BREAKING CHANGES

* Add BATTLE FEATURE
* rollMatch has new required fields.
* Update to recent Adonis.
* Attempt to upgrade to latest Adonis

### Features

* Add /channels HTTP end-point. ([06bb22f](https://github.com/KararTY/Twitchr/commit/06bb22f4e0e3f185aab19d16e0bb97cea569bdda))
* Add BATTLE FEATURE ([afc0e92](https://github.com/KararTY/Twitchr/commit/afc0e92541a64533bcf30f251421da06fb93618c))
* Add diffDate for formatting cooldowns. ([11532f7](https://github.com/KararTY/Twitchr/commit/11532f79f767fedbcb1aabeb5fd1a96400520741))
* Add disclaimer in footer. ([71848c4](https://github.com/KararTY/Twitchr/commit/71848c49f38f483b4e12ec8bd30b1e5fa0cc763c))
* Add emote generation. ([64826d9](https://github.com/KararTY/Twitchr/commit/64826d93ca668b067e764245ce8f90143b030140))
* Add Pajbot banned phrases check for bio. ([945b6fd](https://github.com/KararTY/Twitchr/commit/945b6fdba40a06aaaa3bd2bcb3a32971487b79a1))
* Add Pajbot2 checks. ([1857b67](https://github.com/KararTY/Twitchr/commit/1857b67db427142fc0e63f7b74d9a890e7bc2f04))
* Add readableErrors view global. ([feb35bc](https://github.com/KararTY/Twitchr/commit/feb35bc7d96c5ef29d3afdc9189418ff7e0f7d96))
* Add themes to profiles. ([72aa7cd](https://github.com/KararTY/Twitchr/commit/72aa7cd38986dc3afe3ff68ba3b61f0fec8715ed))
* Disallow banned users from registering. ([0b73275](https://github.com/KararTY/Twitchr/commit/0b7327586b49b6f3481383489fa57186caf950f6))
* Export durstenfeldShuffle from Handler. ([701900f](https://github.com/KararTY/Twitchr/commit/701900fbd2ab1acf83df21543c2c0a93a08f467b))
* GiveEmotes command. ([6244d6c](https://github.com/KararTY/Twitchr/commit/6244d6cb23b86c2411c941cd09e4065969af778a))
* Handle registration via bot. ([e3bbd51](https://github.com/KararTY/Twitchr/commit/e3bbd51ce3c0644b99d8204368359d379def5b2f))
* Leaderboards ([9e47364](https://github.com/KararTY/Twitchr/commit/9e47364762a63a91ae52a9e82c7a3b0a760cb31f))
* No matching with non-customized profiles. ([43b172b](https://github.com/KararTY/Twitchr/commit/43b172b64f076a187c1e9f10014232138d1df1ff))
* Skip some @[@more](https://github.com/more) text if not customized. ([bcead99](https://github.com/KararTY/Twitchr/commit/bcead99b893c36d665ed82878430875b757efdab))
* Split handlers into own files. ([95d75de](https://github.com/KararTY/Twitchr/commit/95d75de36c192841db5449132b1db825e12c5d53))
* Tell user to customize their profile. ([ac31f0e](https://github.com/KararTY/Twitchr/commit/ac31f0e680294997346ff17d241ff8981bc06edc))
* Update to recent Adonis. ([7cec6a7](https://github.com/KararTY/Twitchr/commit/7cec6a7dce9a65c7179d813f6acbfe8f141e834c))


### Bug Fixes

* `!var === 0` -> `var !== 0` ([f768341](https://github.com/KararTY/Twitchr/commit/f7683411e365833b2817338e672e3b51d0ca2743))
* Actually fix migrations. Sorry. ([faa757b](https://github.com/KararTY/Twitchr/commit/faa757b5497c02fe5fa402f1faa6ee89ea82ccde))
* Actually fix phantom profiles. ([a20f3b0](https://github.com/KararTY/Twitchr/commit/a20f3b06f8744278a445115237c343a953eef9a9))
* Actually, actually fix. ([f997377](https://github.com/KararTY/Twitchr/commit/f997377e4da420f6b8a1634c57d55538b25611b3))
* Add emote images to /emotes ([637d9c8](https://github.com/KararTY/Twitchr/commit/637d9c8abcc8e32962bb3c784cd567e5b9d9f250))
* Add missing types from befriendlier-shared. ([27e058d](https://github.com/KararTY/Twitchr/commit/27e058d8b198b7402e1144e5137cd020f64b254c))
* Add more clarity on disabled profiles. ([16a066c](https://github.com/KararTY/Twitchr/commit/16a066c98b10a7368f0b83d5386f0cd17c90ef2c))
* Add OG description. ([7a8e1d6](https://github.com/KararTY/Twitchr/commit/7a8e1d6cb1d40327534a4d3c4d64d455ab395d4e))
* Add redundant toLowerCase() in client js ([3a01547](https://github.com/KararTY/Twitchr/commit/3a015474ada5e55d6cc3791b6046f4873c4c97d0))
* add robots.txt ([a40459e](https://github.com/KararTY/Twitchr/commit/a40459e4752bfb30dbcdf5898454fab8cbae0f85))
* Allow new profiles to swipe on creation. ([7e1e996](https://github.com/KararTY/Twitchr/commit/7e1e996dd1c0178e3ddf87a895e050b6654c07cf))
* Allow profile color to be changed. ([9e792bd](https://github.com/KararTY/Twitchr/commit/9e792bda7318f7a89017f6cef9d5b79e9f6f94bc))
* Anonymize createdAt fields on deletion. ([671d0ff](https://github.com/KararTY/Twitchr/commit/671d0ffe42bfb273be1ec3a615ee71dec474c445))
* Anonymize userId on profile deletion. ([06555de](https://github.com/KararTY/Twitchr/commit/06555de911da2c817139aa04f091c638f7d0825a))
* Another attempt to fix error pages. ([6608415](https://github.com/KararTY/Twitchr/commit/66084150e6b7581d8d257efceefce974f21904c5))
* Attempt to fix 404 page. ([dc28e0c](https://github.com/KararTY/Twitchr/commit/dc28e0c3c0045434d883eb4c7cb7d0a9dd541a71))
* Attempt to load new data from database. ([05ccbdf](https://github.com/KararTY/Twitchr/commit/05ccbdfc141562d8f2894d85caa98a893fd6cfdc))
* Attempt to upgrade to latest Adonis ([dcbb41b](https://github.com/KararTY/Twitchr/commit/dcbb41bb44e4e1a43c769601545525491b4b9a94))
* BotEmote -> Emote, Emote -> EmoteModel ([4e7b51d](https://github.com/KararTY/Twitchr/commit/4e7b51dc0801c5a60957706508e661232e4bd840))
* BotEmote -> Emote, Emote -> EmoteModel ([d2a77aa](https://github.com/KararTY/Twitchr/commit/d2a77aab52e5af50385244b883fb1764e5bf38a0))
* Bug, compared string to number. ([9303546](https://github.com/KararTY/Twitchr/commit/9303546dc6b5acfe93b85bce70a7ff3aa4b5738b))
* Clarify. unmatch -> skip/decline ([d4e1c1f](https://github.com/KararTY/Twitchr/commit/d4e1c1f785eb00fb27ab351869cad2a8bea7b126))
* Comment out policy change alert. ([3eda93f](https://github.com/KararTY/Twitchr/commit/3eda93f011c5b81ef31b332f9dc1df4d353cb16a))
* Default secure cookies ([3bb472f](https://github.com/KararTY/Twitchr/commit/3bb472f6f12e7c99ce01fbe39e53b6454d4a5692))
* Deleted profiles are now anonymized instead. ([599c633](https://github.com/KararTY/Twitchr/commit/599c633abaaff01a37e9b3862b3049634bb48764))
* Deprecation warning get() -> qs() ([af28786](https://github.com/KararTY/Twitchr/commit/af287860e0b529385f734863a78b8812f153da2c))
* Disabled profiles should not be interactive. ([9ad5d92](https://github.com/KararTY/Twitchr/commit/9ad5d92fbc60141e0807d8aa20826f5ea5db5eba))
* Don't always return emote count when trading. ([421febd](https://github.com/KararTY/Twitchr/commit/421febd90efe77186dc7290b694136f23d6178da))
* Don't roll profiles with non-existent users. ([df15319](https://github.com/KararTY/Twitchr/commit/df153199057703b84c573c1d4189015ec67db254))
* Fav. users createdAt updates now on register ([af5ed44](https://github.com/KararTY/Twitchr/commit/af5ed44ebe9bf6481e228a7adf47331a827a1b85))
* Further fixes to update project to new Adonis ([2fd81c8](https://github.com/KararTY/Twitchr/commit/2fd81c8b3aab2e88ef3f377147456ffcf34f963b))
* Hide display name if it's the same as login. ([a1adba9](https://github.com/KararTY/Twitchr/commit/a1adba90fa2d070a2fb08798d96f26a4ca42de38))
* Hopefully no more "Hello!" matches. ([1a79e73](https://github.com/KararTY/Twitchr/commit/1a79e73e956fbbe406424766e2664e3ef768712a))
* Ignore capitalization on adding fav streamers ([5a4263f](https://github.com/KararTY/Twitchr/commit/5a4263fe1b8fd74a41888f330d243d4e82b18c56))
* Ignore roll if emotes || bio not been edited ([858bcb8](https://github.com/KararTY/Twitchr/commit/858bcb83efa1cb57c679b85590fc9f3f7dbc20d1))
* Incrementing existing emote on rollEmote ([10e0bcf](https://github.com/KararTY/Twitchr/commit/10e0bcf9db3fa3daf844d6b3c366f344cebf350f))
* is-rounded when streamer mode disabled. ([56c1437](https://github.com/KararTY/Twitchr/commit/56c1437614b89e88edcd7369fa123666e23af91e))
* Linting ([3e56505](https://github.com/KararTY/Twitchr/commit/3e56505bd1799ff3586f611d4c108788d0e1b74a))
* Linting & Move more stuff to Handler. ([78e7e4d](https://github.com/KararTY/Twitchr/commit/78e7e4da04b34d249dbda0a4a9230b0fc77bbd8b))
* Linting ChatsHandler and DefaultHandler. ([8c7a97f](https://github.com/KararTY/Twitchr/commit/8c7a97f80d4a4847ad949bb73976bc9180419525))
* Linting RollMatchHandler ([867c812](https://github.com/KararTY/Twitchr/commit/867c8129cb8a28937222de8d787153f810cdf396))
* Make sure database sets correct dates. ([b36262c](https://github.com/KararTY/Twitchr/commit/b36262c67dd2369c36b784f269ee4629a77630ed))
* Make sure docs adhere to markdownlint standards ([b054814](https://github.com/KararTY/Twitchr/commit/b0548145f6ca6b2f186386392abcc8022f20d50b))
* Make sure og:title gets web.title value. ([9551882](https://github.com/KararTY/Twitchr/commit/9551882eb4d00a9f7ce564e6e6ecf369ebf93372))
* Make sure the anonymization is saved. ([881c8b7](https://github.com/KararTY/Twitchr/commit/881c8b79a740271ea5226c7992a8058e27098ca0))
* Make sure to load favoriteStreamers properly. ([9a13c13](https://github.com/KararTY/Twitchr/commit/9a13c13e32d28d0087618ddf0198a49ca6be7991))
* Make sure view variables are consistent. ([bf34a6b](https://github.com/KararTY/Twitchr/commit/bf34a6bb4afced2c56b61bc9baf4e8cfd014013f))
* Make twitchAPI public ([bf0e490](https://github.com/KararTY/Twitchr/commit/bf0e4907466084caabbf1af63fb064f6c2b01544))
* Matches no longer return as an empty object. ([ba9e502](https://github.com/KararTY/Twitchr/commit/ba9e50202e4d9c15cdb54a1c724fd4276fcd9d6c))
* Message repetition and linting. ([d81684a](https://github.com/KararTY/Twitchr/commit/d81684a0c7915b74d92439979115101a18de0737))
* Might as well set the entire error as any. ([3f60057](https://github.com/KararTY/Twitchr/commit/3f60057182211133f3ab731c8066491dd035c46a))
* More linting ([bc031a9](https://github.com/KararTY/Twitchr/commit/bc031a99feb9a48f0b96d2f3dd517284120a2e8c))
* Move profile roll filtration to rollMatch. ([5cef607](https://github.com/KararTY/Twitchr/commit/5cef607ff79d377cba0277b89a69e7fb252417a7))
* Move rollEmote from Unmatch to Mismatch. ([91bb725](https://github.com/KararTY/Twitchr/commit/91bb725bd9f8fc7e9464f26569f3a2b74d178a82))
* Multiline the buttons in updateUser.edge ([1ae1712](https://github.com/KararTY/Twitchr/commit/1ae171213827bf7515f8344ceb9d532eb4c8595c))
* New Channels statistic. ([1f37958](https://github.com/KararTY/Twitchr/commit/1f37958c24ccff3b6bd1dd08ed65334716a99c1c))
* No more phantom profile rolls. ([698f753](https://github.com/KararTY/Twitchr/commit/698f7535b1870d9ea3d10889f3eda8a2f2a69fab))
* Only send matched users on data request. ([3fefc1a](https://github.com/KararTY/Twitchr/commit/3fefc1a2e725bf5211e90696e6bffe33e1bd44be))
* Persist bio & color after validation fail. ([aeb3ce3](https://github.com/KararTY/Twitchr/commit/aeb3ce39c243c63433200cd9a11035089604065c))
* Preload favoriteStreamers to access it. ([806c0fd](https://github.com/KararTY/Twitchr/commit/806c0fd82fbe4a43cbeb8732fa08789553bdb7fb))
* preload favoriteStreamers. ([101bded](https://github.com/KararTY/Twitchr/commit/101bdedfcfa638d590d64dd400e86ac12939dfc3))
* profile > match.profile ([26d9d99](https://github.com/KararTY/Twitchr/commit/26d9d9937e9ebc51a3cb83f18d2219ba03df50f6))
* Reduce message spam by sending some whispers. ([95e79b5](https://github.com/KararTY/Twitchr/commit/95e79b5ee7e3875a2e861ac89f540d2436430fb6))
* Reduce one directory for supersecret in Ws. ([6cca189](https://github.com/KararTY/Twitchr/commit/6cca189cb0332738375b48c72946a4a31f01c4b7))
* Reduced leaderboard caching to 1 hour. ([eeb8847](https://github.com/KararTY/Twitchr/commit/eeb88478bf4a1552a0a41c1459cb35a6b8e27c3c))
* Remove adonisjs/env as an adonisjs provider. ([2354d76](https://github.com/KararTY/Twitchr/commit/2354d765624f67478c95b2c7e6bceffa8cc5db95))
* Remove prefix, since it's customizable by bot ([45d3ddb](https://github.com/KararTY/Twitchr/commit/45d3ddbcbe58afed56d4543d1cdce8ec2463f532))
* Removed .plus() ([8f31ff9](https://github.com/KararTY/Twitchr/commit/8f31ff9071ac8b1a07304fac22a430f7465b31fe))
* Removed redundant div. ([2424c45](https://github.com/KararTY/Twitchr/commit/2424c45779e8dde2b4f574926fd6dbaf442b3441))
* removeHost foundChannelBot returns undefined ([29a0318](https://github.com/KararTY/Twitchr/commit/29a03187bcdeeaca77b788a7e82ed04db2050b36))
* Rename migration files. ([bdd67cd](https://github.com/KararTY/Twitchr/commit/bdd67cd2e4342bde5f09c2afb31d504f716dbd0f))
* Reset emotes before appending. ([151ea5a](https://github.com/KararTY/Twitchr/commit/151ea5af70fe18f424cd10ab781833f02ef092c9))
* return -> continue in for loop. ([7e6e938](https://github.com/KararTY/Twitchr/commit/7e6e938d3126bcf0471bd6e5ff71ce0569b98c9b))
* Return data if profile editing ratelimited. ([bf600f4](https://github.com/KararTY/Twitchr/commit/bf600f40d3992a86e621dc43fc9a012c346f8fa3))
* rollMatch has new required fields. ([6823928](https://github.com/KararTY/Twitchr/commit/68239284a8a2cf9d93c123989984db945585e81b))
* Say "Global" instead of relaying channel name ([d69ca18](https://github.com/KararTY/Twitchr/commit/d69ca18f123c8dbe9d9042ac15e3840710cdce6c))
* secure-json-parse instead of @hapijs/bourne ([f73c516](https://github.com/KararTY/Twitchr/commit/f73c5164d44724ffe9ce59e1aa5e221564a0134f))
* Send only relevant data to user on request. ([1079d2b](https://github.com/KararTY/Twitchr/commit/1079d2beba93a7384bc553818aa197d6f9efc1a0))
* Send some whispers instead. ([70eead1](https://github.com/KararTY/Twitchr/commit/70eead1a2fb5b01925985c7361215d33e7c0df64))
* Show all matched profiles properly. ([e483acd](https://github.com/KararTY/Twitchr/commit/e483acd0a96fdc5fd405650db673608542c7bdff))
* Show disabled profiles ([cb15b2b](https://github.com/KararTY/Twitchr/commit/cb15b2bb7fe667c371e863f8ecb470f8898af983))
* Tell users to customize emotes & bio. ([24e091b](https://github.com/KararTY/Twitchr/commit/24e091b4d89009d0d83bb65e697bf41b3b1c91a6))
* twitchID deletion now uses yeast module. ([dc87f9c](https://github.com/KararTY/Twitchr/commit/dc87f9c91441bf768f3ab3017685c37a0bccb0d3))
* Typo prevented emotes from being collected. ([1e00e52](https://github.com/KararTY/Twitchr/commit/1e00e52991308c72bc0ec80aeb0d26e0a3efaf6e))
* Typo themed-dark -> themed-text ([87fc962](https://github.com/KararTY/Twitchr/commit/87fc962f6e1b7fea11d3747603d85bf9f503d46f))
* typos & eslint rule change ([e108e41](https://github.com/KararTY/Twitchr/commit/e108e418ae56772582b34bb26932b3dc56d4a8a4))
* Update breaking changes. ([ab0100b](https://github.com/KararTY/Twitchr/commit/ab0100be4706a065d50aa612a33269d3bec53e81))
* Update luxon, hour -> hours ([913bb29](https://github.com/KararTY/Twitchr/commit/913bb2911faeba93f8711497cb8d518fbc4b9aba))
* Update route() to new Route.makeUrl API. ([6f22b81](https://github.com/KararTY/Twitchr/commit/6f22b81e71d20a696a2f04cb29520b9a0ae20d32))
* Update shared to make PajbotAPI work. ([d2bc7a3](https://github.com/KararTY/Twitchr/commit/d2bc7a301e2f8df689dd0be74f2eac7c5edc42ec))
* Update splash statistics every 5 minutes. ([9f57443](https://github.com/KararTY/Twitchr/commit/9f57443886c9fa082c77171fff1d34e88a2cd168))
* Use naturalSort for migrations. ([91af579](https://github.com/KararTY/Twitchr/commit/91af579803924f141c3a60ca7f66cb1617631ccd))
* Use proper channel. ([a1a49c8](https://github.com/KararTY/Twitchr/commit/a1a49c86eaedf774c9004850912c10716cf02619))
* Use the returned color on profile validation ([080fc06](https://github.com/KararTY/Twitchr/commit/080fc065ff5042701a2525df959802bbdc843181))
* Validate faulty info when editing profile ([cf174f6](https://github.com/KararTY/Twitchr/commit/cf174f66aff145807c976606cebab66e02d990b7))
* View deprecation warning. ([aa307f4](https://github.com/KararTY/Twitchr/commit/aa307f448daa7d8e2242142ec0ff579085d231fe))

### [0.3.3](https://github.com/KararTY/Twitchr/compare/v0.2.0...v0.3.3) (2020-08-17)

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