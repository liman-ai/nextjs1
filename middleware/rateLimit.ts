import { NextRequest, NextResponse } from 'next/server';
import { getQueryCount, setQueryCountWithTTL } from '../lib/kvUtils';

const QUERY_LIMIT = 1; // Günlük sorgu limiti
const DAY_IN_SECONDS = 86400; // 24 saat

export async function rateLimitMiddleware(req: NextRequest) {
  const userKey = req.ip || 'unknown_ip';

  const queryCount = await getQueryCount(userKey);

  if (queryCount >= QUERY_LIMIT) {
    return new Response('Rate limit exceeded', { status: 429 });
  } else {
    await setQueryCountWithTTL(userKey, queryCount + 1, DAY_IN_SECONDS);
  }

  return NextResponse.next();
}
