<script setup lang="ts">
const { index: tagIndex } = useTagStore();
const { fetch: fetchTags, items: tags, loading } = tagIndex();

const columns = [
  { key: "id" },
  { key: "name" },
  { key: "slug" },
  { key: "created_at", name: "Created At" },
];

const { pageChange, search } = useIndexPayload(fetchTags);
search();
</script>

<template>
  <div>
    <div class="relative overflow-x-auto bg-gray sm:rounded-lg">
      <AdminSearch @searchInput="search" />
      <RouterLink :to="{ name: '' }"> <button>Create</button> </RouterLink>
      <AdminSimpleTable :rows="tags.data" :columns="columns" />
    </div>

    <Pagination
      :meta="tags.meta"
      :has-more-pages="true"
      @pageChange="pageChange"
    ></Pagination>
  </div>
</template>

<route lang="yaml">
meta:
  middleware: [admin]
  layout: admin
</route>

