/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Data from '@/lib/data';
import prisma from '../../../lib/prismadb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    if (!email || !password) {
      res.statusCode = 400;
      return res.send('필수 데이터가 없습니다.');
    }

    const userExist = await Data.user.findDB({ email });

    // 유저 검색
    if (!userExist) {
      res.statusCode = 404;
      return res.send('가입되지 않은 사용자입니다.');
    }

    // 비밀번호 일치 여부
    const isPasswordMatched = bcrypt.compareSync(password, userExist.password!);
    if (!isPasswordMatched) {
      res.statusCode = 403;
      return res.send('비밀번호가 일치하지 않습니다.');
    }

    // 일치

    const accessToken = jwt.sign({ email }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });

    const refreshToken = jwt.sign({ email }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        accessToken,
        refreshToken,
      },
    });

    res.setHeader('Set-Cookie', [
      `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=86400; SameSite=None; Secure`,
      `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=604800; SameSite=None; Secure`,
    ]);

    delete userExist.password;

    res.statusCode = 200;

    res.json({ userExist });
  }
};
