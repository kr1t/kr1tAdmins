import HttpContext from '@ioc:Adonis/Core/HttpContext'

export default class TranslationBaseController {
  $t(t) {
    const { i18n } = HttpContext.get()
    return i18n.formatMessage(`messages.${t}`)
  }
}
