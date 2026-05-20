import { NextRequest, NextResponse } from 'next/server'

const LEMONSQUEEZY_API_URL = 'https://api.lemonsqueezy.com/v1/checkout_sessions'

export async function POST(req: NextRequest) {
  try {
    const { billing, customerEmail } = (await req.json()) as {
      billing: 'monthly' | 'yearly'
      customerEmail?: string
    }

    if (!billing || !['monthly', 'yearly'].includes(billing)) {
      return NextResponse.json({ error: 'Invalid billing interval' }, { status: 400 })
    }

    const apiKey = process.env.LEMON_SQUEEZY_API_KEY
    const monthlyVariantId = process.env.LEMON_SQUEEZY_MONTHLY_VARIANT_ID
    const yearlyVariantId = process.env.LEMON_SQUEEZY_YEARLY_VARIANT_ID
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    if (!apiKey) {
      throw new Error('Missing LEMON_SQUEEZY_API_KEY environment variable')
    }
    if (!monthlyVariantId || !yearlyVariantId) {
      throw new Error('Missing Lemon Squeezy variant ID environment variables')
    }

    const variantId = billing === 'monthly' ? monthlyVariantId : yearlyVariantId
    const response = await fetch(LEMONSQUEEZY_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/vnd.api+json',
      },
      body: JSON.stringify({
        data: {
          type: 'checkout_session',
          attributes: {
            variant_id: variantId,
            customer_email: customerEmail,
            return_url: `${appUrl}/price?checkout=success`,
            cancel_url: `${appUrl}/price?checkout=cancel`,
          },
        },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Lemon Squeezy API error:', errorText)
      return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 502 })
    }

    const json = await response.json()
    const checkoutUrl = json?.data?.attributes?.checkout_url

    if (!checkoutUrl) {
      console.error('Missing checkout URL in Lemon Squeezy response:', json)
      return NextResponse.json({ error: 'Checkout URL not available' }, { status: 502 })
    }

    return NextResponse.json({ checkoutUrl })
  } catch (error: unknown) {
    console.error('Checkout route error:', error)
    return NextResponse.json({ message: 'Unable to start checkout' }, { status: 500 })
  }
}
