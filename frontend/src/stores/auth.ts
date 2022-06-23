import { defineStore } from "pinia"
import Cookies from "js-cookie"
import axios from "@/plugins/axios"

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: Cookies.get("token"),
    user: false,
  }),
  getters: {
    isLoggedIn: (state) => state.user,
  },
  actions: {
    saveToken(token) {
      this.token = token
      Cookies.set("token", token, { expires: 365 })
    },
    async fetchUser() {
      const { data } = await axios.get("/api/auth/me")
      this.user = data.results.user
    },
  },
})
