import { getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { authConfig } from '../../auth.config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Doğrudan req nesnesini parametre olarak geçin
  const session = await getServerSession(req, res, authConfig);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Burada sorgu işlemlerinizi gerçekleştirin
  res.status(200).json({ message: 'Authorized request' });
}
