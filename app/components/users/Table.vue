<script setup lang="ts">
import type { User } from "~/types/user";

const props = defineProps<{
  users: User[];
  isFetching?: boolean;
}>();

defineEmits(["edit", "delete"]);
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="p-4 text-sm font-semibold text-gray-600">ID</th>
            <th class="p-4 text-sm font-semibold text-gray-600">User</th>
            <th class="p-4 text-sm font-semibold text-gray-600">Info</th>
            <th class="p-4 text-sm font-semibold text-gray-600">Contact</th>
            <th class="p-4 text-sm font-semibold text-gray-600">Role</th>
            <th class="p-4 text-sm font-semibold text-gray-600 text-right">
              Actions
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-100">
          <tr v-if="isFetching" v-for="i in 5" :key="i" class="animate-pulse">
            <td colspan="6" class="p-4">
              <div class="h-4 bg-gray-100 rounded w-full"></div>
            </td>
          </tr>

          <tr v-else v-for="user in users" :key="user.id" class="hover:bg-blue-50/30 transition">
            <td class="p-4 text-sm text-gray-500 font-mono">#{{ user.id }}</td>

            <td class="p-4">
              <div class="flex items-center gap-3">
                <img :src="user.image" class="w-10 h-10 rounded-full border" />
                <div>
                  <div class="font-semibold text-gray-800">
                    {{ user.firstName }} {{ user.lastName }}
                  </div>
                  <div class="text-xs text-gray-400">@{{ user.username }}</div>
                </div>
              </div>
            </td>

            <td class="p-4">
              <div class="text-sm">{{ user.birthDate }}</div>
              <div class="text-xs text-gray-500">
                {{ user.age }} Yrs -
                <span class="capitalize">{{ user.gender }}</span>
              </div>
            </td>

            <td class="p-4 flex flex-col">
              <a :href="`mailto:${user.email}`" class="text-blue-600 text-sm hover:underline truncate">
                {{ user.email }}
              </a>
              <a :href="`mailto:${user.email}`" class="text-sm hover:text-blue-600 truncate">
                {{ user.phone }}
              </a>
            </td>

            <td class="p-4">
              <span class="px-2.5 py-0.5 rounded-full text-xs bg-purple-100 text-purple-700 capitalize">
                {{ user.role || "User" }}
              </span>
            </td>

            <td class="p-4 text-right">
              <div class="flex justify-end gap-3">
                <NuxtLink :to="`/users/${user.id}`" 
                  class="px-3 py-1 text-sm text-blue-600 border border-blue-100 rounded hover:bg-blue-50 transition-colors">
                  Detail
                </NuxtLink>

                <button @click="$emit('edit', user)"
                  class="px-3 py-1 text-sm text-amber-600 border border-amber-100 rounded cursor-pointer hover:bg-amber-50 transition-colors">
                  Edit
                </button>

                <button @click="$emit('delete', user.id)"
                  class="px-3 py-1 text-sm text-red-500 border border-red-100 rounded cursor-pointer hover:bg-red-50 transition-colors">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
