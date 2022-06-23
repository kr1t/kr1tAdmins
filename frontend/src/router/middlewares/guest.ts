import { useAuthStore } from "@/stores/auth"

export default function auth({ next }) {
  const { isLoggedIn } = useAuthStore()
  if (isLoggedIn) {
    return next({
      name: "home",
    })
  }

  return next()
}
