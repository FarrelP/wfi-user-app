<script setup lang="ts">
import { reactive, watch } from "vue";
import { z } from "zod";
import { useUsersServerStore } from "@/stores/users.server";
import type { User } from "~/types/user";

const props = defineProps({
  isOpen: Boolean,
  initialData: { type: Object as () => User | null, default: null },
});

const emit = defineEmits(["close", "success"]);
const userStore = useUsersServerStore();

const schema = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters"),
  lastName: z.string().min(1, "Last name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(3, "Phone is required"),
  gender: z.enum(["male", "female"]),
  birthDate: z.string().min(10, "Birth date is required"),
  role: z.enum(["user", "admin", "moderator"]),
});

type FormValues = z.infer<typeof schema>;

const form = reactive<FormValues>({
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  phone: "",
  gender: "male",
  birthDate: "",
  role: "user",
});

const errors = reactive<Record<string, string>>({});

const resetForm = () => {
  form.firstName = "";
  form.lastName = "";
  form.username = "";
  form.email = "";
  form.phone = "";
  form.gender = "male";
  form.birthDate = "";
  form.role = "user";
  Object.keys(errors).forEach((k) => delete errors[k]);
};

watch(
  () => props.initialData,
  (newVal) => {
    if (newVal) {
      form.firstName = newVal.firstName;
      form.lastName = newVal.lastName;
      form.username = newVal.username ?? "user";
      form.email = newVal.email;
      form.phone = newVal.phone ?? "";
      form.gender = (newVal.gender as "male" | "female") ?? "male";
      form.birthDate = normalizeDate(newVal.birthDate) ?? "";
      form.role = (newVal.role as "user" | "admin" | "moderator") ?? "user";
    } else {
      resetForm();
    }
  },
  { immediate: true },
);

const normalizeDate = (d: string) => {
  if (!d) return "";

  const parts: any = d.split(/[-/]/);

  if (parts.length === 3) {
    const year = parts[0].padStart(4, "0");
    const month = parts[1].padStart(2, "0");
    const day = parts[2].padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // fallback: try Date parsing
  const dt = new Date(d);
  if (!isNaN(dt.getTime())) {
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, "0");
    const day = String(dt.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  return "";
};

const calculateAge = (birthDate: string) => {
  if (!birthDate) return 0;
  const diff = Date.now() - new Date(birthDate).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
};

const validate = (): boolean => {
  const result = schema.safeParse(form);
  if (!result.success) {
    Object.keys(errors).forEach((k) => delete errors[k]);
    result.error.issues.forEach((e: any) => {
      const path = e.path[0] as string;
      errors[path] = e.message;
    });
    return false;
  }
  return true;
};

const onSubmit = async () => {
  if (!validate()) return;

  const payload = {
    ...form,
    age: calculateAge(form.birthDate),
  };

  if (props.initialData?.id) {
    await userStore.updateUser(props.initialData.id, payload);
  } else {
    await userStore.createUser({
      ...payload,
      image: "https://robohash.org/default",
    });
  }

  emit("success");
  emit("close");
  resetForm();
};
</script>

<template>
  <transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div class="absolute inset-0 bg-black/40" @click="emit('close')" />
      <div
        class="relative w-full max-w-2xl rounded-2xl bg-white shadow-xl overflow-hidden"
      >
        <div class="px-6 py-4 border-b border-gray-100">
          <h2 class="text-lg font-semibold text-gray-800">
            {{ initialData ? "Edit User" : "Add New User" }}
          </h2>
          <p class="text-sm text-gray-500">
            {{
              initialData
                ? "Update existing user profile"
                : "Create a new user profile"
            }}
          </p>
        </div>

        <form
          @submit.prevent="onSubmit"
          class="px-6 py-6 space-y-6 max-h-[80vh] overflow-y-auto"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >First Name</label
              >
              <input
                v-model="form.firstName"
                type="text"
                class="w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 border-gray-300"
                :class="errors.firstName && 'border-red-500'"
              />
              <p v-if="errors.firstName" class="mt-1 text-xs text-red-500">
                {{ errors.firstName }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Last Name</label
              >
              <input
                v-model="form.lastName"
                type="text"
                class="w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 border-gray-300"
                :class="errors.lastName && 'border-red-500'"
              />
              <p v-if="errors.lastName" class="mt-1 text-xs text-red-500">
                {{ errors.lastName }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Username</label
              >
              <input
                v-model="form.username"
                type="text"
                class="w-full rounded-lg border px-3 py-2 text-sm border-gray-300"
              />
              <p v-if="errors.username" class="mt-1 text-xs text-red-500">
                {{ errors.username }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Email</label
              >
              <input
                v-model="form.email"
                type="email"
                class="w-full rounded-lg border px-3 py-2 text-sm border-gray-300"
              />
              <p v-if="errors.email" class="mt-1 text-xs text-red-500">
                {{ errors.email }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Phone</label
              >
              <input
                v-model="form.phone"
                type="text"
                class="w-full rounded-lg border px-3 py-2 text-sm border-gray-300"
              />
              <p v-if="errors.phone" class="mt-1 text-xs text-red-500">
                {{ errors.phone }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Gender</label
              >
              <select
                v-model="form.gender"
                class="w-full rounded-lg border px-3 py-2 text-sm bg-white border-gray-300"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Birth Date</label
              >
              <input
                v-model="form.birthDate"
                type="date"
                class="w-full rounded-lg border px-3 py-2 text-sm border-gray-300"
              />
              <p v-if="errors.birthDate" class="mt-1 text-xs text-red-500">
                {{ errors.birthDate }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Role</label
              >
              <select
                v-model="form.role"
                class="w-full rounded-lg border px-3 py-2 text-sm bg-white border-gray-300"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
              </select>
            </div>
          </div>

          <div class="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              @click="emit('close')"
              class="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer shadow-sm font-medium"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>
