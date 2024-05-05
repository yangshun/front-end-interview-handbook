import { type NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

type FormBody = Readonly<{
  email?: string;
}>;

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export async function OPTIONS() {
  return NextResponse.json({});
}

export async function POST(req: NextRequest) {
  const { email }: FormBody = await req.json();

  if (!email) {
    return NextResponse.json(
      { error: 'Email address is required.' },
      { status: 422 },
    );
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: 'Email format is invalid.' },
      { status: 422 },
    );
  }

  return NextResponse.json({
    message: 'Subscription successful! Please check your email to confirm.',
  });
}
