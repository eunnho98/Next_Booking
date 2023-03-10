// 서버 저장용
export type StoredUserType = {
  id?: number;
  email: string;
  name: string;
  password: string;
  birthday: string;
  userImage?: string;
  accessToken?: string;
  refreshToken?: string;
};

// 클라이언트 반환용, 패스워드 삭제
export type UserType = {
  [x: string]: any;
  id: number;
  email: string;
  name: string;
  birthday: string;
  userImage: string;
};

export type UserState = UserType & {
  isLogged: boolean;
};

// 침대 유형
export type BedType =
  | '다른 침대 추가'
  | '소파'
  | '에어 매트릭스'
  | '요와 이불'
  | '싱글'
  | '더블'
  | '퀸'
  | '이층 침대'
  | '바닥용 에어매트릭스'
  | '유아 침대'
  | '유아용 침대'
  | '해먹'
  | '물침대';
