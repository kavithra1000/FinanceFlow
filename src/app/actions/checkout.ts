// app/actions/checkout.ts
'use server'

import { redirect } from "next/navigation"

export async function createCheckout(variantId: string, userId: string, email: string) {
  const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
    method: "POST",
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
    },
    body: JSON.stringify({
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: {
            custom: {
              user_id: userId,
              email: email,
            },
          },
        },
        relationships: {
          store: {
            data: { type: "stores", id: process.env.LEMON_SQUEEZY_STORE_ID },
          },
          variant: {
            data: { type: "variants", id: variantId },
          },
        },
      },
    }),
  })

  const checkout = await response.json()
  const checkoutUrl = checkout.data.attributes.url

  redirect(checkoutUrl) // sends the user to Lemon Squeezy checkout page
}
