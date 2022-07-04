import Route from '@ioc:Adonis/Core/Route'

import TagRoute from './TagRoute'

export default () => {
  Route.group(() => {
    TagRoute()
  }).prefix('/admin')
}
