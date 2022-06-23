<script setup lang="ts">
defineProps<{
  modelValue: String;
  placeholder: String;
  label: String;
  field: Object;
  type: String;
}>();
</script>

<template>
  <div class="field mb-3">
    <label
      for="name"
      class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
    >
      {{ label ?? placeholder }}
    </label>

    <div class="relative">
      <div
        class="absolute flex border border-transparent left-0 top-0 h-full w-10"
      >
        <div
          class="
            flex
            items-center
            justify-center
            rounded-tl rounded-bl
            z-10
            bg-gray-100
            text-gray-600 text-lg
            h-full
            w-full
          "
        >
          F
        </div>
      </div>

      <input
        :class="[
          `
          text-sm
          sm:text-base
          relative
          w-full
          border
          rounded
          placeholder-gray-400
          focus:border-indigo-400 focus:outline-none
          py-2
          pr-2
          pl-12`,
          field.error ? 'border-red-500' : '',
        ]"
        :type="type"
        :value="modelValue"
        @input="(e) => $emit('update:modelValue', e.target.value)"
        v-bind="$attrs"
        :ref="field.ref"
        :placeholder="placeholder"
      />
    </div>

    <span
      class="
        flex
        items-center
        font-medium
        tracking-wide
        text-red-500 text-xs
        mt-1
        ml-1
      "
      v-if="field.error"
    >
      {{ field.error?.message }}
    </span>
  </div>
</template>

