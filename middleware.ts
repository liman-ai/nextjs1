import { NextRequest, NextResponse } from 'next/server';
import { rateLimitMiddleware } from './middleware/rateLimit';
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default async function middleware(req: NextRequest) {
  // Rate limiting kontrolü
  const rateLimitResponse = await rateLimitMiddleware(req);
  if (rateLimitResponse.status === 429) {
    return rateLimitResponse;
  }

  // Kimlik doğrulama kontrolü
  const authResponse = await NextAuth(authConfig).auth(req, NextResponse.next());
  if (authResponse.status === 401) {
    return authResponse;
  }

  return authResponse;
}

// Middleware'in uygulanacağı yolları belirleyin
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)', '/api/query'],
};
