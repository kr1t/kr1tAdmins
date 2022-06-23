import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ErrorException extends Exception {
  public async handle(error: this, ctx: HttpContextContract) {
    ctx.response.badRequest({
      message: ctx.i18n.formatMessage(`messages.${error.message}`),
    })
  }
}
