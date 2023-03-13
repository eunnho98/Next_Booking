import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { UserState } from '@/lib/type';

// 비밀번호 보이게 하기
export const isHidden = atom({
  key: 'hide',
  default: true,
});

type auth = 'signup' | 'signin';
// 로그인 / 회원가입 Modal 선택
export const authMode = atom<auth>({
  key: 'mode',
  default: 'signup',
});

const sessionStorage =
  typeof window !== 'undefined' ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'userSession',
  storage: sessionStorage,
});

// 유저 상태 저장
export const initialState = atom<UserState>({
  key: 'user',
  default: {
    id: 0,
    email: '',
    name: '',
    birthday: '',
    userImage: '',
    isLogged: false,
  },
  effects_UNSTABLE: [persistAtom],
});

interface IDateState {
  checkIn: string;
  checkOut: string;
}

export const dateState = atom<IDateState>({
  key: 'date',
  default: {
    checkIn: '',
    checkOut: '',
  },
});

export const searchLocation = atom({
  key: 'location',
  default: {
    location: '',
  },
});
