<template>
  <main>
    <AdminNavbar />
    <div class="flex">
      <AdminSidebar class="sidebar" />
      <div class="view w-full m-5">
        <RouterView />
      </div>
    </div>
  </main>
</template>

