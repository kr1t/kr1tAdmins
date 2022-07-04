import HttpContext from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import Drive from '@ioc:Adonis/Core/Drive'
import { string } from '@ioc:Adonis/Core/Helpers'

import QRCode from 'qrcode'
import Barcode from 'barcode'
import generatePlaceholderImage from 'generate-placeholder-image'

import QrValidator from 'App/Validators/Utils/Image/QrValidator'
import BarcodeValidator from 'App/Validators/Utils/Image/BarcodeValidator'

import BaseController from 'App/Controllers/Http/BaseController'
import console from 'App/Helpers/ConsoleHelper'

export default class ImageController extends BaseController {
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
    // await console.success('validatePass', 'Daborn')

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
  async placeholder({ response, request }: HttpContext) {
    await request.validate(QrValidator)
    await console.success('validatePass', 'Dabornz')

    const { text, width = 250 } = request.all()

    let imageDraft = this.generateImageDraft()
    const { filePath, fileName } = imageDraft

    try {

      await new Promise((resolve) => {
        generatePlaceholderImage({
          width: 300,
          height: 300,
          r: 255,
          g: 255,
          b: 0,
          text,
          output: filePath
        })
        resolve()
      })


      const read = await imageDraft.readableStream()
      await imageDraft.deleteFile()

      return response.stream(read)
    } catch (err) {
      console.log(err)
      return response.status(404)
    }
  }

}
