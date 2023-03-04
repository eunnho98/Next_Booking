/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { StoredUserType } from '../../../lib/type';
import Data from '@/lib/data';

/*
회원가입 api
1. method === POST인지 확인
2. request body에 필요한 값 모두 있는지 확인
3. email 중복 확인
4. 패스워드 암호화
5. 유저정보 추가
6. 추가된 유저의 정보와 토큰 전달
*/
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, name, password, birthday } = req.body;
    if (!email || !name || !password || !birthday) {
      res.statusCode = 400;
      return res.send('필요한 데이터가 없습니다.');
    }
    const userExist = await Data.user.findDB({ email });
    if (userExist) {
      res.statusCode = 405;
      return res.send('이미 가입된 이메일입니다.');
    }
    // password를 8글자의 hash password로 만듦

    const hashedPassword = bcrypt.hashSync(password, 8);

    const newUser: StoredUserType = {
      email,
      name,
      password: hashedPassword,
      birthday,
      userImage: '/default_user.png',
    };
    Data.user.writeDB(newUser);

    // 사용자 인증 토큰 만들기
    const token = jwt.sign(String(newUser.id), process.env.JWT_SECRET!);

    let accessToken = '';
    let refreshToken = '';
    const refreshTokenExpiredDate = new Date(
      Date.now() + 3600 * 1000 * 24 * 180,
    );

    const accessTokenPayload = { email };
    accessToken = jwt.sign(accessTokenPayload, process.env.JWT_SECRET!);

    const refreshTokenPaylaod = { accessToken, refreshTokenExpiredDate };
    refreshToken = jwt.sign(refreshTokenPaylaod, process.env.JWT_SECRET!);

    // 토큰을 쿠키에 저장하기

    res.setHeader(
      'Set-Cookie',
      `access_token=${token}; Path=/; Expires=${new Date(
        Date.now() + 60 * 60 * 24 * 1000 * 3,
      ).toUTCString()}; HttpOnly`,
    );

    // TS 유틸리티 모듈
    const newUserWithoutPassword: Partial<Pick<StoredUserType, 'password'>> =
      newUser;
    delete newUserWithoutPassword.password;
    res.statusCode = 200;
    // User에게 반환할 때 패스워드는 빼고 반환함
    return res.send(newUser);
  }
};
