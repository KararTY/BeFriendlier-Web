import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HealthChecksController {
  public async ping ({ request, response }: HttpContextContract): Promise<undefined | string> {
    const isLive = await HealthCheck.isLive()

    const { info } = request.qs()

    if (info === undefined) {
      return isLive
        ? response.status(200).send('Service is live. FeelsGoodMan') as undefined
        : response.status(400).send('Service is not live. monkaS') as undefined
    } else {
      return JSON.stringify(await HealthCheck.getReport(), null, 2)
    }
  }
}
