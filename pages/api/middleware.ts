import { NextRequest, NextResponse } from 'next/server';
import { rateLimitMiddleware } from './middleware/rateLimit';

export async function middleware(req: NextRequest) {
  // Rate limiting kontrolü
  const rateLimitResponse = await rateLimitMiddleware(req);
  if (rateLimitResponse.status === 429) {
    return rateLimitResponse;
  }

  return NextResponse.next();
}

// Middleware'in uygulanacağı yolları belirleyin
export const config = {
  matcher: ['/api/query'],
};
