import Route from '@ioc:Adonis/Core/Route'

Route.on('/privacy').render('core', { web: { template: 'privacy', title: 'Privacy policy' } })
