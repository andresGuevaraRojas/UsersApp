import Config from 'react-native-config';

export type User = {
  id: '';
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type SingleUserResponse = {
  data: User;
};

export type UsersPaginatedResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
};

const apiEndpoind = `${Config.API_URL}/users`;

export async function getUsers(
  perPage = 10,
  page = 1,
): Promise<UsersPaginatedResponse> {
  const response = await fetch(
    `${apiEndpoind}?per_page=${perPage}&page=${page}`,
  );
  if (!response.ok) {
    throw 'Error fetching users';
  }

  const data = (await response.json()) as UsersPaginatedResponse;
  return data;
}

export async function getUser(id: string): Promise<SingleUserResponse> {
  const response = await fetch(`${apiEndpoind}/${id}`);

  if (!response.ok) {
    throw 'Error fetching user';
  }
  const data = (await response.json()) as SingleUserResponse;
  return data;
}
