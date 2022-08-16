import Route from '@ioc:Adonis/Core/Route'

Route.get('/leaderboards', 'LeaderboardsController.index').middleware(['silentAuth', 'redirect'])

Route.get('/leaderboards/battles', 'LeaderboardsController.battleLeaderboards')
