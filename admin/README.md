# Noble Essence Admin Dashboard

Admin dashboard for managing products, orders, customers, and analytics.

## Features

- ✅ Product management (CRUD, bulk actions, inventory tracking)
- ✅ Order management & fulfillment
- ✅ Coupon & promotion engine
- ✅ Revenue & business analytics
- ✅ Role-based access control (superadmin/admin/staff)
- ✅ Staff & team management
- ✅ Real-time order status updates
- ✅ AI-powered features (demand forecasting, pricing suggestions, fraud detection)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001)

## Authentication

Admin dashboard requires Firebase Auth with custom claims validation:

```json
{
  "role": "superadmin" | "admin" | "staff"
}
```

Route guards enforce role-based access both client-side and server-side.

## Architecture

- **Pages**: `/app/dashboard` with role-based route protection
- **Components**: Reusable dashboard components
- **Styling**: Tailwind CSS matching storefront branding
- **State**: Zustand for admin session and filters
- **Firebase**: Admin SDK integration for backend operations

## Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
```

## Build

```bash
npm run build
npm start
```
