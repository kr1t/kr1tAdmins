<script setup lang="ts">
const props = defineProps<{
  rows: Array<object>;
  columns: object;
}>();
</script>

<template>
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead
      class="
        text-xs text-gray-700
        uppercase
        bg-gray-50
        dark:bg-gray-700 dark:text-gray-400
      "
    >
      <tr>
        <th
          scope="col"
          class="px-6 py-3"
          v-for="h in props.columns"
          :key="h.key"
        >
          {{ h.name || h.key || h }}
        </th>

        <th scope="col" class="px-6 py-3">
          <span class="sr-only">Edit</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="
          bg-white
          border-b border-b-gray
          bg-gray-800
          border-gray-700
          hover:bg-gray-50
          dark:hover:bg-gray-600
        "
        v-for="r in props.rows"
        :key="r.id"
      >
        <td class="px-6 py-4" v-for="c in props.columns" :key="c">
          {{ r[c.key] || r[c] }}
        </td>

        <td class="px-6 py-4 text-right">
          <a
            href="#"
            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >Edit</a
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>