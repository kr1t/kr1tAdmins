import Route from '@ioc:Adonis/Core/Route'

import Auth from './Auth'
import Utils from './Utils'
import Console from './Console'

Route.group(() => {
  Auth()
  Utils()
  Console()
}).prefix('/api')
