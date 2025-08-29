import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/listings(.*)',
  '/pricing',
  '/login',
  '/register', 
  '/demo(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/test-payment',
  '/api/webhooks(.*)',
  '/api/create-checkout-session',
  '/api/check-env',
  '/api/match(.*)',
  '/matches(.*)'
])

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}