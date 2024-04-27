import { NextResponse } from 'next/server';

import order from '../__data/order.json' assert { type: 'json' };

export async function GET() {
  return NextResponse.json(order);
}
