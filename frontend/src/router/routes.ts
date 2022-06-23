import HomeView from "@/views/HomeView.vue"
import auth from "./middlewares/auth"
import middlewares from "./middlewares"

const view = async ({ name, path }) => {
  let componentPath = name.replace(".", "/")
  let component = await import(`../views/${componentPath}.vue`).then((m) => m.default || m)

  const middleware = component.middleware ?? []
  return [
    {
      path: `/${path ?? componentPath}`,
      name: `${name}`,
      component,
      meta: {
        middleware,
      },
    },
  ]
}

export default [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      middleware: ["auth"],
    },
  },
  ...(await view({ name: "about" })),
  ...(await view({ name: "auth.register" })),
]
