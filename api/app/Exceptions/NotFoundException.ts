import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NotFoundException extends Exception {
  public async handle(error: this, ctx: HttpContextContract) {
    try {
      ctx.response.badRequest({
        message: ctx.i18n.formatMessage(`messages.${error.message}.notfound`),
      })
    } catch (error) {
      ctx.response.badRequest({
        message: error.message,
      })
    }
  }
}
