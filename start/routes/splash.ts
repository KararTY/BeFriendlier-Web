import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'SplashController.index').middleware(['silentAuth', 'redirect'])
Route.get('/channels', 'SplashController.channels').middleware(['silentAuth', 'redirect'])
