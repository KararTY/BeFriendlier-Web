/*
|--------------------------------------------------------------------------
| Application middleware
|--------------------------------------------------------------------------
|
| This file is used to define middleware for HTTP requests. You can register
| middleware as a `closure` or an IoC container binding. The bindings are
| preferred, since they keep this file clean.
|
*/

import Server from '@ioc:Adonis/Core/Server'

/*
|--------------------------------------------------------------------------
| Global middleware
|--------------------------------------------------------------------------
|
| An array of global middleware, that will be executed in the order they
| are defined for all HTTP requests.
|
*/
Server.middleware.register([
  () => import('@ioc:Adonis/Core/BodyParser'),
  () => import('@ioc:Adonis/Addons/Shield'),
])

/*
|--------------------------------------------------------------------------
| Named middleware
|--------------------------------------------------------------------------
|
| Named middleware are defined a key-value pair. The value is the namespace
| or middleware function and key is the alias. Later you can use these
| alias on individual routes.
|
| and then use it as follows
|
| Route.get('dashboard', 'UserController.dashboard').middleware('auth')
|
*/
Server.middleware.registerNamed({
  auth: () => import('App/Middleware/Auth'),
  silentAuth: () => import('App/Middleware/SilentAuth'),
  redirect: () => import('App/Middleware/Redirect'),
  refreshTwitchToken: () => import('App/Middleware/RefreshTwitchToken'),
  validateTwitchToken: () => import('App/Middleware/ValidateTwitchToken'),
})
