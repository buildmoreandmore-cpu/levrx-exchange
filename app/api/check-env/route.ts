import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    stripe_secret_key: process.env.STRIPE_SECRET_KEY ? 'SET' : 'MISSING',
    stripe_publishable_key: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? 'SET' : 'MISSING',
    base_url: process.env.NEXT_PUBLIC_BASE_URL ? 'SET' : 'MISSING',
    webhook_secret: process.env.STRIPE_WEBHOOK_SECRET ? 'SET' : 'MISSING',
    node_env: process.env.NODE_ENV,
    has_env_local: process.env.VERCEL === 'true' ? 'VERCEL_MODE' : 'LOCAL_MODE'
  })
}