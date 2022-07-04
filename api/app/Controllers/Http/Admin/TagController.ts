import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from 'App/Controllers/Http/BaseController'
import Tag from 'App/Models/Tag'
export default class TagController extends BaseController {
  async index({ request, response }: HttpContextContract) {
    const { page = 1, perPage = 20, orderBy = 'desc', q } = request.all()
    const tags = await Tag.query()
      .where((self) => {
        if (q) {
          self.orWhere('name', 'like', `%${q}%`)
          self.orWhere('slug', 'like', `%${q}%`)
        }
      })
      .orderBy('created_at', orderBy)
      .paginate(page, perPage)

    return response.ok({
      message: this.$t('ok'),
      results: {
        tags,
        q,
      },
    })
  }
}
