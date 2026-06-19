# Noble Essence

A full-stack, production-grade e-commerce platform selling luxury pillow cases. Premium storefront and powerful admin dashboard, both built with React/Next.js 14, TypeScript, Tailwind CSS, and Firebase.

## 📁 Project Structure

```
noble-essence/
├── storefront/          # Customer-facing storefront (nobleessence.com)
├── admin/               # Admin dashboard (admin.nobleessence.com)
├── functions/           # Firebase Cloud Functions (backend logic)
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Firebase CLI
- Stripe and PayPal accounts
- Shippo or EasyPost account for shipping

### Installation

```bash
# Install dependencies for all workspaces
npm install

# Start development servers (runs all apps in parallel)
npm run dev
```

### Development Servers
- **Storefront:** http://localhost:3000
- **Admin Dashboard:** http://localhost:3001

## 🏗️ Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Zustand** (state management)

### Backend
- **Firebase**
  - Firestore (database)
  - Firebase Authentication
  - Firebase Storage (product images)
  - Cloud Functions (server-side logic)
  - Firebase Hosting (deployment)

### Integrations
- **Stripe** + **PayPal** (payments)
- **Shippo/EasyPost** (shipping)
- **OpenAI/Claude** (AI features via Cloud Functions)

## 📦 Key Features

### Storefront (Customer-Facing)
- ✅ Guest checkout (cart persists via anonymous auth)
- ✅ Product browsing with filtering and sorting
- ✅ Real-time shipping rate calculation
- ✅ Stripe + PayPal payment integration
- ✅ Order tracking (no login required)
- ✅ Optional account creation post-checkout
- ✅ AI shopping assistant & visual search
- ✅ Personalized recommendations

### Admin Dashboard (Staff + Superadmin)
- ✅ Product management (CRUD, bulk actions)
- ✅ Order management & fulfillment
- ✅ Coupon & promotion engine
- ✅ Inventory tracking with alerts
- ✅ Revenue analytics & business intelligence
- ✅ Role-based access control (superadmin/admin/staff)
- ✅ AI-assisted copywriting & demand forecasting
- ✅ Fraud detection

## 🔒 Security

- Firestore security rules enforced at collection level
- Admin routes require custom claims validation (client + server)
- Guest carts encrypted and scoped to anonymous UID
- Payment webhooks verified server-side only
- Rate limiting on sensitive endpoints

## 📚 Documentation

See individual `README.md` files in each workspace:
- [`storefront/README.md`](./storefront/README.md)
- [`admin/README.md`](./admin/README.md)
- [`functions/README.md`](./functions/README.md)

## 🚢 Deployment

Both apps deploy to Firebase Hosting as separate sites:
- `nobleessence.com` → Storefront
- `admin.nobleessence.com` → Admin Dashboard

See deployment guides in each workspace README.

## 📧 Environment Setup

Create `.env.local` files in each workspace. Example structure:

**Storefront & Admin:**
```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=...
NEXT_PUBLIC_PAYPAL_CLIENT_ID=...
```

**Functions:**
```
STRIPE_SECRET_KEY=...
PAYPAL_SECRET=...
OPENAI_API_KEY=...
SHIPPO_API_KEY=...
```

## 📄 License

MIT
