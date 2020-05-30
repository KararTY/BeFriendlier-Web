import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  /**
   * Send back statistics:
   * Total users
   * Total channels
   * New matches
   * New channels
   */

  return view.render('core', {
    web: {
      template: 'splash',
      title: 'Pogchamp Friends!',
      statistics: {
        channels: {
          total: 0,
          new: 0,
        },
        users: {
          total: 0,
          matched: 0,
        },
      },
    },
  })
})
