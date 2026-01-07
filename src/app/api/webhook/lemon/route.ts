// app/api/lemonsqueezy/route.ts
import crypto from "crypto"
import { NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()
    const signature = req.headers.get("x-signature") ?? ""
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET!

    // ✅ Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex")

    if (expectedSignature !== signature) {
      return new Response("Invalid signature", { status: 401 })
    }

    const payload = JSON.parse(rawBody)
    const eventName = payload.meta.event_name
    const customData = payload.meta.custom_data

    if (
      eventName === "subscription_created" ||
      eventName === "subscription_updated" ||
      eventName === "subscription_cancelled"
    ) {
      const attributes = payload.data.attributes

      await sql`
        INSERT INTO subscriptions (
          user_id,
          email,
          plan,
          status,
          lemon_subscription_id,
          lemon_customer_id,
          current_period_end
        ) VALUES (
          ${customData.user_id},
          ${customData.email},
          ${attributes.variant_name},
          ${attributes.status},
          ${payload.data.id},
          ${attributes.customer_id},
          ${attributes.current_period_ends_at}
        )
        ON CONFLICT (user_id)
        DO UPDATE SET
          plan = EXCLUDED.plan,
          status = EXCLUDED.status,
          current_period_end = EXCLUDED.current_period_end,
          updated_at = now()
      `
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error("Webhook error:", err)
    return NextResponse.json({ error: "Webhook error" }, { status: 500 })
  }
}
