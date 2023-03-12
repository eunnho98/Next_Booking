import Data from '@/lib/data';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    console.log(req.body);
    const { id, image } = req.body;

    Data.user.updateImageDB(id, image);

    res.statusCode = 200;
    res.send(image);
  }
};
