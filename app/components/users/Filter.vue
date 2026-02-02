<script setup>
import { ref, watch } from "vue";
import { useUsersQuery } from "~/composables/useUsersQuery";

const query = useUsersQuery();

const localSearch = ref("");
const localRole = ref("");
const localSortBy = ref("");
const localOrder = ref("asc");

watch(
  () => ({
    search: query.search.value,
    role: query.role.value,
    sortBy: query.sortBy.value,
    order: query.order.value,
  }),
  (val) => {
    localSearch.value = val.search;
    localRole.value = val.role;
    localSortBy.value = val.sortBy;
    localOrder.value = val.order || "asc";
  },
  { immediate: true },
);

const applyFilters = () => {
  query.setSearch(localSearch.value);
  query.setRole(localRole.value);

  if (localSortBy.value) {
    query.setSort(localSortBy.value, localOrder.value);
  } else {
    query.resetSort();
  }
};

const resetFilters = () => {
  localSearch.value = "";
  localRole.value = "";
  localSortBy.value = "";
  localOrder.value = "asc";

  query.setSearch("");
  query.setRole("");
  query.resetSort();
};
</script>

<template>
  <div class="mb-6 bg-white border border-gray-200 rounded-xl p-4 space-y-4 shadow-sm">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
      <input
        v-model="localSearch"
        @keyup.enter="applyFilters"
        type="text"
        placeholder="Search by name or email"
        class="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
      />

      <select
        v-model="localRole"
        class="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <option value="">All roles</option>
        <option value="admin">Admin</option>
        <option value="moderator">Moderator</option>
        <option value="user">User</option>
      </select>
    </div>

    <div
      class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <div class="flex gap-2">
        <select
          v-model="localSortBy"
          class="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <option value="">No sorting</option>
          <option value="name">Name</option>
          <option value="age">Age</option>
        </select>

        <select
          v-model="localOrder"
          :disabled="!localSortBy"
          class="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>

      <div class="flex gap-2">
        <button
          @click="resetFilters"
          class="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
        >
          Reset
        </button>

        <button
          @click="applyFilters"
          class="px-4 py-2 text-sm rounded-lg bg-gray-800 text-white hover:bg-gray-700"
        >
          Apply
        </button>
      </div>
    </div>
  </div>
</template>