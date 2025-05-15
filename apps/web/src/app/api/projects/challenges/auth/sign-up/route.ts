import { type NextRequest, NextResponse } from 'next/server';

import {
  EMAIL_REGEX,
  usersByEmail,
  validatePassword,
} from '../ProjectsFakeAPIAuthUtils';

export const dynamic = 'force-dynamic';

type FormBody = Readonly<{
  email?: string;
  password?: string;
  terms_of_service?: boolean;
}>;

export async function OPTIONS() {
  return NextResponse.json({});
}

export async function POST(req: NextRequest) {
  const { email, password, terms_of_service }: FormBody = await req.json();

  if (!email) {
    return NextResponse.json(
      { error: 'Email address is required.' },
      { status: 422 },
    );
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: 'Email address format is invalid.' },
      { status: 422 },
    );
  }

  if (usersByEmail[email]) {
    return NextResponse.json(
      { error: 'Account already exists. Sign in instead?' },
      { status: 401 },
    );
  }

  if (!password) {
    return NextResponse.json(
      { error: 'Password is required.' },
      { status: 422 },
    );
  }

  const { error, valid } = validatePassword(password);

  if (!valid) {
    return NextResponse.json({ error }, { status: 401 });
  }

  if (!terms_of_service) {
    return NextResponse.json(
      { error: 'You must agree to the Terms of Service to create an account.' },
      { status: 401 },
    );
  }

  return NextResponse.json({
    user: {
      email,
      id: 1236,
    },
  });
}
