import Route from '@ioc:Adonis/Core/Route'
import { RouteHelper } from 'App/Helpers'


export default () => {
  Route.group(() => {
    let TagRoute = RouteHelper.controller('Admin/Tag')
    TagRoute.crud()
  }).prefix('/tags')
}
