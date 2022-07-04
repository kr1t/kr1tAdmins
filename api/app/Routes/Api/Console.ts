import Route from '@ioc:Adonis/Core/Route'
import { RouteHelper } from 'App/Helpers'

export default () => {
  Route.group(() => {
    let ConsoleRoute = RouteHelper.controller('Console')
    ConsoleRoute.index()
    ConsoleRoute.show()
  })
    .prefix('/consoles')
    .middleware('auth')
}
