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
  isPurchase?: boolean;
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
  isPurchase: boolean;
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

// payment type
export interface RequestPayAdditionalParams {
  digital?: boolean;
  vbank_due?: string;
  m_redirect_url?: string;
  app_scheme?: string;
  biz_num?: string;
}

export interface Display {
  card_quota?: number[];
}

export interface RequestPayParams extends RequestPayAdditionalParams {
  pg?: string;
  pay_method: string;
  escrow?: boolean;
  merchant_uid: string;
  name?: string;
  amount: number;
  custom_data?: any;
  tax_free?: number;
  currency?: string;
  language?: string;
  buyer_name?: string;
  buyer_tel: string;
  buyer_email?: string;
  buyer_addr?: string;
  buyer_postcode?: string;
  notice_url?: string | string[];
  display?: Display;
}

// payment callback func type
export interface RequestPayAdditionalResponse {
  apply_num?: string;
  vbank_num?: string;
  vbank_name?: string;
  vbank_holder?: string | null;
  vbank_date?: number;
}

export interface RequestPayResponse extends RequestPayAdditionalResponse {
  success: boolean;
  error_code: string;
  error_msg: string;
  imp_uid: string | null;
  merchant_uid: string;
  pay_method?: string;
  paid_amount?: number;
  status?: string;
  name?: string;
  pg_provider?: string;
  pg_tid?: string;
  buyer_name?: string;
  buyer_email?: string;
  buyer_tel?: string;
  buyer_addr?: string;
  buyer_postcode?: string;
  custom_data?: any;
  paid_at?: number;
  receipt_url?: string;
}
