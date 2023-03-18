import Data from '@/lib/data';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { email } = req.query;
    const user = await Data.user.findDBwithRoom({ email: email as string });
    if (!email) {
      res.statusCode = 405;
      return res.send('이메일이 없습니다.');
    }
    res.json(user);
    // const user = await Data.user.findDB(email);
  }
};
