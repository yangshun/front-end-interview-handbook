import { type NextRequest, NextResponse } from 'next/server';

import { usersByEmail } from '../ProjectsFakeAPIAuthUtils';

export const dynamic = 'force-dynamic';

type FormBody = Readonly<{
  email?: string;
  password?: string;
}>;

export async function OPTIONS() {
  return NextResponse.json({});
}

export async function POST(req: NextRequest) {
  const { email, password }: FormBody = await req.json();

  if (!email) {
    return NextResponse.json(
      { error: 'Email address is required.' },
      { status: 422 },
    );
  }

  if (!password) {
    return NextResponse.json(
      { error: 'Password is required.' },
      { status: 422 },
    );
  }

  const user = usersByEmail[email];

  if (password === user?.password) {
    return NextResponse.json({
      user: {
        email: user.email,
        id: user.id,
        name: user.name,
      },
    });
  }

  return NextResponse.json(
    { error: 'Incorrect email or password.' },
    { status: 401 },
  );
}
