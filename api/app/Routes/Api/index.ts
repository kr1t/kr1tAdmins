import Route from '@ioc:Adonis/Core/Route'

import Auth from './Auth'
import Utils from './Utils'

Route.group(() => {
  Auth()
  Utils()
}).prefix('/api')
