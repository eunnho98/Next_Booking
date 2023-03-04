/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { StoredUserType } from '../../../lib/type';
import Data from '@/lib/data';

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

    const accessToken = jwt.sign({ email }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });

    const refreshToken = jwt.sign({ email }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });

    const hashedPassword = bcrypt.hashSync(password, 8);
    const newUser: StoredUserType = {
      email,
      name,
      password: hashedPassword,
      birthday,
      userImage: '/default_user.png',
      accessToken,
      refreshToken,
    };
    Data.user.writeDB(newUser);

    console.log('access', accessToken);
    console.log('refresh', refreshToken);

    res.setHeader('Set-Cookie', [
      `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=86400; SameSite=None; Secure`,
      `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=604800; SameSite=None; Secure`,
    ]);

    res.statusCode = 200;

    res.json({ accessToken, refreshToken });
  }
};
