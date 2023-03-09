import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * 파일 업로드를 위해선 form-data 형식이 필요, Node.js에서 처리하기 위한 라이브러리로 formidable
 *
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const form = new formidable.IncomingForm(); // 객체를 할당
      form.parse(req, async (err, fields, files) => {
        // 필드를 통해 form data 키 값에 접근 가능 ) fileds.id
        console.log(files);
      });
    } catch (error) {
      console.log(error);
      res.end();
    }
  }
  res.statusCode = 405;
  return res.end();
};
