<template>
  <div class="flex justify-end">
    <ul class="pagination bg-white p-2 shadow-sm rounded">
      <li class="pagination-item">
        <span
          class="
            rounded-l rounded-sm
            border border-gray-100
            px-3
            py-2
            cursor-not-allowed
            no-underline
            text-gray-600
            h-10
          "
          v-if="isInFirstPage"
          >&laquo;</span
        >
        <a
          v-else
          @click.prevent="onClickFirstPage"
          class="
            rounded-l rounded-sm
            border-t border-b border-l border-gray-100
            px-3
            py-2
            text-gray-600
            hover:bg-gray-100
            no-underline
          "
          href="#"
          role="button"
          rel="prev"
        >
          &laquo;
        </a>
      </li>

      <li class="pagination-item">
        <button
          type="button"
          @click="onClickPreviousPage"
          :disabled="isInFirstPage"
          aria-label="Go to previous page"
          class="
            rounded-sm
            border border-gray-100
            px-3
            py-2
            hover:bg-gray-100
            text-gray-600
            no-underline
            mx-2
            text-sm
          "
          :class="{ 'cursor-not-allowed': isInFirstPage }"
        >
          Previous
        </button>
      </li>

      <li v-for="page in pages" class="pagination-item" :key="page.name">
        <span
          class="
            rounded-sm
            border border-blue-100
            px-3
            py-2
            bg-blue-100
            no-underline
            text-blue-500
            cursor-not-allowed
            mx-2
          "
          v-if="isPageActive(page.name)"
          >{{ page.name }}</span
        >
        <a
          class="
            rounded-sm
            border border-gray-100
            px-3
            py-2
            hover:bg-gray-100
            text-gray-600
            no-underline
            mx-2
          "
          href="#"
          v-else
          @click.prevent="onClickPage(page.name)"
          role="button"
          >{{ page.name }}</a
        >
        <!-- <button
					type="button"
					@click="onClickPage(page.name)"
					:disabled="page.isDisabled"
					:class="{ active: isPageActive(page.name) }" 
				>{{ page.name }}</button> -->
      </li>

      <li class="pagination-item">
        <button
          type="button"
          @click="onClickNextPage"
          :disabled="isInLastPage"
          aria-label="Go to next page"
          class="
            rounded-sm
            border border-gray-100
            px-3
            py-2
            hover:bg-gray-100
            text-gray-600
            no-underline
            mx-2
            text-sm
          "
          :class="{ 'cursor-not-allowed': isInLastPage }"
        >
          Next
        </button>
      </li>

      <li class="pagination-item">
        <!-- <button
					type="button"
					@click="onClickLastPage"
					:disabled="isInLastPage"
					aria-label="Go to last page"
				>Last</button> -->
        <a
          class="
            rounded-r rounded-sm
            border border-gray-100
            px-3
            py-2
            hover:bg-gray-100
            text-gray-600
            no-underline
          "
          href="#"
          @click.prevent="onClickLastPage"
          rel="next"
          role="button"
          v-if="hasMorePages"
          >&raquo;</a
        >
        <span
          class="
            rounded-r rounded-sm
            border border-gray-100
            px-3
            py-2
            hover:bg-gray-100
            text-gray-600
            no-underline
            cursor-not-allowed
          "
          v-else
          >&raquo;</span
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    meta: {
      type: Object,
      // required: true,
    },
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },

    hasMorePages: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    totalPages() {
      return this.meta?.last_page || 0;
    },
    perPage() {
      return this.meta?.per_page || 0;
    },
    currentPage() {
      return this.meta?.current_page || 0;
    },
    total() {
      return this.meta?.total || 0;
    },
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }

      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1;
      }

      return this.currentPage - 1;
    },
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      );
    },
    pages() {
      const range = [];

      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        });
      }

      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },

  methods: {
    onClickFirstPage() {
      this.$emit("pageChange", 1);
    },
    onClickPreviousPage() {
      this.$emit("pageChange", this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit("pageChange", page);
    },
    onClickNextPage() {
      this.$emit("pageChange", this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit("pageChange", this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    },
  },
};
</script>

<style lang="postcss">
.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
}

.active {
  @apply .border-t .border-b .border-l .border-blue-100 .px-3 .py-2 .bg-blue-100 .no-underline .text-blue-500 .text-sm;
}
</style>
