import { defineStore } from 'pinia'

export const useUsersUIStore = defineStore('users-ui', {
  state: () => ({
    page: 1,
    limit: 10,
    search: '',
    role: '' as string | '',
    sortBy: '' as 'name' | 'email' | 'age' | '',
    order: 'asc' as 'asc' | 'desc',
  }),

  actions: {
    setPage(page: number) {
      this.page = page
    },
    setSearch(search: string) {
      this.search = search
      this.page = 1
    },
    setRole(role: string) {
      this.role = role
      this.page = 1
    },
    setSort(sortBy: any, order: any) {
      this.sortBy = sortBy
      this.order = order
      this.page = 1
    },
  },
})
