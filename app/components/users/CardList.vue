<script setup lang="ts">
import type { User } from "~/types/user";

const props = defineProps<{
  users: User[];
  isFetching?: boolean;
}>();

defineEmits(["edit", "delete"]);
</script>

<template>
  <div class="space-y-4">
    <div
      v-if="isFetching"
      v-for="i in 3"
      :key="i"
      class="bg-gray-100 animate-pulse h-36 rounded-xl"
    />

    <div
      v-else
      v-for="user in users"
      :key="user.id"
      class="bg-white rounded-xl border border-gray-200 overflow-hidden"
    >
      <div
        class="p-4 flex justify-between items-start border-b border-gray-100"
      >
        <div class="flex items-center gap-3">
          <img
            :src="user.image"
            class="w-10 h-10 rounded-full border border-gray-200 bg-gray-50"
          />

          <div>
            <div class="font-semibold text-gray-800 leading-tight">
              {{ user.firstName }} {{ user.lastName }}
            </div>
            <div class="text-xs text-gray-400">@{{ user.username }}</div>
          </div>
        </div>

        <div class="flex gap-2">
          <router-link
            :to="`/users/${user.id}`"
            class="px-3 py-1 text-xs text-blue-600 border border-blue-100 rounded hover:bg-blue-50"
          >
            Detail
          </router-link>

          <button @click="$emit('edit', user)"
            class="px-3 py-1 text-xs text-amber-600 border border-amber-100 rounded cursor-pointer hover:bg-amber-50 transition-colors">
            Edit
          </button>

          <button
            @click="$emit('delete', user.id)"
            class="px-3 py-1 text-xs text-red-500 border border-red-100 rounded hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>

      <div class="p-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
        <div>
          <div class="text-xs text-gray-400 font-semibold uppercase">ID</div>
          <div class="font-mono text-gray-500">#{{ user.id }}</div>
        </div>

        <div>
          <div class="text-xs text-gray-400 font-semibold uppercase">Role</div>
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-purple-100 text-purple-700 capitalize"
          >
            {{ user.role || "User" }}
          </span>
        </div>

        <div>
          <div class="text-xs text-gray-400 font-semibold uppercase">
            Age / Gender
          </div>
          <div class="text-gray-700">
            {{ user.age }} Yrs -
            <span class="capitalize">{{ user.gender }}</span>
          </div>
        </div>

        <div>
          <div class="text-xs text-gray-400 font-semibold uppercase">
            Birth Date
          </div>
          <div class="text-gray-700">{{ user.birthDate }}</div>
        </div>

        <div class="col-span-2">
          <div class="text-xs text-gray-400 font-semibold uppercase">Email</div>
          <div class="text-gray-700 truncate">{{ user.email }}</div>
        </div>

        <div class="col-span-2">
          <div class="text-xs text-gray-400 font-semibold uppercase">Phone</div>
          <div class="text-gray-700">{{ user.phone }}</div>
        </div>
      </div>
    </div>
  </div>
</template>