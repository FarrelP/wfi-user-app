import { computed } from "vue";
import type { User, UsersQuery } from "~/types/user";

export function useUsersView(users: () => User[], query: () => UsersQuery) {
  const filtered = computed(() => {
    let data = [...users()];

    if (query().search) {
      const q = query().search.toLowerCase();
      data = data.filter((u) =>
        `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(q),
      );
    }

    if (query().role) {
      data = data.filter((u) => u.role === query().role);
    }

    return data;
  });

  const sorted = computed(() => {
    const data = [...filtered.value];

    const sortMap: Record<string, (u: User) => any> = {
      name: (u) => `${u.firstName} ${u.lastName}`.toLowerCase(),
      email: (u) => u.email.toLowerCase(),
      age: (u) => u.age,
    };

    const getter = sortMap[query().sortBy];
    if (!getter) return data;

    return data.sort((a, b) => {
      const A = getter(a);
      const B = getter(b);
      if (A === B) return 0;

      return query().order === "asc" ? (A > B ? 1 : -1) : A < B ? 1 : -1;
    });
  });

  const paginated = computed<User[]>(() => {
    const start = (query().page - 1) * query().limit;
    return sorted.value.slice(start, start + query().limit);
  });

  const total = computed<number>(() => {
    return filtered.value.length;
  });

  return {
    total,
    users: paginated,
  };
}
