<script setup lang="ts">
const { index: tagIndex } = useTagStore();
const { fetch: fetchTags, items: tags, loading } = tagIndex();

const columns = [
  { key: "id" },
  { key: "name" },
  { key: "slug" },
  { key: "created_at", name: "Created At" },
];

const query = ref({
  page: 1,
  q: "",
});

fetchTags(query);

const showMore = (payload) => {
  query.page = payload;
  fetchTags(query);
};
const search = (payload) => {
  query.q = payload;
  query.page = 1;
  fetchTags(query);
};
</script>

<template>
  <div>
    <div class="relative overflow-x-auto bg-gray sm:rounded-lg">
      <AdminSearch @searchInput="search" />
      <AdminSimpleTable :rows="tags.data" :columns="columns" />
    </div>

    <Pagination
      :meta="tags.meta"
      :has-more-pages="true"
      @pagechanged="showMore"
    ></Pagination>
  </div>
</template>

<route lang="yaml">
meta:
  middleware: [admin]
  layout: admin
</route>

