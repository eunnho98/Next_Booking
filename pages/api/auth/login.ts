import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import Data from '@/lib/data';
import { StoredUserType } from '@/lib/type';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    if (!email || !password) {
      res.statusCode = 400;
      return res.send('필수 데이터가 없습니다.');
    }
    // email: ~~인데 email을 넣으면 ~~을 바로 넣는 것, {email}을 하면 {email: ~~}로 넣는 것
    // lib/data에서 key값으로 비교를 해서 email을 주는 듯
    const user = Data.user.find({ email });
    if (!user) {
      res.statusCode = 404;
      return res.send('가입되지 않은 사용자입니다.');
    }

    // 비밀번호 일치 여부
    const isPasswordMatched = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatched) {
      res.statusCode = 403;
      return res.send('비밀번호가 일치하지 않습니다.');
    }

    // 일치
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const token = jwt.sign(String(user.id), process.env.JWT_SECRET!);
    res.setHeader(
      'Set-Cookie',
      `access_token=${token}; Path=/; Expires=${new Date(
        Date.now() + 60 * 60 * 24 * 1000 * 3,
      ).toUTCString()}; HttpOnly`,
    );
    const UserWithoutPassword: Partial<Pick<StoredUserType, 'password'>> = user;
    delete UserWithoutPassword.password;
    res.statusCode = 200;
    // User에게 반환할 때 패스워드는 빼고 반환함
    return res.send(user);
  }
};
