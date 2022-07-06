import axios from "~/plugins/axios"
const { getEnv } = useEnv()
const apiUrl = getEnv("VITE_API_URL")

export const useApi = async ({ url, method = "get", form = {}, params }) => {
  let results = null
  let message = null
  let error = null
  let status = null
  let isSuccess = null

  const formData = form.value ?? form

  try {
    const response = await axios({
      url,
      method,
      data: formData,
      params,
    })

    const data = response.data
    message = data?.message
    status = response.status
    isSuccess = status === 200
    if (isSuccess) results = data?.results
  } catch (e) {
    error = e
  }

  return { message, results, status, error, isSuccess: status === 200 }
}
export const useApiUtils = () => {
  const url = `${apiUrl}/utils`
  const useMakeImage = () => {
    const imagePath = "image"
    const makeQr = (text) => `${url}/${imagePath}/qr?text=${text}`
    const makeBarcode = (text) => `${url}/${imagePath}/barcode?text=${text}`

    return { makeQr, makeBarcode }
  }

  return { useMakeImage }
}

export const useIndexPayload = (func) => {
  const query = ref({
    page: 1,
    q: "",
  })

  const pageChange = (payload) => {
    query.page = payload
    func(query)
  }
  const search = (payload) => {
    query.q = payload
    query.page = 1
    func(query)
  }

  return { pageChange, search }
}
