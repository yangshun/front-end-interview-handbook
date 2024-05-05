import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { buildProductData } from '../productData';

export async function OPTIONS() {
  return NextResponse.json({});
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { productId: string } },
) {
  const { productId } = params;
  const product = buildProductData(productId);

  if (!product) {
    return NextResponse.json({ error: 'No such product' }, { status: 404 });
  }

  return NextResponse.json(product);
}
