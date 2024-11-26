import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { getErrorMessage } from '~/utils/getErrorMessage';

export const runtime = 'edge';

const coupon = '';
const count = 3;

// Mass generate promo codes for a given coupon.
export async function POST() {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2023-10-16',
    });

    const today = new Date();
    const nextWeek = new Date(today.setDate(today.getDate() + 7));
    const nextWeekUnix = Math.round(nextWeek.getTime() / 1000);

    const codes = [];

    for (let i = 0; i < count; i++) {
      const promotionCode = await stripe.promotionCodes.create({
        coupon,
        expires_at: nextWeekUnix,
        max_redemptions: 2,
      });

      codes.push(promotionCode.code);
    }

    return new Response(codes.join('\n'), {
      headers: {
        'Content-Type': 'text/plain',
      },
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ err: getErrorMessage(error) }, { status: 500 });
  }
}
