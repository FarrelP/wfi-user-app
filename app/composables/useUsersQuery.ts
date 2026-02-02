import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useUsersQuery = () => {
  const route = useRoute()
  const router = useRouter()

  const DEFAULT_PAGE = 1
  const DEFAULT_LIMIT = 10
  const DEFAULT_ORDER = 'asc'

  const page = ref(DEFAULT_PAGE)
  const limit = ref(DEFAULT_LIMIT)
  const search = ref('')
  const role = ref('')
  const sortBy = ref('')
  const order = ref(DEFAULT_ORDER)

  const syncToUrl = () => {
    router.push({
      query: {
        page: page.value !== DEFAULT_PAGE ? page.value : undefined,
        limit: limit.value !== DEFAULT_LIMIT ? limit.value : undefined,
        search: search.value || undefined,
        role: role.value || undefined,
        sortBy: sortBy.value || undefined,
        order: sortBy.value ? order.value : undefined,
      },
    })
  }

  const updateQuery = (payload: Partial<{
    page: number
    limit: number
    search: string
    role: string
    sortBy: string
    order: string
  }>) => {
    if (payload.page !== undefined) page.value = payload.page
    if (payload.limit !== undefined) limit.value = payload.limit
    if (payload.search !== undefined) search.value = payload.search
    if (payload.role !== undefined) role.value = payload.role
    if (payload.sortBy !== undefined) sortBy.value = payload.sortBy
    if (payload.order !== undefined) order.value = payload.order

    syncToUrl()
  }

  const setPage = (val: number) => {
    page.value = val
    syncToUrl()
  }

  const setLimit = (val: number) => {
    limit.value = val
    page.value = DEFAULT_PAGE
    syncToUrl()
  }

  const setSearch = (val: string) => {
    search.value = val
    page.value = DEFAULT_PAGE
    syncToUrl()
  }

  const setRole = (val: string) => {
    role.value = val
    page.value = DEFAULT_PAGE
    syncToUrl()
  }

  const setSort = (field: string, sortOrder = DEFAULT_ORDER) => {
    sortBy.value = field
    order.value = sortOrder
    page.value = DEFAULT_PAGE
    syncToUrl()
  }

  const resetSort = () => {
    sortBy.value = ''
    order.value = DEFAULT_ORDER
    page.value = DEFAULT_PAGE
    syncToUrl()
  }

  watch(
    () => route.query,
    (q) => {
      page.value = Number(q.page) || DEFAULT_PAGE
      limit.value = Number(q.limit) || DEFAULT_LIMIT
      search.value = String(q.search ?? '')
      role.value = String(q.role ?? '')
      sortBy.value = String(q.sortBy ?? '')
      order.value = String(q.order ?? DEFAULT_ORDER)
    },
    { immediate: true }
  )

  return {
    page,
    limit,
    search,
    role,
    sortBy,
    order,
    setPage,
    setLimit,
    setSearch,
    setRole,
    setSort,
    resetSort,
    updateQuery,
  }
}
