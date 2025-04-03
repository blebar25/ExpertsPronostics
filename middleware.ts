import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true
    }
  }
);

export const config = {
  matcher: ['/dashboard/:path*']
}