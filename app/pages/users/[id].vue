<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUsersServerStore } from "~/stores/users.server";
import { useRoute, useRouter } from "vue-router";
import type { User } from "~/types/user";

const route = useRoute();
const router = useRouter();

const userStore = useUsersServerStore();
const user = ref<User | null>(null);

onMounted(async () => {
  user.value = await userStore.getUserById(route.params.id as string);
});
</script>


<template>
  <div class="max-w-7xl mx-auto p-4">
    <button
      @click="router.back()"
      class="mb-6 flex items-center text-gray-600 hover:text-blue-600 font-medium transition-colors cursor-pointer"
    >
      <span class="mr-2">←</span> Back to User List
    </button>

    <div
      v-if="userStore.isFetching"
      class="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse"
    >
      <div class="md:col-span-1 h-64 bg-gray-200 rounded-2xl"></div>
      <div class="md:col-span-2 h-64 bg-gray-200 rounded-2xl"></div>
    </div>

    <div v-else-if="user" class="space-y-6">
      <div
        class="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div class="flex flex-col md:flex-row items-center gap-6">
          <img
            :src="user.image"
            class="w-32 h-32 rounded-2xl border-4 border-white bg-gray-50 shadow-md"
          />
          <div class="text-center md:text-left">
            <h1 class="text-3xl font-bold">
              {{ user.firstName }} {{ user.lastName }}
            </h1>
            <p class="text-blue-100 text-lg">
              @{{ user.username }} • {{ user.company.title }}
            </p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="space-y-6">
          <section
            class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
          >
            <h3
              class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4"
            >
              Personal Stats
            </h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-gray-50 p-3 rounded-lg text-center">
                <p class="text-xs text-gray-500 italic">Height</p>
                <p class="font-bold text-gray-800">{{ user.height }} cm</p>
              </div>
              <div class="bg-gray-50 p-3 rounded-lg text-center">
                <p class="text-xs text-gray-500 italic">Weight</p>
                <p class="font-bold text-gray-800">{{ user.weight }} kg</p>
              </div>
            </div>
            <ul class="mt-4 space-y-3">
              <li class="flex justify-between text-sm">
                <span class="text-gray-500">Blood Group</span>
                <span class="font-semibold">{{ user.bloodGroup }}</span>
              </li>
              <li class="flex justify-between text-sm">
                <span class="text-gray-500">Eye Color</span>
                <span class="font-semibold">{{ user.eyeColor }}</span>
              </li>
              <li class="flex justify-between text-sm">
                <span class="text-gray-500">Hair</span>
                <span class="font-semibold"
                  >{{ user.hair.color }} ({{ user.hair.type }})</span
                >
              </li>
            </ul>
          </section>

          <section
            class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
          >
            <h3
              class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4"
            >
              Home Address
            </h3>
            <p class="font-medium text-gray-800">
              {{ user.address.address }}
            </p>
            <p class="text-sm text-gray-500">
              {{ user.address.city }}, {{ user.address.state }}
            </p>
            <div
              class="mt-4 pt-4 border-t border-dashed flex justify-between text-xs font-mono text-gray-400"
            >
              <span>LAT: {{ user.address.coordinates.lat }}</span>
              <span>LNG: {{ user.address.coordinates.lng }}</span>
            </div>
          </section>
        </div>

        <div class="md:col-span-2 space-y-6">
          <section
            class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
          >
            <h3
              class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4"
            >
              Employment & Education
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p class="text-xs text-blue-600 font-bold uppercase mb-1">
                  Company
                </p>
                <p class="font-bold text-gray-900 leading-tight">
                  {{ user.company.name }}
                </p>
                <p class="text-sm text-gray-500">
                  {{ user.company.department }} Department
                </p>
                <p class="text-xs text-gray-400 mt-2">
                  {{ user.company.address.address }},
                  {{ user.company.address.city }}
                </p>
              </div>
              <div
                class="border-t md:border-t-0 md:border-l md:pl-6 pt-4 md:pt-0"
              >
                <p class="text-xs text-blue-600 font-bold uppercase mb-1">
                  Education
                </p>
                <p class="font-bold text-gray-900 leading-tight">
                  {{ user.university }}
                </p>
              </div>
            </div>
          </section>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <section
              class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
            >
              <h3
                class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4"
              >
                Financials
              </h3>
              <div class="space-y-4">
                <div class="bg-gray-900 p-4 rounded-xl text-white">
                  <p class="text-[10px] uppercase text-gray-400 mb-2 italic">
                    Bank Card
                  </p>
                  <p class="text-lg font-mono tracking-widest">
                    {{ user.bank.cardNumber.replace(/\d(?=\d{4})/g, "*") }}
                  </p>
                  <div class="flex justify-between mt-2 text-[10px]">
                    <span>Exp: {{ user.bank.cardExpire }}</span>
                    <span>{{ user.bank.cardType.toUpperCase() }}</span>
                  </div>
                </div>
                <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p class="text-[10px] uppercase text-gray-400 mb-3 italic">
                    Crypto Wallet
                  </p>

                  <div class="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p class="text-[10px] font-bold uppercase text-gray-400">
                        Coin
                      </p>
                      <p class="text-sm font-medium text-gray-800">
                        {{ user.crypto.coin }}
                      </p>
                    </div>

                    <div>
                      <p class="text-[10px] font-bold uppercase text-gray-400">
                        Network
                      </p>
                      <p class="text-sm font-medium text-gray-800">
                        {{ user.crypto.network }}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p class="text-[10px] font-bold uppercase text-gray-400">
                      Wallet Address
                    </p>
                    <p
                      class="mt-1 text-xs font-mono text-gray-700 break-all leading-relaxed"
                    >
                      {{
                        user.crypto.wallet.replace(
                          /^(.{6}).*(.{4})$/,
                          "$1************$2",
                        )
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section
              class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
            >
              <h3
                class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4"
              >
                Tech Specs
              </h3>
              <div class="space-y-3 text-sm font-mono">
                <div>
                  <p class="text-gray-400 text-[10px] uppercase">IP Address</p>
                  <p class="text-gray-700">{{ user.ip }}</p>
                </div>
                <div>
                  <p class="text-gray-400 text-[10px] uppercase">MAC Address</p>
                  <p class="text-gray-700">{{ user.macAddress }}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <div
      v-else-if="!userStore.isFetching && userStore.error"
      class="flex items-center justify-center min-h-[200px] rounded-md border border-gray-200 bg-gray-50"
    >
      <div class="text-center">
        <p class="font-medium text-gray-600">Data not found</p>
        <p class="mt-1 text-xs text-gray-500">
          Please try again later or contact support.
        </p>
      </div>
    </div>
  </div>
</template>
