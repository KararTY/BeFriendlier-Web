import Route from '@ioc:Adonis/Core/Route'

Route.on('/licenses').render('core', { web: { template: 'licenses', title: 'Licenses' } })
