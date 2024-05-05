import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import coupons from '../../__data/coupons.json' assert { type: 'json' };

type FormBody = Readonly<{
  coupon_code?: string;
}>;

export async function OPTIONS() {
  return NextResponse.json({});
}

export async function PUT(request: NextRequest) {
  const { coupon_code: couponCode }: FormBody = await request.json();

  if (!couponCode) {
    return NextResponse.json(
      { error: 'Please provide a coupon code to validate' },
      { status: 400 },
    );
  }

  const matchingCoupon = coupons.find(
    ({ coupon_code }) => coupon_code === couponCode,
  );

  if (matchingCoupon == null) {
    return NextResponse.json(
      {
        error: 'Invalid coupon',
      },
      { status: 422 },
    );
  }

  return NextResponse.json(matchingCoupon);
}
