import Route from '@ioc:Adonis/Core/Route'
import { RouteHelper } from 'App/Helpers'

let AuthRoute = RouteHelper.controller('Auth')

export default () => {
  Route.group(() => {
    AuthRoute.post().link('login')
    AuthRoute.post().link('register')
    AuthRoute.get().link('me')
    AuthRoute.get().link('user')
  }).prefix('/auth')
}
