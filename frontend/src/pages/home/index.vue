<script setup>
import { useAuthStore } from '~/store/auth'
</script>

<template>
  <div>
    Home Page
  </div>
</template>

<route lang="yaml">
meta:
  middleware: [auth]
</route>
