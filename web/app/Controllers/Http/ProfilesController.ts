import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProfilesController {
  public async profile ({ params, auth, response }: HttpContextContract) {
    const { id } = params
    if (typeof id === 'string') {

    } else {
      // Show user's profiles.
    }
  }
}
