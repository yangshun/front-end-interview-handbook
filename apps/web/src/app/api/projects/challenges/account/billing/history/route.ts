import { NextResponse } from 'next/server';

import billingHistory from '../../__data/billing-history.json' assert { type: 'json' };

export async function OPTIONS() {
  return NextResponse.json({});
}

export async function GET() {
  return NextResponse.json({
    data: billingHistory,
  });
}
