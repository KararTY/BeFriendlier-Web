import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'SplashController.index').middleware(['silentAuth', 'redirect'])
Route.get('/ws', 'SplashController.ws')
