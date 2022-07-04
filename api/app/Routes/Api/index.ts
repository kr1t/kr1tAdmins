import Route from '@ioc:Adonis/Core/Route'

import Auth from './Auth'
import Utils from './Utils'
import Console from './Console'
import Admin from './Admin'

Route.group(() => {
  Auth()
  Utils()
  Console()
  Admin()
}).prefix('/api')
