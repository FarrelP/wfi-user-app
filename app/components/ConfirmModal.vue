<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: "Confirm action",
  },
  message: {
    type: String,
    default: "Are you sure?",
  },
  confirmText: {
    type: String,
    default: "Confirm",
  },
  cancelText: {
    type: String,
    default: "Cancel",
  },
});

const emit = defineEmits(["confirm", "cancel"]);
</script>

<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div class="absolute inset-0 bg-black/40" @click="emit('cancel')" />

      <div
        class="relative bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 p-6"
      >
        <h3 class="text-lg font-semibold text-gray-800">
          {{ title }}
        </h3>

        <p class="mt-2 text-sm text-gray-600">
          {{ message }}
        </p>

        <div class="mt-6 flex justify-end gap-3">
          <button
            @click="emit('cancel')"
            class="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition cursor-pointer disabled:opacity-40"
          >
            {{ cancelText }}
          </button>

          <button
            @click="emit('confirm')"
            class="px-4 py-2 text-sm rounded-lg bg-red-600 hover:bg-red-700 text-white transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style></style>