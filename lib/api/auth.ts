import { UserType } from '../type';
import axios from '.';

interface SignUpAPIBody {
  email: string;
  name: string;
  password: string;
  birthday: string;
}

export const signupAPI = (body: SignUpAPIBody) =>
  axios.post<UserType>('/api/auth/signup', body);

export const signupAPI2 = (body: SignUpAPIBody) =>
  axios.post<UserType>('/api/auth/signup2', body);

export const loginAPI = (body: { email: string; password: string }) =>
  axios.post<UserType>('/api/auth/login', body);

export const loginAPI2 = (body: { email: string; password: string }) =>
  axios.post<UserType>('/api/auth/login2', body);

export const meAPI = () => axios.get<UserType>('/api/auth/me');

export const logoutAPI = () => axios.delete('/api/auth/logout');
