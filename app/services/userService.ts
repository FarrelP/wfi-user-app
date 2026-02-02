import type { User, UsersResponse } from "~/types/user";

type FetchUsersParams = {
  limit: number;
  skip: number;
  search?: string;
  sortBy?: "name" | "email" | "age";
  order?: "asc" | "desc";
};

export const fetchUsers = async (
  params: FetchUsersParams
): Promise<UsersResponse> => {
  const { $api } = useNuxtApp();

  return $api("/users", {
    query: {
      limit: params.limit,
      skip: params.skip,
      q: params.search || undefined,
      sortBy: params.sortBy || undefined,
      order: params.sortBy ? params.order : undefined,
    },
  });
};

export const fetchUserById = async (
  id: string | number
): Promise<User> => {
  const { $api } = useNuxtApp();
  return $api(`/users/${id}`);
};

export const createUser = async (data: Partial<User>) => {
  const { $api } = useNuxtApp();
  return $api("/users/add", {
    method: "POST",
    body: data,
  });
};

export const updateUser = async (
  id: string | number,
  data: Record<string, any>
) => {
  const { $api } = useNuxtApp();
  return $api(`/users/${id}`, {
    method: "PUT",
    body: data,
  });
};

export const deleteUser = async (id: string | number) => {
  const { $api } = useNuxtApp();
  return $api(`/users/${id}`, {
    method: "DELETE",
  });
};
