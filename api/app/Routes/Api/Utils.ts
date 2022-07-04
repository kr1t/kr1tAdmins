import Route from '@ioc:Adonis/Core/Route'
import { RouteHelper } from 'App/Helpers'

export default () => {
  Route.group(() => {
    let ImageUtilsRoute = RouteHelper.controller('Utils/Image')

    Route.group(() => {
      ImageUtilsRoute.get().link('qr')
      ImageUtilsRoute.get().link('barcode')
      ImageUtilsRoute.get().link('placeholder')

    }).prefix('/image')
    // image
    let PdfUtilsRoute = RouteHelper.controller('Utils/Pdf')
    Route.group(() => {
      PdfUtilsRoute.get().link('convertFromHtml')
    }).prefix('/pdf')
    // image
  }).prefix('/utils')
}
