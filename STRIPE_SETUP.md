# Stripe Webhook Setup Guide

## 1. Install Stripe CLI (if not already installed)

```bash
# macOS
brew install stripe/stripe-cli/stripe

# Or download from: https://stripe.com/docs/stripe-cli
```

## 2. Login to Stripe CLI

```bash
stripe login
```

## 3. Set Up Local Webhook Forwarding (Development)

```bash
# Forward webhooks to your local endpoint
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

This will give you a webhook secret that starts with `whsec_...`

## 4. Update .env.local with Your Keys

```bash
# Add your actual Stripe keys to .env.local:
STRIPE_SECRET_KEY=sk_test_your_new_regenerated_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51S0mNQRykqyaI7gUcFnhwjMHX5ehICFnlOTgEVVVvwMBiaq8iuGusRFE3pA9ADWAe3epNgY1Nv1pfBCWmsNHMaFc00u0Jvn9xV
STRIPE_WEBHOOK_SECRET=whsec_from_stripe_listen_command
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 5. Test Payment Flow

1. Start your dev server: `npm run dev`
2. In another terminal, run: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
3. Visit: `http://localhost:3000/pricing`
4. Test with card: `4242 4242 4242 4242`

## 6. Production Webhook Setup (When Deployed)

1. Go to https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. URL: `https://your-domain.com/api/webhooks/stripe`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the webhook secret to your production environment

## 7. Environment Variables Summary

### Development (.env.local)
```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_... (from stripe listen)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Production (Vercel Environment Variables)
```
STRIPE_SECRET_KEY=sk_live_... (live key when ready)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_... (live key when ready)  
STRIPE_WEBHOOK_SECRET=whsec_... (from dashboard webhook)
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

## Troubleshooting

- **Error: STRIPE_SECRET_KEY is not set**: Update your `.env.local` file
- **Webhook not receiving events**: Make sure `stripe listen` is running
- **Payment not completing**: Check webhook events in Stripe dashboard