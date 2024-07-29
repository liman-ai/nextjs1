import { NextRequest, NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { rateLimitMiddleware } from './middleware/rateLimit';

export default async function middleware(req: NextRequest) {
  // Rate limiting kontrolü
  const rateLimitResponse = await rateLimitMiddleware(req);
  if (rateLimitResponse.status === 429) {
    return rateLimitResponse;
  }

  // Kimlik doğrulama kontrolü
  return NextAuth(authConfig).auth(req, NextResponse.next());
}

// Middleware'in uygulanacağı yolları belirleyin
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)', '/api/query']
};
