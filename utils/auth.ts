import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';

export async function getAuthSession(req?: NextApiRequest, res?: NextApiResponse) {
  if (req && res) { // Sunucu tarafındaysa
    return await getSession({ req });
  } else { // İstemci tarafındaysa
    return await getSession();
  }
}
