<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
// const { fetchUser } = useAuthStore();
const { user } = storeToRefs(useAuthStore());
// fetchUser();
</script>

<template>
  <main>
    <pre>
    {{ user }}
   </pre
    >
  </main>
</template>
