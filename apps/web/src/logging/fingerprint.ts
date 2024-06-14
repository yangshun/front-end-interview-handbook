import type { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export const gfeFingerprintName = 'gfp';

export function addBrowserFingerprint(req: NextRequest, res: NextResponse) {
  const fingerprintValue =
    req.cookies.get(gfeFingerprintName)?.value || `gfp-${uuidv4()}`;
  const date = new Date();

  date.setFullYear(date.getFullYear() + 1);

  res.cookies.set({
    expires: date,
    name: gfeFingerprintName,
    value: fingerprintValue,
  });
}
