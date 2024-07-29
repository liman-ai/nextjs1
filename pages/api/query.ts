import { getAuthSession } from '../../auth';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getAuthSession(req, res);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Burada sorgu işlemlerinizi gerçekleştirin
  res.status(200).json({ message: 'Authorized request' });
}
