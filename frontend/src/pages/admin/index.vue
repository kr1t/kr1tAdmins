<script setup>
import { useAuthStore } from '~/store/auth'
</script>

<template>
  <div>
    Dashboard
  </div>
</template>

<route lang="yaml">
meta:
  middleware: [auth]
</route>
