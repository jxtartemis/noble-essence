# Noble Essence Cloud Functions

Serverless backend logic for the Noble Essence e-commerce platform.

## Functions

### Payment Processing
- `createPaymentIntent` - Create Stripe payment intent for checkout
- `stripeWebhook` - Handle Stripe webhooks (payment success/failure)
- `processRefund` - Process refunds (admin only)

### Shipping
- `getShippingRates` - Calculate real-time shipping rates (Shippo/EasyPost)
- `generateShippingLabel` - Generate and store shipping labels

### AI Features
- `generateProductCopy` - AI-assisted product descriptions (admin)
- `aiShoppingAssistant` - Chat-based shopping assistant (customer)

### Order & Cart
- `createOrder` - Create order from cart with discount calculation
- `validateCoupon` - Validate coupon codes and calculate discounts

### Admin
- `detectFraud` - Flag suspicious orders for review

## Environment Variables

Create `.env` in the functions directory:

```
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
PAYPAL_SECRET=...
OPENAI_API_KEY=sk-...
SHIPPO_API_KEY=...
FUNCTIONS_URL=https://us-central1-your-project.cloudfunctions.net
```

## Deployment

```bash
cd functions
npm install
npm run build
npm run deploy
```

## Local Development

```bash
cd functions
npm install
npm run serve
```

Functions will be available at `http://localhost:5001`

## Security

- All sensitive operations verify Firebase Auth custom claims
- Payment webhooks use signature verification
- Firestore security rules enforce authorization
- Rate limiting on public endpoints
