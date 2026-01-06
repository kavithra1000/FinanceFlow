// app/api/lemonsqueezy/route.ts
import crypto from "node:crypto"
import { NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()
    const signature = req.headers.get("x-signature") || ""
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || ""

    // 1️⃣ Validate the signature
    const hmac = crypto.createHmac("sha256", secret)
    const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8")
    const signatureBuffer = Buffer.from(signature, "utf8")

    if (!crypto.timingSafeEqual(digest, signatureBuffer)) {
      return new Response("Invalid signature", { status: 401 })
    }

    // 2️⃣ Parse payload
    const payload = JSON.parse(rawBody)
    const eventName = payload.meta.event_name
    const customData = payload.meta.custom_data

    if (
      eventName === "subscription_created" ||
      eventName === "subscription_updated"
    ) {
      const attributes = payload.data.attributes
      const userId = customData.user_id
      const email = customData.email
      const plan = attributes.variant_name
      const status = attributes.status
      const lemon_subscription_id = attributes.id
      const lemon_customer_id = attributes.customer_id
      const current_period_end = attributes.current_period_ends_at

      // 3️⃣ Save or update in Neon DB
      await sql`
        INSERT INTO subscriptions (
          user_id, email, plan, status, lemon_subscription_id, lemon_customer_id, current_period_end
        ) VALUES (
          ${userId}, ${email}, ${plan}, ${status}, ${lemon_subscription_id}, ${lemon_customer_id}, ${current_period_end}
        )
        ON CONFLICT (user_id)
        DO UPDATE SET
          plan = EXCLUDED.plan,
          status = EXCLUDED.status,
          lemon_subscription_id = EXCLUDED.lemon_subscription_id,
          lemon_customer_id = EXCLUDED.lemon_customer_id,
          current_period_end = EXCLUDED.current_period_end,
          updated_at = now()
      `
      console.log(`✅ Subscription saved for user ${userId} with status ${status}`)
    }

    return NextResponse.json({ message: "Webhook received" }, { status: 200 })
  } catch (err) {
    console.error("❌ Webhook error:", err)
    return NextResponse.json({ error: "Webhook error" }, { status: 500 })
  }
}
