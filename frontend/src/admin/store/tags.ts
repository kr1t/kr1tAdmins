import { defineStore } from 'pinia'

export const useTagStore = defineStore('tags', () => {
  const loading = ref(false)
  const setLoading = (status) => {
    loading.value = status
  }

  const index = () => {
    const items = ref([])
    const fetch = async ({ page = 1, q = '' }) => {
      setLoading(true)
      const response = await useApi({ method: 'get', url: 'admin/tags', params: { page, q } })
      const { results, isSuccess } = response
      if (isSuccess)
        items.value = results.tags

      setLoading(false)
      return response
    }

    return { items, fetch, loading: computed(() => loading.value) }
  }

  return {
    index,
  }
})
