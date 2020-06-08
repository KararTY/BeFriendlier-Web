import Route from '@ioc:Adonis/Core/Route'

// CRUD
Route.get('/user', 'UsersController.read').middleware('auth:web')
Route.post('/user', 'UsersController.update').middleware('auth:web')
