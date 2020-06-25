import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

export default class HealthChecksController {
  public async ping ({ request, response }: HttpContextContract) {
    const isLive = await HealthCheck.isLive()

    const { info } = request.get()

    if (info === undefined) {
      return isLive
        ? response.status(200).send('Service is live. FeelsGoodMan')
        : response.status(400).send('Service is not live. monkaS')
    } else {
      return JSON.stringify(await HealthCheck.getReport(), null, 2)
    }
  }
}
