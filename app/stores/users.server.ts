import { defineStore } from "pinia"
import type { User } from "~/types/user"
import {
  fetchUsers,
  fetchUserById,
  createUser as apiCreateUser,
  updateUser as apiUpdateUser,
  deleteUser as apiDeleteUser,
} from "~/services/userService"
import {
  normalizeUser,
  createOptimisticUser,
} from "~/factories/user.factory"

export const useUsersServerStore = defineStore("users-server", {
  state: () => ({
    byId: {} as Record<number, User>,
    allIds: [] as number[],
    isFetching: false,
    error: null as string | null,
  }),

  getters: {
    users(state): User[] {
      return state.allIds
        .map(id => state.byId[id])
        .filter((u): u is User => u !== undefined)
    },
  },

  actions: {
    async fetchUsersOnce() {
      if (this.allIds.length) return

      this.isFetching = true
      this.error = null

      try {
        const res = await fetchUsers({ limit: 100, skip: 0 })

        res.users.forEach(raw => {
          const user = normalizeUser(raw)
          this.byId[user.id] = user
          this.allIds.push(user.id)
        })
      } catch {
        this.error = "Failed to fetch users"
      } finally {
        this.isFetching = false
      }
    },

    async getUserById(id: number) {
      if (this.byId[id]) return this.byId[id]

      this.isFetching = true
      try {
        const raw = await fetchUserById(id)
        const user = normalizeUser(raw)

        this.byId[user.id] = user
        this.allIds.push(user.id)

        return user
      } catch {
        this.error = "Failed to fetch user"
        return null
      } finally {
        this.isFetching = false
      }
    },

    async createUser(payload: Partial<User>) {
      const tempId = Date.now()
      const optimistic = createOptimisticUser(payload, tempId)

      this.byId[tempId] = optimistic
      this.allIds.unshift(tempId)

      try {
        const created: any = await apiCreateUser(optimistic)
        const normalized = normalizeUser(created)

        delete this.byId[tempId]
        this.byId[normalized.id] = normalized
        this.allIds = this.allIds.map(id =>
          id === tempId ? normalized.id : id
        )
      } catch {
        delete this.byId[tempId]
        this.allIds = this.allIds.filter(id => id !== tempId)
        this.error = "Failed to create user"
      }
    },

    async updateUser(id: number, patch: Partial<User>) {
      const prev = { ...this.byId[id] }
      this.byId[id] = normalizeUser({ ...prev, ...patch })

      try {
        await apiUpdateUser(id, patch)
      } catch {
        const prev = this.byId[id]
        if (!prev) return

        this.byId[id] = {
          ...prev,
          ...patch,
        }
        this.error = "Failed to update user"
      }
    },

    async deleteUser(id: number) {
      const backup = this.byId[id]

      delete this.byId[id]
      this.allIds = this.allIds.filter(i => i !== id)

      try {
        await apiDeleteUser(id)
      } catch {
        if (!backup) return
        this.byId[id] = backup
        this.allIds.push(id)
        this.error = "Failed to delete user"
      }
    },
  },
})
