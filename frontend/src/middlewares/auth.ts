import { useAuthStore } from '~/store/auth'

export default function auth({ next }) {
  const { isLoggedIn } = useAuthStore()

  if (!isLoggedIn) {
    return next({
      name: 'login',
    })
  }

  return next()
}
