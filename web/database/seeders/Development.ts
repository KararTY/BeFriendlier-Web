import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import BannedUser from 'App/Models/BannedUser'

export default class UserSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run () {
    const uniqueKey = 'twitchID'

    const users = await User.updateOrCreateMany(uniqueKey, [
      {
        twitchID: '0',
        name: 'testuser',
        displayName: '[DEVELOPMENT ACCOUNT]',
        avatar: 'https://brand.twitch.tv/assets/emotes/lib/kappa.png',
      },
      {
        twitchID: '450408427',
        name: 'feelspickleman',
        displayName: 'FeelsPickleMan',
        avatar: 'https://static-cdn.jtvnw.net/user-default-pictures-uv/215b7342-def9-11e9-9a66-784f43822e80-profile_image-300x300.png',
      },
      {
        twitchID: '31400525',
        name: 'supinic',
        displayName: 'Supinic',
        avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/supinic-profile_image-310328b1ff949bf8-300x300.png',
      },
      {
        twitchID: '11148817',
        name: 'pajlada',
        displayName: 'pajlada',
        avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/fa34104d-d3d8-4299-8fa7-291420c17782-profile_image-300x300.png',
      },
      {
        twitchID: '141981764',
        name: 'twitchdev',
        displayName: 'TwitchDev',
        avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/8a6381c7-d0c0-4576-b179-38bd5ce1d6af-profile_image-300x300.png',
      },
      {
        twitchID: '527115020',
        name: 'twitchgaming',
        displayName: 'twitchgaming',
        avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/fa8c656a-ca2e-4903-a469-e5bc87e65937-profile_image-300x300.png',
      },
    ])

    for (let index = 0; index < users.length; index++) {
      const user = users[index]

      // We don't want more than 1 global profile.
      const uniqueKey = { chatUserId: 0 }

      const profile = await user.related('profile').updateOrCreate(uniqueKey, {
        enabled: false,
        chatUserId: 0,
      })

      if (index > 0) {
        const previousProfile = await users[index - 1].related('profile').query().where('chat_user_id', 0).first()
        if (previousProfile !== null) {
          // Add match to the previousProfile to this profile.
          if (await profile.related('matches').query().where('id', previousProfile.id).first() === null) {
            await profile.related('matches').attach({
              [previousProfile.id]: {
                user_id: profile.userId,
                match_user_id: previousProfile.userId,
              },
            })
          }
          // Make sure previousProfile also has this user as a match.
          if (await previousProfile.related('matches').query().where('id', profile.id).first() === null) {
            await previousProfile.related('matches').attach({
              [profile.id]: {
                user_id: previousProfile.userId,
                match_user_id: profile.userId,
              },
            })
          }
        }

        // Match to testUser.
        const testUserProfile = await users[0].related('profile').query().where('chat_user_id', 0).first()
        if (testUserProfile !== null) {
          // Add match to this profile for first user.
          if (await profile.related('matches').query().where('id', testUserProfile.id).first() === null) {
            await profile.related('matches').attach({
              [testUserProfile.id]: {
                user_id: profile.userId,
                match_user_id: testUserProfile.userId,
              },
            })
          }

          // Make sure testUser also has this user as a match.
          if (await testUserProfile.related('matches').query().where('id', profile.id).first() === null) {
            await testUserProfile.related('matches').attach({
              [profile.id]: {
                user_id: testUserProfile.userId,
                match_user_id: profile.userId,
              },
            })
          }
        }
      }
    }

    // No hard feelings, forsen. This is just for testing purposes.
    await BannedUser.updateOrCreateMany(uniqueKey, [
      {
        twitchID: '22484632',
        name: 'forsen',
      },
    ])
  }
}
