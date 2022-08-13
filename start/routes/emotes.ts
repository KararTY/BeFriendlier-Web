import Route from '@ioc:Adonis/Core/Route'

Route.get('/emotes', 'EmotesController.read').middleware('auth:web')

Route.post('/emotes/combine', 'EmotesController.combineEmotes').middleware('auth:web')
Route.post('/emotes/resign', 'EmotesController.resignBattleEmote').middleware('auth:web')

Route.get('/emotes/logs', 'EmotesController.battleLogs').middleware('auth:web')
