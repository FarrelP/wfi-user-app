<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  page: Number,
  limit: Number,
  total: Number,
});

const emit = defineEmits(["update:page", "update:limit"]);

const LIMIT_OPTIONS = [10, 20, 50, 100];

const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.total / props.limit)),
);

const isFirstPage = computed(() => props.page === 1);
const isLastPage = computed(() => props.page >= totalPages.value);

const pageInput = ref(String(props.page));

watch(
  () => props.page,
  (val) => {
    pageInput.value = String(val);
  },
);

const commitPage = () => {
  let value = Number(pageInput.value);
  if (Number.isNaN(value)) {
    pageInput.value = String(props.page);
    return;
  }

  value = Math.min(Math.max(1, value), totalPages.value);

  pageInput.value = String(value);

  if (value !== props.page) {
    emit("update:page", value);
  }
};

const goPrev = () => {
  if (!isFirstPage.value) emit("update:page", props.page - 1);
};

const goNext = () => {
  if (!isLastPage.value) emit("update:page", props.page + 1);
};
</script>

<template>
  <div
    class="mt-6 bg-white shadow-sm p-4 rounded-xl border border-gray-200 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center"
  >
    <div
      class="flex gap-3 text-sm text-gray-600 sm:flex-row sm:items-center sm:gap-4"
    >
      <div class="flex items-center gap-1 justify-center sm:justify-start">
        <span>Page</span>
        <input
          v-model="pageInput"
          type="number"
          min="1"
          :max="totalPages"
          @blur="commitPage"
          @keydown.enter.prevent="commitPage"
          class="w-14 px-2 py-1 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
        <span>of</span>
        <span class="font-medium text-gray-700">{{ totalPages }}</span>
      </div>

      <div class="flex items-center gap-2 justify-center sm:justify-start">
        <span>Rows</span>
        <select
          :value="limit"
          @change="emit('update:limit', Number($event.target.value))"
          class="border rounded-md px-2 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          <option v-for="opt in LIMIT_OPTIONS" :key="opt" :value="opt">
            {{ opt }}
          </option>
        </select>
      </div>
    </div>

    <div class="flex gap-2 sm:gap-2">
      <button
        :disabled="isFirstPage"
        @click="goPrev"
        class="flex-1 sm:flex-none px-4 py-2 border rounded-lg cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <button
        :disabled="isLastPage"
        @click="goNext"
        class="flex-1 sm:flex-none px-4 py-2 bg-gray-800 text-white rounded-lg cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  </div>
</template>