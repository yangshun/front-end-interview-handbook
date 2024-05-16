import { type NextRequest, NextResponse } from 'next/server';

import { users } from '../ProjectsFakeAPIAuthUtils';

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

  if (users[email].password === password) {
    return NextResponse.json({
      user: {
        email,
        id: users[email].id,
        name: users[email].name,
      },
    });
  }

  return NextResponse.json(
    { error: 'Incorrect email or password.' },
    { status: 401 },
  );
}
