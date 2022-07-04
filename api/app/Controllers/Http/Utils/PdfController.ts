import HttpContext from '@ioc:Adonis/Core/HttpContext'

import HtmlPDF from 'html-pdf'
import axios from 'axios'
import PdfConvertHtmlValidator from 'App/Validators/Utils/Pdf/ConvertHtmlValidator'

export default class PdfController {
  async fetchHtmlAsText(url) {
    const { data } = await axios.get(url)
    return data
  }

  async convertFromHtml({ request, response }: HttpContext) {
    const { url } = await request.validate(PdfConvertHtmlValidator)
    // const { data: html } = await axios.get(url)

    let html = await this.fetchHtmlAsText(url)

    // return html
    let toStream = await new Promise((resolve, reject) => {
      HtmlPDF.create(html).toStream(function (err, stream) {
        resolve(stream)
      })
    })

    return response.stream(toStream)
  }
}
