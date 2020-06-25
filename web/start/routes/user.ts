import Route from '@ioc:Adonis/Core/Route'

// RUD
Route.get('/user', 'UsersController.read').middleware('auth:web')
Route.post('/user', 'UsersController.update')
  .middleware(['validateTwitchToken', 'refreshTwitchToken', 'auth:web'])
Route.post('/user/delete', 'UsersController.delete').middleware('auth:web')

Route.post('/user/refresh', 'UsersController.refresh')
  .middleware(['validateTwitchToken', 'refreshTwitchToken', 'auth:web'])
