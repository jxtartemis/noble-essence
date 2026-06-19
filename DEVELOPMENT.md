# Noble Essence - Development Guide

## Project Overview

Noble Essence is a premium, full-stack e-commerce platform selling luxury pillow cases. It consists of:

- **Customer Storefront** (Next.js) - Guest-first shopping experience
- **Admin Dashboard** (Next.js) - Role-based management interface
- **Cloud Functions** - Serverless backend for payments, shipping, AI
- **Firebase** - Database, auth, storage, hosting

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase CLI
- Stripe and PayPal accounts
- OpenAI API key

### Installation

```bash
# Clone the repository
git clone https://github.com/jxtartemis/noble-essence.git
cd noble-essence

# Install root dependencies
npm install

# Install workspace dependencies
npm install --workspaces

# Set up environment files
cp storefront/.env.local.example storefront/.env.local
cp admin/.env.local.example admin/.env.local
cp functions/.env.example functions/.env
```

### Development

```bash
# Start all apps in parallel
npm run dev

# Or run individually
cd storefront && npm run dev      # Port 3000
cd admin && npm run dev           # Port 3001
cd functions && npm run serve     # Port 5001
```

## Project Structure

```
noble-essence/
├── storefront/                    # Customer storefront app
│   ├── src/
│   │   ├── app/                   # Next.js App Router pages
│   │   ├── components/            # React components
│   │   ├── lib/                   # Utilities (cart, session, Firebase)
│   │   ├── types/                 # TypeScript definitions
│   │   └── app/globals.css        # Tailwind + custom styles
│   ├── public/                    # Static assets
│   ├── package.json
│   └── README.md
│
├── admin/                         # Admin dashboard app
│   ├── src/
│   │   ├── app/                   # Next.js App Router pages
│   │   ├── components/            # React components
│   │   ├── lib/                   # Utilities (auth, Firebase)
│   │   ├── types/                 # TypeScript definitions
│   │   └── app/globals.css        # Tailwind + custom styles
│   ├── public/                    # Static assets
│   ├── package.json
│   └── README.md
│
├── functions/                     # Firebase Cloud Functions
│   ├── src/
│   │   ├── index.ts               # Main functions
│   │   ├── types.ts               # Firestore models
│   │   └── seed.ts                # Sample data
│   ├── firestore.rules            # Firestore security rules
│   ├── storage.rules              # Storage security rules
│   ├── package.json
│   └── README.md
│
├── .firebaserc                    # Firebase project config
├── firebase.json                  # Firebase hosting/functions config
├── package.json                   # Root workspace config
├── FIREBASE_SETUP.md              # Firebase deployment guide
└── README.md
```

## Architecture

### Data Flow

```
Storefront (Guest)
  ├─ Browse Products (Firestore read)
  ├─ Add to Cart (Zustand + localStorage)
  ├─ Checkout
  │  ├─ createOrder Cloud Function
  │  ├─ createPaymentIntent Cloud Function
  │  └─ Stripe Payment
  └─ Order Confirmation (Firestore read)

Admin Dashboard
  ├─ Authenticate (Firebase Auth + custom claims)
  ├─ Product Management (Firestore CRUD)
  ├─ Order Management (Firestore read/update)
  ├─ Analytics (Firestore aggregation)
  └─ Staff Management (superadmin only)
```

### Security Model

**Firestore Security Rules** enforce:
- Public product reads (anyone)
- Admin-only product writes
- Superadmin-only staff management
- Customer can only access their own orders
- Custom claims checked server-side in Cloud Functions

**Storage Security Rules** enforce:
- Public product image reads
- Admin-only uploads
- Per-user avatar management

**Cloud Functions** verify:
- Firebase Auth custom claims for admin operations
- Stripe webhook signatures
- Request rate limits

## Key Features

### Storefront

#### Guest Checkout
- Anonymous Firebase auth (no login required)
- Cart persists across sessions
- Email-based order tracking

#### Product Browsing
- Real-time product filtering (fabric, color, size, price)
- Product detail pages with image galleries
- Customer reviews and ratings

#### Checkout
- Multi-step form (shipping → payment → confirmation)
- Real-time shipping rate calculation (Shippo/EasyPost)
- Coupon validation and application
- Stripe + PayPal payment options

#### AI Features
- Shopping assistant chat widget
- Visual search (upload room photos)
- Personalized recommendations
- Size/fit advisor

### Admin Dashboard

#### Authentication
- Email/password login
- Custom claims validation (role: superadmin/admin/staff)
- Role-based route guards

#### Product Management
- Add/edit/archive pillow cases
- Multi-image uploads to Firebase Storage
- Variant management (fabric, color, size)
- Stock tracking with low-stock alerts
- Bulk actions

#### Order Management
- View all orders (guest + registered)
- Update order status
- Process refunds
- Generate and print shipping labels
- AI fraud detection

#### Analytics
- Revenue dashboards
- Top products by sales
- Conversion rates
- Traffic sources
- Cart abandonment

#### Promotions
- Create discount coupons
- Set usage limits (global + per-customer)
- Define coupon types (percentage, fixed, BOGO)
- Track usage analytics

## API Reference

### Cloud Functions

All functions expect CORS-enabled requests from storefront/admin.

#### `POST /createPaymentIntent`
Create Stripe payment intent for checkout.

**Request:**
```json
{
  "amount": 99.99,
  "currency": "usd",
  "orderId": "order_123"
}
```

**Response:**
```json
{
  "clientSecret": "pi_..._secret_...",
  "paymentIntentId": "pi_..."
}
```

#### `POST /validateCoupon`
Validate coupon code and calculate discount.

**Request:**
```json
{
  "code": "SUMMER20",
  "cartTotal": 250.00,
  "customerId": "uid_or_email"
}
```

**Response:**
```json
{
  "valid": true,
  "discount": 50.00,
  "couponCode": "SUMMER20"
}
```

#### `POST /getShippingRates`
Calculate real-time shipping rates.

**Request:**
```json
{
  "toAddress": {
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "US"
  },
  "weight": 1.5,
  "value": 250.00
}
```

**Response:**
```json
{
  "rates": [
    {
      "id": "usps_priority",
      "name": "USPS Priority Mail",
      "price": 12.99,
      "days": "1-3"
    }
  ]
}
```

#### `POST /createOrder`
Create order from cart (called before payment).

**Request:**
```json
{
  "uid": "uid_or_null",
  "items": [
    {
      "productId": "prod_1",
      "quantity": 2,
      "selectedFabric": "Silk",
      "selectedColor": "Ivory",
      "selectedSize": "Queen (20x30)"
    }
  ],
  "shippingAddress": { /* ... */ },
  "shippingMethod": { /* ... */ },
  "couponCode": "SUMMER20",
  "guestEmail": "customer@email.com"
}
```

**Response:**
```json
{
  "orderId": "order_123",
  "total": 189.99,
  "clientSecret": null
}
```

## State Management

### Storefront

**Cart State (Zustand + localStorage):**
```typescript
const { items, addItem, removeItem, updateQuantity } = useCart();
```

**Session State (Zustand):**
```typescript
const { uid, email, isGuest, customer } = useSession();
```

### Admin

**Auth State (Zustand):**
```typescript
const { uid, email, role, isAuthenticated } = useAdminAuth();
```

## Testing

### Unit Tests

```bash
# Storefront
cd storefront && npm test

# Admin
cd admin && npm test

# Functions
cd functions && npm test
```

### E2E Tests

```bash
# Using Playwright/Cypress (coming soon)
npm run test:e2e
```

### Stripe Test Mode

Use these test card numbers:
- **Success:** 4242 4242 4242 4242
- **Decline:** 4000 0000 0000 0002
- **3D Secure:** 4000 0025 0000 3155

## Deployment

### Staging

```bash
# Deploy to staging Firebase project
firebase deploy --project noble-essence-staging
```

### Production

```bash
# Deploy to production
firebase deploy --project noble-essence-prod

# Or deploy specific targets
firebase deploy --only hosting:storefront
firebase deploy --only hosting:admin
firebase deploy --only functions
```

## Troubleshooting

### Firebase Auth Issues

**Problem:** Anonymous auth fails
**Solution:** Enable Anonymous Authentication in Firebase Console

**Problem:** Custom claims not recognized
**Solution:** Force refresh ID token: `await user.getIdTokenResult(true)`

### Deployment Issues

**Problem:** Function deployment fails
**Solution:** Check `functions/.env` and ensure all required secrets are set

**Problem:** Hosting deploy fails
**Solution:** Verify `.next` build artifacts exist: `npm run build`

## Performance Optimization

### Image Optimization
- Use Firebase Storage with CDN
- Enable Next.js Image component
- Set appropriate image dimensions

### Firestore Queries
- Add composite indexes for complex queries
- Use pagination for large result sets
- Cache frequently accessed data client-side

### Cloud Functions
- Set appropriate memory allocation
- Use connection pooling for external APIs
- Cache API responses where possible

## Security Best Practices

1. **Secrets Management**
   - Never commit `.env` files
   - Use Firebase secrets for Cloud Functions
   - Rotate API keys regularly

2. **Payment Security**
   - Always verify webhooks server-side
   - Never expose Stripe secret keys
   - Use test mode for development

3. **Data Privacy**
   - GDPR-compliant data deletion
   - Encrypt sensitive customer data
   - Implement proper access controls

## Contributing

1. Create feature branch: `git checkout -b feature/description`
2. Make changes and test locally
3. Submit pull request with description
4. Deploy to staging for review
5. Merge and deploy to production

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

## Support

For issues or questions:
1. Check existing GitHub issues
2. Review troubleshooting section above
3. Contact development team

## License

MIT
