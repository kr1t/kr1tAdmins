import { NotFoundException, ErrorException } from 'App/Exceptions'

export default class ExceptionController {
  isExits(name, conditionVar) {
    if (!conditionVar) throw new NotFoundException(name)
    else return true
  }
  isNotError(name, conditionVar) {
    if (!conditionVar) throw new ErrorException(name)
    else return true
  }
}
