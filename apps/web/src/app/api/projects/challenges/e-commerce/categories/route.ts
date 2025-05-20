import { NextResponse } from 'next/server';

import categories from '../__data/categories.json' with { type: 'json' };

export async function OPTIONS() {
  return NextResponse.json({});
}

export async function GET() {
  return NextResponse.json({
    data: categories,
  });
}
