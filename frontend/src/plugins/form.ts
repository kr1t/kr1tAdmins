import Form from "vform"
import axios from "axios"
const instance = axios.create({
  baseURL: "http://127.0.0.1:3333",
})

Form.axios = instance

const getError = (form, name) => {
  try {
    let errMessage = []
    let errs = form.errors.errors

    for (let e in errs) {
      let field = errs[e].field
      if (field === name) {
        errMessage.push(errs[e].message)
      }
    }

    return errMessage
  } catch (error) {
    console.log(error)
    return []
  }
}

export { Form, getError }
