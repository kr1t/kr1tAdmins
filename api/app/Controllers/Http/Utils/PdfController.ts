import HttpContext from '@ioc:Adonis/Core/HttpContext'

import HttpContext from '@ioc:Adonis/Core/HttpContext'
import HtmlPDF from 'html-pdf'
import axios from 'axios'
export default class PdfController {
  async convertFromHtml({ response }: HttpContext) {
    let url = 'http://help.websiteos.com/websiteos/example_of_a_simple_html_page.htm'

    // const { data: html } = await axios.get(url)

    let html = `<html>
  <head>
    <title>Href Attribute Example</title>
  </head>
  <body>
    <h1>Href Attribute Example</h1>
    <p>
      <a href="https://www.freecodecamp.org/contribute/">The freeCodeCamp Contribution Page</a> shows you how and where you can contribute to freeCodeCamp's community and growth.
    </p>
  </body>
</html>`
    // return html
    let toStream = await new Promise((resolve, reject) => {
      HtmlPDF.create(html).toStream(function (err, stream) {
        resolve(stream)
      })
    })

    return response.stream(toStream)
  }
}
