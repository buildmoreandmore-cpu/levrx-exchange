import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
// import { currentUser } from '@clerk/nextjs/server'
// import { prisma } from '@/lib/prisma'

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/listings/new',
  '/api/listings',
  '/api/agreements',
  '/matches(.*)',
  '/account(.*)'
])

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/onboarding',
  '/api/onboarding',
  '/privacy',
  '/terms',
  '/contact'
])

export default clerkMiddleware(async (auth, request) => {
  const url = request.nextUrl

  // Handle protected routes
  if (isProtectedRoute(request)) {
    try {
      await auth.protect()

      // TODO: Re-enable onboarding check after database schema migration
      // Temporarily disabled to prevent middleware failures
      /*
      // Check if user needs onboarding (skip for API routes to prevent loops)
      if (!request.nextUrl.pathname.startsWith('/api/')) {
        const user = await currentUser()

        if (user && !url.pathname.includes('/onboarding')) {
          try {
            // Check if user has completed onboarding
            const dbUser = await prisma.user.findUnique({
              where: { id: user.id },
              select: { onboardingCompleted: true }
            })

            // If user doesn't exist in DB or hasn't completed onboarding, redirect to onboarding
            if (!dbUser || !dbUser.onboardingCompleted) {
              return NextResponse.redirect(new URL('/onboarding', request.url))
            }
          } catch (dbError) {
            // If database is not available or schema not migrated, allow access
            // This prevents the middleware from breaking the entire site
            console.error('Database error in middleware:', dbError)
            // Continue without blocking the user
          }
        }
      }
      */
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

  // Allow public routes
  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}