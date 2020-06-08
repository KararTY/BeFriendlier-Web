import Route from '@ioc:Adonis/Core/Route'

// CRUD
Route.get('/profile/:id?', 'ProfilesController.profile').middleware('auth:web')
