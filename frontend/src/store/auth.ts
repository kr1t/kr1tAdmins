import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

import { useApi } from '~/composables/api'
export const useAuthStore = defineStore('auth', () => {
  const token = ref(Cookies.get('token') || null)
  const user = ref(false)

  const isLoggedIn = computed(() => user.value)

  const saveToken = (tokenParam) => {
    token.value = tokenParam
    Cookies.set('token', tokenParam, { expires: 365 })
  }
  const logout = async () => {
    token.value = null
    user.value = null
    Cookies.remove('token')
  }
  const fetchUser = async () => {
    try {
      const { results } = await useApi({ url: 'auth/me' })
      user.value = results.user
    }
    catch (e) {
      await logout()
    }
  }

  const login = () => {
    const form = ref({
      email: 'adqwd@d.com',
      password: '123456',
    })

    const loading = ref(false)
    const setLoading = (status) => {
      loading.value = status
    }

    const submit = async () => {
      setLoading(true)
      const response = await useApi({ method: 'post', url: 'auth/login', form })
      const { results, isSuccess } = response
      if (isSuccess) {
        saveToken(results.token.token)
        await fetchUser()
      }

      setLoading(false)
      return response
    }

    return { form, submit, loading: computed(() => loading.value) }
  }

  const register = () => {
    const form = ref({
      first_name: '1',
      last_name: '2',
      email: 'adqwd@d.com',
      password: '123456',
      password_confirmation: '123456',
    })

    const loading = ref(false)
    const setLoading = (status) => {
      loading.value = status
    }

    const submit = async () => {
      setLoading(true)
      const response = await useApi({ method: 'post', url: 'auth/register', form })
      const { results, isSuccess } = response
      if (isSuccess) {
        saveToken(results.token.token)
        await fetchUser()
      }

      setLoading(false)
      return response
    }

    return { form, submit, loading: computed(() => loading.value) }
  }

  return {
    token,
    user: computed(() => user),
    isLoggedIn,
    saveToken,
    fetchUser,
    logout,
    login,
    register,
  }
})
