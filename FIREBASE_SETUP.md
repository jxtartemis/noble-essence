# Firebase Setup Guide

## Prerequisites

1. Firebase project created at [console.firebase.google.com](https://console.firebase.google.com)
2. Firebase CLI installed: `npm install -g firebase-tools`
3. Logged in to Firebase: `firebase login`

## Project Initialization

```bash
# Initialize Firebase in the project root
firebase init

# Select these features:
# - Firestore Database
# - Firebase Storage
# - Cloud Functions
# - Firebase Hosting (2 sites: storefront & admin)
```

## Environment Setup

### 1. Firestore Database

```bash
# Create Firestore database in your Firebase Console
# Select "Production mode" for security
# Choose your region (us-central1 recommended)
```

### 2. Firebase Authentication

```bash
# Enable in Firebase Console:
# - Email/Password
# - Anonymous Authentication (for guest checkout)
```

### 3. Storage

```bash
# Create Cloud Storage bucket in your Firebase Console
# Set default region to match Firestore
```

### 4. Cloud Functions

```bash
# Set environment variables in functions/.env
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
PAYPAL_SECRET=...
OPENAI_API_KEY=sk-...
SHIPPO_API_KEY=...
FUNCTIONS_URL=https://us-central1-your-project.cloudfunctions.net
```

## Deployment

### Deploy Security Rules

```bash
# Deploy Firestore rules
firebase deploy --only firestore:firestore-prod

# Deploy Storage rules
firebase deploy --only storage:storage-prod
```

### Deploy Cloud Functions

```bash
cd functions
npm install
npm run build
cd ..
firebase deploy --only functions
```

### Deploy Hosting

```bash
# Build apps
cd storefront && npm run build && cd ..
cd admin && npm run build && cd ..

# Deploy both sites
firebase deploy --only hosting
```

## Environment Variables

### Storefront (.env.local)

```
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxx
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_...
NEXT_PUBLIC_PAYPAL_CLIENT_ID=...
```

### Admin (.env.local)

```
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxx
```

## Custom Claims Setup (Admin Roles)

Use Firebase Admin SDK to set custom claims:

```typescript
import * as admin from 'firebase-admin';

await admin.auth().setCustomUserClaims(uid, {
  role: 'admin', // or 'superadmin' or 'staff'
});
```

Or use this Cloud Function to invite admin staff:

```typescript
export const inviteAdminStaff = functions.https.onRequest((req, res) => {
  const { email, role, invitedByUid } = req.body;
  // Verify invitedByUid is superadmin
  // Create user and set custom claims
});
```

## Testing

### Local Emulators

```bash
# Start emulators
firebase emulators:start

# In another terminal, run tests
npm test
```

### Running Apps Locally

```bash
# Terminal 1: Storefront
cd storefront && npm run dev

# Terminal 2: Admin Dashboard
cd admin && npm run dev

# Terminal 3: Cloud Functions
cd functions && npm run serve
```

## Monitoring

- **Firestore**: [console.firebase.google.com/firestore](https://console.firebase.google.com/firestore)
- **Cloud Functions Logs**: `firebase functions:log`
- **Authentication**: [console.firebase.google.com/authentication](https://console.firebase.google.com/authentication)
- **Storage**: [console.firebase.google.com/storage](https://console.firebase.google.com/storage)

## Next Steps

1. Create initial Firebase admin user with superadmin role
2. Test guest checkout flow with Stripe test keys
3. Configure Shippo/EasyPost for shipping integrations
4. Set up payment webhooks in Stripe dashboard
5. Configure email notifications (Firebase Extensions or Cloud Function)
6. Deploy to staging environment first
