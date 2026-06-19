# Noble Essence E-Commerce Platform

A premium, production-grade e-commerce platform for selling luxury pillow cases. Features a customer storefront and powerful admin dashboard, both built with Next.js 14, TypeScript, Tailwind CSS, and Firebase.

## 🎯 Project Status

**✅ Complete Foundation Built**

- [x] Monorepo structure (Turborepo)
- [x] Customer storefront (Next.js 14)
- [x] Admin dashboard (Next.js 14)
- [x] Cloud Functions backend
- [x] Firestore database schema
- [x] Security rules
- [x] Cart & checkout logic
- [x] Authentication system
- [x] Payment integration setup
- [x] Shipping integration setup
- [x] AI feature placeholders
- [ ] Full Stripe integration
- [ ] Full PayPal integration
- [ ] Shippo/EasyPost integration
- [ ] OpenAI integration
- [ ] Email notifications
- [ ] Advanced analytics

## 🚀 Quick Start

### Installation

```bash
git clone https://github.com/jxtartemis/noble-essence.git
cd noble-essence
npm install
```

### Development

```bash
# Start all apps (storefront, admin, functions)
npm run dev

# Storefront: http://localhost:3000
# Admin: http://localhost:3001
# Functions: http://localhost:5001
```

### Environment Setup

See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed Firebase configuration.

## 📁 Project Structure

```
noble-essence/
├── storefront/          # Customer storefront (Next.js)
├── admin/               # Admin dashboard (Next.js)
├── functions/           # Cloud Functions (TypeScript)
├── FIREBASE_SETUP.md    # Firebase deployment guide
├── DEVELOPMENT.md       # Development reference
└── README.md
```

## ✨ Key Features

### Storefront (Customer-Facing)

✅ **Guest Checkout First**
- Anonymous Firebase auth
- Cart persists across sessions
- No account required
- Email-based order tracking

✅ **Product Browsing**
- Filter by fabric, color, size, price
- Real-time inventory status
- Product detail pages with galleries
- Customer reviews

✅ **Checkout Flow**
- Multi-step form (shipping → payment → confirmation)
- Real-time shipping rate calculation
- Coupon validation
- Stripe + PayPal support
- Order confirmation emails

✅ **AI Features** (Placeholders)
- Shopping assistant chat
- Visual search
- Personalized recommendations
- Size advisor

### Admin Dashboard

✅ **Role-Based Access**
- Superadmin / Admin / Staff roles
- Custom claims validation
- Route-level guards
- Audit logging ready

✅ **Product Management**
- Add/edit/archive pillow cases
- Multi-image uploads
- Variant management
- Bulk operations

✅ **Order Management**
- View all orders
- Update status
- Process refunds
- Generate shipping labels
- Fraud detection

✅ **Analytics**
- Revenue dashboards
- Top products
- Conversion rates
- Traffic analysis
- Cart abandonment

✅ **Promotions**
- Coupon creation
- Usage limits
- Discount types (%, fixed, BOGO)
- Analytics

✅ **Staff Management** (Superadmin)
- Invite team members
- Assign roles
- Permission scopes

## 🔧 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Zustand** - Lightweight state management
- **Firebase SDK** - Authentication & database

### Backend
- **Firebase Firestore** - NoSQL database
- **Firebase Storage** - File uploads
- **Firebase Authentication** - User auth
- **Cloud Functions** - Serverless logic
- **Firebase Hosting** - Deployment

### Integrations
- **Stripe** - Payment processing
- **PayPal** - Alternative payments
- **Shippo/EasyPost** - Shipping rates & labels
- **OpenAI** - AI features

## 📊 Database Schema

**Collections:**
- `products` - Pillow case inventory
- `orders` - Customer orders
- `customers` - User profiles
- `carts` - Guest cart persistence
- `coupons` - Discount codes
- `reviews` - Product reviews
- `admins` - Staff accounts

See `functions/src/types.ts` for complete schema.

## 🔒 Security

**Firestore Rules:**
- Public product reads
- Admin-only product writes
- Customer-only order access
- Custom claims validation

**Storage Rules:**
- Public product image reads
- Admin-only uploads

**Cloud Functions:**
- Stripe webhook signature verification
- Custom claims checking
- Rate limiting

**Payment:**
- PCI DSS compliant (via Stripe)
- Webhook verification
- Secure secret management

## 📚 Documentation

- [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) - Firebase deployment
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Development guide
- [storefront/README.md](./storefront/README.md) - Storefront details
- [admin/README.md](./admin/README.md) - Admin dashboard details
- [functions/README.md](./functions/README.md) - Cloud Functions details

## 🚢 Deployment

### Firebase Setup

```bash
# Configure Firebase
firebase login
firebase init

# Deploy security rules
firebase deploy --only firestore:firestore-prod storage:storage-prod

# Deploy functions
firebase deploy --only functions

# Deploy hosting
firebase deploy --only hosting
```

### Production URLs

- **Storefront:** `nobleessence.com`
- **Admin:** `admin.nobleessence.com`
- **API:** Cloud Functions (auto-deployed)

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests for specific workspace
cd storefront && npm test

# Run E2E tests (coming soon)
npm run test:e2e
```

## 📝 Stripe Test Cards

- **Success:** 4242 4242 4242 4242
- **Decline:** 4000 0000 0000 0002
- **3D Secure:** 4000 0025 0000 3155

## 🤝 Contributing

1. Create feature branch
2. Make changes and test locally
3. Submit pull request
4. Deploy to staging
5. Merge to main

## 📄 License

MIT

## 📞 Support

For issues or questions, please open a GitHub issue.

---

**Built with ❤️ for luxury e-commerce**
