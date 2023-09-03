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

export async function getUsers(): Promise<UsersPaginatedResponse> {
  const response = await fetch(`${apiEndpoind}?per_page=10`);
  const data = (await response.json()) as UsersPaginatedResponse;
  return data;
}

export async function getUser(id: string): Promise<SingleUserResponse> {
  const response = await fetch(`${apiEndpoind}/${id}`);
  const data = (await response.json()) as SingleUserResponse;
  return data;
}
