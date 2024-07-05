import type { NextApiRequest, NextApiResponse } from 'next';

import { destroy } from 'controllers/users/destroy';
import { show } from 'controllers/users/show';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface NextApiRequestExtended extends NextApiRequest {
  query: { username: string };
}

export default async function handler(req: NextApiRequestExtended, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return show(req, res);
    case 'DELETE':
      return destroy(req, res);
    default:
      return res.status(405).json({ message: `HTTP method ${req.method ?? 'unknown'} not allowed` });
  }
}
