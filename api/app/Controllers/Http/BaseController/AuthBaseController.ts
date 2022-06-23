import HttpContext from '@ioc:Adonis/Core/HttpContext'

export default class AuthBaseController {
  async currentUser() {
    const { auth } = HttpContext.get()
    return await auth.use('api').authenticate()
  }
}
