import type { NextRequest, NextResponse } from 'next/server';

export const gfeFirstVisitName = 'gfv';

export function addFirstVisit(req: NextRequest, res: NextResponse) {
  if (req.cookies.get(gfeFirstVisitName)) {
    return;
  }

  const date = new Date();

  date.setFullYear(date.getFullYear() + 1);

  res.cookies.set({
    expires: date,
    name: gfeFirstVisitName,
    value: new Date().toISOString(),
  });
}
