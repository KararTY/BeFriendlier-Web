import Route from '@ioc:Adonis/Core/Route'

Route.get('/ping', 'HealthChecksController.ping')
