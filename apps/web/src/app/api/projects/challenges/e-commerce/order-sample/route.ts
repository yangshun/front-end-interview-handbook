import { NextResponse } from 'next/server';

import order from '../__data/sample-order.json' with { type: 'json' };

export async function OPTIONS() {
  return NextResponse.json({});
}

export async function GET() {
  return NextResponse.json(order);
}
