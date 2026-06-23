// src/app/api/webhook/lemonsqueezy/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { clerkClient } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
  try {
    // 1. Get raw request body as text for signature verification
    const rawBody = await req.text();
    const signature = req.headers.get('x-signature') || '';
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || '';

    if (!secret) {
      console.error('LEMONSQUEEZY_WEBHOOK_SECRET is not set');
      return NextResponse.json({ error: 'Webhook configuration error' }, { status: 500 });
    }

    // 2. Validate HMAC SHA256 signature
    const hmac = crypto.createHmac('sha256', secret);
    const digest = hmac.update(rawBody).digest('hex');

    // Use timingSafeEqual to prevent timing attacks
    const isSignatureValid = crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(digest, 'hex')
    );

    if (!isSignatureValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // 3. Parse payload
    const payload = JSON.parse(rawBody);
    const eventName = payload?.meta?.event_name;
    const userId = payload?.meta?.custom_data?.userId;

    if (!userId) {
      console.warn('Webhook received but no Clerk userId found in custom_data');
      return NextResponse.json({ message: 'No userId associated' }, { status: 200 });
    }

    const subscriptionId = payload?.data?.id;
    const status = payload?.data?.attributes?.status;
    const customerPortalUrl = payload?.data?.attributes?.urls?.customer_portal;

    console.log(`Processing Lemon Squeezy event: ${eventName} for user ${userId}`);

    // 4. Update Clerk user metadata
    const client = await clerkClient();

    if (eventName === 'subscription_created' || eventName === 'subscription_updated') {
      const isPro = status === 'active' || status === 'on_trial';
      await client.users.updateUserMetadata(userId, {
        publicMetadata: {
          isPro,
          subscriptionId,
          customerPortalUrl: customerPortalUrl || null,
        },
      });
      console.log(`Updated user ${userId} subscription status to isPro: ${isPro}`);
    } else if (eventName === 'subscription_expired' || eventName === 'subscription_cancelled') {
      // Check status directly. cancelled event occurs when cancellation is scheduled (billing cycle end)
      // but subscription remains active until cycle end.
      // If it actually expires or has inactive status, set isPro to false.
      if (status !== 'active' && status !== 'on_trial') {
        await client.users.updateUserMetadata(userId, {
          publicMetadata: {
            isPro: false,
            subscriptionId: null,
            customerPortalUrl: null,
          },
        });
        console.log(`Revoked Pro status for user ${userId} (status: ${status})`);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Webhook error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown webhook error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
