import { NextResponse } from 'next/server';

import cart from '../__data/sample-cart.json' with { type: 'json' };

export async function OPTIONS() {
  return NextResponse.json({});
}

export async function GET() {
  return NextResponse.json(cart);
}
