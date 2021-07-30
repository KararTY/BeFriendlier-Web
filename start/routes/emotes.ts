import Route from '@ioc:Adonis/Core/Route'

Route.get('/emotes', 'EmotesController.read').middleware('auth:web')
