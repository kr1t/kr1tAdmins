import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ConvertHtmlValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    url: schema.string(),
  })

  public messages: CustomMessages = {}
}
