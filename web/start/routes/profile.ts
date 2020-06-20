import Route from '@ioc:Adonis/Core/Route'

// RUD
Route.get('/profile/:id?', 'ProfilesController.read').middleware('auth:web')
Route.post('/profile/:id?', 'ProfilesController.update').middleware('auth:web')
Route.post('/profile/:id/delete', 'ProfilesController.delete').middleware('auth:web')
