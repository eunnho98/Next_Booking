import axios from '.';
import { UserType } from '../type';

interface UpdateAPIBody {
  id: number;
  email: string;
  name: string;
  password: string;
  birthday: string;
}

export const updateAPI = (body: UpdateAPIBody) =>
  axios.post<UserType>('/api/me/update', body);
