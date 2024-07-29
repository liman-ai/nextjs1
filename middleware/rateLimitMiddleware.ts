import { rateLimitMiddleware } from './middleware/rateLimit';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  // Rate limiting kontrolü
  const rateLimitResponse = await rateLimitMiddleware(req);
  if (rateLimitResponse.status === 429) {
    return rateLimitResponse;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/query'],
};
