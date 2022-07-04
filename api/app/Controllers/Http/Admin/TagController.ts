import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from 'App/Controllers/Http/BaseController'
import Tag from 'App/Models/Tag'
export default class TagController extends BaseController {
  async index({ request, response }: HttpContextContract) {
    const { page = 1, perPage = 25, orderBy = 'desc' } = request.all()
    const tags = await Tag.query().orderBy('created_at', orderBy).paginate(page, perPage)

    return response.ok({
      message: this.$t('ok'),
      results: {
        tags
      }
    })
  }
}
