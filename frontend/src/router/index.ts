import { createRouter, createWebHistory } from "vue-router"

import middlewarePipeline from "./middlewares/pipeLine"
import middlewares from "./middlewares"

import routes from "./routes"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware || !to.meta.middleware.length) {
    return next()
  }

  const middleware = []
  to.meta.middleware.map((m) => {
    if (m in middlewares) {
      return middleware.push(middlewares[m])
    }
  })

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

export default router
