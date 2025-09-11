import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/listings/new',
  '/api/listings',
  '/api/agreements'
])

export default clerkMiddleware(async (auth, request) => {
  if (isProtectedRoute(request)) {
    try {
      await auth.protect()
    } catch (error) {
      // Return proper 401 instead of 404 redirect for API routes
      if (request.nextUrl.pathname.startsWith('/api/')) {
        return new Response(
          JSON.stringify({ success: false, error: 'Unauthorized - Authentication required' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        )
      }
      // For non-API routes, let Clerk handle the redirect
      throw error
    }
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}