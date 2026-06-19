import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Stripe from 'stripe';
import * as cors from 'cors';

admin.initializeApp();
const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

const corsHandler = cors({ origin: true });

/**
 * Create Stripe Payment Intent for checkout
 */
export const createPaymentIntent = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    try {
      const { amount, currency = 'usd', orderId } = req.body;

      if (!amount || !orderId) {
        res.status(400).json({ error: 'Missing amount or orderId' });
        return;
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency,
        metadata: { orderId },
      });

      res.json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      });
    } catch (error: any) {
      console.error('Payment Intent Error:', error);
      res.status(500).json({ error: error.message });
    }
  });
});

/**
 * Stripe Webhook Handler for payment confirmations
 */
export const stripeWebhook = functions.https.onRequest((req, res) => {
  const sig = req.headers['stripe-signature'] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

  try {
    const event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);

    switch (event.type) {
      case 'payment_intent.succeeded':
        handlePaymentSuccess(event.data.object);
        break;
      case 'payment_intent.payment_failed':
        handlePaymentFailed(event.data.object);
        break;
    }

    res.json({ received: true });
  } catch (error: any) {
    console.error('Webhook Error:', error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

async function handlePaymentSuccess(paymentIntent: any) {
  const { metadata } = paymentIntent;
  const { orderId } = metadata;

  try {
    await db.collection('orders').doc(orderId).update({
      paymentStatus: 'paid',
      stripePaymentIntentId: paymentIntent.id,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // TODO: Trigger order confirmation email
    console.log(`Order ${orderId} payment confirmed`);
  } catch (error) {
    console.error('Error updating order:', error);
  }
}

async function handlePaymentFailed(paymentIntent: any) {
  const { metadata } = paymentIntent;
  const { orderId } = metadata;

  try {
    await db.collection('orders').doc(orderId).update({
      paymentStatus: 'failed',
      stripePaymentIntentId: paymentIntent.id,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log(`Order ${orderId} payment failed`);
  } catch (error) {
    console.error('Error updating order:', error);
  }
}

/**
 * Process Refund
 */
export const processRefund = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    try {
      const { orderId, amount, reason } = req.body;
      const uid = req.headers['x-user-id'] as string;

      // Verify user is admin
      const adminUser = await auth.getUser(uid);
      const customClaims = adminUser.customClaims as any;

      if (!customClaims?.role || !['admin', 'superadmin'].includes(customClaims.role)) {
        res.status(403).json({ error: 'Unauthorized' });
        return;
      }

      // Get order from Firestore
      const orderDoc = await db.collection('orders').doc(orderId).get();
      if (!orderDoc.exists) {
        res.status(404).json({ error: 'Order not found' });
        return;
      }

      const order = orderDoc.data() as any;
      const refund = await stripe.refunds.create({
        payment_intent: order.stripePaymentIntentId,
        amount: Math.round(amount * 100),
        reason: reason || 'requested_by_customer',
      });

      await db.collection('orders').doc(orderId).update({
        refundStatus: 'processed',
        refundAmount: amount,
        refundReason: reason,
        stripeRefundId: refund.id,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      res.json({ success: true, refundId: refund.id });
    } catch (error: any) {
      console.error('Refund Error:', error);
      res.status(500).json({ error: error.message });
    }
  });
});

/**
 * Calculate Shipping Rates (Shippo/EasyPost integration)
 */
export const getShippingRates = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    try {
      const { toAddress, weight, value } = req.body;

      // TODO: Integrate with Shippo or EasyPost API
      // For now, return mock rates
      const rates = [
        { id: 'usps_priority', name: 'USPS Priority Mail', price: 12.99, days: '1-3' },
        { id: 'usps_express', name: 'USPS Express Mail', price: 28.99, days: 'Next Day' },
        { id: 'fedex_ground', name: 'FedEx Ground', price: 18.99, days: '3-5' },
      ];

      res.json({ rates });
    } catch (error: any) {
      console.error('Shipping Rates Error:', error);
      res.status(500).json({ error: error.message });
    }
  });
});

/**
 * Generate Shipping Label
 */
export const generateShippingLabel = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    try {
      const { orderId, rateId } = req.body;

      // TODO: Call Shippo/EasyPost API to generate label
      // For now, return mock label URL
      const labelUrl = 'https://example.com/label.pdf';
      const trackingNumber = 'PKG123456789';

      await db.collection('orders').doc(orderId).update({
        trackingNumber,
        labelUrl,
        orderStatus: 'shipped',
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      res.json({ labelUrl, trackingNumber });
    } catch (error: any) {
      console.error('Label Generation Error:', error);
      res.status(500).json({ error: error.message });
    }
  });
});

/**
 * AI Product Copywriting (Admin)
 */
export const generateProductCopy = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    try {
      const { productName, keywords, uid } = req.body;

      // Verify user is admin
      const adminUser = await auth.getUser(uid);
      const customClaims = adminUser.customClaims as any;

      if (!customClaims?.role || !['admin', 'superadmin'].includes(customClaims.role)) {
        res.status(403).json({ error: 'Unauthorized' });
        return;
      }

      // TODO: Call OpenAI API
      const copy = {
        title: `${productName} - Premium Quality`,
        description: `Luxurious pillow case made from the finest materials. Perfect for a restful night's sleep.`,
        seoMeta: `High-quality ${productName} for home comfort`,
      };

      res.json(copy);
    } catch (error: any) {
      console.error('AI Copywriting Error:', error);
      res.status(500).json({ error: error.message });
    }
  });
});

/**
 * AI Shopping Assistant (Customer)
 */
export const aiShoppingAssistant = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    try {
      const { question } = req.body;

      // TODO: Call OpenAI API with Firestore products context
      const response = {
        answer: 'Based on our collection, I recommend checking out our silk pillowcases for ultimate luxury.',
        recommendations: [
          { productId: 'prod_1', name: 'Silk Pillowcase - Ivory', price: 129.99 },
          { productId: 'prod_2', name: 'Silk Pillowcase - Blush', price: 129.99 },
        ],
      };

      res.json(response);
    } catch (error: any) {
      console.error('Shopping Assistant Error:', error);
      res.status(500).json({ error: error.message });
    }
  });
});

/**
 * Validate Coupon
 */
export const validateCoupon = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    try {
      const { code, cartTotal, customerId } = req.body;

      const couponDoc = await db.collection('coupons').where('code', '==', code).limit(1).get();

      if (couponDoc.empty) {
        res.status(404).json({ error: 'Coupon not found' });
        return;
      }

      const coupon = couponDoc.docs[0].data() as any;

      // Validate coupon
      if (!coupon.active) {
        res.status(400).json({ error: 'Coupon is not active' });
        return;
      }

      if (new Date(coupon.expiry) < new Date()) {
        res.status(400).json({ error: 'Coupon has expired' });
        return;
      }

      if (coupon.minSpend && cartTotal < coupon.minSpend) {
        res.status(400).json({
          error: `Minimum spend of $${coupon.minSpend} required`,
        });
        return;
      }

      if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
        res.status(400).json({ error: 'Coupon usage limit exceeded' });
        return;
      }

      // Check per-customer usage limit
      if (coupon.perCustomerLimit) {
        const customerUsage = await db
          .collection('coupon_usage')
          .where('couponCode', '==', code)
          .where('customerId', '==', customerId)
          .get();

        if (customerUsage.size >= coupon.perCustomerLimit) {
          res.status(400).json({ error: 'You have reached the usage limit for this coupon' });
          return;
        }
      }

      // Calculate discount
      let discount = 0;
      if (coupon.type === 'percentage') {
        discount = cartTotal * (coupon.value / 100);
      } else if (coupon.type === 'fixed') {
        discount = coupon.value;
      }

      res.json({
        valid: true,
        discount,
        couponCode: code,
      });
    } catch (error: any) {
      console.error('Coupon Validation Error:', error);
      res.status(500).json({ error: error.message });
    }
  });
});

/**
 * Create Order (Combined checkout handler)
 */
export const createOrder = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    try {
      const { uid, items, shippingAddress, shippingMethod, couponCode, guestEmail } = req.body;

      // Calculate totals
      let subtotal = 0;
      const orderItems = [];

      for (const item of items) {
        const productDoc = await db.collection('products').doc(item.productId).get();
        const product = productDoc.data() as any;

        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;

        orderItems.push({
          productId: item.productId,
          productName: product.name,
          price: product.price,
          quantity: item.quantity,
          total: itemTotal,
        });
      }

      let discount = 0;
      if (couponCode) {
        const couponRes = await fetch(`${process.env.FUNCTIONS_URL}/validateCoupon`, {
          method: 'POST',
          body: JSON.stringify({
            code: couponCode,
            cartTotal: subtotal,
            customerId: uid,
          }),
        });
        const couponData = await couponRes.json();
        if (couponData.valid) {
          discount = couponData.discount;
        }
      }

      const shippingCost = shippingMethod.price || 0;
      const tax = (subtotal - discount + shippingCost) * 0.08; // 8% tax
      const total = subtotal - discount + shippingCost + tax;

      const orderId = db.collection('orders').doc().id;
      await db.collection('orders').doc(orderId).set({
        id: orderId,
        uid: uid || null,
        guestEmail: guestEmail || null,
        items: orderItems,
        shippingAddress,
        shippingMethod,
        couponCode: couponCode || null,
        totals: {
          subtotal,
          discount,
          shipping: shippingCost,
          tax,
          total,
        },
        paymentStatus: 'pending',
        orderStatus: 'pending',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      res.json({
        orderId,
        total,
        clientSecret: null, // Will be set after payment intent
      });
    } catch (error: any) {
      console.error('Order Creation Error:', error);
      res.status(500).json({ error: error.message });
    }
  });
});

/**
 * Fraud Detection (Admin)
 */
export const detectFraud = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    try {
      const { orderId } = req.body;

      const orderDoc = await db.collection('orders').doc(orderId).get();
      const order = orderDoc.data() as any;

      const flags = [];

      // Check for billing/shipping mismatch
      if (order.shippingAddress.country !== order.billingAddress?.country) {
        flags.push('Cross-border transaction');
      }

      // Check for unusually large orders
      if (order.totals.total > 5000) {
        flags.push('High-value order');
      }

      // Check for suspicious patterns (multiple orders from same email in short time)
      const recentOrders = await db
        .collection('orders')
        .where('guestEmail', '==', order.guestEmail)
        .where('createdAt', '>', new Date(Date.now() - 24 * 60 * 60 * 1000))
        .get();

      if (recentOrders.size > 5) {
        flags.push('Multiple orders from same email in 24h');
      }

      const riskLevel = flags.length > 0 ? 'high' : 'low';

      res.json({
        orderId,
        riskLevel,
        flags,
      });
    } catch (error: any) {
      console.error('Fraud Detection Error:', error);
      res.status(500).json({ error: error.message });
    }
  });
});
