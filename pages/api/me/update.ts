import Data from '@/lib/data';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { StoredUserType } from '@/lib/type';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { id, email, name, password, birthday } = req.body;

    if (!email || !name || !password || !birthday) {
      res.statusCode = 400;
      return res.send('필요한 데이터가 없습니다.');
    }

    const userExist = await Data.user.findDB({ email });
    if (userExist) {
      res.statusCode = 405;
      return res.send('이메일이 중복되었거나 이전 이메일과 동일합니다.');
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const updateUser: StoredUserType = {
      id,
      email,
      name,
      password: hashedPassword,
      birthday,
    };
    Data.user.updateDB(updateUser);

    res.statusCode = 200;
    res.send('수정완료!');
  }
};
