import { NextResponse } from 'next/server';

import cart from '../__data/cart.json' assert { type: 'json' };

export async function GET() {
  return NextResponse.json(cart);
}
