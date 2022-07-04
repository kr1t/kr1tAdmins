<script setup>
const { register } = useAuthStore()
const { form, submit, loading } = register()

const router = useRouter()

const formSubmit = async () => {
  const { isSuccess, status } = await submit()
  if (isSuccess)
    router.push({ name: 'admin' })
}
</script>

<template>
  <div>Register</div>
  <div>
    <input v-model="form.first_name" type="text" placeholder="firstName">
  </div>
  <div>
    <input v-model="form.last_name" type="text" placeholder="lastName">
  </div>
  <div>
    <input v-model="form.email" type="text" placeholder="email">
  </div>
  <div>
    <input v-model="form.password" type="password" placeholder="password">
  </div>
  <div>
    <input v-model="form.password_confirmation" type="password" placeholder="confirmPassword">
  </div>

  <k-button :loading="loading" @click="formSubmit">
    Register
  </k-button>
  <!-- <button class="btn btn-dark" :disabled="loading" @click="submit">
    register
  </button> -->
</template>

<route lang="yaml">
meta:
  middleware: [adminGuest]
</route>
