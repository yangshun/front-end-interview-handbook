import { NextResponse } from 'next/server';

import collections from '../__data/collections.json' assert { type: 'json' };

export async function OPTIONS() {
  return NextResponse.json({});
}

export async function GET() {
  return NextResponse.json({
    data: collections,
  });
}
