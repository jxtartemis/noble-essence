# Noble Essence Storefront

Customer-facing e-commerce storefront for premium pillow cases.

## Features

- ✅ Guest checkout with anonymous Firebase auth
- ✅ Product browsing with filtering and sorting
- ✅ Real-time shipping rate calculation
- ✅ Stripe + PayPal integration
- ✅ Order tracking without login
- ✅ AI shopping assistant (coming soon)
- ✅ Visual search (coming soon)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Architecture

- **Pages**: `/app` directory with Next.js 14 App Router
- **Components**: Reusable UI components in `/src/components`
- **Styling**: Tailwind CSS with custom serif fonts
- **State**: Zustand for cart and session management (coming soon)
- **Firebase**: Anonymous auth for guest carts, Firestore for products

## Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=...
NEXT_PUBLIC_PAYPAL_CLIENT_ID=...
```

## Build

```bash
npm run build
npm start
```
