import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Redirect {
  public async handle ({ auth, session, response }: HttpContextContract, next: () => Promise<void>): Promise<void> {
    if (auth.user !== undefined) {
      const redirectURL: string | undefined = session.get('redirectURL')

      if (redirectURL !== undefined) {
        session.forget('redirectURL')
        return response.redirect(redirectURL)
      }
    }

    await next()
  }
}
