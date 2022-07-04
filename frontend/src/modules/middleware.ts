import { type UserModule } from '~/types'
import { useAuthStore } from '~/store/auth'
import middlewares from '~/middlewares'
import middlewarePipeline from '~/middlewares/pipeLine'

export const install: UserModule = ({ router }) => {
  router.beforeEach(async (to, from, next) => {
    const { fetchUser, isLoggedIn, token } = useAuthStore()
    if (token && !isLoggedIn)
      await fetchUser()

    if (!to.meta.middleware || !to.meta.middleware.length)
      return next()

    const middleware = []

    to.meta.middleware.map(async (m) => {
      if (m in middlewares)
        return middleware.push(middlewares[m])
    })

    if (!middleware.length)
      next()

    const context = {
      to,
      from,
      next,
    }

    return middleware[0]({
      ...context,
      next: middlewarePipeline(context, middleware, 1),
    })
  })
}
