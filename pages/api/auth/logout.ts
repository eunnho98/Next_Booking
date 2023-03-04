import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'DELETE') {
      // 임의로 만료일을 변경하여 삭제하도록
      res.setHeader('Set-Cookie', [
        `accessToken=; Path=/; Expires=1970-02-08T11:23:15.024Z; HttpOnly`,
        `refreshToken=; Path=/; Expires=1970-02-08T11:23:15.024Z; HttpOnly`,
      ]);
      res.statusCode = 204; // No Content
      return res.end();
    }
  } catch (error) {
    return res.send(error);
  }
  res.statusCode = 405;
  return res.end();
};
