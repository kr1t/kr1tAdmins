import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseController from 'App/Controllers/Http/BaseController'

// Validators
import RegisterValidator from 'App/Validators/Auth/RegisterValidator'
import LoginValidator from 'App/Validators/Auth/LoginValidator'

// Models
import User from 'App/Models/User'

// Utils
import Hash from '@ioc:Adonis/Core/Hash'

export default class AuthController extends BaseController {
  // POST
  public async login({ request, response, auth }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator)

    // Lookup user manually
    const user = await User.query().where({ email }).first()
    this.isExits('user', user)

    // Verify password
    let isHashPass = await Hash.verify(user.password, password)
    this.isNotError('credential.invalid', isHashPass)

    // Generate token
    const token = await auth.use('api').generate(user)

    return response.ok({
      message: this.$t('ok'),
      results: {
        token,
        user,
      },
    })
  }

  // POST
  public async register({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)

    let user = await User.create(payload)

    const token = await auth.use('api').generate(user)

    return response.ok({
      message: this.$t('ok'),
      results: {
        token,
        user,
      },
    })
  }

  // GET
  public async me({ request, response }: HttpContextContract) {
    const user = await this.currentUser()

    return response.ok({
      message: this.$t('ok'),
      results: {
        user,
      },
    })
  }
}
