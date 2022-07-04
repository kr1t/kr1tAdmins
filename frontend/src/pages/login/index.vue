<script setup>
const { login } = useAuthStore()
const { form, submit, loading } = login()

const router = useRouter()

const formSubmit = async () => {
  const { isSuccess, status } = await submit()
  if (isSuccess)
    router.push({ name: 'home' })
}
</script>

<template>
  <div class="mt-5">
    <div>Login</div>

    <div>
      <input v-model="form.email" type="text" placeholder="email"
        class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1">
    </div>
    <div class="mt-5">
      <input v-model="form.password" type="password" placeholder="password"
        class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1">
    </div>

    <div class="mt-5">
      <k-button :loading="loading" @click="formSubmit">
        Login
      </k-button>
    </div>
  </div>

  <!-- <button class="btn btn-dark" :disabled="loading" @click="submit">
    register
  </button> -->
</template>

<route lang="yaml">
meta:
  middleware: [guest]
</route>
