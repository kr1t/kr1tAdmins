import { I18n } from '@ioc:Adonis/Addons/I18n'
import HttpContext from '@ioc:Adonis/Core/HttpContext'
import { NotFoundException, ErrorException } from 'App/Exceptions'
import ExceptionController from './ExceptionBaseController'
import AuthBaseController from './AuthBaseController'
import TranslationBaseController from './TranslationBaseController'

var aggregation = (baseClass, ...mixins) => {
  class base extends baseClass {
    constructor(...args) {
      super(...args)
      mixins.forEach((mixin) => {
        copyProps(this, new mixin())
      })
    }
  }
  let copyProps = (target, source) => {
    // this function copies all properties and symbols, filtering out some special ones
    Object.getOwnPropertyNames(source)
      .concat(Object.getOwnPropertySymbols(source))
      .forEach((prop) => {
        if (
          !prop.match(
            /^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/
          )
        )
          Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop))
      })
  }
  mixins.forEach((mixin) => {
    // outside contructor() to allow aggregation(A,B,C).staticFunction() to be called etc.
    copyProps(base.prototype, mixin.prototype)
    copyProps(base, mixin)
  })
  return base
}

export default class BaseController extends aggregation(
  ExceptionController,
  AuthBaseController,
  TranslationBaseController
) {}
