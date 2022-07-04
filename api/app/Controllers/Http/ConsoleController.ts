import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from 'App/Controllers/Http/BaseController'
import Console from 'App/Models/Console'

export default class ConsoleController extends BaseController {
  async index({ request, response }: HttpContextContract) {
    const { page = 1, perPage = 25, orderBy = 'desc' } = request.all()

    const consoles = await Console.query().orderBy('created_at', orderBy).paginate(page, perPage)

    return response.ok({
      message: 'ok',
      results: {
        consoles,
      },
    })
  }
  async show({ request, response, params }: HttpContextContract) {
    const { id } = request.params()

    const console = await Console.query().where({ id }).first()

    return response.ok({
      message: 'ok',
      results: {
        console,
      },
    })
  }
}
