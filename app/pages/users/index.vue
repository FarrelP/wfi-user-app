<template>
  <div class="max-w-7xl mx-auto p-4">
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
    >
      <div>
        <h1 class="text-2xl font-bold text-gray-800">User Management</h1>
        <p class="text-sm text-gray-500">
          Manage and monitor your application users
        </p>
      </div>

      <button
        @click="isModalOpen = true"
        class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm flex items-center gap-2"
      >
        <span class="text-xl">+</span>
        Add New User
      </button>
    </div>

    <UserFilter />

    <p class="text-sm text-gray-500 mb-2">
      Showing {{ users.length }} of {{ total }} users
    </p>

    <UserTable
      class="hidden md:block"
      :users="users"
      :is-fetching="store.isFetching"
      @edit="handleEdit"
      @delete="confirmDelete"
    />

    <UserCardList
      class="md:hidden"
      :users="users"
      :is-fetching="store.isFetching"
      @edit="handleEdit"
      @delete="confirmDelete"
    />

    <div
      v-if="!store.isFetching && users.length === 0"
      class="p-12 text-center text-gray-500 bg-white rounded-xl border border-gray-200 mt-4"
    >
      No users found matching your criteria.
    </div>

    <UserPagination
      :page="query.page"
      :limit="query.limit"
      :total="total"
      @update:page="setPage"
      @update:limit="setLimit"
    />

    <UserFormModal
      :is-open="isModalOpen"
      :initial-data="selectedUserForEdit"
      @close="closeModal"
      @success="closeModal"
    />

    <ConfirmModal
      :show="showConfirm"
      title="Delete user"
      message="This action cannot be undone."
      confirm-text="Delete"
      @confirm="proceedDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUsersServerStore } from "~/stores/users.server";
import { useUsersView } from "~/composables/useUsersView";
import type { User, UsersQuery } from "~/types/user";

import UserFilter from "~/components/users/Filter.vue";
import UserTable from "~/components/users/Table.vue";
import UserCardList from "~/components/users/CardList.vue";
import UserFormModal from "~/components/users/FormModal.vue";
import UserPagination from "~/components/users/Pagination.vue";
import ConfirmModal from "~/components/ConfirmModal.vue";

const route = useRoute();
const router = useRouter();

const store = useUsersServerStore();
await store.fetchUsersOnce();

const isModalOpen = ref(false);
const showConfirm = ref(false);
const selectedUserForEdit = ref<User | null>(null);
const selectedUserId = ref<number | null>(null);

const query = computed<UsersQuery>(() => ({
  page: Number(route.query.page ?? 1),
  limit: Number(route.query.limit ?? 10),
  search: String(route.query.search ?? ""),
  role: String(route.query.role ?? ""),
  sortBy: String(route.query.sortBy ?? "") as any,
  order: String(route.query.order ?? "asc") as "asc" | "desc",
}));

const view = useUsersView(
  () => store.users,
  () => query.value,
);
const { users, total } = view;

const updateQuery = (patch: Partial<UsersQuery>) => {
  router.replace({ query: { ...route.query, ...patch } });
};

const setPage = (page: number) => updateQuery({ page });
const setLimit = (limit: number) => updateQuery({ limit });

const handleEdit = (user: User) => {
  selectedUserForEdit.value = user;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedUserForEdit.value = null;
};

const confirmDelete = (id: number) => {
  selectedUserId.value = id;
  showConfirm.value = true;
};

const cancelDelete = () => {
  showConfirm.value = false;
  selectedUserId.value = null;
};

const proceedDelete = async () => {
  if (!selectedUserId.value) return;

  await store.deleteUser(selectedUserId.value);
  showConfirm.value = false;
};
</script>
