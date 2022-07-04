import Route from '@ioc:Adonis/Core/Route'

class RouteHelper {
  constructor(controller) {
    // this.controller(controller)
  }
  path(path) {
    if (path) {
      this.$path = path
    }
    return this
  }

  get(path = false) {
    this.path(path)
    this.method = 'get'
    return this
  }
  post(path = false) {
    this.path(path)
    this.method = 'post'
    return this
  }
  put(path = false) {
    this.path(path)
    this.method = 'put'
    return this
  }
  patch(path = false) {
    this.path(path)
    this.method = 'patch'
    return this
  }
  delete(path = false) {
    this.path(path)
    this.method = 'delete'
    return this
  }
  controller(controller) {
    this.$controller = controller
    return this
  }

  template(path, controller, func) {
    return Route[this.method](path, `${controller}Controller.${func}`)
  }
  make(func) {
    let { $path, $controller } = this
    return this.template($path, $controller, func)
  }

  link(path) {
    let { $controller } = this
    return this.template(path, $controller, path)
  }
  crud(path = '') {
    let { $controller } = this
    return Route.resource(path, `${$controller}Controller`)
  }

  index(path = '/') {
    let { $controller } = this
    return this.get().template(path, $controller, 'index')
  }
  show(path = '/:id') {
    let { $path, $controller } = this
    return this.get().template(path, $controller, 'show')
  }
  store(path = '/') {
    let { $path, $controller } = this
    return this.post().template(path, $controller, 'store')
  }
  update(path = '/:id') {
    let { $path, $controller } = this
    return this.put().template(path, $controller, 'update')
  }
  destroy(path = '/:id') {
    let { $path, $controller } = this
    return this.delete().template(path, $controller, 'destroy')
  }
}

export default new RouteHelper()
