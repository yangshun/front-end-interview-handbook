import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const baseTimestamp = 1713829932;

export async function OPTIONS() {
  return NextResponse.json({});
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const delta = searchParams.has('latest')
    ? Math.floor(Date.now() / 1000) - baseTimestamp
    : 0;

  return NextResponse.json({
    data: [
      {
        metric: 'downloads',
        value: 25_664_890 + delta * 12,
      },
      {
        metric: 'paid_users',
        value: 17_219 + delta * 3,
      },
      {
        metric: 'library_images',
        value: 190_654_321 + delta,
      },
    ],
  });
}
