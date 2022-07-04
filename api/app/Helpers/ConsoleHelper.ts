const gradient = require('gradient-string')
import Console from 'App/Models/Console'
export default {
  async save({ type, name, text }) {
    let create = await Console.create({ name, text, type })
    console.log(`:::::::::::::::::::::::::::::::::::`)
    console.log(`⚡️⚡️⚡️id(${create.id}) ⚡️⚡️⚡️`)
    return create
  },
  ...console,
  firstLine() {
    console.log(``)
    console.log('===================================')
  },
  endLine() {
    console.log('===================================')
  },
  async success(name, text = null) {
    this.firstLine()
    console.log(gradient.rainbow(`✅ [${name}] : `))
    if (text) console.log(text)

    await this.save({ type: 'success', name, text })
    this.endLine()
    return this
  },
  async error(name, text = null) {
    this.firstLine()
    console.log(gradient('red', 'orange')(`🚫 [${name}] :`))
    if (text) console.log(text)

    await this.save({ type: 'error', name, text })
    this.endLine()
    return this
  },
  async warning(name, text = null) {
    this.firstLine()
    console.log(gradient.summer(`⚠️  [${name}]`))
    if (text) console.log(text)

    await this.save({ type: 'warning', name, text })
    this.endLine()
    return this
  },
}
