import axios from '.';
import { UserType } from '../type';

interface UpdateAPIBody {
  id: number;
  email?: string;
  name?: string;
  password?: string;
  birthday?: string;
  image?: string;
}

export const updateAPI = (body: UpdateAPIBody) =>
  axios.post<UserType>('/api/me/update', body);

export const updateImageAPI = (body: UpdateAPIBody) =>
  axios.post<UserType>('/api/me/updateImage', body);
