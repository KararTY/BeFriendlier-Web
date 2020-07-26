import Route from '@ioc:Adonis/Core/Route'

Route.on('/terms').render('core', { web: { template: 'terms', title: 'Terms of Service' } })
