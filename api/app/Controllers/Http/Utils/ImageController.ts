import HttpContext from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import Drive from '@ioc:Adonis/Core/Drive'
import { string } from '@ioc:Adonis/Core/Helpers'

import QRCode from 'qrcode'
import Barcode from 'barcode'

import QrValidator from 'App/Validators/Utils/Image/QrValidator'
import BarcodeValidator from 'App/Validators/Utils/Image/BarcodeValidator'

export default class ImageController {
  generateImageDraft() {
    let qrPath = Application.tmpPath('utils/image')
    let fileName = `${string.generateRandom(10)}.png`
    let filePath = `${qrPath}/${fileName}`

    const UtilsImageDrive = Drive.use('utilsImage')
    const readableStream = async () => await UtilsImageDrive.getStream(fileName)
    const deleteFile = async () => await UtilsImageDrive.delete(fileName)

    return { filePath, fileName, readableStream, deleteFile }
  }
  async qr({ response, request }: HttpContext) {
    await request.validate(QrValidator)
    const { text, width = 250 } = request.all()

    let imageDraft = this.generateImageDraft()
    const { filePath, fileName } = imageDraft

    try {
      await QRCode.toFile(filePath, text, {
        color: {
          dark: '#000',
          light: '#0000',
        },
        width,
      })

      const read = await imageDraft.readableStream()
      await imageDraft.deleteFile()

      return response.stream(read)
    } catch (err) {
      return response.status(404)
    }
  }
  async barcode({ response, request }: HttpContext) {
    await request.validate(BarcodeValidator)
    const { text, width = 400, height = 150 } = request.all()

    var code39 = Barcode('code39', {
      data: text,
      width,
      height,
    })

    try {
      let toStream = await new Promise((resolve, reject) => {
        code39.getStream(function (err, readStream) {
          if (err) throw err
          resolve(readStream)
        })
      })

      return response.stream(toStream)
    } catch (error) {
      return response.status(404)
    }
  }
}
